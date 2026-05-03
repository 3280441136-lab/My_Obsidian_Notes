# ESP-IDF 工程目录与 CMakeLists 入门笔记

> 适合对象：以前主要用 Keil 开发 STC51、STM32、GD32，刚开始接触 ESP-IDF 工程结构的同学。  
> 学习目标：搞懂 <span style="color:#1565c0;"><b>工程目录里每个文件夹大概是干什么的</b></span>，以及为什么 `#include "list.h"` 后还要改 `CMakeLists.txt`。

---

## 0. 先给结论

<span style="color:#d32f2f;"><b>ESP-IDF 里的 CMakeLists.txt，大致相当于 Keil 工程里的“工程文件管理器”。</b></span>

在 Keil 里：

```text
你把 xxx.c 添加到工程树里
Keil 才会编译 xxx.c
```

在 ESP-IDF 里：

```text
你把 xxx.c 写进 CMakeLists.txt 的 SRCS 里
ESP-IDF 才会编译 xxx.c
```

所以：

```text
#include "list.h"      只是让 main.c 看见声明
SRCS "list.c"          才是让 list.c 真正参与编译
```

---

## 1. 你当前工程目录长什么样

当前工程大致是：

```text
helloworld/
├── .devcontainer/
├── .vscode/
├── build/
├── main/
│   ├── CMakeLists.txt
│   ├── main.c
│   ├── list.c
│   └── list.h
├── .clangd
├── .gitignore
├── CMakeLists.txt
├── sdkconfig
└── sdkconfig.old
```

先不要被这些文件吓住。小白阶段先抓住这几个核心：

```text
main/              你的主要代码
CMakeLists.txt     工程构建规则
sdkconfig          ESP-IDF 配置表
build/             编译产物
```

---

## 2. 和 Keil 工程的对应关系

| Keil 里的东西 | ESP-IDF 里的东西 | 人话解释 |
|---|---|---|
| `.uvprojx` 工程文件 | `CMakeLists.txt` | 记录工程怎么编译 |
| Add Existing Files | `SRCS "xxx.c"` | 把 `.c` 文件加入编译 |
| Include Paths | `INCLUDE_DIRS` | 告诉编译器头文件在哪里 |
| Options for Target | `sdkconfig` + CMake 配置 | 芯片、Flash、FreeRTOS 等配置 |
| Objects / Listings | `build/` | 编译生成物 |
| Download | `idf.py flash` / VS Code 闪电 | 烧录 |
| Build | `idf.py build` / VS Code 扳手 | 编译 |

最重要的迁移认知：

```text
Keil 是图形化工程管理
ESP-IDF 是 CMake 文本化工程管理
```

---

## 3. 根目录 CMakeLists.txt

你当前根目录的 `CMakeLists.txt` 是：

```cmake
cmake_minimum_required(VERSION 3.16)

include($ENV{IDF_PATH}/tools/cmake/project.cmake)
project(helloworld)
```

### 3.1 它是干什么的

这个文件是整个 ESP-IDF 工程的入口。

人话：

```text
告诉 CMake：
这是一个 ESP-IDF 工程
工程名字叫 helloworld
请使用 ESP-IDF 的构建系统来编译
```

### 3.2 每一行解释

```cmake
cmake_minimum_required(VERSION 3.16)
```

意思：

```text
要求 CMake 版本至少是 3.16
```

为什么要写？

```text
不同 CMake 版本支持的功能不同，写最低版本可以避免环境太旧导致奇怪错误
```

```cmake
include($ENV{IDF_PATH}/tools/cmake/project.cmake)
```

意思：

```text
引入 ESP-IDF 自己的 CMake 构建脚本
```

其中：

```text
IDF_PATH = ESP-IDF 安装路径
```

你可以理解为：

```text
把 ESP-IDF 的工程规则加载进来
```

```cmake
project(helloworld)
```

意思：

```text
工程名字叫 helloworld
```

编译后你会看到类似：

```text
helloworld.bin
helloworld.elf
helloworld.map
```

---

## 4. main/CMakeLists.txt

你当前 `main/CMakeLists.txt` 是：

```cmake
idf_component_register(SRCS "list.c" "main.c"
                    INCLUDE_DIRS ".")
```

这是真正和你日常加 `.c/.h` 文件关系最大的地方。

---

## 5. idf_component_register 是什么

`idf_component_register()` 是 ESP-IDF 提供的 CMake 函数。

人话：

```text
注册一个组件，并告诉 ESP-IDF：
这个组件有哪些 .c 文件
这个组件的头文件在哪里
```

在你的工程里，`main/` 文件夹就是一个组件。

```text
main 组件
├── main.c
├── list.c
└── list.h
```

---

## 6. SRCS 是什么

```cmake
SRCS "list.c" "main.c"
```

`SRCS` 可以理解为：

```text
source files，源文件列表
```

也就是：

```text
哪些 .c 文件要参与编译
```

你现在写了：

```cmake
SRCS "list.c" "main.c"
```

意思是：

```text
编译 main.c
编译 list.c
```

