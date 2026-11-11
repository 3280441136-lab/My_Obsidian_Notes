from pathlib import Path
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.patches import FancyArrowPatch, Rectangle
from docx import Document
from docx.shared import Cm, Pt, RGBColor
from docx.enum.section import WD_ORIENT
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_CELL_VERTICAL_ALIGNMENT
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
import sys, re
sys.path.insert(0, str(Path.cwd()/'tmp/a4-deps'))
from latex2mathml.converter import convert
from lxml import etree

XSL = etree.XSLT(etree.parse('C:/Program Files/Microsoft Office/root/Office16/MML2OMML.XSL'))

def inline(p, text, size, bold=False, color=None):
    for i, part in enumerate(re.split(r'\$(.*?)\$', text)):
        if i % 2:
            math = XSL(etree.fromstring(convert(part).encode())).getroot()
            for mr in math.findall('.//'+qn('m:r')):
                pr=OxmlElement('w:rPr')
                sz=OxmlElement('w:sz'); sz.set(qn('w:val'),str(int(size*2))); pr.append(sz)
                mr.insert(0,pr)
            p._p.append(math)
        elif part:
            r=p.add_run(part);r.bold=bold;r.font.size=Pt(size);r.font.name='Microsoft YaHei'
            if color:r.font.color.rgb=RGBColor(*color)


ROOT = Path.cwd()
OUT = ROOT / '通信原理期中A4速查表.docx'
DIAGRAM = ROOT / 'tmp' / 'midterm_blocks.png'


def diagram():
    fig, ax = plt.subplots(figsize=(15.8, 3.2), dpi=240)
    ax.set_xlim(0, 15.8)
    ax.set_ylim(-.85, 4)
    ax.axis('off')
    ax.text(.15, 3.86, 'TRANSMITTER', fontsize=10, fontweight='bold')
    ax.text(8.1, 3.86, 'RECEIVER', fontsize=10, fontweight='bold')
    rows = [
        ('AM', ['m(t)', '+ A0', 'x cos(wc t)', 'AM'], ['AM + n', 'BPF', 'Envelope', 'DC block', 'm(t)']),
        ('DSB', ['m(t)', 'x cos(wc t)', 'DSB'], ['DSB + n', 'BPF', 'x cos(wc t)', 'LPF', 'm(t)/2']),
        ('SSB', ['m(t)', 'x cos(wc t)', 'USB/LSB BPF'], ['SSB + n', 'BPF', 'x cos(wc t)', 'LPF', 'm(t)/4']),
        ('VSB', ['m(t)', 'x cos(wc t)', 'VSB filter H'], ['VSB + n', 'BPF', 'x cos(wc t)', 'LPF', 'C m(t)/4']),
    ]
    for idx, (label, tx, rx) in enumerate(rows):
        y = 3.36 - idx * .88
        ax.text(.04, y, label, fontsize=10.5, fontweight='bold', va='center')
        for xstart, items, span in [(1.0, tx, 6.6), (8.15, rx, 7.4)]:
            step = span / len(items)
            w = step - .25
            for j, item in enumerate(items):
                x = xstart + j * step
                ax.add_patch(Rectangle((x, y-.24), w, .48, edgecolor='#22394a', facecolor='#edf3f2', linewidth=.85))
                if item=='C m(t)/4': item=r'$C m(t)/4$'
                elif item=='m(t)/4': item=r'$m(t)/4$'
                elif item=='m(t)/2': item=r'$m(t)/2$'
                elif 'm(t)' in item: item=item.replace('m(t)',r'$m(t)$')
                item=item.replace('x cos(wc t)',r'$\times\cos(\omega_c t)$').replace('+ A0',r'$+A_0$')
                ax.text(x+w/2, y, item, ha='center', va='center', fontsize=8.3)
                if j < len(items)-1:
                    ax.add_patch(FancyArrowPatch((x+w+.015,y),(xstart+(j+1)*step-.025,y), arrowstyle='->', mutation_scale=9, lw=.8))
    ax.text(.05,-.27,'SSB phase\nmethod',fontsize=8.7,fontweight='bold',va='center')
    def arrow(a,b): ax.add_patch(FancyArrowPatch(a,b,arrowstyle='->',mutation_scale=8,lw=.8))
    def box(x,y,w,label):
        ax.add_patch(Rectangle((x,y-.16),w,.32,ec='#22394a',fc='#edf3f2',lw=.8))
        ax.text(x+w/2,y,label,ha='center',va='center',fontsize=8)
    ax.text(1.1,-.27,r'$m(t)$',fontsize=9,va='center')
    ax.plot([1.6,1.85,1.85],[ -.27,-.27,-.08],color='#22394a',lw=.8)
    ax.plot([1.85,1.85],[ -.27,-.6],color='#22394a',lw=.8)
    arrow((1.85,-.08),(4.1,-.08));box(4.1,-.08,2.15,r'$\times\cos(\omega_ct)$')
    arrow((1.85,-.6),(2.12,-.6));box(2.12,-.6,1.65,'Hilbert');arrow((3.77,-.6),(4.1,-.6));box(4.1,-.6,2.15,r'$\times\sin(\omega_ct)$')
    ax.plot([6.25,6.65,6.65],[-.08,-.08,-.27],color='#22394a',lw=.8)
    ax.plot([6.25,6.65,6.65],[-.6,-.6,-.42],color='#22394a',lw=.8)
    box(6.4,-.34,.5,r'$\mp$');arrow((6.9,-.34),(7.2,-.34));box(7.2,-.34,.75,r'$\times\frac{1}{2}$');arrow((7.95,-.34),(8.3,-.34))
    ax.text(8.35,-.34,r'$s_{\rm USB/LSB}=\frac{1}{2}[m\cos(\omega_ct)\mp\widehat m\sin(\omega_ct)]$',fontsize=9,va='center')
    fig.savefig(DIAGRAM, bbox_inches='tight', pad_inches=.025, facecolor='white')
    plt.close(fig)


