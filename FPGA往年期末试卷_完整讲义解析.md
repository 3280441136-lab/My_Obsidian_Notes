# FPGA / Verilog 往年期末试卷完整讲义解析

资料来源：你提供的唯一一份往年期末试卷截图。  
用途：不是只背答案，而是通过这张卷子反推出老师最爱考的点。

这张卷子的结构很清楚：

| 大题 | 分值 | 考什么 |
|---|---:|---|
| 一、单选题 | 30 分 | Verilog 基础语法、数制、FPGA 基础、仿真、case/if 陷阱 |
| 二、简答题 | 16 分 | 阻塞/非阻塞赋值、Moore/Mealy 状态机 |
| 三、代码设计题 | 25 分 | 七段数码管、10 进制计数器、模块例化 |
| 四、全加器与 testbench | 15 分 | 门级建模、模块例化、仿真激励 |
| 五、交通灯状态机 | 14 分 | FSM 状态图、计时控制、Verilog 实现 |

总复习方向一句话：

```text
前面靠细节，中间靠概念，后面靠能不能把组合逻辑、时序逻辑和状态机写成 Verilog。
```

## 一、单项选择题解析

### 答案速查表

| 题号 | 答案 | 考点 |
|---:|---|---|
| 1 | A | Verilog 是硬件描述语言 |
| 2 | D | 数制转换和比较 |
| 3 | B | 组合逻辑和时序逻辑区别 |
| 4 | D | 标识符命名规则 |
| 5 | C | 右移运算 |
| 6 | B | 位选、部分选择、拼接 |
| 7 | C | 条件运算符 `?:` |
| 8 | C | 时序仿真能反映延迟 |
| 9 | C | 状态变量位数计算 |
| 10 | B | IP 核含义 |
| 11 | B | CPLD 的乘积项结构 |
| 12 | C | if/else 不完整导致锁存器 |
| 13 | B | BLOCK RAM 资源理解 |
| 14 | D | 多个 4 位输入声明 |
| 15 | B | case 语句说法判断 |

### 1. 下列属于硬件描述语言的是

题目：

```text
下列属于硬件描述语言的是（ ）。
A. Verilog
B. Java
C. Python
D. C++
```

答案：B。

解析：

Verilog 是 HDL，Hardware Description Language，也就是硬件描述语言。它不是普通软件语言，写出来不是让 CPU 一行一行执行，而是让综合工具变成电路。

```text
Verilog 描述硬件结构或硬件行为。
Java、Python、C++ 是软件编程语言。
```

易错点：

```text
不要因为 Verilog 长得像 C，就把它当普通程序语言。
```

### 2. 下列数字最大的是

题目：

```text
A. 8'b10010011
B. 8'd150
C. 10'h08F
D. 10'o367
```

答案：D。

逐个换成十进制。

A：

$$
8'b10010011 = 128 + 16 + 2 + 1 = 147
$$

B：

$$
8'd150 = 150
$$

C：

$$
10'h08F = 8 \times 16 + 15 = 143
$$

D：

$$
10'o367 = 3 \times 8^2 + 6 \times 8 + 7 = 192 + 48 + 7 = 247
$$

所以最大的是 D。

速算方法：

```text
'b 是二进制
'd 是十进制
'h 是十六进制
'o 是八进制
```

易错点：

```text
前面的 8、10 是位宽，不是进制。真正的进制看 b/d/h/o。
```

### 3. 下列电路中不属于时序逻辑电路的是

题目：

```text
A. 状态机
B. 译码器
C. 计数器
D. 寄存器
```

答案：B。

解析：

时序逻辑的特点是会记住过去，通常有触发器或寄存器。

| 电路 | 类型 | 原因 |
|---|---|---|
| 状态机 | 时序逻辑 | 需要记住当前状态 |
| 译码器 | 组合逻辑 | 输出只由当前输入决定 |
| 计数器 | 时序逻辑 | 要记住当前计数值 |
| 寄存器 | 时序逻辑 | 本身就是存储单元 |

易错点：

```text
译码器虽然看起来“复杂”，但它不记忆，所以是组合逻辑。
```

### 4. 下列标识符中不合法的是

题目：

```text
A. Stata0
B. _count4
C. Not_Ack
D. 8adder
```

答案：D。

Verilog 普通标识符规则：

```text
可以由字母、数字、下划线、美元符号组成；
不能以数字开头。
```

所以：

```text
Stata0 合法
_count4 合法
Not_Ack 合法
8adder 不合法，因为以数字开头
```

