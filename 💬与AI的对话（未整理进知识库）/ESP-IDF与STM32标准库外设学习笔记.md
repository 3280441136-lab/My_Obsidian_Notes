# ESP-IDF 与 STM32 标准库外设学习笔记

这份笔记总结 GPIO、PWM、UART、I2C 以及相关 C 语言基础。核心观点是：

> STM32 标准库和 ESP-IDF 最底层都是操作寄存器，只是 ESP-IDF 的驱动包装更厚，很多底层步骤由官方驱动完成。

## 1. 总体区别

STM32 标准库更接近硬件寄存器：

- 经常要手动开外设时钟。
- GPIO 和外设配置分得更清楚。
- 引脚复用、定时器参数、串口收发方式通常要自己搭。
- 适合理解底层，但代码步骤多。

ESP-IDF 更像一个完整驱动框架：

- 很多底层初始化由驱动函数完成。
- 通常配置“目标效果”，比如频率、GPIO 编号、设备地址。
- 运行在 FreeRTOS 环境下，很多等待是“任务等待”，不是 CPU 空转。
- 代码更抽象，初学时会感觉黑盒更厚。

## 2. GPIO 配置

STM32 标准库常见写法：

```c
GPIO_InitTypeDef GPIO_InitStructure;

RCC_APB2PeriphClockCmd(RCC_APB2Periph_GPIOA, ENABLE);

GPIO_InitStructure.GPIO_Pin = GPIO_Pin_5;
GPIO_InitStructure.GPIO_Mode = GPIO_Mode_Out_PP;
GPIO_InitStructure.GPIO_Speed = GPIO_Speed_50MHz;

GPIO_Init(GPIOA, &GPIO_InitStructure);
```

ESP-IDF 常见写法：

```c
gpio_config_t led_cfg = {
    .pin_bit_mask = (1ULL << GPIO_NUM_15),
    .mode = GPIO_MODE_OUTPUT,
};

gpio_config(&led_cfg);
```

对比：

| 项目 | STM32 标准库 | ESP-IDF |
|---|---|---|
| 引脚表达 | GPIOA + GPIO_Pin_5 | GPIO_NUM_15 |
| 配置结构体 | GPIO_InitTypeDef | gpio_config_t |
| 初始化函数 | GPIO_Init() | gpio_config() |
| 时钟开启 | 常手动 RCC 开启 | 通常驱动内部处理 |
| 引脚选择 | 端口 + 引脚 | 全局 GPIO 编号 |

### GPIO 输出速度

STM32 的：

```c
GPIO_InitStructure.GPIO_Speed = GPIO_Speed_50MHz;
```

不是表示 GPIO 输出 50MHz 方波，而是表示引脚电平变化的速度能力。

ESP-IDF 普通 GPIO 配置里通常不写这个。若确实需要调整驱动能力，可以用：

```c
gpio_set_drive_capability(GPIO_NUM_15, GPIO_DRIVE_CAP_2);
```

点 LED、按键、普通控制一般不用关心。

## 3. GPIO 复用

STM32 中，普通 GPIO 输出和外设复用输出通常要明确区分：

```c
GPIO_InitStructure.GPIO_Mode = GPIO_Mode_AF_PP;
```

这表示该引脚不再由普通 GPIO 输出寄存器控制，而是交给 USART、TIM、SPI 等外设控制。

ESP32 中，很多外设可以通过内部信号连接系统接到不同 GPIO。配置外设时直接指定 GPIO：

```c
uart_set_pin(UART_NUM_1, GPIO_NUM_17, GPIO_NUM_18,
             UART_PIN_NO_CHANGE, UART_PIN_NO_CHANGE);
```

或者：

```c
.gpio_num = GPIO_NUM_15
```

ESP-IDF 驱动会帮你完成类似“复用连接”的工作。

记忆：

> STM32：先把 GPIO 配成复用，再配置外设。  
> ESP-IDF：配置外设时告诉驱动使用哪个 GPIO。

