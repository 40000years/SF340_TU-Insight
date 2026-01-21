@echo off
REM Build script for TU-Insight Backend
REM Usage: build.bat [windows|linux|darwin]

echo.
echo ========================================
echo  TU-Insight Backend - Build Script
echo ========================================
echo.

REM Default to Windows if no argument
set TARGET=windows
if not "%1"=="" set TARGET=%1

REM Get version from git or use timestamp
for /f "tokens=*" %%i in ('powershell -Command "Get-Date -Format yyyy.MM.dd"') do set VERSION=%%i

set BACKEND_DIR=%~dp0backend
set BUILD_DIR=%~dp0dist
set BINARY_NAME=backend

echo [*] Building for %TARGET%...
echo [*] Version: %VERSION%

REM Create build directory
if not exist "%BUILD_DIR%" mkdir "%BUILD_DIR%"

REM Set environment variables
setlocal enabledelayedexpansion
set CGO_ENABLED=0

REM Build based on target
if "%TARGET%"=="windows" (
    set GOOS=windows
    set GOARCH=amd64
    set OUTPUT=%BUILD_DIR%\%BINARY_NAME%.exe
) else if "%TARGET%"=="linux" (
    set GOOS=linux
    set GOARCH=amd64
    set OUTPUT=%BUILD_DIR%\%BINARY_NAME%
) else if "%TARGET%"=="darwin" (
    set GOOS=darwin
    set GOARCH=amd64
    set OUTPUT=%BUILD_DIR%\%BINARY_NAME%-macos
) else (
    echo [ERROR] Unknown target: %TARGET%
    echo Usage: build.bat [windows^|linux^|darwin]
    exit /b 1
)

echo [*] Output: !OUTPUT!
echo.

cd /d "%BACKEND_DIR%"

REM Build
echo [*] Compiling...
go build -o "!OUTPUT!" -v main.go

if errorlevel 1 (
    echo [ERROR] Build failed!
    exit /b 1
)

echo [OK] Build successful!
echo.
echo [*] Binary location: !OUTPUT!
echo.

REM Copy frontend
if exist "..\frontend" (
    echo [*] Copying frontend files...
    if not exist "%BUILD_DIR%\frontend" mkdir "%BUILD_DIR%\frontend"
    xcopy "..\frontend\*" "%BUILD_DIR%\frontend" /E /I /Y >nul
    echo [OK] Frontend copied
)

REM Copy .env example
if exist ".env.example" (
    echo [*] Copying .env.example...
    copy ".env.example" "%BUILD_DIR%\.env.example" >nul
    echo [OK] .env.example copied
)

echo.
echo ========================================
echo  Build Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Copy .env.example to .env in dist\ folder
echo 2. Update values in .env as needed
echo 3. Run: dist\%BINARY_NAME%.exe
echo.

endlocal
