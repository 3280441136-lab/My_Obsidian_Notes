Add-Type -AssemblyName System.Drawing
$ErrorActionPreference = 'Stop'
$output = Join-Path $PSScriptRoot 'hf_small_signal_assets\small_signal_power_gain.png'
$bmp = [System.Drawing.Bitmap]::new(1550,780)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.Clear([System.Drawing.Color]::White)
$ink=[System.Drawing.Color]::FromArgb(30,40,47)
$blue=[System.Drawing.Color]::FromArgb(29,78,110)
$orange=[System.Drawing.Color]::FromArgb(190,80,46)
$gray=[System.Drawing.Color]::FromArgb(116,124,130)
$p=[System.Drawing.Pen]::new($ink,4)
$pThin=[System.Drawing.Pen]::new($gray,2)
$pDash=[System.Drawing.Pen]::new($gray,2)
$pDash.DashStyle=[System.Drawing.Drawing2D.DashStyle]::Dash
$bInk=[System.Drawing.SolidBrush]::new($ink)
$bBlue=[System.Drawing.SolidBrush]::new($blue)
$bOrange=[System.Drawing.SolidBrush]::new($orange)
$bGray=[System.Drawing.SolidBrush]::new($gray)
$fTitle=[System.Drawing.Font]::new('Microsoft YaHei UI',29,[System.Drawing.FontStyle]::Bold)
$f=[System.Drawing.Font]::new('Microsoft YaHei UI',23)
$fSm=[System.Drawing.Font]::new('Microsoft YaHei UI',19)
function C { param([string]$s) [regex]::Replace($s,'\\u([0-9A-Fa-f]{4})',{param($m) [char]([Convert]::ToInt32($m.Groups[1].Value,16))}) }
function T { param([string]$s,[float]$x,[float]$y,$font=$f,$brush=$bInk) $g.DrawString($s,$font,$brush,$x,$y) }
function L { param($x1,$y1,$x2,$y2,$pen=$p) $g.DrawLine($pen,[float]$x1,[float]$y1,[float]$x2,[float]$y2) }
function Arrow { param($x1,$y1,$x2,$y2,$pen=$p)
  L $x1 $y1 $x2 $y2 $pen
  $a=[Math]::Atan2($y2-$y1,$x2-$x1); $d=15; $b=.55
  $x3=[int]($x2-$d*[Math]::Cos($a-$b)); $y3=[int]($y2-$d*[Math]::Sin($a-$b))
  $x4=[int]($x2-$d*[Math]::Cos($a+$b)); $y4=[int]($y2-$d*[Math]::Sin($a+$b))
  $g.FillPolygon($bInk,[System.Drawing.Point[]]@([System.Drawing.Point]::new([int]$x2,[int]$y2),[System.Drawing.Point]::new($x3,$y3),[System.Drawing.Point]::new($x4,$y4)))
}
T (C '\u9AD8\u9891\u5C0F\u4FE1\u53F7\u653E\u5927\u7EA7\u7684\u529F\u7387\u5173\u7CFB') 470 32 $fTitle $bBlue
T (C '\u7B80\u5316\u7AEF\u53E3\u56FE\uFF1A\u76F4\u6D41\u504F\u7F6E\u548C\u9009\u9891\u7F51\u7EDC\u7684\u5143\u4EF6\u672A\u5C55\u5F00') 400 87 $fSm $bGray

$yt=320; $yb=565
# voltage source and series source resistance
$g.DrawEllipse($p,80,388,85,85)
L 122 $yt 122 388; L 122 473 122 $yb
L 122 $yt 260 $yt
$g.DrawRectangle($p,260,291,150,58)
L 410 $yt 555 $yt
L 122 $yb 1390 $yb
T (C '\u4FE1\u53F7\u6E90') 62 585 $fSm $bBlue
T (C '\u6E90\u5185\u963B') 285 252 $fSm $bBlue
T (C '\u8F93\u5165\u7AEF') 456 585 $fSm $bBlue
# active stage with continuous input and output ports
$g.DrawRectangle($p,555,265,435,300)
T (C '\u6676\u4F53\u7BA1\u4E0E\u9009\u9891\u7F51\u7EDC') 625 353 $f $bBlue
T (C '\u6709\u6E90\u5C0F\u4FE1\u53F7\u653E\u5927\u7EA7') 625 405 $fSm $bGray
L 990 $yt 1242 $yt
$g.DrawRectangle($p,1200,395,85,100)
L 1242 $yt 1242 395; L 1242 495 1242 $yb
T (C '\u8D1F\u8F7D') 1200 585 $fSm $bBlue
# voltage markers at actual port node pairs
L 520 350 520 530 $pThin; L 510 350 530 350 $pThin; L 510 530 530 530 $pThin
T (C '\u8F93\u5165\u7535\u538B') 420 374 $fSm $bOrange
L 1365 350 1365 530 $pThin; L 1355 350 1375 350 $pThin; L 1355 530 1375 530 $pThin
T (C '\u8D1F\u8F7D\u7535\u538B') 1300 374 $fSm $bOrange
# energy arrows stay outside the actual circuit
Arrow 425 215 575 215 $pThin
T (C '\u8F93\u5165\u7AEF\u5438\u6536\u7684\u4FE1\u53F7\u529F\u7387') 425 175 $fSm $bBlue
Arrow 990 215 1200 215 $pThin
T (C '\u8D1F\u8F7D\u83B7\u5F97\u7684\u8F93\u51FA\u529F\u7387') 980 175 $fSm $bOrange
Arrow 773 160 773 265 $pDash
T (C '\u76F4\u6D41\u7535\u6E90\u8865\u5145\u80FD\u91CF') 700 125 $fSm $bGray

T (C '\u7535\u538B\u589E\u76CA\u770B\u7535\u538B\u6BD4\uFF1B\u529F\u7387\u589E\u76CA\u770B\u8F93\u51FA\u548C\u8F93\u5165\u7684\u6709\u529F\u529F\u7387\u6BD4\u3002') 340 690 $f $bInk
$bmp.Save($output,[System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose(); $bmp.Dispose(); Write-Output $output