易错点：

```text
下划线开头可以，数字开头不行。
```

### 5. 在 Verilog 中，a=6'b110101，则 a>>2=

题目：

```text
A. 4'b0101
B. 4'b1101
C. 6'b001101
D. 6'b000101
```

右移 2 位：

```text
原来：110101
右移：001101
```

等等，按普通逻辑右移 `>>`，右边丢掉两位，左边补 0：

```text
110101 >> 1 = 011010
011010 >> 1 = 001101
```

所以结果应该是：

```verilog
6'b001101
```

也就是 C。

答案：C。

易错点：

```text
右移后位宽通常保持原表达式位宽。a 是 6 位，所以结果仍按 6 位看。
```

### 6. a=4'b1011，b=4'b0101，那么 {b[2:1], a[3:1]} =

题目：

```text
A. 4'b1010
B. 5'b10101
C. 5'b01011
D. 5'b10110
```

先写出位编号。

```text
a = 4'b1011
    a[3] a[2] a[1] a[0]
     1    0    1    1

b = 4'b0101
    b[3] b[2] b[1] b[0]
     0    1    0    1
```

取：

```text
b[2:1] = 2'b10
a[3:1] = 3'b101
```

拼接：

```verilog
{b[2:1], a[3:1]} = {2'b10, 3'b101} = 5'b10101
```

所以答案是 B。

易错点：

```text
[3:1] 是从高位到低位取，不是反着排。
{ } 拼接时，左边放高位，右边放低位。
```

### 7. 若 assign a = (b > 4'd3) ? 0 : 1；如果 b=2，则 a=

答案：C。

条件运算符：

```verilog
条件 ? 条件真时的值 : 条件假时的值
```

题目中：

```verilog
assign a = (b > 4'd3) ? 0 : 1;
```

如果：

```text
b = 2
```

那么：

```text
2 > 3 是假
```

所以取冒号后面的值：

```text
a = 1
```

答案：C。

易错点：

```text
? 前面为真，选 ? 后面；
? 前面为假，选 : 后面。
```

### 8. 下列哪个阶段仿真能仿真出芯片的延迟情况

题目：

```text
A. 前仿真
B. 功能仿真
C. 时序仿真
D. 以上都不是
```

答案：C。

解析：

| 仿真类型 | 看什么 |
|---|---|
| 功能仿真 / 前仿真 | 逻辑功能对不对，不重点考虑真实延迟 |
| 时序仿真 | 带有门延迟、布线延迟等时序信息 |

所以要看芯片延迟，选时序仿真。

### 9. 设计一个 60 进制计数器，至少需要多少 bit 的状态变量

答案：C，6 bit。

需要满足：

$$
2^n \ge 60
$$

试：

$$
2^5 = 32 < 60
$$

不够。

$$
2^6 = 64 \ge 60
$$

够。

所以至少需要：

$$
n = 6
$$

答案：C。

易错点：

```text
60 进制不是需要 60 bit，而是需要能表示 0 到 59 的二进制位数。
```

### 10. 在 FPGA EDA 开发工具中，IP 的含义是

答案：B。

IP 核可以理解成：

```text
已经设计好的、完成某种功能的模块。
```

例如：

```text
PLL、FIFO、RAM、乘法器、UART、I2C 控制器等。
```

所以选：

```text
B. 完成某种功能的设计模块
```

### 11. CPLD 通过什么实现逻辑功能

题目：

```text
A. 输入缓冲
B. 可编程乘积项逻辑
C. 查找表 LUT
D. 输出缓冲
```

答案：B。

解析：

| 器件 | 常见逻辑实现方式 |
|---|---|
| CPLD | 可编程与或阵列、乘积项逻辑 |
| FPGA | LUT 查找表 + 触发器 + 布线资源 |

所以：

```text
CPLD 看乘积项；
FPGA 看 LUT。
```

### 12. 多层 if else 语句嵌套使用时，如果条件不完备，会怎样

答案：C。

组合逻辑中，如果条件没写全，工具会认为：

```text
没有说明时就保持原值。
```

保持原值意味着需要记忆，于是会推断锁存器。

所以选：

```text
C. 会产生不必要的锁存器
```

例子：

```verilog
always @(*) begin
    if (sel)
        y = a;
end
```

当 `sel=0` 时，`y` 没有赋值，于是可能产生锁存器。

推荐：

```verilog
always @(*) begin
    if (sel)
        y = a;
    else
        y = b;
end
```

或者：

