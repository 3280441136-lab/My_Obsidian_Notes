# ⏰ RTC 与 Rtc_app 从驱动到串口交互学习笔记

> 面向当前工程：`C:\Users\32804\Desktop\study_gd32\我的GD32工程\2025_ShengSai`
>
> 对应代码：
>
> - `HardWare/Rtc/Rtc.c`
> - `HardWare/Rtc/Rtc.h`
> - `Function/Rtc_app.c`
> - `Function/Rtc_app.h`

---

## 🎯 先给结论

这部分代码是干什么的？

- **人话版**：让单片机记住“现在几点几分几秒”，并且支持你通过串口输入一个标准时间，把 RTC 校准好，之后还能再读出来打印。
- **工程版**：`Rtc.c` 负责底层 RTC 初始化、时间写入、时间读取；`Rtc_app.c` 负责上层串口交互、字符串解析、合法性校验、结果提示。

<span style="color:blue"><strong>Rtc.c 是“设备层驱动”</strong></span>，  
<span style="color:red"><strong>Rtc_app.c 是“业务层 / 交互层之间的桥梁”</strong></span>。

---

## 🧭 在你项目中的分层位置

```text
串口命令层
└─ Usart0_cmd.c
      |
      v
业务层
└─ Rtc_app.c
      |
      v
设备层
└─ Rtc.c
      |
      v
GD32 RTC 硬件外设
```

### 对应关系

- `Usart0_cmd.c`
  - 收到 `"RTC Config"` 或 `"RTC now"` 这类命令
- `Rtc_app.c`
  - 判断现在是不是等待输入时间
  - 解析时间字符串
  - 调用底层驱动
- `Rtc.c`
  - 真正配置 RTC 硬件
  - 真正把时间写进 RTC 寄存器
  - 真正把时间从 RTC 寄存器读出来

---

## 🧠 RTC 是什么

### 人话版

RTC = Real Time Clock，实时时钟。

它和普通定时器不一样：

- 普通定时器更像“计数工具”
- RTC 更像“手表”

RTC 更关心的是：

- 年
- 月
- 日
- 时
- 分
- 秒

### 在你这个项目里

RTC 的作用很关键：

- 串口显示当前时间
- OLED 后面显示当前时间
- TF 卡文件命名要用时间
- 日志记录要带时间
- `hide/unhide` 也需要时间戳

<span style="color:red"><strong>所以 RTC 不是一个孤立外设，它后面会给多个模块供血。</strong></span>

---

## 📌 当前代码总览

## `Rtc.h`

定义了时间结构体 `rtc_time_t`

```c
typedef struct
{
    uint16_t year;
    uint8_t month;
    uint8_t date;
    uint8_t hour;
    uint8_t minute;
    uint8_t second;
    uint8_t week;
} rtc_time_t;
```

### 这是干什么的

- 用一个结构体统一表示完整时间

### 为什么这样做

- 比单独传 7 个变量更清楚
- 后面函数接口更整洁

### 当前项目对应

- `Rtc_SetDatetime()`
- `Rtc_GetDatetime()`
- `Rtc_App_ParseDatetime()`

全都围绕这个结构体转。

---

## 🔧 `Rtc.c` 的核心职责

## 结论

`Rtc.c` 主要做 4 件事：

1. 初始化 RTC
2. 判断 RTC 是否准备好
3. 设置时间
4. 读取时间

### 逻辑框图

```text
Rtc_Init()
   |
   +--> 打开后备域访问权限
   +--> 判断是不是首次配置RTC
   +--> 首次则配置LXTAL和RTC时钟源
   +--> 非首次则直接重开RTC时钟并同步
   +--> 设置 rtc_ready

Rtc_SetDatetime()
   |
   +--> 计算星期
   +--> 十进制转BCD
   +--> 填充 rtc_parameter_struct
   +--> 调 rtc_init() 写入RTC

Rtc_GetDatetime()
   |
   +--> 调 rtc_current_time_get()
   +--> BCD转十进制
   +--> 回填 rtc_time_t
```

