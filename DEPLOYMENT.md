# Hostinger Deployment Guide - VanshSecure

## 🎯 IMPORTANT: Hostinger Deployment Configuration

### Output Directory Issue Fix

Hostinger might not recognize `.output` directory automatically. Follow these exact steps:

---

## ✅ Solution 1: Manual File Structure (RECOMMENDED)

After build completes locally, upload these to Hostinger:

```
your-domain-folder/
├── .output/              ← ENTIRE FOLDER (REQUIRED)
│   ├── server/
│   │   └── index.mjs     ← Main entry point
│   └── public/           ← Static assets
├── node_modules/         ← Or run npm install on server
├── package.json
├── package-lock.json
```

### Steps:

1. **Build Locally:**
```bash
npm install
npm run build
```

2. **Verify .output folder exists:**
```bash
ls -la .output/
```

3. **Upload via FTP/SFTP to Hostinger:**
   - Connect to your hosting
   - Upload ENTIRE `.output` folder
   - Upload `package.json`, `package-lock.json`
   - Upload `node_modules` (OR run `npm install` on server)

4. **Configure Node.js in Hostinger:**
   - Application Root: `/home/username/your-domain-folder`
   - Entry File: `.output/server/index.mjs`
   - Node Version: `22.x`
   - Click "Create Application"

---

## ✅ Solution 2: GitHub Auto-Deploy with Custom Build

### Step 1: Push to GitHub

```bash
git add .
git commit -m "Ready for Hostinger deployment"
git push origin main
```

### Step 2: Hostinger Panel Configuration

1. Go to **Hostinger Control Panel**
2. Navigate to **Git**
3. Connect Repository: `VanshSecure`
4. **IMPORTANT Build Settings:**

```
Branch: main

Build Command:
npm install --legacy-peer-deps && npm run build && ls -la .output

Deploy Path: 
/home/username/domains/vanshsecure.in/public_html

Entry Point:
.output/server/index.mjs
```

### Step 3: Node.js Configuration

1. Go to **Node.js** section
2. Create Application:
   - App Root: Same as deploy path above
   - Entry File: `.output/server/index.mjs`
   - Node Version: `22.x`
   - Environment: `production`

---

## ✅ Solution 3: Build Script Fix

If Hostinger still doesn't recognize output, create a symlink:

In Hostinger SSH terminal:

```bash
cd /home/username/domains/vanshsecure.in/public_html
npm install
npm run build

# Verify output
ls -la .output/
ls -la .output/server/
ls -la .output/public/

# If .output exists but not recognized, create symlink
ln -s .output output

# Set permissions
chmod -R 755 .output
```

---

## 🔧 Troubleshooting

### "No output directory found"

**Check 1: Verify build completed**
```bash
npm run build
ls -la .output/
```

**Check 2: Build output path**
Make sure build creates `.output` not `output` or `dist`

**Check 3: File permissions**
```bash
chmod -R 755 .output
```

**Check 4: Hostinger recognizes the folder**
In Hostinger panel, check if `.output` folder is visible in File Manager

### Build succeeds but app won't start

1. **Entry file path must be exact:**
   - Correct: `.output/server/index.mjs`
   - Wrong: `output/server/index.mjs`
   - Wrong: `.output/server/index.js`

2. **Check Node.js version:**
   - Must be 22.x or higher

3. **Check application logs:**
   - Hostinger Panel → Node.js → Your App → Logs

---

## 📋 Pre-Deployment Checklist

Before deploying, verify locally:

```bash
# 1. Clean install
rm -rf node_modules .output
npm install

# 2. Build
npm run build

# 3. Verify output
ls -la .output/
ls -la .output/server/index.mjs
ls -la .output/public/

# 4. Test locally
npm start
# Visit http://localhost:3000
```

If all 4 steps work locally, deployment will work!

---

## 🚀 Quick Deploy Commands

### For FTP Upload:
```bash
# Build locally
npm run build

# Upload these via FTP:
# - .output/ (entire folder)
# - package.json
# - package-lock.json
```

### For Git Deploy:
```bash
git add .
git commit -m "Deploy to Hostinger"
git push origin main
```

Then configure in Hostinger panel.

---

## 🔐 Admin Panel

After successful deployment:

```
URL: https://vanshsecure.in/admin
Username: vanshsecure  
Password: VanshSecure@2024
```

---

## 📞 Still Having Issues?

1. **Check Hostinger documentation:** Support → Node.js Apps
2. **View build logs:** In Hostinger deployment logs
3. **SSH access:** Use terminal to debug
4. **Contact support:** With build logs

---

**The `.output` directory MUST be uploaded/created for deployment to work!** 🎯
