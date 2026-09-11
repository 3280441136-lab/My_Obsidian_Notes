from pathlib import Path
import math
import os


ROOT = Path(os.environ.get("CHAPTER1_SVG_ROOT", Path.cwd()))
OUT = ROOT / "10_图示"
OUT.mkdir(parents=True, exist_ok=True)


STYLE = """
  <style>
    .title{font:700 28px 'Microsoft YaHei',sans-serif;fill:#172033}
    .h{font:700 21px 'Microsoft YaHei',sans-serif;fill:#1e293b}
    .t{font:500 18px 'Microsoft YaHei',sans-serif;fill:#334155}
    .s{font:500 15px 'Microsoft YaHei',sans-serif;fill:#526174}
    .axis{stroke:#263449;stroke-width:2.2;fill:none}
    .grid{stroke:#d9e0e8;stroke-width:1;fill:none}
    .guide{stroke:#7c8da4;stroke-width:1.6;stroke-dasharray:7 6;fill:none}
    .ink{stroke:#172033;stroke-width:3.2;fill:none;stroke-linecap:round;stroke-linejoin:round}
    .arrow{stroke:#d1495b;stroke-width:3.2;fill:none;marker-end:url(#arrow)}
  </style>
  <defs>
    <marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="#d1495b"/></marker>
  </defs>
"""


def write(name, body, width=1200, height=700, desc=""):
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}" role="img" aria-labelledby="title desc">
  <title id="title">{name.removesuffix('.svg')}</title>
  <desc id="desc">{desc}</desc>
  <rect width="{width}" height="{height}" fill="#ffffff"/>
{STYLE}
{body}
</svg>'''
    (OUT / name).write_text(svg, encoding="utf-8")


devices = r'''
  <text x="55" y="48" class="title">同一个振子，三种器件选择三种“平坦输出”</text>
  <text x="55" y="76" class="s">关键不是笼统追求平坦，而是先确定输出量：位移、速度还是加速度</text>
  <line x1="55" y1="92" x2="1145" y2="92" stroke="#cbd5e1" stroke-width="2"/>

  <g transform="translate(55 120)">
    <rect x="0" y="0" width="340" height="490" rx="6" fill="#f5f9fc" stroke="#b8c8d8"/>
    <text x="22" y="38" class="h">压强式电容传声器</text>
    <text x="22" y="70" class="s">声压 → 振膜位移 → 电容变化 → 电压</text>
    <path d="M45 175 C72 142 72 208 99 175" class="arrow"/>
    <line x1="125" y1="116" x2="125" y2="236" class="ink"/>
    <line x1="205" y1="116" x2="205" y2="236" class="ink"/>
    <text x="145" y="164" class="t">间距 D</text>
    <text x="34" y="254" class="s">振膜</text><text x="190" y="254" class="s">背板</text>
    <rect x="22" y="288" width="296" height="92" rx="5" fill="#e7f3ee" stroke="#83b8a4"/>
    <text x="42" y="321" class="h">低频弹性控制</text>
    <text x="42" y="352" class="t">ξₐ ≈ Fₐ / Kₘ</text>
    <text x="42" y="408" class="t">Qₘ ≈ 1：低频平台平顺延伸到 f₀ 附近</text>
    <text x="42" y="444" class="s">Q 太大：共振峰高；Q 太小：过渡区提前下坠</text>
  </g>

  <g transform="translate(430 120)">
    <rect x="0" y="0" width="340" height="490" rx="6" fill="#fff8ee" stroke="#d9b780"/>
    <text x="22" y="38" class="h">压强式动圈传声器</text>
    <text x="22" y="70" class="s">声压 → 音膜/线圈速度 → 感应电压</text>
    <path d="M70 130 L70 230 M270 130 L270 230" class="ink"/>
    <rect x="137" y="154" width="66" height="52" fill="#f6c36d" stroke="#172033" stroke-width="3"/>
    <path d="M120 146 Q170 115 220 146 M120 214 Q170 245 220 214" class="ink"/>
    <path d="M238 180 L286 180" class="arrow"/>
    <text x="217" y="244" class="s">线圈切割磁力线</text>
    <rect x="22" y="288" width="296" height="92" rx="5" fill="#fdf0dc" stroke="#d9a654"/>
    <text x="42" y="321" class="h">中间力阻控制</text>
    <text x="42" y="352" class="t">vₐ ≈ Fₐ / Rₘ，E = Blv</text>
    <text x="42" y="408" class="t">Qₘ 越低：速度平台越宽</text>
    <text x="42" y="444" class="s">代价：Rₘ 增大，速度与灵敏度一同下降</text>
  </g>

  <g transform="translate(805 120)">
    <rect x="0" y="0" width="340" height="490" rx="6" fill="#f8f4fb" stroke="#bca6ce"/>
    <text x="22" y="38" class="h">动圈扬声器</text>
    <text x="22" y="70" class="s">电压 → 电流 → 电动力 → 纸盆加速度</text>
    <rect x="35" y="135" width="72" height="82" fill="#c8d7e8" stroke="#172033" stroke-width="3"/>
    <path d="M107 176 L155 176 L236 118 M155 176 L236 234" class="ink"/>
    <line x1="236" y1="112" x2="266" y2="102" class="ink"/><line x1="236" y1="240" x2="266" y2="250" class="ink"/>
    <path d="M274 132 Q309 176 274 220" class="arrow"/>
    <text x="228" y="273" class="s">纸盆推动空气</text>
    <rect x="22" y="288" width="296" height="92" rx="5" fill="#eee7f4" stroke="#a78bbb"/>
    <text x="42" y="321" class="h">高频质量控制</text>
    <text x="42" y="352" class="t">aₐ ≈ Fₐ / Mₘ</text>
    <text x="42" y="408" class="t">Qₘ ≈ 1：高频平台向下延伸到 f₀ 附近</text>
    <text x="42" y="444" class="s">声功率近似与加速度振幅平方成正比</text>
  </g>
