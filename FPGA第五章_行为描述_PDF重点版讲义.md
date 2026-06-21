# FPGA 第五章：行为描述 PDF 重点版讲义

资料来源：

- `5 行为描述.pdf`，共 54 页，作为主线。
- `Verilog第五章.ppt`，共 69 页，用来辅助确认老师课件说法。

我在 PDF 和 PPT 文本里检索了「不讲」「不考」「建议了解」等标注，没有发现明确标注。为了不把范围带偏，本讲义仍然按 PDF 的结构组织；PPT 中 PDF 没展开的内容，只放在「了解」或「补充」位置。

这一章的核心不是「又学几个语法」，而是：

```text
用 always / initial / if / case / for / task / function 这些语句描述电路行为。
考试最爱问：这段代码是仿真用，还是能综合成硬件？
```

先把一个最重要的词说清楚：

```text
可综合：综合工具能把这段 Verilog 变成 FPGA 里的真实电路。
不可综合：仿真器能跑，但综合工具不能把它变成正常硬件，通常只用于 Testbench。
```

## 1. 本章知识地图

| 模块 | 你要掌握什么 | 题型倾向 |
|---|---|---|
| 行为级建模 | 行为描述关注「电路怎么表现」，不直接画门 | 选择、填空 |
| 过程块 | `initial` 和 `always` 的区别 | 选择、简答 |
| 语句块 | `begin...end` 顺序块、`fork...join` 并行块 | 选择、填空 |
| 时序控制 | `#`、`@`、`wait`、命名事件 | 选择、读代码 |
| 过程赋值 | `=` 和 `<=` 的区别，和 `assign` 的区别 | 必考 |
| 条件和分支 | `if...else`、`case`、锁存器陷阱 | 必考 |
| 循环语句 | `for/while/repeat/forever` 哪些可综合 | 高频 |
| 任务和函数 | `task` 和 `function` 的区别 | 简答高频 |

第五章可以按这条线学：

```text
过程块决定什么时候执行
语句块决定多条语句怎么组织
时序控制决定等多久、等什么事件
赋值语句决定信号怎么更新
行为语句决定按什么条件选择
任务/函数决定怎么复用一段代码
```

## 2. 行为级建模是什么

行为级建模就是：

```text
用类似程序语言的写法，描述电路输入变化后，输出或寄存器应该怎么变化。
```

但要注意，Verilog 不是 C 语言。你写的不是「CPU 一行一行执行的程序」，而是「综合工具要生成的硬件」。

例如：

```verilog
always @(posedge clk) begin
    q <= d;
end
```

人话解释：

```text
每次 clk 上升沿到来，把 d 的值送进 q。
```

综合后大概率是：

```text
一个 D 触发器。
```

再看组合逻辑：

```verilog
always @(*) begin
    if (sel)
        out = a;
    else
        out = b;
end
```

综合后大概率是：

```text
一个二选一多路选择器 MUX。
```

考试抓手：

```text
行为描述不是随便写程序。
能不能综合，要看它是否能对应到明确硬件。
```

## 3. 过程块：`initial` 和 `always`

过程块就是：

```text
一段由 initial 或 always 引导的行为描述代码。
```

它必须写在 `module ... endmodule` 里面。一个模块里可以有多个 `initial` 和多个 `always`，它们在仿真中是并发存在的。

### 3.1 `initial`：仿真一开始执行一次

基本格式：

```verilog
initial begin
    clk = 0;
    rst = 1;
    #10 rst = 0;
end
```

它的特点：

| 特点 | 说明 |
|---|---|
| 执行时机 | 仿真时间 \(t=0\) 开始 |
| 执行次数 | 只执行一次 |
| 常见用途 | 初始化、产生测试激励、结束仿真、打印观察信息 |
| 可综合性 | 本章按课件记：通常不可综合，只用于仿真/Testbench |

典型用途 1：初始化信号。

```verilog
initial begin
    clk = 0;
    data = 8'h00;
end
```

典型用途 2：生成仿真激励。

```verilog
initial begin
    reset = 1;
    #10 reset = 0;
    #20 start = 1;
    #100 $finish;
end
```

这里的 `#10` 是仿真延迟，意思是：

```text
仿真时间往后走 10 个时间单位，再执行后面的语句。
```

易错：

```text
多个 initial 不是一个接一个执行，而是从 t=0 同时开始，各跑各的。
如果多个 initial 改同一个信号，要小心先后和延迟，否则仿真结果容易乱。
```

### 3.2 `always`：反复执行

基本格式：

```verilog
always @(posedge clk) begin
    q <= d;
end
```

它的特点：

| 特点 | 说明 |
|---|---|
| 执行时机 | 由敏感列表或延迟控制决定 |
| 执行次数 | 反复执行，直到仿真结束 |
| 常见用途 | 组合逻辑、时序逻辑、状态机、测试时钟 |
| 可综合性 | 写成合法 RTL 时可综合 |

