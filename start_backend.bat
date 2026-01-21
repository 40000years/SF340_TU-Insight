@echo off
REM ตั้งค่าเพื่อใช้ pure Go SQLite driver
setlocal enabledelayedexpansion
cd /d C:\Users\User\SF340_TU-Insight\backend

echo.
echo ======================================
echo  ดาวน์โหลด Dependencies...
echo ======================================
echo.
go mod tidy

echo.
echo ======================================
echo  เรียกใช้งาน Backend
echo ======================================
echo.
set CGO_ENABLED=0
go run main.go

pause
