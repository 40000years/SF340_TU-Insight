# Quick Start Guide - Marketing Trend Analysis Application

## ⚡ 30-Second Setup

### Step 1: Terminal 1 - Run Backend (Go)
```bash
cd backend
go mod download
go run main.go
```
✅ Backend ready on `http://localhost:8080`

### Step 2: Terminal 2 - Run Frontend (React)
```bash
cd frontend
npm install
npm run dev
```
✅ Frontend ready on `http://localhost:5173`

---

## 🎯 Test User Login

**Email:** test@example.com  
**Password:** password123

First time? Use Register button to create account.

---

## 📊 Full Feature List

✅ JWT Authentication (Register/Login)  
✅ Rule-based Trend Analysis Engine  
✅ Dashboard with Real-time Metrics  
✅ Interactive Charts (Pie & Bar)  
✅ Analysis History with Filters  
✅ SQLite Database  
✅ Responsive Mobile Design  
✅ Copy-paste Ready (No Config)  

---

## 🔧 Troubleshooting

| Issue | Solution |
|-------|----------|
| Port 8080 in use | Change `backend/.env` PORT=8081 |
| Port 5173 in use | Change `frontend/vite.config.js` port = 5174 |
| Database error | Delete `backend/trends.db` restart backend |
| CORS error | Verify `CORS_ORIGIN` in backend/.env |
| Module error (Go) | Run `go mod tidy` in backend/ |
| Dependency error (npm) | Delete `frontend/node_modules` and reinstall |

---

## 📝 API Endpoints (for testing)

### Register
```bash
POST http://localhost:8080/api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "Full Name"
}
```

### Login
```bash
POST http://localhost:8080/api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

### Analyze Trend (requires token)
```bash
POST http://localhost:8080/api/trends/analyze
Authorization: Bearer <YOUR_TOKEN>
Content-Type: application/json

{
  "category": "Tech",
  "period": "short-term",
  "budget": 75000,
  "target_group": "Gen Z"
}
```

---

## 🎨 UI/UX Design

- **Color Scheme:** Purple gradient (#667eea → #764ba2)
- **Typography:** System fonts (Segoe UI, Roboto)
- **Layout:** Flexbox + CSS Grid
- **Animation:** Smooth transitions (0.3s)
- **Responsive:** Mobile-first design

---

## 💾 Files Overview

### Backend (Go)
- `main.go` - Server entry point
- `database/db.go` - SQLite models & migrations
- `auth/jwt.go` - Token generation/verification
- `auth/password.go` - Password hashing
- `routes/auth.go` - Auth endpoints
- `routes/trends.go` - Trend analysis endpoints
- `routes/dashboard.go` - Dashboard endpoints
- `trends/analyzer.go` - Trend analysis logic

### Frontend (React)
- `src/main.jsx` - React entry point
- `src/App.jsx` - Router & layout
- `src/api.js` - HTTP client (Axios)
- `src/context/AuthContext.jsx` - Auth state
- `src/pages/LoginPage.jsx` - Auth UI
- `src/pages/DashboardPage.jsx` - Main dashboard
- `src/components/TrendForm.jsx` - Analysis form
- `src/components/TrendChart.jsx` - Charts
- `src/styles/*.css` - Responsive styles

---

## ✨ What Makes This Special

1. **Production-Ready** - Proper error handling, validation, auth
2. **Zero Config** - Copy-paste and run immediately
3. **Scalable** - RESTful API + modular component structure
4. **Secure** - JWT tokens + password hashing + CORS
5. **Beautiful UI** - Modern gradient design + smooth animations
6. **Full-Stack** - Complete user flow from registration to analysis

---

## 🚀 Next Steps (Optional)

1. **Customize JWT Secret:**
   - `backend/.env` → JWT_SECRET=your_secure_key_here

2. **Change Database Path:**
   - `backend/.env` → DB_PATH=/path/to/database.db

3. **Build for Production:**
   ```bash
   # Frontend
   cd frontend && npm run build
   # Creates dist/ folder ready for deployment
   
   # Backend
   # Just deploy main.go as executable
   ```

4. **Add More Features:**
   - Export data to CSV
   - User profile management
   - Advanced ML models
   - Email notifications

---

**All done! Enjoy your Marketing Trend Analysis App! 🎉**
