# ⚡ Quick Start - TU-Insight

**ไม่มีเวลา? เริ่มทำงานใน 2 นาที**

---

## 🟢 Option 1: ใช้ Binary ที่ compile แล้ว (เร็วที่สุด)

```bash
# 1. ไปที่ dist folder
cd dist

# 2. Setup configuration
cp .env.example .env

# 3. รัน
./backend              # Linux/Mac
# หรือ
backend.exe            # Windows

# 4. เปิด browser
# http://localhost:8080
```

**ค่า default:**
- Email: test@example.com
- Password: password123

---

## 🔵 Option 2: Build เอง (ต้อง Go 1.21+)

```bash
# Windows
build.bat windows

# Linux/Mac
./build.sh linux

# Output: dist/ folder พร้อมใช้
cd dist
cp .env.example .env
./backend
```

---

## ⚙️ Configuration (.env)

```env
PORT=8080
JWT_SECRET=your-secret-key
DB_PATH=./data/trends.db
GIN_MODE=debug
CORS_ORIGIN=http://localhost:5173
```

---

## 🧪 Test API

```bash
# 1. Register
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"pass123","name":"Test"}'

# 2. Login (ได้ token)
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"pass123"}'

# 3. Analyze (ใช้ token จากข้อ 2)
curl -X POST http://localhost:8080/api/trends/analyze \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"category":"Tech","period":"short-term","budget":50000,"target_group":"Gen Z"}'
```

---

## 📁 Folder Structure

```
dist/                    # ใช้ folder นี้ deploy
├── backend              # Executable
├── backend.exe          # Windows executable
├── frontend/            # Static files
└── .env                 # Configuration
```

---

## 🚨 Troubleshooting

| ปัญหา | วิธีแก้ |
|------|-------|
| Port 8080 busy | `PORT=9000` ใน .env |
| Frontend not loading | `curl http://localhost:8080` |
| Permission denied | `chmod +x backend` |
| Database error | `mkdir -p data` |

---

## 📚 More Info

- Full docs: [README.md](README.md)
- Deployment: [DEPLOYMENT.md](DEPLOYMENT.md)
- API testing: [API_TESTING.md](API_TESTING.md)

---

**Ready? Open http://localhost:8080 now! 🚀**
