# 🚀 USART0 DMA发送学习笔记：从“能用”到“看懂每一行”

> 适用对象：GD32 初学者、刚从 51/零散 STM32 标准库过渡过来的同学  
> 当前工程：`GD32F470 + USART0 + DMA异步发送`  
> 目标：把 `Usart0.c` 里 DMA 发送相关代码彻底看明白

---

## 先记住一句

- `DMA_CH7` 是 **DMA 的通道号**
- `DMA_SUBPERI4` 是 **这条通道要接到哪个外设请求源**
- 你这个芯片里 `USART0_TX` 就是挂在 `DMA1 + CH7 + SUBPERI4` 这一组上，填错一个都发不出去

---

## 🎯 先抓住这套发送链路到底在干嘛

### 人话版

平时你直接 `printf`，本质上是 CPU 一个字节一个字节往串口数据寄存器里塞。  
现在你用了 DMA，就相当于把“搬运工”这个活交给 DMA 了，<span style="color:#1565c0"><strong>CPU 只负责下命令</strong></span>，然后 DMA 自己去搬，搬完再通过中断回来通知你。

### 这套链路的真实顺序

```text
[Usart0_Printf格式化字符串]
          |
          v
[Usart0_DmaSendBuffer复制到 tx_dma_buf]
          |
          v
[配置DMA本次发送地址和长度]
          |
          v
[使能DMA通道]
          |
          v
[DMA把内存里的字节搬到 USART_DATA(USART0)]
          |
          v
[DMA搬完 -> 进入 DMA1_Channel7_IRQHandler]
          |
          v
[清标志 + 关通道 + tx_busy清零]
```

---

## 1. `Usart0_DmaTx_Init`

### 代码块

