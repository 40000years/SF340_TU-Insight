@echo off
echo ========================================
echo Starting PostgreSQL with Docker
echo ========================================
echo.

REM Check if Docker is running
docker info >nul 2>&1
if errorlevel 1 (
    echo ❌ Error: Docker is not running!
    echo Please start Docker Desktop and try again.
    pause
    exit /b 1
)

echo ✅ Docker is running
echo.

REM Start Docker Compose
echo Starting PostgreSQL container...
docker-compose --env-file .env.docker up -d

if errorlevel 1 (
    echo ❌ Failed to start PostgreSQL
    pause
    exit /b 1
)

echo.
echo Waiting for PostgreSQL to be ready...
timeout /t 5 /nobreak >nul

REM Check container status
docker-compose ps

echo.
echo ========================================
echo ✅ PostgreSQL is running!
echo ========================================
echo.
echo Connection Details:
echo   Host: localhost
echo   Port: 5432
echo   Database: tuinsight_db
echo   User: tuinsight
echo   Password: tuinsight_password_2024
echo.
echo To stop PostgreSQL, run: stop_postgres.bat
echo To view logs, run: docker-compose logs -f
echo.
pause
