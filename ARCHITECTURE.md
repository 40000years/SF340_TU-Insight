📊 MARKETING TREND ANALYSIS - COMPLETE SETUP ✅
================================================================================

🏗️ PROJECT ARCHITECTURE
================================================================================

┌─────────────────────────────────────────────────────────────────────────────┐
│                         FRONTEND (React.js + Vite)                          │
│                        http://localhost:5173                                │
├─────────────────────────────────────────────────────────────────────────────┤
│ • LoginPage (Register/Login with JWT)                                       │
│ • DashboardPage (Metrics, Charts, History)                                 │
│ • TrendForm (Analysis Input)                                               │
│ • TrendChart (Pie & Bar Charts)                                            │
│ • Responsive CSS + Recharts                                                │
└─────────────────────────────────────────────────────────────────────────────┘
                                     ↑↓ (Axios)
                              /api/auth/...
                              /api/trends/...
                            /api/dashboard/...
                                     ↑↓
┌─────────────────────────────────────────────────────────────────────────────┐
│                          BACKEND (Go + Gin)                                  │
│                         http://localhost:8080                               │
├─────────────────────────────────────────────────────────────────────────────┤
│ • Auth Handler (JWT Token Generation)                                       │
│ • Trend Analyzer (Rule-based Engine)                                       │
│ • Dashboard Metrics (Stats & Breakdown)                                     │
│ • CORS + Error Handling                                                     │
└─────────────────────────────────────────────────────────────────────────────┘
                                     ↓
                         ┌──────────────────────┐
                         │   SQLite Database    │
                         │   (trends.db)        │
                         │  Users, Trends, etc  │
                         └──────────────────────┘

================================================================================
🚀 QUICK START (3 COMMANDS)
================================================================================

💻 TERMINAL 1 (BACKEND)
─────────────────────────────────────────────────────────────────────────────
$ cd backend
$ go mod download
$ go run main.go

Expected Output:
  ✓ Server running on :8080

💻 TERMINAL 2 (FRONTEND)
─────────────────────────────────────────────────────────────────────────────
$ cd frontend
$ npm install
$ npm run dev

Expected Output:
  ✓ Local: http://localhost:5173

🌐 BROWSER
─────────────────────────────────────────────────────────────────────────────
Open: http://localhost:5173

✅ You're done!

================================================================================
📊 TEST THE APP
================================================================================

1️⃣ REGISTER
   - Email: test@example.com
   - Password: password123
   - Name: Test User
   
2️⃣ ANALYZE TREND
   - Category: "Tech"
   - Period: "Short Term (1-3 months)"
   - Budget: 75000
   - Target Group: "Gen Z"
   
3️⃣ VIEW RESULTS
   - Trend: GROWTH
   - Confidence: 92%
   - Details: Full analysis description
   
4️⃣ DASHBOARD
   - Total Analyses: 1
   - High Confidence: 1
   - Charts: Pie + Bar
   - History Table: All past analyses

================================================================================
🔑 FOLDER STRUCTURE (COMPLETE)
================================================================================

SF340_TU-Insight/
│
├── 📁 backend/                  ← Go API Server
│   ├── main.go                  Entry point
│   ├── go.mod                   Dependencies
│   ├── .env                      Config (ready to use)
│   ├── .env.example             Config template
│   ├── 📁 auth/
│   │   ├── jwt.go              Token generation
│   │   └── password.go         Password hashing
│   ├── 📁 database/
│   │   └── db.go               SQLite models
│   ├── 📁 routes/
│   │   ├── auth.go             Login/Register
│   │   ├── trends.go           Trend endpoints
│   │   ├── dashboard.go        Dashboard endpoints
│   │   └── routes.go           Router setup
│   └── 📁 trends/
│       └── analyzer.go         Analysis logic
│
├── 📁 frontend/                 ← React UI
│   ├── package.json            Dependencies
│   ├── vite.config.js          Vite config
│   ├── index.html              HTML entry
│   ├── .env                     Config (ready to use)
│   ├── .env.example            Config template
│   └── 📁 src/
│       ├── main.jsx            React entry
│       ├── App.jsx             Main component
│       ├── api.js              Axios client
│       ├── 📁 context/
│       │   └── AuthContext.jsx Auth state
│       ├── 📁 pages/
│       │   ├── LoginPage.jsx   Auth UI
│       │   └── DashboardPage.jsx Dashboard UI
│       ├── 📁 components/
│       │   ├── TrendForm.jsx   Analysis form
│       │   ├── TrendChart.jsx  Charts
│       │   ├── MetricsCard.jsx Metrics
│       │   └── ProtectedRoute.jsx Auth protection
│       └── 📁 styles/
│           ├── index.css       Global styles
│           ├── auth.css        Login styles
│           ├── dashboard.css   Dashboard styles
│           └── components.css  Component styles
│
├── README.md                    Full documentation
├── QUICK_START.md              Quick guide
└── START_HERE.txt              This file

