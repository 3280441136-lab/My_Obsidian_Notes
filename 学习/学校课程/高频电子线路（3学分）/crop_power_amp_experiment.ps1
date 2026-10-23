Add-Type -AssemblyName System.Drawing
$source = 'C:\Users\DongXinRui\Downloads\IMG_20261022_161813.jpg'
$target = Join-Path $PSScriptRoot 'hf_small_signal_assets\experiment_power_amp_core.png'
$image = [System.Drawing.Image]::FromFile($source)
$crop = [System.Drawing.Rectangle]::new(850, 400, 2900, 1800)
$bitmap = [System.Drawing.Bitmap]::new($crop.Width, $crop.Height)
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)
$graphics.DrawImage($image, [System.Drawing.Rectangle]::new(0, 0, $crop.Width, $crop.Height), $crop, [System.Drawing.GraphicsUnit]::Pixel)
$bitmap.Save($target, [System.Drawing.Imaging.ImageFormat]::Png)
$graphics.Dispose()
$bitmap.Dispose()
$image.Dispose()
Write-Output $target

$waveSource = 'C:\Users\DongXinRui\AppData\Local\Temp\codex-clipboard-d001639b-a781-41d6-aeb0-3f099b99aa18.jpg'
$waveTarget = Join-Path $PSScriptRoot 'hf_small_signal_assets\experiment_current_pulses.png'
$waveImage = [System.Drawing.Image]::FromFile($waveSource)
$waveCrop = [System.Drawing.Rectangle]::new(220, 1300, 2600, 1910)
$waveBitmap = [System.Drawing.Bitmap]::new($waveCrop.Width, $waveCrop.Height)
$waveGraphics = [System.Drawing.Graphics]::FromImage($waveBitmap)
$waveGraphics.DrawImage($waveImage, [System.Drawing.Rectangle]::new(0, 0, $waveCrop.Width, $waveCrop.Height), $waveCrop, [System.Drawing.GraphicsUnit]::Pixel)
$waveBitmap.Save($waveTarget, [System.Drawing.Imaging.ImageFormat]::Png)
$waveGraphics.Dispose()
$waveBitmap.Dispose()
$waveImage.Dispose()
Write-Output $waveTarget