def set_cell_shading(cell, fill):
    tcPr = cell._tc.get_or_add_tcPr()
    shd = OxmlElement('w:shd')
    shd.set(qn('w:fill'), fill)
    tcPr.append(shd)


def set_margins(cell, top=50, start=75, bottom=50, end=75):
    tc = cell._tc
    tcPr = tc.get_or_add_tcPr()
    mar = OxmlElement('w:tcMar')
    for key, value in [('top',top),('start',start),('bottom',bottom),('end',end)]:
        node = OxmlElement('w:'+key)
        node.set(qn('w:w'), str(value))
        node.set(qn('w:type'), 'dxa')
        mar.append(node)
    tcPr.append(mar)


def put(cell, text, bold=False, size=7.1, color=None):
    cell.text = ''
    p = cell.paragraphs[0]
    p.paragraph_format.space_after = Pt(0)
    p.paragraph_format.space_before = Pt(0)
    p.paragraph_format.line_spacing = 1.0
    for k, line in enumerate(text.split('\n')):
        if k:
            p.add_run().add_break()
        inline(p,line,size,bold,color)
    cell.vertical_alignment = WD_CELL_VERTICAL_ALIGNMENT.CENTER
    set_margins(cell)


def paragraph(doc, text, size=7.2, bold=False, after=1.0):
    p = doc.add_paragraph()
    p.paragraph_format.space_after = Pt(after)
    p.paragraph_format.space_before = Pt(0)
    p.paragraph_format.line_spacing = 1.0
    inline(p,text,size,bold)
    return p


def heading(doc, text):
    p = paragraph(doc, text, 8.3, True, 1.2)
    p.runs[0].font.color.rgb = RGBColor(25, 79, 84)
    return p


diagram()
doc = Document()
sec = doc.sections[0]
sec.orientation = WD_ORIENT.LANDSCAPE
sec.page_width = Cm(29.7)
sec.page_height = Cm(21.0)
sec.top_margin = Cm(.55)
sec.bottom_margin = Cm(.48)
sec.left_margin = Cm(.58)
sec.right_margin = Cm(.58)
sec.header_distance = Cm(.2)
sec.footer_distance = Cm(.2)

styles = doc.styles
styles['Normal'].font.name = 'Microsoft YaHei'
styles['Normal'].font.size = Pt(7.2)
styles['Normal'].paragraph_format.space_after = Pt(0)

p = doc.add_paragraph(style='Title')
ppr=styles['Title'].element.find(qn('w:pPr'))
if ppr is not None:
    for border in list(ppr.findall(qn('w:pBdr'))):ppr.remove(border)
