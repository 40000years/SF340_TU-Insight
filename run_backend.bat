@echo off
title TU-Insight Backend Server
color 0A
cd /d C:\Users\User\SF340_TU-Insight\backend
echo.
echo ========================================
echo   TU-Insight Backend - API Server
echo ========================================
echo.
echo Starting Backend on port 8080...
echo.
echo Open your browser at:
echo   http://127.0.0.1:8080
echo.
echo Press Ctrl+C to stop the server
echo.
echo ========================================
echo.

set CGO_ENABLED=0
go run main.go

pause
