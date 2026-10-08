# 从单双边频谱到采样恢复与 Z 变换收敛域

> [!abstract] 本章要解决的问题
> 本章从一个看似简单的疑问出发：为什么实信号的频谱在正、负频率处成对出现？理解这一点以后，才能准确区分双边谱、单边显示和真正的单边谱。接下来沿着采样后的频谱副本，推导理想低通恢复和 $\mathrm{Sa}$ 插值公式。最后把 DTFT 放回 Z 平面的单位圆上，并说明如何根据极点和序列的左右方向确定收敛域。

## 1. 实信号为什么同时含有正、负频率

电压、声压和温度等物理量通常用实数表示，因此相应信号满足

$$
x(t)\in\mathbb R.
$$

以实余弦为例：

$$
x(t)=A\cos(\Omega_0t+\varphi).
$$

傅里叶分析不是直接使用余弦作为唯一的基本构件，而是使用复指数。根据欧拉公式，实余弦可以拆成

$$
\begin{aligned}
x(t)
&=\frac{A}{2}e^{j\varphi}e^{j\Omega_0t}
+\frac{A}{2}e^{-j\varphi}e^{-j\Omega_0t}.
\end{aligned}
$$

$e^{j\Omega_0t}$ 与 $e^{-j\Omega_0t}$ 表示复平面中方向相反的两种旋转。两个分量的虚部互相抵消，实部相加后成为实余弦。因此，负频率并不是另一种额外的物理振动，而是复指数表示法中的反向旋转。

这种成对关系并不限于余弦。连续时间傅里叶变换为

$$
X(j\Omega)=\int_{-\infty}^{+\infty}x(t)e^{-j\Omega t}\,\mathrm dt.
$$

如果 $x(t)$ 为实信号，那么 $x^*(t)=x(t)$，于是

$$
\begin{aligned}
X^*(j\Omega)
&=\int_{-\infty}^{+\infty}x^*(t)e^{j\Omega t}\,\mathrm dt\\
&=X(-j\Omega).
\end{aligned}
$$

所以实信号的频谱满足共轭对称性：

$$
\boxed{X(-j\Omega)=X^*(j\Omega)}.
$$

由此还能得到：

$$
|X(-j\Omega)|=|X(j\Omega)|,
$$

即幅度谱是偶对称的；相位谱在适当选取相位分支后是奇对称的。正、负频率虽然都存在，但其中一半可以由另一半恢复，因此它们不提供两份彼此独立的信息。

![[assets/单双边频谱对比.svg]]

## 2. 双边谱、单边显示与真正的单边谱

完整傅里叶频谱的频率变量满足 $-\infty<\Omega<+\infty$，所以无论信号是实数还是复数，完整频谱都可以画在整条正、负频率轴上，这就是双边谱。

工程中经常只画实信号的正半轴。由于实信号的负半轴可由共轭关系恢复，这样做不会丢掉独立信息。为了使单边幅度代表正、负两侧的合计贡献，通常把非零正频率处的幅度乘以 $2$，但直流分量不乘 $2$。这种单边幅度谱只是**显示方法改变了**，原实信号的负频率并没有消失。

真正的单边频谱是指频谱在某一侧实际为零。例如

$$
x_c(t)=e^{j\Omega_0t}
$$

的频谱为

$$
X_c(j\Omega)=2\pi\delta(\Omega-\Omega_0),
$$

它只在正频率 $+\Omega_0$ 处有谱线。这个信号是复信号，因为

$$
x_c(t)=\cos(\Omega_0t)+j\sin(\Omega_0t).
$$

实信号的正、负频率必须共轭成对，所以非零实信号不可能具有真正的单边频谱。反过来，复信号只是**有可能**具有单边谱，并不一定如此。例如

$$
x_c(t)=e^{j\Omega_1t}+2e^{-j\Omega_2t}
$$

仍然同时具有正、负频率。准确关系是

$$
\boxed{
\text{真正的单边频谱}\Longrightarrow\text{复信号}
}
$$

但

$$
\boxed{
\text{复信号}\not\Longrightarrow\text{单边频谱}
}.
$$

## 3. 为什么单边复频谱的采样率可以减半

采样定理的根本依据不是机械地记忆“最高频率的两倍”，而是采样后周期重复的频谱副本不能重叠。

设采样周期为 $T$，采样角频率为

$$
\Omega_s=\frac{2\pi}{T}.
$$

如果实低通信号带限于 $\Omega_0$，它的频谱占据