`always` 必须有某种「等待条件」。否则它会在同一仿真时间里无限循环，仿真器会卡住。

测试平台里常见写法：

```verilog
initial clk = 1'b0;
always #10 clk = ~clk;
```

这表示：

```text
每 10 个仿真时间单位翻转一次 clk，所以时钟周期是 20 个时间单位。
```

但这种 `#10` 方式主要用于 Testbench，不是正常 FPGA 设计代码。

实际 RTL 常用事件控制：

```verilog
always @(posedge clk) begin
    q <= d;
end
```

意思是：

```text
每次 clk 上升沿触发一次。
```

### 3.3 `initial` 和 `always` 对比

| 对比项 | `initial` | `always` |
|---|---|---|
| 执行次数 | 一次 | 反复 |
| 启动时间 | \(t=0\) | \(t=0\) 后等待触发条件 |
| 常见用途 | Testbench 初始化和激励 | RTL 组合/时序逻辑 |
| 可综合性 | 通常不可综合 | 取决于写法，常用于可综合代码 |
| 典型例子 | `#100 $finish;` | `always @(posedge clk)` |

简答题可以这样答：

```text
initial 块从仿真 0 时刻开始，只执行一次，主要用于测试平台中的初始化和激励，通常不可综合。
always 块会根据时序控制或事件控制反复执行，可用于组合逻辑和时序逻辑描述，是 RTL 设计的常用结构。
```

## 4. 语句块：`begin...end` 和 `fork...join`

语句块就是：

```text
把多条语句打包成一个整体。
```

这能解释你之前问的那个问题：为什么有些组合逻辑后面没有 `begin`？

答案是：

```text
如果只有一条语句，可以不写 begin...end。
如果有多条语句，必须用 begin...end 把它们括起来。
```

例如只有一条：

```verilog
always @(*)
    out = a & b;
```

多条就要写：

```verilog
always @(*) begin
    tmp = a & b;
    out = tmp | c;
end
```

### 4.1 顺序块 `begin...end`

顺序块格式：

```verilog
begin
    statement1;
    statement2;
end
```

人话：

```text
块内语句按书写顺序处理。
```

例子：

```verilog
initial begin
    a = 1'b0;
    b = 1'b1;
    c = {a, b};
end
```

虽然这三句都发生在 \(t=0\)，没有消耗仿真时间，但仿真器内部仍然按顺序处理：

```text
a 先变成 0
b 再变成 1
c 最后取 {a,b}，所以 c = 2'b01
```

带延迟时，延迟会累加：

```verilog
initial begin
    a = 1'b0;       // t = 0
    #5  b = 1'b1;   // t = 5
    #10 c = {a,b};  // t = 15
end
```

注意最后一句是 \(t=15\)，不是 \(t=10\)，因为 `#10` 是在前面已经走到 \(t=5\) 之后再等 10。

### 4.2 顺序块里的 `=` 和 `<=`

顺序块「按顺序执行」这句话要加一个限制：

```text
阻塞赋值 = 是立刻更新；
非阻塞赋值 <= 是先记账，当前时间步结束时一起更新。
```

阻塞赋值：

```verilog
always @(posedge clk) begin
    a = b;
    c = a + 1;
end
```

这里 `a = b` 立刻生效，所以 `c` 用的是新 `a`：

```text
c = b + 1
```

非阻塞赋值：

```verilog
always @(posedge clk) begin
    a <= b;
    c <= a + 1;
end
```

这里 `a <= b` 不立刻更新，所以 `c <= a + 1` 用的是旧 `a`：

```text
c = a_old + 1
```

这就是第五章最核心的坑之一。

### 4.3 并行块 `fork...join`

并行块格式：

```verilog
fork
    statement1;
    statement2;
join
```

人话：

```text
fork 里面的语句从同一时刻一起开始执行。
```

例子：

```verilog
initial fork
    #10 a = 1;
    #20 b = 0;
join
```

执行结果：

```text
t = 10 时，a = 1
t = 20 时，b = 0
```

注意：`fork...join` 里的延迟不是累加的，而是都从进入 `fork` 的时刻开始算。

对比：

| 项目 | `begin...end` | `fork...join` |
|---|---|---|
| 执行方式 | 顺序执行 | 并行执行 |
| 延迟计算 | 按语句顺序累加 | 从 fork 时刻各自开始算 |
| 常见用途 | RTL 逻辑、Testbench | Testbench 并发激励 |
| 可综合性 | 常用于可综合代码 | 本章按课件记：不可综合 |

### 4.4 命名块和 `disable`

命名块：

```verilog
begin : BLOCK_NAME
    // statements
end
```

`disable` 用来强制停止某个命名块：

```verilog
disable BLOCK_NAME;
```

人话：

```text
给一段 begin...end 起名字，然后中途让它停掉。
```

例子：

```verilog
initial begin : MAIN
    begin : LOOP
        if (stop)
            disable LOOP;
    end
end
```

考试记法：

