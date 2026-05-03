# 🚀 GD32 ADC 从 0 到 1 学习拆解笔记

> 面向当前工程：`C:\Users\32804\Desktop\study_gd32\我的GD32工程\2025_ShengSai`
>
> 对应目标：先把 **ADC 驱动层** 学明白，再平稳接入后续 `Sample.c`

---

## 🎯 先给结论

这部分代码是干什么的？

- **人话版**：让开发板上的滑动变阻器输出的电压，能被 GD32 单片机“看见、读出、换算成数值”。
- **工程版**：把 `PC0` 配成模拟输入，挂到 `ADC0` 的规则组，采用 `12位 + 右对齐 + 连续转换 + 软件触发一次` 的方式，持续得到最新电压值。

<span style="color:blue"><strong>你当前项目里，ADC 层只负责“采真实板端电压”</strong></span>。  
<span style="color:red"><strong>ratio、limit、采样周期、超限判断，这些都不属于 ADC 层，而属于 Sample 业务层。</strong></span>

---

## 🧭 这部分在你项目中的位置

### 分层定位

```text
交互层
├─ Key
└─ Usart0

业务层
├─ Sample
└─ Rtc_app

设备层
├─ Adc
├─ Led
├─ Oled
├─ Rtc
├─ Flash
└─ TfCard
```

### 当前这份笔记对应的就是

- **设备层 / 驱动层**
- 建议文件位置：

```text
HardWare/
└─ Adc/
   ├─ Adc.h
   └─ Adc.c
```

---

## 🧠 ADC 到底是什么

### 人话版

ADC，全称模数转换器。

单片机自己只认识数字，比如：

- `0`
- `1`
- `1234`
- `4095`

但电压是模拟量，比如：

- `0.53V`
- `1.87V`
- `3.12V`

所以 ADC 的工作就是：

```text
模拟电压  -->  数字数值
```

### 在你这个项目里

- 滑动变阻器输出一个变化的电压
- 这电压接到 `PC0`
- `PC0` 对应 `ADC_CHANNEL_10`
- ADC 读完后得到一个 `0~4095` 的数字
- 再由程序把它换算成电压值 `0~3.3V`

---

## 📌 关键概念一次讲清

## 1. 分频是什么，为什么这里用 `/8`

### 结论

`adc_clock_config(ADC_ADCCK_PCLK2_DIV8);`

表示：ADC 的工作时钟来自 `PCLK2`，但不是直接用，而是先 **除以 8** 再给 ADC。

### 为什么这样选

- 你现在采样周期是 `5s / 10s / 15s`
- 完全不缺 ADC 转换速度
- 反而更看重“稳、简单、少出幺蛾子”
- 官方例程也用了 `/8`

### 不这么做会怎样

- 分频太小，ADC 时钟太快，可能更容易抖
- 新手阶段最烦的是“能跑，但不稳”

### 容易混淆点

<span style="color:red"><strong>ADC 分频</strong></span> 不是题目里的 <span style="color:blue"><strong>5 秒采样周期</strong></span>

| 名词 | 所属层次 | 含义 |
|---|---|---|
| ADC 分频 | 硬件层 | ADC 内部工作多快 |
| 采样周期 5s/10s/15s | 业务层 | 程序多久取一条采样记录 |

---

## 2. 右对齐是什么，为什么用右对齐

### 结论

`adc_data_alignment_config(ADC0, ADC_DATAALIGN_RIGHT);`

表示：ADC 结果按 **右对齐** 存放。

### 人话版

你现在 ADC 是 12 位，有效结果范围：

```text
0 ~ 4095
```

ADC 结果寄存器比 12 位更宽，所以这 12 位数据要放进更宽的格子里。  
有两种放法：

#### 右对齐

```text
0000 1010 1100 1111
```

#### 左对齐

```text
1010 1100 1111 0000
```

### 为什么这里选右对齐

- 读出来就能直接当普通整数用
- 后面换算电压最直观

```c
voltage = adc_value * 3.3f / 4095.0f;
```

### 不这么做会怎样