---

## 🧱 `Rtc.c` 的关键变量和宏

## 1. `RTC_BKP_MARK`

```c
#define RTC_BKP_MARK    0x5A5AA5A5U
```

### 这是干什么的

- 这是一个“后备域标记值”
- 用来表示：RTC 时钟源已经配置过了

### 为什么这样做

- RTC 后备域在不断电或备份电源存在时可以保留
- 下一次上电时，不需要每次都重新配置 RTC 时钟源

### 不这么做会怎样

- 每次上电都可能重复配置后备域
- RTC 时间更容易被你自己初始化流程覆盖掉

### 容易混淆点

| 名词 | 含义 |
|---|---|
| 后备域 | RTC 和备份寄存器所在区域 |
| 标记值 | 自己写进去的“我已经配置过”的记号 |

---

## 2. `static uint8_t rtc_ready;`

### 这是干什么的

- 表示 RTC 当前是否初始化成功

### 为什么这样做

- 上层 `Rtc_app.c` 在操作 RTC 前，要先确认驱动层真的准备好了

### 不这么做会怎样

- 上层可能在 RTC 根本没起来的时候就去读写
- 串口表现会很乱

---

## 🔄 BCD 到底是什么，为什么 RTC 里总碰到它

## 结论

BCD 是 **二进制编码十进制**

### 人话版

比如十进制 `25`

BCD 不是直接当二进制 25 存，而是：

```text
2 -> 0010
5 -> 0101
合起来 = 0x25
```

### 为什么 RTC 里常用 BCD

很多 RTC 硬件寄存器喜欢按“十位 + 个位”这种方式存时间。

### 当前代码里体现在哪

```c
Rtc_DecToBcd()
Rtc_BcdToDec()
```

### 不做转换会怎样

- 写进去的时间和你以为的不一样
- 读出来也会错

---

## 🔍 `Rtc_DecToBcd()` 和 `Rtc_BcdToDec()`

## `Rtc_DecToBcd()`

```c
static uint8_t Rtc_DecToBcd(uint8_t dec)
{
    return (uint8_t)(((dec / 10) << 4) | (dec % 10));
}
```

### 结论

十进制转 BCD。

### 举例

`45`

```text
45 / 10 = 4
45 % 10 = 5
BCD = 0x45
```

---

## `Rtc_BcdToDec()`

```c
static uint8_t Rtc_BcdToDec(uint8_t bcd)
{
    return (uint8_t)(((bcd >> 4) * 10) + (bcd & 0x0F));
}
```

### 结论

BCD 转十进制。

### 举例

`0x23`

```text
高4位 = 2
低4位 = 3
十进制 = 23
```

### 对应当前项目

- 设置 RTC 时：十进制 -> BCD
- 读取 RTC 时：BCD -> 十进制

---

## 📅 `Rtc_GetWeek()` 为什么要自己算星期

```c
static uint8_t Rtc_GetWeek(uint16_t year, uint8_t month, uint8_t day)
```

### 结论

这是根据年月日自动计算星期几。

### 为什么这样做

- 用户输入的字符串里没有直接带星期
- 但 RTC 结构体里需要写 `day_of_week`

### 当前代码做法

- 用的是 `Sakamoto 算法`
- 先算出：

```text
0 = 周日 ... 6 = 周六
```

- 再转换成你当前代码定义的：

```text
1 = 周一 ... 7 = 周日
```

### 不这么做会怎样

- 星期字段不准
- 后面如果 OLED、日志、文件命名要显示星期，就会出错

### 容易混淆点

不同库、不同项目对星期编号定义不一定一样：

| 编码方案 | 含义 |
|---|---|
| 0=周日 ~ 6=周六 | 很常见的算法输出 |
| 1=周一 ~ 7=周日 | 你当前代码采用的编号 |