```verilog
always @(*) begin
    y = b;
    if (sel)
        y = a;
end
```

### 13. 关于 FPGA 芯片内存储器资源描述错误的是

题目：

```text
A. FPGA 内部有 BLOCK RAM 存储器
B. 使用 BLOCK RAM 资源需占用额外的逻辑资源，并且速度慢
C. BLOCK RAM 由一定数量固定大小的存储块构成的
D. FPGA 内部有由 LUT 配置成的分布式存储器
```

答案：B。

解析：

FPGA 中常见存储资源：

```text
BLOCK RAM：芯片内部专门的块 RAM 资源
Distributed RAM：用 LUT 配出来的小容量分布式 RAM
```

A 正确，FPGA 内部有 BLOCK RAM。  
C 正确，BLOCK RAM 是固定大小存储块构成。  
D 正确，LUT 可以配置成分布式存储器。  
B 错，BLOCK RAM 本来就是专用存储资源，通常速度较快，不是“需占用额外逻辑资源并且速度慢”。

### 14. R、S、T 均为 4 bit 输入矢量，下列定义正确的是

题目：

```text
A. input R[3:0], S, T;
B. input R[3:0], S[3:0], T[3:0];
C. input [3:0] R, [3:0] S, [3:0] T;
D. input [3:0] R, S, T;
```

答案：D。

Verilog 端口声明里，多个同位宽信号可以这样写：

```verilog
input [3:0] R, S, T;
```

意思是：

```text
R、S、T 都是 4 位输入。
```

易错点：

```text
input R[3:0] 在传统 Verilog 端口声明里容易被理解成数组形式，不是本题要的 4 位向量写法。
```

### 15. case 语句说法不正确的是

题目：

```text
A. case 语句表达式的取值可以超出语句下面列出的值的范围
B. 语句各分支表达式允许同时满足 case 表达式的值
C. 条件语句中的选择值需要完整覆盖表达式的取值范围
D. 保险起见，case 语句最后分枝最好都加上 default 语句
```

答案：A。

解析按考试口径理解：

case 的判断表达式会拿自己的值去和下面各分支比较。课件口径里，`case` 通常用于多路选择，各分支一般理解为并行判断、没有优先级，因此各分支条件最好互斥，不应该设计成多个分支同时满足。

A 的意思是 `case` 表达式可能出现没有列出来的取值，这时可以通过 `default` 分支处理。  
B 说各分支表达式允许同时满足 `case` 表达式，这种说法不适合本课件的可综合设计口径。  
C 的意思是组合逻辑设计时应覆盖完整情况，否则可能产生锁存器。  
D 正确，最好写 `default`，提高安全性。

所以不正确的说法选 B。

提醒：

```text
补充：实际 Verilog 语法中，如果你故意写了重复或重叠的 case 项，仿真器通常会按匹配规则执行其中一个分支；但从考试和可综合设计规范看，这不是推荐写法。遇到这类题，按老师课件的“case 分支无优先级、最好互斥并加 default”来判断更稳。
```

## 二、简答题解析

### 1. 简述阻塞赋值和非阻塞赋值有何区别

标准答案：

```text
阻塞赋值使用 =，语句按顺序立即赋值，当前语句执行完后才执行下一条语句，常用于组合逻辑建模。

非阻塞赋值使用 <=，右边表达式先在当前时刻计算，左边变量在当前时间步结束或时钟沿统一更新，常用于时序逻辑建模。
```

更好背的版本：

```text
= 像“马上改”，适合组合逻辑。
<= 像“到点一起改”，适合触发器、寄存器等时序逻辑。
```

例子：

```verilog
always @(*) begin
    y = a & b;
end
```

组合逻辑用阻塞赋值。

```verilog
always @(posedge clk) begin
    q <= d;
end
```

时序逻辑用非阻塞赋值。

考试加分点：

```text
同一个时序 always 块中多个非阻塞赋值会并行更新，适合描述多个触发器在同一时钟沿同时变化。
```

### 2. 简述 Moore 型状态机和 Mealy 型状态机有何区别

标准答案：

```text
Moore 型状态机的输出只与当前状态有关，可表示为 output=f(state)，输出较稳定，输入不会直接影响输出。

Mealy 型状态机的输出与当前状态和当前输入都有关，可表示为 output=f(state,input)，响应速度较快，但输入变化可能直接影响输出，毛刺风险更高。
```

对比表：

