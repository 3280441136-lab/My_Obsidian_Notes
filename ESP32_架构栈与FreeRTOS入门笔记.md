# ESP32 架构栈与 FreeRTOS 入门笔记

> 适合对象：用过 C 语言、写过 Keil/STC51/GD32/STM32，但刚接触 ESP32、Xtensa、RISC-V、FreeRTOS 的同学。  
> 复习目标：先把 <span style="color:#1565c0;"><b>寄存器、栈、堆、任务、延时、句柄、tick</b></span> 这些基础概念理顺，再逐步看懂 ESP-IDF 示例代码。

---

## 0. 总结先行

<span style="color:#d32f2f;"><b>最重要的一句话：</b></span>  
<span style="color:#1565c0;"><b>寄存器是 CPU 里面极快的小格子，栈是 RAM 里面给函数/任务临时用的一段空间，堆是运行时动态申请的大仓库。</b></span>

不同架构的核心区别：

| 架构/芯片 | 栈和寄存器特点 | 小白先记住 |
|---|---|---|
| <span style="color:#1565c0;"><b>ESP32-S3 / Xtensa LX7</b></span> | 有 <span style="color:#d32f2f;"><b>寄存器窗口</b></span>，函数调用时窗口会旋转 | 函数调用不一定马上大量压栈，但栈仍然很重要 |
| <span style="color:#1565c0;"><b>ESP32-P4 / RISC-V</b></span> | 固定寄存器，没有 Xtensa 窗口机制 | 模型更直观，函数调用按约定保存/恢复 |
| <span style="color:#1565c0;"><b>STM32/GD32 / ARM Cortex-M</b></span> | 栈模型清楚，常见向低地址增长 | 裸机常用 MSP，RTOS 下每个任务有自己的栈 |
| <span style="color:#1565c0;"><b>STC51 / 8051</b></span> | 内部 RAM 很小，栈空间非常紧张 | 大数组绝对不要放函数内部 |

---

## 1. 三个基础概念：寄存器、栈、堆

### 1.1 人话版本

| 概念 | 类比 | 特点 |
|---|---|---|
| <span style="color:#d32f2f;"><b>寄存器 register</b></span> | CPU 手边的小格子 | 极快，但数量很少 |
| <span style="color:#d32f2f;"><b>栈 stack</b></span> | 临时资料架 | 函数进入时使用，函数退出自动释放 |
| <span style="color:#d32f2f;"><b>堆 heap</b></span> | 运行时仓库 | `malloc()` 申请，`free()` 释放 |

逻辑图：

```text
RAM 内存
┌──────────────────────────┐ 高地址
│ 栈 stack                  │  函数局部变量、返回现场、任务上下文
│        ↓                  │  常见情况：向低地址增长
│                            │
│ 空闲 RAM                   │
│                            │
│        ↑                  │
│ 堆 heap                    │  malloc/new 动态申请
├──────────────────────────┤
│ .bss / .data 全局变量       │  全局数组、static 变量
└──────────────────────────┘ 低地址
```

### 1.2 为什么函数里的大数组危险

例如：

```c
void test(void)
{
    uint8_t buf[4096];
}
```

<span style="color:#d32f2f;"><b>这 4096 字节通常会进入当前函数所在任务的栈。</b></span>  
如果这个任务栈本身只有 2048 或 4096 字节，再加上函数调用、日志打印、中断现场，就很容易栈溢出。

更稳的写法：

```c
static uint8_t buf[4096];
```

或者：

```c
uint8_t *buf = malloc(4096);
if (buf == NULL) {
    // 申请失败处理
}
```

---

## 2. ESP32-S3 的 Xtensa 架构

### 2.1 先分清三层东西

Xtensa 最容易混的是这三层：

| 层级 | 名字 | 人话解释 |
|---|---|---|
| 第 1 层 | <span style="color:#1565c0;"><b>逻辑寄存器 a0~a15</b></span> | 当前函数看到的寄存器名字 |
| 第 2 层 | <span style="color:#1565c0;"><b>物理寄存器 AR0~AR63</b></span> | CPU 里真实存在的小格子 |
| 第 3 层 | <span style="color:#1565c0;"><b>栈 stack</b></span> | RAM 里的一段内存，不是寄存器 |

<span style="color:#d32f2f;"><b>关键结论：</b></span>