================================================================================
🔐 AUTHENTICATION FLOW
================================================================================

┌────────────┐
│ User Input │
└─────┬──────┘
      │
      ▼
┌─────────────────────┐
│ Register/Login      │
│ /api/auth/*         │
└────────┬────────────┘
         │
         ├─→ Validate email/password
         ├─→ Hash password (bcrypt)
         ├─→ Store in database
         └─→ Generate JWT token
                │
                ▼
         ┌──────────────┐
         │ Token sent   │
         │ to client    │
         └──────┬───────┘
                │
                ▼
         ┌──────────────────────┐
         │ Stored in localStorage│
         │ Sent in each request  │
         │ Authorization header  │
         └──────────────────────┘

================================================================================
📈 TREND ANALYSIS ENGINE (Rule-Based)
================================================================================

INPUT PARAMETERS:
├─ Category: string (e.g., "Tech", "Fashion", "Food")
├─ Period: string (short-term, medium-term, long-term)
├─ Budget: number (e.g., 50000)
└─ Target Group: string (e.g., "Gen Z", "Families")

ANALYSIS RULES:
├─ If budget > $50,000 → GROWTH (85% confidence)
├─ If budget < $10,000 → DECLINE (70% confidence)
├─ If category contains "Tech" → GROWTH (90% confidence)
├─ If category contains "Digital" → GROWTH (90% confidence)
├─ If target contains "Gen Z" → GROWTH (92% confidence)
├─ If target contains "Young" → GROWTH (90% confidence)
├─ If period contains "Short" → +5% confidence
└─ If period contains "Long" → -10% confidence

OUTPUT:
├─ Trend: GROWTH | DECLINE | STABLE
├─ Confidence: 0.0 - 1.0 (displayed as percentage)
└─ Details: Detailed explanation of prediction

EXAMPLE:
  Input:  Category="Tech", Period="Short-term", Budget=$75000, Target="Gen Z"
  Rules:  
    - Category "Tech" → GROWTH (90%)
    - Budget $75000 > $50000 → GROWTH (85%)
    - Target "Gen Z" → GROWTH (92%)
    - Period "Short-term" → +5%
  Output: GROWTH with 92% confidence

================================================================================
🎯 API ENDPOINTS (Complete Reference)
================================================================================

🔵 PUBLIC ENDPOINTS (No Auth Required)

POST /api/auth/register
Request:
  {
    "email": "user@example.com",
    "password": "password123",
    "name": "Full Name"
  }
Response:
  {
    "token": "eyJhbGc...",
    "user": {
      "id": 1,
      "email": "user@example.com",
      "name": "Full Name"
    }
  }

POST /api/auth/login
Request:
  {
    "email": "user@example.com",
    "password": "password123"
  }
Response:
  {
    "token": "eyJhbGc...",
    "user": { ... }
  }

🟢 PROTECTED ENDPOINTS (Requires JWT Token in Authorization header)

POST /api/trends/analyze
Headers:
  Authorization: Bearer <token>
Request:
  {
    "category": "Tech",
    "period": "short-term",
    "budget": 75000,
    "target_group": "Gen Z"
  }
Response:
  {
    "id": 1,
    "trend": "GROWTH",
    "confidence": 0.92,
    "details": "Analysis for Tech market..."
  }

GET /api/trends/history
Headers:
  Authorization: Bearer <token>
Response:
  [
    { "id": 1, "category": "Tech", "trend": "GROWTH", ... },
    { "id": 2, "category": "Fashion", "trend": "STABLE", ... }
  ]

GET /api/trends/:id
Headers:
  Authorization: Bearer <token>
Response:
  { "id": 1, "category": "Tech", "trend": "GROWTH", ... }

GET /api/dashboard/metrics
Headers:
  Authorization: Bearer <token>
Response:
  {
    "total_analyses": 5,
    "average_trend": "GROWTH",
    "high_confidence": 3,
    "categories": ["Tech", "Fashion"],
    "trend_breakdown": { "GROWTH": 3, "STABLE": 2 }
  }

POST /api/dashboard/widgets
Headers:
  Authorization: Bearer <token>
Request:
  {
    "title": "My Chart",
    "type": "chart",
    "data": { ... }
  }
Response:
  { "id": 1, "title": "My Chart", ... }

GET /api/dashboard/widgets
Headers:
  Authorization: Bearer <token>
Response:
  [ { "id": 1, "title": "My Chart", ... } ]

================================================================================
🎨 UI/UX DETAILS
================================================================================

COLOR SCHEME:
├─ Primary: #667eea (Blue-Purple)
├─ Secondary: #764ba2 (Deep Purple)
├─ Success: #10b981 (Green) - GROWTH
├─ Danger: #ef4444 (Red) - DECLINE
└─ Warning: #f59e0b (Amber) - STABLE

TYPOGRAPHY:
├─ Headings: 28px - 24px, Bold
├─ Body: 14px, Regular
└─ Small: 12px, Regular

COMPONENTS:
├─ Buttons: Gradient, Hover effects, Disabled states
├─ Forms: Full-width inputs, Validation feedback
├─ Cards: Shadow, Rounded corners, Hover lift
├─ Tables: Striped rows, Hover highlight
└─ Charts: Responsive, Touch-friendly

ANIMATIONS:
├─ Fade-in: 0.3s ease-in
├─ Slide-up: 0.3s ease-in
└─ Hover: 0.3s smooth transitions

RESPONSIVE:
├─ Desktop: Full layout, multi-column grids
├─ Tablet: Adjusted spacing, 2-column grids
└─ Mobile: Single column, stacked layout

================================================================================
🔧 ENVIRONMENT VARIABLES
================================================================================

BACKEND (.env):
  JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
  DB_PATH=./trends.db
  PORT=8080
  GIN_MODE=debug
  CORS_ORIGIN=http://localhost:5173

FRONTEND (.env):
  VITE_API_URL=http://localhost:8080

================================================================================
✅ VERIFICATION CHECKLIST
================================================================================

□ Backend running on http://localhost:8080
  - Run: go run main.go
  - Check: http://localhost:8080/health returns {"status":"ok"}

□ Frontend running on http://localhost:5173
  - Run: npm run dev
  - Check: http://localhost:5173 loads login page

□ Database created
  - Check: backend/trends.db exists after first run

□ User registration works
  - Register new user in web UI
  - Check: backend logs show user created

□ JWT token working
  - Login successfully
  - Check: localStorage has token (DevTools → Storage)

□ Trend analysis works
  - Submit trend form
  - Check: Dashboard shows result

□ Charts rendering
  - Switch to Dashboard tab
  - Check: Pie and Bar charts display

□ History table showing
  - Switch to History tab
  - Check: All past analyses listed

================================================================================
📚 DOCUMENTATION FILES
================================================================================

README.md              Complete detailed documentation
QUICK_START.md        Fast setup and testing guide
START_HERE.txt        This visual guide

Each file has specific information for different needs.

================================================================================
🎓 LEARNING RESOURCES
================================================================================

FRONTEND:
- React: https://react.dev
- Vite: https://vitejs.dev
- Recharts: https://recharts.org

BACKEND:
- Go: https://golang.org/doc
- Gin: https://gin-gonic.com
- GORM: https://gorm.io

DATABASE:
- SQLite: https://www.sqlite.org
- GORM ORM: https://gorm.io

AUTH:
- JWT: https://jwt.io
- bcrypt: https://godoc.org/golang.org/x/crypto/bcrypt

================================================================================
💡 TIPS & TRICKS
================================================================================

1. Monitor Logs
   - Backend: Check terminal output for errors
   - Frontend: Open DevTools (F12) → Console tab

2. Debug API Calls
   - Use curl or Postman for testing
   - Check Network tab in DevTools

3. Database Inspection
   - Use SQLite Browser for exploring database
   - Or use Go CLI: sqlite3 trends.db

4. Token Debugging
   - Decode JWT at https://jwt.io
   - Check localStorage: DevTools → Storage → Local Storage

5. CORS Issues
   - Ensure CORS_ORIGIN matches frontend URL
   - Check browser console for CORS errors

6. Performance
   - Check Page Load: DevTools → Performance
   - Monitor API latency: Network tab

================================================================================
🚨 COMMON ISSUES & SOLUTIONS
================================================================================

Issue: "Port 8080 already in use"
Solution: Change PORT in backend/.env to 8081

Issue: "Cannot find module 'axios'"
Solution: Run 'npm install' in frontend directory

Issue: "CORS error in console"
Solution: Check CORS_ORIGIN in backend/.env matches http://localhost:5173

Issue: "Database locked"
Solution: Delete trends.db and restart backend

Issue: "Invalid token"
Solution: Clear localStorage and login again

Issue: "Module not found in Go"
Solution: Run 'go mod tidy' then 'go mod download'

Issue: "Blank dashboard"
Solution: Try creating a trend analysis first

================================================================================
🎯 NEXT STEPS
================================================================================

1. ✅ Follow the Quick Start above
2. ✅ Test registration and login
3. ✅ Create a trend analysis
4. ✅ View dashboard and charts
5. ✅ Check analysis history
6. ✅ Read README.md for full features
7. ✅ Explore the code structure
8. ✅ Customize colors/features as needed
9. ✅ Deploy to production (optional)

================================================================================
✨ YOU'RE READY! - START WITH:
================================================================================

Terminal 1:
  $ cd backend && go mod download && go run main.go

Terminal 2:
  $ cd frontend && npm install && npm run dev

Browser:
  http://localhost:5173

Enjoy! 🎉

================================================================================
