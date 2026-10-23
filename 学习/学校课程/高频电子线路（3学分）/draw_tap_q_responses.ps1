Add-Type -AssemblyName System.Drawing
$ErrorActionPreference = 'Stop'
$output = Join-Path $PSScriptRoot 'hf_small_signal_assets\tap_q_frequency_response.png'
$bmp = [System.Drawing.Bitmap]::new(1600,850)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.Clear([System.Drawing.Color]::White)
$ink=[System.Drawing.Color]::FromArgb(30,40,47)
$gray=[System.Drawing.Color]::FromArgb(130,139,145)
$blue=[System.Drawing.Color]::FromArgb(27,101,149)
$orange=[System.Drawing.Color]::FromArgb(194,78,46)
$green=[System.Drawing.Color]::FromArgb(55,129,91)
$axis=[System.Drawing.Pen]::new($gray,2)
$dash=[System.Drawing.Pen]::new($gray,1.5)
$dash.DashStyle=[System.Drawing.Drawing2D.DashStyle]::Dash
$brush=[System.Drawing.SolidBrush]::new($ink)
$blueBrush=[System.Drawing.SolidBrush]::new($blue)
$grayBrush=[System.Drawing.SolidBrush]::new($gray)
$titleFont=[System.Drawing.Font]::new('Microsoft YaHei UI',30,[System.Drawing.FontStyle]::Bold)
$font=[System.Drawing.Font]::new('Microsoft YaHei UI',22)
$small=[System.Drawing.Font]::new('Microsoft YaHei UI',18)
function C { param([string]$s) [regex]::Replace($s,'\\u([0-9A-Fa-f]{4})',{param($m) [char]([Convert]::ToInt32($m.Groups[1].Value,16))}) }
function T { param([string]$s,[float]$x,[float]$y,$f=$font,$b=$brush) $g.DrawString($s,$f,$b,$x,$y) }
function Single { param([double]$d,[double]$q) 1/[Math]::Sqrt(1+[Math]::Pow(2*$q*$d,2)) }
function Double { param([double]$d,[double]$q1,[double]$q2,[double]$k)
  $a=2*$q1*$d; $b=2*$q2*$d; $K2=$k*$k*$q1*$q2
  [Math]::Sqrt($K2)/[Math]::Sqrt([Math]::Pow(1+$K2-$a*$b,2)+[Math]::Pow($a+$b,2))
}
function PlotPanel { param($left,$top,$width,$height)
  $bottom=$top+$height
  $g.DrawLine($axis,$left,$top,$left,$bottom)
  $g.DrawLine($axis,$left,$bottom,($left+$width),$bottom)
  $g.DrawLine($dash,($left+$width/2),$top,($left+$width/2),$bottom)
  T '-3%' ($left-25) ($bottom+16) $small $grayBrush
  T '0' ($left+$width/2-10) ($bottom+16) $small $grayBrush
  T '+3%' ($left+$width-25) ($bottom+16) $small $grayBrush
}
function PlotCurve { param($left,$top,$width,$height,$pen,[scriptblock]$func)
  $bottom=$top+$height
  $max=0.0
  for($i=0;$i -le 600;$i++){ $d=($i/600.0)*0.06-0.03; $v=& $func $d; if($v -gt $max){$max=$v} }
  $pts=[System.Collections.Generic.List[System.Drawing.PointF]]::new()
  for($i=0;$i -le 600;$i++){
    $d=($i/600.0)*0.06-0.03; $v=(& $func $d)/$max
    $pts.Add([System.Drawing.PointF]::new([float]($left+$i*$width/600.0),[float]($bottom-$v*($height-20))))
  }
  $g.DrawLines($pen,$pts.ToArray())
}
function Legend { param($x,$y,$color,$label)
  $pen=[System.Drawing.Pen]::new($color,4)
  $g.DrawLine($pen,$x,$y+13,$x+52,$y+13)
  T $label ($x+64) ($y-8) $small $brush
  $pen.Dispose()
}

T (C '\u62BD\u5934\u6539\u53D8\u6709\u8F7D\u54C1\u8D28\u56E0\u6570\u540E\u7684\u5E45\u9891\u66F2\u7EBF') 410 34 $titleFont $blueBrush
T (C '\u53EA\u6BD4\u8F83\u5F62\u72B6\uFF1A\u6BCF\u6761\u66F2\u7EBF\u6309\u81EA\u5DF1\u7684\u5CF0\u503C\u5F52\u4E00\u5316\uFF0C\u4E0D\u4EE3\u8868\u5B9E\u9645\u589E\u76CA\u76F8\u540C') 360 89 $small $grayBrush
T (C '\u5355\u8C03\u8C10\uFF1A\u62BD\u5934\u51CF\u8F7B\u52A0\u8F7D') 155 160 $font $blueBrush
T (C '\u53CC\u8C03\u8C10\uFF1A\u56FA\u5B9A\u7EBF\u5708\u8026\u5408\uFF0C\u8C03\u6B21\u7EA7\u62BD\u5934') 890 160 $font $blueBrush
$l1=120; $t1=270; $w1=610; $h=365
$l2=865; $t2=270; $w2=610
PlotPanel $l1 $t1 $w1 $h; PlotPanel $l2 $t2 $w2 $h
$pb=[System.Drawing.Pen]::new($blue,4)
$po=[System.Drawing.Pen]::new($orange,4)
$pg=[System.Drawing.Pen]::new($green,4)
PlotCurve $l1 $t1 $w1 $h $pb {param($d) Single $d 25}
PlotCurve $l1 $t1 $w1 $h $po {param($d) Single $d 80}
PlotCurve $l2 $t2 $w2 $h $pb {param($d) Double $d 50 25 0.02}
PlotCurve $l2 $t2 $w2 $h $po {param($d) Double $d 50 50 0.02}
PlotCurve $l2 $t2 $w2 $h $pg {param($d) Double $d 50 100 0.02}
T (C '\u76F8\u5BF9\u4E2D\u5FC3\u9891\u7387\u7684\u504F\u79FB') 320 680 $small $grayBrush
T (C '\u76F8\u5BF9\u4E2D\u5FC3\u9891\u7387\u7684\u504F\u79FB') 1070 680 $small $grayBrush
Legend 140 735 $blue (C '\u6709\u8F7D\u54C1\u8D28\u56E0\u6570 25')
Legend 440 735 $orange (C '\u6709\u8F7D\u54C1\u8D28\u56E0\u6570 80')
Legend 840 735 $blue (C '\u6B21\u7EA7 25')
Legend 1080 735 $orange (C '\u6B21\u7EA7 50')
Legend 1320 735 $green (C '\u6B21\u7EA7 100')
T (C '\u53CC\u8C03\u8C10\u4F8B\u4E2D\uFF1A\u521D\u7EA7\u6709\u8F7D\u54C1\u8D28\u56E0\u6570\u4E3A 50\uFF0C\u7EBF\u5708\u95F4\u8026\u5408\u7CFB\u6570\u4E3A 0.02\uFF0C\u4E8C\u8005\u59CB\u7EC8\u4E0D\u53D8') 290 790 $small $grayBrush
$bmp.Save($output,[System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose(); $bmp.Dispose(); Write-Output $output