<span style="color:red"><strong>这个编号必须前后一致，不能一会儿按 0 开头，一会儿按 1 开头。</strong></span>

---

## 🛠️ `Rtc_Init()` 完整拆解

```c
void Rtc_Init(void)
```

### 人话版总目标

让 RTC 硬件真正工作起来，并尽量避免重复破坏已经配好的 RTC 环境。

---

## `Rtc_Init()` 逻辑框图

```text
Rtc_Init()
  |
  v
rtc_ready = 0
  |
  v
打开 PMU 时钟
  |
  v
允许写后备域
  |
  v
读取 RTC 时钟源选择状态
  |
  v
是否首次配置？
  |-------------------------------|
  | 是                            | 否
  v                               v
打开 LXTAL                        打开 RTC 时钟
等待晶振稳定                      等待寄存器同步
选择 RTC 时钟源=LXTAL             |
打开 RTC 时钟                     |
等待寄存器同步                    |
写入后备标记                      |
  |-------------------------------|
              |
              v
        rtc_ready = 1
```

---

## 逐行关键解释

## 1. `rcu_periph_clock_enable(RCU_PMU);`

### 这是干什么的

打开 PMU 时钟。

### 为什么这样做

- RTC 后备域访问权限由 PMU 相关机制控制
- 不开 PMU，就不能正确操作后备域

### 不这么做会怎样

- 后备域访问失败

---

## 2. `pmu_backup_write_enable();`

### 这是干什么的

允许写后备域。

### 为什么这样做

- RTC 备份寄存器、时钟源配置属于后备域内容
- 默认很多芯片会保护这块区域，防止乱写

### 不这么做会怎样

- 写 `RTC_BKP0`
- 配 RTC 时钟源

这些操作可能失败。

---

## 3. `rtcsrc_flag = GET_BITS(RCU_BDCTL, 8, 9);`

### 这是干什么的

读取 RTC 时钟源配置状态。

### 为什么这样做

- 判断“RTC 时钟源以前有没有配过”

### 不这么做会怎样

- 无法判断是首次配置还是已有配置

### 容易混淆点

| 项目 | 含义 |
|---|---|
| `RTC_BKP0` 标记 | 你自己写入的软件标记 |
| `rtcsrc_flag` | 芯片硬件寄存器里的 RTC 时钟源状态 |

你当前代码两者一起判断，更稳。

---

## 4. 首次配置分支

```c
if((RTC_BKP0 != RTC_BKP_MARK) || (rtcsrc_flag == 0U))
```

### 结论

只要：

- 后备标记不对
- 或 RTC 时钟源还没配置

就按“首次配置”处理。

### 为什么这样做

- 双保险

### 不这么做会怎样

- 某些边界状态下误判

---

## 5. `rcu_osci_on(RCU_LXTAL);`

### 这是干什么的

打开外部低速晶振 `LXTAL`

### 人话版

RTC 需要一个稳定、低功耗、适合长期计时的时钟源。  
这里选的是板载 `32.768kHz` 晶振。

### 为什么选它

- 这就是 RTC 最经典的手表晶振频率
- 稳定
- 适合做年月日时分秒

### 不这么做会怎样

- RTC 没有可靠时基

---

## 6. `rcu_osci_stab_wait(RCU_LXTAL)`

### 这是干什么的

等待外部低速晶振稳定。

### 为什么这样做

- 晶振打开不是瞬间就稳定
- 先稳，再拿来当 RTC 时钟

### 不这么做会怎样

- RTC 可能用不稳定时钟开始跑

---

## 7. `rcu_rtc_clock_config(RCU_RTCSRC_LXTAL);`

### 这是干什么的

把 RTC 时钟源选成 `LXTAL`

### 为什么这样选

- RTC 最适合用低速稳定时钟

### 不这么做会怎样