```c
static void Usart0_DmaTx_Init(void)   // DMA发送初始化函数，只在本文件内部使用
{
    dma_single_data_parameter_struct dma_init_struct;
    // 定义一个 DMA 配置结构体
    // 为什么要有它：GD 库很多初始化都靠“先填结构体，再统一初始化”
    // 不写会怎样：下面没法把一堆参数整体交给 DMA

    rcu_periph_clock_enable(USART0_TX_DMA_RCU);
    // 开 DMA1 时钟
    // 为什么：外设不打开时钟，后面对 DMA 的配置全无效
    // 不开会怎样：DMA寄存器不工作，发送一定失败

    dma_deinit(USART0_TX_DMA_PERIPH, USART0_TX_DMA_CHANNEL);
    // 先把 DMA1 的 CH7 复位
    // 为什么：防止上一次配置残留
    // 不复位会怎样：可能沿用脏参数，出现乱发、长度错、地址错

    dma_single_data_para_struct_init(&dma_init_struct);
    // 先把结构体填成库默认值
    // 为什么：防止你漏填字段
    // 不这样做会怎样：某些字段是随机值，后面很难查 bug

    dma_init_struct.periph_addr = (uint32_t)&USART_DATA(USART0);
    // 外设地址 = USART0 数据寄存器地址
    // 为什么：DMA搬运的终点就是串口发数据寄存器
    // 填错会怎样：数据搬到别的地方，串口当然发不出去

    dma_init_struct.periph_inc = DMA_PERIPH_INCREASE_DISABLE;
    // 外设地址不递增
    // 为什么：USART_DATA(USART0) 永远是同一个寄存器地址
    // 如果递增：DMA第二个字节开始就会写到错误地址，直接炸

    dma_init_struct.memory0_addr = (uint32_t)tx_dma_buf;
    // 内存起始地址 = 发送缓冲区首地址
    // 为什么：DMA要知道从哪块内存取数据
    // 填错会怎样：发出去的是垃圾数据，甚至访问非法地址

    dma_init_struct.memory_inc = DMA_MEMORY_INCREASE_ENABLE;
    // 内存地址递增
    // 为什么：第1字节、第2字节、第3字节要从 buf[0]、buf[1]、buf[2] 依次取
    // 不递增会怎样：会一直重复发第1个字节

    dma_init_struct.periph_memory_width = DMA_PERIPH_WIDTH_8BIT;
    // 搬运宽度 8 位
    // 为什么：串口按字节发送
    // 如果填16位/32位：搬运粒度错，数据内容和节奏都可能错

    dma_init_struct.circular_mode = DMA_CIRCULAR_MODE_DISABLE;
    // 关闭循环模式
    // 为什么：串口发送是“发一帧就停”，不是无限循环播放
    // 如果开循环：会一直重复发送同一块数据

    dma_init_struct.direction = DMA_MEMORY_TO_PERIPH;
    // 方向：内存 -> 外设
    // 为什么：这是发送，不是接收
    // 填反了会怎样：DMA方向错，根本不能正常发

    dma_init_struct.number = 0;
    // 初始化阶段先给0
    // 为什么：真正发多少字节，后面每次发送时再动态改
    // 这里先写0没问题，因为此时只是“搭骨架”

    dma_init_struct.priority = DMA_PRIORITY_ULTRA_HIGH;
    // DMA优先级设高一点
    // 为什么：串口发送更稳，减少被别的DMA抢太久
    // 不一定必须超高，但比赛里这样配比较省心

    dma_single_data_mode_init(USART0_TX_DMA_PERIPH, USART0_TX_DMA_CHANNEL, &dma_init_struct);
    // 把上面整套参数正式写进 DMA 通道
    // 为什么：前面只是填结构体，这句才是真正生效

    dma_channel_subperipheral_select(USART0_TX_DMA_PERIPH,
                                     USART0_TX_DMA_CHANNEL,
                                     USART0_TX_DMA_SUBPERI);
    // 给 CH7 选择子外设请求源 = SUBPERI4
    // 为什么：同一个 DMA 通道可能能服务多个外设，必须指明“这次是谁来申请搬运”
    // 不选或选错：USART0 发请求时，DMA根本不认它

    dma_interrupt_enable(USART0_TX_DMA_PERIPH, USART0_TX_DMA_CHANNEL, DMA_INT_FTF);
    // 打开发送完成中断
    // FTF = Full Transfer Finish，整包搬完触发
    // 为什么：发送完成后要靠中断把 tx_busy 清掉
    // 不开会怎样：软件会一直以为 DMA 忙，后面再也发不了

    nvic_irq_enable(DMA1_Channel7_IRQn, 2, 1);
    // 在 NVIC 里打开 DMA1 CH7 的中断通道
    // 为什么：只开 DMA 内部中断还不够，CPU 侧也得允许响应
    // 不开会怎样：DMA内部触发了，但CPU进不了中断函数

    usart_dma_transmit_config(USART0, USART_TRANSMIT_DMA_ENABLE);
    // 打开 USART0 的 DMA发送请求
    // 为什么：DMA 和 USART 必须两边握手
    // 只开DMA，不开这句：DMA通道准备好了，但串口不会主动向DMA要数据
}
```

### 中文注释

<span style="color:#1565c0"><strong>这个函数是“搭舞台”</strong></span>，不是立刻发送数据。  
它做的事只有一件：<span style="color:#d32f2f"><strong>把 DMA1 的 CH7 配成“专门替 USART0_TX 发送数据”的状态</strong></span>。

### 逻辑框图

```text
[开DMA时钟]
      |
      v
[复位CH7旧配置]
      |
      v
[填DMA结构体参数]
      |
      v
[写入CH7]
      |
      v
[选择USART0_TX对应的SUBPERI4]
      |
      v
[打开FTF完成中断]
      |
      v
[打开NVIC里的DMA1_Channel7]
      |
      v
[打开USART0的DMA发送请求]
      |
      v
[DMA发送通道准备完成]
```

---

## 2. `Usart0_DmaSendBuffer`

### 代码块

