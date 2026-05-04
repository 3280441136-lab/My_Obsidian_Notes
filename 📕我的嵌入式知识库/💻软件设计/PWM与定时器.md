---
version: V1.0
updated: 2026-05-04
author: RUI
tags: [软件]
---

# PWM 与定时器

## 目录

- [PWM 的本质原理](PWM与定时器.md#pwm-的本质原理)
- [STM32 的 TIM 定时器方案](PWM与定时器.md#stm32-的-tim-定时器方案)
- [ESP32 的 LEDC 方案](PWM与定时器.md#esp32-的-ledc-方案)
- [对应关系速查](PWM与定时器.md#对应关系速查)
- [占空比与分辨率](PWM与定时器.md#占空比与分辨率)
- [记忆口诀](PWM与定时器.md#记忆口诀)

---

## PWM 的本质原理

PWM（脉冲宽度调制）最底层就做一件事：

```text
计数器一直计数
比较器比较当前计数值和占空比值
根据比较结果输出高/低电平
```

人话：

```text
一个计数器不停地从 0 数到上限再回到 0
你设一个比较值
计数值 < 比较值 → 输出高
计数值 ≥ 比较值 → 输出低
这样就能控制"高电平占整个周期的比例"
```

---

## STM32 的 TIM 定时器方案

STM32 的 PWM 通常来自 TIM 定时器：

| 符号 | 含义 | 人话 |
|---|---|---|
| TIMx | 定时器 | 哪个定时器产生 PWM |
| TIMx_CH1 / CH2 | PWM 通道 | 这个定时器的第几个输出通道 |
| PSC | 预分频器 | 把定时器时钟降速 |
| ARR | 自动重装载值 | 周期上限，决定 PWM 频率 |
| CCR | 捕获/比较值 | 占空比，决定高电平有多宽 |

PWM 频率公式：

```text
PWM频率 = 定时器时钟 / ((PSC + 1) × (ARR + 1))
```

例如：定时器时钟 72MHz，PSC=71，ARR=999：

```text
PWM频率 = 72,000,000 / (72 × 1000) = 1000 Hz
```

---

## ESP32 的 LEDC 方案

ESP32 用 LEDC（LED PWM Controller）产生 PWM。

可以理解成：

```text
LEDC = 专门用于 PWM / LED 调光的外设
```

### 配置计时器

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

### 配置通道

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

### 设置占空比

```c
ledc_set_duty(LEDC_LOW_SPEED_MODE, LEDC_CHANNEL_0, 2048);
ledc_update_duty(LEDC_LOW_SPEED_MODE, LEDC_CHANNEL_0);
```

---

## 对应关系速查

| STM32 | ESP-IDF LEDC | 作用 |
|---|---|---|
| TIMx | LEDC_TIMER_x | PWM 时间基准（频率） |
| TIMx_CHx | LEDC_CHANNEL_x | PWM 输出通道 |
| ARR | duty_resolution 间接决定 | 周期被分成多少份 |
| CCR | duty | 高电平占多少份 |
| PSC | 驱动内部计算 | 时钟分频 |

关键区别：

```text
STM32：你手动算 PSC 和 ARR 来定频率
ESP-IDF：你直接写 freq_hz = 5000，驱动帮你算分频
```

---

## 占空比与分辨率

LEDC 的 `duty_resolution` 决定了占空比的精细程度：

| 分辨率 | 占空比范围 | 适用场景 |
|---|---|---|
| 8 位 | 0 ~ 255 | 简单开关控制 |
| 10 位 | 0 ~ 1023 | 一般调光 |
| 12 位 | 0 ~ 4095 | 精细调光 |
| 14 位 | 0 ~ 16383 | 高精度应用 |

```text
分辨率越高 → 每个周期能分的份数越多 → 调光越细腻
但分辨率越高 → 同样时钟下 PWM 频率越低
```

人话：**精度和速度要权衡。**

---

## 记忆口诀

```text
PWM 本质：计数器加比较器，数到阈值就翻转。
STM32：TIM 定时器 + PSC/ARR/CCR 三件套。
ESP32：LEDC 专用外设，直接写频率和占空比。
频率和精度互斥，不是越高越好。
```

---

## 相关笔记

- [[GPIO驱动配置]] — PWM 输出引脚也是 GPIO，需要先理解 GPIO 配置
- [[ESP-IDF/ESP-IDF组件管理器]] — LEDC 是 ESP-IDF 的内置组件
