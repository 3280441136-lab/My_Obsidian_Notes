import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.patches import FancyArrowPatch

N=16
fig, ax=plt.subplots(figsize=(17,11))
fig.patch.set_facecolor('white')
ax.set_xlim(-.5,4.6)
ax.set_ylim(15.8,-.8)
ax.axis('off')
xs=[0,1,2,3,4]
for stage, m in enumerate([2,4,8,16]):
    half=m//2
    for base in range(0,N,m):
        for j in range(half):
            top=base+j; bot=top+half
            # Straight and crossed signal paths for the two butterfly outputs.
            ax.plot([xs[stage],xs[stage+1]],[top,top],color='#334155',lw=.75)
            ax.plot([xs[stage],xs[stage+1]],[bot,bot],color='#334155',lw=.75)
            ax.plot([xs[stage],xs[stage+1]],[bot,top],color='#c65d3e',lw=.7,alpha=.8)
            ax.plot([xs[stage],xs[stage+1]],[top,bot],color='#c65d3e',lw=.7,alpha=.8)
            ax.plot(xs[stage+1],top,'o',ms=2,color='#334155')
            ax.plot(xs[stage+1],bot,'o',ms=2,color='#334155')
            if j and m>=8:
                ax.text(xs[stage]+.52,(top+bot)/2-.12,rf'$W_{{{m}}}^{{{j}}}$',fontsize=7,color='#a33f25',ha='center',bbox=dict(facecolor='white',edgecolor='none',pad=.3))
for i in range(N):
    rev=int(format(i,'04b')[::-1],2)
    ax.text(-.08,i,rf'$x[{rev}]$',ha='right',va='center',fontsize=9)
    ax.text(4.08,i,rf'$X[{i}]$',ha='left',va='center',fontsize=9)
for j,title in enumerate(['bit-reversed input','2-point','4-point','8-point','16-point']):
    ax.text(j,-.48,title,ha='center',va='bottom',fontsize=10,fontweight='bold')
fig.savefig('期中复习/4.2 十六点DIT-FFT流程.png',dpi=190,bbox_inches='tight')