```text
disable 不可综合，主要用于仿真流程控制。
命名块本身可写，但名字通常只对仿真调试和作用域有意义。
```

### 4.5 语句块局部变量

语句块里可以声明局部变量：

```verilog
initial begin : MAIN
    integer x;
    begin : INNER
        reg [3:0] y;
    end
end
```

要点：

| 要点 | 说明 |
|---|---|
| 声明位置 | `begin...end` 或 `fork...join` 内 |
| 作用域 | 只在当前块内有效 |
| 同名变量 | 不同块中同名变量互不影响 |
| 访问规则 | 内层能访问外层，外层不能访问内层 |
| 默认存储 | 课件强调：局部变量默认静态存储，下一次进入可能保留旧值 |

易错：

```text
不要以为块结束后，变量一定像 C 语言局部变量那样彻底消失。
课件强调 Verilog 块内局部变量默认静态存储，可能保留上次值。
```

## 5. 时序控制：什么时候执行

时序控制负责回答：

```text
这条语句什么时候执行？
```

本章常见四类：

| 写法 | 名称 | 用途 | 可综合性 |
|---|---|---|---|
| `#10` | 延迟控制 | 仿真延迟 | 不可综合 |
| `@(posedge clk)` | 边沿事件控制 | 时序逻辑 | 可综合 |
| `@(*)` | 电平/组合敏感 | 组合逻辑 | 可综合 |
| `wait(condition)` | 等待条件 | 仿真流程 | 不可综合 |
| `event`、`->` | 命名事件 | 进程同步 | 不可综合 |

### 5.1 `#` 延迟控制

例子：

```verilog
initial begin
    data = 8'h00;
    #10 data = 8'hFF;
end
```

意思：

```text
t = 0 时 data = 8'h00
t = 10 时 data = 8'hFF
```

`#` 延迟主要是给仿真器看的，不能理解成「我想让 FPGA 真正等 10ns 再执行这句」。

考试特别容易考下面两个写法：

```verilog
#10 reg_a = reg_b;
```

含义：

```text
先等 10 个时间单位，到时候再读取 reg_b，并赋给 reg_a。
```

另一个：

```verilog
reg_a = #10 reg_b;
```

含义：

```text
现在立刻读取 reg_b 的值，等 10 个时间单位后，把刚才读到的值赋给 reg_a。
```

区别在于：

| 写法 | 什么时候读右边 |
|---|---|
| `#10 a = b;` | 10 个时间单位之后读 `b` |
| `a = #10 b;` | 现在读 `b`，10 个时间单位之后赋给 `a` |

### 5.2 `@` 事件控制

边沿触发：

```verilog
always @(posedge clk) begin
    q <= d;
end
```

意思：

```text
clk 从 0 变 1 的瞬间触发。
```

下降沿：

```verilog
always @(negedge rst_n) begin
    q <= 1'b0;
end
```

意思：

```text
rst_n 从 1 变 0 的瞬间触发。
```

组合逻辑敏感列表：

```verilog
always @(a or b or sel) begin
    out = sel ? a : b;
end
```

也可以写成：

```verilog
always @(*) begin
    out = sel ? a : b;
end
```

推荐记：

```text
组合逻辑优先用 always @(*)，不容易漏敏感信号。
时序逻辑用 always @(posedge clk) 或带复位的边沿触发。
```

异步复位常见模板：

```verilog
always @(posedge clk or posedge rst) begin
    if (rst)
        q <= 1'b0;
    else
        q <= d;
end
```

人话：

```text
只要 rst 上升沿来了，q 立刻清零；
否则每次 clk 上升沿，把 d 存进 q。
```

### 5.3 `wait`

例子：

```verilog
initial begin
    wait (enable == 1);
    data = 8'hAA;
end
```

意思：

```text
一直等到 enable 为 1，再往下执行。
```

考试记：

```text
wait 是仿真控制语句，不可综合。
```

### 5.4 命名事件 `event`

例子：

```verilog
event data_ready;

initial begin
    #10 -> data_ready;
end

initial begin
    @(data_ready);
    $display("Data ready!");
end
```

拆开：

```text
event data_ready;  声明一个事件
-> data_ready;     触发这个事件
@(data_ready);     等待这个事件发生
```

考试记：

```text
命名事件用于仿真中多个过程之间同步，不可综合。
```

## 6. 赋值语句：`assign`、`=`、`<=`

这一节很重要。先别背定义，先看三种赋值的边界：

| 写法 | 名称 | 写在哪里 | 左边通常是什么 | 特点 |
|---|---|---|---|---|
| `assign y = a & b;` | 连续赋值 | `always/initial` 外面 | `wire` | 右边一变，左边跟着变 |
| `y = a & b;` | 阻塞赋值 | `always/initial` 里面 | `reg` | 立刻更新，下一句才能执行 |
| `q <= d;` | 非阻塞赋值 | `always/initial` 里面 | `reg` | 先计算，当前时间步末尾统一更新 |