'''
write("电声器件与控制区.svg", devices, 1200, 650, "比较压强式电容传声器、压强式动圈传声器和动圈扬声器对应的位移、速度、加速度控制区。")


def iso_points(q):
    pts = []
    for i in range(161):
        lx = -1 + 2 * i / 160
        z = 10 ** lx
        if math.isinf(q):
            d = 1 / abs(1-z*z) if abs(1-z*z) > 1e-8 else 20
        else:
            d = math.sqrt((1+(z/q)**2)/((1-z*z)**2+(z/q)**2))
        d = min(10, max(0.03, d))
        x = 475 + (lx+1)/2*665
        y = 600 - (math.log10(d)-math.log10(0.03))/(1-math.log10(0.03))*485
        pts.append(f"{x:.1f},{y:.1f}")
    return " ".join(pts)


iso_curves = []
for q, color, dash in [(0.5,"#64748b",""),(0.7,"#2a9d8f",""),(1.0,"#e28e2c",""),(2.5,"#d1495b",""),(5.0,"#7a5195",""),(math.inf,"#111827",' stroke-dasharray="8 6"')]:
    iso_curves.append(f'<polyline points="{iso_points(q)}" fill="none" stroke="{color}" stroke-width="3.2"{dash}/>' )


isolation = r'''
  <text x="55" y="48" class="title">基础激励下的隔振：位移传递比 Dξ</text>
  <text x="55" y="76" class="s">Dξ = 设备振幅 / 基础振幅；小于 1 才是真正隔振</text>
  <line x1="55" y1="92" x2="1145" y2="92" stroke="#cbd5e1" stroke-width="2"/>
  <g transform="translate(55 130)">
    <text x="0" y="0" class="h">振动怎样传进设备</text>
    <rect x="88" y="45" width="130" height="90" rx="3" fill="#b8d9ee" stroke="#172033" stroke-width="3"/>
    <text x="126" y="98" class="h">设备 Mₘ</text>
    <path d="M153 136 L153 164 L132 179 L174 198 L132 217 L174 236 L153 251" class="ink"/>
    <line x1="98" y1="165" x2="98" y2="237" class="ink"/><rect x="86" y="190" width="24" height="28" fill="#f6c36d" stroke="#172033" stroke-width="2"/>
    <line x1="48" y1="256" x2="258" y2="256" stroke="#172033" stroke-width="8"/>
    <path d="M55 294 L90 294" class="arrow"/><text x="101" y="301" class="t">基础位移 ξ₁</text>
    <text x="0" y="348" class="t">低频：设备跟着基础，Dξ ≈ 1</text>
    <text x="0" y="382" class="t">z ≈ 1：发生共振，Dξ &gt; 1</text>
    <text x="0" y="416" class="t">z &gt; √2：进入隔振区，Dξ &lt; 1</text>
    <rect x="0" y="444" width="350" height="112" rx="5" fill="#fff4e6" stroke="#e4b36b"/>
    <text x="18" y="476" class="h">阻尼的两面性</text>
    <text x="18" y="509" class="s">阻尼大：压低共振峰，但高频会多传一条黏性通道</text>
    <text x="18" y="540" class="s">阻尼小：高频隔振更好，但过共振区时风险更高</text>
  </g>
  <g>
    <rect x="475" y="115" width="665" height="485" fill="#fbfcfe" stroke="#cbd5e1"/>
    <line x1="475" y1="600" x2="1140" y2="600" class="axis"/><line x1="475" y1="115" x2="475" y2="600" class="axis"/>
    <line x1="475" y1="281.2" x2="1140" y2="281.2" class="grid"/>
    <line x1="807.5" y1="115" x2="807.5" y2="600" class="guide"/>
    <line x1="857.6" y1="115" x2="857.6" y2="600" stroke="#d1495b" stroke-width="2" stroke-dasharray="7 6"/>
    <text x="462" y="606" class="s" text-anchor="end">0.03</text><text x="462" y="287" class="s" text-anchor="end">1</text><text x="462" y="121" class="s" text-anchor="end">10</text>
    <text x="475" y="625" class="s" text-anchor="middle">0.1</text><text x="807.5" y="625" class="s" text-anchor="middle">1</text><text x="1140" y="625" class="s" text-anchor="middle">10</text>
    <text x="485" y="139" class="h">Dξ</text><text x="1040" y="654" class="t">z = f / f₀</text>
    <text x="785" y="102" class="s">共振</text><text x="865" y="139" class="s" fill="#d1495b">z = √2，所有曲线 Dξ = 1</text>
    <g clip-path="url(#isoClip)">
      __CURVES__
    </g>
    <g transform="translate(918 320)">
      <rect x="0" y="0" width="195" height="196" rx="5" fill="#ffffff" stroke="#cbd5e1"/>
      <text x="15" y="28" class="h">曲线参数</text>
      <text x="18" y="58" class="s" fill="#64748b">Qₘ = 0.5</text><text x="18" y="84" class="s" fill="#2a9d8f">Qₘ = 0.7</text>
      <text x="18" y="110" class="s" fill="#e28e2c">Qₘ = 1.0</text><text x="18" y="136" class="s" fill="#d1495b">Qₘ = 2.5</text>
      <text x="18" y="162" class="s" fill="#7a5195">Qₘ = 5.0</text><text x="108" y="162" class="s" fill="#111827">Qₘ → ∞</text>
      <text x="18" y="188" class="s">Q 越大，峰越高；高频尾部越低</text>
    </g>
  </g>
  <defs><clipPath id="isoClip"><rect x="475" y="115" width="665" height="485"/></clipPath></defs>
