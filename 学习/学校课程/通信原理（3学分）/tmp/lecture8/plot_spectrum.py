from pathlib import Path
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.font_manager import FontProperties

out = Path(__file__).parent
font = FontProperties(fname='C:/Windows/Fonts/msyh.ttc')
plt.rcParams.update({'font.family': font.get_name(), 'font.size': 12,
                     'axes.unicode_minus': False, 'mathtext.fontset': 'stix'})
fig, axes = plt.subplots(1, 2, figsize=(11, 3.9), gridspec_kw={'width_ratios': [1, 1.65]})
blue, orange = '#176998', '#bf5222'
for ax in axes:
    ax.spines[['top', 'right']].set_visible(False)
    ax.spines['bottom'].set_position(('data', 0))
    ax.set_ylim(-0.17, 0.63)
    ax.set_yticks([0, 0.25, 0.5])
    ax.tick_params(axis='both', labelsize=11)
    ax.set_xlabel(r'$f\,/\,\mathrm{kHz}$', loc='right', labelpad=12)
    ax.grid(axis='y', alpha=0.13)

def impulse(ax, x, h, color):
    ax.annotate('', xy=(x, h), xytext=(x, 0),
                arrowprops={'arrowstyle': '-|>', 'color': color, 'lw': 2,
                            'mutation_scale': 13, 'shrinkA': 0, 'shrinkB': 0})
    ax.text(x, h+0.025, f'{h:g}', ha='center', va='bottom', fontsize=12, color=color)

axes[0].set_title(r'基带消息 $M(f)$', fontsize=15, pad=13)
axes[0].set_xlim(0, 3.1)
axes[0].set_xticks([0, 1, 2, 3])
axes[0].set_ylabel('冲激权重', labelpad=9)
impulse(axes[0], 1, 0.25, blue)
impulse(axes[0], 2, 0.15, blue)

axes[1].set_title(r'AM 已调信号 $S_{\mathrm{AM}}(f)$', fontsize=15, pad=13)
axes[1].set_xlim(17.2, 23.1)
axes[1].set_xticks([18, 19, 20, 21, 22])
for x, h in [(18, 0.075), (19, 0.125), (20, 0.5), (21, 0.125), (22, 0.075)]:
    impulse(axes[1], x, h, orange if x == 20 else blue)
axes[1].text(20, 0.585, '载波', ha='center', color=orange, fontsize=12)
axes[1].text(18.5, 0.36, '下边带', ha='center', color=blue, fontsize=12)
axes[1].text(21.5, 0.36, '上边带', ha='center', color=blue, fontsize=12)
axes[1].annotate('', xy=(18, -0.115), xytext=(22, -0.115),
                 arrowprops={'arrowstyle': '<->', 'lw': 1.5, 'color': '#444444'})
axes[1].text(20, -0.133, r'$B_{\mathrm{AM}}=22-18=4\,\mathrm{kHz}$',
             ha='center', va='top', fontsize=12)
fig.suptitle('双边傅里叶频谱的正频率部分', fontsize=16, y=0.98)
fig.subplots_adjust(left=0.075, right=0.98, bottom=0.21, top=0.78, wspace=0.28)
fig.text(0.5, 0.025, '箭头标注为冲激权重；负频率部分与之共轭对称。', ha='center', fontsize=11, color='#555555')
fig.savefig(out/'AM-two-tone-spectrum.png', dpi=160, facecolor='white')
plt.close(fig)
with (out/'preparation.txt').open('a', encoding='utf8') as f:
    f.write('\n第二轮备课：复看12、14、15、17页，完整单元为时频域对照、谱线/边带及带宽。以单音积化和差引入，再完成双音例子的所有谱线、幅度、带宽、理想恢复谱及课件时频表。双音m=.5cos(2π1000t)+.3cos(2π2000t)，A0=1，fc=20k；已调余弦幅度18k:.15,19k:.25,20k:1,21k:.25,22k:.15；双边FT正频率冲激权重分别.075,.125,.5,.125,.075。BAM=4kHz。第15页实际检波谱的额外小分量不可冒充理想包络必有失真。下一轮接调幅系数、过调制与功率效率。\n')