### 6.1 连续赋值 `assign`

例子：

```verilog
wire y;
assign y = a & b;
```

人话：

```text
y 永远由 a & b 驱动。
a 或 b 一变，y 就跟着重新计算。
```

适合写组合逻辑。

注意：

```text
assign 左边一般是 wire。
assign 不写在 always 里面。
```

### 6.2 过程赋值

过程赋值写在 `initial` 或 `always` 里面：

```verilog
always @(*) begin
    out = a & b;
end
```

或者：

```verilog
always @(posedge clk) begin
    q <= d;
end
```

传统 Verilog 中，过程赋值左边要是 `reg` 类型。

这不代表它物理上一定是寄存器。你之前问过这个点，继续记这句：

```text
reg 是 Verilog 语法里的「过程赋值变量」，不等于物理寄存器。
最终是组合逻辑还是触发器，要看 always 怎么写。
```

例如：

```verilog
always @(*) begin
    out = a & b;
end
```

`out` 要声明成 `reg`，但综合出来是组合逻辑。

```verilog
always @(posedge clk) begin
    q <= d;
end
```

`q` 声明成 `reg`，综合出来才是触发器。

### 6.3 阻塞赋值 `=`

例子：

```verilog
always @(posedge clk) begin
    b = a;
    c = b;
end
```

执行效果：

```text
b 立刻变成 a
c 再立刻变成新的 b
所以 c 和 b 一样，也等于 a
```

可以理解为：

```text
这句没完成，下一句不能开始，所以叫阻塞。
```

常用建议：

```text
组合逻辑用阻塞赋值 =
```

例如：

```verilog
always @(*) begin
    tmp = a + b;
    out = tmp + c;
end
```

### 6.4 非阻塞赋值 `<=`

例子：

```verilog
always @(posedge clk) begin
    b <= a;
    c <= b;
end
```

执行效果：

```text
当前时钟沿先读取旧的 a、旧的 b；
当前时间步结束时，b 更新为旧 a，c 更新为旧 b。
```

所以 `c` 比 `b` 慢一个时钟周期。

这其实就是两级寄存器：

```verilog
always @(posedge clk) begin
    Q1 <= in;
    Q2 <= Q1;
end
```

综合结果：

```text
Q1 是第一级触发器，Q2 是第二级触发器。
输入 in 先进入 Q1，下一个时钟周期再进入 Q2。
```

常用建议：

```text
时序逻辑用非阻塞赋值 <=
```

### 6.5 `=` 和 `<=` 一张表

| 对比项 | 阻塞赋值 `=` | 非阻塞赋值 `<=` |
|---|---|---|
| 更新时机 | 立刻更新 | 当前时间步末尾更新 |
| 块内多条语句 | 前一句影响后一句 | 同时根据旧值计算 |
| 常用场景 | 组合逻辑 | 时序逻辑 |
| 典型效果 | 像临时计算 | 像一排触发器同时采样 |
| 高频陷阱 | 时序逻辑乱用可能导致结果和预期不同 | 组合逻辑乱用可能造成读代码困难 |

考试简答模板：

```text
阻塞赋值用 =，赋值语句执行完左值立即更新，后续语句会看到新值。
非阻塞赋值用 <=，右值在触发时刻计算，左值在当前时间步结束时统一更新，常用于描述同步时序逻辑。
```

### 6.6 过程连续赋值：了解，不推荐

PPT 里有 `assign/deassign`、`force/release`，PDF 开头也列出了「过程连续赋值语句」。这块不建议当常规 RTL 写法，只需要知道考试表述。

普通连续赋值：

```verilog
assign y = a & b;
```

它写在过程块外面，左边通常是 `wire`。

过程连续赋值：

```verilog
always @(clear or preset) begin
    if (!clear)
        assign q = 0;
    else if (!preset)
        assign q = 1;
    else
        deassign q;
end
```

它写在过程块里面，用来临时持续驱动某个变量。

按 PPT 记几个点：

| 语句 | 作用 | 考试记法 |
|---|---|---|
| `assign/deassign` | 对寄存器变量进行过程连续赋值/撤销 | 只能用于寄存器型变量或寄存器拼接，不用于线网 |
| `force/release` | 强制驱动/释放信号 | 可作用于寄存器和线网 |
| `force` 优先级 | 强于普通赋值和 `assign` | release 后回到原驱动 |

易错：

```text
过程连续赋值不是普通 assign。
普通 assign 在 always 外，主要驱动 wire。
过程 assign 在 always/initial 内，是特殊语法，不推荐用于正常 RTL。
```

## 7. 条件语句 `if...else`

条件语句格式：

```verilog
if (condition)
    statement1;
else
    statement2;
```

多分支：

```verilog
if (a > b)
    out = in1;
else if (a > c)
    out = in2;
else
    out = in3;
```

### 7.1 组合逻辑中的 `if...else`

例子：

```verilog
always @(*) begin
    if (sel)
        out = a;
    else
        out = b;
end
```

