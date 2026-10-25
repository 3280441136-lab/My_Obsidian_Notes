from pathlib import Path
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.patches import Circle
import pymupdf

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / 'assets' / '作业解析'
OUT.mkdir(parents=True, exist_ok=True)
plt.rcParams.update({'font.sans-serif': ['Microsoft YaHei'], 'axes.unicode_minus': False,
                     'font.size': 11, 'figure.dpi': 150, 'savefig.facecolor': 'white'})

def stem(ax,n,v,title):
    m,s,b=ax.stem(n,v,basefmt='k-')
    plt.setp(m,color='#196f9a',markersize=4);plt.setp(s,color='#196f9a',linewidth=1.5)
    plt.setp(b,linewidth=.6)
    ticks = np.union1d(np.arange(2*int(np.ceil(n.min()/2)),n.max()+1,2),[0])
    ax.set_title(title);ax.set_xlabel('$n$');ax.grid(alpha=.2);ax.set_xticks(ticks)
    ax.axvline(0,color='gray',lw=.5)

for item in range(1,6):
    n=np.arange(-5,12) if item!=4 else np.arange(-10,11)
    if item==1:
        x=(n==0).astype(float);h=((n>=0)&(n<5)).astype(float);y=h
    elif item==2:
        x=((n>=0)&(n<3)).astype(float);h=((n>=0)&(n<4)).astype(float)
        y=np.array([max(0,min(2,k)-max(0,k-3)+1) for k in n])
    elif item==3:
        x=(n==2).astype(float);h=0.5**n*((n>=0)&(n<3));y=0.5**(n-2)*((n>=2)&(n<5))
    elif item==4:
        x=2.**n*(n<=-1);h=0.5**n*(n>=0)
        y=np.where(n<=-1,(4/3)*2.**n,(1/3)*0.5**n)
    else:
        x=(n==0).astype(float)-(n==3).astype(float);h=.8*(n>=1);y=.8*((n>=1)&(n<=3))
    fig,axs=plt.subplots(1,3,figsize=(10.5,2.8),layout='constrained')
    for ax,v,t in zip(axs,[x,h,y],['输入 $x[n]$','冲激响应 $h[n]$','输出 $y[n]$']):stem(ax,n,v,t)
    fig.suptitle(f'习题 1.2（{item}）：离散样点用竖线表示；范围外按公式延续',fontsize=12)
    fig.savefig(OUT/f'1.2-{item}卷积.png');plt.close(fig)

fig,axs=plt.subplots(2,3,figsize=(11,7.2),layout='constrained')
theta=np.linspace(0,2*np.pi,500)
def panel(ax,title,zeros=(),poles=(),rin=0,rout=None,outer=False):
    ax.set_aspect('equal');lim=2.45 if '（1）' in title else 1.45
    ax.set_xlim(-lim,lim);ax.set_ylim(-lim,lim);ax.axhline(0,c='gray',lw=.5);ax.axvline(0,c='gray',lw=.5)
    if outer:ax.set_facecolor('#e6f3fa');ax.add_patch(Circle((0,0),rin,color='white',zorder=0))
    elif rout is not None:
        ax.add_patch(Circle((0,0),rout,color='#e6f3fa',zorder=0))
        if rin>0:ax.add_patch(Circle((0,0),rin,color='white',zorder=1))
    for r in sorted(set([rin]+([rout] if rout else []))):
        if r>0:ax.plot(r*np.cos(theta),r*np.sin(theta),'--',c='#5092ac',lw=1)
    if zeros:ax.scatter(np.real(zeros),np.imag(zeros),marker='o',facecolors='none',edgecolors='#167fa8',s=75,zorder=4)
    if poles:ax.scatter(np.real(poles),np.imag(poles),marker='x',color='#bf4242',s=80,zorder=5)
    ax.set_title(title,fontsize=10);ax.set_xlabel('实部');ax.set_ylabel('虚部');ax.grid(alpha=.13)