如果你新建了：

```text
sensor.c
sensor.h
```

那就要改成：

```cmake
idf_component_register(
    SRCS
        "main.c"
        "list.c"
        "sensor.c"
    INCLUDE_DIRS
        "."
)
```

<span style="color:#d32f2f;"><b>重点：</b></span>

```text
新加 .c 文件，通常要加入 SRCS
新加 .h 文件，通常不用加入 SRCS
```

---

## 7. INCLUDE_DIRS 是什么

```cmake
INCLUDE_DIRS "."
```

意思是：

```text
头文件搜索目录是当前目录
```

这里的 `"."` 表示：

```text
main/ 当前文件夹
```

所以你的 `main.c` 可以写：

```c
#include "list.h"
```

因为 `list.h` 就在 `main/` 目录里。

如果你的头文件放到：

```text
main/include/list.h
```

那 `main/CMakeLists.txt` 要写：

```cmake
idf_component_register(
    SRCS
        "main.c"
        "list.c"
    INCLUDE_DIRS
        "include"
)
```

---

## 8. 为什么 include 了 list.h 还不够

这是最关键的点。

假设 `main.c` 里写：

```c
#include "list.h"

void app_main(void)
{
    list_t list;
    list_init(&list);
}
```

`list.h` 里有声明：

```c
void list_init(list_t *t);
```

这只能告诉编译器：

```text
有一个函数叫 list_init
它长这个样子
你先相信它存在
```

但是函数真正的实现是在：

```text
list.c
```

如果 `list.c` 没有加入 `SRCS`，就会出现：

```text
编译 main.c 可以过
链接时找不到 list_init 的真正实现
```

常见报错类似：

```text
undefined reference to `list_init'
```

所以完整逻辑是：

```text
list.h：提供声明，让别人知道函数怎么用
list.c：提供实现，里面真的写了函数内容
CMakeLists.txt：告诉 ESP-IDF 要把 list.c 编译进工程
```

---

## 9. .c 和 .h 的分工

| 文件 | 作用 | 是否加入 SRCS |
|---|---|---|
| `.c` | 函数实现，真正参与编译 | 要 |
| `.h` | 类型声明、函数声明、宏定义 | 通常不要 |

例如：

```text
list.h
    声明 list_t、list_node、list_init()

list.c
    实现 list_init()、list_push_back()、list_pop_back()

main.c
    include list.h，然后调用这些函数
```

图：

```text
main.c
  │
  ├── #include "list.h"   看见声明
  │
  └── 调用 list_init()

list.c
  │
  └── 真正实现 list_init()

CMakeLists.txt
  │
  └── SRCS 写入 main.c 和 list.c
```

---

## 10. main 文件夹是组件

ESP-IDF 里有“组件 component”的概念。

小白先简单理解：

```text
一个组件 = 一组 .c/.h + 一个 CMakeLists.txt
```

你的 `main/` 就是一个组件：

```text
main/
├── CMakeLists.txt
├── main.c
├── list.c
└── list.h
```

以后工程变大，可能会有：

```text
components/
├── motor/
│   ├── CMakeLists.txt
│   ├── motor.c
│   └── include/motor.h
├── sensor/
│   ├── CMakeLists.txt
│   ├── sensor.c
│   └── include/sensor.h
```

但小白阶段先不用急着拆组件。先把 `main/` 里的文件管理搞懂。

---

## 11. sdkconfig 是什么

`sdkconfig` 是 ESP-IDF 的配置文件。

它记录了很多配置，例如：

```text
目标芯片
芯片 revision
Flash 大小
日志等级
FreeRTOS tick 频率
分区表
串口监控波特率
```

你用：

```text
menuconfig
```

或者 VS Code 插件里的配置界面改东西，很多最终都会写进 `sdkconfig`。

<span style="color:#1565c0;"><b>它有点像 Keil 里的 Options for Target，但范围更大。</b></span>

小白建议：

```text
不要手动乱改 sdkconfig
优先用 menuconfig 或 VS Code 配置界面改
```

---

## 12. sdkconfig.old 是什么

`sdkconfig.old` 是旧配置备份。

人话：

```text
ESP-IDF 保存的上一次 sdkconfig
```

它不是工程核心文件。

如果只是打包给队友：

```text
sdkconfig.old 可以不发
```

---

## 13. build 文件夹是什么

`build/` 是编译产物目录。

里面可能有：

```text
bootloader.bin
partition-table.bin
helloworld.bin
helloworld.elf
helloworld.map
CMakeCache.txt
compile_commands.json
各种中间文件
```

它类似 Keil 里的：

```text
Objects/
Listings/
*.hex
*.axf
```

人话：

```text
源码编译后产生的一堆结果和缓存
```

特点：

```text
可以删除
删除后重新 build 会自动生成
不建议发给队友
```

什么时候需要删？

```text
改芯片型号
改芯片 revision
改分区表
构建环境乱了
出现奇怪缓存问题
```

对应 VS Code 里的垃圾桶：

```text
fullclean / 彻底清理
```

---

## 14. .vscode 文件夹是什么

`.vscode/` 是 VS Code 的项目配置。

里面常见：

```text
settings.json
launch.json
c_cpp_properties.json
```

可能记录：

```text
ESP-IDF 路径
串口号
调试配置
代码补全配置
```

小白理解：

```text
这是 VS Code 自己用的配置，不是 ESP32 程序源码
```

注意：

```text
里面可能有你电脑自己的路径和 COM 口
队友电脑不一定一样
```

---

## 15. .clangd 是什么

`.clangd` 是给 clangd 语言服务器用的配置。

它主要影响：

```text
代码补全
跳转定义
错误提示
头文件索引
```

小白阶段不用深究。

可以理解为：

```text
编辑器辅助配置，不是程序核心逻辑
```

---

## 16. .devcontainer 是什么

`.devcontainer/` 是 VS Code Dev Container / Docker 容器开发环境配置。

人话：

```text
让项目在一个统一的容器环境里开发
```

如果你没学 Docker，也没用容器开发：

```text
暂时不用管
```

---

## 17. .gitignore 是什么

这个文件和版本管理有关。你说 Git/GitHub 先不学，所以这里只给一句定位：

```text
.gitignore 是告诉版本管理工具哪些文件不要记录。
```

当前阶段：

```text
先知道它不是源码，也不是编译必须文件即可。
```

后面学 Git 时再展开。

---

## 18. 新增 .c/.h 文件时该怎么做

假设你要新增一个电机模块：

```text
main/
├── main.c
├── motor.c
├── motor.h
└── CMakeLists.txt
```

### 第一步：写 motor.h

```c
#ifndef MOTOR_H
#define MOTOR_H