综合结果：

```text
一个二选一 MUX。
```

也就是：

```text
sel = 1 选 a
sel = 0 选 b
```

### 7.2 不完整条件会生成锁存器

看这个：

```verilog
always @(*) begin
    if (en)
        out = a;
end
```

问题在于：

```text
当 en = 0 时，代码没有说 out 应该等于什么。
```

那综合工具只能理解为：

```text
out 保持上一次的值。
```

要保持值，就需要存储结构，所以会生成透明锁存器。

这就是考试高频陷阱：

```text
组合逻辑 always @(*) 中，如果某些分支没有给输出赋值，容易综合出锁存器。
```

推荐写法 1：补全 `else`。

```verilog
always @(*) begin
    if (en)
        out = a;
    else
        out = 1'b0;
end
```

推荐写法 2：先给默认值。

```verilog
always @(*) begin
    out = 1'b0;
    if (en)
        out = a;
end
```

### 7.3 组合反馈不要这样写

错误倾向：

```verilog
always @(*) begin
    if (en)
        out = a;
    else
        out = out;
end
```

人话：

```text
en 为 0 时，让 out 等于它自己。
```

这不是干净的组合逻辑，而是在组合逻辑里写了「保持」。保持就意味着存储或反馈，容易形成锁存器/反馈环路。

如果你真的想存住值，应明确写时序逻辑：

```verilog
always @(posedge clk) begin
    if (en)
        out <= a;
end
```

综合结果：

```text
D 触发器 + 使能逻辑。
```

### 7.4 `if` 有优先级

`if...else if...else` 是按书写顺序判断的。

```verilog
if (a)
    y = x1;
else if (b)
    y = x2;
else
    y = x3;
```

如果 `a=1` 且 `b=1`，会先选 `x1`，不会再管 `b`。

考试记：

```text
if-else 是顺序判断，有优先级。
case 通常用于互斥多路选择，一般理解为并行判断。
```

## 8. 多路分支 `case`

基本格式：

```verilog
case (sel)
    2'b00: out = a;
    2'b01: out = b;
    2'b10: out = c;
    default: out = d;
endcase
```

它适合写多路选择器。

例子：4 选 1 MUX。

```verilog
module mux4_1 (
    output reg out,
    input  wire [3:0] in,
    input  wire [1:0] sel
);
    always @(*) begin
        case (sel)
            2'd0: out = in[0];
            2'd1: out = in[1];
            2'd2: out = in[2];
            2'd3: out = in[3];
            default: out = in[0];
        endcase
    end
endmodule
```

### 8.1 `case` 必须注意 `default`

如果组合逻辑里 `case` 没覆盖全部情况，又没有 `default`：

```verilog
always @(*) begin
    case (sel)
        2'b00: q = a;
        2'b11: q = b;
    endcase
end
```

当 `sel=2'b01` 或 `sel=2'b10` 时，`q` 没有赋值。

综合工具会认为：

```text
q 要保持上一次的值。
```

于是生成锁存器。

正确写法：

```verilog
always @(*) begin
    case (sel)
        2'b00: q = a;
        2'b11: q = b;
        default: q = 1'b0;
    endcase
end
```

考试记：

```text
组合逻辑 case 最好写 default，避免生成不期望的锁存器。
```

### 8.2 `case`、`casez`、`casex`

PDF 给了三种：

| 语句 | 匹配规则 |
|---|---|
| `case` | 严格匹配，区分 `0`、`1`、`x`、`z` |
| `casez` | 把 `z` 或 `?` 当作无关位 |
| `casex` | 把 `x`、`z` 或 `?` 当作无关位 |

例如 `casez`：

```verilog
casez (sel)
    4'b1???: out = a;
    4'b01??: out = b;
    default: out = c;
endcase
```

人话：

```text
? 位置不关心，0 或 1 都可以。
```

但 PPT 明确写了：

```text
注意：casez 和 casex 不能综合。
```

所以考试按本课件记：

```text
正常可综合设计优先使用 case + default。
casez/casex 知道匹配规则即可，不作为可综合重点。
```

### 8.3 `if` 和 `case` 对比

| 对比项 | `if...else` | `case` |
|---|---|---|
| 判断方式 | 按顺序判断 | 多分支选择 |
| 是否有优先级 | 有，前面的条件优先 | 一般用于互斥选择，课件说分支无优先级 |
| 常见硬件 | 优先选择逻辑或 MUX | MUX |
| 易错点 | 分支不全会有锁存器 | 缺 `default` 会有锁存器 |

简答题可以这样答：

```text
if 语句按书写顺序逐个判断，因此天然带优先级；case 语句根据表达式的取值选择对应分支，常用于多路选择。组合逻辑中二者都要保证所有输出在所有情况下都有确定赋值，否则可能综合出锁存器。
```

## 9. 循环语句

Verilog 有四种常见循环：

```text
for、while、repeat、forever
```

这块考试最喜欢问：

