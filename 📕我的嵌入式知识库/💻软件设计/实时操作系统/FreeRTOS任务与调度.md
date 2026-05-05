---
version: V1.1
updated: 2026-05-05
author: RUI
tags: [软件]
---

# FreeRTOS 任务与调度

## 目录

- [从 Keil 裸机到 FreeRTOS](FreeRTOS任务与调度.md#从-keil-裸机到-freertos)
- [任务是什么](FreeRTOS任务与调度.md#任务是什么)
- [xTaskCreate 和 xTaskCreatePinnedToCore](FreeRTOS任务与调度.md#xtaskcreate-和-xtaskcreatepinnedtocore)
- [任务句柄 TaskHandle_t](FreeRTOS任务与调度.md#任务句柄-taskhandle_t)
- [vTaskDelay、pdMS_TO_TICKS、vTaskDelayUntil](FreeRTOS任务与调度.md#vtaskdelaypdms_to_ticksvtaskdelayuntil)
- [esp_rom_delay_us 和 vTaskDelay 的区别](FreeRTOS任务与调度.md#esp_rom_delay_us-和-vtaskdelay-的区别)
- [为什么任务栈常给 2048 字节](FreeRTOS任务与调度.md#为什么任务栈常给-2048-字节)
- [while 外和 while 内的区别](FreeRTOS任务与调度.md#while-外和-while-内的区别)
- [删除任务：vTaskDelete 和 cnt 判断](FreeRTOS任务与调度.md#删除任务vtaskdelete-和-cnt-判断)
- [FreeRTOS 函数命名规律](FreeRTOS任务与调度.md#freertos-函数命名规律)
- [TickType_t、BaseType_t、TaskHandle_t](FreeRTOS任务与调度.md#ticktype_tbasetype_ttaskhandle_t)
- [稳妥代码模板](FreeRTOS任务与调度.md#稳妥代码模板)
- [小白排错速查表](FreeRTOS任务与调度.md#小白排错速查表)
- [记忆口诀](FreeRTOS任务与调度.md#记忆口诀)

---

## 任务是什么

FreeRTOS 里的任务可以理解成：

```text
一个可以被系统调度的 while(1) 函数
```

典型任务：

```c
void task1(void *param)
{
    while (1) {
        ESP_LOGI("main", "task1 run");
        vTaskDelay(pdMS_TO_TICKS(500));
    }
}
```

系统会在多个任务之间切换：

```text
任务 A 跑一会儿
    ↓
任务 B 跑一会儿
    ↓
任务 C 跑一会儿
```

---

## xTaskCreate 和 xTaskCreatePinnedToCore

### xTaskCreate

作用：**创建任务，但不指定核心。**

```c
xTaskCreate(task1, "task1", 2048, NULL, 3, &task1_handle);
```

参数：

| 参数 | 含义 |
|---|---|
| `task1` | 任务函数 |
| `"task1"` | 任务名字，方便调试 |
| `2048` | 任务栈大小 |
| `NULL` | 传给任务函数的参数 |
| `3` | 任务优先级 |
| `&task1_handle` | 保存任务句柄的地址 |

返回值：

```text
pdPASS：创建成功
pdFAIL：创建失败
```

### xTaskCreatePinnedToCore

作用：**创建任务，并固定到某个 CPU 核心。**

```c
xTaskCreatePinnedToCore(task1, "task1", 2048, NULL, 3, &task1_handle, 0);
```

参数：

| 参数 | 含义 |
|---|---|
| `task1` | 任务函数 |
| `"task1"` | 任务名字 |
| `2048` | 任务栈大小 |
| `NULL` | 任务参数 |
| `3` | 优先级 |
| `&task1_handle` | 任务句柄保存位置 |
| `0` | 固定到 Core 0 |

如果最后一个参数是 `1`：

```c
xTaskCreatePinnedToCore(task2, "task2", 2048, NULL, 3, &task2_handle, 1);
```

就是固定到 Core 1。

---

## 任务句柄 TaskHandle_t

```c
static TaskHandle_t task1_handle = NULL;
```

人话：

```text
task1_handle 是 task1 的身份证/遥控器
```

创建任务时要传地址：

```c
&task1_handle
```

因为系统要把创建好的任务句柄写回这个变量。

错误写法：

```c
xTaskCreatePinnedToCore(task1, "task1", 2048, NULL, 3, task1_handle, 0);
```

更正：

```c
xTaskCreatePinnedToCore(task1, "task1", 2048, NULL, 3, &task1_handle, 0);
```

---

## vTaskDelay、pdMS_TO_TICKS、vTaskDelayUntil

### tick 是什么

FreeRTOS 调度不是直接按毫秒计时，而是按系统节拍 `tick`。

```text
tick = RTOS 的节拍单位
```

如果配置为 1000Hz：

```text
1 tick = 1ms
```

如果配置为 100Hz：

```text
1 tick = 10ms
```

所以不要直接写：

```c
vTaskDelay(500);
```

推荐写：

```c
vTaskDelay(pdMS_TO_TICKS(500));
```

### pdMS_TO_TICKS

作用：

```text
把毫秒转换成 FreeRTOS tick
```

示例：

```c
pdMS_TO_TICKS(500)
```

人话：把 500ms 换算成当前工程里的 tick 数。

### vTaskDelay

```c
vTaskDelay(pdMS_TO_TICKS(500));
```

作用：

```text
当前任务睡眠 500ms 左右，把 CPU 让给其他任务
```

特点：从执行到 `vTaskDelay` 这一刻开始算。

如果任务本身干活用了 200ms：

```text
干活 200ms + delay 500ms = 周期约 700ms
```

### vTaskDelayUntil

作用：**做固定周期任务。**

典型写法：

```c
void task2(void *param)
{
    TickType_t xLastWakeTime = xTaskGetTickCount();

    while (1) {
        ESP_LOGI("main", "task2 run");
        vTaskDelayUntil(&xLastWakeTime, pdMS_TO_TICKS(500));
    }
}
```

注意第一个参数要传地址：

```c
&xLastWakeTime
```

因为 `vTaskDelayUntil()` 需要更新它。

对比：

| 函数 | 周期含义 |
|---|---|
| `vTaskDelay(500ms)` | 从现在开始睡 500ms |
| `vTaskDelayUntil(500ms)` | 按固定时间表每 500ms 醒一次 |

如果循环里干活用了 200ms：

```text
vTaskDelay：总周期约 700ms
vTaskDelayUntil：总周期尽量保持 500ms
```

---

## esp_rom_delay_us 和 vTaskDelay 的区别

### esp_rom_delay_us

```c
esp_rom_delay_us(200 * 1000);
```

作用：忙等 200000us，也就是 200ms。

**忙等的意思：CPU 在原地空转等待，不主动把 CPU 让给其他任务。**

适合：很短的硬件时序延时（几微秒、几十微秒）。

不适合：几十毫秒、几百毫秒这种任务级延时。

### vTaskDelay

```c
vTaskDelay(pdMS_TO_TICKS(200));
```

作用：当前任务睡眠，CPU 可以跑其他任务。

对比表：

| 函数 | 单位 | 是否让出 CPU | 适合 |
|---|---|---|---|
| `esp_rom_delay_us()` | 微秒 | 不主动让出 | 短硬件延时 |
| `vTaskDelay()` | tick | 让出 CPU | 普通任务延时 |
| `vTaskDelayUntil()` | tick | 让出 CPU | 周期任务 |

---

## 为什么任务栈常给 2048 字节

在 ESP-IDF 里，任务栈参数通常按 **字节** 理解。

示例：

```c
xTaskCreate(task1, "task1", 2048, NULL, 3, &task1_handle);
```

含义：给 task1 分配 2048 字节任务栈。

栈里会放：

```text
函数调用现场
局部变量
返回地址
临时变量
FreeRTOS 任务切换现场
ESP_LOGI/printf 内部调用消耗
```

### 为什么 ESP_LOGI 吃栈

```c
ESP_LOGI(TAG, "task1 run");
```

看起来只有一行，但背后可能经过：

```text
日志等级判断
格式化字符串
时间戳处理
锁/互斥保护
串口输出
底层驱动调用
```

**1536 字节栈可能偏紧，2048 字节是简单日志任务更稳妥的起步值。**

工程建议：

```text
简单任务：2048 起步
带 ESP_LOGI/printf：不要太抠栈
带网络/文件/复杂函数：更大
有大数组：不要放栈上
```

---

## while 外和 while 内的区别

任务函数常见结构：

```c
void task2(void *param)
{
    TickType_t xLastWakeTime;
    xLastWakeTime = xTaskGetTickCount();

    while (1) {
        ESP_LOGI(TAG, "task2 run");
        vTaskDelayUntil(&xLastWakeTime, pdMS_TO_TICKS(500));
    }
}
```

规律：

```text
while 外：只执行一次，用于初始化
while 内：每轮循环都执行
```

`xLastWakeTime = xTaskGetTickCount();` 放 while 外，因为它是固定周期的初始时间基准。

如果放 while 内：

```c
while (1) {
    xLastWakeTime = xTaskGetTickCount();
    vTaskDelayUntil(&xLastWakeTime, pdMS_TO_TICKS(500));
}
```

那每轮都重新设置基准，`vTaskDelayUntil()` 的固定周期意义就被削弱了。

---

## 删除任务：vTaskDelete 和 cnt 判断

如果 task2 想 5 秒后删除 task1，常见思路：

```c
if (cnt == 5 && task1_handle != NULL) {
    vTaskDelete(task1_handle);
    task1_handle = NULL;
}
```

为什么 `cnt == 5` 比 `cnt >= 5` 稳？

```text
cnt == 5：只在 cnt 等于 5 的那一轮执行一次
cnt >= 5：从 5 开始每一轮都成立
```

如果写 `cnt >= 5`，流程可能变成：

```text
cnt = 5：删除 task1
cnt = 6：又尝试删除 task1
cnt = 7：还尝试删除 task1
```

第一次删除后 task1 已经不存在了，继续拿旧句柄操作就容易出错。

更稳的逻辑：

```text
只删除一次
删除后把句柄清空
后面判断句柄是否为空
```

---

## FreeRTOS 函数命名规律

FreeRTOS 的名字看起来怪，其实有规则：

```text
前缀 + 模块/对象 + 动作
```

### 常见前缀

| 前缀 | 含义 | 例子 |
|---|---|---|
| `v` | 返回 `void` | `vTaskDelay()` |
| `x` | 返回状态/整数 | `xTaskCreate()` |
| `pv` | 返回 `void *` 指针 | `pvPortMalloc()` |
| `pc` | 返回 `char *` 字符串 | `pcTaskGetName()` |
| `ul` | 返回 unsigned long | `ulTaskNotifyTake()` |
| `ux` | 返回无符号基础类型 | `uxTaskPriorityGet()` |
| `e` | 返回枚举类型 | `eTaskGetState()` |
| `pd` | portable define，可移植宏 | `pdMS_TO_TICKS()` |
| `port` | 移植层相关 | `portTICK_PERIOD_MS` |

### 拆名字示例

```c
xTaskCreate()
```

拆开：

```text
x：有返回值
Task：任务模块
Create：创建
```

人话：创建一个任务，并返回成功/失败。

```c
vTaskDelay()
```

拆开：

```text
v：无返回值
Task：任务模块
Delay：延时
```

---

## TickType_t、BaseType_t、TaskHandle_t

这些都是 FreeRTOS 定义的类型，本质上还是 C 语言类型包装。

### 为什么不用 int

FreeRTOS 要跑在不同平台（8/16/32/64 位 MCU），所以用统一类型名移植更方便。

### 常见类型

| 类型 | 人话理解 | 常见用途 |
|---|---|---|
| `TickType_t` | tick 时间类型 | 延时、周期任务 |
| `BaseType_t` | 基础状态整数 | 成功/失败返回值 |
| `UBaseType_t` | 无符号基础整数 | 优先级、数量 |
| `TaskHandle_t` | 任务句柄 | 删除/控制任务 |
| `QueueHandle_t` | 队列句柄 | 操作队列 |
| `SemaphoreHandle_t` | 信号量句柄 | 操作信号量 |

---

## 稳妥代码模板

```c
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "esp_log.h"

#define TAG "main"

static TaskHandle_t task1_handle = NULL;

void task1(void *param)
{
    while (1) {
        ESP_LOGI(TAG, "task1 run");
        vTaskDelay(pdMS_TO_TICKS(500));
    }
}

void app_main(void)
{
    BaseType_t ret;

    ret = xTaskCreate(
        task1,          // 任务函数
        "task1",        // 任务名
        2048,           // 任务栈大小，ESP-IDF 中按字节理解
        NULL,           // 传给任务的参数
        3,              // 优先级
        &task1_handle   // 保存任务句柄
    );

    if (ret != pdPASS) {
        ESP_LOGI(TAG, "task1 create failed");
    }
}
```

---

## 小白排错速查表

| 现象 | 优先怀疑 |
|---|---|
| 任务创建失败 | 堆内存不够、栈给太大、句柄参数写错 |
| 打印几次后重启 | 栈溢出、访问空指针、反复删除任务 |
| `ESP_LOGI` 后异常 | 任务栈太小、格式化参数类型不匹配 |
| 延时不准 | 用了 `vTaskDelay` 而不是 `vTaskDelayUntil` |
| CPU 被卡住 | 长时间用了 `esp_rom_delay_us` 忙等 |
| `cnt >= 5` 出错 | 反复执行删除逻辑 |
| 双核数据异常 | 两个核心同时访问共享变量，没有保护 |

---

## 记忆口诀

```text
vTaskDelay 是睡一会儿，vTaskDelayUntil 是按点起床。
esp_rom_delay_us 是原地等，长延时别用它。
x 开头多半有返回值，v 开头多半没返回值。
TickType_t 管时间，BaseType_t 管状态，TaskHandle_t 是任务身份证。
```

---

## 相关笔记

- [[../../🧠MCU底层原理/CPU架构与内存模型]] — 栈空间为什么容易溢出
- [[FreeRTOS同步与互斥]] — 任务间如何保护共享资源