## 4. PWM 与 LEDC

STM32 的 PWM 通常来自 TIM 定时器：

- TIMx 是定时器。
- TIMx_CH1、CH2 是 PWM 通道。
- PSC 是预分频。
- ARR 是周期上限。
- CCR 是比较值，也就是占空比。

PWM 频率常按公式计算：

```text
PWM频率 = 定时器时钟 / ((PSC + 1) * (ARR + 1))
```

ESP32 常用 LEDC 产生 PWM。

LEDC 可以理解成：

```text
专门用于 PWM/LED 调光的外设
```

ESP-IDF 代码：

```c
ledc_timer_config_t ledc_timer = {
    .clk_cfg = LEDC_AUTO_CLK,
    .speed_mode = LEDC_LOW_SPEED_MODE,
    .timer_num = LEDC_TIMER_0,
    .duty_resolution = LEDC_TIMER_12_BIT,
    .freq_hz = 5000,
};

ledc_timer_config(&ledc_timer);
```

```c
ledc_channel_config_t ledc_channel = {
    .channel = LEDC_CHANNEL_0,
    .duty = 0,
    .gpio_num = GPIO_NUM_15,
    .speed_mode = LEDC_LOW_SPEED_MODE,
    .timer_sel = LEDC_TIMER_0,
};

ledc_channel_config(&ledc_channel);
```

对应关系：

| STM32 | ESP-IDF LEDC | 作用 |
|---|---|---|
| TIMx | LEDC_TIMER_x | PWM 时间基准 |
| TIMx_CHx | LEDC_CHANNEL_x | PWM 输出通道 |
| ARR | duty_resolution 间接决定 | 周期被分成多少份 |
| CCR | duty | 高电平占多少份 |
| PSC | 驱动内部计算 | 分频 |

12 位分辨率表示：

```text
占空比范围 0 ~ 4095
```

本质原理：

```text
计数器一直计数
比较器比较当前计数值和占空比值
根据比较结果输出高/低电平
```

## 5. UART 串口

### 硬件原理

UART 最底层做两件事：

发送：

```text
字节 -> 起始位 + 数据位 + 停止位 -> TX 一位一位输出
```

接收：

```text
RX 检测起始位 -> 按波特率采样 -> 拼回字节
```

常见格式 8N1：

```text
8 个数据位
无校验
1 个停止位
```

硬件内部常见模块：

- 波特率发生器：决定一位持续多久。
- 发送移位寄存器：把字节拆成 bit 发出去。
- 接收移位寄存器：把 bit 拼成字节。
- 数据寄存器/FIFO：CPU 与 UART 硬件交换字节的入口。

### 移位寄存器、数据寄存器、缓冲区

层级关系：

发送方向：

```text
你的程序
  ↓
软件发送缓冲区
  ↓
UART 发送 FIFO / 数据寄存器
  ↓
发送移位寄存器
  ↓
TX 引脚
```

接收方向：

```text
RX 引脚
  ↓
接收移位寄存器
  ↓
UART 接收 FIFO / 数据寄存器
  ↓
软件接收缓冲区
  ↓
你的程序
```

区别：

- 移位寄存器负责 bit 级收发。
- 数据寄存器/FIFO 是硬件里的字节入口。
- 软件缓冲区在 RAM 里，由驱动维护。

### STM32/GD32/CH32 与 ESP-IDF

STM32/GD32 标准库中，`printf()` 默认不会自动从串口输出，通常要自己重定向：

```c
int fputc(int ch, FILE *f)
{
    USART_SendData(USART1, ch);
    while (USART_GetFlagStatus(USART1, USART_FLAG_TXE) == RESET);
    return ch;
}
```

如果要高效可靠打印，常见做法是：

```text
printf -> 重定向 -> 队列/缓冲区 -> DMA/中断 -> USART
```

ESP-IDF 默认提供系统输出通道，通常接到 UART0 或 USB Serial/JTAG，所以：