```text
哪些可综合？
```

### 9.1 `for`

例子：

```verilog
integer i;
always @(*) begin
    for (i = 0; i < 4; i = i + 1) begin
        F[i] = A[i] & B[3-i];
    end
end
```

人话：

```text
写起来像循环，但综合时不是一个门运行 4 次。
综合工具会把它展开成 4 份硬件。
```

也就是说：

```text
for 在可综合代码里通常表示「重复硬件结构」。
```

可综合条件：

```text
循环次数必须在编译时确定。
```

比如：

```verilog
for (i = 0; i < 8; i = i + 1)
```

这里 `8` 是固定常量，容易综合。

如果循环次数依赖运行时变量，硬件就不知道要展开多少份，通常不可综合。

### 9.2 `while`

例子：

```verilog
while (count < 10) begin
    count = count + 1;
end
```

课件结论：

```text
while 通常用于仿真，不可综合。
```

原因：

```text
while 的循环次数由运行时条件决定，综合工具很难把它展开成固定硬件。
```

### 9.3 `repeat`

例子：

```verilog
repeat (4) begin
    data = data << 1;
    #10;
end
```

课件结论：

```text
repeat 通常不可综合，主要用于仿真。
```

尤其带 `#10` 时，明显是仿真延迟。

### 9.4 `forever`

例子：

```verilog
initial begin
    clk = 0;
    forever begin
        #10 clk = ~clk;
    end
end
```

用途：

```text
Testbench 里生成时钟。
```

课件结论：

```text
forever 不可综合。
```

而且 `forever` 必须配合 `#` 或 `@` 这种等待条件，否则仿真器会卡在同一时间点无限循环。

### 9.5 循环可综合性总表

| 循环 | 是否可综合 | 记忆点 |
|---|---|---|
| `for` | 可综合，但循环次数要固定 | 综合时展开为多份硬件 |
| `while` | 不可综合 | 运行时条件不固定 |
| `repeat` | 通常不可综合 | 多用于 Testbench |
| `forever` | 不可综合 | 常用于生成仿真时钟 |

简答题模板：

```text
for 循环在循环边界固定、循环次数编译时可确定时可以综合，综合工具会把循环展开成并行硬件结构。while、repeat、forever 多用于仿真，其中 forever 常用于 Testbench 时钟生成，通常不可综合。
```

## 10. 任务 `task` 和函数 `function`

任务和函数都是：

```text
把一段重复使用的代码封装起来。
```

但它们不是一回事。

### 10.1 任务 `task`

格式：

```verilog
task task_name;
    input  [7:0] in_data;
    output [7:0] out_data;
    begin
        #5;
        out_data = {in_data[3:0], in_data[7:4]};
    end
endtask
```

调用：

```verilog
task_name(data_in, data_out);
```

特点：

| 特点 | 说明 |
|---|---|
| 返回值 | 没有函数式返回值 |
| 输出结果 | 通过 `output` 或 `inout` 参数传出 |
| 参数方向 | 可有 `input`、`output`、`inout` |
| 时间控制 | 可以包含 `#`、`@`、`wait` |
| 调用方式 | 作为一条独立语句调用 |
| 可综合性 | PDF 表格按课件记：不可综合，用于仿真行为建模 |

任务适合：

```text
多步操作、测试激励、等待若干时钟、打印或文件操作等。
```

### 10.2 函数 `function`

格式：

```verilog
function [7:0] swap_nibble;
    input [7:0] raw_data;
    begin
        swap_nibble = {raw_data[3:0], raw_data[7:4]};
    end
endfunction
```

调用：

```verilog
assign out = swap_nibble(in);
```

特点：

| 特点 | 说明 |
|---|---|
| 返回值 | 有一个返回值 |
| 返回方式 | 给函数名赋值，如 `swap_nibble = ...` |
| 参数方向 | 只允许 `input` |
| 时间控制 | 不能包含 `#`、`@`、`wait` |
| 调用方式 | 可在表达式中调用 |
| 仿真时间 | 零时间完成 |
| 可综合性 | PDF 表格按课件记：可综合 |

PDF 里的 `log2` 例子：

```verilog
function integer log2;
    input [31:0] value;
    begin
        log2 = 0;
        while (value > 1) begin
            value = value >> 1;
            log2 = log2 + 1;
        end
    end
endfunction
```

如果调用：

```verilog
integer width;
width = log2(256);
```

因为：

$$
256 = 2^8
$$

所以返回值是：

$$
8
$$

这里的意思是：把 `256` 不断右移，相当于不断除以 \(2\)，直到变成 \(1\)，一共除 \(8\) 次。

### 10.3 `task` 和 `function` 对比