$$
[-\Omega_0,\Omega_0],
$$

总宽度为 $2\Omega_0$。为了使相邻频谱副本不重叠，需要

$$
\boxed{\Omega_s>2\Omega_0}.
$$

如果某个复信号的频谱真正只占据

$$
[0,\Omega_0],
$$

总宽度只有 $\Omega_0$，于是可以使用

$$
\boxed{\Omega_s>\Omega_0}.
$$

这里必须采集完整复样本

$$
x[n]=x_I[n]+jx_Q[n],
$$

其中一个复样本包含 $I$、$Q$ 两个实数。采样次数虽然可以减半，每个样本包含的实数却增加了一倍，因此总信息量并没有凭空减少。仅仅把普通实信号的频谱图只画正半轴，不能把采样条件改成 $\Omega_s>\Omega_0$。

## 4. 从频谱副本到理想低通恢复

采样保留了离散时刻的数值，却没有直接给出采样点之间的波形。要理解为什么仍能恢复连续信号，需要观察采样对频谱做了什么。

理想冲激采样序列为

$$
p_T(t)=\sum_{n=-\infty}^{+\infty}\delta(t-nT).
$$

原连续信号与它相乘，得到采样后信号

$$
\begin{aligned}
\hat{x}(t)
&=x(t)p_T(t)\\
&=\sum_{n=-\infty}^{+\infty}x(nT)\delta(t-nT).
\end{aligned}
$$

其频谱为

$$
\boxed{
\hat{X}(j\Omega)
=\frac{1}{T}\sum_{k=-\infty}^{+\infty}
X\bigl(j(\Omega-k\Omega_s)\bigr)
}.
$$

这说明采样后的频谱由原频谱的许多副本组成：相邻副本的中心间隔是 $\Omega_s$，每个副本的幅度变为原来的 $1/T$。

![[assets/采样频谱与理想低通恢复.svg]]

当原信号带限于 $\Omega_0$ 且 $\Omega_s>2\Omega_0$ 时，频谱副本互不重叠。此时可以用理想低通滤波器取出位于原点的中心副本。

## 5. 门函数与 $\mathrm{Sa}$ 函数的变换关系

为了描述理想低通滤波器，先采用国内教材中常见的门函数记号。定义宽度为 $\tau$、高度为 $1$ 的门函数

$$
G_\tau(t)=
\begin{cases}
1,&|t|<\dfrac{\tau}{2},\\[4pt]
\dfrac12,&|t|=\dfrac{\tau}{2},\\[4pt]
0,&|t|>\dfrac{\tau}{2}.
\end{cases}
$$

并定义

$$
\mathrm{Sa}(x)=\frac{\sin x}{x},
\qquad
\mathrm{Sa}(0)=1.
$$

在本章采用的傅里叶变换约定下，门函数与 $\mathrm{Sa}$ 函数构成变换对：

$$
\boxed{
G_\tau(t)
\xleftrightarrow{\mathcal F}
\tau\,\mathrm{Sa}\left(\frac{\Omega\tau}{2}\right)
}.
$$

如果门函数位于频域，设其总宽度为 $\Omega_g$，则

$$
\boxed{
G_{\Omega_g}(\Omega)
\xleftrightarrow{\mathcal F^{-1}}
\frac{\Omega_g}{2\pi}
\mathrm{Sa}\left(\frac{\Omega_gt}{2}\right)
}.
$$

若门函数高度为 $A$，则时域函数也整体乘以 $A$：

$$
A G_{\Omega_g}(\Omega)
\xleftrightarrow{\mathcal F^{-1}}
\frac{A\Omega_g}{2\pi}
\mathrm{Sa}\left(\frac{\Omega_gt}{2}\right).
$$

采样恢复滤波器可以写成

$$
G(j\Omega)=T G_{\Omega_s}(\Omega).
$$

$G_{\Omega_s}(\Omega)$ 的总宽度为 $\Omega_s$，因此通带范围是

$$
-\frac{\Omega_s}{2}<\Omega<\frac{\Omega_s}{2}.
$$

滤波器的高度取为 $T$，是为了抵消采样频谱中的 $1/T$：

$$
\frac{1}{T}X(j\Omega)\cdot T=X(j\Omega).
$$

把 $A=T$、$\Omega_g=\Omega_s$ 代入门函数变换对，并利用 $\Omega_s=2\pi/T$，可得恢复滤波器的单位冲激响应