```text
逻辑寄存器 a0~a15  映射到  物理寄存器 AR0~AR63
物理寄存器内容       必要时复制到  栈
```

注意：

```text
逻辑寄存器和物理寄存器之间：叫映射
物理寄存器和栈之间：叫保存/恢复，不叫映射
```

---

### 2.2 逻辑寄存器和物理寄存器的映射

假设函数 A 当前窗口从 `AR0` 开始：

```text
函数 A 看到：

逻辑名： a0  a1  a2  a3  a4  a5  a6  a7  a8  a9  a10 a11 a12 a13 a14 a15
实际：   AR0 AR1 AR2 AR3 AR4 AR5 AR6 AR7 AR8 AR9 AR10 AR11 AR12 AR13 AR14 AR15
```

A 调用 B 后，窗口向后滑：

```text
函数 B 看到：

逻辑名： a0  a1  a2   a3   a4   a5   a6   a7   a8   a9   a10  a11  a12  a13  a14  a15
实际：   AR8 AR9 AR10 AR11 AR12 AR13 AR14 AR15 AR16 AR17 AR18 AR19 AR20 AR21 AR22 AR23
```

这里出现了重叠：

```text
A 的 a8 = AR8
B 的 a0 = AR8

A 的 a9 = AR9
B 的 a1 = AR9
```

<span style="color:#d32f2f;"><b>重叠的本质：</b></span>  
<span style="color:#1565c0;"><b>不是 A 把数据复制给 B，而是同一批物理寄存器换了一个逻辑名字。</b></span>

---

### 2.3 为什么重叠窗口能减少栈使用

普通思路：

```text
A 调 B
    ↓
A 把参数写到栈
    ↓
B 从栈读参数
```

Xtensa 窗口思路：

```text
A 把参数放到重叠寄存器
    ↓
窗口旋转
    ↓
B 直接把这些物理寄存器看成自己的输入寄存器
```

所以它省掉了：

```text
寄存器 → 栈 RAM → 寄存器
```

这就是 <span style="color:#1565c0;"><b>寄存器窗口可以减少普通函数调用压栈开销</b></span> 的原因。

但是它不能减少：

```text
char buf[4096]; 这种大局部数组
printf/ESP_LOGI 的内部调用链
中断/异常现场
FreeRTOS 任务切换现场
窗口不够时的 spill/fill
```

---

### 2.4 A 调 B，B 调 C 时，栈怎么变

示例代码：

```c
void C(void)
{
    int c = 3;
}

void B(void)
{
    int b = 2;
    C();
}

void A(void)
{
    int a = 1;
    B();
}
```

函数 A 正在运行时：

```text
高地址
┌──────────────────┐
│ 空闲栈空间         │
├──────────────────┤
│ A 的栈帧           │
└──────────────────┘
低地址
```

A 调 B 后：

```text
高地址
┌──────────────────┐
│ 空闲栈空间         │
├──────────────────┤
│ B 的栈帧           │
├──────────────────┤
│ A 的栈帧           │
└──────────────────┘
低地址
```

B 调 C 后：

```text
高地址
┌──────────────────┐
│ 空闲栈空间         │
├──────────────────┤
│ C 的栈帧           │
├──────────────────┤
│ B 的栈帧           │
├──────────────────┤
│ A 的栈帧           │
└──────────────────┘
低地址
```

函数返回时，反过来释放：

```text
C 返回：释放 C 的栈帧
B 返回：释放 B 的栈帧
A 返回：释放 A 的栈帧
```

<span style="color:#d32f2f;"><b>注意：</b></span>  
<span style="color:#1565c0;"><b>寄存器窗口负责快速传参/保存部分调用现场，栈帧负责放当前函数自己的局部变量、数组和必要现场。</b></span>

---

### 2.5 spill 和 fill

Xtensa 的物理寄存器不是无限的。如果调用层级很深：

```text
A -> B -> C -> D -> E -> F -> G
```

窗口一直旋转，迟早会不够用。

#### spill 是什么

<span style="color:#d32f2f;"><b>spill = 把暂时用不到的寄存器窗口内容保存到栈里。</b></span>

人话：

```text
办公桌不够用了
把 A 的资料先打包放仓库
腾出桌面给后面的函数用
```

技术对应：

```text
物理寄存器内容 → 栈 RAM
```

#### fill 是什么