```c
static uint8_t Usart0_DmaSendBuffer(uint8_t *buf, uint16_t len)
{
    uint16_t i;
    // 循环变量，用来拷贝数据

    if(buf == NULL)
    {
        return 0;
    }
    // 防空指针
    // 为什么：没有有效地址就不能发
    // 不判断：可能直接访问非法内存

    if(len == 0)
    {
        return 0;
    }
    // 长度为0直接不发
    // 为什么：0字节发送没意义
    // 不判断：后面配置DMA长度为0，逻辑混乱

    if(len > 128)
    {
        return 0;
    }
    // 防止超出 tx_dma_buf[128]
    // 为什么：你的DMA发送缓冲区就128字节
    // 不判断：数组越界，内存被踩坏

    if(tx_busy == 1)
    {
        return 0;
    }
    // 如果上一包还没发完，就先拒绝本次发送
    // 为什么：当前版本还没有发送队列
    // 不判断：两次发送会抢同一个DMA和缓冲区，数据乱套

    for(i = 0; i < len; i++)
    {
        tx_dma_buf[i] = buf[i];
    }
    // 把上层传进来的数据复制到驱动内部静态缓冲区
    // 为什么：DMA是异步发送，函数返回后，原buf可能已经失效
    // 比如 temp_buf 是局部变量，函数一退出就不可靠了
    // 不拷贝：经常出现“偶尔能发、偶尔乱码”的阴间bug

    tx_busy = 1;
    tx_len = len;
    // 先把软件状态置忙，并记录本次长度
    // 为什么：告诉上层“这包正在发送”
    // 为什么要先置忙：防止刚准备发时又有别的任务插进来

    dma_channel_disable(USART0_TX_DMA_PERIPH, USART0_TX_DMA_CHANNEL);
    // 重配DMA前，先关通道
    // 为什么：很多DMA参数在使能状态下不适合直接改
    // 不先关：可能新旧配置混在一起，发送异常

    dma_interrupt_flag_clear(USART0_TX_DMA_PERIPH, USART0_TX_DMA_CHANNEL, DMA_INT_FLAG_FTF);
    // 清除上一次“发送完成”标志
    // 为什么：不清的话，可能刚开新发送就误判成已经完成
    // 这是很多人最爱漏的一句

    dma_memory_address_config(USART0_TX_DMA_PERIPH,
                              USART0_TX_DMA_CHANNEL,
                              DMA_MEMORY_0,
                              (uint32_t)tx_dma_buf);
    // 告诉DMA：这次从 tx_dma_buf 开始取数据
    // 为什么每次都配：因为每次发的数据起点、缓冲区都应该明确指定
    // 即使这里没变，重配一遍也最稳

    dma_transfer_number_config(USART0_TX_DMA_PERIPH,
                               USART0_TX_DMA_CHANNEL,
                               tx_len);
    // 告诉DMA：这次要搬多少个字节
    // 为什么：DMA不知道你这次发的是 5 字节还是 50 字节
    // 不改：可能沿用旧长度，出现少发/多发

    dma_channel_enable(USART0_TX_DMA_PERIPH, USART0_TX_DMA_CHANNEL);
    // 真正使能DMA通道，开始搬运
    // 这句之后，DMA才开始一边从内存读，一边往USART_DATA里写

    return 1;
    // 立刻返回成功
    // 为什么：这是异步发送，不堵塞主循环
}
```

### 中文注释

<span style="color:#1565c0"><strong>这个函数是“正式发货”</strong></span>。  
它不是靠 CPU 一字节一字节发送，而是把 <span style="color:#d32f2f"><strong>“发送地址 + 发送长度”</strong></span> 填给 DMA，然后让 DMA 自己干活。

### 逻辑框图

```text
[收到发送请求]
      |
      v
[判空/判0长度/判越界]
      |
      v
[检查tx_busy]
  | yes
  v
[返回失败]

  no
  |
  v
[把用户数据复制到 tx_dma_buf]
      |
      v
[tx_busy=1, tx_len=len]
      |
      v
[关闭DMA通道]
      |
      v
[清FTF旧标志]
      |
      v
[设置本次内存地址]
      |
      v
[设置本次发送长度]
      |
      v
[打开DMA通道]
      |
      v
[立即返回，后台发送]
```

---

## 3. `DMA1_Channel7_IRQHandler`

### 代码块

