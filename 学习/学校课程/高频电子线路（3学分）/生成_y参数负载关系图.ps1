Add-Type -AssemblyName System.Drawing
$outDir = Join-Path $PSScriptRoot 'hf_small_signal_assets'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null
$path = Join-Path $outDir 'y_parameter_with_load.png'
$w = 1500; $h = 820
$bmp = New-Object System.Drawing.Bitmap($w, $h)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.Clear([System.Drawing.Color]::White)
$black = [System.Drawing.Brushes]::Black
$blue = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(26,82,118))
$orange = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(196,91,25))
$gray = [System.Drawing.Brushes]::DimGray
$pen = New-Object System.Drawing.Pen ([System.Drawing.Color]::Black), 4
$thin = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(70,70,70), 3)
$dash = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(120,120,120), 3)
$dash.DashStyle = [System.Drawing.Drawing2D.DashStyle]::Dash
$fTitle = New-Object System.Drawing.Font('Microsoft YaHei UI', 29, [System.Drawing.FontStyle]::Bold)
$f = New-Object System.Drawing.Font('Microsoft YaHei UI', 24)
$fSmall = New-Object System.Drawing.Font('Microsoft YaHei UI', 20)
$fMath = New-Object System.Drawing.Font('Cambria', 27)
function C { param([string]$s) [regex]::Replace($s,'\\u([0-9A-Fa-f]{4})',{param($m) [char]([Convert]::ToInt32($m.Groups[1].Value,16))}) }
function Txt { param($s,$x,$y,$font,$brush) if (-not $font){$font=$f}; if(-not $brush){$brush=$black}; $g.DrawString([string]$s,$font,$brush,[float]$x,[float]$y) }
function Arrow { param($x1,$y1,$x2,$y2,$p) if(-not $p){$p=$pen}; $g.DrawLine($p,$x1,$y1,$x2,$y2); $ang=[Math]::Atan2($y2-$y1,$x2-$x1); $len=18; $a=.55; $p1x=[int]($x2-$len*[Math]::Cos($ang-$a)); $p1y=[int]($y2-$len*[Math]::Sin($ang-$a)); $p2x=[int]($x2-$len*[Math]::Cos($ang+$a)); $p2y=[int]($y2-$len*[Math]::Sin($ang+$a)); $g.FillPolygon($black,[System.Drawing.Point[]]@([System.Drawing.Point]::new([int]$x2,[int]$y2),[System.Drawing.Point]::new($p1x,$p1y),[System.Drawing.Point]::new($p2x,$p2y))) }

Txt (C '\u9AD8\u9891\u5C0F\u4FE1\u53F7\u653E\u5927\u5668\u63A5\u5165\u8D1F\u8F7D\u540E\u7684 y \u53C2\u6570\u5173\u7CFB') 300 35 $fTitle $blue
Txt (C '\u8F93\u51FA\u7AEF\u7535\u6D41\u65B9\u5411\u4ECD\u53D6\u4E3A\u6D41\u5165\u4E8C\u7AEF\u53E3') 520 88 $fSmall $gray

$g.DrawRectangle($pen,270,185,650,360)
Txt (C '\u7EBF\u6027\u5316\u6709\u6E90\u4E8C\u7AEF\u53E3') 475 205 $fSmall $blue
$g.DrawLine($pen,80,275,270,275); $g.DrawLine($pen,80,455,270,455)
Arrow 95 275 185 275; Arrow 95 455 185 455
Txt 'i1' 190 235 $fMath $orange; Txt 'u1' 190 470 $fMath $blue
Txt (C '\u8F93\u5165\u7AEF') 95 505 $fSmall $blue
$g.DrawLine($pen,920,275,1100,275); $g.DrawLine($pen,920,455,1100,455)
Arrow 1085 275 980 275; Arrow 1085 455 980 455
Txt 'i2' 965 235 $fMath $orange; Txt 'u2' 965 470 $fMath $blue

# Load resistor / impedance block
$g.DrawLine($thin,1100,275,1100,330); $g.DrawLine($thin,1100,400,1100,455)
$g.DrawRectangle($thin,1060,330,80,70)
Txt 'ZL' 1080 345 $fMath $blue
Txt (C '\u8D1F\u8F7D') 1070 505 $fSmall $blue
Arrow 1220 275 1135 275 $thin
Txt 'iL' 1160 235 $fMath $orange

$g.DrawRectangle($dash,120,610,1260,140)
Txt (C '\u8D1F\u8F7D\u7535\u6D41\u4E0E\u4E8C\u7AEF\u53E3\u7535\u6D41\u65B9\u5411\u76F8\u53CD') 245 630 $fSmall $gray
Txt 'i2 = -u2/ZL = -YL*u2' 250 675 $fMath $blue
Txt 'Yin = i1/u1 = y11 - y12*y21/(y22 + YL)' 760 675 $fMath $blue

$bmp.Save($path,[System.Drawing.Imaging.ImageFormat]::Png); $g.Dispose(); $bmp.Dispose(); Write-Output $path
