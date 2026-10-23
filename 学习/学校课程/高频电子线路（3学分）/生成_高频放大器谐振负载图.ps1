Add-Type -AssemblyName System.Drawing
$outDir = Join-Path $PSScriptRoot 'hf_small_signal_assets'; New-Item -ItemType Directory -Force -Path $outDir | Out-Null
$path = Join-Path $outDir 'tuned_amplifier_parallel_resonant_load.png'
$bmp = New-Object System.Drawing.Bitmap(1500,850); $g=[System.Drawing.Graphics]::FromImage($bmp); $g.SmoothingMode=[System.Drawing.Drawing2D.SmoothingMode]::AntiAlias; $g.Clear([System.Drawing.Color]::White)
$black=[System.Drawing.Brushes]::Black; $blue=New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(26,82,118)); $orange=New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(196,91,25)); $gray=[System.Drawing.Brushes]::DimGray
$pen=New-Object System.Drawing.Pen ([System.Drawing.Color]::Black),4; $thin=New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(70,70,70),3); $dash=New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(120,120,120),3); $dash.DashStyle=[System.Drawing.Drawing2D.DashStyle]::Dash
$ft=New-Object System.Drawing.Font('Microsoft YaHei UI',29,[System.Drawing.FontStyle]::Bold); $f=New-Object System.Drawing.Font('Microsoft YaHei UI',23); $fs=New-Object System.Drawing.Font('Microsoft YaHei UI',19); $fm=New-Object System.Drawing.Font('Cambria',27)
function C { param([string]$s) [regex]::Replace($s,'\\u([0-9A-Fa-f]{4})',{param($m) [char]([Convert]::ToInt32($m.Groups[1].Value,16))}) }
function T { param($s,$x,$y,$font,$brush) if(-not $font){$font=$f}; if(-not $brush){$brush=$black}; $g.DrawString([string]$s,$font,$brush,[float]$x,[float]$y) }
function A { param($x1,$y1,$x2,$y2,$p) if(-not $p){$p=$pen}; $g.DrawLine($p,$x1,$y1,$x2,$y2); $ang=[Math]::Atan2($y2-$y1,$x2-$x1); $len=18; $aa=.55; $x3=[int]($x2-$len*[Math]::Cos($ang-$aa)); $y3=[int]($y2-$len*[Math]::Sin($ang-$aa)); $x4=[int]($x2-$len*[Math]::Cos($ang+$aa)); $y4=[int]($y2-$len*[Math]::Sin($ang+$aa)); $g.FillPolygon($black,[System.Drawing.Point[]]@([System.Drawing.Point]::new([int]$x2,[int]$y2),[System.Drawing.Point]::new($x3,$y3),[System.Drawing.Point]::new($x4,$y4))) }
T (C '\u9AD8\u9891\u5C0F\u4FE1\u53F7\u653E\u5927\u5668\u7684\u5E76\u8054\u8C10\u632F\u8D1F\u8F7D') 365 35 $ft $blue
T (C '\u53D7\u63A7\u8F93\u51FA\u7535\u6D41\u7ECF\u9AD8\u963B\u6297\u8C10\u632F\u56DE\u8DEF\u8F6C\u6362\u4E3A\u9AD8\u7535\u538B') 330 88 $fs $gray

$g.DrawRectangle($pen,120,220,430,330); T (C '\u6676\u4F53\u7BA1\u6709\u6E90\u4E8C\u7AEF\u53E3') 210 245 $fs $blue
$g.DrawLine($pen,40,315,120,315); $g.DrawLine($pen,40,455,120,455); A 50 315 105 315; A 50 455 105 455; T 'u1' 65 470 $fm $blue; T 'i1' 65 275 $fm $orange
$g.DrawLine($pen,550,315,760,315); $g.DrawLine($pen,550,455,760,455); A 745 315 600 315; T 'u2' 610 470 $fm $blue; T 'iL' 625 275 $fm $orange

# parallel branches from output node to common return
$g.DrawLine($thin,760,315,760,365); $g.DrawLine($thin,760,455,760,505); $g.DrawLine($thin,700,505,920,505)
# resistor branch
$g.DrawLine($thin,700,315,700,365); $g.DrawRectangle($thin,670,365,60,80); $g.DrawLine($thin,700,445,700,505); T 'R' 690 390 $fm $blue
# inductor branch
$g.DrawLine($thin,790,315,790,360); $g.DrawArc($thin,775,350,30,60,180,180); $g.DrawArc($thin,785,350,30,60,180,180); $g.DrawArc($thin,795,350,30,60,180,180); $g.DrawLine($thin,790,410,790,505); T 'L' 780 420 $fm $blue
# capacitor branch
$g.DrawLine($thin,880,315,880,375); $g.DrawLine($thin,850,375,910,375); $g.DrawLine($thin,850,395,910,395); $g.DrawLine($thin,880,395,880,505); T 'C' 870 420 $fm $blue
T (C '\u5E76\u8054\u8C10\u632F\u56DE\u8DEF') 715 545 $f $blue; A 970 315 800 315 $thin; T 'u_o' 980 345 $fm $orange

$g.DrawRectangle($dash,120,650,1260,125); T (C '\u8C10\u632F\u65F6\uFF1A\u7535\u611F\u652F\u8DEF\u4E0E\u7535\u5BB9\u652F\u8DEF\u7684\u65E0\u529F\u7535\u6D41\u4E92\u76F8\u62B5\u6D88') 190 668 $fs $gray; T 'Zp(f0) = Re' 260 715 $fm $blue; T '|uo| ~= |y21| Re |u1|' 780 715 $fm $blue
$bmp.Save($path,[System.Drawing.Imaging.ImageFormat]::Png); $g.Dispose(); $bmp.Dispose(); Write-Output $path