| 对比项 | `function` | `task` |
|---|---|---|
| 返回值 | 有一个返回值 | 无直接返回值 |
| 输出多个结果 | 不适合 | 可通过多个 `output/inout` |
| 时间控制 | 不能有 `#`、`@`、`wait` | 可以有 |
| 调用位置 | 可放在表达式中 | 必须作为独立语句 |
| 参数方向 | 只允许 `input` | 可有 `input/output/inout` |
| 调用其他子程序 | 可调用函数，不能启动任务 | 可启动任务或函数 |
| 仿真时间 | 零时间 | 可以消耗仿真时间 |
| 可综合性 | 课件表格：可综合 | 课件表格：不可综合 |

简答题模板：

```text
函数 function 有一个返回值，只能有 input 参数，不能包含时间控制语句，可以在表达式中调用，仿真时间为零。任务 task 没有函数式返回值，但可以通过 output 或 inout 返回多个结果，可以包含延迟、事件等时间控制，调用时必须作为独立语句。
```

### 10.4 `automatic`：了解

PPT 提到自动任务：

```verilog
task automatic bitwise_xor;
```

人话：

```text
普通 task/function 里的局部变量默认可能是静态共享的。
automatic 表示每次调用都分配独立空间，适合并发调用，避免互相影响。
```

考试如果问：

```text
automatic 用于让任务/函数具备动态存储特性，每次调用有独立局部变量。
```

## 11. 第五章最容易混的几组概念

### 11.1 `assign`、`=`、`<=`

| 写法 | 一句话 |
|---|---|
| `assign` | 持续驱动 wire，写在过程块外 |
| `=` | 过程块内立刻赋值，组合逻辑常用 |
| `<=` | 过程块内延后统一更新，时序逻辑常用 |

### 11.2 `begin...end` 和 `fork...join`

| 写法 | 一句话 |
|---|---|
| `begin...end` | 顺序块，多条语句按顺序组织 |
| `fork...join` | 并行块，多条语句同时启动，常用于仿真 |

### 11.3 `initial` 和 `always`

| 写法 | 一句话 |
|---|---|
| `initial` | 仿真一开始执行一次 |
| `always` | 满足触发条件就反复执行 |

### 11.4 `if` 和 `case`

| 写法 | 一句话 |
|---|---|
| `if` | 按顺序判断，有优先级 |
| `case` | 多路分支选择，组合逻辑要写 `default` |

### 11.5 仿真语句和可综合语句

| 常见语句 | 考试判断 |
|---|---|
| `initial` | 通常不可综合 |
| `#10` | 不可综合 |
| `wait` | 不可综合 |
| `event`、`->` | 不可综合 |
| `fork...join` | 不可综合 |
| `forever` | 不可综合 |
| `while` | 不可综合 |
| `repeat` | 通常不可综合 |
| 固定次数 `for` | 可综合 |
| `always @(*)` | 可综合组合逻辑 |
| `always @(posedge clk)` | 可综合时序逻辑 |
| `function` | 课件表格：可综合 |
| `task` | 课件表格：不可综合 |

## 12. 读代码题重点模板

### 12.1 两级寄存器

```verilog
always @(posedge clk) begin
    q1 <= d;
    q2 <= q1;
end
```

结论：

```text
q1 在当前时钟沿采样 d；
q2 在当前时钟沿采样旧 q1；
所以 q2 比 q1 晚一个时钟周期。
```

### 12.2 阻塞赋值导致同拍传递

```verilog
always @(posedge clk) begin
    q1 = d;
    q2 = q1;
end
```

结论：

```text
q1 立刻等于 d；
q2 又立刻等于新的 q1；
所以 q2 也等于 d。
```

考试如果问「为什么时序逻辑建议用非阻塞赋值」：

```text
因为真实同步电路中多个触发器在同一时钟沿同时采样旧值，非阻塞赋值更符合这种行为。
```

### 12.3 组合逻辑漏赋值

```verilog
always @(*) begin
    if (en)
        y = a;
end
```

结论：

```text
en = 0 时 y 没有赋值，所以 y 要保持旧值，综合出锁存器。
```

### 12.4 `case` 缺 `default`

```verilog
always @(*) begin
    case (sel)
        2'b00: y = a;
        2'b01: y = b;
    endcase
end
```

结论：

```text
sel = 2'b10 或 2'b11 时 y 没有赋值，可能综合出锁存器。
```

## 13. 填空/选择速记

1. `initial` 在仿真 \(t=0\) 开始执行，执行一次。
2. `always` 会反复执行，必须有时序控制或事件控制。
3. `begin...end` 是顺序块，`fork...join` 是并行块。
4. `fork...join` 中各语句延迟从进入 `fork` 的时刻开始算，不累加。
5. `#` 延迟控制通常不可综合。
6. `@(posedge clk)` 表示时钟上升沿触发。
7. `@(*)` 表示对后面语句块中相关输入信号敏感，常用于组合逻辑。
8. `assign` 连续赋值通常给 `wire` 赋值。
9. 过程赋值写在 `always/initial` 内，传统 Verilog 左边通常是 `reg`。
10. 阻塞赋值 `=` 立刻更新，非阻塞赋值 `<=` 当前时间步末尾更新。
11. 组合逻辑常用阻塞赋值 `=`。
12. 时序逻辑常用非阻塞赋值 `<=`。
13. 组合逻辑中 `if` 没有覆盖所有情况，可能生成锁存器。
14. 组合逻辑中 `case` 没有 `default`，可能生成锁存器。
15. `if...else` 有优先级，`case` 通常用于多路分支选择。
16. `for` 循环在次数固定时可综合，会展开成并行硬件。
17. `while`、`repeat`、`forever` 通常不可综合。
18. `forever` 常用于 Testbench 生成时钟。
19. `task` 可以有时间控制，可以通过 `output/inout` 返回多个结果。
20. `function` 不能有时间控制，可在表达式中调用，有一个返回值。