- 左对齐也不是不能用
- 但你还得自己移位处理
- 对当前学习阶段没有任何好处

### 记忆口诀

```text
右对齐 = 对新手最友好 = 读出来直接算
```

---

## 3. 规则组是什么

### 结论

规则组就是 ADC 正常工作的“主采样队列”。

### 人话版

ADC 不是只能采一个东西，它可以排队采多个通道。  
这个“正常排队”的队列，就叫 **规则组**。

你现在的情况非常简单：

```text
规则组长度 = 1
规则组第0位 = ADC_CHANNEL_10
```

也就是：

```text
规则组
└─ rank0 -> ADC_CHANNEL_10 -> PC0
```

### 为什么这里这样配

因为你现在只采一个通道：滑动变阻器对应的 `PC0`

### 不这么做会怎样

- ADC 不知道你要按什么顺序采
- 多通道时会乱
- 单通道时也不规范

### 容易混淆点

| 名词 | 含义 |
|---|---|
| 规则组 | 平时正常采样用的主队列 |
| 插入组 | 高优先级插队采样队列 |

<span style="color:red"><strong>你当前阶段只需要先懂规则组，不需要碰插入组。</strong></span>

---

## 4. 采样时间是什么

### 结论

`ADC_SAMPLETIME_56` 表示：ADC 每次内部采样时，采样保持时间选 56 个 ADC 时钟周期。

### 为什么这样选

- 采样时间太短，信号可能还没稳定就开始转换
- 采样时间适中，更稳
- 对滑动变阻器这种慢信号来说，完全够用

### 不这么做会怎样

- 过短时，读值可能更飘
- 你会误以为“板子坏了”或者“ADC 不准”

### 容易混淆点

<span style="color:red"><strong>采样时间</strong></span> 不等于 <span style="color:blue"><strong>采样周期</strong></span>

| 名词 | 含义 |
|---|---|
| 采样时间 `ADC_SAMPLETIME_56` | 单次 ADC 内部采样保持时间 |
| 采样周期 `5000ms/10000ms/15000ms` | 程序多久采一条记录 |

---

## 5. 精度、量程、分辨率分别是什么

### 分辨率

你现在用的是：

```c
adc_resolution_config(ADC0, ADC_RESOLUTION_12B);
```

表示 ADC 是 **12 位**

```text
2^12 = 4096 个状态
范围是 0 ~ 4095
```

### 量程

这里默认参考电压按 `3.3V`

所以：

```text
ADC 原始值 0    -> 0V
ADC 原始值 4095 -> 3.3V
```

### 精度

理论上每 1 个码值对应：

```text
3.3 / 4095 ≈ 0.000805V
≈ 0.805mV
```

注意：

<span style="color:red"><strong>这是理论分辨能力，不等于真实工程精度。</strong></span>

真实测量还会受这些影响：

- 参考电压误差
- 电源噪声
- 滑动变阻器抖动
- PCB 布线
- 采样时间设置
- ADC 校准情况

---

## 🏗️ `Adc_Init()` 的完整逻辑框图

```text
开始
  |
  v
打开 GPIOC 时钟
  |
  v
PC0 配置为模拟输入
  |
  v
打开 ADC0 时钟
  |
  v
配置 ADC 时钟分频 = PCLK2 / 8
  |
  v
ADC 复位到默认状态
  |
  v
配置 12位分辨率
  |
  v
开启连续转换模式
  |
  v
配置数据右对齐
  |
  v
配置规则组长度 = 1
  |
  v
配置 rank0 = 通道10(PC0), 采样时间=56周期
  |
  v
关闭外部触发
  |
  v
使能 ADC
  |
  v
延时 1ms
  |
  v
ADC 校准
  |
  v
软件触发一次
  |
  v
ADC 连续转换运行中
```

---

## 🧩 推荐的 `Adc.h`

