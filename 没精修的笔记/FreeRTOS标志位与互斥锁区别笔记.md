# FreeRTOS 标志位与互斥锁区别笔记

> 适合对象：以前在 51、GD32、STM32 裸机里经常用全局变量标志位，现在刚接触 ESP32 + FreeRTOS，同步互斥概念还不熟的同学。  
> 学习目标：搞清楚 <span style="color:#1565c0;"><b>标志位可以做通知，但不能可靠地做互斥锁</b></span>，并理解这和单核、双核、抢占式调度的关系。

---

## 0. 先给结论

<span style="color:#d32f2f;"><b>全局变量标志位不是完全不能用，但不能把它当作可靠的互斥锁。</b></span>

一句话理解：

```text
标志位像门口贴一张纸：里面有人。
互斥锁像真正的门锁：一个人进去后，别人打不开门。
```

所以：

```text
标志位适合做“提醒/通知”
互斥锁适合做“保护共享资源”
```

---

## 1. 你以前为什么觉得标志位能用

在 51、GD32、STM32 裸机里，经常写：

```c
volatile uint8_t flag = 0;

int main(void)
{
    while (1)
    {
        if (flag)
        {
            flag = 0;
            // 处理事件
        }
    }
}
```

或者中断里置位：

```c
void Timer_ISR(void)
{
    flag = 1;
}
```

主循环里处理：

```c
if (flag)
{
    flag = 0;
    // 执行任务
}
```

这种写法很多时候能用，是因为裸机模型简单：

```text
单核
主循环顺序执行
没有多个任务抢占
共享资源访问简单
中断逻辑短
```

这类标志位更多是在做：

```text
事件通知
```

而不是严格的：

```text
互斥保护
```

---

## 2. 什么是共享资源

共享资源就是：

```text
多个任务/中断/核心都可能访问的同一个东西
```

常见共享资源：

```text
全局变量
链表
环形缓冲区
串口发送缓冲
I2C/SPI 总线
LCD 显示接口
malloc/free 管理的堆
```

例如两个任务都操作同一个链表：

```text
task1：list_push_back()
task2：list_pop_back()
```

这个链表就是共享资源。

---

## 3. 标志位互斥的典型错误写法

很多人会这样写：

```c
volatile int lock = 0;

void task1(void *arg)
{
    if (lock == 0)
    {
        lock = 1;

        // 操作共享资源
        list_push_back(&list, 1);

        lock = 0;
    }
}
```

看起来像：

```text
lock = 0：没人用
lock = 1：有人正在用
```

但问题是：

```c
if (lock == 0)
{
    lock = 1;
}
```

<span style="color:#d32f2f;"><b>这不是一步完成的原子操作。</b></span>

CPU 实际大概会拆成：

```text
1. 从内存读取 lock
2. 判断 lock 是否为 0
3. 写 lock = 1
```

如果在第 1 步和第 3 步之间发生任务切换，就会出问题。

---

## 4. 单核 FreeRTOS 下为什么也会出问题

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

结果：

```text
task1 和 task2 都进去了
互斥失败
```

所以：

<span style="color:#d32f2f;"><b>不是只有双核才会让标志位互斥失效，单核抢占式 RTOS 也会。</b></span>

---

## 5. 双核 ESP32 下为什么更危险

ESP32、ESP32-S3 这类芯片可能有两个核心。

双核时，两个任务可能真的同时运行：

```text
Core 0：运行 task1
Core 1：运行 task2
```

可能发生：

```text
lock = 0

Core 0: 读 lock -> 0
Core 1: 读 lock -> 0

Core 0: 写 lock = 1，进入共享资源
Core 1: 写 lock = 1，也进入共享资源
```

图：

```text
        lock = 0

Core 0                 Core 1
------                 ------
读 lock 得到 0          读 lock 得到 0
判断可以进入            判断可以进入
写 lock = 1             写 lock = 1
进入临界区              进入临界区
```

结果：

```text
两个核心同时进入临界区
共享资源可能被改坏
```

