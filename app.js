const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

// Import routes
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');

// Import middleware
const { errorHandler, notFound } = require('./middleware/error');

const app = express();

// Security middleware
app.use(helmet());

// CORS middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://yourdomain.com'] // Add your production domain
    : true, // Allow all origins in development
  credentials: true,
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Project Management API',
    version: '1.0.0',
    documentation: '/api',
  });
});

// API documentation endpoint
app.get('/api', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Project Management API Documentation',
    endpoints: {
      authentication: {
        'POST /api/auth/register': 'Register a new user',
        'POST /api/auth/login': 'Login user',
        'GET /api/auth/profile': 'Get user profile (protected)',
      },
      projects: {
        'POST /api/projects': 'Create a new project (protected)',
        'GET /api/projects': 'Get all user projects (protected)',
        'GET /api/projects/stats': 'Get project statistics (protected)',
        'GET /api/projects/:id': 'Get a specific project (protected)',
        'PUT /api/projects/:id': 'Update a project (protected)',
        'DELETE /api/projects/:id': 'Delete a project (protected)',
      },
    },
    authentication: 'JWT token required for protected endpoints',
    headers: {
      'Authorization': 'Bearer <jwt_token>',
      'Content-Type': 'application/json',
    },
  });
});

// 404 handler
app.use(notFound);

// Global error handler
app.use(errorHandler);

module.exports = app;