```c
printf("hello\n");
ESP_LOGI("TAG", "hello");
```

可以开箱输出。

`printf` 和 `esp_log` 区别：

| 项目 | printf | ESP_LOGI/ESP_LOGE 等 |
|---|---|---|
| 性质 | 普通 C 打印 | ESP-IDF 日志系统 |
| 信息 | 只有文字 | 等级、时间、标签、文字 |
| 控制 | 简单 | 可按等级过滤 |

### ESP-IDF 配置 UART1

```c
uart_config_t uart_config = {
    .baud_rate = 115200,
    .data_bits = UART_DATA_8_BITS,
    .parity = UART_PARITY_DISABLE,
    .stop_bits = UART_STOP_BITS_1,
    .flow_ctrl = UART_HW_FLOWCTRL_DISABLE,
    .source_clk = UART_SCLK_DEFAULT,
};

uart_driver_install(UART_NUM_1, 1024, 1024, 0, NULL, 0);
uart_param_config(UART_NUM_1, &uart_config);
uart_set_pin(UART_NUM_1, GPIO_NUM_17, GPIO_NUM_18,
             UART_PIN_NO_CHANGE, UART_PIN_NO_CHANGE);
```

`uart_driver_install()` 参数：

```c
uart_driver_install(
    UART_NUM_1,  // 使用哪个 UART
    1024,        // 接收缓冲区大小
    1024,        // 发送缓冲区大小，0 表示不用发送缓冲
    0,           // 事件队列大小
    NULL,        // 事件队列句柄
    0            // 中断配置，0 表示默认
);
```

接收：

```c
int len = uart_read_bytes(UART_NUM_1, data, sizeof(data), pdMS_TO_TICKS(100));
```

这会阻塞当前任务最多 100ms，但不会阻塞整个 CPU。底层接收通常由驱动中断和缓冲区完成。

发送：

```c
uart_write_bytes(UART_NUM_1, "hello\n", 6);
```

如果安装了发送缓冲区，数据会先进入驱动缓冲区，再由驱动慢慢发送。两个发送函数连续调用通常不会丢数据。

## 6. I2C / IIC

I2C 通常有两根线：

```text
SCL：时钟线
SDA：数据线
```

特点：

- 主机控制 SCL。
- SDA 传输数据。
- 一条总线上可挂多个设备。
- 每个设备靠地址区分。
- SDA/SCL 通常是开漏输出，需要上拉电阻。

### 软件 I2C

软件 I2C 用普通 GPIO 手动模拟时序：

```c
gpio_set_level(sda, 1);
gpio_set_level(scl, 1);
delay();

gpio_set_level(sda, 0); // START
delay();
```

软件 I2C 要自己实现：

- START 起始信号。
- STOP 停止信号。
- 发送 1 bit。
- 发送 1 byte。
- 读取 ACK。
- 读取数据。

优点：

- 直观。
- 任意普通 GPIO 基本都可用。
- 适合低速 OLED、简单传感器。

缺点：

- 占 CPU。
- 时序靠延时，容易受中断和任务调度影响。
- 正式工程中不如硬件 I2C 稳定。

### ESP-IDF 硬件 I2C

ESP-IDF 新版 I2C master API 常见初始化：

```c
i2c_master_bus_handle_t bus_handle;
i2c_master_dev_handle_t dev_handle;

i2c_master_bus_config_t bus_config = {
    .i2c_port = I2C_NUM_0,
    .clk_source = I2C_CLK_SRC_DEFAULT,
    .sda_io_num = sda,
    .scl_io_num = scl,
    .glitch_ignore_cnt = 7,
    .flags.enable_internal_pullup = true,
};

i2c_new_master_bus(&bus_config, &bus_handle);

i2c_device_config_t dev_config = {
    .dev_addr_length = I2C_ADDR_BIT_LEN_7,
    .device_address = 0x20,
    .scl_speed_hz = 100000,
};

i2c_master_bus_add_device(bus_handle, &dev_config, &dev_handle);
```