$$
\begin{aligned}
g(t)
&=\frac{T\Omega_s}{2\pi}
\mathrm{Sa}\left(\frac{\Omega_st}{2}\right)\\
&=\mathrm{Sa}\left(\frac{\pi t}{T}\right).
\end{aligned}
$$

因此采样恢复中最常用的变换对是

$$
\boxed{
T G_{\Omega_s}(\Omega)
\xleftrightarrow{\mathcal F^{-1}}
\mathrm{Sa}\left(\frac{\pi t}{T}\right)
}.
$$

门函数越宽，对应的 $\mathrm{Sa}$ 主瓣越窄；门函数越窄，对应的 $\mathrm{Sa}$ 主瓣越宽。这是时域与频域宽窄相反的又一个例子。

## 6. 为什么许多个 $\mathrm{Sa}$ 函数能重建连续信号

频域相乘对应时域卷积，因此恢复信号为

$$
x_r(t)=\hat{x}(t)*g(t).
$$

代入冲激采样信号：

$$
\begin{aligned}
x_r(t)
&=\left[
\sum_{n=-\infty}^{+\infty}
x(nT)\delta(t-nT)
\right]*g(t)\\
&=\sum_{n=-\infty}^{+\infty}
x(nT)g(t-nT).
\end{aligned}
$$

再代入 $g(t)$，得到理想采样内插公式：

$$
\boxed{
x(t)=
\sum_{n=-\infty}^{+\infty}
x(nT)
\mathrm{Sa}\left(\frac{\pi(t-nT)}{T}\right)
}.
$$

这个公式的几何意义是：在每个采样时刻 $nT$ 放置一个以该点为中心的 $\mathrm{Sa}$ 函数，用采样值 $x(nT)$ 调整它的高度，再把所有平移并加权后的 $\mathrm{Sa}$ 函数相加。

![[assets/Sa插值重建.svg]]

在另一个采样时刻 $t=mT$，有

$$
\mathrm{Sa}\left(\frac{\pi(mT-nT)}{T}\right)
=
\begin{cases}
1,&m=n,\\
0,&m\ne n.
\end{cases}
$$

所以在 $t=mT$ 处，只有以 $mT$ 为中心的那一个 $\mathrm{Sa}$ 函数留下贡献：

$$
x_r(mT)=x(mT).
$$

其他 $\mathrm{Sa}$ 函数虽然延伸到整个时间轴，但恰好在该采样点处过零。它们在采样点之间相互叠加，从而补出连续波形。

完全恢复依赖理想条件：原信号严格带限、采样频率满足奈奎斯特条件、使用理想冲激采样，并采用无限长的理想低通滤波器。实际系统只能用有限长度滤波器近似这一过程。

## 7. DTFT 为什么是单位圆上的 Z 变换

离散时间傅里叶变换为

$$
X(e^{j\omega})=
\sum_{n=-\infty}^{+\infty}x[n]e^{-j\omega n},
$$

而双边 Z 变换为

$$
X(z)=\sum_{n=-\infty}^{+\infty}x[n]z^{-n}.
$$

把复变量写成

$$
z=re^{j\omega},
$$

便有

$$
X(z)=\sum_{n=-\infty}^{+\infty}
x[n]r^{-n}e^{-j\omega n}.
$$

$r^{-n}$ 是指数加权，$e^{-j\omega n}$ 用于检测频率。当取 $r=1$ 时，$z=e^{j\omega}$ 位于单位圆上，指数加权消失：

$$
\boxed{
X(e^{j\omega})=X(z)\big|_{z=e^{j\omega}}
}.
$$

但这个等式成立的前提是单位圆属于 Z 变换的收敛域。若单位圆不在 ROC 内，即使把 $z=e^{j\omega}$ 代入约分后的有理式能够算出一个数，该结果也不是原序列普通意义下的 DTFT。

例如

$$
x[n]=a^n u[n]
$$

的 Z 变换为

$$
X(z)=\frac{1}{1-az^{-1}},
\qquad
\mathrm{ROC}:|z|>|a|.
$$

只有当 $|a|<1$ 时，单位圆才位于 ROC 内，DTFT 才存在。因此

$$
\boxed{
\text{单位圆属于 ROC}
\iff
\text{普通意义下的 DTFT 存在}
}.
$$

## 8. 极点只确定边界，序列方向决定 ROC

如果 Z 变换可以写成有理式

$$
X(z)=\frac{B(z)}{A(z)},
$$