---

## 6. volatile 能不能解决

不能。

很多同学会写：

```c
volatile int lock = 0;
```

`volatile` 的作用是：

```text
告诉编译器：这个变量可能随时被外部改变，每次都要真的读写内存，不要优化掉
```

它能解决：

```text
编译器优化导致读不到最新值
```

但它不能解决：

```text
读 lock 和写 lock 之间被打断
两个核心同时读写
操作不是原子的
任务调度竞争
缓存和内存顺序问题
```

<span style="color:#d32f2f;"><b>重点记住：</b></span>

```text
volatile 不是锁
volatile 不能保证互斥
volatile 不能保证原子性
```

---

## 7. 原子性是什么

原子性的人话版：

```text
一个动作要么完整做完，要么完全没做，中间不能被插队
```

例如你以为：

```c
lock = 1;
```

很简单。

但更危险的是这种组合：

```c
if (lock == 0)
{
    lock = 1;
}
```

它包含：

```text
读取
判断
写入
```

这个整体不是原子的。

互斥锁强就强在：

```text
拿锁这个动作由系统保证，不会出现两个任务都以为自己拿到了锁
```

---

## 8. 真正的互斥锁 Mutex 怎么写

创建互斥锁：

```c
SemaphoreHandle_t list_mutex;

void app_main(void)
{
    list_mutex = xSemaphoreCreateMutex();
}
```

保护链表：

```c
xSemaphoreTake(list_mutex, portMAX_DELAY);

list_push_back(&list, data);

xSemaphoreGive(list_mutex);
```

人话：

```text
拿锁
操作共享资源
放锁
```

如果别的任务已经拿了锁：

```text
当前任务会等待
不会直接闯进去
```

---

## 9. Mutex 比标志位强在哪里

| 对比 | 标志位 | Mutex |
|---|---|---|
| 是否可靠互斥 | 不可靠 | 可靠 |
| 是否配合调度器 | 不配合 | 配合 |
| 拿不到时 | 需要你自己处理，常常空转 | 可以阻塞等待 |
| 多核场景 | 容易失效 | 系统机制保护 |
| 优先级反转处理 | 没有 | 通常支持优先级继承 |
| 适合保护链表/总线 | 不适合 | 适合 |

人话类比：

```text
标志位：自己写纸条
Mutex：系统发的钥匙和门锁
```

---

## 10. 标志位还能不能用

能用，但要用对地方。

### 10.1 可以用：简单事件通知

例如：

```c
volatile int button_pressed = 0;

void button_isr(void)
{
    button_pressed = 1;
}

void task(void *arg)
{
    while (1)
    {
        if (button_pressed)
        {
            button_pressed = 0;
            // 处理按键
        }

        vTaskDelay(pdMS_TO_TICKS(10));
    }
}
```

这种场景里，标志位表达的是：

```text
有事情发生了
```

不是：

```text
我要独占某个复杂资源
```

### 10.2 不推荐用：保护复杂共享资源

这些不要用普通标志位保护：

```text
链表
队列
环形缓冲区
多个变量组成的状态
SPI/I2C 总线
LCD 显示驱动
文件系统
malloc/free 操作
```

这些应该优先考虑：

```text
Mutex
Semaphore
Queue
Critical Section
Task Notification
```

---

## 11. 同步和互斥不要混

### 11.1 互斥

互斥解决：

```text
同一时刻只能一个任务访问共享资源
```

典型工具：

```text
Mutex
```

例子：

```c
xSemaphoreTake(list_mutex, portMAX_DELAY);
list_push_back(&list, data);
xSemaphoreGive(list_mutex);
```

### 11.2 同步

同步解决：

```text
一个任务要等另一个任务完成某件事
```

典型工具：

```text
Semaphore
Queue
Task Notification
```

例子：

```text
生产者放入数据
消费者等到有数据再取
```

伪代码：

```c
// 生产者
xSemaphoreGive(data_sem);

// 消费者
xSemaphoreTake(data_sem, portMAX_DELAY);
```

