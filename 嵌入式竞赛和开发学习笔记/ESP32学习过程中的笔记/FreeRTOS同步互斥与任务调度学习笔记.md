# FreeRTOS 同步、互斥与任务调度学习笔记

文档版本：V1.2  
最后更新日期：2026-05-01  
开发者：RUI  

## 更新记录

| 版本 | 日期 | 更新内容 |
|---|---|---|
| V1.2 | 2026-05-01 | 按“只有一级标题显示数字，二级及以下标题不显示编号”的规则重新整理标题 |
| V1.1 | 2026-05-01 | 修正文档总目录和正文标题编号，统一为“第 N 章 / N.x 小节”格式 |
| V1.0 | 2026-05-01 | 整理 FreeRTOS 任务状态、延时、同步、队列、Mutex、优先级继承、递归 Mutex、临界区和工程应用理解 |

## 文档总目录

- 1. 先给结论
- 2. 先建立总地图
- 3. 任务状态：FreeRTOS 最底层的理解入口
- 4. vTaskDelay 和 esp_rom_delay_us 的区别
- 5. 同步：信号量和队列解决的是谁等谁
- 6. 互斥：Mutex 解决的是资源归谁用
- 7. 优先级翻转和优先级继承
- 8. 递归 Mutex：可以嵌套拿的互斥锁
- 9. 临界区和自旋锁：保护极短代码段
- 10. 放进竞赛和工程项目里理解
- 11. 常见错误
- 12. 记忆口诀
- 13. 后续学习建议
- 14. 最后总结

## 1. 先给结论

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

今天最重要的一句话：

<span style="color:red">FreeRTOS 学的不是 API 清单，而是任务之间如何等待、让出 CPU、传递数据、保护共享资源。</span>

## 2. 先建立总地图

把今天学到的东西放在一张表里：

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

## 3. 任务状态：FreeRTOS 最底层的理解入口

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

<span style="color:blue">FreeRTOS 的重点不是写很多 while(1)，而是让任务在该运行时运行，在该等待时阻塞。</span>

## 4. vTaskDelay 和 esp_rom_delay_us 的区别

### 先给结论

```text
vTaskDelay：
任务主动进入 Blocked，释放 CPU。

esp_rom_delay_us：
当前任务忙等，不主动释放 CPU。
```

### 对比表

| 函数 | 来自哪里 | 单位 | 任务状态 | 是否主动让出 CPU | 适合场景 |
|---|---|---:|---|---|---|
| `vTaskDelay()` | FreeRTOS | tick | 进入 Blocked | 是 | ms 级、周期性任务延时 |
| `esp_rom_delay_us()` | ESP ROM 底层函数 | us | 通常仍在 Running | 否 | 很短的硬件时序等待 |

### 为什么 esp_rom_delay_us 还能被高优先级任务打断

`esp_rom_delay_us()` 不会主动让出 CPU，但它不是关中断，也不是禁止调度。

如果低优先级任务正在忙等：

```text
task_low 正在 esp_rom_delay_us()
```

这时高优先级任务从 Blocked 变成 Ready：

```text
task_high 变成 Ready
```

只要当前没有关中断、没有处在长临界区，调度器通常会让高优先级任务抢占低优先级任务：

```text
task_low 被打断
task_high 开始运行
task_high 运行完后
task_low 继续执行刚才的延时附近代码
```

一句话：