'''.replace("__CURVES__", "\n      ".join(iso_curves))
write("隔振传递比与Q.svg", isolation, 1200, 680, "左侧为基础激励隔振模型，右侧为不同机械品质因数下的位移传递比双对数曲线，并标明根号二分界。")


pickup = r'''
  <text x="55" y="48" class="title">拾振器：用内部质量块相对外壳的运动测量振动</text>
  <text x="55" y="76" class="s">外壳贴着被测物体；真正送给换能元件的是相对位移 ξ = ξ₂ − ξ₁</text>
  <line x1="55" y1="92" x2="1145" y2="92" stroke="#cbd5e1" stroke-width="2"/>
  <g transform="translate(55 125)">
    <rect x="0" y="0" width="300" height="420" rx="6" fill="#f5f9fc" stroke="#b8c8d8" stroke-width="2"/>
    <text x="20" y="36" class="h">内部结构</text>
    <rect x="64" y="65" width="172" height="268" fill="#ffffff" stroke="#172033" stroke-width="5"/>
    <rect x="106" y="102" width="88" height="68" fill="#b8d9ee" stroke="#172033" stroke-width="3"/>
    <text x="128" y="143" class="h">Mₘ</text>
    <path d="M150 171 L150 189 L131 204 L169 221 L131 238 L169 255 L150 272" class="ink"/>
    <line x1="150" y1="272" x2="150" y2="331" class="ink"/>
    <text x="196" y="224" class="t">Kₘ, Rₘ</text>
    <path d="M48 365 L103 365" class="arrow"/><text x="112" y="372" class="t">外壳 ξ₁</text>
    <text x="20" y="402" class="s">质量块绝对位移 ξ₂；输出观察 ξ₂ − ξ₁</text>
  </g>
  <g transform="translate(390 125)">
    <rect x="0" y="0" width="755" height="148" rx="6" fill="#eaf4fb" stroke="#9bc2dc"/>
    <text x="22" y="35" class="h">低频：f ≪ f₀，质量块基本跟随外壳</text>
    <text x="22" y="70" class="t">为了让质量块产生加速度，弹簧必须提供惯性力：Kₘξ ≈ −Mₘa₁</text>
    <text x="22" y="106" class="t">因此 ξ ≈ −a₁ / ω₀²，测相对位移即可反推外壳加速度</text>
    <text x="556" y="136" class="h" fill="#176f9f">低频区：测加速度</text>
  </g>
  <g transform="translate(390 294)">
    <rect x="0" y="0" width="755" height="116" rx="6" fill="#fff4e6" stroke="#e4b36b"/>
    <text x="22" y="36" class="h">固有频率附近：拾振器自己的共振混入测量</text>
    <text x="22" y="72" class="t">相对运动被额外放大，既不再简单代表加速度，也不再简单代表位移</text>
    <text x="582" y="101" class="h" fill="#c56c18">测量时避开</text>
  </g>
  <g transform="translate(390 431)">
    <rect x="0" y="0" width="755" height="148" rx="6" fill="#eee9f6" stroke="#b6a1cb"/>
    <text x="22" y="35" class="h">高频：f ≫ f₀，内部质量块因惯性近似不动</text>
    <text x="22" y="70" class="t">ξ₂ ≈ 0，而外壳仍移动：ξ = ξ₂ − ξ₁ ≈ −ξ₁</text>
    <text x="22" y="106" class="t">质量块成为近似静止的惯性参考点，相对位移大小近似等于外壳位移</text>
    <text x="585" y="136" class="h" fill="#725091">高频区：测位移</text>
  </g>
  <text x="55" y="626" class="t">同一结构的逻辑：隔振关心质量块绝对运动要小；拾振关心相对运动要能准确代表被测量。</text>