- RTC 走时不准
- 或者根本没配置成功

---

## 8. `rcu_periph_clock_enable(RCU_RTC);`

### 这是干什么的

打开 RTC 外设时钟。

### 为什么这样做

- 前面只是选时钟源
- 这句才是给 RTC 外设真正供时钟

---

## 9. `rtc_register_sync_wait()`

### 这是干什么的

等待 RTC 寄存器同步。

### 为什么这样做

- RTC 属于特殊时钟域
- 主系统和 RTC 域之间需要同步

### 不这么做会怎样

- 紧接着读写 RTC 寄存器时，结果可能不可靠

---

## 10. `RTC_BKP0 = RTC_BKP_MARK;`

### 这是干什么的

向后备寄存器写入“已经初始化过”的标记。

### 为什么这样做

- 下次上电可以知道：RTC 时钟源已经配过

### 不这么做会怎样

- 每次都像第一次开机一样重新搞 RTC

---

## 11. 非首次配置分支

```c
else
{
    rcu_periph_clock_enable(RCU_RTC);

    if(SUCCESS != rtc_register_sync_wait())
    {
        rtc_ready = 0;
        return;
    }
}
```

### 结论

如果 RTC 以前已经配过，就不要重复大改，只需要：

- 重开 RTC 时钟
- 等同步

### 为什么这样做

- 尽量保住原来的 RTC 环境

### 当前项目意义

这符合你以后做“断电后尽量保留 RTC 配置”的思路。

---

## 12. `rtc_ready = 1;`

### 这是干什么的

告诉上层：RTC 可以用了。

### 当前项目中谁会用它

- `Rtc_App_InputDatetime()`
- `Rtc_App_PrintNow()`

它们都会先调：

```c
Rtc_IsReady()
```

---

## 📝 `Rtc_SetDatetime()` 完整拆解

```c
uint8_t Rtc_SetDatetime(rtc_time_t *rtc_time)
```

### 这是干什么的

把你传入的正常十进制时间写进 RTC。

### 为什么这里要分层

- 上层喜欢用正常十进制：`2025-04-20 12:30:45`
- 底层 RTC 库很多字段要 BCD 格式

所以这里就是“人类时间格式”和“RTC硬件格式”之间的翻译层。

---

## `Rtc_SetDatetime()` 逻辑框图

```text
传入 rtc_time_t
   |
   v
根据年月日计算星期
   |
   v
把 year/month/date/hour/minute/second 转成 BCD
   |
   v
填充 rtc_parameter_struct
   |
   v
设置异步/同步分频
   |
   v
设置24小时制
   |
   v
调用 rtc_init()
   |
   +--> 成功 -> 返回1
   |
   +--> 失败 -> 返回0
```

---

## 关键点解释

## 1. `rtc_time->week = Rtc_GetWeek(...)`

### 这是干什么的

先用年月日自动算星期，并写回结构体。

### 为什么这样做

- 用户输入时没有提供星期
- 但 RTC 初始化结构体要填 `day_of_week`

### 当前项目意义

- 后面 OLED、日志、文件命名如果想用星期，直接就能拿

---

## 2. `rtc_parameter_struct rtc_initpara;`

### 这是干什么的

GD32 RTC 库自己的初始化结构体。

### 为什么这样做

- 你自己的 `rtc_time_t` 更适合业务层
- GD32 的 `rtc_parameter_struct` 更适合底层驱动

### 容易混淆点

| 结构体 | 用途 |
|---|---|
| `rtc_time_t` | 你自己工程里统一用的时间结构体 |
| `rtc_parameter_struct` | GD32 库要求的 RTC 结构体 |

---

## 3. 年份为什么只写后两位

```c
rtc_initpara.year = Rtc_DecToBcd((uint8_t)(rtc_time->year % 100));
```

### 结论

GD32 这里实际只存年份后两位。

### 举例

`2025`

