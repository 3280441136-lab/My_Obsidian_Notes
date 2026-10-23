Add-Type -AssemblyName System.Drawing
$ErrorActionPreference = 'Stop'
$output = Join-Path $PSScriptRoot 'hf_small_signal_assets\tapped_single_tuned_amplifier.png'
$bmp = [System.Drawing.Bitmap]::new(1500,820)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.Clear([System.Drawing.Color]::White)
$ink = [System.Drawing.Color]::FromArgb(28,37,43)
$blue = [System.Drawing.Color]::FromArgb(29,79,111)
$orange = [System.Drawing.Color]::FromArgb(191,83,44)
$gray = [System.Drawing.Color]::FromArgb(115,123,130)
$p = [System.Drawing.Pen]::new($ink,4)
$pThin = [System.Drawing.Pen]::new($gray,2)
$bDark = [System.Drawing.SolidBrush]::new($ink)
$bBlue = [System.Drawing.SolidBrush]::new($blue)
$bOrange = [System.Drawing.SolidBrush]::new($orange)
$bGray = [System.Drawing.SolidBrush]::new($gray)
$fTitle = [System.Drawing.Font]::new('Microsoft YaHei UI',29,[System.Drawing.FontStyle]::Bold)
$f = [System.Drawing.Font]::new('Microsoft YaHei UI',24)
$fSm = [System.Drawing.Font]::new('Microsoft YaHei UI',19)
function C { param([string]$s) [regex]::Replace($s,'\\u([0-9A-Fa-f]{4})',{param($m) [char]([Convert]::ToInt32($m.Groups[1].Value,16))}) }
function T { param([string]$s,[float]$x,[float]$y,$font=$f,$brush=$bDark) $g.DrawString($s,$font,$brush,$x,$y) }
function L { param($x1,$y1,$x2,$y2,$pen=$p) $g.DrawLine($pen,[float]$x1,[float]$y1,[float]$x2,[float]$y2) }
function CoilSegment { param([double]$x,[double]$top,[double]$bottom)
  $points=[System.Collections.Generic.List[System.Drawing.PointF]]::new()
  for($i=0;$i -le 180;$i++){
    $y=$top+($bottom-$top)*$i/180.0
    $xx=$x+19*[Math]::Sin(2*[Math]::PI*4*$i/180.0)
    $points.Add([System.Drawing.PointF]::new([float]$xx,[float]$y))
  }
  $g.DrawLines($p,$points.ToArray())
}

T (C '\u62BD\u5934\u63A5\u5165\u7684\u5355\u8C03\u8C10\u5C0F\u4FE1\u53F7\u653E\u5927\u5668\uFF08\u7B80\u5316\u4EA4\u6D41\u56FE\uFF09') 215 38 $fTitle $bBlue
T (C '\u8D1F\u8F7D\u53EA\u63A5\u5728\u7EBF\u5708\u4E0B\u534A\u6BB5\uFF1B\u8C10\u632F\u7535\u5BB9\u8DE8\u63A5\u6574\u4E2A\u7EBF\u5708') 330 92 $fSm $bGray
$top=245; $bottom=625; $tap=435
L 245 $top 835 $top; L 245 $bottom 1170 $bottom
# controlled current source
L 245 $top 245 366; $g.DrawEllipse($p,206,366,78,78); L 245 444 245 $bottom
L 245 424 245 384; L 245 384 233 401; L 245 384 257 401
T (C '\u6676\u4F53\u7BA1\u8F93\u51FA\u7684\u53D7\u63A7\u7535\u6D41') 105 650 $fSm $bBlue
# full-tank capacitor
L 545 $top 545 416; L 507 416 583 416; L 507 442 583 442; L 545 442 545 $bottom
T (C '\u8C10\u632F\u7535\u5BB9') 495 650 $fSm $bBlue
# tapped coil with continuity at the tap
L 835 $top 835 276; CoilSegment 835 276 395; L 835 395 835 $tap
L 835 $tap 835 475; CoilSegment 835 475 594; L 835 594 835 $bottom
$g.FillEllipse($bDark,828,428,14,14)
T (C '\u5168\u7EBF\u5708') 765 650 $fSm $bBlue
T (C '\u4E0A\u6BB5') 880 310 $fSm $bGray; T (C '\u4E0B\u6BB5') 880 520 $fSm $bGray
# Load between tap and common lower end
L 835 $tap 1120 $tap
L 1120 $tap 1120 465; $g.DrawRectangle($p,1080,465,80,105); L 1120 570 1120 $bottom
T (C '\u8D1F\u8F7D') 1085 650 $fSm $bBlue
T (C '\u62BD\u5934\u70B9') 930 392 $fSm $bOrange
T 'A' 780 205 $f $bOrange; T 'T' 790 414 $f $bOrange; T 'B' 788 627 $f $bOrange
T (C '\u8F93\u51FA\u53D6\u81EA\u62BD\u5934\u4E0E\u516C\u5171\u7AEF') 1030 350 $fSm $bOrange
$g.DrawRectangle($pThin,165,715,1180,62)
T (C '\u6574\u4E2A\u56DE\u8DEF\u89C2\u5BDF A-B\uFF1B\u8D1F\u8F7D\u63A5\u5728 T-B\u3002\u62BD\u5934\u8D8A\u9760\u8FD1 B\uFF0C\u8D1F\u8F7D\u5BF9\u8C10\u632F\u56DE\u8DEF\u7684\u52A0\u8F7D\u8D8A\u8F7B\u3002') 245 731 $fSm $bGray
$bmp.Save($output,[System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose(); $bmp.Dispose()
Write-Output $output
