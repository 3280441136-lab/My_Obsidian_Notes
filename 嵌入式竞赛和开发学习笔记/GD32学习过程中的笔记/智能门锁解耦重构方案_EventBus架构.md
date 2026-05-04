# 智能门锁解耦重构方案：Event Bus 架构

---

## 你的代码耦合点精准定位

先说结论：**你的分层架构本身没错（Driver → App → main），但模块之间在用"全局变量直接共享"来传递信息，这才是病根。**

### 耦合点一：`lcd_app.c` 跨模块直接操作 `key_app.c` 的内部状态

```c
// lcd_app.c:35-59 — LCD模块直接读写了本属于按键模块的变量
if(password_ensure_flag)          // 读 key_app.c 的变量
{
    password_ensure_flag = 0;     // 改 key_app.c 的变量！
    password_index = 0;           // 改 key_app.c 的变量！
    Password_Check(user_password, temp_password)  // 读 key_app.c 的数组
}
if(password_backspace_flag)       // 读 key_app.c 的变量
{
    password_backspace_flag = 0;  // 改 key_app.c 的变量！
    password_index--;             // 改 key_app.c 的变量！
}
```

LCD模块修改了 `password_index`（退格时减一，确认时清零），但 `key_app.c:29` 里 `Key_Proc()` 还在用这个变量判断是否超6位。**两个模块在写同一个变量，任意一方的逻辑改动都可能踩到对方。**

### 耦合点二：`lcd_app.c` 直接调用执行器（越层调用）

```c
// lcd_app.c:41, 47 — UI显示模块直接控制了硬件执行机构
Unlock_Door();  // LCD模块凭什么知道怎么开门？
Lock_Door();
```

LCD模块理论上只管"显示什么"，门锁的动作是另一层职责。

### 耦合点三：`scheduler.c` 的中断里夹了 USART 业务逻辑

```c
// scheduler.c:13-14 — 系统时基中断里处理了串口超时
void TIM3_IRQHandler(void)
{
    uwtick++;
    if(usart3_rx_flag)     // 调度器不应该知道串口的状态！
        usart3_rx_time++;
}
```

调度器只管时序，它不应该知道 `usart3_rx_flag` 是什么东西。以后换串口、加串口2，还要改这里吗？

### 耦合点四：`mydefine.h` 是"核弹级"万能头文件

```c
// mydefine.h — 所有头文件全包进来，任何模块都能访问任何模块
#include "servo_app.h"
#include "key_app.h"
#include "lcd_app.h"
// ...
```

这相当于把所有房间的门都拆了，谁都能随意进出改东西。耦合性强的根本原因。

---

## 你的思路评估：事件+轮询

你的思路方向**完全正确**，这就是嵌入式里的**事件驱动（Event-Driven）+ 时间片轮询调度**经典组合。

你差的只是一步：**缺少一个集中的"事件总线"容器**，导致各模块只能直接暴露内部变量给彼此访问。

加一个 `event_bus`，问题就解了。

---

## 架构重构思路

### 核心理念：引入 `event_bus`，模块之间只通过事件通信

```
┌─────────────────────────────────────────────────────────────┐
│                         main.c                              │
│                    初始化 + Scheduler_Run()                  │
└──────────────────────────┬──────────────────────────────────┘
                           │ 调度 (10ms/50ms/10ms/2000ms)
          ┌────────────────┼─────────────────────┐
          ▼                ▼                     ▼
   ┌────────────┐   ┌────────────┐        ┌────────────┐
   │ Key_Proc() │   │ LCD_Proc() │        │Servo_Proc()│  ← 新增
   │ 按键应用   │   │  显示应用  │        │ 门锁执行   │
   └─────┬──────┘   └─────┬──────┘        └─────┬──────┘
         │                │                     │
         │   只写事件      │ 读事件+写门锁命令    │ 读门锁命令
         └───────┐         └─────┐   ┌──────────┘
                 ▼               ▼   ▼
        ┌────────────────────────────────┐
        │         event_bus_t  g_evt     │  ← 新增，唯一共享层
        │                                │
        │  key_confirm_evt               │  key_app 写
        │  key_backspace_evt             │  key_app 写
        │  key_clear_evt                 │  key_app 写
        │  temp_password[6]              │  key_app 写，lcd 读
        │  password_index                │  key_app 写，lcd 读
        │                                │
        │  door_cmd  (OPEN/CLOSE/NONE)   │  lcd_app 写，servo 读
        │  door_state (LOCKED/UNLOCKED)  │  servo 写，lcd 读(可选)
        └────────────────────────────────┘
         
         
         USART模块独立，自己管理超时，不再依赖scheduler中断
         scheduler中断只负责 uwtick++，纯洁干净
```

