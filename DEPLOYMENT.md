# Hostinger Deployment Guide

## Prerequisites
- Node.js v22.x or higher
- npm installed
- Hostinger Node.js hosting plan

## Build Steps

1. **Install Dependencies**
```bash
npm install
```

2. **Build for Production**
```bash
npm run build
```

This will create a `.output` folder with:
- `.output/server/` - Node.js server files
- `.output/public/` - Static assets

## Hostinger Deployment

### Method 1: File Upload via FTP/SFTP

1. **Upload Files:**
   - Upload entire `.output` folder to your Hostinger public_html or app directory
   - Upload `node_modules` folder (or run `npm install` on server)
   - Upload `package.json`

2. **Set Node.js Settings in Hostinger:**
   - Go to Hostinger Control Panel
   - Select "Node.js"
   - Set Node.js version to **22.x**
   - Set Application Root: Your app folder path
   - Set Application URL: Your domain
   - Set Application Startup File: `.output/server/index.mjs`
   - Click "Create"

3. **Start the Application:**
   - In Hostinger panel, click "Run npm install" 
   - Then click "Start Application"

### Method 2: Using Git + Hostinger Auto Deploy

1. **Push to GitHub:**
```bash
git add .
git commit -m "Production build ready"
git push origin main
```

2. **Connect Repository in Hostinger:**
   - Go to Hostinger Control Panel → GitHub
   - Connect your repository
   - Set build command: `npm install && npm run build`
   - Set start command: `npm start`

## Environment Variables (if needed)

In Hostinger Panel → Node.js → Add environment variables:
```
NODE_ENV=production
PORT=3000
```

## Admin Panel Credentials

**URL:** `https://yourdomain.com/admin`

**Username:** `vanshsecure`
**Password:** `VanshSecure@2024`

## Troubleshooting

### Build Fails
- Ensure Node.js version is 22.x
- Run `npm install` before `npm run build`
- Check build logs for specific errors

### Application Won't Start
- Verify startup file path: `.output/server/index.mjs`
- Check Node.js version in Hostinger panel
- View application logs in Hostinger panel

### Static Assets Not Loading
- Ensure `.output/public` folder is uploaded
- Check public directory permissions

## Post-Deployment

1. Visit your domain to verify deployment
2. Test admin panel: `https://yourdomain.com/admin`
3. Test contact form and check leads in admin panel

## Support

For issues, check:
- Hostinger Node.js documentation
- Application logs in Hostinger panel
- Build logs for errors
