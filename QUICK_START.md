# Quick Start Guide

## 🚀 Get Your API Running in 5 Minutes

### 1. Install Dependencies ✅
```bash
npm install
```

### 2. Set Up Environment
```bash
# Copy the example environment file
cp .env.example .env

# Edit .env with your settings:
# - PORT: 5000 (or any port you prefer)
# - MONGO_URI: Your MongoDB connection string
# - JWT_SECRET: A secure secret key
```

### 3. Start MongoDB
Choose one option:

**Option A: Local MongoDB**
```bash
# If you have MongoDB installed locally
mongod
```

**Option B: MongoDB Atlas (Cloud)**
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free cluster
3. Get your connection string
4. Update MONGO_URI in .env

**Option C: Docker**
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### 4. Start the API Server
```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

### 5. Verify It's Working
Open your browser or use curl:

```bash
# Health check
curl http://localhost:5000/health

# API documentation
curl http://localhost:5000/api
```

## 🎯 Test the API

### Register a User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "TestPass123",
    "tenantId": "company_001"
  }'
```

### Login and Get Token
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPass123"
  }'
```

### Create Your First Project
```bash
# Replace <YOUR_TOKEN> with the token from login
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
    "title": "My First Project",
    "description": "This is my first project using the API",
    "status": "Pending"
  }'
```

## 🔧 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5000
npx kill-port 5000

# Or change PORT in .env to 3000, 8000, etc.
```

### MongoDB Connection Failed
1. Check if MongoDB is running
2. Verify your MONGO_URI in .env
3. Make sure your IP is whitelisted (for MongoDB Atlas)

### JWT Secret Error
Make sure your JWT_SECRET in .env is at least 32 characters long.

## 📱 Next Steps

1. **Explore the API**: Check out `API_EXAMPLES.md` for detailed examples
2. **Read the Docs**: See `README.md` for comprehensive documentation
3. **Build a Frontend**: Connect your React/Vue/Angular app to this API
4. **Deploy**: Deploy to Render, Railway, or any Node.js hosting platform

## 🎉 You're Ready!

Your Project Management API is now running and ready to use! 

**API Base URL**: `http://localhost:5000`
**Health Check**: `http://localhost:5000/health`
**API Docs**: `http://localhost:5000/api`

Happy coding! 🚀