那么使 $B(z)=0$ 的点是零点，使 $A(z)=0$ 的点是极点。极点一定不能位于 ROC 内，但反过来不能说所有非极点都属于 ROC。ROC 之外的普通点虽然能代入有理式，原始 Z 变换级数仍可能不收敛。

有理 Z 变换的有限极点按照模值把 Z 平面分成若干候选圆环。序列在时域中向右、向左还是向两边延伸，决定选择哪个圆环：

- 右边序列的 ROC 位于最外层极点之外；
- 左边序列的 ROC 位于最内层极点之内；
- 双边序列的 ROC 位于两圈极点之间。

![[assets/Z变换收敛域方向.svg]]

例如，同一个有理式

$$
X(z)=\frac{1}{1-az^{-1}}=\frac{z}{z-a}
$$

具有极点 $z=a$。如果序列为右边序列

$$
x[n]=a^n u[n],
$$

则

$$
\mathrm{ROC}:|z|>|a|.
$$

如果序列为左边序列

$$
x[n]=-a^n u[-n-1],
$$

则

$$
\mathrm{ROC}:|z|<|a|.
$$

所以仅凭极点无法判断 ROC 向内还是向外。应记住

$$
\boxed{
\text{极点决定候选边界，序列方向决定取边界哪一侧}
}.
$$

## 9. 有限长序列的 $n_1,n_2$ 判断法

若有限长序列只在

$$
n_1\le n\le n_2
$$

内非零，则

$$
X(z)=\sum_{n=n_1}^{n_2}x[n]z^{-n}.
$$

有限项求和不会产生其他有限非零模值处的收敛问题，只需判断 $z=0$ 与 $z=\infty$：

- 当 $n>0$ 时，$z^{-n}$ 在 $z=0$ 处出现问题；
- 当 $n<0$ 时，$z^{-n}=z^{|n|}$ 在 $z=\infty$ 处出现问题。

于是有四种情况。

当 $n_1<0$ 且 $n_2\le0$ 时，序列只含负下标以及可能存在的零下标：

$$
\boxed{\mathrm{ROC}:|z|<\infty}.
$$

ROC 包含 $z=0$，不包含 $z=\infty$。

当 $n_1\ge0$ 且 $n_2>0$ 时，序列只含正下标以及可能存在的零下标：

$$
\boxed{\mathrm{ROC}:0<|z|\le\infty}.
$$

ROC 不包含 $z=0$，包含 $z=\infty$。

当 $n_1<0$ 且 $n_2>0$ 时，序列在零点两侧都有非零样点：

$$
\boxed{\mathrm{ROC}:0<|z|<\infty}.
$$

ROC 既不包含 $z=0$，也不包含 $z=\infty$。

当 $n_1=n_2=0$ 时，Z 变换只是常数 $x[0]$，ROC 为整个 Z 平面。

这组规则对有限长序列已经足以确定 ROC；对于无限长有理序列，它只能帮助判断是否包含 $0$ 或 $\infty$，还必须结合有限极点和序列方向才能得到完整 ROC。

## 10. 本章的知识链

1. 实信号要求正、负频率共轭成对，因此完整频谱是对称的双边谱。
2. 单边幅度图只是利用对称性压缩显示；真正的单边谱只能来自复信号，但复信号不一定单边。
3. 采样条件由频谱副本的占用宽度决定：实低通信号需要 $\Omega_s>2\Omega_0$，真正单边的复频谱可以使用 $\Omega_s>\Omega_0$ 的复采样。
4. 冲激采样使原频谱以 $\Omega_s$ 为间隔复制，并带来 $1/T$ 的幅度系数。
5. 高度为 $T$、宽度为 $\Omega_s$ 的理想低通门函数取出中心副本，其时域响应是 $\mathrm{Sa}(\pi t/T)$。
6. 每个采样值控制一个平移后的 $\mathrm{Sa}$ 函数，所有函数相加便得到连续信号。
7. DTFT 是 Z 变换在单位圆上的取值，前提是单位圆位于 ROC 内。
8. 对有理 Z 变换，极点决定 ROC 的候选边界，序列的左右方向决定选择边界的哪一侧。
9. 对有限长序列，$n_1,n_2$ 的正负只需用来判断 ROC 是否包含 $0$ 与 $\infty$。

相关笔记：[[从时域到频域：傅里叶变换、采样与Z变换]]、[[序列的卷积和和卷积运算]]。