## 14. 简答题背诵版

### 14.1 简述 `initial` 和 `always` 的区别

```text
initial 块从仿真 0 时刻开始，只执行一次，常用于测试平台中的初始化、激励产生和仿真结束控制，通常不可综合。
always 块会根据延迟控制或事件控制反复执行，常用于描述组合逻辑和时序逻辑，写成合法 RTL 时可以综合成实际硬件。
```

### 14.2 简述阻塞赋值和非阻塞赋值的区别

```text
阻塞赋值使用 =，语句执行时左值立即更新，后一条语句会看到更新后的值，因此常用于组合逻辑。
非阻塞赋值使用 <=，右值在触发时刻计算，左值在当前时间步末尾统一更新，更符合多个触发器在同一时钟沿同时采样的行为，因此常用于时序逻辑。
```

### 14.3 为什么组合逻辑中条件不完整会生成锁存器

```text
组合逻辑要求任意输入情况下输出都有确定值。如果 if 或 case 没有覆盖所有情况，某些情况下输出没有被赋值，综合工具只能让输出保持上一次的值。保持旧值需要存储能力，因此会综合出透明锁存器。
```

### 14.4 简述 `task` 和 `function` 的区别

```text
function 有一个返回值，只允许 input 参数，不能包含 #、@、wait 等时间控制语句，可以在表达式中调用，仿真时间为零。task 没有直接返回值，但可以通过 output 或 inout 参数返回多个结果，可以包含时间控制语句，调用时必须作为独立语句。
```

### 14.5 简述 Verilog 中循环语句的可综合性

```text
for 循环在循环次数编译时确定时可以综合，综合工具会把循环展开成重复的并行硬件结构。while、repeat、forever 多用于仿真，通常不可综合，其中 forever 常用于 Testbench 生成时钟。
```

## 15. 小练习

### 题 1

下面代码综合成什么？

```verilog
always @(*) begin
    if (sel)
        y = a;
    else
        y = b;
end
```

答案：

```text
二选一多路选择器 MUX。
```

### 题 2

下面代码有什么问题？

```verilog
always @(*) begin
    if (en)
        y = a;
end
```

答案：

```text
en = 0 时 y 没有赋值，综合工具会让 y 保持旧值，可能生成锁存器。
```

### 题 3

下面两段代码中，`c` 的值有什么不同？

```verilog
always @(posedge clk) begin
    b = a;
    c = b;
end
```

```verilog
always @(posedge clk) begin
    b <= a;
    c <= b;
end
```

答案：

```text
第一段中 b 立刻等于 a，c 又立刻等于新的 b，所以 c 等于 a。
第二段中 b 和 c 在时间步末尾同时更新，c 取的是旧 b，所以 c 比 b 晚一个时钟周期。
```

### 题 4

下面哪个通常可综合？

```verilog
for (i = 0; i < 8; i = i + 1)
    y[i] = a[i] & b[i];
```

```verilog
forever #10 clk = ~clk;
```

答案：

```text
第一个 for 循环通常可综合，因为循环次数固定，会展开成 8 份硬件。
第二个 forever + #10 是 Testbench 时钟生成，通常不可综合。
```

## 16. 本章最后一张总表

| 内容 | 一句话考点 |
|---|---|
| 行为建模 | 用高级语法描述电路行为，但不是普通软件程序 |
| `initial` | \(t=0\) 执行一次，仿真用 |
| `always` | 反复执行，RTL 核心 |
| `begin...end` | 多条语句顺序组织 |
| `fork...join` | 并行执行，仿真用，不可综合 |
| `#` | 仿真延迟，不可综合 |
| `@` | 等待事件，边沿触发可用于时序逻辑 |
| `assign` | 连续赋值，驱动 `wire` |
| `=` | 阻塞赋值，组合逻辑常用 |
| `<=` | 非阻塞赋值，时序逻辑常用 |
| `if` | 有优先级，不完整会锁存 |
| `case` | 多路选择，组合逻辑要写 `default` |
| `for` | 固定次数可综合，展开硬件 |
| `while/repeat/forever` | 通常仿真用，不可综合 |
| `task` | 可有时间控制，多输出，独立调用 |
| `function` | 单返回值，无时间控制，可在表达式调用 |

