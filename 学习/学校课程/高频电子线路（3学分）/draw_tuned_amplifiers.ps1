Add-Type -AssemblyName System.Drawing
$ErrorActionPreference = 'Stop'
$outDir = Join-Path $PSScriptRoot 'hf_small_signal_assets'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null
$outPath = Join-Path $outDir 'single_double_tuned_comparison.png'
$bmp = [System.Drawing.Bitmap]::new(1600,960)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.Clear([System.Drawing.Color]::White)
$navy = [System.Drawing.Color]::FromArgb(29,72,102)
$red = [System.Drawing.Color]::FromArgb(190,72,48)
$gray = [System.Drawing.Color]::FromArgb(115,123,130)
$ink = [System.Drawing.Color]::FromArgb(30,37,43)
$p = [System.Drawing.Pen]::new($ink,3)
$pc = [System.Drawing.Pen]::new($gray,2)
$pc.DashStyle = [System.Drawing.Drawing2D.DashStyle]::Dash
$pr = [System.Drawing.Pen]::new($red,4)
$blue = [System.Drawing.SolidBrush]::new($navy)
$redBrush = [System.Drawing.SolidBrush]::new($red)
$dark = [System.Drawing.SolidBrush]::new($ink)
$muted = [System.Drawing.SolidBrush]::new($gray)
$font = [System.Drawing.Font]::new('Microsoft YaHei UI',23)
$fontSm = [System.Drawing.Font]::new('Microsoft YaHei UI',18)
$fontTitle = [System.Drawing.Font]::new('Microsoft YaHei UI',29,[System.Drawing.FontStyle]::Bold)

function C { param([string]$s) [regex]::Replace($s,'\\u([0-9A-Fa-f]{4})',{param($m) [char]([Convert]::ToInt32($m.Groups[1].Value,16))}) }
function T { param([string]$s,[float]$x,[float]$y,$f=$font,$b=$dark) $g.DrawString($s,$f,$b,$x,$y) }
function Line { param($x1,$y1,$x2,$y2,$pen=$p) $g.DrawLine($pen,[float]$x1,[float]$y1,[float]$x2,[float]$y2) }
function Coil { param($x,$yt,$yb)
  Line $x $yt $x ($yt+45)
  $start=$yt+45; $pitch=19
  for($i=0;$i -lt 4;$i++){ $g.DrawArc($p,[float]($x-17),[float]($start+$i*$pitch),34,22,180,180) }
  Line $x ($start+4*$pitch) $x $yb
}
function Cap { param($x,$yt,$yb)
  $ym=($yt+$yb)/2
  Line $x $yt $x ($ym-13)
  Line ($x-30) ($ym-13) ($x+30) ($ym-13)
  Line ($x-30) ($ym+13) ($x+30) ($ym+13)
  Line $x ($ym+13) $x $yb
}
function Res { param($x,$yt,$yb)
  $ym=($yt+$yb)/2
  Line $x $yt $x ($ym-44)
  $g.DrawRectangle($p,[float]($x-24),[float]($ym-44),48,88)
  Line $x ($ym+44) $x $yb
}
function CurrentSource { param($x,$yt,$yb)
  $ym=($yt+$yb)/2
  Line $x $yt $x ($ym-33)
  $g.DrawEllipse($p,[float]($x-33),[float]($ym-33),66,66)
  Line $x ($ym+33) $x $yb
  Line $x ($ym+17) $x ($ym-16)
  Line $x ($ym-16) ($x-10) ($ym-3)
  Line $x ($ym-16) ($x+10) ($ym-3)
}
function Response { param($x,$y,$w,$h,[bool]$twoPeaks)
  Line $x ($y+$h) ($x+$w) ($y+$h) $pc
  Line $x $y $x ($y+$h) $pc
  $pts=[System.Collections.Generic.List[System.Drawing.PointF]]::new()
  for($i=0;$i -le 300;$i++){
    $z=($i/300.0)*4-2
    if($twoPeaks){
      $v=0.78*[Math]::Exp(-[Math]::Pow(($z-0.72)/0.42,2))+0.78*[Math]::Exp(-[Math]::Pow(($z+0.72)/0.42,2))
    } else {
      $v=1.0/(1+[Math]::Pow(2.3*$z,2))
    }
    $pts.Add([System.Drawing.PointF]::new([float]($x+$i*$w/300.0),[float]($y+$h-$v*($h-13))))
  }
  $g.DrawLines($pr,$pts.ToArray())
}

