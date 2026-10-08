# 第 4 课：DTFT 与数字频率

> [!abstract] 本课定位
> 连续傅里叶变换使用连续角频率 $\Omega$，采样后的序列则使用数字角频率 $\omega$。本课说明二者如何通过采样周期联系起来，为什么 DTFT 总是以 $2\pi$ 为周期，以及为什么 DTFT 是单位圆上的 Z 变换这一事实要到 Z 变换一课才能完全讲清。

## 1. 离散时间傅里叶变换与数字角频率

### 7.1 数字角频率来自采样后的相位增量

连续复指数

$$
x_c(t)=e^{j\Omega t}
$$

以周期 $T_s$ 采样后变成

$$
x[n]=e^{j\Omega nT_s}.
$$

定义

$$
\omega=\Omega T_s,
$$

便得到

$$
x[n]=e^{j\omega n}.
$$

$\omega$ 表示样点编号每增加 $1$，复向量转过多少弧度，单位为 $\mathrm{rad/sample}$。若连续信号频率为 $f$，采样频率为 $f_s$，则

$$
\omega=2\pi\frac{f}{f_s}.
$$

因此数字角频率不是必须由序列周期产生的。它首先是离散复指数每个样点的相位增量。

离散时间傅里叶变换为

$$
X(e^{j\omega})
=\sum_{n=-\infty}^{+\infty}
x[n]e^{-j\omega n},
$$

逆变换为

$$
x[n]=\frac{1}{2\pi}
\int_{-\pi}^{\pi}
X(e^{j\omega})e^{j\omega n}\,\mathrm d\omega.
$$

即使 $x[n]$ 没有周期，也可以让检测变量 $\omega$ 连续变化。若序列以 $N_0$ 个样点为周期，它才具有数字基波角频率

$$
\omega_0=\frac{2\pi}{N_0}
$$

和离散谐波 $k\omega_0$。

### 7.2 为什么 DTFT 以 $2\pi$ 为周期

由于 $n$ 只能取整数：

$$
\begin{aligned}
e^{-j(\omega+2\pi)n}
&=e^{-j\omega n}e^{-j2\pi n}\\
&=e^{-j\omega n}.
\end{aligned}
$$

因此

$$
X(e^{j(\omega+2\pi)})=X(e^{j\omega}).
$$

相差 $2\pi$ 的数字频率在所有整数样点上的取值完全相同，所以无法区分。只需研究任意一个长度为 $2\pi$ 的区间，例如 $[-\pi,\pi)$。

连续复指数 $e^{j\Omega t}$ 虽然对时间 $t$ 周期，但连续频率不具有同样的等价关系。因为 $t$ 可以取任意实数，$e^{j2\pi t}$ 并不总等于 $1$。这是连续频谱不天然以 $2\pi$ 周期重复，而 DTFT 会重复的根本原因。

### 7.3 帕斯维尔定理：能量只是换了一种坐标

有限能量序列满足

$$
E_x=\sum_{n=-\infty}^{+\infty}|x[n]|^2<\infty.
$$

帕斯维尔定理给出

$$
\sum_{n=-\infty}^{+\infty}|x[n]|^2
=\frac{1}{2\pi}
\int_{-\pi}^{\pi}|X(e^{j\omega})|^2\,\mathrm d\omega.
$$

时域索引 $n$ 离散，所以使用求和；频率变量 $\omega$ 连续，所以使用积分。可以把

$$
\frac{1}{2\pi}|X(e^{j\omega})|^2
$$

理解为能量在数字频率轴上的密度。积分说明频率变量连续，但不能单凭积分符号断言频谱曲线处处连续。

非零周期序列会无限重复，总能量通常为无穷大，因此改用平均功率。若周期为 $N_0$，傅里叶级数系数为 $C_k$，则

$$
\frac{1}{N_0}\sum_{n=0}^{N_0-1}|x[n]|^2
=\sum_{k=0}^{N_0-1}|C_k|^2.
$$

## 2. 时移与频移为什么表现不同

设一个频率分量为

$$
x[n]=e^{j\omega_0n}.
$$

将它延迟 $n_0$ 个样点：

$$
\begin{aligned}
x[n-n_0]
&=e^{j\omega_0(n-n_0)}\\
&=e^{-j\omega_0n_0}e^{j\omega_0n}.
\end{aligned}
$$

$n$ 前面的系数仍为 $\omega_0$，所以频率不变；额外因子 $e^{-j\omega_0n_0}$ 的模为 $1$，只增加固定相位。因此

$$
x[n-n_0]
\quad\longleftrightarrow\quad
e^{-j\omega n_0}X(e^{j\omega}).
$$

时移不改变幅度谱，只给每个频率增加与 $\omega$ 成正比的相位。

频移采用另一种操作：在时域乘以复指数 $e^{j\omega_cn}$。原来的频率分量变成

$$
e^{j\omega_0n}e^{j\omega_cn}
=e^{j(\omega_0+\omega_c)n}.
$$

这次改变了 $n$ 前面的系数，因而频率位置真的发生变化：

$$
x[n]e^{j\omega_cn}
\quad\longleftrightarrow\quad
X\left(e^{j(\omega-\omega_c)}\right).
$$

若时域乘的是实余弦

$$
\cos(\omega_cn)=\frac12e^{j\omega_cn}+\frac12e^{-j\omega_cn},
$$

频谱会产生左右两份副本：

$$
Y(e^{j\omega})
=\frac12X\left(e^{j(\omega-\omega_c)}\right)
+\frac12X\left(e^{j(\omega+\omega_c)}\right).
$$

所以时移改变的是各频率“从周期中的哪里开始”，频移改变的是“每个样点转多少角度”。


## 3. 时移、频移与调制对照

| 操作 | 时域结果 | 频域结果 | 物理含义 |
| --- | --- | --- | --- |
| 时移 | $x[n-n_0]$ | $e^{-j\omega n_0}X(e^{j\omega})$ | 各频率幅度不变，相位随频率线性改变 |
| 频移 | $e^{j\omega_0n}x[n]$ | $X(e^{j(\omega-\omega_0)})$ | 整个频谱沿数字频率轴搬移 |

## 4. 本课小结与常见误区

- $\omega$ 是相邻样点之间的相位增量，不是单位为 $\mathrm{rad/s}$ 的物理角频率。
- $\omega$ 与 $\omega+2\pi$ 在离散序列上无法区分，因此 DTFT 必然周期化。
- DTFT 的求和并不对任意序列都收敛，收敛条件会在 Z 变换的 ROC 中得到统一表达。

下一课进入采样与重建：观察连续信号采样后频谱为何重复，什么条件下能够恢复，以及 $\mathrm{Sa}$ 插值公式为什么能穿过全部样点。

---

## 相关笔记

[[03 第3课 频率、复指数与傅里叶分析]]、[[05 第5课 采样、混叠与理想恢复]]、[[06 第6课 Z变换、收敛域与系统函数]]

