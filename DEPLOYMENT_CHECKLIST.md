# ✅ Pre-Deployment Checklist

**ใช้ checklist นี้ก่อน deploy ไปยัง production**

---

## 📋 Checklist ก่อน Deploy

### Security (ความปลอดภัย)
- [ ] **JWT_SECRET**: เปลี่ยนจาก default value เป็น random string ที่ยาวและซับซ้อน
  ```bash
  # Generate strong secret (Linux/Mac)
  openssl rand -base64 32
  ```
- [ ] **GIN_MODE**: เปลี่ยนจาก `debug` เป็น `release`
- [ ] **CORS_ORIGIN**: ตั้งให้ตรงกับ domain/URL ของ frontend จริง (ไม่ใช่ localhost)
- [ ] **Database password**: ถ้าใช้ database อื่น (PostgreSQL), ตั้ง password ที่ยาว

### Configuration (.env)
- [ ] `PORT` = ตรงกับ server port (มักจะ 8080 หรือ 80 ถ้ามี reverse proxy)
- [ ] `DB_PATH` = Relative path ที่ถูกต้อง (ต้องมี folder `data/` แล้ว)
- [ ] `CORS_ORIGIN` = URL ของ frontend ในระบบจริง
- [ ] ทุก environment variable ไม่มี default/test values

### Application
- [ ] [ ] Build executable: `build.sh linux` หรือ `build.bat windows`
- [ ] [ ] Copy entire `dist/` folder ไปยังเซิร์ฟเวอร์
- [ ] [ ] Verify frontend files exist: `dist/frontend/index.html`
- [ ] [ ] Verify .env.example copied: `dist/.env.example`
- [ ] [ ] Create .env from template: `cp .env.example .env`
- [ ] [ ] Create data folder: `mkdir -p data/`

### Testing (Before Going Live)
- [ ] Test health endpoint: `curl http://localhost:8080/health`
- [ ] Test register: `curl -X POST http://localhost:8080/api/auth/register ...`
- [ ] Test login: `curl -X POST http://localhost:8080/api/auth/login ...`
- [ ] Test analysis: `curl -X POST http://localhost:8080/api/trends/analyze ...`
- [ ] Test frontend loads: Open http://localhost:8080 in browser
- [ ] Test dashboard works: Login and access all pages
- [ ] Verify database file created: `ls -la data/trends.db`

### Server Setup
- [ ] OS: Linux/Windows Server with latest updates
- [ ] Go runtime: NOT needed (static binary)
- [ ] Free disk space: At least 100 MB
- [ ] Free RAM: At least 128 MB
- [ ] Port 8080 (หรือ PORT ที่ตั้ง) ว่างอยู่
- [ ] Firewall allows incoming traffic on port 8080
- [ ] Process manager (systemd/supervisor) configured

### Reverse Proxy (Optional but Recommended)
- [ ] Nginx/Apache installed and configured
- [ ] SSL certificate installed
- [ ] Proxy rules pointing to localhost:8080
- [ ] HTTPS enabled
- [ ] Redirect HTTP → HTTPS

### Monitoring & Logging
- [ ] Log rotation configured (if log files used)
- [ ] Monitoring alerts setup (if using monitoring service)
- [ ] Backup strategy defined for database
- [ ] Error tracking setup (optional)

### Networking & Access
- [ ] Domain DNS configured
- [ ] SSL/TLS certificate valid
- [ ] CORS origin matches actual domain
- [ ] Firewall rules allow port 8080 (or HTTPS port)

---

## 🚀 Deployment Steps

### Step 1: Build Application
```bash
# On your development machine
cd SF340_TU-Insight

# Build for target OS
./build.sh linux    # For Linux
# or
build.bat windows   # For Windows

# Verify dist folder created
ls -la dist/
```

### Step 2: Upload to Server
```bash
# Copy dist folder to server
scp -r dist/ user@your-server:/opt/tu-insight/

# Or use SFTP client
```

### Step 3: Configure on Server
```bash
# SSH into server
ssh user@your-server

# Go to app directory
cd /opt/tu-insight

# Create .env from template
cp .env.example .env

# Edit .env with production values
nano .env
# Change:
# - JWT_SECRET (important!)
# - GIN_MODE=release
# - CORS_ORIGIN=https://your-domain.com
# - PORT=8080

# Create data folder
mkdir -p data

# Set permissions
chmod 755 backend
chmod 755 data
```

