# ESP-IDF FreeRTOS 与 CMake 基础笔记

本文是 ESP-IDF 新手学习笔记，重点解释 FreeRTOS 任务、队列、回调函数参数、指针转换、头文件包含和 ESP-IDF 组件级 CMakeLists 的通用规则。

## 1. 从 Keil 裸机到 ESP-IDF 的思维变化

在 Keil 裸机里，常见结构是：

```c
int main(void)
{
    while (1)
    {
        // 轮询按键、传感器、串口
    }
}
```

ESP-IDF 使用 FreeRTOS，程序入口变为：

```c
void app_main(void)
{
    // 初始化外设
    // 创建任务
}
```

可以这样类比：

| Keil 裸机 | ESP-IDF / FreeRTOS |
| --- | --- |
| `main()` | `app_main()` |
| 一个大 `while (1)` | 多个 FreeRTOS 任务 |
| 中断里置标志位 | 中断里发队列/信号量 |
| 手动管理工程文件 | `CMakeLists.txt` 管理组件和依赖 |

ESP-IDF 的常见外设驱动套路是：

```text
初始化外设
-> 中断捕获事件
-> ISR 只做最短处理
-> 队列/信号量通知任务
-> 任务里做打印、协议解析、状态机等较慢逻辑
```

## 2. `esp_err_t` 与返回值检查

ESP-IDF 里很多函数返回：

```c
esp_err_t
```

它是 ESP-IDF 统一的错误码类型。

常见返回值：

| 返回值 | 含义 |
| --- | --- |
| `ESP_OK` | 成功 |
| `ESP_ERR_NO_MEM` | 内存不足 |
| `ESP_ERR_INVALID_ARG` | 参数错误 |
| `ESP_ERR_INVALID_STATE` | 当前状态不允许，比如已经初始化过 |

推荐变量名：

```c
esp_err_t err = gpio_config(&io_conf);

if (err != ESP_OK)
{
    return err;
}
```

`err` 比 `ret` 更适合新手理解。`ret` 是 `return value` 的缩写，意思是返回值，但不如 `err` 直观。

初始化阶段如果某一步必须成功，可以用：

```c
ESP_ERROR_CHECK(driver_init());
```

它等价于：

```c
esp_err_t err = driver_init();

if (err != ESP_OK)
{
    打印错误并停止程序;
}
```

## 3. FreeRTOS 任务创建 API

### 3.1 任务是什么

FreeRTOS 任务可以理解成“由系统调度的函数循环”。

典型任务函数：

```c
static void sensor_task(void *arg)
{
    (void)arg;

    while (true)
    {
        // 等待或处理事件
    }
}
```

任务函数必须是：

```c
void task_function(void *arg)
```

不能写成：

```c
void task_function(void)
```

因为 `xTaskCreate()` 要求函数指针类型固定为“返回 `void`，参数为 `void *`”。

### 3.2 `xTaskCreate()`

常见写法：

```c
BaseType_t task_ret = xTaskCreate(sensor_task,
                                  "sensor_task",
                                  2048,
                                  NULL,
                                  10,
                                  NULL);

if (task_ret != pdPASS)
{
    return ESP_ERR_NO_MEM;
}
```

函数原型可理解为：

```c
BaseType_t xTaskCreate(TaskFunction_t pxTaskCode,
                       const char * const pcName,
                       const uint32_t usStackDepth,
                       void * const pvParameters,
                       UBaseType_t uxPriority,
                       TaskHandle_t * const pxCreatedTask);
```

参数解释：

| 参数 | 例子 | 含义 |
| --- | --- | --- |
| `pxTaskCode` | `sensor_task` | 任务函数 |
| `pcName` | `"sensor_task"` | 任务名字，方便调试 |
| `usStackDepth` | `2048` | 任务栈大小 |
| `pvParameters` | `NULL` | 传给任务函数的参数 |
| `uxPriority` | `10` | 任务优先级，数字越大优先级越高 |
| `pxCreatedTask` | `NULL` | 任务句柄，不需要控制任务时可填 `NULL` |

返回值：

