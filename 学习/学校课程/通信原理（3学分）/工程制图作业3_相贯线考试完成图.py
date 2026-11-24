from PIL import Image, ImageDraw
from pathlib import Path
import math

source = Path(r'C:\Users\DongXinRui\Desktop\作业3_题图\image2.png')
output = Path(__file__).with_name('工程制图作业3_相贯线考试完成图.png')
scale = 4
im = Image.open(source).convert('RGB')
im = im.resize((im.width*scale, im.height*scale), Image.Resampling.LANCZOS)
draw = ImageDraw.Draw(im)
ink = (15,15,15)

def segment(a,b,width=2):
    draw.line((a[0]*scale,a[1]*scale,b[0]*scale,b[1]*scale),fill=ink,width=width*scale)

def dashed(a,b,width=1,dash=5,gap=4):
    length=math.dist(a,b)
    dx=(b[0]-a[0])/length
    dy=(b[1]-a[1])/length
    t=0.0
    while t<length:
        u=min(t+dash,length)
        segment((a[0]+dx*t,a[1]+dy*t),(a[0]+dx*u,a[1]+dy*u),width)
        t+=dash+gap

# Visible upper intersection: vertical bore with outer wall of horizontal tube.
cx,zc,R,r=170.0,144.0,106.0,65.0
curve=[]
for j in range(401):
    x=cx-r+2*r*j/400
    depth=math.sqrt(max(0,r*r-(x-cx)**2))
    z=zc-math.sqrt(R*R-depth*depth)
    curve.append((x*scale,z*scale))
draw.line(curve,fill=ink,width=3*scale,joint='curve')

# Hidden upper axial-bore edge and the equal-diameter bore intersection.
z_top=zc-r
dashed((31,z_top),(cx-r,z_top))
dashed((cx-r,z_top),(cx,zc))
dashed((cx,zc),(cx+r,z_top))
dashed((cx+r,z_top),(311,z_top))

im.save(output)
print(output)
