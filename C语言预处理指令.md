---
version: V1.0
updated: 2026-05-04
author: RUI
---

# C 语言预处理指令：`#` 号用法笔记

> 适合对象：会写 C 代码，但看到 `#include`、`#define`、`#if 0`、`#ifndef`、`#endif` 会觉得很高级、很懵的同学。  
> 学习目标：搞懂这些 <span style="color:#1565c0;"><b># 开头的指令不是普通 C 语句</b></span>，而是在编译前由预处理器先处理。

---

## 目录

- [先给结论](#先给结论)
- [#include：包含头文件](#include包含头文件)
- [#define：定义宏](#define定义宏)
- [#if：条件编译](#if条件编译)
- [#if 0 为什么能注释代码](#if-0-为什么能注释代码)
- [#ifdef：如果定义过](#ifdef如果定义过)
- [#ifndef：如果没有定义过](#ifndef如果没有定义过)
- [为什么头文件需要保护](#为什么头文件需要保护)
- [#else 和 #elif](#else-和-elif)
- [#endif：结束条件编译](#endif结束条件编译)
- [#error：主动报错](#error主动报错)
- [#warning：主动警告](#warning主动警告)
- [#pragma once](#pragma-once)
- [#if 和普通 if 的区别](#if-和普通-if-的区别)
- [常用模板 1：头文件保护](#常用模板-1头文件保护)
- [常用模板 2：调试日志开关](#常用模板-2调试日志开关)
- [常用模板 3：临时屏蔽旧代码](#常用模板-3临时屏蔽旧代码)
- [常用模板 4：按芯片选择代码](#常用模板-4按芯片选择代码)
- [常用模板 5：配置检查](#常用模板-5配置检查)
- [预处理指令速查表](#预处理指令速查表)
- [小白常见坑](#小白常见坑)
- [记忆口诀](#记忆口诀)
- [推荐学习顺序](#推荐学习顺序)

---

## 先给结论

<span style="color:#d32f2f;"><b>`#` 开头的东西叫预处理指令。</b></span>

它们发生在：

```text
真正编译 C 代码之前
```

编译流程简化：

```text
.c 源文件
    ↓
预处理器处理 #include/#define/#if
    ↓
生成展开后的 C 代码
    ↓
编译器编译
    ↓
汇编/链接
    ↓
生成可执行文件或固件
```

预处理指令常用来做：

```text
包含头文件
定义常量/宏
条件编译
屏蔽代码
防止头文件重复包含
根据芯片/配置选择不同代码
```

---

## #include：包含头文件

示例：

```c
#include <stdio.h>
#include "freertos/FreeRTOS.h"
#include "list.h"
```

作用：

```text
把另一个文件里的声明拿过来，让当前文件知道这些函数、类型、宏存在
```

### 尖括号和双引号区别

```c
#include <stdio.h>
```

通常用于：

```text
系统库、标准库、编译器或 SDK 提供的头文件
```

```c
#include "list.h"
```

通常用于：

```text
自己工程里的头文件
```

小白先记：

```text
库文件用 < >
自己写的文件用 " "
```

---

## #define：定义宏

### 定义常量

```c
#define TAG "main"
#define LED_PIN 2
#define BUFFER_SIZE 128
```

使用：

```c
ESP_LOGI(TAG, "hello");
```

预处理后大概相当于：

```c
ESP_LOGI("main", "hello");
```

人话：

```text
#define 就像编译前的文字替换
```

### 定义功能开关

```c
#define USE_LED 1
```

然后：

```c
#if USE_LED
void led_init(void)
{
    // LED 初始化
}
#endif
```

如果改成：

```c
#define USE_LED 0
```

这段 LED 代码就不参与编译。

---

## #if：条件编译

```c
#define DEBUG_LOG 1

#if DEBUG_LOG
ESP_LOGI(TAG, "debug log");
#endif
```

意思：

```text
如果 DEBUG_LOG 的值不为 0，就保留中间代码
```

注意：

<span style="color:#d32f2f;"><b>#if 是编译前判断，不是程序运行时判断。</b></span>

---

## #if 0 为什么能注释代码

写法：

```c
#if 0

void old_test(void)
{
    printf("这段代码不会编译\n");
}

#endif
```

原因：

```text
#if 0 的条件永远是假
所以中间代码会被预处理器直接跳过
```

等价理解：

```text
临时屏蔽大段代码
```

如果要重新启用：

```c
#if 1
...
#endif
```

### 为什么不用 /* ... */

普通注释：

```c
/*
    一大段代码
*/
```

问题：

```text
如果里面本来就有 /* ... */ 注释，容易嵌套出错
```

`#if 0` 更适合临时屏蔽大段代码。

---

## #ifdef：如果定义过

`#ifdef` 可以理解为：

```text
if defined
如果这个宏被定义过
```

示例：

```c
#define DEBUG

#ifdef DEBUG
ESP_LOGI(TAG, "debug mode");
#endif
```

因为 `DEBUG` 被定义过，所以中间代码参与编译。

如果写成：

```c
// #define DEBUG
```

那中间代码不会编译。

---

## #ifndef：如果没有定义过

`#ifndef` 可以理解为：

```text
if not defined
如果这个宏没有被定义过
```

最常见用途：<span style="color:#1565c0;"><b>头文件保护</b></span>。

```c
#ifndef _LIST_H_
#define _LIST_H_

// list.h 的内容

#endif
```

意思：

```text
如果 _LIST_H_ 没定义过
    就定义 _LIST_H_
    然后保留头文件内容
如果 _LIST_H_ 已经定义过
    说明这个头文件之前已经包含过
    这次就跳过
```

---

## 为什么头文件需要保护

假设没有保护：

```c
#include "list.h"
#include "list.h"
```

或者间接包含：

```text
main.c include a.h
main.c include b.h
a.h 又 include list.h
b.h 也 include list.h
```

`list.h` 可能被展开多次。

如果里面有：

```c
typedef struct list_node
{
    int data;
    struct list_node *next;
    struct list_node *pre;
} list_node;
```

重复展开可能导致：

```text
重复定义类型
编译报错
```

所以头文件常写：

```c
#ifndef _LIST_H_
#define _LIST_H_

// 头文件内容

#endif
```

---

## #else 和 #elif

它们像普通 `if else`，但发生在编译前。

```c
#define BOARD_TYPE 1

#if BOARD_TYPE == 1
    ESP_LOGI(TAG, "board type 1");
#elif BOARD_TYPE == 2
    ESP_LOGI(TAG, "board type 2");
#else
    ESP_LOGI(TAG, "unknown board");
#endif
```

人话：

```text
根据宏配置，只编译其中一个分支
```

ESP-IDF 里常见：

```c
#if CONFIG_IDF_TARGET_ESP32S3
    // ESP32-S3 专用代码
#elif CONFIG_IDF_TARGET_ESP32P4
    // ESP32-P4 专用代码
#endif
```

---

## #endif：结束条件编译

凡是这些：

```c
#if
#ifdef
#ifndef
```

最后都要配：

```c
#endif
```

例如：

```c
#ifdef DEBUG
ESP_LOGI(TAG, "debug");
#endif
```

如果忘了 `#endif`，编译器会报类似：

```text
unterminated #ifdef
```

意思是：

```text
条件编译没有正确结束
```

---

## #error：主动报错

示例：

```c
#ifndef LED_PIN
#error "Please define LED_PIN first"
#endif
```

如果没有定义 `LED_PIN`，编译会直接失败，并提示：

```text
Please define LED_PIN first
```

适合用来防止配置漏掉。

例如：

```c
#if BUFFER_SIZE <= 0
#error "BUFFER_SIZE must be greater than 0"
#endif
```

---

## #warning：主动警告

有些编译器支持：

```c
#warning "This feature is experimental"
```

含义：

```text
编译时给警告，但不阻止编译
```

适合提醒：

```text
这个功能还在测试
这个配置只是临时方案
```

---

## #pragma once

现代工程里常见：

```c
#pragma once
```

作用和头文件保护类似：

```text
防止头文件被重复包含
```

例如：

```c
#pragma once

typedef struct list_node
{
    int data;
    struct list_node *next;
    struct list_node *pre;
} list_node;
```

它比：

```c
#ifndef _LIST_H_
#define _LIST_H_
...
#endif
```

更短。

但小白阶段最好两种都认识，因为很多老工程、嵌入式工程更常见 `#ifndef` 写法。

---

## #if 和普通 if 的区别

这是最重要的区别。

| 对比 | `#if` | `if` |
|---|---|---|
| 发生阶段 | 编译前 | 程序运行时 |
| 判断对象 | 宏、常量表达式 | 变量、表达式 |
| 不满足条件的代码 | 直接不参与编译 | 仍然参与编译，只是不执行 |
| 常见用途 | 功能开关、适配芯片、屏蔽代码 | 程序逻辑判断 |

运行时 `if`：

```c
int flag = 1;

if (flag) {
    ESP_LOGI(TAG, "run");
}
```

编译前 `#if`：

```c
#define FLAG 1

#if FLAG
ESP_LOGI(TAG, "compile");
#endif
```

错误理解：

```c
int flag = 1;

#if flag
ESP_LOGI(TAG, "wrong");
#endif
```

`#if` 不能用普通变量 `flag`，因为普通变量是运行时才存在的。

---

## 常用模板 1：头文件保护

```c
#ifndef _LIST_H_
#define _LIST_H_

typedef struct list_node
{
    int data;
    struct list_node *next;
    struct list_node *pre;
} list_node;

void list_init(void);

#endif
```

用途：

```text
每个 .h 文件都建议有头文件保护
```

---

## 常用模板 2：调试日志开关

```c
#define DEBUG_LOG 1

#if DEBUG_LOG
#define MY_LOGI(tag, fmt, ...) ESP_LOGI(tag, fmt, ##__VA_ARGS__)
#else
#define MY_LOGI(tag, fmt, ...)
#endif
```

使用：

```c
MY_LOGI(TAG, "cnt = %d", cnt);
```

如果：

```c
#define DEBUG_LOG 1
```

日志会保留。

如果：

```c
#define DEBUG_LOG 0
```

日志会在编译前被去掉。

---

## 常用模板 3：临时屏蔽旧代码

```c
#if 0
void old_func(void)
{
    ESP_LOGI(TAG, "old function");
}
#endif
```

用途：

```text
调试时临时保留旧代码，但不让它参与编译
```

注意：

```text
长期不用的代码不要一直 #if 0 堆着
工程后期应该删除或用 git 管理
```

---

## 常用模板 4：按芯片选择代码

```c
#if CONFIG_IDF_TARGET_ESP32S3
    ESP_LOGI(TAG, "target: ESP32-S3");
#elif CONFIG_IDF_TARGET_ESP32P4
    ESP_LOGI(TAG, "target: ESP32-P4");
#else
    ESP_LOGI(TAG, "target: other");
#endif
```

用途：

```text
同一份工程适配不同 ESP32 芯片
```

这在 ESP-IDF 里非常常见。

---

## 常用模板 5：配置检查

```c
#define BUFFER_SIZE 128

#if BUFFER_SIZE < 64
#error "BUFFER_SIZE is too small"
#endif
```

作用：

```text
如果配置明显不合理，直接编译失败
```

这样比程序运行后才崩更容易排错。

---

## 预处理指令速查表

| 指令 | 作用 | 典型用途 |
|---|---|---|
| `#include` | 包含头文件 | 引入函数/类型声明 |
| `#define` | 定义宏 | 常量、开关、简单宏函数 |
| `#if` | 条件编译 | 根据宏值选择代码 |
| `#ifdef` | 如果宏已定义 | 调试开关 |
| `#ifndef` | 如果宏未定义 | 头文件保护 |
| `#else` | 条件编译否则分支 | 多分支选择 |
| `#elif` | else if | 多条件选择 |
| `#endif` | 结束条件编译 | 和 `#if/#ifdef/#ifndef` 配对 |
| `#error` | 主动报错 | 配置检查 |
| `#warning` | 主动警告 | 临时提醒 |
| `#pragma once` | 防重复包含 | 头文件保护 |

---

## 小白常见坑

| 错误 | 原因 | 正确理解 |
|---|---|---|
| 忘记 `#endif` | 条件编译没结束 | `#if` 必须配 `#endif` |
| 用变量写 `#if flag` | `#if` 是编译前判断 | 用宏，不用运行时变量 |
| 头文件不加保护 | 重复包含可能报错 | `.h` 文件加 `#ifndef` |
| 宏函数不加括号 | 运算优先级出错 | 参数和整体都加括号 |
| 长期保留大量 `#if 0` | 代码越来越乱 | 后期清理或交给 git |

宏函数错误示范：

```c
#define SQUARE(x) x * x
```

使用：

```c
int a = SQUARE(1 + 2);
```

展开后：

```c
int a = 1 + 2 * 1 + 2;
```

结果不是 9。

更稳写法：

```c
#define SQUARE(x) ((x) * (x))
```

---

## 记忆口诀

```text
#include：把声明拿进来。
#define：编译前做替换。
#if：编译前判断要不要这段代码。
#if 0：临时屏蔽大段代码。
#ifdef：定义过才编译。
#ifndef：没定义过才编译，常用于头文件保护。
#endif：条件编译收尾。
#error：配置不对，直接让编译失败。
#pragma once：简单版头文件保护。
```

---

## 推荐学习顺序

```text
1. 先掌握 #include
2. 再掌握 #define 常量
3. 再掌握 #ifndef 头文件保护
4. 再掌握 #if 0 临时屏蔽代码
5. 最后再学宏函数和复杂条件编译
```

小白阶段先别急着写复杂宏。  
<span style="color:#1565c0;"><b>能用普通函数解决的，就不要为了炫技写复杂宏。</b></span>

---

## 相关笔记

- [[../../芯片平台/GD32/GD32底层架构与启动流程]]