panel(axs[0,0],r'（1）示例 $a=1/2$：$1/2<|z|<2$',[0],[.5,2],.5,2)
panel(axs[0,1],r'（2）$|z|>1/2$',[0],[.5],.5,outer=True)
panel(axs[0,2],r'（3）$|z|<1/2$；包含原点',[0],[.5],0,.5)
axs[1,0].axis('off');axs[1,0].text(.5,.58,'（9）双边指数序列\n左右收敛条件无交集\n普通 Z 变换不存在\n无零极点图',ha='center',va='center',transform=axs[1,0].transAxes,fontsize=12)
zs=.5*np.exp(2j*np.pi*np.arange(1,5)/5)
panel(axs[1,1],'（11）ROC：全部非零 z；原点四重极点',list(zs),[0],0,outer=True)
axs[1,1].annotate('4重',(0,0),(.12,.15))
panel(axs[1,2],r'（12）$|z|>1$；原点二重零点',[0],[1,-1],1,outer=True)
axs[1,2].annotate('2重',(0,0),(.12,.15))
fig.suptitle('习题 2.1：○ 为零点，× 为极点，浅蓝色为 ROC；虚线边界不属于 ROC',fontsize=12)
fig.savefig(OUT/'2.1零极点与收敛域.png');plt.close(fig)

n=np.arange(9);vals=np.array([5,4,3,2,1,2,3,4,5])
w=np.linspace(-np.pi,np.pi,10001)
A=1+4*np.cos(w)+6*np.cos(2*w)+8*np.cos(3*w)+10*np.cos(4*w)
X=np.exp(-4j*w)*A
phase=np.angle(X)
jumps=np.flatnonzero((np.abs(np.diff(phase))>np.pi)|(A[:-1]*A[1:]<0))+1
phase[jumps]=np.nan
fig,axs=plt.subplots(3,1,figsize=(9,8),layout='constrained')
stem(axs[0],n,vals,'习题 2.20（4）：对称中心为 $n=4$')
axs[1].plot(w/np.pi,np.abs(A),color='#176f94');axs[1].set_ylabel('$|X(e^{j\omega})|$');axs[1].grid(alpha=.25)
axs[2].plot(w/np.pi,phase/np.pi,color='#ad4d40',lw=1.1);axs[2].set_ylabel('主值相位 / $\pi$');axs[2].set_ylim(-1.08,1.08);axs[2].grid(alpha=.25)
roots=np.sort(np.arccos(np.roots([80,32,-68,-20,5]).real))
for ax in axs[1:]:
    ax.set_xlabel('$\omega/\pi$');ax.set_xlim(-1,1)
    for z in np.r_[roots,-roots]:ax.axvline(z/np.pi,c='gray',lw=.4,ls='--',alpha=.5)
fig.suptitle('幅度为实函数的绝对值；负号补入相位；谱零点相位未定义',fontsize=12)
fig.savefig(OUT/'2.20-4序列与幅相.png');plt.close(fig)
print('2.20 positive spectral zeros / pi:',roots/np.pi)

d=pymupdf.open(next((ROOT/'教材').glob('*.pdf')))
for pg,rel,name in [(69,(.56,.168,.77,.198),'1.4-3原题局部'),(145,(.14,.855,.62,.885),'2.20-4原题局部')]:
    page=d[pg-1];r=page.rect
    clip=pymupdf.Rect(rel[0]*r.width,rel[1]*r.height,rel[2]*r.width,rel[3]*r.height)
    page.get_pixmap(matrix=pymupdf.Matrix(3,3),clip=clip).save(OUT/f'{name}.png')

# Direct numerical checks against definitions, not an additional test framework.
for t in [-2.8,-1.1,0,.4,2.4]:
    xx=sum(vals*np.exp(-1j*t*n))
    aa=1+4*np.cos(t)+6*np.cos(2*t)+8*np.cos(3*t)+10*np.cos(4*t)
    assert abs(xx-np.exp(-4j*t)*aa)<1e-10
for t in [-6,-1,0,4]:
    k=np.arange(-200,min(-1,t)+1,dtype=float)
    direct=np.sum(2.**k*.5**(t-k))
    expected=(4/3)*2.**t if t<0 else (1/3)*.5**t
    assert abs(direct-expected)<1e-12
print('checked: convolution 1.2(4), DTFT 2.20(4)')