| 对比项 | Moore 型 | Mealy 型 |
|---|---|---|
| 输出由什么决定 | 当前状态 | 当前状态 + 当前输入 |
| 公式 | $output=f(state)$ | $output=f(state,input)$ |
| 响应速度 | 可能慢一拍 | 当前周期可响应 |
| 稳定性 | 较稳定 | 更容易受输入影响 |
| 常见建议 | 控制电路常优先 | 对响应速度要求高时使用 |

一句话：

```text
Moore 看状态，Mealy 看状态加输入。
```

## 三、设计题解析：七段数码管 + 10 进制计数器 + 顶层显示

### 题目 3(1)：设计七段数码管译码模块

题目要求：

```text
输入为 4 位 BCD 码，输出为 7 位信号，分别对应 a-g。
```

这里要先确定数码管是共阴极还是共阳极。题目没说，一般考试默认可以写一种并说明。本解析采用：

```text
共阴极：1 表示该段点亮，0 表示该段熄灭。
输出 seg[6:0] = {a,b,c,d,e,f,g}
```

数字和段码：

| 数字 | 点亮段 | `{a,b,c,d,e,f,g}` |
|---:|---|---|
| 0 | a b c d e f | `7'b1111110` |
| 1 | b c | `7'b0110000` |
| 2 | a b d e g | `7'b1101101` |
| 3 | a b c d g | `7'b1111001` |
| 4 | b c f g | `7'b0110011` |
| 5 | a c d f g | `7'b1011011` |
| 6 | a c d e f g | `7'b1011111` |
| 7 | a b c | `7'b1110000` |
| 8 | a b c d e f g | `7'b1111111` |
| 9 | a b c d f g | `7'b1111011` |

参考代码：

```verilog
module seg7_decoder (
    input  wire [3:0] bcd,
    output reg  [6:0] seg
);
    always @(*) begin
        case (bcd)
            4'd0: seg = 7'b1111110;
            4'd1: seg = 7'b0110000;
            4'd2: seg = 7'b1101101;
            4'd3: seg = 7'b1111001;
            4'd4: seg = 7'b0110011;
            4'd5: seg = 7'b1011011;
            4'd6: seg = 7'b1011111;
            4'd7: seg = 7'b1110000;
            4'd8: seg = 7'b1111111;
            4'd9: seg = 7'b1111011;
            default: seg = 7'b0000000;
        endcase
    end
endmodule
```

如果老师习惯共阳极，则输出取反即可：

```verilog
seg = ~共阴极段码;
```

考试注意：

```text
题目说“分别对应 a-g”，一定要写清楚 seg[6:0] 对应顺序。本解析用 {a,b,c,d,e,f,g}。
```

### 题目 3(2)：设计 10 进制计数器

10 进制计数器也就是：

```text
0,1,2,3,4,5,6,7,8,9,0,1...
```

计数范围是 0 到 9，所以需要 4 位：

$$
2^4 = 16 \ge 10
$$

参考代码：

```verilog
module counter10 (
    input  wire clk,
    input  wire rst_n,
    output reg  [3:0] count
);
    always @(posedge clk or negedge rst_n) begin
        if (!rst_n)
            count <= 4'd0;
        else if (count == 4'd9)
            count <= 4'd0;
        else
            count <= count + 1'b1;
    end
endmodule
```

解释：

```text
复位时 count=0；
如果数到 9，下一个时钟回到 0；
否则每个时钟加 1。
```

### 题目 3(3)：通过模块例化完成顶层模块，在数码管上显示 10 进制计数器

顶层模块就是把前两个模块接起来：

```text
counter10 产生 count
seg7_decoder 把 count 翻译成数码管段码 seg
```

参考代码：

```verilog
module top_counter_display (
    input  wire clk,
    input  wire rst_n,
    output wire [6:0] seg
);
    wire [3:0] count;

    counter10 u_counter10 (
        .clk   (clk),
        .rst_n (rst_n),
        .count (count)
    );

    seg7_decoder u_seg7_decoder (
        .bcd (count),
        .seg (seg)
    );
endmodule
```

模块例化读法：

```text
counter10 是模块名；
u_counter10 是这个模块实例的名字；
.clk(clk) 表示把顶层的 clk 接到子模块的 clk 端口。
```

## 四、全加器门级建模与 testbench

### 题目 4(1)：调用门元件方式实现 1 位全加器

从图中可以看出：

```text
sum = a ^ b ^ cin
cout = (a & b) | (a & cin) | (b & cin)
```

全加器进位也可以理解成：