| 返回值 | 含义 |
| --- | --- |
| `pdPASS` | 创建成功 |
| 其他值 | 创建失败，常见原因是内存不足 |

### 3.3 为什么任务函数有 `void *arg`

`arg` 是 `argument` 的缩写，意思是“参数”。

`void *arg` 是 FreeRTOS 留给任务函数的自定义参数入口。创建任务时的第 4 个参数会传给任务函数：

```c
xTaskCreate(sensor_task,
            "sensor_task",
            2048,
            some_pointer,
            10,
            NULL);
```

任务函数中：

```c
static void sensor_task(void *arg)
{
    // arg 就是 some_pointer
}
```

如果当前不需要参数，就传 `NULL`，并在任务函数里写：

```c
(void)arg;
```

`(void)arg;` 的作用是告诉编译器：

```text
我知道这个参数存在，但当前故意不用它，请不要提示 unused parameter。
```

它不会影响程序运行。

## 4. FreeRTOS 队列 API

队列可以理解成“邮箱”：

```text
发送者：往邮箱里放事件
接收者：从邮箱里取事件
```

在中断和任务配合时，常见结构是：

```text
ISR -> xQueueSendFromISR()
Task -> xQueueReceive()
```

### 4.1 `xQueueCreate()`

创建队列：

```c
QueueHandle_t event_queue = xQueueCreate(8, sizeof(gpio_num_t));

if (event_queue == NULL)
{
    return ESP_ERR_NO_MEM;
}
```

函数原型可理解为：

```c
QueueHandle_t xQueueCreate(UBaseType_t uxQueueLength,
                            UBaseType_t uxItemSize);
```

参数：

| 参数 | 例子 | 含义 |
| --- | --- | --- |
| `uxQueueLength` | `8` | 队列最多能保存多少个元素 |
| `uxItemSize` | `sizeof(gpio_num_t)` | 每个元素占多少字节 |

返回值：

| 返回值 | 含义 |
| --- | --- |
| 非 `NULL` | 队列句柄，后续收发都用它 |
| `NULL` | 创建失败，通常是内存不足 |

注意：队列保存的是“数据副本”，不是保存局部变量地址。

### 4.2 `xQueueSendFromISR()`

在中断函数里发送队列：

```c
gpio_num_t gpio_num = GPIO_NUM_21;
xQueueSendFromISR(event_queue, &gpio_num, NULL);
```

函数原型可理解为：

```c
BaseType_t xQueueSendFromISR(QueueHandle_t xQueue,
                              const void *pvItemToQueue,
                              BaseType_t *pxHigherPriorityTaskWoken);
```

参数：

| 参数 | 例子 | 含义 |
| --- | --- | --- |
| `xQueue` | `event_queue` | 要发送到哪个队列 |
| `pvItemToQueue` | `&gpio_num` | 要发送的数据地址 |
| `pxHigherPriorityTaskWoken` | `NULL` | 是否唤醒了更高优先级任务，进阶用法 |

返回值：

| 返回值 | 含义 |
| --- | --- |
| `pdTRUE` | 发送成功 |
| `errQUEUE_FULL` | 队列已满，发送失败 |

为什么传 `&gpio_num`：

```text
队列函数需要知道“从哪个地址复制数据”。
创建队列时已经指定元素大小，因此它会从 &gpio_num 复制 sizeof(gpio_num_t) 个字节到队列。
```

为什么中断里用 `FromISR` 版本：

```text
普通任务里用 xQueueSend()
中断函数里用 xQueueSendFromISR()
```

中断里不能随便调用普通 FreeRTOS API。

### 4.3 `xQueueReceive()`

任务里接收队列：

```c
gpio_num_t gpio_num;

if (xQueueReceive(event_queue, &gpio_num, portMAX_DELAY) == pdTRUE)
{
    ESP_LOGI(TAG, "GPIO%d triggered", gpio_num);
}
```

函数原型可理解为：

```c
BaseType_t xQueueReceive(QueueHandle_t xQueue,
                          void *pvBuffer,
                          TickType_t xTicksToWait);
```

参数：