```c
/************************************************************
 * 文件：Adc.h
 * 作者: rui
 * 平台: 2026CIMC KIT2
************************************************************/

#ifndef __ADC_H
#define __ADC_H

/************************* 头文件 *************************/

#include "HeaderFiles.h"

/************************* 宏定义 *************************/

#define ADC_PORT                GPIOC
#define ADC_PIN                 GPIO_PIN_0
#define ADC_CHANNEL             ADC_CHANNEL_10
#define ADC_PERIPH              ADC0

#define ADC_MAX_VALUE           4095.0f
#define ADC_REF_VOLTAGE         3.3f

/************************ 函数定义 ************************/

void Adc_Init(void);
uint16_t Adc_GetValue(void);
float Adc_GetVoltage(void);

#endif
```

### 逐项解释

| 宏 / 函数 | 含义 |
|---|---|
| `ADC_PORT` | ADC 输入脚所在端口，这里是 `GPIOC` |
| `ADC_PIN` | 具体引脚，这里是 `PC0` |
| `ADC_CHANNEL` | ADC 内部通道编号，`PC0 -> ADC_CHANNEL_10` |
| `ADC_PERIPH` | 实际工作的 ADC 外设，这里是 `ADC0` |
| `ADC_MAX_VALUE` | 12 位 ADC 最大值，按 `4095` 换算 |
| `ADC_REF_VOLTAGE` | 默认参考电压，按 `3.3V` 计算 |
| `Adc_Init()` | 初始化 ADC |
| `Adc_GetValue()` | 读取 ADC 原始值 |
| `Adc_GetVoltage()` | 读取并换算成板端电压 |

---

## 🧩 推荐的 `Adc.c`

```c
/************************************************************
 * 文件：Adc.c
 * 作者: rui
 * 平台: 2026CIMC KIT2
************************************************************/

/************************* 头文件 *************************/

#include "Adc.h"

/************************ 函数定义 ************************/

static void Adc_Port_Init(void)
{
    rcu_periph_clock_enable(RCU_GPIOC);
    gpio_mode_set(ADC_PORT, GPIO_MODE_ANALOG, GPIO_PUPD_NONE, ADC_PIN);
}

void Adc_Init(void)
{
    Adc_Port_Init();

    rcu_periph_clock_enable(RCU_ADC0);
    adc_clock_config(ADC_ADCCK_PCLK2_DIV8);

    adc_deinit();

    adc_resolution_config(ADC_PERIPH, ADC_RESOLUTION_12B);
    adc_special_function_config(ADC_PERIPH, ADC_CONTINUOUS_MODE, ENABLE);
    adc_data_alignment_config(ADC_PERIPH, ADC_DATAALIGN_RIGHT);

    adc_channel_length_config(ADC_PERIPH, ADC_ROUTINE_CHANNEL, 1);
    adc_routine_channel_config(ADC_PERIPH, 0, ADC_CHANNEL, ADC_SAMPLETIME_56);

    adc_external_trigger_config(ADC_PERIPH, ADC_ROUTINE_CHANNEL, EXTERNAL_TRIGGER_DISABLE);

    adc_enable(ADC_PERIPH);
    delay_1ms(1);
    adc_calibration_enable(ADC_PERIPH);

    adc_software_trigger_enable(ADC_PERIPH, ADC_ROUTINE_CHANNEL);
}

uint16_t Adc_GetValue(void)
{
    return adc_routine_data_read(ADC_PERIPH);
}

float Adc_GetVoltage(void)
{
    uint16_t adc_value;

    adc_value = Adc_GetValue();

    return ((float)adc_value * ADC_REF_VOLTAGE) / ADC_MAX_VALUE;
}
```

---

## 🔍 `Adc_Init()` 每一行 GD 库函数到底干了什么

## 1. `rcu_periph_clock_enable(RCU_GPIOC);`

### 结论

打开 `GPIOC` 时钟。

### 为什么这样做

- `PC0` 属于 `GPIOC`
- 不开时钟，这个外设就像没上电

### 不这么做会怎样

- 后面的 `PC0` 配置不会真正生效

### 参数解释

| 参数 | 含义 |
|---|---|
| `RCU_GPIOC` | 选择打开 GPIOC 的时钟 |

---