```text
vTaskDelay 是“我主动睡觉让位”。
esp_rom_delay_us 是“我站在原地硬等，但高优先级任务来了仍可能把我挤下去”。
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

## 5. 同步：信号量和队列解决的是谁等谁

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

队列可以理解成“带数据的同步工具”。

信号量：

```text
只告诉你：事情发生了
不告诉你：具体数据是什么
```

队列：

```text
告诉你：数据来了
还把数据交给你
```

对比：

| 工具 | 有没有数据 | 主要用途 |
|---|---|---|
| 二值信号量 | 没有 | 事件通知 |
| 计数信号量 | 没有 | 事件计数、资源计数 |
| 队列 | 有 | 任务间传数据 |

### 简单伪代码

```c
// PIR 传感器任务：只通知“检测到人”
void task_pir(void *param)
{
    while (1)
    {
        if (pir_detected())
        {
            xSemaphoreGive(person_sem);
        }

        vTaskDelay(pdMS_TO_TICKS(50));
    }
}
```

```c
// 摄像头任务：等通知，然后产生识别结果
void task_camera(void *param)
{
    result_t result;

    while (1)
    {
        xSemaphoreTake(person_sem, portMAX_DELAY);

        result = camera_detect();

        xQueueSend(result_queue, &result, portMAX_DELAY);
    }
}
```

```c
// 显示任务：等数据，然后显示
void task_display(void *param)
{
    result_t result;

    while (1)
    {
        xQueueReceive(result_queue, &result, portMAX_DELAY);

        display_result(result);
    }
}
```

## 6. 互斥：Mutex 解决的是资源归谁用

### Mutex 是什么意思

`Mutex` 是 `mutual exclusion` 的缩写，意思是“互相排斥”。

在 FreeRTOS 里，Mutex 的意思是：

```text
同一时刻，只允许一个任务使用某个共享资源。
```

共享资源包括：

| 共享资源 | 为什么需要保护 |
|---|---|
| OLED / LCD | 多个任务同时写，显示内容可能交叉 |
| UART 串口 | 多个任务同时打印，日志可能混在一起 |
| I2C / SPI 总线 | 总线时序不能被多个任务乱插 |
| 全局结构体 | 一个任务写一半，另一个任务读到半成品 |
| 摄像头缓冲区 | 一个任务写图像，另一个任务读图像，可能读到错误数据 |

### Mutex 和二值信号量的区别

| 对比点 | 二值信号量 | Mutex |
|---|---|---|
| 核心用途 | 同步通知 | 互斥保护 |
| 人话 | 事情发生了吗？ | 资源现在归谁用？ |
| 有没有 owner | 没有明显 owner | 有 owner |
| 优先级继承 | 没有 | 有 |
| ISR 中使用 | 可用 FromISR 类 API | 不应该在 ISR 中用 |

一句话：

<span style="color:red">二值信号量是通知工具，Mutex 是资源保护工具。</span>

### 基本写法

```c
SemaphoreHandle_t oled_mutex;

oled_mutex = xSemaphoreCreateMutex();
```

使用时：

```c
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

看似都加锁了，实际上没有互斥效果：

```text
task1 拿到 oled_lock_1，可以操作 OLED
task2 同时拿到 oled_lock_2，也可以操作 OLED
```

所以原则是：

<span style="color:red">同一个共享资源，必须用同一把锁保护。</span>

合理例子：

```text
OLED 屏幕              -> oled_mutex
I2C 总线               -> i2c_mutex
全局识别结果结构体     -> result_mutex
```

不合理例子：

```text
OLED 清屏一把锁
OLED 写字一把锁
OLED 画图一把锁
```

这样保护不住整体显示过程。

## 7. 优先级翻转和优先级继承

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

这就叫优先级翻转：

```text
高优先级任务反而被低优先级任务间接卡住。
```

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

这就是为什么普通二值信号量不适合拿来做互斥锁：

```text
二值信号量没有优先级继承。
Mutex 有优先级继承。
```

## 8. 递归 Mutex：可以嵌套拿的互斥锁

### 先给结论

递归 Mutex 可以理解成：

```text
同一个任务可以重复拿同一把锁。
Take 几次，就必须 Give 几次。
```

它不是默认更高级，也不是必须总用。

<span style="color:blue">能用普通 Mutex 设计清楚，就优先用普通 Mutex。</span>

### 为什么会需要递归 Mutex

问题一般出现在函数嵌套调用。

比如：

```c
void oled_show_page(void)
{
    xSemaphoreTake(oled_mutex, portMAX_DELAY);

    oled_clear();
    oled_draw_value(123);

    xSemaphoreGive(oled_mutex);
}
```

如果 `oled_clear()` 内部也拿同一把普通 Mutex：

```c
void oled_clear(void)
{
    xSemaphoreTake(oled_mutex, portMAX_DELAY);

    // 清屏

    xSemaphoreGive(oled_mutex);
}
```

就会变成：

```text
oled_show_page 已经拿了锁
    -> 调用 oled_clear
        -> oled_clear 又要拿同一把锁
            -> 同一个任务自己等自己
            -> 可能卡住
```

递归 Mutex 允许同一个任务重复拿同一把锁：

