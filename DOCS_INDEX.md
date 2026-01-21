# 📚 Documentation Index

**Navigation Guide สำหรับการใช้ TU-Insight**

---

## 🎯 Choose Your Path

### **I'm a User (เพิ่งเปิดตัวระบบ)**
1. Start: [QUICKSTART.md](QUICKSTART.md) - 2 minutes to running
2. Login with: test@example.com / password123
3. Explore: Dashboard, Analyze, History
4. More help: [README.md](README.md#troubleshooting) Troubleshooting section

### **I'm a Developer (Developing Locally)**
1. Setup: Read [GET_STARTED.md](GET_STARTED.md)
2. Build: Use `build.bat` or `build.sh` 
3. Debug: Check logs and [ARCHITECTURE.md](ARCHITECTURE.md)
4. Deploy: Follow [DEPLOYMENT.md](DEPLOYMENT.md)

### **I'm DevOps (Setting up Production)**
1. Requirements: [DEPLOYMENT.md](DEPLOYMENT.md#requirements)
2. Checklist: [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)
3. Build: [DEPLOYMENT.md](DEPLOYMENT.md#build)
4. Deploy: [DEPLOYMENT.md](DEPLOYMENT.md#deployment)
5. Monitor: [DEPLOYMENT.md](DEPLOYMENT.md#monitoring)

---

## 📖 All Documentation

| Document | Purpose | For Whom | Time |
|----------|---------|----------|------|
| [QUICKSTART.md](QUICKSTART.md) | Get running in 2 minutes | Users | 2 min |
| [README.md](README.md) | Complete reference guide | Everyone | 10 min |
| [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) | Pre-deployment verification | DevOps | 15 min |
| [DEPLOYMENT.md](DEPLOYMENT.md) | Production deployment guide | DevOps/SysAdmin | 20 min |
| [API_TESTING.md](API_TESTING.md) | API endpoint testing | Developers | 10 min |
| [ARCHITECTURE.md](ARCHITECTURE.md) | System architecture details | Developers | 15 min |
| [GET_STARTED.md](GET_STARTED.md) | Local development setup | Developers | 5 min |

---

## 🗂️ Quick Reference

### **Most Common Tasks**

**"How do I run this?"**
→ [QUICKSTART.md](QUICKSTART.md)

**"I got an error, what now?"**
→ [README.md#troubleshooting](README.md#troubleshooting) or [DEPLOYMENT.md#troubleshooting](DEPLOYMENT.md#troubleshooting)

**"How do I deploy to production?"**
→ [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) → [DEPLOYMENT.md](DEPLOYMENT.md)

**"What are the API endpoints?"**
→ [API_TESTING.md](API_TESTING.md) or [README.md#api-endpoints](README.md#api-endpoints)

**"How do I understand the code?"**
→ [ARCHITECTURE.md](ARCHITECTURE.md)

**"Can I modify the code?"**
→ [GET_STARTED.md](GET_STARTED.md) for development setup

---

## 🚀 Workflows

### **Workflow 1: Running Existing System**
```
1. Extract dist/ folder
2. Read: QUICKSTART.md
3. Run: ./backend
4. Open: http://localhost:8080
```

### **Workflow 2: Local Development**
```
1. Clone repository
2. Read: GET_STARTED.md
3. Follow setup steps
4. Edit code
5. Build with: build.sh / build.bat
6. Test
7. Deploy with: DEPLOYMENT.md
```

### **Workflow 3: Production Deployment**
```
1. Build on dev machine: build.sh linux
2. Read: DEPLOYMENT_CHECKLIST.md
3. Follow pre-deploy checklist
4. Follow: DEPLOYMENT.md steps
5. Monitor production
6. Keep backups
```

### **Workflow 4: Debugging Issues**
```
1. Check browser console (F12)
2. Check backend logs
3. Read: README.md#troubleshooting
4. Test API: curl http://localhost:8080/health
5. Check .env configuration
6. Review: ARCHITECTURE.md for code structure
```

---

## 📊 File Organization

```
TU-Insight/
├── Documentation/
│   ├── QUICKSTART.md              ← Start here!
│   ├── README.md                  ← Complete guide
│   ├── DEPLOYMENT.md              ← Production steps
│   ├── DEPLOYMENT_CHECKLIST.md    ← Pre-deploy verify
│   ├── API_TESTING.md             ← API examples
│   ├── ARCHITECTURE.md            ← Code structure
│   ├── GET_STARTED.md             ← Dev setup
│   └── DOCS_INDEX.md              ← This file
│
├── Application/
│   ├── backend/                   ← Go API server
│   ├── frontend/                  ← HTML/CSS/JS UI
│   └── dist/                      ← Compiled output
│
├── Build Scripts/
│   ├── build.bat                  ← Windows build
│   └── build.sh                   ← Linux/Mac build
│
└── Configuration/
    ├── .env.example               ← Config template
    └── .env                       ← Actual config
```

---

## 🎓 Learning Paths

### **Path 1: User (Non-Technical)**
1. [QUICKSTART.md](QUICKSTART.md) - How to run
2. Try app features
3. [README.md#testing](README.md#testing) - If you want to test API

**Time: 15 minutes**

### **Path 2: Developer (Local Development)**
1. [GET_STARTED.md](GET_STARTED.md) - Setup
2. [ARCHITECTURE.md](ARCHITECTURE.md) - Understand code
3. Edit `backend/routes/routes.go` or `frontend/index.html`
4. Rebuild with scripts
5. Test locally

**Time: 1-2 hours**

### **Path 3: DevOps (Production)**
1. [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) - Pre-checks
2. [DEPLOYMENT.md](DEPLOYMENT.md) - Follow steps
3. Build: `build.sh linux`
4. Configure `.env` for production
5. Deploy and monitor

**Time: 2-3 hours**

### **Path 4: Full Developer (Modify & Deploy)**
1. [GET_STARTED.md](GET_STARTED.md) - Setup
2. [ARCHITECTURE.md](ARCHITECTURE.md) - Understand structure
3. Make code changes
4. [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) - Pre-checks
5. [DEPLOYMENT.md](DEPLOYMENT.md) - Deploy

**Time: 4-8 hours (depending on changes)**

---

## ❓ Frequently Asked Questions

**Q: Where do I start?**
A: Read [QUICKSTART.md](QUICKSTART.md) - it's 2 minutes!

**Q: How do I run it?**
A: [QUICKSTART.md](QUICKSTART.md#option-1-use-binary)

**Q: How do I build it?**
A: [README.md#build-process](README.md#build-process)

**Q: How do I deploy?**
A: [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) → [DEPLOYMENT.md](DEPLOYMENT.md)

**Q: What's the API?**
A: [API_TESTING.md](API_TESTING.md) or [README.md#api-endpoints](README.md#api-endpoints)

**Q: I got error X**
A: [README.md#troubleshooting](README.md#troubleshooting)

**Q: How do I understand the code?**
A: [ARCHITECTURE.md](ARCHITECTURE.md)

**Q: Can I modify it?**
A: Yes! See [GET_STARTED.md](GET_STARTED.md) for development

---

## 🔄 Document Flow Chart

```
START
  ↓
Are you...?
  ├→ Just using it? → QUICKSTART.md
  ├→ Developing? → GET_STARTED.md → ARCHITECTURE.md
  ├→ Deploying? → DEPLOYMENT_CHECKLIST.md → DEPLOYMENT.md
  └→ Testing API? → API_TESTING.md
  
  ↓
Need more help?
  ├→ Can't run? → README.md#troubleshooting
  ├→ Confused? → ARCHITECTURE.md
  └→ Production? → DEPLOYMENT.md#troubleshooting
```

---

## 📝 Documentation Maintenance

Last Updated: 2024-01-21

- [x] QUICKSTART.md - User-friendly quick start
- [x] README.md - Complete reference
- [x] DEPLOYMENT_CHECKLIST.md - Pre-deployment checklist
- [x] DEPLOYMENT.md - Production deployment
- [x] API_TESTING.md - API examples
- [x] ARCHITECTURE.md - Code structure
- [x] GET_STARTED.md - Development setup
- [x] DOCS_INDEX.md - This navigation guide

---

## 🎯 Next Steps

**If you just opened this project:**
1. Open [QUICKSTART.md](QUICKSTART.md)
2. Follow Option 1 or 2
3. Open browser to http://localhost:8080
4. Login with test@example.com / password123
5. Explore!

**Questions?**
- Check [README.md#troubleshooting](README.md#troubleshooting)
- See specific doc for your use case
- Review [ARCHITECTURE.md](ARCHITECTURE.md) if code confusion

---

**Happy using TU-Insight! 🚀**