### 模块职责重新划分

| 模块 | 只负责 | 不再做 |
|------|--------|--------|
| `key_app.c` | 扫键 → 写事件到 `g_evt` | 不再向外暴露密码变量 |
| `lcd_app.c` | 读 `g_evt` 事件 → 更新显示 → 写 `g_evt.door_cmd` | 不再直接调用 `Lock_Door()/Unlock_Door()` |
| `servo_app.c` | 新增 `Servo_Proc()` 读 `g_evt.door_cmd` 执行动作 | — |
| `scheduler.c` | 时基中断只做 `uwtick++` | 去掉 USART 相关逻辑 |
| `usart.c` | 自己在 `USART3_Proc()` 里处理超时 | 不依赖外部中断计时 |

---

## 完整伪代码

### 新增：`event_bus.h`（纯头文件，无需 .c）

```c
/* event_bus.h — 所有模块间通信的唯一通道 */
#ifndef USER_APP_EVENT_BUS_H_
#define USER_APP_EVENT_BUS_H_

#include <stdint.h>

/* 门锁命令枚举，语义清晰 */
typedef enum {
    DOOR_CMD_NONE  = 0,
    DOOR_CMD_OPEN  = 1,
    DOOR_CMD_CLOSE = 2,
} door_cmd_t;

/* 全局事件总线结构体 */
typedef struct {
    /* ---- key_app 产生，其他模块消费（消费后清零） ---- */
    uint8_t key_confirm_evt;      /* 确认键按下事件   */
    uint8_t key_backspace_evt;    /* 退格键按下事件   */
    uint8_t key_clear_evt;        /* 清除键按下事件   */

    /* ---- key_app 维护，lcd_app 只读 ---- */
    uint8_t temp_password[6];     /* 当前输入密码缓冲 */
    uint8_t password_index;       /* 已输入位数 0~6  */

    /* ---- lcd_app 写，servo_app 消费（消费后清 NONE） ---- */
    door_cmd_t door_cmd;          /* 门锁执行命令     */

} event_bus_t;

/* 全局唯一实例，在 event_bus.c 中定义 */
extern event_bus_t g_evt;

#endif /* USER_APP_EVENT_BUS_H_ */
```

### 新增：`event_bus.c`（只定义实例）

```c
/* event_bus.c */
#include "event_bus.h"

/* 全局事件总线，零初始化 */
event_bus_t g_evt = {0};
```

---

### 修改：`key_app.h`（去掉所有 extern 暴露）

```c
/* key_app.h — 只暴露接口函数，不再暴露内部变量 */
#ifndef USER_DRIVER_KEY_APP_H_
#define USER_DRIVER_KEY_APP_H_

#include "mydefine.h"

void Key_Init(void);
void Key_Proc(void);   /* 产生按键事件写入 g_evt */

/* ↓ 删掉所有 extern uint8_t user_password/temp_password/... ↓ */

#endif
```

---

### 修改：`key_app.c`（只写事件，不暴露变量）

```c
/* key_app.c — 职责：扫键 → 写事件到 g_evt */
#include "key_app.h"
#include "event_bus.h"

/* 密码表留在这里，对外不可见 */
static uint8_t user_password[6]  = {1,2,3,4,5,6};
static uint8_t admin_password[6] = {8,9,8,9,8,9};

static uint8_t key_val, key_up, key_down, key_old;

void Key_Init(void)
{
    GPIO_Key_Init();
}

void Key_Proc(void)
{
    key_val  = Key_Read();
    key_down = key_val & (key_val ^ key_old);
    key_up   = ~key_val & (key_val ^ key_old);
    key_old  = key_val;

    switch(key_down)
    {
    /* 数字键 1~9, 0 → 写密码缓冲和索引到 g_evt */
    case 1:
        if(g_evt.password_index >= 6) return;
        g_evt.temp_password[g_evt.password_index] = 1;
        g_evt.password_index++;
        break;
    /* ... 其余数字键同理，修改 g_evt.temp_password 和 g_evt.password_index ... */

    case 13:  /* 清除键 */
        g_evt.password_index = 0;
        g_evt.key_clear_evt  = 1;   /* 通知 lcd 刷新清空显示 */
        break;

    case 15:  /* 退格键 */
        if(g_evt.password_index == 0) return;
        g_evt.key_backspace_evt = 1;  /* 通知 lcd 退格 */
        /* 注意：password_index 的减一由 lcd_app 消费事件后执行 */
        /* 这样 lcd 和 key 不会同时写同一个 index */
        break;

    case 16:  /* 确认键 */
        if(g_evt.password_index != 6) return;
        g_evt.key_confirm_evt = 1;    /* 通知 lcd 验证密码 */
        break;
    }
}

/* user_password 只在本文件内可见，提供只读访问接口（可选） */
const uint8_t* Key_GetUserPassword(void)
{
    return user_password;
}
```

