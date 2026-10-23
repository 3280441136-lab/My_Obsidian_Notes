Add-Type -AssemblyName System.Drawing
$ErrorActionPreference='Stop'
$output=Join-Path $PSScriptRoot 'hf_small_signal_assets\staggered_tuning_response.png'
$bmp=[System.Drawing.Bitmap]::new(1600,900)
$g=[System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode=[System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.Clear([System.Drawing.Color]::White)
$ink=[System.Drawing.Color]::FromArgb(29,39,47)
$gray=[System.Drawing.Color]::FromArgb(124,134,141)
$blue=[System.Drawing.Color]::FromArgb(31,100,145)
$green=[System.Drawing.Color]::FromArgb(53,139,106)
$orange=[System.Drawing.Color]::FromArgb(194,79,47)
$p=[System.Drawing.Pen]::new($ink,3)
$axis=[System.Drawing.Pen]::new($gray,2)
$dash=[System.Drawing.Pen]::new($gray,1.4)
$dash.DashStyle=[System.Drawing.Drawing2D.DashStyle]::Dash
$pb=[System.Drawing.Pen]::new($blue,3.5)
$pg=[System.Drawing.Pen]::new($green,3.5)
$po=[System.Drawing.Pen]::new($orange,4.5)
$bInk=[System.Drawing.SolidBrush]::new($ink)
$bBlue=[System.Drawing.SolidBrush]::new($blue)
$bGreen=[System.Drawing.SolidBrush]::new($green)
$bOrange=[System.Drawing.SolidBrush]::new($orange)
$bGray=[System.Drawing.SolidBrush]::new($gray)
$ft=[System.Drawing.Font]::new('Microsoft YaHei UI',29,[System.Drawing.FontStyle]::Bold)
$f=[System.Drawing.Font]::new('Microsoft YaHei UI',22)
$fs=[System.Drawing.Font]::new('Microsoft YaHei UI',18)
function C { param([string]$s) [regex]::Replace($s,'\\u([0-9A-Fa-f]{4})',{param($m) [char]([Convert]::ToInt32($m.Groups[1].Value,16))}) }
function T { param([string]$s,[float]$x,[float]$y,$font=$f,$brush=$bInk) $g.DrawString($s,$font,$brush,$x,$y) }
function L { param($x1,$y1,$x2,$y2,$pen=$p) $g.DrawLine($pen,[float]$x1,[float]$y1,[float]$x2,[float]$y2) }
function Arrow {param($x1,$y1,$x2,$y2)
  L $x1 $y1 $x2 $y2
  $g.FillPolygon($bInk,[System.Drawing.Point[]]@([System.Drawing.Point]::new($x2,$y2),[System.Drawing.Point]::new($x2-14,$y2-8),[System.Drawing.Point]::new($x2-14,$y2+8)))
}
function One {param([double]$x,[double]$center) 1/[Math]::Sqrt(1+[Math]::Pow($x-$center,2))}
function Stagger {param([double]$x) 2/[Math]::Sqrt([Math]::Pow($x,4)+4)}
function Same {param([double]$x) 1/(1+$x*$x)}
function PlotPanel {param($left,$top,$width,$height)
  $bottom=$top+$height
  L $left $top $left $bottom $axis; L $left $bottom ($left+$width) $bottom $axis
  L ($left+$width/2) $top ($left+$width/2) $bottom $dash
  T (C '\u4F4E\u9891') ($left-15) ($bottom+15) $fs $bGray
  T (C '\u4E2D\u5FC3') ($left+$width/2-36) ($bottom+15) $fs $bGray
  T (C '\u9AD8\u9891') ($left+$width-70) ($bottom+15) $fs $bGray
}
function Plot {param($left,$top,$width,$height,$pen,[scriptblock]$fn)
  $pts=[System.Collections.Generic.List[System.Drawing.PointF]]::new()
  for($i=0;$i -le 600;$i++){
    $x=($i/600.0)*6-3; $v=& $fn $x
    $pts.Add([System.Drawing.PointF]::new([float]($left+$i*$width/600.0),[float]($top+$height-$v*($height-15))))
  }
  $g.DrawLines($pen,$pts.ToArray())
}
function Legend {param($x,$y,$pen,$label,$brush)
  L $x ($y+13) ($x+55) ($y+13) $pen
  T (C $label) ($x+66) ($y-7) $fs $brush
}

T (C '\u53C2\u5DEE\u8C03\u8C10\uFF1A\u4E24\u7EA7\u5206\u522B\u8C03\u5728\u4E2D\u5FC3\u4E24\u4FA7') 410 35 $ft $bBlue
T (C '\u4E24\u7EA7\u4ECD\u7136\u4E32\u8054\uFF0C\u9891\u7387\u8BBE\u5B9A\u4E0D\u540C\uFF1B\u56FE\u4E2D\u6BD4\u8F83\u7684\u662F\u5E45\u9891\u66F2\u7EBF\u5F62\u72B6') 415 91 $fs $bGray
# stage chain
Arrow 220 216 310 216
$g.DrawRectangle($p,310,165,315,100)
T (C '\u7B2C\u4E00\u7EA7\uFF1A\u504F\u4F4E\u9891') 340 193 $f $bBlue
Arrow 625 216 825 216
$g.DrawRectangle($p,825,165,315,100)
T (C '\u7B2C\u4E8C\u7EA7\uFF1A\u504F\u9AD8\u9891') 850 193 $f $bGreen
Arrow 1140 216 1270 216
T (C '\u4FE1\u53F7') 155 181 $fs $bInk; T (C '\u8F93\u51FA') 1275 181 $fs $bInk

T (C '\u5355\u7EA7\u66F2\u7EBF\u76F8\u4E58\uFF0C\u5F97\u5230\u5E73\u9876\u603B\u54CD\u5E94') 95 315 $f $bBlue
T (C '\u4E0E\u540C\u9891\u8C03\u8C10\u7684\u4E24\u7EA7\u6BD4\u8F83') 935 315 $f $bBlue
$l1=95; $l2=865; $top=390; $w=635; $h=330
PlotPanel $l1 $top $w $h; PlotPanel $l2 $top $w $h
Plot $l1 $top $w $h $pb {param($x) One $x -1}
Plot $l1 $top $w $h $pg {param($x) One $x 1}
Plot $l1 $top $w $h $po {param($x) Stagger $x}
Plot $l2 $top $w $h $pb {param($x) Same $x}
Plot $l2 $top $w $h $po {param($x) Stagger $x}
Legend 95 785 $pb '\u504F\u4F4E\u9891\u5355\u7EA7' $bBlue
Legend 300 785 $pg '\u504F\u9AD8\u9891\u5355\u7EA7' $bGreen
Legend 510 785 $po '\u53C2\u5DEE\u540E\u603B\u54CD\u5E94' $bOrange
Legend 885 785 $pb '\u540C\u9891\u4E24\u7EA7' $bBlue
Legend 1120 785 $po '\u53C2\u5DEE\u4E24\u7EA7' $bOrange
T (C '\u6CE8\uFF1A\u603B\u54CD\u5E94\u6309\u5404\u81EA\u5CF0\u503C\u5F52\u4E00\u5316\uFF0C\u56FE\u4E2D\u4E0D\u663E\u793A\u5B9E\u9645\u589E\u76CA\u635F\u5931\u3002') 425 850 $fs $bGray
$bmp.Save($output,[System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose(); $bmp.Dispose(); Write-Output $output
