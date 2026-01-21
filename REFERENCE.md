# 🎫 TU-Insight Reference Card

**Quick reference for everything you need to know**

---

## 🚀 Getting Started (Pick One)

### Option A: Use Pre-Built Binary (Fastest)
```bash
cd dist
cp .env.example .env
./backend              # Linux/Mac
# or
backend.exe            # Windows
# Open: http://localhost:8080
```

### Option B: Build from Source
```bash
./build.sh linux       # Linux/Mac
# or
build.bat windows      # Windows
cd dist
cp .env.example .env
./backend
```

### Option C: Deploy to Production
```bash
./build.sh linux
scp -r dist/ user@server:/opt/tu-insight/
# Follow DEPLOYMENT.md
```

---

## 📌 Default Credentials

| Field | Value |
|-------|-------|
| Email | test@example.com |
| Password | password123 |

---

## 🔌 API Quick Reference

| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| POST | /api/auth/register | ❌ | Sign up |
| POST | /api/auth/login | ❌ | Sign in |
| POST | /api/trends/analyze | ✅ | Analyze trend |
| GET | /api/trends/history | ✅ | See history |
| GET | /api/trends/:id | ✅ | See details |
| GET | /api/dashboard/metrics | ✅ | See stats |
| POST | /api/dashboard/widgets | ✅ | Save widget |
| GET | /api/dashboard/widgets | ✅ | Load widget |
| GET | /health | ❌ | Health check |

**All requests need:** `Authorization: Bearer <TOKEN>` (except ❌ endpoints)

---

## ⚙️ Configuration (.env)

```env
PORT=8080                               # Server port
JWT_SECRET=your-secret-key              # CHANGE THIS! 🔑
DB_PATH=./data/trends.db                # Database location
GIN_MODE=debug                          # debug or release
CORS_ORIGIN=http://localhost:5173       # Frontend URL
```

---

## 🗄️ Database

**Type:** SQLite (auto-created)

**Location:** `./data/trends.db`

**Tables:**
- `users` - User accounts
- `trend_analyses` - Analysis results
- `dashboard_data` - Saved widgets

**Access:**
```bash
sqlite3 data/trends.db
.tables
SELECT * FROM users;
```

---

## 📂 Project Files

| Path | Purpose |
|------|---------|
| `backend/` | Go API code |
| `backend/main.go` | Server entry point |
| `backend/routes/routes.go` | API endpoints |
| `backend/database/db.go` | Database setup |
| `backend/.env` | Production config |
| `frontend/` | HTML/CSS/JS |
| `frontend/index.html` | Single-page app |
| `dist/` | Compiled output |
| `build.bat` | Windows build script |
| `build.sh` | Linux/Mac build script |

---

## 🛠️ Build Commands

```bash
# Build for Linux
./build.sh linux

# Build for Windows
./build.sh windows

# Build for Mac
./build.sh darwin

# Build all platforms
./build.sh all

# Output: dist/ folder
```

---

## 🧪 Test API

### Register
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@test.com",
    "password": "pass123",
    "name": "Test User"
  }'
```

### Login (Get Token)
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@test.com",
    "password": "pass123"
  }'
# Response includes: {"token": "eyJhbGc...", "user": {...}}
```

### Use Token (Protected Endpoint)
```bash
curl -X POST http://localhost:8080/api/trends/analyze \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGc..." \
  -d '{
    "category": "Tech",
    "period": "short-term",
    "budget": 50000,
    "target_group": "Gen Z"
  }'
```

---

## 🚨 Common Issues

| Issue | Solution |
|-------|----------|
| Port 8080 busy | Change `PORT=9000` in .env |
| Frontend not loading | Check: `curl http://localhost:8080/` |
| Database error | Create: `mkdir -p data/` |
| Permission denied | Run: `chmod +x backend` |
| CORS error | Update `CORS_ORIGIN` in .env |
| Token invalid | Login again, copy new token |

---

## 📚 Documentation

| File | What | Time |
|------|------|------|
| [QUICKSTART.md](QUICKSTART.md) | Get running fast | 2 min |
| [README.md](README.md) | Full reference | 10 min |
| [DEPLOYMENT.md](DEPLOYMENT.md) | Production setup | 20 min |
| [API_TESTING.md](API_TESTING.md) | API examples | 5 min |
| [ARCHITECTURE.md](ARCHITECTURE.md) | Code structure | 15 min |
| [DOCS_INDEX.md](DOCS_INDEX.md) | Documentation map | 5 min |

