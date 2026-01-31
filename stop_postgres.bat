@echo off
echo ========================================
echo Stopping PostgreSQL Docker Container
echo ========================================
echo.

docker-compose down

if errorlevel 1 (
    echo ❌ Failed to stop PostgreSQL
    pause
    exit /b 1
)

echo.
echo ✅ PostgreSQL stopped successfully
echo.
echo Note: Your data is preserved in Docker volumes
echo To remove data permanently, run: docker-compose down -v
echo.
pause
