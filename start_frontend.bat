@echo off
REM เรียกใช้ Frontend
setlocal enabledelayedexpansion
cd /d C:\Users\User\SF340_TU-Insight\frontend

echo.
echo ======================================
echo  ติดตั้ง NPM Dependencies...
echo ======================================
echo.
call npm install

echo.
echo ======================================
echo  เรียกใช้งาน Frontend (Vite Dev Server)
echo ======================================
echo.
echo กรุณารอสัก 10-20 วินาที...
echo.
call npm run dev

pause