void motor_init(void);
void motor_set_speed(int speed);

#endif
```

### 第二步：写 motor.c

```c
#include "motor.h"

void motor_init(void)
{
}

void motor_set_speed(int speed)
{
}
```

### 第三步：main.c 里 include

```c
#include "motor.h"

void app_main(void)
{
    motor_init();
    motor_set_speed(50);
}
```

### 第四步：改 main/CMakeLists.txt

```cmake
idf_component_register(
    SRCS
        "main.c"
        "list.c"
        "motor.c"
    INCLUDE_DIRS
        "."
)
```

记住：

```text
新增 motor.h：通常不用写进 CMakeLists.txt
新增 motor.c：要写进 SRCS
```

---

## 19. 常见错误速查

### 19.1 找不到头文件

报错类似：

```text
fatal error: list.h: No such file or directory
```

优先检查：

```text
list.h 是否真的存在
#include 路径是否写对
INCLUDE_DIRS 是否包含头文件所在目录
```

---

### 19.2 undefined reference

报错类似：

```text
undefined reference to `list_init'
```

意思：

```text
函数声明看到了，但真正实现没链接进来
```

优先检查：

```text
list.c 是否实现了 list_init()
list.c 是否写进 main/CMakeLists.txt 的 SRCS
函数名声明和实现是否完全一致
```

---

### 19.3 修改了 CMakeLists 但没生效

可以尝试：

```text
重新 build
必要时 fullclean 后再 build
```

尤其是：

```text
新增/删除源文件
改组件结构
改芯片配置
```

这些情况更容易需要重新配置构建。

---

## 20. 发给队友时保留哪些

如果暂时不用 Git，只是压缩包发队友，建议保留：

```text
helloworld/
├── CMakeLists.txt
├── sdkconfig
└── main/
    ├── CMakeLists.txt
    ├── main.c
    ├── list.c
    └── list.h
```

可以不发：

```text
build/
sdkconfig.old
```

看情况：

```text
.vscode/
.clangd
.devcontainer/
```

最稳的压缩包方式：

```text
复制整个工程文件夹
删除 build/
删除 sdkconfig.old
确认 main/CMakeLists.txt 里写全所有 .c 文件
再压缩发给队友
```

队友收到后：

```text
重新 build
选择自己的串口 flash
```

---

## 21. 小白记忆口诀

```text
main/ 放源码。
根 CMakeLists.txt 是工程入口。
main/CMakeLists.txt 管 main 组件编译哪些 .c。
SRCS 写 .c，INCLUDE_DIRS 写头文件目录。
.h 负责声明，.c 负责实现。
#include 只让代码看见声明，不会自动编译 .c。
sdkconfig 管 ESP-IDF 配置。
build 是编译产物，可以删，不建议发。
```

---

## 22. 你现在最该掌握的三句话

<span style="color:#d32f2f;"><b>第一句：</b></span>

```text
新增 .c 文件后，要把它加入 main/CMakeLists.txt 的 SRCS。
```

<span style="color:#d32f2f;"><b>第二句：</b></span>

```text
#include "xxx.h" 只是包含声明，不等于把 xxx.c 编译进来了。
```

<span style="color:#d32f2f;"><b>第三句：</b></span>

```text
打包工程给队友时，不要带 build，源码和 CMakeLists、sdkconfig 才是关键。
```