```c
void DMA1_Channel7_IRQHandler(void)
{
    // DMA1 通道7 的中断服务函数
    // 这个名字必须和启动文件 / 中断向量表对上

    if(dma_interrupt_flag_get(USART0_TX_DMA_PERIPH,
                              USART0_TX_DMA_CHANNEL,
                              DMA_INT_FLAG_FTF) != RESET)
    {
        // 判断是不是“整包发送完成”中断
        // 为什么要先判断：中断里先确认来源，养成好习惯
        // 不判断：以后你加别的DMA中断源时容易误处理

        dma_interrupt_flag_clear(USART0_TX_DMA_PERIPH,
                                 USART0_TX_DMA_CHANNEL,
                                 DMA_INT_FLAG_FTF);
        // 先清完成标志
        // 为什么：中断服务里第一时间清标志，防止重复进中断
        // 不清：可能反复进中断，程序表现异常

        dma_channel_disable(USART0_TX_DMA_PERIPH, USART0_TX_DMA_CHANNEL);
        // 发完后关掉通道
        // 为什么：下一次发送前要重新装填地址和长度
        // 不关：后面重配时不稳，容易出怪问题

        tx_busy = 0;
        // 告诉上层：DMA已经空闲，可以发下一包了
        // 这句非常关键
        // 不清零：系统会永远认为“还在忙”

        tx_len = 0;
        // 把本次长度清零
        // 主要是状态收尾，方便调试和保持状态干净
    }
}
```

### 中文注释

这个中断函数本质上就是一句话：  
<span style="color:#d32f2f"><strong>“DMA 干完了，回来收尾。”</strong></span>

### 逻辑框图

```text
[进入DMA1_CH7中断]
      |
      v
[判断FTF完成标志]
  | no
  v
[退出中断]

  yes
  |
  v
[清FTF标志]
      |
      v
[关闭DMA通道]
      |
      v
[tx_busy = 0]
      |
      v
[tx_len = 0]
      |
      v
[退出中断]
```

---

## 4. `Usart0_Printf`

### 代码块

```c
void Usart0_Printf(const char *fmt, ...)
{
    char temp_buf[128];
    // 临时格式化缓冲区
    // 为什么：printf风格先要把字符串拼好，才能交给DMA发

    va_list args;
    // 可变参数句柄
    // 为什么：printf("x=%d", a) 这种函数必须靠它取后面的参数

    int len;
    // 保存格式化后的字符串长度

    if(fmt == NULL)
    {
        return;
    }
    // 防空指针

    va_start(args, fmt);
    // 初始化可变参数读取
    // 必须和 va_end 配对使用

    len = vsnprintf(temp_buf, sizeof(temp_buf), fmt, args);
    // 按 printf 格式把最终字符串写到 temp_buf
    // 比如 fmt="temp=%d\r\n", 25
    // 最终 temp_buf 里就是 "temp=25\r\n"

    va_end(args);
    // 结束可变参数读取
    // 不写不规范，某些平台可能出问题

    if(len <= 0)
    {
        return;
    }
    // 格式化失败或结果为空，直接返回

    if(len >= sizeof(temp_buf))
    {
        len = sizeof(temp_buf) - 1;
    }
    // 防止返回长度超过缓冲区
    // 为什么：vsnprintf 可能告诉你“本来应该更长”
    // 但实际缓冲区只有 128，真正能发的只能是前 127 字节

    Usart0_DmaSendBuffer((uint8_t *)temp_buf, (uint16_t)len);
    // 把格式化好的字符串交给 DMA发送函数
    // 关键点：这里 temp_buf 是局部变量，本来函数退出就会失效
    // 但你在 DmaSendBuffer 里又复制进了 tx_dma_buf，所以是安全的
}
```

### 中文注释

`Usart0_Printf` 本身不是 DMA 外设配置函数，但它是你现在这套 <span style="color:#1565c0"><strong>“格式化字符串 -> DMA异步发送”</strong></span> 链路的入口函数。  
你平时上层任务里最常调用的，大概率就是它。

### 逻辑框图