p.paragraph_format.space_after = Pt(1.5)
r = p.add_run('通信原理期中速查  第1章至第4章 VSB')
r.font.name = 'Microsoft YaHei'; r.font.size = Pt(12); r.font.bold = True; r.font.color.rgb = RGBColor(20, 35, 39)
paragraph(doc, r'单位电阻、零均值消息；同步载波 $\cos(\omega_ct)$；白噪声双边谱 $n_0/2$；消息最高频率 $f_H$，消息功率 $P_m=E[m^2(t)]$；FM、PM 不考。', 7.3, after=1.6)

heading(doc, '第四章  调制与解调框图')
doc.add_picture(str(DIAGRAM), width=Cm(28.45))
paragraph(doc, '框图：BPF 限噪；AM 包络检波、隔直；其余同步解调。SSB 相移法上号减留 USB，下号加留 LSB。VSB 条件按课件实偶滤波响应并补偿线性相位；载频两侧增益互补。', 7.0, after=1.5)

heading(doc, '第四章  同一功率与噪声口径下的比较')
tab = doc.add_table(rows=1, cols=5)
tab.alignment = WD_TABLE_ALIGNMENT.CENTER
tab.autofit = False
widths=[1.3,6.3,4.5,8.15,8.15]
for c,w in zip(tab.columns,widths): c.width=Cm(w)
headers=['方式','发送信号与正频带','接收方式及带宽','解调器输入 / 输出功率','效率与制度增益']
for c,h,w in zip(tab.rows[0].cells,headers,widths):
    c.width=Cm(w);set_cell_shading(c,'DCECEB');put(c,h,True,7.1)
data=[
('AM',r'$s=[A_0+m]\cos\omega_ct$'+'\n载波线 + USB + LSB',r'包络检波→隔直'+'\n'+r'$B=2f_H$；需 $A_0+m\geq0$',r'$S_i=\frac{A_0^2+P_m}{2},\ N_i=2n_0f_H$'+'\n'+r'$S_o=P_m,\ N_o=2n_0f_H$（高 SNR）',r'$\eta=\frac{P_m}{A_0^2+P_m},\ G=2\eta$'+'\n'+r'单音满调幅 $\eta=1/3,\ G=2/3$'),
('DSB',r'$s=m\cos\omega_ct$'+'\n仅 USB + LSB；无独立载波','同步相乘→LPF\n'+r'$B=2f_H$；输出 $m/2$',r'$S_i=P_m/2,\ N_i=2n_0f_H$'+'\n'+r'$S_o=P_m/4,\ N_o=n_0f_H/2$',r'$\eta=1,\ G=2$'+'\n'+r'相位差 $\varphi$：输出 $\frac{m}{2}\cos\varphi$'),
('SSB',r'$s_{\rm USB}=\frac12[m\cos\omega_ct-\hat m\sin\omega_ct]$'+'\nLSB 符号改 +；仅一侧边带','滤波法或相移法；同步解调\n'+r'$B=f_H$；输出 $m/4$',r'$S_i=P_m/4,\ N_i=n_0f_H$'+'\n'+r'$S_o=P_m/16,\ N_o=n_0f_H/4$',r'$\eta=1,\ G=1$'+'\n同发送功率时 DSB、SSB 输出 SNR 相同'),
('VSB','DSB→VSB 滤波器\n一主边带 + 小段残留边带','同步相乘→LPF\n'+r'$f_H<B<2f_H$',r'$Y(\Omega)=\frac14[H(\omega_c+\Omega)+H(\omega_c-\Omega)]M(\Omega)$'+'\n具体噪声功率随滤波器确定',r'无失真：$H(\omega_c+\Omega)+H(\omega_c-\Omega)=C$'+'\n'+r'$|\Omega|\leq\omega_H$；不能直接套 SSB 的 $G$'),
]
for i,row in enumerate(data):
    cells=tab.add_row().cells
    for j,(c,val) in enumerate(zip(cells,row)):
        c.width=Cm(widths[j])
        if i%2: set_cell_shading(c,'F4F7F7')
        put(c,val,bold=(c==cells[0]),size=7.05)