> 注意：`password_index` 的读写现在全由 `key_app` 通过 `g_evt` 管理，`lcd_app` 消费事件后**通知** `key_app` 而不是自己改。这里有个小技巧：退格时 `key_app` 产生事件，`lcd_app` 消费事件并通知 `key_app` 减index，可以通过 `g_evt.password_index--` 来做，因为 index 是 g_evt 的公共字段，这样还是集中在 event_bus 里。

---

### 修改：`lcd_app.c`（只读事件，只写 door_cmd，不调 servo）

```c
/* lcd_app.c — 职责：读 g_evt 事件 → 刷新显示 → 写 door_cmd */
#include "lcd_app.h"
#include "event_bus.h"
#include "pic.h"

/* Password_Check 是业务逻辑，移到这里或单独的 auth.c 均可 */
/* 这里暂时保留在 lcd_app.c，保持最小改动 */
static uint8_t Password_Check(const uint8_t *stored, const uint8_t *input)
{
    uint8_t i = 6;
    while(i--)
        if(stored[i] != input[i]) return 0;
    return 1;
}

void LCD_StartMenu(void)
{
    /* 不变 */
}

void LCD_Proc(void)
{
    /* ---- 消费确认事件 ---- */
    if(g_evt.key_confirm_evt)
    {
        g_evt.key_confirm_evt = 0;      /* 消费掉，避免重复触发 */

        /* 验证密码：调用只读接口拿到存储的密码，与 g_evt.temp_password 比较 */
        if(Password_Check(Key_GetUserPassword(), g_evt.temp_password))
        {
            /* 验证成功：发门锁命令，不直接调 Unlock_Door()！ */
            g_evt.door_cmd = DOOR_CMD_OPEN;
            LCD_Fill(24, 20, 104, 36, WHITE);
            LCD_ShowChinese(32, 20, "密码正确", GREEN, WHITE, 16, 0);
        }
        else
        {
            g_evt.door_cmd = DOOR_CMD_CLOSE;
            LCD_Fill(24, 20, 104, 36, WHITE);
            LCD_ShowChinese(32, 20, "密码错误", RED, WHITE, 16, 0);
        }
        /* 确认后清空密码状态 */
        g_evt.password_index = 0;
    }

    /* ---- 消费退格事件 ---- */
    if(g_evt.key_backspace_evt)
    {
        g_evt.key_backspace_evt = 0;
        /* 先清显示，再减index */
        LCD_Fill(16 * g_evt.password_index, 45,
                 16 * (g_evt.password_index + 1), 66, YELLOW);
        g_evt.password_index--;
    }

    /* ---- 密码输入区刷新（逻辑不变，只改变量来源为 g_evt） ---- */
    if(g_evt.password_index == 0)
        LCD_Fill(0, 40, 128, 66, YELLOW);

    if(g_evt.password_index)
    {
        for(uint8_t i = 0; i < g_evt.password_index; i++)
            LCD_ShowChar(16*(i+1), 45, '*', RED, YELLOW, 16, 0);
    }
}
```

---

### 修改：`servo_app.c`（新增 `Servo_Proc`，消费 door_cmd）

```c
/* servo_app.c — 职责：响应 door_cmd，执行物理动作 */
#include "servo_app.h"
#include "event_bus.h"

void Servo_Init(void)
{
    TIM4_PWM_Init();
    GPIO_PWM_Init();
    Lock_Door();
}

void Servo_Angle(uint8_t angle) { /* 不变 */ }
void Lock_Door(void)   { Servo_Angle(90); }
void Unlock_Door(void) { Servo_Angle(0);  }

/* ★ 新增：轮询门锁命令，由调度器周期调用 */
void Servo_Proc(void)
{
    if(g_evt.door_cmd == DOOR_CMD_OPEN)
    {
        Unlock_Door();
        g_evt.door_cmd = DOOR_CMD_NONE;   /* 消费掉命令 */
    }
    else if(g_evt.door_cmd == DOOR_CMD_CLOSE)
    {
        Lock_Door();
        g_evt.door_cmd = DOOR_CMD_NONE;
    }
    /* DOOR_CMD_NONE：什么都不做 */
}
```