```text
2025 % 100 = 25
写入 BCD = 0x25
```

### 读出来时为什么又能变回 `2025`

因为你在 `Rtc_GetDatetime()` 里写了：

```c
rtc_time->year = (uint16_t)(2000 + Rtc_BcdToDec(rtc_initpara.year));
```

所以当前代码的默认前提是：

<span style="color:red"><strong>年份范围默认锁定在 2000~2099。</strong></span>

---

## 4. `factor_asyn = 0x7F` 和 `factor_syn = 0xFF`

### 这是干什么的

RTC 的异步分频和同步分频参数。

### 为什么这样配

你代码里注释写得很对：

```c
// LXTAL 32768Hz 对应官方常用分频
```

这是一套常见配法，让 RTC 以 1 秒为基础节拍工作。

### 不这么做会怎样

- RTC 走时节拍会不准

### 容易混淆点

| 名词 | 含义 |
|---|---|
| 异步分频 | RTC 内部分频链的一部分 |
| 同步分频 | RTC 内部分频链的另一部分 |
| 它们不是业务层的“周期” | 这是 RTC 硬件内部节拍配置 |

---

## 5. `display_format = RTC_24HOUR`

### 这是干什么的

设置 24 小时制。

### 为什么这样选

- 比赛题、串口输出、OLED 显示都更适合 24 小时制

### 不这么做会怎样

- 12 小时制会引入 `AM/PM`
- 串口输出逻辑更绕

---

## 📖 `Rtc_GetDatetime()` 完整拆解

```c
uint8_t Rtc_GetDatetime(rtc_time_t *rtc_time)
```

### 这是干什么的

从 RTC 硬件里读当前时间，再转成正常十进制结构体。

### 逻辑框图

```text
检查指针是否为空
   |
   v
调用 rtc_current_time_get()
   |
   v
把 BCD 年月日时分秒 转成十进制
   |
   v
year 补回 2000+
   |
   v
回填 rtc_time_t
   |
   v
返回 1
```

### 为什么 `year` 要补 `2000 +`

因为底层只存后两位。

---

## 💬 `Rtc_app.c` 的职责是什么

## 结论

`Rtc_app.c` 是 **RTC 业务交互层**。

它不直接操心：

- PMU
- 后备域
- LXTAL
- BCD

它负责的是：

1. 等待用户输入时间字符串
2. 检查输入是否像一个合法日期时间
3. 调用底层 `Rtc_SetDatetime()`
4. 把结果打印给串口

### 逻辑关系

```text
Usart0_cmd.c 收到 "RTC Config"
   |
   v
Rtc_App_StartConfig()
   |
   v
rtc_wait_input = 1
   |
   v
下一帧串口数据到来
   |
   v
Rtc_App_InputDatetime()
   |
   +--> 解析成功 -> 调 Rtc_SetDatetime()
   |
   +--> 解析失败 -> 打印 Datetime Invalid
```

---

## 🧷 `rtc_wait_input` 是什么

```c
static uint8_t rtc_wait_input;
```

### 人话版

这是一个“串口输入状态开关”。

### 它表示什么

- `0`：下一条串口命令按普通命令处理
- `1`：下一条串口命令不是普通命令，而是“RTC 时间字符串”

### 为什么这样做

因为 `"RTC Config"` 不是一次就把时间带进去，而是分两步：

```text
第一步：输入 RTC Config
第二步：输入具体时间字符串
```

### 不这么做会怎样

- 你没法区分“下一条串口数据到底是命令还是时间内容”

---

## 🔍 `Rtc_App_ParseDatetime()` 完整拆解

```c
static uint8_t Rtc_App_ParseDatetime(char *str, rtc_time_t *rtc_time)
```

### 结论

把串口收到的时间字符串解析成 `rtc_time_t`，并做合法性校验。

### 当前代码支持的格式

<span style="color:red"><strong>当前代码只支持固定格式：</strong></span>

