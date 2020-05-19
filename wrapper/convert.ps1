<#
.SYNOPSIS
    Scratch 3 Project to EXE Converter
.DESCRIPTION
    PS script that packs html file to a standalone executable using nw.js and makesfx
.PARAMETER h
    path to the html file, produced by SB3toHTML converter
.PARAMETER i
    path to the ico icon file, to be applied on the executable
.PARAMETER o
    output directory and filename
#>

param (
    [Parameter(Mandatory = $true)][string] $h,
    [Parameter(Mandatory = $true)][string] $i,
    [Parameter(Mandatory = $true)][string] $o
)

# Make sure we fail fast
$ErrorActionPreference = "Stop"

# Arg -> Human intuitive variable
$htmlPath = $h
$iconPath = $i
$outPath = $o

Write-Output "> Source file location: $htmlPath"
Write-Output "> Icon file location: $iconPath"
Write-Output "> Output executable as: $outPath"

Write-Host "`n[###______] Step 1/3: Check argument validity" -ForegroundColor Blue

# Check correct file extensions
if ((Split-Path -Path $htmlPath -Leaf).Split(".")[-1] -eq "html") {
    Write-Host "...... First arg is a HTML file!" -ForegroundColor Green
}
else {
    Write-Error "'$htmlPath' is not a HTML file"
}

if ((Split-Path -Path $iconPath -Leaf).Split(".")[-1] -eq "ico") {
    Write-Host "...... Second arg is an ICO file!" -ForegroundColor Green
}
else {
    Write-Error "'$iconPath' is not an ICO file"
}

# Check whether files exist
if (Test-Path -Path $htmlPath -PathType leaf) {
    Write-Host "...... HTML file exists!" -ForegroundColor Green
} else {
    Write-Error "Cannot find '$htmlPath'"
}

if (Test-Path -Path $iconPath -PathType leaf) {
    Write-Host "...... ICO file exists!" -ForegroundColor Green
}
else {
    Write-Error "Cannot find '$iconPath'"
}

Write-Host "`n[######___] Step 2/3: Initiallize workspace" -ForegroundColor Blue
# Delete files created by previous session, just in case
Remove-Item .\nwjs\project.html -ErrorAction Ignore
Write-Host "...... Deleted left-over file!" -ForegroundColor Green
# Copy files locally
Copy-Item -Path $htmlPath -Destination .\nwjs\project.html
Write-Host "...... Successfully copied HTML file!" -ForegroundColor Green

Write-Host "`n[#########] Step 3/3: Make self extracting executable" -ForegroundColor Blue
# ========= MakeSFX command ========
cmd.exe /C "makesfx.exe -o -c -h -ic -mf -ft -we -di -un -oo .\nwjs $outPath $iconPath .\nwjs\nw.exe"
# ==================================
Write-Host "...... Successfully packed to exe with MakeSFX!" -ForegroundColor Green

Write-Output "`nDone."