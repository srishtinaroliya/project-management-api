# Deployment Guide

## 🚀 Deploy to Production

This guide covers deploying your Project Management API to popular cloud platforms.

## 📋 Prerequisites

- MongoDB database (cloud instance recommended)
- Environment variables configured
- Git repository with your code

## ☁️ Deployment Options

### 1. Railway (Recommended)

**Easy deployment with automatic GitHub integration**

#### Setup Steps:
1. **Create Railway Account**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Connect Repository**
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository
   - Railway will auto-detect Node.js

3. **Configure Environment Variables**
   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/project-management
   JWT_SECRET=your-production-secret-key-32-chars-min
   JWT_EXPIRE=7d
   NODE_ENV=production
   ```

4. **Deploy**
   - Railway will automatically deploy on push
   - Your API will be available at: `https://your-app-name.railway.app`

#### Railway-Specific Settings:
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Health Check Path**: `/health`

---

### 2. Render

**Another excellent option with generous free tier**

#### Setup Steps:
1. **Create Render Account**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

2. **Create Web Service**
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Choose "Node" as runtime

3. **Configure**
   - **Name**: `project-management-api`
   - **Region**: Choose closest to your users
   - **Branch**: `main`
   - **Root Directory**: `.` (or leave empty)
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free` (to start)

4. **Environment Variables**
   Add the same environment variables as Railway

5. **Deploy**
   - Click "Create Web Service"
   - Your API will be live at: `https://your-app-name.onrender.com`

---

### 3. Heroku

**Classic platform with good Node.js support**

#### Setup Steps:
1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

2. **Login to Heroku**
   ```bash
   heroku login
   ```

3. **Create App**
   ```bash
   heroku create your-app-name
   ```

4. **Add Environment Variables**
   ```bash
   heroku config:set PORT=5000
   heroku config:set MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/project-management
   heroku config:set JWT_SECRET=your-production-secret-key
   heroku config:set NODE_ENV=production
   ```

5. **Deploy**
   ```bash
   git push heroku main
   ```

---

### 4. DigitalOcean App Platform

**Scalable platform with good performance**

#### Setup Steps:
1. **Create DigitalOcean Account**
   - Go to [digitalocean.com](https://digitalocean.com)

2. **Create App**
   - Go to "Apps" → "Create App"
   - Connect GitHub repository
   - Choose "Node.js" runtime

3. **Configure Build Settings**
   - **Build Command**: `npm install`
   - **Run Command**: `npm start`
   - **HTTP Port**: `5000`

4. **Add Environment Variables**
   - Add all required environment variables

5. **Deploy**
   - Click "Create Resources" and deploy

---

## 🗄️ MongoDB Setup for Production

### MongoDB Atlas (Recommended)

1. **Create Cluster**
   - Go to [MongoDB Atlas](https://cloud.mongodb.com)
   - Create a free cluster (M0 tier)

2. **Configure Network Access**
   - Add IP address: `0.0.0.0/0` (allows all IPs)
   - Or add your cloud provider's IP ranges

3. **Create Database User**
   - Username: `api-user`
   - Password: Generate strong password
   - Permissions: Read and write to your database

4. **Get Connection String**
   ```
   mongodb+srv://api-user:<password>@cluster.mongodb.net/project-management?retryWrites=true&w=majority
   ```

5. **Update Environment Variables**
   Use the connection string as your `MONGO_URI`

---

## 🔒 Production Security Checklist

### Environment Variables
- [ ] `NODE_ENV=production`
- [ ] Strong `JWT_SECRET` (32+ characters)
- [ ] Production `MONGO_URI` (not localhost)
- [ ] Limited CORS origins in production

### Security Headers
- [ ] Helmet.js is configured ✅
- [ ] CORS is properly configured ✅
- [ ] Rate limiting (consider adding)

### Database Security
- [ ] MongoDB Atlas with IP whitelisting
- [ ] Strong database password
- [ ] Authentication enabled

### API Security
- [ ] JWT tokens expire reasonably (7 days)
- [ ] Password requirements enforced ✅
- [ ] Input validation implemented ✅
- [ ] Error handling doesn't leak sensitive info ✅

---

## 📊 Monitoring and Logging

### Add Monitoring (Optional)

**For Railway:**
- Built-in logs available in dashboard
- Metrics automatically collected

**For Render:**
- Logs available in dashboard
- Add `@sentry/node` for error tracking

**For Heroku:**
- Use `heroku logs --tail`
- Add monitoring add-ons

### Health Checks
Your API includes a health check endpoint:
```bash
GET /health
```

Returns:
```json
{
  "success": true,
  "message": "API is running",
  "timestamp": "2023-09-06T12:00:00.000Z",
  "environment": "production"
}
```

---

## 🔄 CI/CD Pipeline

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test
    
    - name: Deploy to Railway
      uses: railway-app/railway-action@v1
      with:
        api-token: ${{ secrets.RAILWAY_TOKEN }}
        service-id: ${{ secrets.RAILWAY_SERVICE_ID }}
```

---

## 🚀 Performance Optimization

### For Production:

1. **Enable Compression**
   ```bash
   npm install compression
   ```
   Add to `app.js`:
   ```javascript
   const compression = require('compression');
   app.use(compression());
   ```

2. **Add Rate Limiting**
   ```bash
   npm install express-rate-limit
   ```

3. **Use CDN for Static Assets**
   - If serving frontend files

4. **Database Indexing**
   - Already implemented in models ✅

5. **Caching Strategy**
   - Consider Redis for frequently accessed data

---

## 🐛 Troubleshooting

### Common Issues:

1. **MongoDB Connection Failed**
   - Check connection string
   - Verify IP whitelisting
   - Ensure database user has correct permissions

2. **JWT Token Issues**
   - Verify JWT_SECRET is set
   - Check token expiration

3. **Port Issues**
   - Ensure PORT environment variable is set
   - Check if cloud provider overrides port

4. **Build Failures**
   - Check package.json scripts
   - Verify all dependencies are in package.json
   - Check Node.js version compatibility

### Debug Commands:

**Check Logs (Railway):**
```bash
railway logs
```

**Check Logs (Render):**
Available in dashboard

**Check Logs (Heroku):**
```bash
heroku logs --tail
```

---

## 📱 Post-Deployment Checklist

- [ ] API is accessible via HTTPS
- [ ] Health check endpoint works
- [ ] User registration/login works
- [ ] Project CRUD operations work
- [ ] Error handling works properly
- [ ] Environment variables are secure
- [ ] Database connection is stable
- [ ] Monitoring is configured
- [ ] Domain is configured (if using custom domain)

---

## 🎉 You're Live!

Your Project Management API is now deployed and ready for production use!

**Next Steps:**
1. Connect your frontend application
2. Set up monitoring and alerting
3. Configure backup strategy for your database
4. Consider setting up a staging environment

Happy coding! 🚀