| 参数 | 例子 | 含义 |
| --- | --- | --- |
| `xQueue` | `event_queue` | 从哪个队列接收 |
| `pvBuffer` | `&gpio_num` | 接收到的数据放到哪里 |
| `xTicksToWait` | `portMAX_DELAY` | 最多等待多久 |

返回值：

| 返回值 | 含义 |
| --- | --- |
| `pdTRUE` | 成功收到数据 |
| `pdFALSE` | 没收到，通常是等待超时 |

`portMAX_DELAY` 表示一直等，直到队列里有数据。等待期间任务会睡眠，不会空转占 CPU。

### 4.4 三个队列 API 的关系

```text
xQueueCreate()
    创建队列，得到 QueueHandle_t

xQueueSendFromISR()
    中断里把事件复制进队列

xQueueReceive()
    任务里从队列取事件
```

典型流程：

```text
初始化阶段创建队列
-> 外设中断发生
-> ISR 发队列
-> 任务阻塞等待队列
-> 任务收到事件并处理
```

## 5. GPIO 中断服务函数与 `void *arg`

ESP-IDF GPIO 中断回调通常写成：

```c
static void gpio_isr_handler(void *arg)
{
    // 中断处理
}
```

这是 IDF API 规定的函数签名，不能改成：

```c
static void gpio_isr_handler(void)
{
}
```

因为注册函数要求的回调类型就是带 `void *arg` 参数。

注册中断：

```c
gpio_isr_handler_add(GPIO_NUM_21,
                     gpio_isr_handler,
                     user_arg);
```

第三个参数 `user_arg` 会在中断触发时传给：

```c
gpio_isr_handler(void *arg)
```

也就是说：

```text
注册时传什么，中断触发时 arg 就是什么。
```

这可以用于多个 GPIO 共用一个中断函数。

## 6. `void *`、`intptr_t` 与类型转换

### 6.1 `void *` 是什么

`void *` 是“万能指针”，可以临时保存任意类型的地址。

例如：

```c
void *arg;
```

它只表示“这是一个指针”，但不知道指向的具体类型。

如果要真正使用里面的数据，必须转回原来的类型。

### 6.2 `intptr_t` 是什么

`intptr_t` 来自：

```c
#include <stdint.h>
```

名称含义：

```text
int      = integer，整数
ptr      = pointer，指针
_t       = type，类型
intptr_t = 能够保存指针值的整数类型
```

它的完整含义可理解为：

```text
integer type capable of holding a pointer
```

### 6.3 把整数塞进 `void *` 的写法

有时 API 只给了 `void *arg`，但我们想传一个小整数，例如 GPIO 编号：

```c
gpio_isr_handler_add(GPIO_NUM_21,
                     gpio_isr_handler,
                     (void *)(intptr_t)GPIO_NUM_21);
```

中断里还原：

```c
gpio_num_t gpio_num = (gpio_num_t)(intptr_t)arg;
```

这两边是对称的：

```text
发送时：gpio_num_t -> intptr_t -> void *
取回时：void * -> intptr_t -> gpio_num_t
```

为什么中间需要 `(intptr_t)`：

```text
指针和整数大小可能不同。
intptr_t 是专门用于指针和整数安全互转的整数类型。
```

不建议新手大量使用这种写法，因为可读性差。

### 6.4 更适合新手的传地址写法

更直观的写法是传变量地址：

```c
static const gpio_num_t s_gpio_num = GPIO_NUM_21;

gpio_isr_handler_add(GPIO_NUM_21,
                     gpio_isr_handler,
                     (void *)&s_gpio_num);
```

中断里：

```c
const gpio_num_t gpio_num = *(const gpio_num_t *)arg;
```

含义：

```text
arg 是 gpio_num_t 变量的地址；
先把 void * 转回 const gpio_num_t *；
再用 * 取出里面的 GPIO 编号。
```

这个写法更长，但更容易理解。

## 7. 中断函数里不要做什么

中断函数 ISR 要短、快、可预测。

不建议在 ISR 里做：

```text
打印日志
延时
复杂计算
动态申请内存
阻塞等待
访问耗时外设
```

推荐做：

```text
读/清中断标志
记录很少量数据
发送队列/信号量通知任务
```

常见结构：