---

## 12. 51/GD32 裸机和 ESP32 FreeRTOS 的区别

| 场景 | 标志位为什么看起来能用/为什么变危险 |
|---|---|
| 51 裸机 | 主循环顺序跑，中断简单 |
| GD32 裸机 | 多数情况单核、无任务抢占 |
| STM32/GD32 + RTOS | 多任务抢资源，标志位开始危险 |
| ESP32 单核 FreeRTOS | 有抢占式任务切换，标志位互斥不可靠 |
| ESP32 双核 FreeRTOS | 两个核心可能真并行，更不可靠 |

运行模型变化：

```text
以前：
主循环 + 少量中断

现在：
多个任务 + 抢占调度 + 可能双核并行
```

所以不是 ESP32 变麻烦，而是：

```text
系统并发程度变高了
原来的简单标志位方法不够用了
```

---

## 13. 该用什么工具：选择表

| 需求 | 推荐工具 |
|---|---|
| 简单通知“发生了某件事” | 标志位 / Task Notification / Binary Semaphore |
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

## 14. 错误写法和正确写法

### 14.1 错误：用标志位当锁

```c
volatile int lock = 0;

if (lock == 0)
{
    lock = 1;

    list_push_back(&list, data);

    lock = 0;
}
```

问题：

```text
检查 lock 和设置 lock 不是原子操作
可能两个任务同时进入
```

---

### 14.2 正确：用 Mutex

```c
xSemaphoreTake(list_mutex, portMAX_DELAY);

list_push_back(&list, data);

xSemaphoreGive(list_mutex);
```

人话：

```text
拿到锁才能操作链表
没拿到就等
操作完释放锁
```

---

### 14.3 更完整的生产者/消费者模型

生产者：

```c
while (1)
{
    int data = 123;

    xSemaphoreTake(list_mutex, portMAX_DELAY);
    list_push_back(&list, data);
    xSemaphoreGive(list_mutex);

    xSemaphoreGive(data_sem);  // 通知有数据

    vTaskDelay(pdMS_TO_TICKS(500));
}
```

消费者：

```c
while (1)
{
    xSemaphoreTake(data_sem, portMAX_DELAY);  // 等数据

    xSemaphoreTake(list_mutex, portMAX_DELAY);
    list_pop_back(&list);
    xSemaphoreGive(list_mutex);
}
```

这里：

```text
list_mutex：保证链表安全
data_sem：保证有数据才消费
```

---

## 15. 常见坑

| 坑 | 后果 | 正确理解 |
|---|---|---|
| 以为 `volatile` 就是锁 | 仍然会竞争 | volatile 只防编译器优化 |
| 用 `if(lock==0) lock=1` 当互斥 | 两个任务可能同时进入 | 这不是原子操作 |
| 单核就不加锁 | 任务切换仍然会打断 | 单核 RTOS 也有并发问题 |
| 双核共享变量不保护 | 两个核心可能同时改 | 用 mutex/critical/atomic |
| 把同步和互斥混为一谈 | 逻辑混乱 | 同步是等条件，互斥是保护资源 |
| 拿锁后忘记释放 | 其他任务永远等 | `Take` 和 `Give` 成对 |

---

## 16. 小白记忆口诀

```text
标志位是提醒，不是门锁。
volatile 防优化，不防竞争。
单核 RTOS 也会任务切换。
双核 ESP32 可能真的同时执行。
保护共享资源用 mutex。
等别人通知用 semaphore。
传数据优先用 queue。
```

---

## 17. 最后再压一遍重点

<span style="color:#d32f2f;"><b>不要这样理解：</b></span>

```text
我有一个全局 lock 变量，所以它就是锁。
```

<span style="color:#1565c0;"><b>应该这样理解：</b></span>

```text
真正的锁必须保证“检查并占用”这个过程不会被别人插队。
普通全局变量做不到。
FreeRTOS 的 mutex 才是系统提供的可靠互斥机制。
```