paragraph(doc, r'单音 AM：$m=A_m\cos\omega_mt$；$m_a=A_m/A_0=\frac{E_{\max}-E_{\min}}{E_{\max}+E_{\min}}\leq1$；$P_c=A_0^2/2$；$P_{\rm USB}=P_{\rm LSB}=A_m^2/8$；$\eta=\frac{m_a^2}{2+m_a^2}$。门限：低输入 SNR 下包络近似失效；过调制：$A_0+m<0$。', 7.0, after=1.5)
paragraph(doc, r'频谱：$S_{\rm DSB}(f)=\frac12[M(f-f_c)+M(f+f_c)]$；AM 再加 $\frac{A_0}{2}[\delta(f-f_c)+\delta(f+f_c)]$；USB 正频带 $[f_c,f_c+f_H]$，BPF 中心 $f_c+f_H/2$。FDM：每路 SSB 占 $4\,\mathrm{kHz}$；基群 12 路、$60$–$108\,\mathrm{kHz}$，超群 60 路、$312$–$552\,\mathrm{kHz}$。',7.0,after=1.5)

heading(doc, '前3章  必备公式与判断')
low=doc.add_table(rows=1, cols=3)
low.alignment=WD_TABLE_ALIGNMENT.CENTER
low.autofit=False
for c in low.columns: c.width=Cm(9.45)
items=[
('第1章  信息与指标',
 r'自信息 $I(x)=-\log_2p(x)$；熵 $H(X)=-\sum p_i\log_2p_i$（bit/符号）。'+'\n'+r'码元速率 $R_B=1/T_B$；等概 $M$ 进制 $R_b=R_B\log_2M$；频带利用率 $\eta_B=R_b/B$。'+'\n误码率为错误码元比例；误比特率为错误比特比例。\n模拟系统有效性看带宽、可靠性看 SNR；数字系统有效性看速率/带宽、可靠性看错误率。'),
('第2章  随机过程与噪声',
 r'宽平稳：均值常数，$R(t_1,t_2)=R(\tau)$；$P=R(0)$，$\sigma^2=P-\mu^2$。'+'\n'+r'$S(f)=\mathcal{F}\{R(\tau)\}$；LTI：$S_Y=|H|^2S_X$。联合高斯且不相关 ⇒ 独立；高斯且宽平稳 ⇒ 严平稳。'+'\n'+r'白噪声 $S_W=n_0/2$，$R_W=n_0\delta(\tau)/2$。低通 $|f|\leq f_H$：$P=n_0f_H$，$R=n_0f_H\operatorname{sinc}(2f_H\tau)$。'+'\n'+r'带通 $\pm f_c$ 各宽 $B$：$P=n_0B$，$R=n_0B\operatorname{sinc}(B\tau)\cos(2\pi f_c\tau)$。'),
('第3章  信道与容量',
 '调制信道：调制器输出→解调器输入，观察波形；编码信道：编码器输出→译码器输入，观察符号。\n'+r'$P_e=\sum_xP(x)P(\mathrm{error}|x)$；$P_R=P_TG_TG_R(\lambda/4\pi d)^2$，$\lambda=c/f$。'+'\n'+r'无失真 $H(\omega)=Ke^{-j\omega t_d}$；两径 $H=Ae^{-j\omega\tau_0}(1+e^{-j\omega\tau})$，零点 $f_k=\frac{2k+1}{2\tau}$。'+'\n'+r'容量 $C=B\log_2(1+S/N)$，$N=n_0B$。慢衰落 $T_c\gg T_B$；选择性看 $B_s$ 与 $B_c$。'),
]
for c,(head,body) in zip(low.rows[0].cells,items):
    set_cell_shading(c,'F4F7F7')
    put(c,head+'\n'+body,size=7.0)

paragraph(doc,r'噪声与分布：$a=\sqrt{x_I^2+x_Q^2}$；独立、零均值、等方差高斯 I/Q 的包络为 Rayleigh，加入确定正弦分量为 Rician。$\operatorname{sinc}(x)=\sin(\pi x)/(\pi x)$。$G=(S/N)_o/(S/N)_i$；$\mathrm{SNR}_{\rm dB}=10\log_{10}(S/N)$；本地载波增益改变时信号、噪声功率同乘增益平方。',7.0,after=1)

paragraph(doc, '传播方式匹配原题：symmetrical cable→home telephone / LAN；coaxial cable→CATV；optical fiber→long-distance backbone；ground wave→medium-wave broadcast；sky wave→shortwave over-the-horizon；LOS→microwave relay。答案 1–B，2–C，3–A，4–E，5–F，6–D。', 7.0, after=0)

doc.save(OUT)
print(OUT)