```c
static void gpio_isr_handler(void *arg)
{
    const gpio_num_t gpio_num = *(const gpio_num_t *)arg;
    xQueueSendFromISR(event_queue, &gpio_num, NULL);
}
```

真正的日志和业务逻辑放任务里：

```c
static void event_task(void *arg)
{
    (void)arg;

    gpio_num_t gpio_num;

    while (true)
    {
        if (xQueueReceive(event_queue, &gpio_num, portMAX_DELAY) == pdTRUE)
        {
            ESP_LOGI(TAG, "GPIO%d triggered", gpio_num);
        }
    }
}
```

## 8. ESP-IDF 头文件包含规则

### 8.1 谁用到谁包含

不要依赖“别的文件帮我 include 了某个头文件”。

一个 `.c` 或 `.h` 文件里用到了某个类型、宏或函数，就应该包含对应头文件。

例子：

| 用到的内容 | 需要包含 |
| --- | --- |
| `esp_err_t` | `#include "esp_err.h"` |
| `ESP_LOGI` | `#include "esp_log.h"` |
| `gpio_config()`、`GPIO_NUM_21` | `#include "driver/gpio.h"` |
| `xTaskCreate()` | `#include "freertos/task.h"` |
| `xQueueCreate()`、`xQueueReceive()` | `#include "freertos/queue.h"` |
| `intptr_t` | `#include <stdint.h>` |
| `printf()` | `#include <stdio.h>` |

### 8.2 为什么不用 `stdio.h`

`stdio.h` 主要提供：

```c
printf()
scanf()
sprintf()
```

如果文件里没有使用这些函数，就不需要包含 `stdio.h`。

ESP-IDF 日志优先使用：

```c
ESP_LOGI()
ESP_LOGE()
ESP_LOGW()
```

而不是 `printf()`。

## 9. 宏定义写 `.h` 还是 `.c`

宏定义放哪里取决于它是不是“公开接口”。

### 9.1 放在 `.h` 的情况

如果外部文件需要知道或可能修改这个宏，放 `.h`：

```c
#define SENSOR_GPIO GPIO_NUM_21
```

适合放 `.h` 的内容：

```text
外部要调用的函数声明
外部要用的类型定义
外部需要知道的配置宏
```

### 9.2 放在 `.c` 的情况

如果只是驱动内部实现细节，放 `.c`：

```c
#define SENSOR_QUEUE_LENGTH 8
#define SENSOR_TASK_STACK_SIZE 2048
#define SENSOR_TASK_PRIORITY 10
```

适合放 `.c` 的内容：

```text
内部任务栈大小
内部队列长度
内部状态变量
内部 helper 函数
```

### 9.3 判断规则

```text
别人需要 include 后使用它 -> 放 .h
只有本 .c 文件自己用 -> 放 .c
```

## 10. ESP-IDF CMakeLists 基础

ESP-IDF 里 `CMakeLists.txt` 类似 Keil 的工程配置文件。它告诉编译系统：

```text
有哪些 .c 文件
头文件路径在哪里
依赖哪些组件
```

### 10.1 项目顶层 `CMakeLists.txt`

典型写法：

```cmake
cmake_minimum_required(VERSION 3.22)

include($ENV{IDF_PATH}/tools/cmake/project.cmake)
project(my_project)
```

它负责声明整个 ESP-IDF 工程，一般不要频繁改。

什么时候改：

```text
修改工程名
调整 CMake 最低版本
创建新工程时初始化
```

### 10.2 组件级 `CMakeLists.txt`

ESP-IDF 中 `main/` 也是一个组件，`components/xxx/` 也是组件。

典型写法：

```cmake
idf_component_register(
    SRCS "sensor.c"
    INCLUDE_DIRS "include"
    REQUIRES esp_driver_gpio
)
```

三个核心字段：

| 字段 | 含义 |
| --- | --- |
| `SRCS` | 本组件要编译哪些 `.c` 文件 |
| `INCLUDE_DIRS` | 本组件公开哪些头文件目录 |
| `REQUIRES` | 本组件依赖哪些其他组件 |

### 10.3 什么时候改 `SRCS`

