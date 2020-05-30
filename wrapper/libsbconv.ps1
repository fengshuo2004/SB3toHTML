# SUBROUTINE: powershell version checker
function CheckVersion([Int32]$version){
    if ($PSVersionTable.PSVersion.Major -lt $version) {
        Write-Host "This script requires PowerShell v$version.0 minimum to run, you have version"$PSVersionTable.PSVersion"`nPlease upgrade via https://docs.microsoft.com/en-us/powershell/scripting/windows-powershell/install/installing-windows-powershell#upgrading-existing-windows-powershell" -ForegroundColor Red
        Exit
    }
}

# SUBROUTINE: extract zip archives by MachineChen (https://me.csdn.net/u012611878)
function UnzipFile([String]$sourceFile, [String]$targetFolder)
{
    if(!(Test-Path $targetFolder)){
        mkdir $targetFolder
    }
    $shellApp = New-Object -ComObject Shell.Application
    $files = $shellApp.NameSpace($sourceFile).Items()
    $files|%{if (Test-Path ("$targetFolder/{0}" -f  $_.name )){Remove-Item ("$targetFolder/{0}" -f  $_.name) -Force -Recurse}}
    $shellApp.NameSpace($targetFolder).CopyHere($files, 1556)
}

# SUBROUTINE: http downloader with progress bar by SoftwareCarpenter (https://stackoverflow.com/users/1054020/softwarecarpenter)
function DownloadFile([String]$url, [String]$targetFile){
    $uri = New-Object "System.Uri" "$url"
    $request = [System.Net.HttpWebRequest]::Create($uri)
    $request.set_Timeout(15000) #15 second timeout
    $response = $request.GetResponse()
    $totalLength = [System.Math]::Floor($response.get_ContentLength()/1024)
    $responseStream = $response.GetResponseStream()
    $targetStream = New-Object -TypeName System.IO.FileStream -ArgumentList $targetFile, Create
    $buffer = new-object byte[] 10KB
    $count = $responseStream.Read($buffer,0,$buffer.length)
    $downloadedBytes = $count
    while ($count -gt 0){
        $targetStream.Write($buffer, 0, $count)
        $count = $responseStream.Read($buffer,0,$buffer.length)
        $downloadedBytes = $downloadedBytes + $count
        Write-Progress -activity "Downloading file '$($url.split('/') | Select -Last 1)'" -status "Downloaded ($([System.Math]::Floor($downloadedBytes/1024))KB of $($totalLength)KB): " -PercentComplete ((([System.Math]::Floor($downloadedBytes/1024)) / $totalLength)  * 100)
    }
    Write-Progress -activity "Finished downloading file '$($url.split('/') | Select -Last 1)'"
    $targetStream.Flush()
    $targetStream.Close()
    $targetStream.Dispose()
    $responseStream.Dispose()
}