from PIL import Image, ImageDraw
from pathlib import Path
import math

source=Path(r'C:\Users\DongXinRui\Desktop\作业3_题图\image2.png')
output=Path(__file__).with_name('工程制图作业3_相贯线考试作图.png')
S=4
im=Image.open(source).convert('RGB').resize((669*S,551*S),Image.Resampling.LANCZOS)
d=ImageDraw.Draw(im)
final=(12,12,12)
aux=(150,150,150)
white=(255,255,255)
cx,cy,zc,sx=170.0,414.0,144.0,529.0
R,r=106.0,65.0

def line(a,b,col=aux,w=1):
    d.line((a[0]*S,a[1]*S,b[0]*S,b[1]*S),fill=col,width=w*S)
def dash(a,b,col=final,w=1,on=5,off=4):
    L=math.dist(a,b)
    ux=(b[0]-a[0])/L;uy=(b[1]-a[1])/L
    t=0
    while t<L:
        u=min(t+on,L)
        line((a[0]+ux*t,a[1]+uy*t),(a[0]+ux*u,a[1]+uy*u),col,w)
        t+=on+off
def point(p,col=aux):
    x,y=p; rad=2*S
    d.ellipse((x*S-rad,y*S-rad,x*S+rad,y*S+rad),fill=white,outline=col,width=S)

# 45-degree transfer line: plan depth becomes horizontal coordinate in side view.
line((419,304),(639,524),aux,1)

# Five symmetric stations, including the end and middle characteristic points.
for x in [105,125,170,215,235]:
    depth=math.sqrt(max(0,r*r-(x-cx)**2))
    plan=(x,cy+depth)
    miter=(sx+depth,cy+depth)
    side_outer=(sx+depth,zc-math.sqrt(R*R-depth*depth))
    front_outer=(x,side_outer[1])
    line(plan,miter)
    line(miter,side_outer)
    line(plan,front_outer)
    line(front_outer,side_outer)
    for p in [plan,miter,side_outer,front_outer]: point(p)

# A few stations on the axial bore locate its hidden intersection with the
# vertical bore. The vertical projectors above already supply their x positions.
for x in [125,215]:
    depth=math.sqrt(max(0,r*r-(x-cx)**2))
    inner_y=zc-math.sqrt(max(0,r*r-depth*depth))
    side_inner=(sx+depth,inner_y)
    front_inner=(x,inner_y)
    line(front_inner,side_inner)
    point(side_inner)
    point(front_inner)

# Draw the actual visible intersection last, over fine construction lines.
curve=[]
for i in range(401):
    x=cx-r+2*r*i/400
    depth=math.sqrt(max(0,r*r-(x-cx)**2))
    y=zc-math.sqrt(R*R-depth*depth)
    curve.append((x*S,y*S))
d.line(curve,fill=final,width=3*S,joint='curve')

# Upper axial-bore edge and equal-diameter internal intersection are hidden.
top=zc-r
dash((31,top),(cx-r,top))
dash((cx-r,top),(cx,zc))
dash((cx,zc),(cx+r,top))
dash((cx+r,top),(311,top))

im.save(output)
print(output)