```text
a、b、cin 这三个输入中，只要至少两个为 1，cout 就为 1。
```

门级实现代码：

```verilog
module full_add1 (
    input  wire a,
    input  wire b,
    input  wire cin,
    output wire sum,
    output wire cout
);
    wire m1;
    wire m2;
    wire m3;

    and u_and1 (m1, a, b);
    and u_and2 (m2, b, cin);
    and u_and3 (m3, a, cin);
    or  u_or1  (cout, m1, m2, m3);
    xor u_xor1 (sum, a, b, cin);
endmodule
```

门元件调用格式：

```verilog
门类型 实例名(输出, 输入1, 输入2, ...);
```

例如：

```verilog
and u_and1 (m1, a, b);
```

意思是：

```text
m1 = a & b
```

### 题目 4(2)：分析 testbench 代码

题目给出的 testbench 大意是：

```verilog
`timescale 1ns/1ns

module tb;
reg a, b, cin;
wire cout, sum;

full_add1 u1 (
    .a(a),
    .b(b),
    .cin(cin),
    .cout(cout),
    .sum(sum)
);

initial begin
    a = 0; b = 0; cin = 0;
    #10 a = 1;
    #10 b = 1;
    #10 a = 0; cin = 1;
    #10 a = 1; b = 0; cin = 0;
    #10 b = 1; cin = 1;
    #10 $finish;
end
endmodule
```

逐步看输入变化：

| 时间 | a | b | cin | 十进制和 | `{cout,sum}` |
|---:|---|---|---|---:|---|
| 0ns | 0 | 0 | 0 | 0 | `2'b00` |
| 10ns | 1 | 0 | 0 | 1 | `2'b01` |
| 20ns | 1 | 1 | 0 | 2 | `2'b10` |
| 30ns | 0 | 1 | 1 | 2 | `2'b10` |
| 40ns | 1 | 0 | 0 | 1 | `2'b01` |
| 50ns | 1 | 1 | 1 | 3 | `2'b11` |
| 60ns | 结束 | | | | |

几个考点：

```text
reg 用来在 testbench 中产生输入激励；
wire 用来接被测模块的输出；
#10 表示等待 10 个时间单位；
`timescale 1ns/1ns 表示时间单位为 1ns，精度为 1ns；
$finish 表示结束仿真。
```

## 五、交通灯状态机设计

题目：

```text
输入时钟为 1Hz。
A 路和 B 路各有红、黄、绿 3 种灯。
持续时间：
红灯 45s，黄灯 5s，绿灯 40s。

状态转换：
A 红，B 绿，持续 40s
A 红，B 黄，持续 5s
A 绿，B 红，持续 40s
A 黄，B 红，持续 5s
```

这题本质是：

```text
4 个状态的 Moore 型状态机 + 一个秒计数器。
```

### 1. 状态图

状态可以定义为：

| 状态名 | A 路 | B 路 | 持续时间 |
|---|---|---|---:|
| `S_AG_BR` | 绿 | 红 | 40s |
| `S_AY_BR` | 黄 | 红 | 5s |
| `S_AR_BG` | 红 | 绿 | 40s |
| `S_AR_BY` | 红 | 黄 | 5s |

状态转换：

```text
S_AR_BG --40s--> S_AR_BY
S_AR_BY --5s --> S_AG_BR
S_AG_BR --40s--> S_AY_BR
S_AY_BR --5s --> S_AR_BG
```

用文字画成状态图：

```text
          40s
S_AR_BG ------> S_AR_BY
   ^              |
   | 5s           | 5s
   |              v
S_AY_BR <------ S_AG_BR
          40s