新增 `.c` 文件时，要加到 `SRCS`。

例如新增：

```text
sensor.c
sensor_filter.c
```

写：

```cmake
idf_component_register(
    SRCS "sensor.c" "sensor_filter.c"
    INCLUDE_DIRS "include"
)
```

否则 `.c` 文件不会参与编译。

### 10.4 什么时候改 `INCLUDE_DIRS`

组件有公开头文件目录时，要加到 `INCLUDE_DIRS`。

例如：

```text
components/sensor/include/sensor.h
```

写：

```cmake
INCLUDE_DIRS "include"
```

这样其他组件才能：

```c
#include "sensor.h"
```

### 10.5 什么时候改 `REQUIRES`

当前组件用到了别的组件的头文件或函数，就加 `REQUIRES`。

新手判断法：

```text
我 include 了谁的 .h？
这个 .h 属于哪个组件？
那就 REQUIRES 哪个组件。
```

例子：

| 代码里用了 | 常见依赖 |
| --- | --- |
| `#include "driver/gpio.h"` | `esp_driver_gpio` |
| `#include "driver/uart.h"` | `esp_driver_uart` |
| `#include "esp_log.h"` | 通常基础组件已可用，必要时加 `log` |
| `#include "freertos/queue.h"` | FreeRTOS 基础组件，通常不需要手动加 |
| `#include "sensor.h"` | `sensor` |

如果 `main.c` 用了自定义组件：

```c
#include "sensor.h"
```

那么 `main/CMakeLists.txt` 要写：

```cmake
idf_component_register(
    SRCS "main.c"
    INCLUDE_DIRS "."
    REQUIRES sensor
)
```

否则可能报：

```text
fatal error: sensor.h: No such file or directory
```

### 10.6 一个常见组件模板

```text
components/sensor/
├── CMakeLists.txt
├── include/
│   └── sensor.h
└── sensor.c
```

`components/sensor/CMakeLists.txt`：

```cmake
idf_component_register(
    SRCS "sensor.c"
    INCLUDE_DIRS "include"
    REQUIRES esp_driver_gpio
)
```

`main/CMakeLists.txt`：

```cmake
idf_component_register(
    SRCS "main.c"
    INCLUDE_DIRS "."
    REQUIRES sensor
)
```

## 11. 日志 TAG 写法

ESP-IDF 日志常见写法：

```c
static const char *TAG = "sensor";
ESP_LOGI(TAG, "Sensor triggered");
```

`TAG` 是日志标签，用于区分日志来自哪个模块。

```c
static const char *TAG = "sensor";
```

含义：

```text
TAG 是一个指针，指向字符串常量 "sensor"。
```

也可以写成数组：

```c
static const char TAG[] = "sensor";
```

不要写：

```c
static const char TAG = "sensor";
```

因为 `char` 只能保存一个字符，例如 `'s'`，不能保存字符串 `"sensor"`。

## 12. 推荐代码风格

为了新手阅读清楚，推荐 C 代码使用 Allman 风格大括号：

```c
if (err != ESP_OK)
{
    return err;
}
```

而不是：

```c
if (err != ESP_OK) {
    return err;
}
```

建议使用清楚的变量名：

```c
esp_err_t err;
```

优先于：

```c
esp_err_t ret;
```

建议在关键位置写中文注释：

```c
// ISR 里只发送事件，不打印日志，避免中断处理时间过长。
xQueueSendFromISR(event_queue, &gpio_num, NULL);
```

## 13. 总结

本文涉及的核心套路：

```text
外设初始化函数返回 esp_err_t
-> app_main() 用 ESP_ERROR_CHECK() 检查初始化
-> xQueueCreate() 创建事件队列
-> xTaskCreate() 创建处理任务
-> 中断回调必须使用 void *arg 形式
-> ISR 用 xQueueSendFromISR() 发事件
-> 任务用 xQueueReceive() 等事件
-> CMakeLists.txt 用 SRCS / INCLUDE_DIRS / REQUIRES 描述组件
```

这套结构是 ESP-IDF 外设驱动的基础骨架。后续写按键、PIR、雷达 OUT、中断型传感器，都可以从这个骨架扩展。
