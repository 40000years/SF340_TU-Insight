# Quick Start - PostgreSQL Setup

## New: PostgreSQL Database Support! 🎉

The application now supports **PostgreSQL** running in Docker for production-ready database management.

## Getting Started

### Option 1: PostgreSQL (Recommended)

1. **Start PostgreSQL**:
   ```bash
   start_postgres.bat
   ```

2. **Start the Application**:
   ```bash
   START_APP.bat
   ```

3. **Access**: Open http://localhost:5173

### Option 2: SQLite (Simple)

1. Edit `backend/.env` and set:
   ```env
   DB_TYPE=sqlite
   ```

2. **Start the Application**:
   ```bash
   START_APP.bat
   ```

## What Changed?

- ✅ **PostgreSQL Support**: Production-ready database with Docker
- ✅ **Dual Database Support**: Switch between SQLite and PostgreSQL
- ✅ **Easy Setup**: One-click scripts to manage PostgreSQL
- ✅ **Backward Compatible**: Existing SQLite setup still works

## Database Management

| Script | Purpose |
|--------|---------|
| `start_postgres.bat` | Start PostgreSQL Docker container |
| `stop_postgres.bat` | Stop PostgreSQL Docker container |
| `START_APP.bat` | Start the full application |

## Documentation

- **[DATABASE_MIGRATION.md](DATABASE_MIGRATION.md)** - Complete PostgreSQL setup guide
- **[README.md](README.md)** - Full project documentation
- **[GET_STARTED.md](GET_STARTED.md)** - Detailed setup instructions

## Requirements

- **For PostgreSQL**: Docker Desktop must be installed and running
- **For SQLite**: No additional requirements

## Need Help?

See [DATABASE_MIGRATION.md](DATABASE_MIGRATION.md) for:
- Detailed setup instructions
- Troubleshooting guide
- Docker commands
- Data backup/restore procedures
