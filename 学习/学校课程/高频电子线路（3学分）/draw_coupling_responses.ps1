Add-Type -AssemblyName System.Drawing
$ErrorActionPreference = 'Stop'
$output = Join-Path $PSScriptRoot 'hf_small_signal_assets\double_tuned_coupling_responses.png'
$bmp = [System.Drawing.Bitmap]::new(1600,780)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.Clear([System.Drawing.Color]::White)
$ink = [System.Drawing.Color]::FromArgb(31,40,47)
$gray = [System.Drawing.Color]::FromArgb(135,143,149)
$blue = [System.Drawing.Color]::FromArgb(32,94,132)
$orange = [System.Drawing.Color]::FromArgb(195,81,49)
$axis = [System.Drawing.Pen]::new($gray,2)
$center = [System.Drawing.Pen]::new($gray,1.5)
$center.DashStyle = [System.Drawing.Drawing2D.DashStyle]::Dash
$curve = [System.Drawing.Pen]::new($orange,4)
$brush = [System.Drawing.SolidBrush]::new($ink)
$blueBrush = [System.Drawing.SolidBrush]::new($blue)
$grayBrush = [System.Drawing.SolidBrush]::new($gray)
$fontTitle = [System.Drawing.Font]::new('Microsoft YaHei UI',29,[System.Drawing.FontStyle]::Bold)
$font = [System.Drawing.Font]::new('Microsoft YaHei UI',23)
$fontSm = [System.Drawing.Font]::new('Microsoft YaHei UI',18)
function C { param([string]$s) [regex]::Replace($s,'\\u([0-9A-Fa-f]{4})',{param($m) [char]([Convert]::ToInt32($m.Groups[1].Value,16))}) }
function T { param([string]$s,[float]$x,[float]$y,$f=$font,$b=$brush) $g.DrawString($s,$f,$b,$x,$y) }
function Transfer { param([double]$x,[double]$k) $k/[Math]::Sqrt([Math]::Pow(1-$x*$x+$k*$k,2)+4*$x*$x) }

T (C '\u53CC\u8C03\u8C10\u56DE\u8DEF\u7684\u8026\u5408\u4E0E\u5E45\u9891\u7279\u6027') 490 34 $fontTitle $blueBrush
T (C '\u4E24\u4E2A\u56DE\u8DEF\u8C03\u5230\u76F8\u540C\u4E2D\u5FC3\u9891\u7387\uFF1B\u4E0B\u56FE\u53EA\u6BD4\u8F83\u66F2\u7EBF\u5F62\u72B6') 440 92 $fontSm $grayBrush
$panels = @(
  @{x=48;k=0.45;title='\u6B20\u8026\u5408';desc='\u4E00\u4E2A\u8F83\u5C16\u7684\u4E2D\u5FC3\u5CF0'},
  @{x=548;k=1.0;title='\u4E34\u754C\u8026\u5408';desc='\u4E00\u4E2A\u9876\u90E8\u8F83\u5E73\u7684\u5CF0'},
  @{x=1048;k=1.8;title='\u8FC7\u8026\u5408';desc='\u4E2D\u5FC3\u4E0B\u51F9\uFF0C\u4E24\u4FA7\u6210\u5CF0'}
)
foreach($panel in $panels){
  $px=[int]$panel.x; $k=[double]$panel.k
  T (C $panel.title) ($px+135) 180 $fontTitle $blueBrush
  $left=$px+55; $top=295; $width=380; $height=270; $bottom=$top+$height
  $g.DrawLine($axis,$left,$top,$left,$bottom)
  $g.DrawLine($axis,$left,$bottom,($left+$width),$bottom)
  $g.DrawLine($center,($left+$width/2),$top,($left+$width/2),$bottom)
  $max=0.0
  for($i=0;$i -le 400;$i++){ $xx=($i/400.0)*5.6-2.8; $v=Transfer $xx $k; if($v -gt $max){$max=$v} }
  $pts=[System.Collections.Generic.List[System.Drawing.PointF]]::new()
  for($i=0;$i -le 400;$i++){
    $xx=($i/400.0)*5.6-2.8
    $v=(Transfer $xx $k)/$max
    $pts.Add([System.Drawing.PointF]::new([float]($left+$i*$width/400.0),[float]($bottom-$v*($height-25))))
  }
  $g.DrawLines($curve,$pts.ToArray())
  T (C '\u4E2D\u5FC3\u9891\u7387') ($left+($width/2)-45) ($bottom+15) $fontSm $grayBrush
  T (C $panel.desc) ($px+87) 625 $font $brush
}
T (C '\u7EB5\u8F74\uFF1A\u8F93\u51FA\u5E45\u5EA6\uFF08\u5404\u66F2\u7EBF\u6309\u5404\u81EA\u5CF0\u503C\u5F52\u4E00\u5316\uFF09') 465 710 $fontSm $grayBrush
$bmp.Save($output,[System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose(); $bmp.Dispose()
Write-Output $output