```

更准确的循环：

```text
A红B绿(40s)
--> A红B黄(5s)
--> A绿B红(40s)
--> A黄B红(5s)
--> A红B绿(40s)
```

### 2. 输出定义

为了写代码清楚，可以用 6 个输出：

```text
A_red, A_yellow, A_green
B_red, B_yellow, B_green
```

每个状态下只点对应灯。

### 3. 秒计数器思路

输入时钟 1Hz，意思是：

```text
每来一个 clk 上升沿，就是 1 秒过去。
```

所以可以用 `cnt` 记录当前状态已经持续了多少秒。

如果某状态要持续 40 秒，可以让：

```text
cnt 从 0 数到 39
```

当：

```verilog
cnt == 6'd39
```

说明 40 秒到了，下一个时钟切换状态。

为什么用 6 位？

最大要数到 44 或 39：

$$
2^5=32<45,\quad 2^6=64\ge45
$$

所以至少 6 位。

### 4. 参考代码

```verilog
module traffic_light (
    input  wire clk,
    input  wire rst_n,
    output reg  A_red,
    output reg  A_yellow,
    output reg  A_green,
    output reg  B_red,
    output reg  B_yellow,
    output reg  B_green
);
    parameter S_AR_BG = 2'b00;  // A red, B green
    parameter S_AR_BY = 2'b01;  // A red, B yellow
    parameter S_AG_BR = 2'b10;  // A green, B red
    parameter S_AY_BR = 2'b11;  // A yellow, B red

    reg [1:0] state;
    reg [1:0] next_state;
    reg [5:0] cnt;

    // 状态寄存器和计数器
    always @(posedge clk or negedge rst_n) begin
        if (!rst_n) begin
            state <= S_AR_BG;
            cnt   <= 6'd0;
        end else begin
            state <= next_state;

            if (state != next_state)
                cnt <= 6'd0;
            else
                cnt <= cnt + 1'b1;
        end
    end

    // 次态逻辑
    always @(*) begin
        next_state = state;

        case (state)
            S_AR_BG: begin
                if (cnt == 6'd39)
                    next_state = S_AR_BY;
            end

            S_AR_BY: begin
                if (cnt == 6'd4)
                    next_state = S_AG_BR;
            end

            S_AG_BR: begin
                if (cnt == 6'd39)
                    next_state = S_AY_BR;
            end

            S_AY_BR: begin
                if (cnt == 6'd4)
                    next_state = S_AR_BG;
            end

            default: begin
                next_state = S_AR_BG;
            end
        endcase
    end

    // 输出逻辑：Moore 型，输出只由状态决定
    always @(*) begin
        A_red    = 1'b0;
        A_yellow = 1'b0;
        A_green  = 1'b0;
        B_red    = 1'b0;
        B_yellow = 1'b0;
        B_green  = 1'b0;

        case (state)
            S_AR_BG: begin
                A_red   = 1'b1;
                B_green = 1'b1;
            end

            S_AR_BY: begin
                A_red    = 1'b1;
                B_yellow = 1'b1;
            end

            S_AG_BR: begin
                A_green = 1'b1;
                B_red   = 1'b1;
            end

            S_AY_BR: begin
                A_yellow = 1'b1;
                B_red    = 1'b1;
            end

            default: begin
                A_red   = 1'b1;
                B_green = 1'b1;
            end
        endcase
    end
endmodule
```

### 5. 这题怎么拿分

如果考试时间紧，至少写出：

```text
4 个状态；
每个状态对应 A/B 哪个灯亮；
40s/5s 的计数判断；
状态循环顺序；
case + default；
复位到初始状态。
```

状态机题最容易扣分点：

```text
没有复位；
没有 default；
40 秒写成 cnt==40 导致多一秒；
黄灯状态漏掉；
A/B 红绿同时冲突；
状态跳转顺序写反。
```

## 最后总结：这张卷子暴露出的必背点

### 1. 语法细节

```text
数制：8'b、8'd、10'h、10'o
标识符：不能数字开头
位选/部分选择：a[3:1]
拼接：{b[2:1], a[3:1]}
条件运算符：条件 ? 真值 : 假值
端口向量声明：input [3:0] R, S, T;
```

### 2. 电路分类

```text
组合逻辑：译码器、选择器、加法器
时序逻辑：寄存器、计数器、状态机
```

### 3. Verilog 建模规则

```text
组合逻辑 always @(*) 用 =
时序逻辑 always @(posedge clk) 用 <=
if/else 和 case 要写完整，否则可能推断锁存器
case 最好加 default
```

### 4. 代码题模板

```text
七段译码器：always @(*) + case
计数器：always @(posedge clk or negedge rst_n)
顶层例化：子模块实例名 + .端口名(连接信号)
全加器：sum=a^b^cin，cout=ab+acin+bcin
状态机：状态寄存器 + 次态逻辑 + 输出逻辑
```

### 5. 考前最小背诵版

```text
阻塞 =，组合逻辑，立即赋值。
非阻塞 <=，时序逻辑，时钟沿统一更新。

Moore 输出只看状态。
Mealy 输出看状态和输入。

10 进制计数器用 4 bit。
60 进制计数器用 6 bit。

CPLD 用乘积项逻辑。
FPGA 用 LUT。

BLOCK RAM 是 FPGA 内部专用存储块，不是又慢又额外占大量逻辑资源。
```
