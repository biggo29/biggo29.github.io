# ==============================================================
#  generate-og-image.ps1
#
#  Reads all settings from og-settings.json — never edit this
#  script to change text, photo, or colors. Edit the JSON only.
#
#  Run from repo root:
#    powershell -ExecutionPolicy Bypass -File .\generate-og-image.ps1
# ==============================================================

Add-Type -AssemblyName System.Drawing

$root        = $PSScriptRoot
$settingsFile = Join-Path $root "og-settings.json"

# ── Load & validate settings ─────────────────────────────────
if (-not (Test-Path $settingsFile)) {
    Write-Host ""
    Write-Host "  ERROR  og-settings.json not found at:" -ForegroundColor Red
    Write-Host "         $settingsFile"                   -ForegroundColor Red
    Write-Host ""
    exit 1
}

$cfg       = Get-Content $settingsFile -Raw | ConvertFrom-Json
$photoPath = Join-Path $root ($cfg.images.portrait -replace '/', '\')
$outPath   = Join-Path $root ($cfg.output.filename  -replace '/', '\')
$W         = [int]$cfg.output.width
$H         = [int]$cfg.output.height

if (-not (Test-Path $photoPath)) {
    Write-Host ""
    Write-Host "  ERROR  Portrait file not found:"   -ForegroundColor Red
    Write-Host "         $photoPath"                  -ForegroundColor Red
    Write-Host "  Fix:   Update images.portrait in og-settings.json" -ForegroundColor Yellow
    Write-Host ""
    exit 1
}

# ── Helper: color from [R,G,B] array in JSON ─────────────────
function ToColor($arr, $alpha = 255) {
    [System.Drawing.Color]::FromArgb($alpha, [int]$arr[0], [int]$arr[1], [int]$arr[2])
}

$cPrimary = ToColor $cfg.design.accentColor
$cBg      = ToColor $cfg.design.bgColor
$cText    = ToColor $cfg.design.textColor
$cMuted   = ToColor $cfg.design.mutedColor
$cUrl     = ToColor $cfg.design.urlColor
$cTagBg   = ToColor $cfg.design.accentColor  48
$cTagBdr  = ToColor $cfg.design.accentColor 120

# ── Canvas setup ─────────────────────────────────────────────
$bmp = [System.Drawing.Bitmap]::new($W, $H)
$g   = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode     = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

# ── BACKGROUND ───────────────────────────────────────────────

# 1. Solid base
$g.Clear($cBg)

# 2. Top-left radial glow
$glowPath1 = [System.Drawing.Drawing2D.GraphicsPath]::new()
$glowPath1.AddEllipse(-80, -80, 720, 480)
$glow1 = [System.Drawing.Drawing2D.PathGradientBrush]::new($glowPath1)
$glow1.CenterColor    = ToColor $cfg.design.accentColor 30
$glow1.SurroundColors = @(ToColor $cfg.design.bgColor 0)
$g.FillPath($glow1, $glowPath1)
$glow1.Dispose(); $glowPath1.Dispose()

# 3. Bottom-right radial glow
$glowPath2 = [System.Drawing.Drawing2D.GraphicsPath]::new()
$glowPath2.AddEllipse(750, 200, 580, 520)
$glow2 = [System.Drawing.Drawing2D.PathGradientBrush]::new($glowPath2)
$glow2.CenterColor    = ToColor $cfg.design.accentColor 18
$glow2.SurroundColors = @(ToColor $cfg.design.bgColor 0)
$g.FillPath($glow2, $glowPath2)
$glow2.Dispose(); $glowPath2.Dispose()

# 4. Dot grid texture
$dotBrush = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(18, 148, 163, 184))
for ($gy = 0; $gy -lt $H; $gy += 28) {
    for ($gx = 0; $gx -lt $W; $gx += 28) {
        $g.FillEllipse($dotBrush, $gx, $gy, 2, 2)
    }
}
$dotBrush.Dispose()

# 5. Edge fade bars
$topFade = [System.Drawing.Drawing2D.LinearGradientBrush]::new(
    [System.Drawing.Point]::new(0, 0),       [System.Drawing.Point]::new(0, 60),
    (ToColor $cfg.design.bgColor 180),        (ToColor $cfg.design.bgColor 0))
$g.FillRectangle($topFade, 0, 0, $W, 60); $topFade.Dispose()

$bottomFade = [System.Drawing.Drawing2D.LinearGradientBrush]::new(
    [System.Drawing.Point]::new(0, $H - 60), [System.Drawing.Point]::new(0, $H),
    (ToColor $cfg.design.bgColor 0),          (ToColor $cfg.design.bgColor 180))
$g.FillRectangle($bottomFade, 0, $H - 60, $W, 60); $bottomFade.Dispose()

# ── COLUMN DIVIDER ───────────────────────────────────────────
$g.DrawLine(
    [System.Drawing.Pen]::new((ToColor $cfg.design.accentColor 35), 1),
    760, 80, 760, ($H - 80))

# ── LEFT ACCENT BAR ──────────────────────────────────────────
$g.FillRectangle([System.Drawing.SolidBrush]::new($cPrimary), 72, 148, 4, 310)

# ── TYPOGRAPHY ───────────────────────────────────────────────
$fEyebrow = [System.Drawing.Font]::new("Consolas",  [float]$cfg.design.eyebrowFontSize, [System.Drawing.FontStyle]::Regular)
$fName    = [System.Drawing.Font]::new("Arial",     [float]$cfg.design.nameFontSize,    [System.Drawing.FontStyle]::Bold)
$fRole    = [System.Drawing.Font]::new("Segoe UI",  [float]$cfg.design.roleFontSize,    [System.Drawing.FontStyle]::Regular)
$fTag     = [System.Drawing.Font]::new("Consolas",  13,                                 [System.Drawing.FontStyle]::Regular)
$fMeta    = [System.Drawing.Font]::new("Segoe UI",  16,                                 [System.Drawing.FontStyle]::Regular)
$fUrl     = [System.Drawing.Font]::new("Consolas",  14,                                 [System.Drawing.FontStyle]::Regular)

$tx = 96

$g.DrawString($cfg.text.eyebrow, $fEyebrow, [System.Drawing.SolidBrush]::new($cPrimary), $tx, 155)
$g.DrawString($cfg.text.name,    $fName,    [System.Drawing.SolidBrush]::new($cText),    $tx, 190)
$g.DrawString($cfg.text.role,    $fRole,    [System.Drawing.SolidBrush]::new($cMuted),   $tx, 278)

# Tag chips
$tagX = $tx; $tagY = 318; $tagH = 30; $tagPad = 13
foreach ($tag in $cfg.text.tags) {
    $sz   = $g.MeasureString($tag, $fTag)
    $tagW = [int]$sz.Width + ($tagPad * 2)
    if (($tagX + $tagW) -gt 745) { break }

    $rect = [System.Drawing.Rectangle]::new($tagX, $tagY, $tagW, $tagH)
    $g.FillRectangle([System.Drawing.SolidBrush]::new($cTagBg),           $rect)
    $g.DrawRectangle([System.Drawing.Pen]::new($cTagBdr, 1),              $rect)
    $g.DrawString($tag, $fTag, [System.Drawing.SolidBrush]::new($cPrimary), $tagX + $tagPad, $tagY + 7)
    $tagX += $tagW + 7
}

$g.DrawString($cfg.text.awards, $fMeta, [System.Drawing.SolidBrush]::new($cMuted), $tx, 370)
$g.DrawString($cfg.text.url,    $fUrl,  [System.Drawing.SolidBrush]::new($cUrl),   $tx, 418)

# ── PORTRAIT PHOTO (circular) ────────────────────────────────
$photo  = [System.Drawing.Image]::FromFile($photoPath)
$photoD = [int]$cfg.design.photoSize
$photoX = 760 + [int]((440 - $photoD) / 2)
$photoY = [int](($H - $photoD) / 2)

# Halo glow
$haloPath = [System.Drawing.Drawing2D.GraphicsPath]::new()
$haloPath.AddEllipse($photoX - 22, $photoY - 22, $photoD + 44, $photoD + 44)
$halo = [System.Drawing.Drawing2D.PathGradientBrush]::new($haloPath)
$halo.CenterColor    = ToColor $cfg.design.accentColor 55
$halo.SurroundColors = @(ToColor $cfg.design.bgColor 0)
$g.FillPath($halo, $haloPath)
$halo.Dispose(); $haloPath.Dispose()

# Mid ring
$g.DrawEllipse(
    [System.Drawing.Pen]::new((ToColor $cfg.design.accentColor 70), 8),
    $photoX - 7, $photoY - 7, $photoD + 14, $photoD + 14)

# Circular clip + draw
$clip = [System.Drawing.Drawing2D.GraphicsPath]::new()
$clip.AddEllipse($photoX, $photoY, $photoD, $photoD)
$g.SetClip($clip)
$g.DrawImage($photo, $photoX, $photoY, $photoD, $photoD)
$g.ResetClip()
$clip.Dispose(); $photo.Dispose()

# Border
$g.DrawEllipse([System.Drawing.Pen]::new($cPrimary, 4), $photoX, $photoY, $photoD, $photoD)

# ── SAVE ─────────────────────────────────────────────────────
$bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose(); $bmp.Dispose()

Write-Host ""
Write-Host "  DONE   $outPath" -ForegroundColor Green
Write-Host "         $W x $H px  --  ready for og:image + twitter:image" -ForegroundColor Cyan
Write-Host ""
Write-Host "  Settings file: og-settings.json" -ForegroundColor White
Write-Host "  To update: edit og-settings.json, then re-run this script." -ForegroundColor Gray
Write-Host ""