@echo off
REM เรียกใช้งาน Backend และ Frontend พร้อมกัน
setlocal enabledelayedexpansion

echo.
echo ======================================
echo  TU-Insight Application Startup
echo ======================================
echo.
echo เราจะเปิด Backend และ Frontend ให้คุณ
echo.
pause

echo.
echo ======================================
echo  1. เปิด Backend (Go) - Port 8080
echo ======================================
echo.

start "TU-Insight Backend" cmd /k "cd /d C:\Users\User\SF340_TU-Insight\backend && set CGO_ENABLED=0 && go mod tidy && go run main.go"

timeout /t 3 /nobreak

echo.
echo ======================================
echo  2. เปิด Frontend (React) - Port 5173
echo ======================================
echo.

start "TU-Insight Frontend" cmd /k "cd /d C:\Users\User\SF340_TU-Insight\frontend && npm install && npm run dev"

echo.
echo ======================================
echo  Application Started!
echo ======================================
echo.
echo Backend: http://localhost:8080
echo Frontend: http://localhost:5173
echo.
echo Login: test@example.com / password123
echo.
pause