T (C '\u5355\u8C03\u8C10\u4E0E\u53CC\u8C03\u8C10\u653E\u5927\u5668\u7684\u7B80\u5316\u4EA4\u6D41\u6A21\u578B') 410 28 $fontTitle $blue
T (C '\u6CE8\uFF1A\u56FE\u4E2D\u53EA\u753B\u51FA\u8F93\u51FA\u7AEF\u53D7\u63A7\u7535\u6D41\u6E90\u548C\u9009\u9891\u8D1F\u8F7D') 425 82 $fontSm $muted
Line 800 145 800 930 $pc
T (C '\u5355\u8C03\u8C10\uFF1A\u4E00\u4E2A\u5E76\u8054\u8C10\u632F\u56DE\u8DEF') 145 158 $fontTitle $blue
T (C '\u53CC\u8C03\u8C10\uFF1A\u4E24\u4E2A\u8026\u5408\u8C10\u632F\u56DE\u8DEF') 895 158 $fontTitle $blue

# One parallel resonator. All four branches share the same pair of nodes.
$yt=290; $yb=545
Line 130 $yt 670 $yt; Line 130 $yb 670 $yb
CurrentSource 150 $yt $yb; Coil 315 $yt $yb; Cap 445 $yt $yb; Res 580 $yt $yb
T (C '\u53D7\u63A7\u7535\u6D41') 72 563 $fontSm $muted
T (C '\u7535\u611F') 280 557 $fontSm $blue; T (C '\u7535\u5BB9') 410 557 $fontSm $blue; T (C '\u635F\u8017\u53CA\u8D1F\u8F7D') 525 557 $fontSm $blue
T (C '\u8F93\u51FA\u7535\u538B') 585 235 $fontSm $redBrush
Line 675 $yt 675 $yb $pc

# Two separate resonators, linked only by mutual coupling.
Line 865 $yt 1090 $yt; Line 865 $yb 1090 $yb
CurrentSource 885 $yt $yb; Cap 965 $yt $yb; Coil 1080 $yt $yb
Line 1190 $yt 1515 $yt; Line 1190 $yb 1515 $yb
Coil 1200 $yt $yb; Cap 1320 $yt $yb; Res 1450 $yt $yb
Line 1102 415 1178 415 $pc; T (C '\u8026\u5408') 1105 375 $fontSm $redBrush
T (C '\u521D\u7EA7') 932 557 $fontSm $blue; T (C '\u6B21\u7EA7') 1295 557 $fontSm $blue
T (C '\u8F93\u51FA\u7535\u538B') 1390 235 $fontSm $redBrush

T (C '\u5355\u56DE\u8DEF\uFF1A\u4E2D\u5FC3\u9644\u8FD1\u4E00\u4E2A\u5CF0') 170 626 $font $blue
T (C '\u53CC\u56DE\u8DEF\uFF1A\u5F3A\u8026\u5408\u65F6\u53EF\u51FA\u73B0\u4E24\u4E2A\u5CF0') 910 626 $font $blue
Response 180 686 440 195 $false
Response 938 686 440 195 $true
T (C '\u9891\u7387') 585 874 $fontSm $muted; T (C '\u9891\u7387') 1340 874 $fontSm $muted
T (C '\u5E45\u5EA6') 115 710 $fontSm $muted; T (C '\u5E45\u5EA6') 875 710 $fontSm $muted
T (C '\u53CC\u8C03\u8C10\u4E0D\u7B49\u4E8E\u5FC5\u7136\u53CC\u5CF0\uFF1B\u5F31\u8026\u5408\u65F6\u4ECD\u53EF\u4EE5\u662F\u5355\u5CF0\u3002') 470 912 $fontSm $muted
$bmp.Save($outPath,[System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose(); $bmp.Dispose()
Write-Output $outPath