```text
[输入fmt和可变参数]
      |
      v
[vsnprintf格式化到 temp_buf]
      |
      v
[判断长度是否合法]
      |
      v
[调用 Usart0_DmaSendBuffer]
      |
      v
[复制到 tx_dma_buf]
      |
      v
[DMA后台发送]
```

---

## 🔍 你现在最容易糊涂的两个点

### 1. 为什么必须“复制到 `tx_dma_buf`”，不能直接发 `temp_buf`

#### 结论

因为 `temp_buf` 是局部变量，函数一退出，它的内容后面就不一定还能保持原样。  
而 DMA 是异步发送，它不是你一调用就瞬间把所有字节发完。

#### 逻辑图

```text
[进入 Usart0_Printf]
      |
      v
[temp_buf 在栈里]
      |
      v
[调用 Usart0_DmaSendBuffer]
      |
      v
[如果直接让DMA指向 temp_buf]
      |
      v
[Usart0_Printf 退出]
      |
      v
[temp_buf 所在栈空间可能被别的函数覆盖]
      |
      v
[DMA 还没搬完 -> 乱码 / 乱值]
```

#### 一句话记忆

<span style="color:#d32f2f"><strong>DMA 异步发送时，数据源地址必须稳定。</strong></span>

---

### 2. 为什么 DMA 发送完成了，还不一定代表 USART 已经“真正发完”

#### 先说结论

DMA 的 “发送完成” 指的是：  
<span style="color:#1565c0"><strong>DMA 已经把最后一个字节写进 USART 数据寄存器了。</strong></span>

但 USART 的 “真正发完” 指的是：  
<span style="color:#d32f2f"><strong>最后一个字节已经从移位寄存器发到线上了。</strong></span>

这两个时刻 <span style="color:#d32f2f"><strong>不是同一个时刻</strong></span>。

#### 逻辑图

```text
DMA视角:
[内存字节] -> [USART_DATA] -> 完成

USART视角:
[USART_DATA] -> [移位寄存器] -> [TX引脚真正发出去] -> 完成
```

#### 什么时候这个区别要在意

- 普通串口打印日志：一般不用太纠结，DMA完成后大多已经够用
- 半双工通信 / RS485：要非常在意
- 发完立刻关串口 / 切换发送接收方向：要非常在意
- 发完最后一包就马上复位、休眠、断电：也要在意

#### 为什么

因为你如果只看到 DMA 完成，就立刻切方向或者关外设，  
可能会把 <span style="color:#d32f2f"><strong>最后 1 个字节的尾巴掐掉</strong></span>。

#### 工程提醒

以后如果你要做更严谨的发送完成判定，常见做法是：

1. DMA 完成中断里先记“DMA已搬完”
2. 再去看 USART 的 `TC` 标志
3. 只有 `TC=1`，才叫“线上真正发完”

---

## 🧠 DMA相关字段速记表

| 字段/函数 | 你可以把它理解成什么 | 填错会怎样 |
|---|---|---|
| `DMA_CH7` | DMA 的“工位号” | 找不到正确通道 |
| `DMA_SUBPERI4` | 这个工位当前服务的外设是谁 | USART0_TX 请求进不来 |
| `periph_addr` | 终点地址 | 搬错地方 |
| `memory0_addr` | 起点地址 | 发垃圾数据 |
| `periph_inc` | 终点地址是否递增 | 串口寄存器不能递增，填错直接乱 |
| `memory_inc` | 起点地址是否递增 | 不递增就一直发第1个字节 |
| `direction` | 数据搬运方向 | 发收颠倒，逻辑失效 |
| `number` | 本次要搬多少个数据单位 | 少发、多发、截断 |
| `DMA_INT_FTF` | 整包搬完中断 | 不开就没法在中断里收尾 |
| `tx_busy` | 软件层“门卫” | 不管它就容易重入乱发 |

---

## ❌ 这块最常见的坑