---

### 修改：`scheduler.c`（中断只做时基，去掉 USART 逻辑）

```c
/* scheduler.c — 职责：纯时基 + 任务调度 */
#include "scheduler.h"

volatile uint32_t uwtick;
static uint8_t task_num;

void TIM3_IRQHandler(void) __attribute__((interrupt("WCH-Interrupt-fast")));
void TIM3_IRQHandler(void)
{
    if(TIM_GetITStatus(TIM3, TIM_IT_Update) != RESET)
    {
        uwtick++;
        /* ★ 去掉 usart3_rx_time++ ，调度器不再知道串口的存在 */
    }
    TIM_ClearITPendingBit(TIM3, TIM_IT_Update);
}

/* 任务表：增加 Servo_Proc */
task_t scheduler_task[] =
{
    {Key_Proc,    10,   0},   /* 按键扫描：10ms  */
    {LCD_Proc,    50,   0},   /* 显示刷新：50ms  */
    {Servo_Proc,  50,   0},   /* 门锁执行：50ms，响应够快 ★新增 */
    {USART3_Proc, 10,   0},   /* 串口处理：10ms  */
    {Led_Proc,    2000, 0},   /* LED闪烁：2000ms */
};

/* Scheduler_Init / Scheduler_Run 不变 */
```

---

### 修改：`usart.c`（超时计数自己管，不依赖 TIM3 中断）

```c
/* usart.c — 自己维护超时，不依赖调度器中断 */

/* 超时通过 USART3_Proc() 的调用次数计数（每次调用间隔10ms） */
static uint8_t rx_timeout_cnt;  /* 调用次数计数器 */

void USART3_IRQHandler(void)
{
    if(USART_GetITStatus(USART3, USART_IT_RXNE) != RESET)
    {
        usart3_rx_flag = 1;
        rx_timeout_cnt = 0;     /* 每收到一个字节，超时计数清零 */
        usart3_rx_buf[usart3_rx_index++] = (uint8_t)USART_ReceiveData(USART3);
        if(usart3_rx_index >= USART3_RX_INDEX_MAX)
        {
            usart3_rx_flag  = 0;
            usart3_rx_index = 0;
            memset(usart3_rx_buf, 0, sizeof(usart3_rx_buf));
        }
    }
}

void USART3_Proc(void)
{
    if(usart3_rx_index != 0)
    {
        rx_timeout_cnt++;        /* 每次Proc调用+1（等效10ms一次）*/
        /* 超时阈值：10次 × 10ms = 100ms 无新数据则认为帧结束 */
        if(rx_timeout_cnt >= 10)
        {
            usart3_rx_flag  = 0;
            rx_timeout_cnt  = 0;
            USART3_SendString(usart3_rx_buf, usart3_rx_index);
            usart3_rx_index = 0;
            memset(usart3_rx_buf, 0, sizeof(usart3_rx_buf));
        }
    }
}
/* 注意：usart3_rx_time 这个外部变量不再需要，可从 usart.h 中删除 extern 声明 */
```

---

## 改动汇总

```
新增文件：
  User/App/event_bus.h    ← 事件总线类型定义
  User/App/event_bus.c    ← g_evt 全局实例

修改文件：
  key_app.h               ← 删掉所有 extern 变量声明
  key_app.c               ← 变量改 static，操作改为写 g_evt
  lcd_app.c               ← 读 g_evt 事件，写 g_evt.door_cmd，删掉直接调 servo
  servo_app.c/h           ← 新增 Servo_Proc()
  scheduler.c             ← 中断去掉 USART 逻辑，任务表加 Servo_Proc
  usart.c/h               ← 删掉 extern usart3_rx_time，Proc 内自己计超时
  mydefine.h              ← 加 #include "event_bus.h"
```

---

改完之后，你的架构就变成了：**每个模块只和 `g_evt` 说话，不直接访问别人的内部变量**。以后加指纹解锁、蓝牙开门，只需要往 `g_evt.door_cmd` 写一个 `DOOR_CMD_OPEN`，servo_app 自然就响应了，不需要动 lcd_app 一行代码。这才叫真正的解耦。
