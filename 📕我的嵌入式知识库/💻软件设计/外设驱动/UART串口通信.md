---
version: V1.0
updated: 2026-05-04
author: RUI
tags: [软件]
---

# UART 串口通信

## 目录

- [硬件原理](UART串口通信.md#硬件原理)
- [移位寄存器、数据寄存器、缓冲区](UART串口通信.md#移位寄存器数据寄存器缓冲区)
- [STM32 的 printf 重定向](UART串口通信.md#stm32-的-printf-重定向)
- [ESP-IDF 的日志系统](UART串口通信.md#esp-idf-的日志系统)
- [ESP-IDF 配置 UART](UART串口通信.md#esp-idf-配置-uart)
- [收发数据](UART串口通信.md#收发数据)
- [记忆口诀](UART串口通信.md#记忆口诀)

---

## 硬件原理

UART 最底层做两件事：

**发送：**

```text
字节 → 起始位 + 数据位 + 校验位 + 停止位 → TX 引脚一位一位输出
```

**接收：**

```text
RX 检测起始位 → 按波特率采样 → 拼回字节
```

### 常见格式 8N1

```text
8 个数据位
无校验 (None)
1 个停止位
```

### 硬件内部常见模块

| 模块 | 作用 |
|---|---|
| 波特率发生器 | 决定一位持续多久（波特率 = 1/位时间） |
| 发送移位寄存器 | 把字节拆成 bit 发出去 |
| 接收移位寄存器 | 把 bit 拼成字节 |
| 数据寄存器 / FIFO | CPU 与 UART 硬件交换字节的入口 |

---

## 移位寄存器、数据寄存器、缓冲区

这是最容易混淆的三个概念，理清层级关系：

### 发送方向

```text
你的程序
  ↓
软件发送缓冲区（驱动维护，在 RAM 里）
  ↓
UART 发送 FIFO / 数据寄存器（硬件）
  ↓
发送移位寄存器（硬件）
  ↓
TX 引脚
```

### 接收方向

```text
RX 引脚
  ↓
接收移位寄存器（硬件）
  ↓
UART 接收 FIFO / 数据寄存器（硬件）
  ↓
软件接收缓冲区（驱动维护，在 RAM 里）
  ↓
你的程序
```

### 三者区别

| 概念 | 位置 | 作用 |
|---|---|---|
| 移位寄存器 | 硬件内部 | bit 级收发，逐 bit 移位 |
| 数据寄存器 / FIFO | 硬件内部 | 字节级入口，CPU 读写的地方 |
| 软件缓冲区 | RAM 里 | 驱动维护的数组/队列 |

---

## STM32 的 printf 重定向

STM32/GD32 标准库中，`printf()` 默认不会从串口输出，需要自己重定向：

```c
int fputc(int ch, FILE *f)
{
    USART_SendData(USART1, ch);
    while (USART_GetFlagStatus(USART1, USART_FLAG_TXE) == RESET);
    return ch;
}
```

更好的做法：

```text
printf → 重定向 → 队列/缓冲区 → DMA/中断 → USART
```

这样可以避免 printf 阻塞 CPU 太久。

---

## ESP-IDF 的日志系统

ESP-IDF 默认提供系统输出通道，通常接到 UART0 或 USB Serial/JTAG，所以：

```c
printf("hello\n");
ESP_LOGI("TAG", "hello");
```

可以开箱即用，不需要手动重定向。

### printf 和 esp_log 区别

| 项目 | printf | ESP_LOGI / ESP_LOGE 等 |
|---|---|---|
| 性质 | 普通 C 标准库打印 | ESP-IDF 日志系统 |
| 输出信息 | 只有文字 | 等级、时间戳、标签、文字 |
| 控制能力 | 简单 | 可按等级过滤、可关闭某标签日志 |
| 性能 | 轻量 | 略重但更规范 |

```text
调试用 ESP_LOGI，临时打印用 printf。
正式代码建议统一用 esp_log 系列。
```

---

## ESP-IDF 配置 UART

以配置 UART1 为例：

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

### uart_driver_install 参数

```c
uart_driver_install(
    UART_NUM_1,  // 使用哪个 UART
    1024,        // 接收缓冲区大小（字节）
    1024,        // 发送缓冲区大小（字节），0 表示不用发送缓冲
    0,           // 事件队列大小
    NULL,        // 事件队列句柄
    0            // 中断配置，0 表示默认
);
```

---

## 收发数据

### 接收

```c
int len = uart_read_bytes(UART_NUM_1, data, sizeof(data), pdMS_TO_TICKS(100));
```

这会阻塞当前任务最多 100ms，但不阻塞整个 CPU。底层接收由驱动中断和缓冲区完成。

### 发送

```c
uart_write_bytes(UART_NUM_1, "hello\n", 6);
```

如果安装了发送缓冲区，数据会先进入驱动缓冲区，由驱动慢慢发送。连续调用两个 `uart_write_bytes()` 通常不会丢数据。

---

## 记忆口诀

```text
UART 本质：字节拆成 bit 发，bit 拼回字节收。
发送链路：程序 → 缓冲 → FIFO → 移位 → TX 引脚。
STM32 printf 要重定向，ESP-IDF 开箱就能打印。
调试用 ESP_LOGI，临时用 printf。
```

---

## 相关笔记

- [[GPIO驱动配置]] — UART 引脚需要先配置 GPIO 复用
- [[I2C总线通信]] — 另一种常见的串行通信协议
- [[实时操作系统/FreeRTOS任务与调度]] — uart_read_bytes 的阻塞机制涉及 FreeRTOS 任务调度