## 2. `gpio_mode_set(ADC_PORT, GPIO_MODE_ANALOG, GPIO_PUPD_NONE, ADC_PIN);`

### 结论

把 `PC0` 设置为模拟输入。

### 为什么这样做

- ADC 采的是模拟电压
- 不能把这只脚还当普通数字 IO 用

### 不这么做会怎样

- 读数不稳
- 甚至根本不对

### 参数解释

| 参数 | 含义 |
|---|---|
| `ADC_PORT` | 端口，当前是 `GPIOC` |
| `GPIO_MODE_ANALOG` | 模拟模式 |
| `GPIO_PUPD_NONE` | 不上拉不下拉 |
| `ADC_PIN` | 具体引脚，当前是 `GPIO_PIN_0` |

---

## 3. `rcu_periph_clock_enable(RCU_ADC0);`

### 结论

打开 `ADC0` 外设时钟。

### 为什么这样做

- ADC0 本体要工作，必须有时钟

### 不这么做会怎样

- 后面的 ADC 配置都白写

---

## 4. `adc_clock_config(ADC_ADCCK_PCLK2_DIV8);`

### 结论

设置 ADC 时钟分频为 `PCLK2 / 8`

### 为什么这样做

- 求稳
- 官方例程同路线

### 参数解释

| 参数 | 含义 |
|---|---|
| `ADC_ADCCK_PCLK2_DIV8` | ADC 时钟 = PCLK2 除以 8 |

---

## 5. `adc_deinit();`

### 结论

把 ADC 恢复到默认状态。

### 为什么这样做

- 防止历史配置残留

### 不这么做会怎样

- 配置行为可能不完全可控

---

## 6. `adc_resolution_config(ADC_PERIPH, ADC_RESOLUTION_12B);`

### 结论

配置 ADC 为 12 位分辨率。

### 参数解释

| 参数 | 含义 |
|---|---|
| `ADC_PERIPH` | 当前使用的 ADC 外设，这里是 `ADC0` |
| `ADC_RESOLUTION_12B` | 分辨率为 12 位 |

### 对应当前项目

- 后面 `Adc_GetVoltage()` 换算公式默认就是按 12 位来的

---

## 7. `adc_special_function_config(ADC_PERIPH, ADC_CONTINUOUS_MODE, ENABLE);`

### 结论

开启连续转换模式。

### 为什么这样做

- 软件触发一次后，后续 ADC 自动持续采样
- 业务层拿最新值更方便

### 不这么做会怎样

- 每次读取前都得重新触发

### 参数解释

| 参数 | 含义 |
|---|---|
| `ADC_PERIPH` | 当前 ADC 外设 |
| `ADC_CONTINUOUS_MODE` | 连续转换功能 |
| `ENABLE` | 打开这个功能 |

---

## 8. `adc_data_alignment_config(ADC_PERIPH, ADC_DATAALIGN_RIGHT);`

### 结论

配置 ADC 数据右对齐。

### 对应当前项目

- 后面 `Adc_GetValue()` 读出来就可以直接当 `0~4095` 的正常数值使用

---

## 9. `adc_channel_length_config(ADC_PERIPH, ADC_ROUTINE_CHANNEL, 1);`

### 结论

配置规则组长度为 1。

### 参数解释

| 参数 | 含义 |
|---|---|
| `ADC_PERIPH` | 当前 ADC 外设 |
| `ADC_ROUTINE_CHANNEL` | 表示配置的是规则组 |
| `1` | 规则组里只有 1 个通道 |

---

## 10. `adc_routine_channel_config(ADC_PERIPH, 0, ADC_CHANNEL, ADC_SAMPLETIME_56);`

### 结论

配置规则组第 0 位采样 `ADC_CHANNEL_10`，采样时间为 56 周期。

### 参数解释

| 参数 | 含义 |
|---|---|
| `ADC_PERIPH` | 当前 ADC 外设 |
| `0` | 规则组中的序号 `rank0` |
| `ADC_CHANNEL` | 当前采的通道，这里是 `ADC_CHANNEL_10` |
| `ADC_SAMPLETIME_56` | 每次内部采样保持时间 56 周期 |