### Step 4: Test Application
```bash
# Run and test
./backend

# In another terminal:
curl http://localhost:8080/health

# Should respond with: {"status":"ok"}

# Stop with Ctrl+C
```

### Step 5: Setup Systemd Service (Linux)
```bash
# Create service file
sudo nano /etc/systemd/system/tu-insight.service
```

Add this content:
```ini
[Unit]
Description=TU-Insight Marketing Trend Analysis
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/opt/tu-insight
ExecStart=/opt/tu-insight/backend
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

Then:
```bash
# Enable and start
sudo systemctl daemon-reload
sudo systemctl enable tu-insight
sudo systemctl start tu-insight

# Check status
sudo systemctl status tu-insight

# View logs
sudo journalctl -u tu-insight -f
```

### Step 6: Setup Nginx Reverse Proxy (Optional)
```bash
# Install Nginx
sudo apt-get install nginx

# Create config
sudo nano /etc/nginx/sites-available/tu-insight
```

Add:
```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name your-domain.com;
    
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/certificate.key;
    
    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Then:
```bash
# Enable
sudo ln -s /etc/nginx/sites-available/tu-insight /etc/nginx/sites-enabled/

# Test
sudo nginx -t

# Start
sudo systemctl start nginx
```

### Step 7: Verify Production
```bash
# Test API endpoint
curl https://your-domain.com/api/auth/login

# Test frontend
curl https://your-domain.com/ | head

# Test from browser
# https://your-domain.com
```

---

## 🔍 Monitoring

### Check if Running
```bash
# View process
ps aux | grep backend

# View port usage
lsof -i :8080

# View logs
tail -f nohup.out
# or
journalctl -u tu-insight -f
```

### Database Backup
```bash
# Backup database
cp data/trends.db data/trends.db.backup

# Or automatic backup daily
0 2 * * * cp /opt/tu-insight/data/trends.db /backups/trends.db.$(date +\%Y\%m\%d)
```

### Performance Monitoring
```bash
# Check CPU/Memory
top
# or
htop

# Check disk space
df -h
du -sh /opt/tu-insight/
```

---

## 🚨 Troubleshooting in Production

### Binary not executable
```bash
chmod +x backend
```

### Port already in use
```bash
# Find process using port 8080
lsof -i :8080
# Kill it or change PORT in .env
```

### Database permission denied
```bash
# Fix permissions
chmod 755 data/
chmod 644 data/trends.db
```

### Frontend not loading
```bash
# Verify frontend folder exists
ls -la frontend/
ls -la frontend/index.html

# Check logs
./backend
# Should show: "✅ Serving frontend from: ./frontend"
```

### CORS errors in browser
```bash
# Update .env
CORS_ORIGIN=https://your-actual-domain.com

# Restart backend
sudo systemctl restart tu-insight
```

### Connection refused
```bash
# Check if backend running
systemctl status tu-insight

# Check firewall
sudo ufw status
sudo ufw allow 8080

# Or for reverse proxy, check nginx
sudo systemctl status nginx
```

---

## 📊 Production Settings Comparison

| Setting | Development | Production |
|---------|-------------|-----------|
| `GIN_MODE` | debug | release |
| `PORT` | 8080 | 8080 (with Nginx) or 80 |
| `JWT_SECRET` | test_key | random 32-char |
| `CORS_ORIGIN` | localhost:5173 | https://your-domain.com |
| `DATABASE` | ./data/trends.db | /var/lib/tu-insight/trends.db |
| `REVERSE_PROXY` | None | Nginx/Apache |
| `SSL` | No | Yes (required) |
| `BACKUPS` | No | Daily backups |
| `MONITORING` | No | Yes (if available) |

---

## 📝 Post-Deployment Notes

After successful deployment:
- [ ] Document all passwords/secrets in secure location (password manager)
- [ ] Setup automated backup schedule
- [ ] Configure monitoring/alerting
- [ ] Create maintenance schedule for updates
- [ ] Train team on how to manage/restart service
- [ ] Monitor first week closely for issues
- [ ] Setup access logs for debugging

---

**Good luck with your deployment! 🎉**