```text
YYYY-MM-DD HH:MM:SS
```

例如：

```text
2025-01-01 12:00:30
```

### 和赛题要求的区别

赛题说“分隔符变化不影响评分”，但你当前代码并没有做到这一点。  
当前代码是 **严格固定格式**。

<span style="color:red"><strong>这一点后面如果要完全贴题，还得继续扩展。</strong></span>

---

## `Rtc_App_ParseDatetime()` 当前校验了哪些内容

### 1. 空指针检查

```c
if((str == NULL) || (rtc_time == NULL))
```

### 2. 长度必须是 19

```c
if(strlen(str) != 19)
```

### 3. 固定位置必须是固定分隔符

```c
str[4]  == '-'
str[7]  == '-'
str[10] == ' '
str[13] == ':'
str[16] == ':'
```

### 4. 其余位置必须是数字

靠 `Rtc_App_IsDigit()` 一位一位检查

### 5. 年份范围

```text
2000 ~ 2099
```

### 6. 月份范围

```text
1 ~ 12
```

### 7. 日期范围

会结合闰年判断

### 8. 小时范围

```text
0 ~ 23
```

### 9. 分钟范围

```text
0 ~ 59
```

### 10. 秒范围

```text
0 ~ 59
```

---

## 🧠 闰年和月天数为什么要专门写

### `Rtc_App_IsLeapYear()`

这是标准闰年判断：

```text
4年一闰，百年不闰，400年再闰
```

### `Rtc_App_GetMonthDays()`

作用是：

- 根据某年某月，求出该月有几天

### 为什么这里必须做

如果你只检查“日期是不是 1~31”，那下面这些错误日期就会被误当成合法：

- `2025-02-31`
- `2025-04-31`
- `2024-02-30`

### 当前项目意义

这说明你现在的 `Rtc_app` 已经不是只做“格式检查”，而是开始做“业务合法性检查”了，这个方向是对的。

---

## 🧪 `Rtc_App_StartConfig()`

```c
void Rtc_App_StartConfig(void)
{
    rtc_wait_input = 1;
    Usart0_Printf("Input Datetime\r\n");
}
```

### 这是干什么的

启动“等待输入时间字符串”的流程。

### 为什么这样做

- 让上层命令流程拆成两步

### 当前项目对应

用户输入：

```text
RTC Config
```

串口返回：

```text
Input Datetime
```

---

## 🧪 `Rtc_App_IsWaitInput()`

```c
uint8_t Rtc_App_IsWaitInput(void)
{
    return rtc_wait_input;
}
```

### 这是干什么的

让其他模块判断：当前是不是 RTC 配置输入阶段。

### 当前项目谁会用

`Usart0_cmd.c`

逻辑是：

```text
如果正在等待RTC输入
    那么下一帧直接交给 Rtc_App_InputDatetime()
否则
    按普通命令解析
```

---

## 🧪 `Rtc_App_InputDatetime()`

```c
void Rtc_App_InputDatetime(char *str)
```

### 这是干什么的

处理用户输入的时间字符串，并根据结果打印反馈。

### 逻辑框图

```text
进入函数
  |
  v
rtc_wait_input = 0
  |
  v
RTC 是否就绪？
  |-- 否 --> 打印 RTC Not Ready
  |
  v
字符串是否合法？
  |-- 否 --> 打印 Datetime Invalid
  |
  v
调用 Rtc_SetDatetime()
  |-- 失败 --> 打印 RTC Config Fail
  |
  v
打印 RTC Config Success
打印最终设置成功的时间
```

### 为什么一进来就 `rtc_wait_input = 0`

因为不管这次输入成功还是失败，这一帧都已经被当作“RTC 时间输入”消费掉了。  
下一帧就该恢复成普通串口命令逻辑。

### 不这么做会怎样

- 下一条命令可能还会被误当成时间字符串

---