### 对应当前项目

```text
PC0 -> ADC_CHANNEL_10 -> 规则组 rank0
```

---

## 11. `adc_external_trigger_config(ADC_PERIPH, ADC_ROUTINE_CHANNEL, EXTERNAL_TRIGGER_DISABLE);`

### 结论

关闭外部触发。

### 为什么这样做

- 当前走的是“软件触发一次 + 连续转换”最简方案
- 没必要现在就引入定时器触发 ADC

### 不这么做会怎样

- 外部触发配置不当时，ADC 可能根本不会按预期启动

---

## 12. `adc_enable(ADC_PERIPH);`

### 结论

使能 ADC 外设。

### 为什么这样做

- 前面只是“配置”
- 这句才是“打开”

---

## 13. `delay_1ms(1);`

### 结论

让 ADC 上电后先稳定一下。

### 为什么这样做

- 后面要校准
- 稳一下更保险

---

## 14. `adc_calibration_enable(ADC_PERIPH);`

### 结论

执行 ADC 校准。

### 为什么这样做

- 提高测量可靠性

### 不这么做会怎样

- 可能还能用
- 但精度和稳定性更差

---

## 15. `adc_software_trigger_enable(ADC_PERIPH, ADC_ROUTINE_CHANNEL);`

### 结论

软件触发一次规则组转换。

### 为什么这样做

- 前面已经开了连续模式
- 这句相当于“打第一枪”

### 不这么做会怎样

- ADC 可能已经初始化好了，但并没有真正开始工作

---

## 🔢 `Adc_GetValue()` 和 `Adc_GetVoltage()` 到底干什么

## `Adc_GetValue()`

```c
uint16_t Adc_GetValue(void)
{
    return adc_routine_data_read(ADC_PERIPH);
}
```

### 结论

读取当前最新 ADC 原始值。

### 返回范围

```text
0 ~ 4095
```

### 对应当前项目

- 这是“板端电压的数字化结果”
- 还不是题目里的工程值

---

## `Adc_GetVoltage()`

```c
float Adc_GetVoltage(void)
{
    uint16_t adc_value;

    adc_value = Adc_GetValue();

    return ((float)adc_value * ADC_REF_VOLTAGE) / ADC_MAX_VALUE;
}
```

### 结论

把 ADC 原始值换算成实际电压值，单位是 `V`

### 换算公式

```text
电压 = ADC原始值 × 参考电压 / 最大码值
```

即：

```text
voltage = adc_value * 3.3 / 4095
```

### 为什么除以 4095，不是 4096

因为 12 位最大码值是：

```text
2^12 - 1 = 4095
```

---

## 🧪 如何临时验证 ADC 驱动写对了

```c
while(1)
{
    Usart0_Printf("adc = %u, volt = %.3fV\r\n",
                  (unsigned int)Adc_GetValue(),
                  Adc_GetVoltage());
    delay_1ms(500);
}
```

### 你应该看到

- 滑动变阻器不动时，数值基本稳定
- 转动时 `adc` 和 `volt` 同步变化
- `volt` 大致在 `0~3.3V`

---

## 🖨️ 这段串口打印里 `%u`、`%.3f` 到底什么意思

### 结论

这是 `printf` 风格格式化输出。

### 当前例子

```c
Usart0_Printf("adc = %u, volt = %.3fV\r\n",
              (unsigned int)Adc_GetValue(),
              Adc_GetVoltage());
```

### 对应解释

| 写法 | 含义 |
|---|---|
| `%u` | 按无符号十进制整数输出 |
| `%f` | 按浮点数输出 |
| `%.3f` | 浮点数保留 3 位小数 |
| `\r\n` | 串口换行 |

### 为什么这里 `adc` 用 `%u`

- `Adc_GetValue()` 返回 `uint16_t`
- 这是无符号整数

### 为什么这里 `volt` 用 `%.3f`

- 电压是浮点数
- 保留 3 位小数，观察更直观

### 常见格式化写法补充

