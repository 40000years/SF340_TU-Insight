# 🎯 TU-Insight - Marketing Trend Analysis System

**ระบบวิเคราะห์เทรนด์การตลาดด้วย AI**

Professional web application for analyzing marketing trends with JWT authentication, trend prediction engine, and interactive dashboard.

---

## ✨ Features

- 🔐 **JWT Authentication** - ระบบ login/register ที่ปลอดภัย
- 📊 **Trend Analysis** - วิเคราะห์เทรนด์ตามหมวดหมู่ต่างๆ
- 📈 **Interactive Dashboard** - สถิติและเมตริกแบบ Real-time
- 📋 **History Tracking** - ประวัติการวิเคราะห์ทั้งหมด
- 👤 **User Profile** - จัดการข้อมูลส่วนตัว
- 💾 **SQLite Database** - ข้อมูลถาวร (ไม่ต้อง setup)
- 🎨 **Beautiful UI** - ดีไซน์สมัยใหม่ (Thai/English)
- 🚀 **Portable Deployment** - Windows, Linux, Mac (ไม่ต้องติดตั้ง Go)
- 🌍 **Cross-Platform** - สามารถรัน Universal Binary

---

## 🚀 Quick Start

### **Option 1: ใช้ Pre-compiled Binary (ง่ายสุด)**

```bash
# 1. Download dist folder ที่มี backend executable
# 2. Setup configuration
cd dist
cp .env.example .env

# 3. Run
./backend              # Linux/Mac
# หรือ
backend.exe            # Windows

# 4. Open browser
# http://localhost:8080
```

### **Option 2: Build from Source**

```bash
# 1. Clone repository
git clone <repo>
cd SF340_TU-Insight

# 2. Build (ต้อง Go 1.21+)
./build.sh linux      # Linux
./build.sh windows    # Windows
./build.sh darwin     # Mac
./build.sh all        # ทั้งหมด

# 3. Go to dist
cd dist
cp .env.example .env

# 4. Run
./backend
```

### **ค่า Default (สำหรับ testing):**
- Email: test@example.com
- Password: password123

---

## 📁 Project Structure

```
SF340_TU-Insight/
├── backend/                    # Go Backend (Gin Framework)
│   ├── main.go                 # Entry point + static file serving
│   ├── go.mod                  # Dependencies
│   ├── .env                    # Configuration (ตัวจริง)
│   ├── .env.example            # Configuration template
│   ├── auth/
│   │   ├── jwt.go             # JWT token handling
│   │   └── password.go        # Password hashing (bcrypt)
│   ├── database/
│   │   └── db.go              # SQLite + GORM models
│   ├── routes/
│   │   └── routes.go          # All API endpoints
│   └── trends/
│       └── analyzer.go        # Trend analysis engine
│
├── frontend/                   # Static HTML/CSS/JS (SPA)
│   ├── index.html             # Single Page App (1000+ lines)
│   └── assets/                # Optional: images, fonts
│
├── dist/                       # Distribution folder (auto-created)
│   ├── backend                 # Executable (no extension on Unix)
│   ├── backend.exe             # Executable (Windows)
│   ├── frontend/               # Static files
│   │   └── index.html
│   └── .env
│
├── build.bat                   # Build script (Windows)
├── build.sh                    # Build script (Linux/Mac)
├── DEPLOYMENT.md               # Deployment guide (production)
├── README.md                   # This file
└── README_FIRST.txt            # Quick reference
```

---

## 🎯 API Endpoints

All endpoints ต้อง `Authorization: Bearer <JWT_TOKEN>` header (ยกเว้น auth endpoints)

| Method | Endpoint | Purpose | Auth Required |
|--------|----------|---------|---|
| POST | `/api/auth/register` | สมัครสมาชิก | ❌ |
| POST | `/api/auth/login` | เข้าสู่ระบบ | ❌ |
| POST | `/api/trends/analyze` | วิเคราะห์เทรนด์ | ✅ |
| GET | `/api/trends/history` | ดูประวัติ | ✅ |
| GET | `/api/trends/:id` | ดูรายละเอียดเดิม | ✅ |
| GET | `/api/dashboard/metrics` | สถิติหลัก | ✅ |
| POST | `/api/dashboard/widgets` | บันทึก widget | ✅ |
| GET | `/api/dashboard/widgets` | ดู widget | ✅ |
| GET | `/health` | Health check | ❌ |

