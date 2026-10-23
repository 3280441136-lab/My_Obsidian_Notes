Add-Type -AssemblyName System.Drawing
$ErrorActionPreference = 'Stop'
$output = Join-Path $PSScriptRoot 'hf_small_signal_assets\y_feedback_two_port.png'
$bmp=[System.Drawing.Bitmap]::new(1550,825)
$g=[System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode=[System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.Clear([System.Drawing.Color]::White)
$ink=[System.Drawing.Color]::FromArgb(30,39,47)
$blue=[System.Drawing.Color]::FromArgb(29,82,115)
$orange=[System.Drawing.Color]::FromArgb(190,80,47)
$gray=[System.Drawing.Color]::FromArgb(116,125,132)
$p=[System.Drawing.Pen]::new($ink,4)
$pThin=[System.Drawing.Pen]::new($gray,2)
$pDash=[System.Drawing.Pen]::new($orange,2.5)
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
function DiamondSource { param($x,$top,$bottom,$name,$sub)
  $ym=($top+$bottom)/2
  L $x $top $x ($ym-55)
  $points=[System.Drawing.Point[]]@([System.Drawing.Point]::new($x,$ym-55),[System.Drawing.Point]::new($x+44,$ym),[System.Drawing.Point]::new($x,$ym+55),[System.Drawing.Point]::new($x-44,$ym))
  $g.DrawPolygon($p,$points)
  L $x ($ym+55) $x $bottom
  L $x ($ym-19) $x ($ym+20) $pThin
  L $x ($ym+20) ($x-10) ($ym+5) $pThin
  L $x ($ym+20) ($x+10) ($ym+5) $pThin
  T (C $name) ($x-95) ($bottom+15) $fSm $bOrange
  T (C $sub) ($x-105) ($bottom+45) $fSm $bGray
}
function Admittance { param($x,$top,$bottom,$label,$sub)
  $ym=($top+$bottom)/2
  L $x $top $x ($ym-45)
  $g.DrawRectangle($p,$x-34,$ym-45,68,90)
  L $x ($ym+45) $x $bottom
  T (C $label) ($x-82) ($bottom+15) $fSm $bBlue
  T (C $sub) ($x-82) ($bottom+45) $fSm $bGray
}

T (C '\u6676\u4F53\u7BA1 y \u53C2\u6570\u4E2D\u7684\u53CD\u5411\u53CD\u9988') 470 30 $fTitle $bBlue
T (C '\u4E24\u4E2A\u83F1\u5F62\u662F\u53D7\u63A7\u7535\u6D41\u6E90\uFF1B\u865A\u7EBF\u53EA\u8868\u793A\u63A7\u5236\u5173\u7CFB\uFF0C\u4E0D\u662F\u5BFC\u7EBF') 315 83 $fSm $bGray
$top=265; $bottom=565
# isolated input and output top nodes, shared AC reference return
L 150 $top 675 $top; L 795 $top 1420 $top
L 150 $bottom 1420 $bottom
Admittance 365 $top $bottom '\u8F93\u5165\u5BFC\u7EB3' '\u672C\u5730\u54CD\u5E94'
DiamondSource 590 $top $bottom '\u53CD\u5411\u4F20\u8F93' '\u7531\u8F93\u51FA\u7535\u538B\u63A7\u5236'
DiamondSource 910 $top $bottom '\u6B63\u5411\u4F20\u8F93' '\u7531\u8F93\u5165\u7535\u538B\u63A7\u5236'
Admittance 1120 $top $bottom '\u8F93\u51FA\u5BFC\u7EB3' '\u672C\u5730\u54CD\u5E94'
Admittance 1330 $top $bottom '\u8C10\u632F\u8D1F\u8F7D' '\u968F\u9891\u7387\u53D8\u5316'
T (C '\u8F93\u5165\u7AEF') 137 220 $f $bBlue
T (C '\u8F93\u51FA\u7AEF') 1280 220 $f $bBlue
T (C '\u516C\u7528\u4EA4\u6D41\u53C2\u8003\u7AEF') 625 666 $fSm $bGray
# controlled relationship, visually separate from conducting rails
L 1260 165 590 165 $pDash
L 590 165 590 215 $pDash
L 1260 165 1260 215 $pDash
T (C '\u8F93\u51FA\u53D8\u5316\u56DE\u4F20\u5230\u8F93\u5165') 750 120 $fSm $bOrange
T (C '\u53CD\u9988\u662F\u5426\u4FC3\u8FDB\u632F\u8361\uFF0C\u8FD8\u53D6\u51B3\u4E8E\u76F8\u4F4D\u4E0E\u7ED5\u884C\u4E00\u5468\u540E\u7684\u5F3A\u5EA6\u3002') 335 735 $f $bInk
$bmp.Save($output,[System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose(); $bmp.Dispose(); Write-Output $output
