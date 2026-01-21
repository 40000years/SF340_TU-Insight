# 🚀 TU-Insight Deployment Guide

## ✅ ความพร้อม (Requirements)
- **Windows/Linux/Mac:** ✅ ทำให้ compatible ทั้งหมด
- **Go:** ❌ ไม่ต้องติดตั้ง (compile แล้ว)
- **Node.js:** ❌ ไม่ต้องติดตั้ง (static files)
- **Database:** ✅ SQLite (included)

---

## 📦 **วิธี Build (สำหรับนักพัฒนา)**

### **บน Windows:**
```bash
# Build สำหรับ Windows
build.bat windows

# Build สำหรับ Linux
build.bat linux

# Build สำหรับ Mac
build.bat darwin
```

### **บน Linux/Mac:**
```bash
# Build สำหรับ Linux
./build.sh linux

# Build สำหรับ Windows
./build.sh windows

# Build สำหรับ Mac
./build.sh darwin

# Build ทั้งหมด
./build.sh all
```

---

## 📂 **Deploy (สำหรับ End User)**

### **Step 1: ดาวน์โหลด dist folder**
```
dist/
├── backend.exe (Windows) หรือ backend (Linux)
├── frontend/
│   └── index.html
├── .env.example
└── data/ (จะสร้างอัตโนมัติ)
```

### **Step 2: Setup .env**
```bash
# Copy ตัวอย่าง
cp .env.example .env

# แก้ไขค่า (optional)
# PORT=8080
# JWT_SECRET=your_secret_key
```

### **Step 3: รัน**

**Windows:**
```bash
backend.exe
```

**Linux/Mac:**
```bash
chmod +x backend
./backend
```

### **Step 4: เปิด Browser**
```
http://localhost:8080
```

---

## 🔒 **Production Settings**

### **ปรับปรุง .env:**
```env
# Production
PORT=80
GIN_MODE=release
JWT_SECRET=use_strong_random_key_here

# Database - absolute path ได้
DB_PATH=/var/lib/tu-insight/trends.db

# CORS - สำหรับ production domain
CORS_ORIGIN=https://your-domain.com
```

### **วิธี Generate Strong Secret:**
```bash
# Linux/Mac
openssl rand -base64 32

# Windows PowerShell
[System.Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes((New-Object -ComObject WScript.Shell).CreateObject("WScript.Shell").Exec("powershell -Command '[System.IO.Path]::GetRandomFileName()'").StdOut.ReadAll()))
```

---

## 🌐 **Reverse Proxy Setup (Optional)**

### **Nginx:**
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### **Apache:**
```apache
<VirtualHost *:80>
    ServerName your-domain.com
    ProxyPreserveHost On
    ProxyPass / http://localhost:8080/
    ProxyPassReverse / http://localhost:8080/
</VirtualHost>
```

---

## 📊 **ไฟล์และโครงสร้าง**

```
dist/
├── backend.exe              # Windows executable
├── backend                  # Linux executable
├── backend-macos            # Mac executable
├── frontend/                # Static frontend files
│   ├── index.html
│   ├── assets/
│   └── ...
├── data/                    # Database folder (auto-created)
│   └── trends.db
├── .env                     # Configuration (git-ignored)
└── .env.example            # Configuration template
```

---

## 🔍 **Troubleshooting**

### **Port already in use:**
```env
PORT=3000  # เปลี่ยน port ใน .env
```

### **Database error:**
```bash
# ลบ database เก่า
rm data/trends.db
# จะสร้างใหม่โดยอัตโนมัติ
```

### **Frontend not loading:**
- ตรวจสอบ `frontend/` folder มีอยู่หรือไม่
- ตรวจสอบ console logs สำหรับ path errors

---

## 📝 **Systemd Service (Linux)**

สร้าง `/etc/systemd/system/tu-insight.service`:
```ini
[Unit]
Description=TU-Insight Marketing Trend Analysis
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/opt/tu-insight
ExecStart=/opt/tu-insight/backend
Restart=on-failure
RestartSec=10

[Install]
WantedBy=multi-user.target
```

เรียกใช้:
```bash
sudo systemctl enable tu-insight
sudo systemctl start tu-insight
sudo systemctl status tu-insight
```

---

## 📈 **Scaling Tips**

1. **Multiple instances:** ใช้ Nginx load balancer
2. **Database:** อัพเกรด PostgreSQL สำหรับ production
3. **Caching:** เพิ่ม Redis สำหรับ session
4. **Monitoring:** เพิ่ม Prometheus/Grafana

---

## ✅ **Checklist ก่อน Deploy**

- [ ] `.env` ค่า JWT_SECRET เปลี่ยนแล้ว
- [ ] PORT ชัดเจน (80, 8080 ฯลฯ)
- [ ] CORS_ORIGIN ตั้งชื่อโดเมนแล้ว
- [ ] Database folder มี write permission
- [ ] Firewall ปิด port ที่ต้องการแล้ว
- [ ] SSL/TLS ตั้งค่าแล้ว (ถ้า HTTPS)
- [ ] Backup strategy มีแล้ว

---

## 🆘 **Support**

หากมีปัญหา ดูที่:
1. Logs จาก backend
2. Browser console (F12)
3. ตรวจสอบ .env configuration
