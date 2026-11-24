from PIL import Image, ImageDraw, ImageFont
from pathlib import Path
import math

src = Path(r'C:\Users\DongXinRui\Desktop\作业3_题图\image2.png')
out = Path(__file__).with_name('工程制图作业3_相贯线重做.png')
S = 3
im = Image.open(src).convert('RGB')
im = im.resize((im.width*S, im.height*S), Image.Resampling.LANCZOS)
d = ImageDraw.Draw(im)
font = ImageFont.truetype(r'C:\Windows\Fonts\arial.ttf', 13*S)
blue=(32,101,184); green=(0,133,91); red=(195,56,64); white=(255,255,255)

def line(a,b,color,width=1):
    d.line((a[0]*S,a[1]*S,b[0]*S,b[1]*S), fill=color, width=width*S)
def dash(a,b,color,width=1,on=5,off=4):
    L=math.dist(a,b)
    if L==0:return
    ux=(b[0]-a[0])/L; uy=(b[1]-a[1])/L
    t=0
    while t<L:
        u=min(t+on,L)
        line((a[0]+ux*t,a[1]+uy*t),(a[0]+ux*u,a[1]+uy*u),color,width)
        t+=on+off
def dot(p,label,color,off=(5,-16)):
    x,y=p; rr=3*S
    d.ellipse((x*S-rr,y*S-rr,x*S+rr,y*S+rr),fill=white,outline=color,width=2*S)
    if label:
        d.text(((x+off[0])*S,(y+off[1])*S),label,font=font,fill=color,stroke_width=2*S,stroke_fill=white)

# Measured from the original figure. x is along the horizontal cylinder,
# y is depth (downward in the plan view), z is height (upward in front/side).
xc, yp, zs, xs = 170.0, 414.0, 144.0, 529.0
R, r = 106.0, 65.0

# One representative station: front half of the vertical hole.
x=125.0
depth=math.sqrt(r*r-(x-xc)**2)
plan=(x,yp+depth)
side_outer=(xs+depth,zs-math.sqrt(R*R-depth*depth))
side_inner=(xs+depth,zs-math.sqrt(r*r-depth*depth))
front_outer=(x,side_outer[1]); front_inner=(x,side_inner[1])
line(plan,front_outer,blue,1)
line(front_outer,side_outer,blue,1)
line(front_inner,side_inner,blue,1)
for p,label in [(plan,'P'),(front_outer,'P1'),(side_outer,'P2'),(front_inner,'Q1'),(side_inner,'Q2')]:
    dot(p,label,blue)

# Outer-cylinder/vertical-hole intersection: visible saddle curve.
pts=[]
for j in range(261):
    x=xc-r+2*r*j/260
    depth=math.sqrt(max(0,r*r-(x-xc)**2))
    pts.append((x,zs-math.sqrt(R*R-depth*depth)))
d.line([(round(x*S),round(y*S)) for x,y in pts],fill=green,width=3*S,joint='curve')

# The two equal-radius bores also intersect. Their upper internal edge
# projects as a V: height above the common center equals |x-xc|.
dash((31,zs-r),(xc-r,zs-r),red,1)
dash((xc+r,zs-r),(311,zs-r),red,1)
dash((xc-r,zs-r),(xc,zs),red,1)
dash((xc,zs),(xc+r,zs-r),red,1)
for p,label in [((xc-r,zs-r),'A'),((xc,zs),'B'),((xc+r,zs-r),'C')]:
    dot(p,label,red)

# Highlight the two source circles without changing their original geometry.
dot((xs,zs-R),'outer',green,(5,-17))
dot((xs,zs-r),'inner',red,(5,-17))
im.save(out)
print(out)