<span style="color:#d32f2f;"><b>fill = 函数要回来继续执行时，把之前保存到栈里的窗口内容恢复回寄存器。</b></span>

技术对应：

```text
栈 RAM → 物理寄存器
```

流程图：

```text
调用很深
    ↓
寄存器窗口不够
    ↓
旧窗口 spill 到栈
    ↓
新函数继续使用寄存器
    ↓
函数返回到旧层级
    ↓
旧窗口 fill 回寄存器
```

---

### 2.6 Xtensa 单核理解

单核时只有一个 CPU 核心在跑：

```text
Xtensa Core
┌──────────────────────────┐
│ 当前任务                   │
│                            │
│ 寄存器窗口                  │
│   A 的窗口                  │
│   B 的窗口                  │
│   C 的窗口                  │
│                            │
│ 当前任务栈                  │
│   A/B/C 栈帧                │
│   局部数组                  │
│   spill 保存内容             │
└──────────────────────────┘
```

小白先记：

```text
函数调用：窗口旋转
局部大变量：吃栈
窗口不够：spill 到栈
函数回来：fill 回寄存器
```

---

### 2.7 ESP32-S3 双核理解

ESP32-S3 有两个 Xtensa LX7 核：

```text
ESP32-S3
┌──────────────────────────────┐
│ Core 0：一套自己的寄存器窗口   │
│ Core 1：一套自己的寄存器窗口   │
│                              │
│ 共享 RAM / Flash / 外设        │
└──────────────────────────────┘
```

<span style="color:#d32f2f;"><b>重点：</b></span>

```text
Core 0 的 a2 和 Core 1 的 a2 不是同一个寄存器
但是两个核心访问的全局变量可能是同一块 RAM
```

所以双核多出来的问题是：

```text
共享变量要保护
外设访问要协调
任务可能跑在不同核心上
```

FreeRTOS 下重点：

```text
不是每个核心只有一个栈
而是每个任务都有自己的栈
```

---

## 3. ESP32-P4 的 RISC-V 架构

ESP32-P4 使用 RISC-V。它没有 Xtensa 那种寄存器窗口。

常见寄存器角色：

| 寄存器 | 作用 |
|---|---|
| `ra` | 返回地址 |
| `sp` | 栈指针 |
| `a0~a7` | 参数/返回值 |
| `t0~t6` | 临时寄存器 |
| `s0~s11` | 需要保存的寄存器 |

函数调用大概是：

```text
调用函数
    ↓
必要时把 ra、s 寄存器、局部变量保存到栈
    ↓
执行函数
    ↓
从栈恢复
    ↓
返回
```

和 Xtensa 对比：

| 项目 | Xtensa | RISC-V |
|---|---|---|
| 函数调用机制 | 寄存器窗口 | 固定寄存器 |
| 是否有窗口旋转 | 有 | 没有 |
| 是否有 spill/fill | 有窗口相关 spill/fill | 常规保存/恢复 |
| 小白理解难度 | 较绕 | 更直观 |
| 是否会栈溢出 | 会 | 也会 |

<span style="color:#d32f2f;"><b>不要误会：</b></span>  
<span style="color:#1565c0;"><b>P4 是 RISC-V，不代表可以在函数里随便开大数组。任务栈不够照样溢出。</b></span>

---

## 4. ARM Cortex-M 的栈模型：STM32/GD32

STM32/GD32 常见是 ARM Cortex-M。

裸机启动大概是：

```text
上电
    ↓
从向量表取初始 SP
    ↓
Reset_Handler
    ↓
SystemInit
    ↓
main()
```

常见栈图：

```text
RAM 高地址
┌──────────────────┐
│ 栈 stack           │  向低地址增长
│        ↓          │
│ 空闲区             │
│        ↑          │
│ 堆 heap            │
├──────────────────┤
│ .data/.bss 全局变量 │
└──────────────────┘
RAM 低地址
```

Cortex-M 常见两个栈指针：

| 栈指针 | 说明 |
|---|---|
| `MSP` | Main Stack Pointer，主栈指针 |
| `PSP` | Process Stack Pointer，常用于 RTOS 任务栈 |

裸机时通常主要用 `MSP`。  
RTOS 下，每个任务一般有自己的任务栈。

Keil 里如果启动文件写：

```asm
Stack_Size EQU 0x00000400
```

这就是 1024 字节栈。如果函数里开：

```c
uint8_t buf[4096];
```

那基本必炸。