## 🧪 `Rtc_App_PrintNow()`

```c
void Rtc_App_PrintNow(void)
```

### 这是干什么的

读取当前 RTC 时间并打印到串口。

### 为什么这样做

- 对应赛题里的 `RTC now`

### 逻辑

```text
检查 RTC 是否 ready
   |
   +--> 否：RTC Not Ready
   |
   v
调用 Rtc_GetDatetime()
   |
   +--> 失败：RTC Read Fail
   |
   v
按固定格式打印时间
```

---

## 🖨️ RTC 里这串打印为什么这样写

```c
Usart0_Printf("%04d-%02d-%02d %02d:%02d:%02d\r\n",
              rtc_time.year,
              rtc_time.month,
              rtc_time.date,
              rtc_time.hour,
              rtc_time.minute,
              rtc_time.second);
```

### 人话版

这是为了把时间固定打印成：

```text
2025-04-20 09:05:03
```

### 每个格式符什么意思

| 写法 | 含义 |
|---|---|
| `%04d` | 宽度 4，不够前面补 0 |
| `%02d` | 宽度 2，不够前面补 0 |
| `-` | 普通字符，直接输出 |
| `:` | 普通字符，直接输出 |
| `\r\n` | 串口换行 |

### 为什么年份用 `%04d`

例如：

```text
2025
```

固定四位最合适。

### 为什么月、日、时、分、秒用 `%02d`

为了像这样统一格式：

```text
01
09
12
```

而不是：

```text
1
9
12
```

### 如果不用补零会怎样

- 显示不整齐
- 文件命名、日志时间格式更难统一

---

## 🔢 RTC 模块里要顺带掌握的格式化输出知识

### 常见格式符表

| 写法 | 含义 | 例子 |
|---|---|---|
| `%d` | 有符号整数 | `-1` |
| `%u` | 无符号整数 | `25` |
| `%x` | 十六进制小写 | `1a3f` |
| `%X` | 十六进制大写 | `1A3F` |
| `%f` | 浮点数 | `3.140000` |
| `%.2f` | 保留2位小数 | `3.14` |
| `%02d` | 两位宽度，不够补0 | `03` |
| `%04d` | 四位宽度，不够补0 | `0025` |
| `%s` | 字符串 | `hello` |
| `%c` | 单个字符 | `A` |

### 类型匹配提醒

`rtc_time.year` 是 `uint16_t`，当前这样打印通常问题不大。  
但从规范和稳妥角度，你以后可以意识到：

- 小整型会在可变参数里发生默认整型提升
- 格式符和类型尽量保持一致

比如：

```c
Usart0_Printf("%u\r\n", (unsigned int)rtc_time.month);
```

这是更稳的思路。

---

## ⚠️ 当前 RTC / Rtc_app 代码的真实状态总结

## 已经做得对的地方

### 1. 分层方向是对的

- `Rtc.c` 管底层
- `Rtc_app.c` 管交互和解析

### 2. 输入合法性检查比最初版本更完整

- 年月日时分秒都有范围检查
- 已经加了闰年和月天数判断

### 3. 后备域标记思路是对的

- 避免每次上电都像第一次配置

### 4. 串口状态机思路是对的

- `"RTC Config"` -> `"Input Datetime"` -> 下一帧输入时间

---

## 当前还要注意的点

### 1. 目前只支持固定格式

当前只接受：

```text
YYYY-MM-DD HH:MM:SS
```

而赛题允许更宽松的分隔符形式。  
所以当前代码：

<span style="color:red"><strong>对你自己的工程来说已经能用，但对赛题“完全贴题”还不够。</strong></span>

### 2. `Rtc_SetDatetime()` 没有显式检查空指针

当前默认上层传进来的指针有效。  
虽然你现在调用路径比较干净，但从鲁棒性角度，后面可以补。

### 3. 年份默认锁定在 `2000~2099`

这是由：

