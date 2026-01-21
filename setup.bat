@echo off
REM Complete Setup Script for Marketing Trend Analysis Application (Windows)
REM Run this script to automatically set up everything

setlocal enabledelayedexpansion

cls
echo ================================================
echo 📊 Marketing Trend Analysis Setup
echo ================================================
echo.

REM Check prerequisites
echo ✓ Checking prerequisites...

go version >nul 2>&1
if errorlevel 1 (
    echo ❌ Go is not installed. Download from https://golang.org/dl/
    pause
    exit /b 1
)

node -v >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed. Download from https://nodejs.org/
    pause
    exit /b 1
)

npm -v >nul 2>&1
if errorlevel 1 (
    echo ❌ npm is not installed (comes with Node.js)
    pause
    exit /b 1
)

echo ✓ Go version: 
go version
echo ✓ Node version:
node -v
echo ✓ npm version:
npm -v
echo.

REM Setup Backend
echo ================================================
echo 📦 Setting up Backend (Go)
echo ================================================
cd backend

if not exist ".env" (
    echo Creating .env file...
    copy .env.example .env
)

echo Downloading Go dependencies...
call go mod download

echo.
echo ✓ Backend setup complete!
echo Run 'go run main.go' in backend/ directory
echo.

REM Setup Frontend
echo ================================================
echo 📦 Setting up Frontend (React)
echo ================================================
cd ..\frontend

if not exist ".env" (
    echo Creating .env file...
    copy .env.example .env
)

echo Installing npm dependencies...
call npm install

echo.
echo ✓ Frontend setup complete!
echo Run 'npm run dev' in frontend/ directory
echo.

REM Summary
echo ================================================
echo ✅ Setup Complete!
echo ================================================
echo.
echo 📚 Next Steps:
echo.
echo 1. Open TWO terminal windows
echo.
echo    Terminal 1 (Backend):
echo    $ cd backend
echo    $ go run main.go
echo.
echo    Terminal 2 (Frontend):
echo    $ cd frontend
echo    $ npm run dev
echo.
echo 2. Open browser:
echo    http://localhost:5173
echo.
echo 3. Register new account or login
echo.
echo 4. Create trend analysis and view dashboard
echo.
echo 📖 Documentation:
echo    - README.md - Full documentation
echo    - QUICK_START.md - Quick reference
echo    - ARCHITECTURE.md - Visual guide
echo.
echo ================================================
echo.
pause