- 忘了开 `DMA` 时钟，结果所有配置都像没写一样
- 通道号对了，但 `SUBPERI` 选错了，USART0 还是发不出去
- 没开 `usart_dma_transmit_config(USART0, USART_TRANSMIT_DMA_ENABLE);`
- 发之前不先 `dma_channel_disable(...)`
- 发之前不清 `DMA_INT_FLAG_FTF`
- 长度超过 `tx_dma_buf`，把内存踩坏
- 直接拿局部变量地址给 DMA 发，导致偶发乱码
- `tx_busy` 一直不清，后面所有发送都失败
- 以为 DMA 完成就等于串口线上已经完全发完

---

## ✅ 你现在这套写法，核心优点是什么

- <span style="color:#1565c0"><strong>非阻塞</strong></span>：启动 DMA 后立刻返回，不堵塞主循环
- <span style="color:#1565c0"><strong>结构清楚</strong></span>：初始化、启动发送、发送完成中断，三段职责明确
- <span style="color:#1565c0"><strong>适合调度器架构</strong></span>：任务里判断 `tx_busy` 即可
- <span style="color:#1565c0"><strong>后续好扩展</strong></span>：后面很容易升级成发送队列

---

## 📌 最后总结原文保留

先记住一句：

- `DMA_CH7` 是 **DMA 的通道号**
- `DMA_SUBPERI4` 是 **这条通道要接到哪个外设请求源**
- 你这个芯片里 `USART0_TX` 就是挂在 `DMA1 + CH7 + SUBPERI4` 这一组上，填错一个都发不出去

---

### `Usart0_DmaTx_Init`

这个函数是“搭舞台”，不是立刻发送数据。  
它做的事只有一件：把 DMA1 的 CH7 配成“专门替 USART0_TX 发送数据”的状态。

```text
[开DMA时钟]
      |
      v
[复位CH7旧配置]
      |
      v
[填DMA结构体参数]
      |
      v
[写入CH7]
      |
      v
[选择USART0_TX对应的SUBPERI4]
      |
      v
[打开FTF完成中断]
      |
      v
[打开NVIC里的DMA1_Channel7]
      |
      v
[打开USART0的DMA发送请求]
      |
      v
[DMA发送通道准备完成]
```

---

### `Usart0_DmaSendBuffer`

这个函数是“正式发货”。  
它不是靠 CPU 一字节一字节发送，而是把 “发送地址 + 发送长度” 填给 DMA，然后让 DMA 自己干活。

```text
[收到发送请求]
      |
      v
[判空/判0长度/判越界]
      |
      v
[检查tx_busy]
  | yes
  v
[返回失败]

  no
  |
  v
[把用户数据复制到 tx_dma_buf]
      |
      v
[tx_busy=1, tx_len=len]
      |
      v
[关闭DMA通道]
      |
      v
[清FTF旧标志]
      |
      v
[设置本次内存地址]
      |
      v
[设置本次发送长度]
      |
      v
[打开DMA通道]
      |
      v
[立即返回，后台发送]
```

---

### `DMA1_Channel7_IRQHandler`

这个中断函数本质上就是一句话：  
“DMA 干完了，回来收尾。”

```text
[进入DMA1_CH7中断]
      |
      v
[判断FTF完成标志]
  | no
  v
[退出中断]

  yes
  |
  v
[清FTF标志]
      |
      v
[关闭DMA通道]
      |
      v
[tx_busy = 0]
      |
      v
[tx_len = 0]
      |
      v
[退出中断]
```

---

### `Usart0_Printf`

`Usart0_Printf` 本身不是 DMA 外设配置函数，但它是你现在这套 “格式化字符串 -> DMA异步发送” 链路的入口函数。  
你平时上层任务里最常调用的，大概率就是它。

```text
[输入fmt和可变参数]
      |
      v
[vsnprintf格式化到 temp_buf]
      |
      v
[判断长度是否合法]
      |
      v
[调用 Usart0_DmaSendBuffer]
      |
      v
[复制到 tx_dma_buf]
      |
      v
[DMA后台发送]
```

---

如果你愿意，下一步我可以继续按这个格式，专门给你拆两件最容易糊涂的东西：

1. `为什么必须“复制到 tx_dma_buf”，不能直接发 temp_buf`
2. `为什么 DMA 发送完成了，还要等 USART 真正发完，某些场景还要补看 TC 标志`

