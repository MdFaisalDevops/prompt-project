$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:8080/")
$listener.Start()
Write-Host "Listening on http://localhost:8080/"
while ($listener.IsListening) {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response
    
    $localPath = "f:\Prompt" + $request.Url.LocalPath.Replace("/", "\")
    if ($localPath -eq "f:\Prompt\") { $localPath = "f:\Prompt\index.html" }
    
    if (Test-Path $localPath) {
        $content = [System.IO.File]::ReadAllBytes($localPath)
        $response.ContentLength64 = $content.Length
        if ($localPath.EndsWith(".html")) { $response.ContentType = "text/html" }
        elseif ($localPath.EndsWith(".jsx") -or $localPath.EndsWith(".js")) { $response.ContentType = "application/javascript" }
        elseif ($localPath.EndsWith(".css")) { $response.ContentType = "text/css" }
        $response.OutputStream.Write($content, 0, $content.Length)
    } else {
        $response.StatusCode = 404
    }
    $response.Close()
}