'''
write("拾振原理与工作区.svg", pickup, 1200, 660, "说明拾振器的外壳位移、内部质量块位移和相对位移，并比较低频测加速度、高频测位移以及共振区失真。")


def wave_points(kind, x0, y0, width, amp, cycles=2):
    pts = []
    npts = 320
    for i in range(npts + 1):
        u = cycles * i / npts
        x = x0 + width * i / npts
        if kind == "square":
            yv = 1 if (u % 1) < 0.5 else 0
        elif kind == "partial":
            phase = 2*math.pi*u
            yv = 0.5 + (2/math.pi)*sum(math.sin(n*phase)/n for n in (1,3,5,7))
        else:
            phase = 2*math.pi*u
            yv = 0.5 + 0.48*math.sin(3*phase)
        y = y0 - amp * (yv-0.5)
        pts.append(f"{x:.1f},{y:.1f}")
    return " ".join(pts)


fourier = f'''
  <text x="55" y="48" class="title">矩形周期力：谐波分解、系统筛选与波形失真</text>
  <text x="55" y="76" class="s">周期力先分解为各次简谐力；线性振子再按自己的频率响应分别改变每个谐波</text>
  <line x1="55" y1="92" x2="1145" y2="92" stroke="#cbd5e1" stroke-width="2"/>
  <g>
    <text x="60" y="130" class="h">输入：50% 占空比矩形周期力</text>
    <line x1="110" y1="222" x2="1090" y2="222" class="axis"/>
    <polyline points="{wave_points('square',110,190,980,115)}" fill="none" stroke="#176f9f" stroke-width="4"/>
    <text x="65" y="175" class="t">Fₐ</text><text x="65" y="235" class="t">0</text>
    <text x="870" y="250" class="s">只含直流分量与 1、3、5、7…次奇谐波</text>
  </g>
  <g>
    <rect x="55" y="280" width="535" height="270" rx="6" fill="#fff4e6" stroke="#e4b36b"/>
    <text x="78" y="318" class="h">某次谐波碰上共振</text>
    <text x="78" y="348" class="s">例如 3f ≈ f₀ 且阻尼很小，第三谐波被选择性放大</text>
    <line x1="95" y1="470" x2="555" y2="470" class="grid"/>
    <polyline points="{wave_points('resonant',95,425,460,98)}" fill="none" stroke="#d1495b" stroke-width="4"/>
    <text x="78" y="520" class="t">输出更像单一简谐波：系统造成严重波形失真</text>
  </g>
  <g>
    <rect x="610" y="280" width="535" height="270" rx="6" fill="#eaf5ef" stroke="#83b8a4"/>
    <text x="633" y="318" class="h">主要谐波都在弹性控制区</text>
    <text x="633" y="348" class="s">各次响应近似同乘 1/Kₘ，原有幅值比例和相位关系被保留</text>
    <line x1="650" y1="470" x2="1110" y2="470" class="grid"/>
    <polyline points="{wave_points('partial',650,425,460,98)}" fill="none" stroke="#2a9d8f" stroke-width="4"/>
    <text x="633" y="520" class="t">仅保留至 7 次谐波：已接近矩形，但边缘仍有截断起伏</text>
  </g>
  <g transform="translate(55 580)">
    <rect x="0" y="0" width="1090" height="82" rx="6" fill="#f5f7fa" stroke="#cbd5e1"/>
    <text x="20" y="31" class="t">设计思路：f₀ &gt; 7f 把主要谐波放在固有频率以下；Qₘ ≈ 1 压平靠近 f₀ 的过渡区。</text>
    <text x="20" y="62" class="t">注意：力谐波幅值含 1/n；换成位移还要除以 nω，所以一般项显式出现 1/n²。</text>
  </g>
'''
write("矩形周期力与振动失真.svg", fourier, 1200, 700, "展示矩形周期力、某次谐波共振后输出近似单频，以及主要谐波位于弹性控制区时的近似保形输出。")

print("generated", *(p.name for p in OUT.glob("*.svg") if p.name in {
    "电声器件与控制区.svg", "隔振传递比与Q.svg", "拾振原理与工作区.svg", "矩形周期力与振动失真.svg"
}))