```c
xSemaphoreTakeRecursive(oled_mutex, portMAX_DELAY);
xSemaphoreTakeRecursive(oled_mutex, portMAX_DELAY);

xSemaphoreGiveRecursive(oled_mutex);
xSemaphoreGiveRecursive(oled_mutex);
```

内部逻辑类似：

```text
第一次 Take：真正拿到锁，计数 = 1
第二次 Take：发现还是同一个任务，允许进入，计数 = 2
第一次 Give：计数 = 1，锁还没真正释放
第二次 Give：计数 = 0，锁真正释放
```

### 更推荐的普通设计

如果代码由自己控制，更推荐：

```text
外层函数拿锁
内层函数不拿锁
```

示例：

```c
void oled_show_page(void)
{
    xSemaphoreTake(oled_mutex, portMAX_DELAY);

    oled_clear_nolock();
    oled_draw_title_nolock();
    oled_draw_value_nolock(123);

    xSemaphoreGive(oled_mutex);
}
```

这里 `_nolock` 表示：

```text
这个函数默认调用者已经拿好锁。
它自己不再重复拿锁。
```

### 递归 Mutex 和临界区为什么像

它们看起来都像：

```text
进入
    做事
退出
```

但本质不同：

| 工具 | 本质 | 是否适合较长操作 | 典型用途 |
|---|---|---|---|
| 递归 Mutex | 任务级互斥锁 | 可以，但别太长 | 嵌套函数访问同一资源 |
| 临界区 | 极短不可打断代码段 | 不适合 | 修改几个共享变量、底层状态 |

## 9. 临界区和自旋锁：保护极短代码段

### 临界区是什么

临界区就是：

```text
这一小段代码不能被任务切换或中断打断。
```

常见形式：

```c
taskENTER_CRITICAL(&mux);

// 极短共享变量操作

taskEXIT_CRITICAL(&mux);
```

### 为什么不能乱用

临界区通常会影响调度或中断响应。

所以原则是：

```text
临界区只包极短代码。
不要在临界区里打印日志。
不要在临界区里 vTaskDelay。
不要在临界区里做 I2C/SPI 长事务。
```

### 自旋锁是什么

ESP32 是多核芯片时，可能出现：

```text
Core 0 的任务正在访问共享资源
Core 1 的任务也想访问同一个资源
```

自旋锁可以理解为：

```text
一个核心拿到锁后，另一个核心在原地等。
```

它更偏底层，初学阶段先记住：

```text
任务级资源保护：优先想 Mutex。
极短底层保护：再想临界区 / 自旋锁。
```

## 10. 放进竞赛和工程项目里理解

假设做一个“人体入侵检测报警系统”：

```text
PIR / 雷达传感器任务
摄像头识别任务
OLED 显示任务
蜂鸣器任务
WiFi 上传任务
```

整体结构：

```text
PIR 检测到人
    |
    | 二值信号量：通知摄像头任务
    v
摄像头任务开始识别
    |
    | 队列：发送识别结果
    v
显示任务 / 报警任务 / 上传任务

OLED、I2C、UART、全局结果结构体
    |
    | Mutex：保护共享资源
```

伪代码：

```c
SemaphoreHandle_t person_sem;     // 同步：有人来了
QueueHandle_t result_queue;       // 传数据：识别结果
SemaphoreHandle_t i2c_mutex;      // 互斥：保护 I2C/OLED
```

```c
void task_pir(void *param)
{
    while (1)
    {
        if (pir_detected())
        {
            xSemaphoreGive(person_sem);
        }

        vTaskDelay(pdMS_TO_TICKS(50));
    }
}
```

```c
void task_camera(void *param)
{
    result_t result;

    while (1)
    {
        xSemaphoreTake(person_sem, portMAX_DELAY);

        result = camera_detect();

        xQueueSend(result_queue, &result, portMAX_DELAY);
    }
}
```

```c
void task_oled(void *param)
{
    result_t result;

    while (1)
    {
        xQueueReceive(result_queue, &result, portMAX_DELAY);

        xSemaphoreTake(i2c_mutex, portMAX_DELAY);
        oled_show_result(result);
        xSemaphoreGive(i2c_mutex);
    }
}
```

这个例子里：

