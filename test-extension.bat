@echo off
setlocal
set "SCRIPT_DIR=%~dp0"
:: Remove trailing backslash if present
if "%SCRIPT_DIR:~-1%"=="\" set "SCRIPT_DIR=%SCRIPT_DIR:~0,-1%"

echo ==> Testing Archive Lens extension...
echo     Extension path: %SCRIPT_DIR%

set "BROWSER_BIN="

:: Check common Chrome paths
if exist "%ProgramFiles%\Google\Chrome\Application\chrome.exe" set "BROWSER_BIN=%ProgramFiles%\Google\Chrome\Application\chrome.exe"
if not defined BROWSER_BIN if exist "%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe" set "BROWSER_BIN=%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe"
if not defined BROWSER_BIN if exist "%LocalAppData%\Google\Chrome\Application\chrome.exe" set "BROWSER_BIN=%LocalAppData%\Google\Chrome\Application\chrome.exe"

:: Check common Edge paths
if not defined BROWSER_BIN if exist "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" set "BROWSER_BIN=%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe"
if not defined BROWSER_BIN if exist "%ProgramFiles%\Microsoft\Edge\Application\msedge.exe" set "BROWSER_BIN=%ProgramFiles%\Microsoft\Edge\Application\msedge.exe"

:: Check Brave paths
if not defined BROWSER_BIN if exist "%ProgramFiles%\BraveSoftware\Brave-Browser\Application\brave.exe" set "BROWSER_BIN=%ProgramFiles%\BraveSoftware\Brave-Browser\Application\brave.exe"
if not defined BROWSER_BIN if exist "%LocalAppData%\BraveSoftware\Brave-Browser\Application\brave.exe" set "BROWSER_BIN=%LocalAppData%\BraveSoftware\Brave-Browser\Application\brave.exe"

if not defined BROWSER_BIN (
    echo [ERROR] Chrome, Edge, or Brave executable could not be found automatically.
    echo Please open your browser and load the extension manually via chrome://extensions or edge://extensions.
    pause
    exit /b 1
)

start "" "%BROWSER_BIN%" --load-extension="%SCRIPT_DIR%" --no-first-run --no-default-browser-check "https://en.wikipedia.org/wiki/Web_archiving"

echo ==> Browser launched with Archive Lens loaded.
echo     - Right-click any link or page to see 'Archive Lens'
echo     - Click the toolbar icon or press Alt+A for instant Archive.today lookup
