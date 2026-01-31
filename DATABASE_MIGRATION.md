# Database Migration Guide: SQLite → PostgreSQL

This guide explains how to use PostgreSQL with Docker for the SF340_TU-Insight application.

## Prerequisites

- **Docker Desktop** installed and running on Windows
- The application has been updated to support both SQLite and PostgreSQL

## Quick Start

### 1. Start PostgreSQL

Run the helper script:
```bash
start_postgres.bat
```

This will:
- Start PostgreSQL in a Docker container
- Create the database automatically
- Display connection details

### 2. Configure Backend

The backend is already configured to use PostgreSQL. Check `backend/.env`:
```env
DB_TYPE=postgres
```

### 3. Start the Application

Run your normal startup script:
```bash
START_APP.bat
```

The backend will automatically:
- Connect to PostgreSQL
- Create tables (User, TrendAnalysis, DashboardData)
- Be ready to accept requests

## Switching Between Databases

### Use PostgreSQL (Recommended for Production)

1. Edit `backend/.env`:
   ```env
   DB_TYPE=postgres
   ```

2. Start PostgreSQL:
   ```bash
   start_postgres.bat
   ```

3. Start the backend

### Use SQLite (Simple, File-Based)

1. Edit `backend/.env`:
   ```env
   DB_TYPE=sqlite
   ```

2. Start the backend (no Docker needed)

## Connection Details

When using PostgreSQL:

| Setting | Value |
|---------|-------|
| Host | localhost |
| Port | 5432 |
| Database | tuinsight_db |
| User | tuinsight |
| Password | tuinsight_password_2024 |

## Docker Commands

### Start PostgreSQL
```bash
start_postgres.bat
# OR manually:
docker-compose --env-file .env.docker up -d
```

### Stop PostgreSQL
```bash
stop_postgres.bat
# OR manually:
docker-compose down
```

### View Logs
```bash
docker-compose logs -f
```

### Check Status
```bash
docker-compose ps
```

### Connect to Database (CLI)
```bash
docker exec -it sf340-postgres psql -U tuinsight -d tuinsight_db
```

Useful PostgreSQL commands:
- `\dt` - List all tables
- `\d table_name` - Describe table structure
- `SELECT * FROM users;` - Query users table
- `\q` - Quit

## Data Management

### Backup Data
```bash
docker exec sf340-postgres pg_dump -U tuinsight tuinsight_db > backup.sql
```

### Restore Data
```bash
docker exec -i sf340-postgres psql -U tuinsight -d tuinsight_db < backup.sql
```

### Reset Database (Delete All Data)
```bash
docker-compose down -v
docker-compose --env-file .env.docker up -d
```

## Troubleshooting

### PostgreSQL Won't Start

**Error**: "Docker is not running"
- **Solution**: Start Docker Desktop and wait for it to fully initialize

**Error**: "Port 5432 already in use"
- **Solution**: Another PostgreSQL instance is running. Stop it or change the port in `docker-compose.yml`

### Backend Can't Connect

**Error**: "failed to connect to PostgreSQL"
- **Check**: Is PostgreSQL running? Run `docker-compose ps`
- **Check**: Are credentials correct in `backend/.env`?
- **Check**: Is `DB_TYPE=postgres` set in `backend/.env`?

### Tables Not Created

- The backend auto-migrates tables on startup
- Check backend logs for migration errors
- Manually verify: `docker exec -it sf340-postgres psql -U tuinsight -d tuinsight_db -c "\dt"`

## Environment Variables

### Backend (.env)

```env
# Database Type
DB_TYPE=postgres          # or 'sqlite'

# PostgreSQL Settings
DB_HOST=localhost
DB_PORT=5432
DB_USER=tuinsight
DB_PASSWORD=tuinsight_password_2024
DB_NAME=tuinsight_db

# SQLite Settings (when DB_TYPE=sqlite)
DB_PATH=./trends.db
```

### Docker (.env.docker)

```env
POSTGRES_USER=tuinsight
POSTGRES_PASSWORD=tuinsight_password_2024
POSTGRES_DB=tuinsight_db
```

## Production Considerations

> [!IMPORTANT]
> Before deploying to production:

1. **Change the password** in both `.env` and `.env.docker`
2. **Use environment variables** instead of hardcoded values
3. **Enable SSL** by changing `sslmode=disable` to `sslmode=require` in `db.go`
4. **Set up backups** using automated pg_dump scripts
5. **Use Docker volumes** for data persistence (already configured)

## Migration from SQLite

If you have existing data in SQLite that you want to migrate:

1. **Export SQLite data** (manual process - contact developer for script)
2. **Start PostgreSQL** with `start_postgres.bat`
3. **Import data** using SQL scripts
4. **Update** `DB_TYPE=postgres` in `.env`
5. **Test** the application thoroughly

> [!NOTE]
> Automatic data migration is not included. If you need to preserve existing SQLite data, please create a custom migration script or contact support.

## Benefits of PostgreSQL

- ✅ **Production-ready**: Industry-standard database
- ✅ **Concurrent access**: Multiple users can access simultaneously
- ✅ **Better performance**: Optimized for complex queries
- ✅ **Data integrity**: ACID compliance
- ✅ **Scalability**: Handles large datasets efficiently
- ✅ **Advanced features**: JSON support, full-text search, etc.

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review Docker logs: `docker-compose logs -f`
3. Verify environment configuration in `.env` files