`i2c_new_master_bus()` 是创建 I2C 总线：

```text
配置 I2C 外设
配置 SDA/SCL 引脚
配置时钟源
配置滤波
配置中断/驱动对象
返回 bus_handle
```

`i2c_master_bus_add_device()` 是在总线上添加一个设备：

```text
设备地址
地址长度
通信速度
ACK 检查规则
返回 dev_handle
```

发送数据：

```c
uint8_t data[] = {0x01, 0xFF};
i2c_master_transmit(dev_handle, data, sizeof(data), 1000);
```

驱动内部会自动完成：

```text
START
发送设备地址 + 写方向
等待 ACK
发送数据
等待 ACK
STOP
```

硬件 I2C 和软件 I2C 对照：

| 动作 | 软件 I2C | 硬件 I2C |
|---|---|---|
| 配线 | gpio_config() | i2c_new_master_bus() |
| 设置速度 | delay_us | scl_speed_hz |
| START | 手动拉 SDA/SCL | 驱动/硬件自动 |
| STOP | 手动拉 SDA/SCL | 驱动/硬件自动 |
| 发送 bit | 手动控制 SDA/SCL | I2C 外设自动移位 |
| ACK | 手动读 SDA | 硬件/驱动检查 |
| 发送字节 | 自己写循环 | i2c_master_transmit() |
| 读写寄存器 | 自己拼时序 | i2c_master_transmit_receive() |

## 7. 句柄与指针

ESP-IDF 里很多 handle 本质上是结构体指针。

可以理解成：

```c
typedef struct i2c_master_bus_t *i2c_master_bus_handle_t;
```

所以：

```c
i2c_master_bus_handle_t bus_handle;
```

本质类似：

```c
struct i2c_master_bus_t *bus_handle;
```

创建总线：

```c
i2c_new_master_bus(&bus_config, &bus_handle);
```

为什么第二个参数要 `&bus_handle`？

因为调用前 `bus_handle` 还没有有效内容，函数需要把创建好的句柄写回这个变量。

规律：

```text
创建句柄：传 &句柄变量
使用句柄：传 句柄变量
读取配置结构体：传 &配置结构体
```

例子：

```c
i2c_new_master_bus(&bus_config, &bus_handle);
```

含义：

```text
读取 bus_config
创建总线
把结果写入 bus_handle
```

```c
i2c_master_bus_add_device(bus_handle, &dev_config, &dev_handle);
```

含义：

```text
使用 bus_handle 这条总线
读取 dev_config
创建设备
把结果写入 dev_handle
```

```c
i2c_master_transmit(dev_handle, data, sizeof(data), 1000);
```

含义：

```text
使用 dev_handle 这个设备发送数据
```

## 8. 最重要的学习主线

不要只背 API 名字，要抓住共同本质：

```text
GPIO：配置引脚模式，本质是设置 GPIO 寄存器
PWM：定时器计数 + 比较器控制输出
UART：按波特率把字节拆成 bit 发送，再采样拼回字节
I2C：主机控制 SCL，在 SDA 上传输地址、数据和 ACK
```

STM32 标准库常让你更靠近这些底层细节。

ESP-IDF 把很多步骤封装成驱动服务：

```text
配置结构体
初始化驱动
拿到 handle
用 handle 调用读写 API
```

所以学习 ESP-IDF 时，建议按这个顺序理解：

1. 这个外设的硬件原理是什么。
2. ESP-IDF 哪个结构体在描述这个外设。
3. 哪个 API 负责创建驱动对象。
4. handle 代表什么。
5. 后续读写 API 使用哪个 handle。

记住这句话：

> STM32 标准库像是在教你拧寄存器开关；ESP-IDF 像是把一组开关做成了驱动面板。底层仍然是那些开关，只是你平时不用直接碰。