- 解析时的校验
- 写入时只保留后两位
- 读取时补回 `2000 +`

共同决定的。

---

## 🧱 RTC 整体伪代码总结

### 底层驱动层伪代码

```c
函数 Rtc_Init()
{
    rtc_ready = 0;

    打开PMU时钟;
    允许写后备域;

    读取RTC时钟源状态;

    如果(后备标记不对 或 RTC时钟源未配置)
    {
        打开LXTAL;
        等待LXTAL稳定;

        选择RTC时钟源=LXTAL;
        打开RTC时钟;
        等待RTC寄存器同步;

        写入后备标记;
    }
    否则
    {
        打开RTC时钟;
        等待RTC寄存器同步;
    }

    rtc_ready = 1;
}
```

### 上层业务层伪代码

```c
函数 Rtc_App_StartConfig()
{
    rtc_wait_input = 1;
    串口打印 "Input Datetime";
}

函数 Rtc_App_InputDatetime(str)
{
    rtc_wait_input = 0;

    如果 RTC 未就绪
        打印 "RTC Not Ready"
        返回

    如果 字符串解析失败
        打印 "Datetime Invalid"
        返回

    如果 底层设置失败
        打印 "RTC Config Fail"
        返回

    打印 "RTC Config Success"
    打印设置后的时间
}

函数 Rtc_App_PrintNow()
{
    如果 RTC 未就绪
        打印 "RTC Not Ready"
        返回

    如果 读取失败
        打印 "RTC Read Fail"
        返回

    打印当前时间
}
```

---

## ⚠️ 常见坑总结

## 1. 把 `Rtc.c` 和 `Rtc_app.c` 的职责混在一起

错误思路：

- 在 `Rtc.c` 里直接处理串口字符串

正确思路：

- `Rtc.c` 只管硬件时间读写
- `Rtc_app.c` 才管字符串解析和提示信息

## 2. 忘了 RTC 硬件喜欢 BCD

- 直接拿十进制写进去，会错

## 3. 忘了后备域访问权限

- 不能正确配置 RTC 后备域

## 4. 忘了等待 `LXTAL` 稳定

- RTC 时钟源可能不可靠

## 5. 忘了 `rtc_register_sync_wait()`

- RTC 域和主系统不同步，读写风险变大

## 6. 只校验字符串格式，不校验日期合法性

这样会错放过：

- `2025-02-31`
- `2025-04-31`

## 7. 星期编码前后不统一

- 算法输出和工程内部定义要统一

## 8. 误以为赛题允许宽松分隔符，你当前代码就已经支持了

<span style="color:red"><strong>注意：当前代码并没有支持宽松分隔符，它只支持固定格式。</strong></span>

## 9. 忘了 `rtc_wait_input` 只是“当前下一帧输入状态”

- 这不是一个长期模式
- 处理一帧之后就应该退出等待状态

---

## ✅ 这部分你真正要记住的 6 句话

1. `Rtc.c` 管硬件，`Rtc_app.c` 管交互。
2. RTC 是“手表”，不是普通计数器。
3. RTC 硬件里常用 BCD，所以读写前后要做格式转换。
4. 后备域标记是为了避免每次上电都重复初始化 RTC 时钟源。
5. `rtc_wait_input` 是串口状态机的一个等待输入开关。
6. 你当前代码能稳定完成固定格式 RTC 配置，但还没完全扩展到赛题要求的宽松分隔符输入。

---

## 📍下一步建议

从项目主线角度，RTC 这块你现在已经有比较不错的雏形了。  
后面建议按这个顺序继续：

```text
ADC 驱动层打通
   ->
Sample 业务层接 ADC
   ->
OLED 显示层接 RTC + Sample
   ->
TF / Flash / 日志再逐步挂进来
```

<span style="color:blue"><strong>也就是说，RTC 现在不需要重写，后面主要是继续扩展它的“被使用场景”。</strong></span>

