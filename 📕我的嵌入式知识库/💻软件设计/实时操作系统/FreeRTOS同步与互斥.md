---
version: V2.0
updated: 2026-05-04
author: RUI
tags: [软件]
---

# FreeRTOS 同步、互斥与任务调度

## 目录

- [先给结论](FreeRTOS同步与互斥.md#先给结论)
- [总地图：所有工具一览](FreeRTOS同步与互斥.md#总地图所有工具一览)
- [任务状态：FreeRTOS 最底层的理解入口](FreeRTOS同步与互斥.md#任务状态freertos-最底层的理解入口)
- [vTaskDelay 和 esp_rom_delay_us 的区别](FreeRTOS同步与互斥.md#vtaskdelay-和-esp_rom_delay_us-的区别)
- [同步：信号量和队列解决的是谁等谁](FreeRTOS同步与互斥.md#同步信号量和队列解决的是谁等谁)
- [互斥：Mutex 解决的是资源归谁用](FreeRTOS同步与互斥.md#互斥mutex-解决的是资源归谁用)
- [为什么标志位不能当互斥锁](FreeRTOS同步与互斥.md#为什么标志位不能当互斥锁)
- [优先级翻转和优先级继承](FreeRTOS同步与互斥.md#优先级翻转和优先级继承)
- [递归 Mutex：可以嵌套拿的互斥锁](FreeRTOS同步与互斥.md#递归-mutex可以嵌套拿的互斥锁)
- [临界区和自旋锁：保护极短代码段](FreeRTOS同步与互斥.md#临界区和自旋锁保护极短代码段)
- [如何选择正确的工具](FreeRTOS同步与互斥.md#如何选择正确的工具)
- [竞赛和工程中的应用](FreeRTOS同步与互斥.md#竞赛和工程中的应用)
- [常见错误与正确写法](FreeRTOS同步与互斥.md#常见错误与正确写法)
- [记忆口诀](FreeRTOS同步与互斥.md#记忆口诀)
- [最后总结](FreeRTOS同步与互斥.md#最后总结)

---

## 先给结论

FreeRTOS 不是简单地学一堆 API，而是要先理解这几个核心问题：

```text
1. CPU 现在该给哪个任务运行？
   -> 任务状态、任务调度、优先级

2. 一个任务什么时候该等另一个任务？
   -> 同步、信号量、队列、任务通知

3. 多个任务同时访问同一个东西怎么办？
   -> Mutex、临界区、自旋锁

4. 任务没事做时应该怎么办？
   -> 阻塞、延时、等待事件，不要空转
```

**今天最重要的一句话：FreeRTOS 学的不是 API 清单，而是任务之间如何等待、让出 CPU、传递数据、保护共享资源。**

---

## 总地图：所有工具一览

| 概念 | 主要解决什么问题 | 人话理解 | 常见 API |
|---|---|---|---|
| 任务状态 | 谁能运行，谁在等待 | 任务当前是在跑、等 CPU，还是被阻塞 | `vTaskDelay`、等待信号量、等待队列 |
| 二值信号量 | 事件同步 | A 做完了，通知 B | `xSemaphoreGive` / `xSemaphoreTake` |
| 队列 | 数据同步 | A 把数据交给 B | `xQueueSend` / `xQueueReceive` |
| Mutex | 互斥保护资源 | 谁拿到锁，谁用资源 | `xSemaphoreCreateMutex` |
| 递归 Mutex | 嵌套互斥 | 同一个任务可以重复拿同一把锁 | `xSemaphoreCreateRecursiveMutex` |
| 临界区 | 极短代码保护 | 这几行不要被打断 | `taskENTER_CRITICAL` |
| 自旋锁 | 多核临界区保护 | 一个核心拿锁，另一个核心原地等 | `portMUX_TYPE` |

核心关系：

```text
同步关心：任务之间的先后关系
互斥关心：共享资源一次只能被一个任务使用
队列关心：任务之间传递数据
临界区关心：极短代码段不能被打断
```

---

## 任务状态：FreeRTOS 最底层的理解入口

### 这是干什么的

FreeRTOS 里，一个任务不是永远占着 CPU 跑。它会在几种状态之间切换：

```text
Running：正在运行
Ready：已经准备好，可以运行，但还没轮到它
Blocked：暂时不能运行，因为在等时间、信号量、队列等
Suspended：被挂起，暂时不参与调度
```

常见状态变化：

```text
Running -> Blocked
    调用了 vTaskDelay
    等待信号量
    等待队列

Blocked -> Ready
    延时时间到了
    信号量被 Give
    队列收到数据

Ready -> Running
    调度器选择它运行
```

### 为什么要这样做

裸机开发里常见结构是：

```text
main while(1) 一直跑
中断偶尔打断
```

FreeRTOS 里变成：

```text
task1 有自己的 while(1)
task2 有自己的 while(1)
task3 有自己的 while(1)
```

但是同一个 CPU 核心同一时刻只能真正运行一个任务，所以必须有调度器决定谁运行。

**FreeRTOS 的重点不是写很多 while(1)，而是让任务在该运行时运行，在该等待时阻塞。**

---

## vTaskDelay 和 esp_rom_delay_us 的区别

### 先给结论

```text
vTaskDelay：
任务主动进入 Blocked，释放 CPU。

esp_rom_delay_us：
当前任务忙等，不主动释放 CPU。
```

### 对比表

| 函数 | 来自哪里 | 单位 | 任务状态 | 是否主动让出 CPU | 适合场景 |
|---|---|---|---|---|---|
| `vTaskDelay()` | FreeRTOS | tick | 进入 Blocked | 是 | ms 级、周期性任务延时 |
| `esp_rom_delay_us()` | ESP ROM 底层函数 | us | 通常仍在 Running | 否 | 很短的硬件时序等待 |

### 为什么 esp_rom_delay_us 还能被高优先级任务打断

`esp_rom_delay_us()` 不会主动让出 CPU，但它不是关中断，也不是禁止调度。

如果低优先级任务正在忙等，高优先级任务从 Blocked 变成 Ready，只要当前没有关中断、没有处在长临界区，调度器通常会让高优先级任务抢占低优先级任务。

一句话：

```text
vTaskDelay 是"我主动睡觉让位"。
esp_rom_delay_us 是"我站在原地硬等，但高优先级任务来了仍可能把我挤下去"。
```

### 怎么用

任务里等 1 秒：

```c
vTaskDelay(pdMS_TO_TICKS(1000));
```

硬件时序里等 10 微秒：

```c
esp_rom_delay_us(10);
```

不推荐：

```c
esp_rom_delay_us(1000000);  // 不适合在任务里忙等 1 秒
```

---

## 同步：信号量和队列解决的是谁等谁

### 信号量是什么

信号量不是普通全局变量标志位。

普通标志位：

```c
int flag = 0;
```

如果任务一直这样等：

```c
while (flag == 0)
{
}
```

这会空转，占 CPU。

信号量的作用是：

```text
如果没有信号，任务进入 Blocked。
等别人 Give 后，任务再被唤醒。
```

常见理解：

```text
二值信号量：事情发生了吗？
计数信号量：发生了几次？还有几个资源名额？
```

### 队列是什么

队列可以理解成"带数据的同步工具"。

| 工具 | 有没有数据 | 主要用途 |
|---|---|---|
| 二值信号量 | 没有 | 事件通知 |
| 计数信号量 | 没有 | 事件计数、资源计数 |
| 队列 | 有 | 任务间传数据 |

### 简单伪代码

```c
// PIR 传感器任务：只通知"检测到人"
void task_pir(void *param)
{
    while (1) {
        if (pir_detected()) {
            xSemaphoreGive(person_sem);
        }
        vTaskDelay(pdMS_TO_TICKS(50));
    }
}

// 摄像头任务：等通知，然后产生识别结果
void task_camera(void *param)
{
    result_t result;
    while (1) {
        xSemaphoreTake(person_sem, portMAX_DELAY);
        result = camera_detect();
        xQueueSend(result_queue, &result, portMAX_DELAY);
    }
}

// 显示任务：等数据，然后显示
void task_display(void *param)
{
    result_t result;
    while (1) {
        xQueueReceive(result_queue, &result, portMAX_DELAY);
        display_result(result);
    }
}
```

---

## 互斥：Mutex 解决的是资源归谁用

### Mutex 是什么意思

`Mutex` 是 `mutual exclusion` 的缩写，意思是"互相排斥"。

在 FreeRTOS 里，Mutex 的意思是：**同一时刻，只允许一个任务使用某个共享资源。**

共享资源包括：

| 共享资源 | 为什么需要保护 |
|---|---|
| OLED / LCD | 多个任务同时写，显示内容可能交叉 |
| UART 串口 | 多个任务同时打印，日志可能混在一起 |
| I2C / SPI 总线 | 总线时序不能被多个任务乱插 |
| 全局结构体 | 一个任务写一半，另一个任务读到半成品 |
| 摄像头缓冲区 | 一个任务写图像，一个任务读图像，可能读到错误数据 |

### Mutex 和二值信号量的区别

| 对比点 | 二值信号量 | Mutex |
|---|---|---|
| 核心用途 | 同步通知 | 互斥保护 |
| 人话 | 事情发生了吗？ | 资源现在归谁用？ |
| 有没有 owner | 没有明显 owner | 有 owner |
| 优先级继承 | 没有 | 有 |
| ISR 中使用 | 可用 FromISR 类 API | 不应该在 ISR 中用 |

**一句话：二值信号量是通知工具，Mutex 是资源保护工具。**

### 基本写法

```c
SemaphoreHandle_t oled_mutex;
oled_mutex = xSemaphoreCreateMutex();

// 使用时：
xSemaphoreTake(oled_mutex, portMAX_DELAY);
// 访问 OLED / I2C / 全局资源
xSemaphoreGive(oled_mutex);
```

人话解释：

```text
Take：我要用这个资源，先拿锁。
资源访问：拿到锁后才真正操作共享资源。
Give：我用完了，把锁还回去。
```

### 同一个资源为什么要用同一把锁

同一个 OLED 如果用两把不同的锁：

```text
task1 用 oled_lock_1
task2 用 oled_lock_2
```

看似都加锁了，实际上没有互斥效果——两个任务可能同时操作 OLED。

**原则：同一个共享资源，必须用同一把锁保护。**

---

## 为什么标志位不能当互斥锁

> 本节整合自标志位 vs 互斥锁专题笔记。

### 你以前为什么觉得标志位能用

在 51、GD32、STM32 裸机里，经常写：

```c
volatile uint8_t flag = 0;

int main(void) {
    while (1) {
        if (flag) { flag = 0; /* 处理事件 */ }
    }
}

void Timer_ISR(void) { flag = 1; }
```

这种写法很多时候能用，是因为裸机模型简单：单核、主循环顺序执行、没有多任务抢占。

这类标志位更多是在做**事件通知**，而不是严格的**互斥保护**。

### 标志位互斥的典型错误写法

```c
volatile int lock = 0;

void task1(void *arg) {
    if (lock == 0) {
        lock = 1;
        list_push_back(&list, 1);  // 操作共享资源
        lock = 0;
    }
}
```

问题是 `if (lock == 0) { lock = 1; }` 不是原子操作。CPU 实际会拆成：

```text
1. 从内存读取 lock
2. 判断 lock 是否为 0
3. 写 lock = 1
```

如果在第 1 步和第 3 步之间发生任务切换，就会出问题。

### 单核 FreeRTOS 下为什么也会出问题

即使只有一个核心，也可能这样：

```text
lock = 0

task1 读取 lock，发现 lock == 0
    ↓
task1 还没来得及 lock = 1
    ↓
FreeRTOS 切换到 task2
    ↓
task2 读取 lock，也发现 lock == 0
    ↓
task2 设置 lock = 1，进入临界区
    ↓
切回 task1
    ↓
task1 继续设置 lock = 1，也进入临界区
```

**结果：task1 和 task2 都进去了，互斥失败。**

### 双核 ESP32 下为什么更危险

两个核心可能真的同时运行：

```text
Core 0: 读 lock -> 0
Core 1: 读 lock -> 0

Core 0: 写 lock = 1，进入共享资源
Core 1: 写 lock = 1，也进入共享资源
```

**两个核心同时进入临界区，共享资源可能被改坏。**

### volatile 能不能解决

不能。

`volatile` 的作用是告诉编译器：这个变量可能随时被外部改变，每次都要真的读写内存。

它能解决编译器优化导致读不到最新值的问题，但不能解决：

```text
读 lock 和写 lock 之间被打断
两个核心同时读写
操作不是原子的
任务调度竞争
缓存和内存顺序问题
```

**重点记住：volatile 不是锁，volatile 不能保证互斥，volatile 不能保证原子性。**

### 标志位还能不能用

能用，但要用对地方。

**可以用：简单事件通知**

```c
volatile int button_pressed = 0;

void button_isr(void) { button_pressed = 1; }

void task(void *arg) {
    while (1) {
        if (button_pressed) {
            button_pressed = 0;
            // 处理按键
        }
        vTaskDelay(pdMS_TO_TICKS(10));
    }
}
```

**不推荐用：保护复杂共享资源**——链表、队列、环形缓冲区、SPI/I2C 总线、LCD 显示驱动、文件系统、malloc/free 操作。这些应该优先考虑 Mutex、Semaphore、Queue、Critical Section。

---

## 优先级翻转和优先级继承

### 优先级翻转是什么

假设有三个任务：

```text
task_H：高优先级
task_M：中优先级
task_L：低优先级
```

发生过程：

```text
1. task_L 拿到锁，正在使用 I2C
2. task_H 也想用 I2C，但锁被 task_L 拿着，只能阻塞
3. task_M 不需要 I2C，但它优先级比 task_L 高
4. task_M 一直运行，导致 task_L 没机会释放锁
5. task_H 明明优先级最高，却一直等着
```

这就叫优先级翻转：**高优先级任务反而被低优先级任务间接卡住。**

### 优先级继承是什么

Mutex 有 owner 概念。

当高优先级任务等待低优先级任务手里的 Mutex 时，FreeRTOS 会临时提高低优先级任务的优先级：

```text
task_L 拿着 Mutex
task_H 等这个 Mutex

FreeRTOS 临时提高 task_L 的优先级
让 task_L 尽快运行并释放 Mutex

task_L 释放 Mutex 后
task_H 获得 Mutex 继续运行
task_L 优先级恢复
```

一句话：

```text
Mutex 不只是锁门，还能让拿钥匙的人临时提权，赶紧把门打开。
```

这就是为什么普通二值信号量不适合拿来做互斥锁——二值信号量没有优先级继承，Mutex 有。

---

## 递归 Mutex：可以嵌套拿的互斥锁

### 先给结论

递归 Mutex 可以理解成：**同一个任务可以重复拿同一把锁。Take 几次，就必须 Give 几次。**

它不是默认更高级，也不是必须总用。**能用普通 Mutex 设计清楚，就优先用普通 Mutex。**

### 为什么会需要递归 Mutex

问题一般出现在函数嵌套调用。例如 `oled_show_page()` 拿锁后调用 `oled_clear()`，而 `oled_clear()` 内部也拿同一把普通 Mutex——就会变成同一个任务自己等自己，可能卡住。

递归 Mutex 允许同一个任务重复拿同一把锁：

```c
xSemaphoreTakeRecursive(oled_mutex, portMAX_DELAY); // 计数 = 1
xSemaphoreTakeRecursive(oled_mutex, portMAX_DELAY); // 计数 = 2

xSemaphoreGiveRecursive(oled_mutex); // 计数 = 1
xSemaphoreGiveRecursive(oled_mutex); // 计数 = 0，锁真正释放
```

### 更推荐的普通设计

如果代码由自己控制，更推荐：外层函数拿锁，内层函数不拿锁。

```c
void oled_show_page(void) {
    xSemaphoreTake(oled_mutex, portMAX_DELAY);
    oled_clear_nolock();
    oled_draw_value_nolock(123);
    xSemaphoreGive(oled_mutex);
}
```

`_nolock` 表示：这个函数默认调用者已经拿好锁，它自己不再重复拿锁。

---

## 临界区和自旋锁：保护极短代码段

### 临界区是什么

临界区就是：**这一小段代码不能被任务切换或中断打断。**

```c
taskENTER_CRITICAL(&mux);
// 极短共享变量操作
taskEXIT_CRITICAL(&mux);
```

### 为什么不能乱用

临界区通常会影响调度或中断响应。原则是：

```text
临界区只包极短代码。
不要在临界区里打印日志。
不要在临界区里 vTaskDelay。
不要在临界区里做 I2C/SPI 长事务。
```

### 自旋锁

ESP32 是多核芯片时，自旋锁用于：一个核心拿到锁后，另一个核心在原地等。初学阶段先记住：

```text
任务级资源保护：优先想 Mutex。
极短底层保护：再想临界区 / 自旋锁。
```

---

## 如何选择正确的工具

| 需求 | 推荐工具 |
|---|---|
| 简单通知"发生了某件事" | 标志位 / Task Notification / Binary Semaphore |
| 保护链表、全局结构体、外设总线 | Mutex |
| 一个任务等另一个任务发信号 | Semaphore |
| 传递数据 | Queue |
| 超短时间保护，不允许被打断 | Critical Section |
| 中断通知任务 | Task Notification / Semaphore from ISR |

小白阶段可以先记：

```text
保护资源用 Mutex
通知事件用 Semaphore 或 Task Notification
传数据用 Queue
```

---

## 竞赛和工程中的应用

假设做一个"人体入侵检测报警系统"：

```text
PIR / 雷达传感器任务 → 二值信号量 → 摄像头识别任务
    → 队列(识别结果) → 显示任务 / 报警任务 / 上传任务

OLED、I2C、UART、全局结果结构体 → Mutex 保护共享资源
```

伪代码：

```c
SemaphoreHandle_t person_sem;     // 同步：有人来了
QueueHandle_t result_queue;       // 传数据：识别结果
SemaphoreHandle_t i2c_mutex;      // 互斥：保护 I2C/OLED

void task_pir(void *param) {
    while (1) {
        if (pir_detected()) xSemaphoreGive(person_sem);
        vTaskDelay(pdMS_TO_TICKS(50));
    }
}

void task_camera(void *param) {
    result_t result;
    while (1) {
        xSemaphoreTake(person_sem, portMAX_DELAY);
        result = camera_detect();
        xQueueSend(result_queue, &result, portMAX_DELAY);
    }
}

void task_oled(void *param) {
    result_t result;
    while (1) {
        xQueueReceive(result_queue, &result, portMAX_DELAY);
        xSemaphoreTake(i2c_mutex, portMAX_DELAY);
        oled_show_result(result);
        xSemaphoreGive(i2c_mutex);
    }
}
```

| 设计点 | 工具 | 原因 |
|---|---|---|
| PIR 通知摄像头 | 二值信号量 | 只需要通知事件发生，不需要传数据 |
| 摄像头传识别结果 | 队列 | 要把结果数据交给其他任务 |
| OLED / I2C 使用 | Mutex | 多个任务可能共用同一个显示或总线 |

---

## 常见错误与正确写法

### 错误：用标志位当锁

```c
volatile int lock = 0;
if (lock == 0) {
    lock = 1;
    list_push_back(&list, data);
    lock = 0;
}
```
问题：检查 lock 和设置 lock 不是原子操作。

### 正确：用 Mutex

```c
xSemaphoreTake(list_mutex, portMAX_DELAY);
list_push_back(&list, data);
xSemaphoreGive(list_mutex);
```

### 更完整的生产者/消费者模型

```c
// 生产者
xSemaphoreTake(list_mutex, portMAX_DELAY);
list_push_back(&list, data);
xSemaphoreGive(list_mutex);
xSemaphoreGive(data_sem);  // 通知有数据

// 消费者
xSemaphoreTake(data_sem, portMAX_DELAY);  // 等数据
xSemaphoreTake(list_mutex, portMAX_DELAY);
list_pop_back(&list);
xSemaphoreGive(list_mutex);
```

这里：`list_mutex` 保证链表安全，`data_sem` 保证有数据才消费。

### 常见坑

| 坑 | 后果 | 正确理解 |
|---|---|---|
| 以为 `volatile` 就是锁 | 仍然会竞争 | volatile 只防编译器优化 |
| 用 `if(lock==0) lock=1` 当互斥 | 两个任务可能同时进入 | 这不是原子操作 |
| 单核就不加锁 | 任务切换仍然会打断 | 单核 RTOS 也有并发问题 |
| 双核共享变量不保护 | 两个核心可能同时改 | 用 mutex/critical/atomic |
| 把同步和互斥混为一谈 | 逻辑混乱 | 同步是等条件，互斥是保护资源 |
| 拿锁后忘记释放 | 其他任务永远等 | Take 和 Give 成对 |
| 拿着 Mutex 做很慢的事 | 别人用不了资源 | 锁内不放延时 |
| 错误分支忘 Give | 锁泄露 | 所有 return 前检查 |
| 滥用递归 Mutex | 设计混乱 | 优先用普通 Mutex + _nolock |

---

## 记忆口诀

### 工具选择口诀

```text
信号量问：事情发生了吗？
队列问：数据来了吗？
Mutex 问：资源现在归谁用？
递归 Mutex 问：是不是同一个任务又进来了？
临界区问：这几行能不能被打断？
```

### 同步和互斥口诀

```text
同步管先后。
互斥管独占。
队列管数据。
临界区管极短。
```

### Mutex 口诀

```text
同一资源一把锁。
拿锁用资源。
用完马上还。
拿几次还几次。
```

### 标志位口诀

```text
标志位是提醒，不是门锁。
volatile 防优化，不防竞争。
单核 RTOS 也会任务切换。
双核 ESP32 可能真的同时执行。
```

---

## 最后总结

FreeRTOS 的核心是 **调度、等待、传数据、保护共享资源**。

以后看到一个 API，先问：

```text
它是在让任务阻塞吗？
它是在唤醒任务吗？
它是在传数据吗？
它是在保护资源吗？
它会不会影响调度和中断？
```

能回答这几个问题，API 就不是孤立的了。

---

## 相关笔记

- [[FreeRTOS任务与调度]] — 任务创建、延时、句柄
- [[../../🧠MCU底层原理/CPU架构与内存模型]] — 双核为什么更危险
