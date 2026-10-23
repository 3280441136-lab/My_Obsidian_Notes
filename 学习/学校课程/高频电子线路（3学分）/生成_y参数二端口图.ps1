Add-Type -AssemblyName System.Drawing

$outDir = Join-Path $PSScriptRoot 'hf_small_signal_assets'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null
$path = Join-Path $outDir 'y_parameter_two_port.png'

$w = 1500; $h = 860
$bmp = New-Object System.Drawing.Bitmap($w, $h)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.Clear([System.Drawing.Color]::White)

$black = [System.Drawing.Brushes]::Black
$blue = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(26, 82, 118))
$orange = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(196, 91, 25))
$pen = New-Object System.Drawing.Pen ([System.Drawing.Color]::Black), 4
$thin = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(70, 70, 70), 3)
$dash = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(120, 120, 120), 3)
$dash.DashStyle = [System.Drawing.Drawing2D.DashStyle]::Dash
$fontTitle = New-Object System.Drawing.Font('Microsoft YaHei UI', 30, [System.Drawing.FontStyle]::Bold)
$font = New-Object System.Drawing.Font('Microsoft YaHei UI', 25)
$fontSmall = New-Object System.Drawing.Font('Microsoft YaHei UI', 21)
$fontMath = New-Object System.Drawing.Font('Cambria', 27)

# Keep the source ASCII-safe. Decode \uXXXX labels at runtime so PowerShell's
# legacy script encoding cannot turn Chinese text into mojibake.
function C {
  param([string]$s)
  [regex]::Replace($s, '\\u([0-9A-Fa-f]{4})', { param($m) [char]([Convert]::ToInt32($m.Groups[1].Value, 16)) })
}

function Txt {
  param($s, $x, $y, $f, $b)
  if (-not $f) { $f = $font }
  if (-not $b) { $b = $black }
  $g.DrawString([string]$s, $f, $b, [float]$x, [float]$y)
}
function Arrow {
  param($x1,$y1,$x2,$y2,$p)
  if (-not $p) { $p = $pen }
  $g.DrawLine($p,$x1,$y1,$x2,$y2)
  $ang = [Math]::Atan2($y2-$y1,$x2-$x1)
  $len = 18; $a = 0.55
  $p1x = [int]($x2-$len*[Math]::Cos($ang-$a)); $p1y = [int]($y2-$len*[Math]::Sin($ang-$a))
  $p2x = [int]($x2-$len*[Math]::Cos($ang+$a)); $p2y = [int]($y2-$len*[Math]::Sin($ang+$a))
  $g.FillPolygon($black, [System.Drawing.Point[]]@([System.Drawing.Point]::new([int]$x2,[int]$y2),[System.Drawing.Point]::new($p1x,$p1y),[System.Drawing.Point]::new($p2x,$p2y)))
}

Txt (C '\u9AD8\u9891\u6676\u4F53\u7BA1\u7684 y \u53C2\u6570\u4E8C\u7AEF\u53E3\u7B49\u6548\u6A21\u578B') 310 45 $fontTitle $blue
Txt (C '\u7EA6\u5B9A\uFF1A\u4E24\u4E2A\u7AEF\u53E3\u7684\u7535\u6D41\u65B9\u5411\u90FD\u53D6\u4E3A\u6D41\u5165\u4E8C\u7AEF\u53E3\u7F51\u7EDC') 390 100 $fontSmall ([System.Drawing.Brushes]::DimGray)

# Two-port boundary and ports
$rect = New-Object System.Drawing.Rectangle(430,220,650,400)
$g.DrawRectangle($pen,$rect)
Txt (C '\u7EBF\u6027\u5316\u540E\u7684\u6709\u6E90\u4E8C\u7AEF\u53E3') 610 235 $fontSmall $blue

# Input/output terminal lines
$g.DrawLine($pen,170,310,430,310); $g.DrawLine($pen,170,530,430,530)
$g.DrawLine($pen,1080,310,1330,310); $g.DrawLine($pen,1080,530,1330,530)
Arrow 125 310 220 310; Arrow 125 530 220 530; Arrow 1285 310 1200 310; Arrow 1285 530 1200 530
Txt 'i1' 230 270 $fontMath $orange; Txt 'i2' 1170 270 $fontMath $orange
Txt 'u1' 275 545 $fontMath $blue; Txt 'u2' 1130 545 $fontMath $blue
Txt (C '\u8F93\u5165\u7AEF\u53E3 1') 80 590 $fontSmall $blue; Txt (C '\u8F93\u51FA\u7AEF\u53E3 2') 1190 590 $fontSmall $blue

# Internal y11 branch: admittance symbol
$g.DrawLine($thin,550,310,550,360)
$g.DrawLine($thin,520,380,580,380); $g.DrawLine($thin,520,395,580,395); $g.DrawLine($thin,550,395,550,470)
Txt 'y11' 500 420 $fontMath $blue

# reverse controlled current source y12*u2 (diamond-ish)
$pts = @([System.Drawing.PointF]::new(735,345),[System.Drawing.PointF]::new(785,395),[System.Drawing.PointF]::new(735,445),[System.Drawing.PointF]::new(685,395))
$g.DrawPolygon($thin,$pts)
Arrow 735 430 735 370 $thin
Txt 'y12*u2' 650 460 $fontSmall $orange

# forward controlled current source y21*u1
$pts2 = @([System.Drawing.PointF]::new(900,345),[System.Drawing.PointF]::new(950,395),[System.Drawing.PointF]::new(900,445),[System.Drawing.PointF]::new(850,395))
$g.DrawPolygon($thin,$pts2)
Arrow 900 370 900 430 $thin
Txt 'y21*u1' 820 460 $fontSmall $orange

# output admittance y22
$g.DrawLine($thin,1010,310,1010,360)
$g.DrawLine($thin,980,380,1040,380); $g.DrawLine($thin,980,395,1040,395); $g.DrawLine($thin,1010,395,1010,470)
Txt 'y22' 965 420 $fontMath $blue

# common reference line
$g.DrawLine($dash,500,500,1040,500)
Txt (C '\u4EA4\u6D41\u53C2\u8003\u7AEF\uFF08\u516C\u5171\u7AEF\uFF09') 630 515 $fontSmall ([System.Drawing.Brushes]::DimGray)

# equations panel
$g.DrawRectangle($dash,170,670,1160,125)
Txt 'i1 = y11*u1 + y12*u2' 235 700 $fontMath $blue
Txt 'i2 = y21*u1 + y22*u2' 825 700 $fontMath $blue
Txt (C '\u6BCF\u4E2A y \u53C2\u6570\u7684\u5355\u4F4D\u90FD\u662F S\uFF08\u897F\u95E8\u5B50\uFF09') 520 750 $fontSmall ([System.Drawing.Brushes]::DimGray)

$bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose(); $bmp.Dispose()
Write-Output $path
