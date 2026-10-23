Add-Type -AssemblyName System.Drawing
$ErrorActionPreference='Stop'
$output=Join-Path $PSScriptRoot 'hf_small_signal_assets\cascaded_single_tuned_bandwidth.png'
$bmp=[System.Drawing.Bitmap]::new(1550,820)
$g=[System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode=[System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.Clear([System.Drawing.Color]::White)
$ink=[System.Drawing.Color]::FromArgb(29,39,47)
$gray=[System.Drawing.Color]::FromArgb(125,134,141)
$blue=[System.Drawing.Color]::FromArgb(35,98,141)
$orange=[System.Drawing.Color]::FromArgb(193,81,48)
$p=[System.Drawing.Pen]::new($ink,3)
$pAxis=[System.Drawing.Pen]::new($gray,2)
$pGuide=[System.Drawing.Pen]::new($gray,1.5)
$pGuide.DashStyle=[System.Drawing.Drawing2D.DashStyle]::Dash
$pBlue=[System.Drawing.Pen]::new($blue,4)
$pOrange=[System.Drawing.Pen]::new($orange,4)
$bInk=[System.Drawing.SolidBrush]::new($ink)
$bBlue=[System.Drawing.SolidBrush]::new($blue)
$bOrange=[System.Drawing.SolidBrush]::new($orange)
$bGray=[System.Drawing.SolidBrush]::new($gray)
$fTitle=[System.Drawing.Font]::new('Microsoft YaHei UI',29,[System.Drawing.FontStyle]::Bold)
$f=[System.Drawing.Font]::new('Microsoft YaHei UI',23)
$fSm=[System.Drawing.Font]::new('Microsoft YaHei UI',18)
function C { param([string]$s) [regex]::Replace($s,'\\u([0-9A-Fa-f]{4})',{param($m) [char]([Convert]::ToInt32($m.Groups[1].Value,16))}) }
function T { param([string]$s,[float]$x,[float]$y,$font=$f,$brush=$bInk) $g.DrawString($s,$font,$brush,$x,$y) }
function L { param($x1,$y1,$x2,$y2,$pen=$p) $g.DrawLine($pen,[float]$x1,[float]$y1,[float]$x2,[float]$y2) }
function Arrow {param($x1,$y1,$x2,$y2)
  L $x1 $y1 $x2 $y2
  $g.FillPolygon($bInk,[System.Drawing.Point[]]@([System.Drawing.Point]::new($x2,$y2),[System.Drawing.Point]::new($x2-15,$y2-9),[System.Drawing.Point]::new($x2-15,$y2+9)))
}
T (C '\u591A\u7EA7\u5355\u8C03\u8C10\u653E\u5927\u5668\u7684\u589E\u76CA\u4E0E\u5E26\u5BBD') 440 30 $fTitle $bBlue
T (C '\u6BD4\u8F83\u76F8\u540C\u7684\u4E24\u7EA7\uFF1A\u5404\u7EA7\u90FD\u8C03\u5728\u540C\u4E00\u4E2D\u5FC3\u9891\u7387') 460 83 $fSm $bGray
# signal chain
Arrow 205 205 300 205
$g.DrawRectangle($p,300,155,315,100)
T (C '\u7B2C\u4E00\u7EA7\u5355\u8C03\u8C10') 344 185 $f $bBlue
Arrow 615 205 825 205
$g.DrawRectangle($p,825,155,315,100)
T (C '\u7B2C\u4E8C\u7EA7\u5355\u8C03\u8C10') 868 185 $f $bBlue
Arrow 1140 205 1280 205
T (C '\u4FE1\u53F7') 130 168 $fSm $bInk
T (C '\u8F93\u51FA') 1280 168 $fSm $bInk

$left=190; $top=340; $width=1110; $height=330; $bottom=$top+$height
L $left $top $left $bottom $pAxis; L $left $bottom ($left+$width) $bottom $pAxis
L ($left+$width/2) $top ($left+$width/2) $bottom $pGuide
$half=$height*0.7071067812
$yHalf=$bottom-$half
L $left $yHalf ($left+$width) $yHalf $pGuide
T (C '\u5E45\u5EA6\u4E3A\u5CF0\u503C\u7684 0.707') 205 ($yHalf-40) $fSm $bGray
$p1=[System.Collections.Generic.List[System.Drawing.PointF]]::new()
$p2=[System.Collections.Generic.List[System.Drawing.PointF]]::new()
for($i=0;$i -le 700;$i++){
  $x=($i/700.0)*4-2
  $one=1/[Math]::Sqrt(1+$x*$x)
  $two=$one*$one
  $xx=[float]($left+$i*$width/700.0)
  $p1.Add([System.Drawing.PointF]::new($xx,[float]($bottom-$one*$height)))
  $p2.Add([System.Drawing.PointF]::new($xx,[float]($bottom-$two*$height)))
}
$g.DrawLines($pBlue,$p1.ToArray()); $g.DrawLines($pOrange,$p2.ToArray())
L 1220 375 1275 375 $pBlue; T (C '\u5355\u7EA7') 1285 350 $fSm $bBlue
L 1220 420 1275 420 $pOrange; T (C '\u4E24\u7EA7\u7EA7\u8054') 1285 395 $fSm $bOrange
T (C '\u4E2D\u5FC3\u9891\u7387') 700 678 $fSm $bGray
T (C '\u9891\u7387') 1280 678 $fSm $bGray
T (C '\u5E45\u5EA6') 112 340 $fSm $bGray
T (C '\u6CE8\uFF1A\u66F2\u7EBF\u90FD\u6309\u5404\u81EA\u5CF0\u503C\u5F52\u4E00\u5316\uFF0C\u56FE\u4E2D\u53EA\u6BD4\u8F83\u5E26\u5BBD\u548C\u5F62\u72B6\u3002') 440 752 $fSm $bGray
$bmp.Save($output,[System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose(); $bmp.Dispose(); Write-Output $output