| 写法 | 含义 | 例子 |
|---|---|---|
| `%d` | 有符号整数 | `-5` |
| `%u` | 无符号整数 | `25` |
| `%x` | 十六进制小写 | `1a3f` |
| `%X` | 十六进制大写 | `1A3F` |
| `%f` | 浮点数 | `3.140000` |
| `%.2f` | 小数点后保留 2 位 | `3.14` |
| `%02d` | 宽度 2，不够补 0 | `03` |
| `%04d` | 宽度 4，不够补 0 | `0025` |
| `%08X` | 8位十六进制，不够补0 | `0000ABCD` |
| `%s` | 字符串 | `"hello"` |
| `%c` | 单个字符 | `'A'` |

### 类型匹配提醒

<span style="color:red"><strong>格式符要和变量类型匹配。</strong></span>

例如：

- `uint16_t` 常配 `%u`
- `float` 常配 `%f`
- `uint32_t` 更稳妥时可写：

```c
uint32_t tick;
Usart0_Printf("%lu\r\n", (unsigned long)tick);
```

因为可变参数函数里会发生 **默认整型提升**，新手阶段适当强转更稳。

---

## 🪜 ADC 层和 Sample 层以后怎么衔接

### 结论

ADC 层只给 Sample 层提供“真实板端电压”。

### 后续正确关系

```text
Adc_GetValue()    -> 原始值 0~4095
Adc_GetVoltage()  -> 板端电压 0~3.3V
Sample.c          -> 工程值 = 板端电压 × ratio
```

### 正确伪代码

```c
void Sample_Main_Task(void)
{
    float adc_voltage;
    float sample_value;

    adc_voltage = Adc_GetVoltage();       // 板端电压
    sample_value = adc_voltage * ratio;   // 工程值

    if(sample_value > limit)
    {
        overlimit_flag = 1;
    }
    else
    {
        overlimit_flag = 0;
    }
}
```

---

## ⚠️ 常见坑总结

## 1. 把 `ADC分频` 和 `采样周期` 混为一谈

- 分频是 ADC 硬件内部速度
- 采样周期是业务层多久取一次值

## 2. 把 `板端电压` 和 `工程值` 混为一谈

- ADC 只能读板端真实电压
- 题目里的工程值还要乘 `ratio`

## 3. 直接在 `ADC.c` 里写 `ratio / limit`

<span style="color:red"><strong>这是分层错误。</strong></span>

- ADC 负责读电压
- Sample 负责业务判断

## 4. 忘记把 `PC0` 配成模拟输入

- ADC 读值会不稳或不对

## 5. 忘记开 `GPIOC` 或 `ADC0` 时钟

- 后面的配置都不会真正工作

## 6. 忘记首次软件触发

- ADC 初始化完了，但其实没开始转换

## 7. 把 `4096` 当最大值

正确是：

```text
最大码值 = 4095
```

## 8. 误以为左对齐和右对齐只是“随便选”

- 当前项目里，右对齐明显更省脑子

## 9. 用寄存器宏直接读值，但自己又没吃透

比如直接写：

```c
ADC_RDATA(ADC0)
```

当前阶段更建议：

```c
adc_routine_data_read(ADC0)
```

因为更清楚、更统一。

---

## ✅ 本阶段你真正要记住的 5 句话

1. ADC 的任务是把模拟电压变成数字值。
2. `PC0` 对应 `ADC_CHANNEL_10`。
3. 右对齐是为了让结果直接按 `0~4095` 用。
4. 规则组就是 ADC 平时正常工作的采样队列。
5. ADC 只负责采真实电压，`ratio/limit` 一定放在 `Sample.c`。

---

## 📍下一步建议

下一步就应该进入主线：

```text
Adc.c / Adc.h 写好
   ->
System_Init() 里调用 Adc_Init()
   ->
Sample.c 增加主任务 + LED1副任务 + LED2副任务
   ->
把 Adc_GetVoltage() 接进 Sample_Main_Task()
```

<span style="color:blue"><strong>到这里，你的 ADC 才算真正从“会抄例程”变成“会自己接项目”。</strong></span>