| 设计点 | 工具 | 原因 |
|---|---|---|
| PIR 通知摄像头 | 二值信号量 | 只需要通知事件发生，不需要传数据 |
| 摄像头传识别结果 | 队列 | 要把结果数据交给其他任务 |
| OLED / I2C 使用 | Mutex | 多个任务可能共用同一个显示或总线 |
| OLED 内部函数嵌套 | 普通 Mutex + `_nolock`，必要时递归 Mutex | 避免同一个任务自己等自己 |
| 极短状态变量更新 | 临界区 | 防止几行关键代码被打断 |

## 11. 常见错误

### 把 volatile 当锁

错误理解：

```text
变量加 volatile，就不会出并发问题。
```

正确理解：

```text
volatile 只能告诉编译器不要乱优化访问。
它不能防止任务切换，不能防止双核同时访问，不能代替锁。
```

### 用普通全局变量当信号量

错误：

```c
while (flag == 0)
{
}
```

问题：

```text
任务一直空转，占 CPU。
```

更合适：

```c
xSemaphoreTake(sem, portMAX_DELAY);
```

### 用二值信号量长期替代 Mutex

二值信号量可以实现类似“占用/释放”的效果，但它没有优先级继承。

工程里保护共享资源时，优先用：

```c
xSemaphoreCreateMutex();
```

### 拿着 Mutex 做很慢的事

不推荐：

```c
xSemaphoreTake(i2c_mutex, portMAX_DELAY);

vTaskDelay(pdMS_TO_TICKS(1000));

xSemaphoreGive(i2c_mutex);
```

问题：

```text
你拿着锁睡觉，别人都用不了这个资源。
```

### Take 和 Give 不配对

错误：

```c
xSemaphoreTake(mutex, portMAX_DELAY);

if (error)
{
    return;  // 忘记 Give
}

xSemaphoreGive(mutex);
```

问题：

```text
锁永远不释放，其他任务一直阻塞。
```

### 递归 Mutex 滥用

递归 Mutex 不是默认更高级。

优先顺序：

```text
普通 Mutex 设计清楚
    优先使用

确实有同一任务嵌套拿同一把锁
    再考虑递归 Mutex
```

## 12. 记忆口诀

### 工具选择口诀

```text
信号量问：事情发生了吗？
队列问：数据来了吗？
Mutex 问：资源现在归谁用？
递归 Mutex 问：是不是同一个任务又进来了？
临界区问：这几行能不能被打断？
```

### 延时口诀

```text
vTaskDelay 是睡觉让位。
esp_rom_delay_us 是原地硬等。
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

## 13. 后续学习建议

建议下一步不要继续堆 API，而是写一个小实验工程，每次只验证一个现象。

### 观察任务状态

目标：

```text
理解 Running / Ready / Blocked。
```

建议现象：

```text
task1 每 1 秒打印一次
task2 等信号量
观察 task2 为什么不占 CPU
```

### 信号量同步

目标：

```text
理解 A 做完通知 B。
```

结构：

```text
task_sensor -> xSemaphoreGive
task_process -> xSemaphoreTake
```

### 队列传数据

目标：

```text
理解同步的是数据，而不是单纯标志。
```

结构：

```text
task_sensor 产生数字
task_process 从队列取数字并处理
```

### Mutex 保护共享资源

目标：

```text
理解多个任务共用 UART / OLED / I2C 时为什么要互斥。
```

结构：

```text
task1 打印一段长日志
task2 也打印一段长日志
先不加 Mutex，看日志交叉
再加 Mutex，看日志变整齐
```

### 递归 Mutex

目标：

```text
理解同一个任务嵌套拿同一把锁。
```

结构：

```text
outer_function 拿锁
    调用 inner_function
        inner_function 也拿同一把锁
```

观察：

```text
普通 Mutex 可能自己等自己
递归 Mutex 可以进入，但 Take / Give 次数必须配平
```

## 14. 最后总结

今天这部分先不要追求把所有 API 背下来。

真正要留下的理解是：

<span style="color:red">FreeRTOS 的核心是调度、等待、传数据、保护共享资源。</span>

以后看到一个 API，先问：

```text
它是在让任务阻塞吗？
它是在唤醒任务吗？
它是在传数据吗？
它是在保护资源吗？
它会不会影响调度和中断？
```

能回答这几个问题，API 就不是孤立的了。
