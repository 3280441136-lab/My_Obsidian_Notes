---
version: V1.1
updated: 2026-05-05
author: RUI
tags: [软件]
---

# GPIO 驱动配置

## 目录

- [GPIO 的本质](GPIO驱动配置.md#gpio-的本质)
- [STM32 标准库写法](GPIO驱动配置.md#stm32-标准库写法)
- [ESP-IDF 写法](GPIO驱动配置.md#esp-idf-写法)
- [两种风格对比](GPIO驱动配置.md#两种风格对比)
- [GPIO 输出速度](GPIO驱动配置.md#gpio-输出速度)
- [GPIO 复用](GPIO驱动配置.md#gpio-复用)
- [记忆口诀](GPIO驱动配置.md#记忆口诀)
- [GPIO 中断与 ISR 回调](GPIO驱动配置.md#gpio-中断与-isr-回调)
- [ISR 里不要做什么](GPIO驱动配置.md#isr-里不要做什么)

---

## GPIO 的本质

不管你用 STM32 标准库还是 ESP-IDF，GPIO 配置的本质都是：

```text
设置 GPIO 寄存器，决定引脚是输入、输出还是复用功能
```

区别在于封装程度：

> STM32 标准库像是在教你拧寄存器开关；ESP-IDF 像是把一组开关做成了驱动面板。底层仍然是那些开关，只是你平时不用直接碰。

---

## STM32 标准库写法

```c
GPIO_InitTypeDef GPIO_InitStructure;

RCC_APB2PeriphClockCmd(RCC_APB2Periph_GPIOA, ENABLE);

GPIO_InitStructure.GPIO_Pin = GPIO_Pin_5;
GPIO_InitStructure.GPIO_Mode = GPIO_Mode_Out_PP;
GPIO_InitStructure.GPIO_Speed = GPIO_Speed_50MHz;

GPIO_Init(GPIOA, &GPIO_InitStructure);
```

步骤拆解：

```text
1. 声明配置结构体
2. 手动开启 GPIO 外设时钟（RCC）
3. 填充结构体字段：引脚号、模式、速度
4. 调用 GPIO_Init() 写入寄存器
```

---

## ESP-IDF 写法

```c
gpio_config_t led_cfg = {
    .pin_bit_mask = (1ULL << GPIO_NUM_15),
    .mode = GPIO_MODE_OUTPUT,
};

gpio_config(&led_cfg);
```

步骤拆解：

```text
1. 填充配置结构体：引脚掩码、模式
2. 调用 gpio_config() 一次性配置
3. 时钟开启由驱动内部处理，不需要手动 RCC
```

---

## 两种风格对比

| 项目 | STM32 标准库 | ESP-IDF |
|---|---|---|
| 引脚表达 | GPIOA + GPIO_Pin_5 | GPIO_NUM_15 |
| 配置结构体 | GPIO_InitTypeDef | gpio_config_t |
| 初始化函数 | GPIO_Init() | gpio_config() |
| 时钟开启 | 常手动 RCC 开启 | 通常驱动内部处理 |
| 引脚选择 | 端口 + 引脚 | 全局 GPIO 编号 |

关键感受：

```text
STM32：先选端口，再选引脚
ESP-IDF：直接用全局编号，不管你属于哪个端口
```

---

## GPIO 输出速度

STM32 中常见：

```c
GPIO_InitStructure.GPIO_Speed = GPIO_Speed_50MHz;
```

**这不是表示 GPIO 输出 50MHz 方波，而是表示引脚电平变化的速度能力（压摆率）。**

人话：

```text
GPIO_Speed 决定引脚从 0→1 或 1→0 能变多快
不是决定你能翻转多少次
```

ESP-IDF 普通 GPIO 配置里通常不写这个。若确实需要调整驱动能力，可以用：

```c
gpio_set_drive_capability(GPIO_NUM_15, GPIO_DRIVE_CAP_2);
```

点 LED、按键、普通控制一般不用关心这个参数。

---

## GPIO 复用

### STM32 的做法

普通 GPIO 输出和外设复用输出要明确区分：

```c
GPIO_InitStructure.GPIO_Mode = GPIO_Mode_AF_PP;
```

这表示该引脚不再由普通 GPIO 输出寄存器控制，而是交给 USART、TIM、SPI 等外设控制。

```text
STM32：先把 GPIO 配成复用模式，再配置外设
```

### ESP-IDF 的做法

ESP32 中，很多外设可以通过内部信号连接系统接到不同 GPIO。配置外设时直接指定 GPIO：

```c
uart_set_pin(UART_NUM_1, GPIO_NUM_17, GPIO_NUM_18,
             UART_PIN_NO_CHANGE, UART_PIN_NO_CHANGE);
```

或者：

```c
.gpio_num = GPIO_NUM_15
```

ESP-IDF 驱动会帮你完成类似"复用连接"的工作。

```text
ESP-IDF：配置外设时告诉驱动使用哪个 GPIO，驱动内部处理复用
```

---

## 记忆口诀

```text
GPIO 配置本质是写寄存器，库只是帮你填参数。
STM32 手动开时钟选端口，ESP-IDF 全局编号一口价。
输出速度是电平变化能力，不是翻转频率。
复用：STM32 先配 GPIO 再配外设，ESP-IDF 配外设时顺手指定引脚。
```

---

## GPIO 中断与 ISR 回调

ESP-IDF 的 GPIO 中断通过回调函数注册：

```c
static void gpio_isr_handler(void *arg)
{
    const gpio_num_t gpio_num = *(const gpio_num_t *)arg;
    // 中断处理
}
```

注册中断：

```c
static const gpio_num_t s_gpio_num = GPIO_NUM_21;

gpio_isr_handler_add(GPIO_NUM_21,
                     gpio_isr_handler,
                     (void *)&s_gpio_num);
```

第三个参数 `(void *)&s_gpio_num` 会在中断触发时传给 `gpio_isr_handler` 的 `arg`。

> 注册时传什么，中断触发时 arg 就是什么。

### 中断回调函数签名

IDF API 规定的回调类型是带 `void *arg` 参数的：

```c
static void gpio_isr_handler(void *arg);
```

**不能**写成无参数版本：

```c
static void gpio_isr_handler(void);  // 错误
```

### 多个 GPIO 共用一个中断函数

利用 `arg` 参数区分是哪个引脚触发：

```c
static const gpio_num_t s_btn_1 = GPIO_NUM_21;
static const gpio_num_t s_btn_2 = GPIO_NUM_22;

gpio_isr_handler_add(GPIO_NUM_21, btn_isr_handler, (void *)&s_btn_1);
gpio_isr_handler_add(GPIO_NUM_22, btn_isr_handler, (void *)&s_btn_2);
```

中断里：

```c
static void btn_isr_handler(void *arg)
{
    const gpio_num_t gpio_num = *(const gpio_num_t *)arg;
    // 根据 gpio_num 区分处理
}
```

---

## ISR 里不要做什么

中断函数 ISR 要短、快、可预测。

**不建议在 ISR 里做：**

```text
打印日志（ESP_LOGI 等）
延时（vTaskDelay、delay_us）
复杂计算
动态申请内存（malloc）
阻塞等待
访问耗时外设
```

**推荐在 ISR 里做：**

```text
读/清中断标志
记录很少量数据
发送队列/信号量通知任务
```

常见做法——ISR 只发事件，任务做业务：

```c
static void gpio_isr_handler(void *arg)
{
    const gpio_num_t gpio_num = *(const gpio_num_t *)arg;
    xQueueSendFromISR(event_queue, &gpio_num, NULL);
}
```

日志和业务逻辑放任务里处理：

```c
static void event_task(void *arg)
{
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

---

## 相关笔记

- [[../../🧠MCU底层原理/CPU架构与内存模型]] — GPIO 配置本质是寄存器操作
- [[../ESP-IDF/ESP-IDF组件管理器]] — 把 GPIO 驱动封装成组件的思路
- [[PWM与定时器]] — PWM 输出依赖 GPIO 引脚配置
- [[UART串口通信]] — 串口涉及 GPIO 复用为 UART 功能
- [[I2C总线通信]] — I2C 的 SDA/SCL 本质是开漏输出的 GPIO
- [[../../🔧硬件设计/电阻选型]] — LED 限流电阻计算、上拉下拉电阻选型
- [[../实时操作系统/FreeRTOS同步与互斥]] — ISR 中发队列、任务中收队列的完整模式
- [[../C语言基础/嵌入式句柄与指针]] — ISR 回调中 `void *arg` 的指针转换
