@echo off
setlocal enabledelayedexpansion

REM สี่เซตขึ้น
color 0A

REM ตั้งค่า path
set BACKEND_PATH=C:\Users\User\SF340_TU-Insight\backend
set BACKEND_EXE=%BACKEND_PATH%\backend.exe

REM ตรวจสอบ executable
if not exist "%BACKEND_EXE%" (
    echo.
    echo [*] Compiling backend...
    cd /d "%BACKEND_PATH%"
    set CGO_ENABLED=0
    go build -o backend.exe main.go
    if errorlevel 1 (
        echo [ERROR] Failed to compile backend!
        pause
        exit /b 1
    )
)

REM รัน backend
echo.
echo ========================================
echo   BACKEND IS RUNNING
echo ========================================
echo.
echo API URL: http://127.0.0.1:8080
echo.
echo Open browser and go to:
echo   http://127.0.0.1:8080
echo.
echo ========================================
echo.

"%BACKEND_EXE%"

echo.
echo [*] Backend stopped
pause