---

## 5. STC51 / 8051 的栈模型

经典 8051 的内部 RAM 很小，默认栈指针 `SP` 常见初值是 `0x07`。

内部 RAM 简化图：

```text
0x00 ~ 0x1F：寄存器组 Bank0~Bank3
0x20 ~ 0x2F：位寻址区
0x30 ~ 0x7F：普通内部 RAM
```

默认第一次 `PUSH` 会用到 `0x08`。  
如果不小心，栈可能踩到寄存器区、位寻址区或普通变量区。

常见做法：

```c
SP = 0x60;
```

但即使这样，`0x60~0x7F` 也只有 32 字节左右。

<span style="color:#d32f2f;"><b>51 上不要在函数里放大数组。</b></span>  
大数组更适合放到 `xdata` 或全局区域。

---

## 6. FreeRTOS 任务基础

### 6.1 任务是什么

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

## 7. xTaskCreate 和 xTaskCreatePinnedToCore

### 7.1 xTaskCreate

作用：<span style="color:#1565c0;"><b>创建任务，但不指定核心。</b></span>

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

---

### 7.2 xTaskCreatePinnedToCore

作用：<span style="color:#1565c0;"><b>创建任务，并固定到某个 CPU 核心。</b></span>

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

### 7.3 任务句柄 TaskHandle_t

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

## 8. vTaskDelay、pdMS_TO_TICKS、vTaskDelayUntil

### 8.1 tick 是什么

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

---

### 8.2 pdMS_TO_TICKS

作用：

```text
把毫秒转换成 FreeRTOS tick
```

示例：

```c
pdMS_TO_TICKS(500)
```

人话：

```text
把 500ms 换算成当前工程里的 tick 数
```

---

### 8.3 vTaskDelay

```c
vTaskDelay(pdMS_TO_TICKS(500));
```

作用：

```text
当前任务睡眠 500ms 左右，把 CPU 让给其他任务
```

特点：

```text
从执行到 vTaskDelay 这一刻开始算
```

如果任务本身干活用了 200ms：

```text
干活 200ms + delay 500ms = 周期约 700ms
```

---

### 8.4 vTaskDelayUntil

作用：<span style="color:#1565c0;"><b>做固定周期任务。</b></span>

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

## 9. esp_rom_delay_us 和 vTaskDelay 的区别

### 9.1 esp_rom_delay_us

```c
esp_rom_delay_us(200 * 1000);
```

作用：

```text
忙等 200000us，也就是 200ms
```

<span style="color:#d32f2f;"><b>忙等的意思：</b></span>

```text
CPU 在原地空转等待，不主动把 CPU 让给其他任务
```

适合：

```text
很短的硬件时序延时
例如几微秒、几十微秒
```

不适合：

```text
几十毫秒、几百毫秒这种任务级延时
```

### 9.2 vTaskDelay

```c
vTaskDelay(pdMS_TO_TICKS(200));
```

作用：

```text
当前任务睡眠，CPU 可以跑其他任务
```

对比表：

| 函数 | 单位 | 是否让出 CPU | 适合 |
|---|---|---|---|
| `esp_rom_delay_us()` | 微秒 | 不主动让出 | 短硬件延时 |
| `vTaskDelay()` | tick | 让出 CPU | 普通任务延时 |
| `vTaskDelayUntil()` | tick | 让出 CPU | 周期任务 |

---

## 10. 为什么任务栈常给 2048 字节

在 ESP-IDF 里，任务栈参数通常按 <span style="color:#d32f2f;"><b>字节</b></span> 理解。  
注意：原版 FreeRTOS 在一些平台上可能按 word，ESP-IDF 文档和示例中按字节使用更符合实际学习习惯。

示例：

```c
xTaskCreate(task1, "task1", 2048, NULL, 3, &task1_handle);
```

含义：

```text
给 task1 分配 2048 字节任务栈
```

栈里会放：

```text
函数调用现场
局部变量
返回地址
临时变量
FreeRTOS 任务切换现场
ESP_LOGI/printf 内部调用消耗
```

### 10.1 为什么 ESP_LOGI 吃栈

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

所以它不是简单地往串口丢几个字节。

<span style="color:#d32f2f;"><b>1536 字节栈可能偏紧，2048 字节是简单日志任务更稳妥的起步值。</b></span>

工程建议：

