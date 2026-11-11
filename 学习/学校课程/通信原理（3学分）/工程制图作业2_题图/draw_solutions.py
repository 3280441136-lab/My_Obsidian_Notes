from PIL import Image, ImageDraw, ImageFont
from pathlib import Path
import math

ROOT = Path(__file__).parent
S = 3
BLUE = (25, 105, 190)
GREEN = (0, 132, 94)
RED = (207, 54, 75)
WHITE = (255, 255, 255)
FONT = ImageFont.truetype(r"C:\Windows\Fonts\arial.ttf", 15 * S)


def setup(name):
    src = Image.open(ROOT / name).convert("RGB")
    im = src.resize((src.width * S, src.height * S), Image.Resampling.LANCZOS)
    return im, ImageDraw.Draw(im)


def line(d, a, b, color, width=2):
    d.line((a[0] * S, a[1] * S, b[0] * S, b[1] * S), fill=color, width=width * S)


def dashed(d, a, b, color, width=2, on=8, off=6):
    length = math.dist(a, b)
    t = 0
    while t < length:
        end = min(t + on, length)
        p = (a[0] + (b[0] - a[0]) * t / length,
             a[1] + (b[1] - a[1]) * t / length)
        q = (a[0] + (b[0] - a[0]) * end / length,
             a[1] + (b[1] - a[1]) * end / length)
        line(d, p, q, color, width)
        t += on + off


def dot(d, p, label, offset=(6, -21), color=GREEN):
    x, y = p[0] * S, p[1] * S
    r = 4 * S
    d.ellipse((x-r, y-r, x+r, y+r), fill=WHITE, outline=color, width=2*S)
    d.text(((p[0]+offset[0])*S, (p[1]+offset[1])*S), label, font=FONT,
           fill=color, stroke_width=2*S, stroke_fill=WHITE)


# 1. Horizontal line: height is drawn 30 mm on paper. The pixel offset below
# only makes the construction legible in this explanation image.
im, d = setup("image1.png")
for x, y in ((93, 338), (219, 428)):
    dashed(d, (x, y), (x, 249), BLUE, 1)
    dashed(d, (x, y), (293+y-279, y), BLUE, 1)
    dashed(d, (293+y-279, y), (293+y-279, 249), BLUE, 1)
line(d, (93, 249), (219, 249), GREEN, 3)
line(d, (352, 249), (442, 249), GREEN, 3)
dot(d, (93, 249), "a'", (-22, -21))
dot(d, (219, 249), "b'", (4, -21))
dot(d, (352, 249), "a''", (-20, -23))
dot(d, (442, 249), "b''", (5, -23))
im.save(ROOT / "1_水平线其余两面投影.png")

# 2(a). The circular plane is edge-on in the horizontal projection.
im, d = setup("image2.png")
k = (186.16, 351)
kp = (186.16, 99.64)
line(d, (106, 351), (214, 351), BLUE, 2)
dashed(d, k, kp, BLUE, 1)
# CD is behind the disk between the first circle crossing and K.
hidden_a = (111, 136)
line(d, hidden_a, kp, WHITE, 6)
dashed(d, hidden_a, kp, RED, 2)
dot(d, k, "k", (5, 7))
dot(d, kp, "k'", (5, -25))
im.save(ROOT / "2a_圆形平面与直线交点.png")

# 2(b). Use a horizontal auxiliary section through the point projection a'=b'.
im, d = setup("image2.png")
u1 = (498.86, 124)
u2 = (738.52, 124)
h1 = (498.86, 366.17)
h2 = (738.52, 280.25)
k = (539, 351.78)
dashed(d, (455, 124), (740, 124), BLUE, 1)
dashed(d, u1, h1, BLUE, 1)
dashed(d, u2, h2, BLUE, 1)
line(d, h1, h2, BLUE, 2)
line(d, k, (539, 382), WHITE, 6)
dashed(d, k, (539, 382), RED, 2)
dot(d, u1, "1'", (-14, -28), BLUE)
dot(d, u2, "2'", (4, -28), BLUE)
dot(d, h1, "1", (-18, 4), BLUE)
dot(d, h2, "2", (6, 4), BLUE)
dot(d, k, "k", (8, 3))
dot(d, (539, 124), "k'=a'=b'", (8, 6))
im.save(ROOT / "2b_三角形平面与直线交点.png")

# 3. Plane P projects to p in plan. Its crossings with ac and bc locate M,N.
im, d = setup("image3.png")
a, b, c = (263, 589), (388, 745), (724, 522)
ap, bp, cp = (263, 295), (388, 102), (724, 275)
m, n = (367.96, 573.75), (489.03, 677.95)
mp = (m[0], ap[1] + (cp[1]-ap[1])*(m[0]-ap[0])/(cp[0]-ap[0]))
np = (n[0], bp[1] + (cp[1]-bp[1])*(n[0]-bp[0])/(cp[0]-bp[0]))
line(d, ap, bp, BLUE, 2)
line(d, bp, np, BLUE, 2)
line(d, ap, mp, BLUE, 2)
right_lower = (632, ap[1] + (cp[1]-ap[1])*(632-ap[0])/(cp[0]-ap[0]))
right_upper = (632, bp[1] + (cp[1]-bp[1])*(632-bp[0])/(cp[0]-bp[0]))
line(d, mp, right_lower, WHITE, 5)
line(d, np, right_upper, WHITE, 5)
dashed(d, mp, right_lower, RED, 2)
dashed(d, np, right_upper, RED, 2)
line(d, mp, np, GREEN, 3)
line(d, m, n, GREEN, 3)
dashed(d, m, mp, BLUE, 1)
dashed(d, n, np, BLUE, 1)
dot(d, m, "m", (-24, -12))
dot(d, n, "n", (8, 5))
dot(d, mp, "m'", (7, 0))
dot(d, np, "n'", (8, -20))
im.save(ROOT / "3_两平面交线.png")
