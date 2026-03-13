# Project Management API

A production-ready RESTful API for multi-tenant project management built with Node.js, Express.js, and MongoDB.

## 🚀 Features

- **JWT Authentication**: Secure user registration and login system
- **Multi-tenant Architecture**: Support for multiple organizations/tenants
- **Project Management**: Full CRUD operations for projects
- **Security**: Password hashing, input validation, and error handling
- **Clean Architecture**: Modular design with separation of concerns
- **Production Ready**: Optimized for deployment on cloud platforms

## 📋 Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database with Mongoose ODM
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **express-validator** - Input validation
- **dotenv** - Environment configuration
- **helmet** - Security headers
- **cors** - Cross-origin resource sharing

## 🏗️ Project Structure

```
project-management-api/
├── config/
│   ├── database.js          # MongoDB connection
│   └── config.js            # Environment configuration
├── controllers/
│   ├── authController.js    # Authentication logic
│   └── projectController.js # Project CRUD logic
├── middleware/
│   ├── auth.js              # JWT authentication
│   ├── error.js             # Error handling
│   └── validation.js        # Input validation
├── models/
│   ├── User.js              # User schema
│   └── Project.js           # Project schema
├── routes/
│   ├── auth.js              # Authentication routes
│   └── projects.js          # Project routes
├── services/
│   ├── authService.js       # Authentication business logic
│   └── projectService.js    # Project business logic
├── utils/
│   └── helpers.js           # Utility functions
├── app.js                   # Express application
├── server.js                # Server startup
├── package.json             # Dependencies and scripts
├── .env.example             # Environment variables template
└── README.md                # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd project-management-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit the `.env` file with your configuration:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/project-management
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRE=7d
   NODE_ENV=development
   ```

4. **Start MongoDB**
   - For local MongoDB: `mongod`
   - Or use MongoDB Atlas for cloud instance

5. **Run the application**
   ```bash
   # Development mode with nodemon
   npm run dev
   
   # Production mode
   npm start
   ```

6. **Verify the API is running**
   ```bash
   curl http://localhost:5000/health
   ```

## 📚 API Documentation

### Base URL
```
http://localhost:5000
```

### Authentication Headers
```json
{
  "Authorization": "Bearer <jwt_token>",
  "Content-Type": "application/json"
}
```

### Endpoints

#### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register a new user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/profile` | Get user profile | Yes |

#### Projects

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/projects` | Create a new project | Yes |
| GET | `/api/projects` | Get all user projects | Yes |
| GET | `/api/projects/stats` | Get project statistics | Yes |
| GET | `/api/projects/:id` | Get a specific project | Yes |
| PUT | `/api/projects/:id` | Update a project | Yes |
| DELETE | `/api/projects/:id` | Delete a project | Yes |

#### System

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | API information | No |
| GET | `/health` | Health check | No |
| GET | `/api` | API documentation | No |

## 📝 API Examples

### Register User

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "Password123",
    "tenantId": "company_123"
  }'
```

### Login User

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "Password123"
  }'
```

### Create Project

```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your_jwt_token>" \
  -d '{
    "title": "New Project",
    "description": "Project description",
    "status": "Pending"
  }'
```

### Get All Projects

```bash
curl -X GET http://localhost:5000/api/projects \
  -H "Authorization: Bearer <your_jwt_token>"
```

### Update Project

```bash
curl -X PUT http://localhost:5000/api/projects/<project_id> \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your_jwt_token>" \
  -d '{
    "title": "Updated Project Title",
    "status": "In Progress"
  }'
```

### Delete Project

```bash
curl -X DELETE http://localhost:5000/api/projects/<project_id> \
  -H "Authorization: Bearer <your_jwt_token>"
```

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for secure password storage
- **Input Validation**: Comprehensive validation using express-validator
- **CORS Protection**: Configurable cross-origin resource sharing
- **Security Headers**: Helmet.js for security headers
- **Error Handling**: Centralized error handling with proper HTTP status codes
- **Multi-tenant Isolation**: Users can only access their own projects

## 🏢 Multi-Tenant Architecture

The API supports multi-tenancy through the `tenantId` field:

- Each user belongs to a specific tenant (organization)
- Projects are scoped to the user's tenant
- Users can only access projects within their tenant
- Data isolation between different organizations

## 🚀 Deployment

### Railway

1. Connect your GitHub repository to Railway
2. Set environment variables in Railway dashboard
3. Deploy automatically on push to main branch

### Render

1. Connect your GitHub repository to Render
2. Create a new Web Service
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Add environment variables

### Environment Variables for Production

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/project-management
JWT_SECRET=your-production-secret-key
JWT_EXPIRE=7d
NODE_ENV=production
```

## 🧪 Testing

The API includes comprehensive error handling and validation. Test the endpoints using:

- Postman collection
- curl commands
- Automated testing frameworks (Jest, Mocha)

## 📊 Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    // Response data
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format",
      "value": "invalid-email"
    }
  ]
}
```

## 🔄 Pagination

Project list endpoints support pagination:

```bash
GET /api/projects?page=1&limit=10&status=Pending
```

- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `status`: Filter by project status

## 🛠️ Development

### Available Scripts

```bash
npm start        # Start production server
npm run dev      # Start development server with nodemon
npm test         # Run tests
```

### Adding New Features

1. Create/update models in `/models`
2. Add business logic in `/services`
3. Create controllers in `/controllers`
4. Define routes in `/routes`
5. Add middleware if needed in `/middleware`

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For support and questions, please open an issue in the GitHub repository.

---

**Built with ❤️ for modern web applications**