---

## 🔐 Security Configuration

### Production Checklist:
- [ ] Change `JWT_SECRET` ใน `.env` (ข้อมูลสำคัญ!)
- [ ] ตั้ง `GIN_MODE=release`
- [ ] ใช้ HTTPS (Nginx reverse proxy + SSL certificate)
- [ ] ตั้ง `CORS_ORIGIN` ตรงกับ domain จริง
- [ ] ใช้ strong password policy
- [ ] Enable database backups

### JWT Token:
- Valid for: 7 days
- Stored in: Browser LocalStorage
- Sent in: `Authorization: Bearer <token>` header

---

## 💾 Database Structure

**SQLite** (`./data/trends.db`) - Auto-created

Tables:
| Table | Purpose | Fields |
|-------|---------|--------|
| `users` | User accounts | id, email, password_hash, name, created_at |
| `trend_analyses` | Analysis results | id, user_id, category, period, budget, target_group, trend, confidence, created_at |
| `dashboard_data` | Saved widgets | id, user_id, title, widget_type, data_json |

---

## 🧪 Testing the API

### 1. Register New User
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "name": "Test User"
  }'
```

### 2. Login
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

Response:
```json
{
  "token": "eyJhbGc...",
  "user": {"id": 1, "email": "user@example.com", "name": "Test User"}
}
```

### 3. Analyze Trend (with token)
```bash
curl -X POST http://localhost:8080/api/trends/analyze \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <TOKEN_FROM_LOGIN>" \
  -d '{
    "category": "Tech",
    "period": "short-term",
    "budget": 50000,
    "target_group": "Gen Z"
  }'
```

---

## 📊 Features Implemented

✅ **User Authentication**
- Register / Login with email & password
- JWT token-based sessions (7 days)
- Secure bcrypt password hashing
- User profile management

✅ **Trend Analysis Engine**
- Rule-based prediction algorithm
- Inputs: Category, Period, Budget, Target Group
- Output: Trend type + confidence score
- Full analysis history

✅ **Interactive Dashboard**
- Metrics cards (total analyses, high confidence, categories)
- Pie chart: trend distribution
- Bar chart: analyses by category
- History table with sorting/filtering
- Real-time data updates

✅ **Multi-page Interface**
- **Login/Register**: User authentication
- **Dashboard**: Metrics & charts
- **Analyze**: Trend analysis form
- **History**: All analyses with details
- **Profile**: User information

---

## 🌐 Environment Configuration

Create `.env` in root or `dist/` directory:

```env
# Server
PORT=8080
GIN_MODE=debug                              # debug or release

# Security
JWT_SECRET=your-super-secret-key-change-in-production

# Database
DB_PATH=./data/trends.db                    # Relative path from executable

# CORS
CORS_ORIGIN=http://localhost:5173           # Frontend URL
```

---

## ⚙️ Build Process

### Build for Windows (from Windows):
```bash
build.bat windows
```

### Build for Linux (from Linux/Mac):
```bash
./build.sh linux
```

### Build for All Platforms:
```bash
./build.sh all
```

Output: `dist/` folder with:
- `backend` (Linux/Mac) or `backend.exe` (Windows)
- `frontend/` (static files)
- `.env.example`

---

## 📦 Distribution Package Contents

```
dist/
├── backend              # Executable (no setup needed)
├── backend.exe          # Windows executable
├── frontend/
│   └── index.html      # Single-page app
├── .env.example        # Configuration template
└── data/               # Created on first run
    └── trends.db       # SQLite database
```

**Total size:** ~20 MB (single executable, includes everything)

---

## 🚀 Deployment Options

### Option 1: Standalone (Simple)
```bash
cp -r dist/ /opt/tu-insight/
cd /opt/tu-insight/
cp .env.example .env
./backend &
```

### Option 2: With Systemd (Linux)
See [DEPLOYMENT.md](DEPLOYMENT.md#systemd-service)

### Option 3: Docker (Optional)
See [DEPLOYMENT.md](DEPLOYMENT.md#docker-deployment)

### Option 4: Reverse Proxy (Nginx)
See [DEPLOYMENT.md](DEPLOYMENT.md#nginx-configuration)

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Change PORT in .env
PORT=9000
./backend
```

