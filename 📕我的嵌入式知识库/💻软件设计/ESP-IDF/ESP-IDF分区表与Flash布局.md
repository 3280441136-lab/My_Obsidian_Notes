---
version: V1.0
updated: 2026-05-04
author: RUI
tags: [软件]
---

# ESP-IDF 分区表与 Flash 布局

## 目录

- [STM32 和 ESP-IDF 的核心区别](ESP-IDF分区表与Flash布局.md#stm32-和-esp-idf-的核心区别)
- [Flash 地址的直观理解](ESP-IDF分区表与Flash布局.md#flash-地址的直观理解)
- [分区表是什么](ESP-IDF分区表与Flash布局.md#分区表是什么)
- [典型分区表长什么样](ESP-IDF分区表与Flash布局.md#典型分区表长什么样)
- [Bootloader 是什么](ESP-IDF分区表与Flash布局.md#bootloader-是什么)
- [ESP-IDF 启动流程](ESP-IDF分区表与Flash布局.md#esp-idf-启动流程)
- [为什么需要分区表](ESP-IDF分区表与Flash布局.md#为什么需要分区表)
- [各分区详解](ESP-IDF分区表与Flash布局.md#各分区详解)
- [OTA 升级机制](ESP-IDF分区表与Flash布局.md#ota-升级机制)
- [P4 + C6 双芯片特别注意](ESP-IDF分区表与Flash布局.md#p4--c6-双芯片特别注意)
- [速查表](ESP-IDF分区表与Flash布局.md#速查表)
- [记忆口诀](ESP-IDF分区表与Flash布局.md#记忆口诀)

---

## STM32 和 ESP-IDF 的核心区别

从 Keil + STM32 过来的同学，先记住一句话：

> **STM32 入门时常见的是"程序从固定地址开始放"；ESP-IDF 是"Flash 先分区，程序只是其中一个分区"。**

STM32 入门理解：

```text
Flash 从 0x08000000 开始，你的程序就从这里往后放
```

ESP-IDF 理解：

```text
Flash 被划成很多块，每块有不同用途
你的用户程序只是其中一块
启动时由 bootloader 根据分区表找到你的程序
```

---

## Flash 地址的直观理解

把 Flash 理解成一排连续编号的储物柜。每个柜子有一个编号，这个编号就是"地址"。

STM32 里：

```text
STM32 Flash
0x08000000 ── 你的程序开始
0x08001000 ── 程序的一部分
0x08002000 ── 程序的一部分
...
```

ESP-IDF 里：

```text
ESP Flash
0x0000     bootloader  启动小程序
0x8000     partition table  分区表
0x9000     nvs  配置数据
0x10000    app  你的程序
后面还可能有 ota、文件系统等
```

ESP 不是简单地说"从某个地址开始全都放用户程序"，而是先把 Flash 划成几块：

```text
[启动程序] [分区表] [配置数据] [你的程序] [备用程序] [文件系统]
```

这就叫"分区"。

---

## 分区表是什么

分区表就是一张"Flash 地图"。它告诉系统：

```text
nvs 在 0x9000，占 0x6000
factory app 在 0x10000，占 2MB
ota_0 在某个地址，占 2MB
ota_1 在某个地址，占 2MB
```

如果没有这张地图，系统就不知道：你的程序在哪里、配置数据在哪里、OTA 备用程序在哪里、文件系统在哪里。

把 Flash 想象成一块硬盘：

```text
Flash
├── bootloader        启动程序
├── partition table   分区表本身
├── app0              你的主程序
├── app1              OTA 升级备用程序
├── nvs               保存 Wi-Fi 配置、参数、键值数据
├── spiffs/fatfs      小型文件系统
└── coredump          崩溃调试信息
```

---

## 典型分区表长什么样

ESP-IDF 的分区表通常是 `.csv` 文件：

```csv
# Name,   Type, SubType, Offset,   Size
nvs,      data, nvs,     0x9000,   0x6000
phy_init, data, phy,     0xf000,   0x1000
factory,  app,  factory, 0x10000,  2M
```

| 字段 | 含义 |
|---|---|
| `Name` | 分区名字 |
| `Type` | 分区类型，比如 `app` 或 `data` |
| `SubType` | 更具体的类型，比如 `factory`、`ota_0`、`nvs` |
| `Offset` | Flash 起始地址 |
| `Size` | 分区大小 |

最重要的是：

```csv
factory, app, factory, 0x10000, 2M
```

它表示：你的应用程序从 Flash 的 `0x10000` 地址开始，占用 `2MB`。

如果程序越来越大，超过了这个大小，就会编译或烧录失败——这时就需要调整分区表。

---

## Bootloader 是什么

Bootloader 可以理解成一个"开机引导员"。

ESP 芯片刚上电时，不是直接运行你的 `app_main()`，而是先运行内部启动代码，然后加载 bootloader。

bootloader 会做几件事：

```text
1. 初始化一些基本硬件
2. 去找分区表
3. 看看用户程序在哪个地址
4. 把真正的用户程序启动起来
```

所以：

```text
bootloader 不是你的主程序
bootloader 是负责把你的主程序带起来的程序
```

---

## ESP-IDF 启动流程

```text
ROM 固化启动代码
    ↓
bootloader
    ↓
读取 partition table
    ↓
决定启动哪个 app 分区
    ↓
运行你的程序
```

---

## 为什么需要分区表

因为 ESP 项目通常不只是"点灯程序"。它可能需要：

- 保存 Wi-Fi 名称和密码
- 保存设备配置
- OTA 在线升级
- 存网页文件
- 存图片、模型、音频
- 崩溃后保存调试信息

这些东西都需要 Flash 空间，不能全堆在一个地方。

---

## 各分区详解

| 分区 | Type | 用途 |
|---|---|---|
| `nvs` | data | 保存 Wi-Fi 密码、设备配置、键值对数据 |
| `phy_init` | data | 射频校准数据 |
| `factory` | app | 出厂主程序 |
| `ota_0` | app | 当前运行的程序（OTA 场景） |
| `ota_1` | app | 新下载的程序（OTA 场景） |
| `spiffs` / `littlefs` / `fatfs` | data | 文件系统，存网页、图片、日志 |
| `coredump` | data | 崩溃时的调试信息 |

---

## OTA 升级机制

OTA 升级需要至少两个 app 分区：

```text
ota_0  当前程序
ota_1  新下载的程序
```

升级流程：

```text
当前运行 ota_0
    ↓
下载新固件到 ota_1
    ↓
重启
    ↓
bootloader 切换到 ota_1
```

如果新程序启动失败，还可以回滚到旧程序。这是很多 STM32 初学阶段不会接触到的工程机制。

---

## P4 + C6 双芯片特别注意

ESP32-P4 本身偏向高性能 MCU、显示、摄像头、AI、音视频。ESP32-C6 常用于无线连接（Wi-Fi 6、BLE、Thread、Zigbee）。

P4+C6 开发板上两个芯片各自独立：

```text
ESP32-P4：跑主应用
ESP32-C6：负责无线通信
```

**P4 和 C6 是两个独立芯片，各自有自己的固件、烧录方式和分区表。**

初学时先搞清楚当前 VSCode 里打开的工程是给谁编译的：

```bash
idf.py set-target esp32p4
```

或者：

```bash
idf.py set-target esp32c6
```

目标芯片不同，配置、驱动、可用外设都会不同。

---

## 速查表

| 概念 | 一句话 |
|---|---|
| 分区表 | Flash 的地图，决定每块区域放什么 |
| Bootloader | 开机引导员，负责找到并启动你的程序 |
| NVS | 存小数据的地方（Wi-Fi 密码、设备配置） |
| Factory | 出厂主程序分区 |
| OTA | 在线升级，需要两个 app 分区来回切换 |
| SPIFFS/FATFS | 文件系统分区，存网页、图片、日志 |

---

## 记忆口诀

```text
分区表是 Flash 地图，bootloader 按图找程序。
NVS 存小数据，文件系统存大文件。
OTA 要两个分区，一个跑一个备。
P4 + C6 两个芯，各自固件各自管。
```

初学阶段先用默认分区表，不要一开始就乱改。

---

## 相关笔记

- [[../嵌入式文件系统]] — SPIFFS、LittleFS、FATFS 的区别
- [[ESP-IDF组件管理器]] — 代码模块怎么组织
- [[../../🧠MCU底层原理/CPU架构与内存模型]] — Flash 地址空间与内存映射