```text
简单任务：2048 起步
带 ESP_LOGI/printf：不要太抠栈
带网络/文件/复杂函数：更大
有大数组：不要放栈上
```

---

## 11. while 外和 while 内的区别

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

`xLastWakeTime = xTaskGetTickCount();` 放 while 外，是因为它是固定周期的初始时间基准。

如果放 while 内：

```c
while (1) {
    xLastWakeTime = xTaskGetTickCount();
    vTaskDelayUntil(&xLastWakeTime, pdMS_TO_TICKS(500));
}
```

那每轮都重新设置基准，`vTaskDelayUntil()` 的固定周期意义就被削弱了。

---

## 12. 删除任务：vTaskDelete 和 cnt 判断

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

如果写：

```c
if (cnt >= 5) {
    vTaskDelete(task1_handle);
}
```

流程可能变成：

```text
cnt = 5：删除 task1
cnt = 6：又尝试删除 task1
cnt = 7：还尝试删除 task1
```

第一次删除后，task1 已经不存在了。继续拿旧句柄操作就容易出错。

更稳的逻辑：

```text
只删除一次
删除后把句柄清空
后面判断句柄是否为空
```

---

## 13. FreeRTOS 函数命名规律

FreeRTOS 的名字看起来怪，其实有规则：

```text
前缀 + 模块/对象 + 动作
```

### 13.1 常见前缀

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

### 13.2 拆名字示例

```c
xTaskCreate()
```

拆开：

```text
x：有返回值
Task：任务模块
Create：创建
```

人话：

```text
创建一个任务，并返回成功/失败
```

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

## 14. TickType_t、BaseType_t、TaskHandle_t

这些都是 FreeRTOS 定义的类型，本质上还是 C 语言类型包装。

### 14.1 为什么不用 int

FreeRTOS 要跑在不同平台：

```text
8 位 MCU
16 位 MCU
32 位 MCU
64 位平台
```

所以它用统一类型名：

```c
typedef ... TickType_t;
typedef ... BaseType_t;
```

这样移植更方便。

### 14.2 常见类型

| 类型 | 人话理解 | 常见用途 |
|---|---|---|
| `TickType_t` | tick 时间类型 | 延时、周期任务 |
| `BaseType_t` | 基础状态整数 | 成功/失败返回值 |
| `UBaseType_t` | 无符号基础整数 | 优先级、数量 |
| `TaskHandle_t` | 任务句柄 | 删除/控制任务 |
| `QueueHandle_t` | 队列句柄 | 操作队列 |
| `SemaphoreHandle_t` | 信号量句柄 | 操作信号量 |

### 14.3 TickType_t

```c
TickType_t xLastWakeTime;
xLastWakeTime = xTaskGetTickCount();
```

含义：

```text
保存当前系统 tick 时间点
```

### 14.4 BaseType_t

```c
BaseType_t ret;
ret = xTaskCreate(...);

if (ret == pdPASS) {
    // 创建成功
}
```

常见返回：

```text
pdPASS：成功
pdFAIL：失败
```

---

## 15. 当前阶段写 ESP32 FreeRTOS 代码的稳妥模板

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

## 16. 小白排错速查表

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

## 17. 记忆口诀

```text
小变量放栈，大数组别放栈。
任务有自己的栈，不是整片 RAM 都给你用。
vTaskDelay 是睡一会儿，vTaskDelayUntil 是按点起床。
esp_rom_delay_us 是原地等，长延时别用它。
x 开头多半有返回值，v 开头多半没返回值。
TickType_t 管时间，BaseType_t 管状态，TaskHandle_t 是任务身份证。
Xtensa 有窗口，RISC-V 更直白，ARM 栈规矩，51 栈很小。
```

---

## 18. 后续学习建议

建议按这个顺序继续补：

```text
1. 任务创建和任务栈
2. vTaskDelay / vTaskDelayUntil
3. 任务优先级
4. 队列 Queue
5. 信号量 Semaphore
6. 互斥锁 Mutex
7. 任务通知 Task Notification
8. 双核共享数据保护
9. 栈高水位 uxTaskGetStackHighWaterMark
10. 看 map 文件和内存占用
```

比赛/工程里最重要的不是背 API，而是先形成这个闭环：

```text
创建任务
    ↓
任务周期运行
    ↓
串口日志观察
    ↓
发现异常
    ↓
判断是栈、堆、延时、句柄还是调度问题
```