### Database Permission Denied
```bash
# Ensure data folder exists
mkdir -p data
chmod 755 data

# Run backend
./backend
```

### Frontend Not Loading
```bash
# Check backend serving frontend
curl http://localhost:8080/
# Should return HTML content
```

### CORS Errors in Browser
```
# Update CORS_ORIGIN in .env to match frontend URL
CORS_ORIGIN=http://your-domain.com
```

---

## 📚 Additional Resources

- **Production Deployment**: [DEPLOYMENT.md](DEPLOYMENT.md)
- **API Testing**: [API_TESTING.md](API_TESTING.md)
- **Architecture**: [ARCHITECTURE.md](ARCHITECTURE.md)
- **Quick Reference**: [README_FIRST.txt](README_FIRST.txt)

---

## 🛠️ Tech Stack

| Component | Technology | Version | Purpose |
|-----------|-----------|---------|---------|
| **Backend** | Go | 1.21+ | API server |
| **Framework** | Gin Web | v1.9+ | HTTP routing |
| **Database** | SQLite | Pure Go | Data persistence |
| **Auth** | JWT | Standard | Token auth |
| **Hashing** | bcrypt | Go crypto | Password security |
| **Frontend** | Vanilla JS | ES6+ | UI (no build needed) |
| **Styling** | CSS3 | Modern | Responsive design |

---

## 💡 Development Tips

### Local Development (from source):
```bash
# Terminal 1: Backend
cd backend
go run main.go

# Terminal 2: Edit frontend (optional)
cd frontend
# Edit index.html directly, save & refresh browser
```

### Debugging:
```bash
# View logs
GIN_MODE=debug ./backend

# Check database
sqlite3 data/trends.db ".tables"

# Test API
curl http://localhost:8080/health
```

---

## 📝 Example Analysis

Input:
```json
{
  "category": "Tech",
  "period": "short-term",
  "budget": 75000,
  "target_group": "Gen Z"
}
```

Output:
```json
{
  "id": 1,
  "trend": "GROWTH",
  "confidence": 92,
  "analysis": "Strong growth indicators",
  "created_at": "2024-01-21T10:30:00Z"
}
```

---

## 🤝 Contributing

Contributions welcome! Areas for improvement:
- Advanced analytics engine
- Machine learning integration
- Mobile app
- Real API data source
- Performance optimization

---

## 📄 License

MIT License - Free to use and modify

---

## 📞 Support

If you encounter issues:
1. Check browser console (F12)
2. Check backend logs (terminal output)
3. Verify `.env` configuration
4. See [DEPLOYMENT.md](DEPLOYMENT.md) Troubleshooting section
5. Check API endpoints with curl

---

**Made with ❤️ for TU-Insight Project | 2024**

### AuthContext
- Global auth state management
- Token persistence
- Login/logout functionality

## 🚨 Troubleshooting

**Port already in use:**
```bash
# Backend (change in .env PORT=8081)
# Frontend (change in vite.config.js server.port = 5174)
```

**Database locked:**
```bash
# Delete trends.db and restart backend
rm trends.db
go run main.go
```

**CORS error:**
- Ensure `CORS_ORIGIN` in backend .env matches frontend URL

**Module not found (Go):**
```bash
go mod tidy
go mod download
```

**Dependencies not found (React):**
```bash
rm -rf node_modules package-lock.json
npm install
```

## ✨ Production Deployment

For production:
1. Change `JWT_SECRET` to a secure random string
2. Set `GIN_MODE=release`
3. Update `CORS_ORIGIN` to production domain
4. Build frontend: `npm run build` (creates `dist/` folder)
5. Deploy backend and frontend separately

## 📞 Support

- Check backend logs: `go run main.go` output
- Check frontend console: Browser DevTools → Console
- Verify APIs: Open `http://localhost:8080/health`

---

**Ready to use on localhost! Copy-paste and run.** ✅
