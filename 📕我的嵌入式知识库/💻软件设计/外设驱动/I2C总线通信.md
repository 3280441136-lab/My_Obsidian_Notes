---
version: V1.0
updated: 2026-05-04
author: RUI
tags: [软件]
---

# I2C 总线通信

## 目录

- [I2C 是什么](I2C总线通信.md#i2c-是什么)
- [软件 I2C](I2C总线通信.md#软件-i2c)
- [ESP-IDF 硬件 I2C](I2C总线通信.md#esp-idf-硬件-i2c)
- [软件 I2C vs 硬件 I2C 对照](I2C总线通信.md#软件-i2c-vs-硬件-i2c-对照)
- [关键 API 速查](I2C总线通信.md#关键-api-速查)
- [记忆口诀](I2C总线通信.md#记忆口诀)

---

## I2C 是什么

I2C 是一种两线制串行通信协议：

```text
SCL：时钟线（主机控制）
SDA：数据线（双向传输）
```

特点：

```text
一条总线上可挂多个设备
每个设备靠 7 位或 10 位地址区分
SDA/SCL 通常是开漏输出，需要上拉电阻
主机控制 SCL，从机在 SCL 边沿采样/输出 SDA
```

---

## 软件 I2C

软件 I2C 用普通 GPIO 手动模拟 I2C 时序：

```c
gpio_set_level(sda, 1);
gpio_set_level(scl, 1);
delay();

gpio_set_level(sda, 0); // START 信号
delay();
```

软件 I2C 需要自己实现：

```text
START 起始信号
STOP 停止信号
发送 1 bit
发送 1 byte
读取 ACK
读取数据
```

### 优点

- 直观，能看到每一步时序
- 任意普通 GPIO 基本都可用，不限制特定引脚
- 适合低速 OLED、简单传感器

### 缺点

- 占用 CPU（延时等待）
- 时序靠 delay，容易受中断和任务调度影响
- 正式工程中不如硬件 I2C 稳定

---

## ESP-IDF 硬件 I2C

ESP-IDF 新版 I2C Master API 的典型初始化流程：

### 创建总线

```c
i2c_master_bus_handle_t bus_handle;

i2c_master_bus_config_t bus_config = {
    .i2c_port = I2C_NUM_0,
    .clk_source = I2C_CLK_SRC_DEFAULT,
    .sda_io_num = sda,
    .scl_io_num = scl,
    .glitch_ignore_cnt = 7,
    .flags.enable_internal_pullup = true,
};

i2c_new_master_bus(&bus_config, &bus_handle);
```

`i2c_new_master_bus()` 做了什么：

```text
配置 I2C 外设
配置 SDA/SCL 引脚
配置时钟源
配置滤波
配置中断 / 驱动对象
返回 bus_handle（总线句柄）
```

### 在总线上添加设备

```c
i2c_master_dev_handle_t dev_handle;

i2c_device_config_t dev_config = {
    .dev_addr_length = I2C_ADDR_BIT_LEN_7,
    .device_address = 0x20,
    .scl_speed_hz = 100000,
};

i2c_master_bus_add_device(bus_handle, &dev_config, &dev_handle);
```

`i2c_master_bus_add_device()` 做了什么：

```text
注册设备地址
设置地址长度（7位/10位）
设置通信速度
配置 ACK 检查规则
返回 dev_handle（设备句柄）
```

### 发送数据

```c
uint8_t data[] = {0x01, 0xFF};
i2c_master_transmit(dev_handle, data, sizeof(data), 1000);
```

驱动内部自动完成：

```text
START
发送设备地址 + 写方向位
等待 ACK
发送数据字节
等待每个字节的 ACK
STOP
```

---

## 软件 I2C vs 硬件 I2C 对照

| 动作 | 软件 I2C | 硬件 I2C |
|---|---|---|
| 配线 | gpio_config() | i2c_new_master_bus() |
| 设置速度 | delay_us | scl_speed_hz |
| START | 手动拉 SDA/SCL | 驱动/硬件自动 |
| STOP | 手动拉 SDA/SCL | 驱动/硬件自动 |
| 发送 bit | 手动控制 SDA/SCL | I2C 外设自动移位 |
| ACK 检查 | 手动读 SDA 电平 | 硬件/驱动检查 |
| 发送字节 | 自己写循环 | i2c_master_transmit() |
| 读写寄存器 | 自己拼时序 | i2c_master_transmit_receive() |

---

## 关键 API 速查

| API | 作用 | 备注 |
|---|---|---|
| `i2c_new_master_bus()` | 创建 I2C 总线 | 返回 bus_handle |
| `i2c_master_bus_add_device()` | 在总线上添加设备 | 返回 dev_handle |
| `i2c_master_transmit()` | 发送数据 | 只用 dev_handle |
| `i2c_master_receive()` | 接收数据 | 只用 dev_handle |
| `i2c_master_transmit_receive()` | 先发后收 | 常用于读寄存器 |
| `i2c_del_master_bus()` | 删除总线 | 释放资源 |

---

## 记忆口诀

```text
I2C 两条线，SCL 时钟 SDA 数据。
主机控时钟，从机靠地址。
软件 I2C：手动模拟时序，简单但占 CPU。
硬件 I2C：配总线 → 加设备 → 拿句柄 → 收发数据。
上拉电阻不能省，速度越高上拉越要小。
```

---

## 相关笔记

- [[GPIO驱动配置]] — I2C 的 SDA/SCL 是开漏 GPIO，需要理解 GPIO 模式和上拉
- [[UART串口通信]] — 另一种常用串行通信协议，对比理解
- [[../C语言基础/嵌入式句柄与指针]] — bus_handle 和 dev_handle 的本质是结构体指针
- [[../../🔧硬件设计/常用元件/电阻选型]] — I2C 上拉电阻选型（4.7kΩ）、开漏输出的上拉原理
