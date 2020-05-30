# This script sets up NW.js binaries folder and MakeSFX executable
# If you cloned the repo from Github, you'll need to run this script
# because NW.js binaries and MakeSFX executable are gitignored

$ErrorActionPreference = "Stop"
. "$PSScriptRoot\libsbconv.ps1"

CheckVersion(3)

Write-Output "[##______] 1 Downloading NW.js binaries..."
DownloadFile -url "https://dl.nwjs.io/v0.46.0/nwjs-v0.46.0-win-x64.zip" -targetFile "$env:temp\nwjs.zip"
Write-Host "Done." -ForegroundColor green

Write-Output "[####____] 2 Extracting ZIP archive to temp folder..."
UnzipFile -sourceFile "$env:temp\nwjs.zip" -targetFolder $env:temp
Write-Host "Done." -ForegroundColor green

Write-Output "[####____] 3 Moving files into final location..."
Get-ChildItem -Path "$env:temp\nwjs-v0.46.0-win-x64" | % {
    Copy-Item $_.fullname -Destination "$PSScriptRoot\nwjs" -Recurse -Force
}
Write-Host "Done." -ForegroundColor green

Write-Output "[######__] 3 Downloading MakeSFX executable..."
DownloadFile -url "https://revocue.cz/download/makesfx.exe" -targetFile "$PSScriptRoot\makesfx.exe"
Write-Host "Done." -ForegroundColor green

Write-Output "[########] 4 Cleaning up..."
Remove-Item "$env:temp\nwjs.zip"
Remove-Item "$env:temp\nwjs-v0.46.0-win-x64" -Recurse
Write-Host "Done." -ForegroundColor green

Write-Output "Successfully installed two dependencies. Goodbye!"