---

## 🎯 Key Directories

```
dist/                    # Ready to deploy
├── backend              # Run this
├── frontend/            # Static files
└── .env                 # Config

data/                    # Created on first run
└── trends.db            # SQLite database
```

---

## 🔐 Security Checklist

- [ ] Change `JWT_SECRET` in .env
- [ ] Use HTTPS in production
- [ ] Set `GIN_MODE=release`
- [ ] Update `CORS_ORIGIN`
- [ ] Backup database regularly
- [ ] Use strong passwords
- [ ] Enable firewall rules

---

## 🎯 Page URLs

| Page | URL |
|------|-----|
| Login | http://localhost:8080/ |
| Dashboard | http://localhost:8080/#/dashboard |
| Analyze | http://localhost:8080/#/analyze |
| History | http://localhost:8080/#/history |
| Profile | http://localhost:8080/#/profile |

---

## 💻 System Requirements

| Component | Requirement |
|-----------|-------------|
| OS | Windows, Linux, or Mac |
| RAM | 128 MB minimum |
| Disk | 100 MB free |
| Port | 8080 (configurable) |
| Go | NOT needed (static binary) |
| Database | SQLite (included) |

---

## 🌍 Deployment Locations

### Development
```
localhost:8080
```

### Production (Linux)
```
/opt/tu-insight/backend
systemctl start tu-insight
```

### Production (Windows)
```
C:\Services\tu-insight\backend.exe
```

### Behind Nginx
```
https://yourdomain.com
```

---

## 📊 Trend Analysis Rules

Engine uses these rules:

| Condition | Trend | Confidence |
|-----------|-------|------------|
| Budget > $50K | GROWTH | 85% |
| Budget < $10K | DECLINE | 70% |
| Category: Tech | GROWTH | 90% |
| Category: Digital | GROWTH | 90% |
| Target: Gen Z | GROWTH | 92% |
| Period: Short-term | +5% | boost |
| Period: Long-term | -10% | reduce |

---

## 👥 User Roles

| Role | Can Do | Cannot Do |
|------|--------|-----------|
| Anonymous | Login, Register, Health check | Access API |
| Logged In | Analyze trends, View history, Dashboard | Admin functions |
| Admin | Everything | Create other admins |

---

## 🔄 Workflow Examples

### Daily User
1. Open http://localhost:8080
2. Login
3. Analyze trends
4. View dashboard
5. Check history

### Developer
1. Edit `backend/` or `frontend/`
2. Run `build.sh` / `build.bat`
3. Test in `dist/`
4. Push to git

### DevOps
1. Read `DEPLOYMENT_CHECKLIST.md`
2. Build: `build.sh linux`
3. Follow `DEPLOYMENT.md`
4. Monitor logs

---

## 📞 Emergency Commands

```bash
# Restart backend
pkill backend
./backend &

# Check if running
ps aux | grep backend

# View logs
tail -f nohup.out

# Check port
lsof -i :8080

# Backup database
cp data/trends.db data/trends.db.backup

# Reset to factory (delete db)
rm data/trends.db

# Clear user sessions (close all browsers)
# Users will need to login again
```

---

## 🎓 Getting Help

1. **Quick answer**: Check this card!
2. **More details**: Read [README.md](README.md)
3. **How to deploy**: Read [DEPLOYMENT.md](DEPLOYMENT.md)
4. **Code questions**: Read [ARCHITECTURE.md](ARCHITECTURE.md)
5. **API testing**: Read [API_TESTING.md](API_TESTING.md)
6. **Documentation map**: Read [DOCS_INDEX.md](DOCS_INDEX.md)

---

## ✅ Pre-Deployment Checklist

- [ ] JWT_SECRET changed
- [ ] GIN_MODE=release
- [ ] CORS_ORIGIN set correctly
- [ ] Database backups configured
- [ ] Firewall rules set
- [ ] SSL certificate installed
- [ ] Reverse proxy configured
- [ ] Systemd service created

---

## 📊 Performance Tips

```
# For production
GIN_MODE=release              # Disables logging
DB_PATH=/var/lib/tu-insight   # Faster I/O
# Setup caching layer
# Use CDN for frontend files
# Enable gzip compression in Nginx
```

---

**Quick Reference Version 1.0 | Last Updated: Jan 2024**

💡 **Tip:** Bookmark this page for quick reference!
