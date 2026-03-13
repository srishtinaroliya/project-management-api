# API Examples

This document provides comprehensive examples of how to use the Project Management API.

## Base URL
```
http://localhost:5000
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## 1. User Registration

**Endpoint:** `POST /api/auth/register`

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice Johnson",
    "email": "alice@company.com",
    "password": "SecurePass123",
    "tenantId": "company_001"
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "name": "Alice Johnson",
      "email": "alice@company.com",
      "tenantId": "company_001",
      "createdAt": "2023-09-06T12:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

## 2. User Login

**Endpoint:** `POST /api/auth/login`

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "alice@company.com",
    "password": "SecurePass123"
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "name": "Alice Johnson",
      "email": "alice@company.com",
      "tenantId": "company_001",
      "createdAt": "2023-09-06T12:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

## 3. Get User Profile

**Endpoint:** `GET /api/auth/profile`

```bash
curl -X GET http://localhost:5000/api/auth/profile \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "name": "Alice Johnson",
    "email": "alice@company.com",
    "tenantId": "company_001",
    "createdAt": "2023-09-06T12:00:00.000Z"
  }
}
```

## 4. Create a Project

**Endpoint:** `POST /api/projects`

```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{
    "title": "Website Redesign",
    "description": "Complete redesign of the company website with modern UI/UX",
    "status": "Pending"
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "Project created successfully",
  "data": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d1",
    "title": "Website Redesign",
    "description": "Complete redesign of the company website with modern UI/UX",
    "status": "Pending",
    "owner": {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "name": "Alice Johnson",
      "email": "alice@company.com"
    },
    "tenantId": "company_001",
    "createdAt": "2023-09-06T12:30:00.000Z",
    "updatedAt": "2023-09-06T12:30:00.000Z"
  }
}
```

## 5. Get All Projects

**Endpoint:** `GET /api/projects`

```bash
curl -X GET http://localhost:5000/api/projects \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Response:**
```json
{
  "success": true,
  "data": {
    "projects": [
      {
        "_id": "64f8a1b2c3d4e5f6a7b8c9d1",
        "title": "Website Redesign",
        "description": "Complete redesign of the company website with modern UI/UX",
        "status": "Pending",
        "owner": {
          "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
          "name": "Alice Johnson",
          "email": "alice@company.com"
        },
        "tenantId": "company_001",
        "createdAt": "2023-09-06T12:30:00.000Z",
        "updatedAt": "2023-09-06T12:30:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 1,
      "pages": 1
    }
  }
}
```

## 6. Get Projects with Pagination and Filtering

**Endpoint:** `GET /api/projects?page=1&limit=5&status=In Progress`

```bash
curl -X GET "http://localhost:5000/api/projects?page=1&limit=5&status=In%20Progress" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

## 7. Get a Specific Project

**Endpoint:** `GET /api/projects/:id`

```bash
curl -X GET http://localhost:5000/api/projects/64f8a1b2c3d4e5f6a7b8c9d1 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d1",
    "title": "Website Redesign",
    "description": "Complete redesign of the company website with modern UI/UX",
    "status": "Pending",
    "owner": {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "name": "Alice Johnson",
      "email": "alice@company.com"
    },
    "tenantId": "company_001",
    "createdAt": "2023-09-06T12:30:00.000Z",
    "updatedAt": "2023-09-06T12:30:00.000Z"
  }
}
```

## 8. Update a Project

**Endpoint:** `PUT /api/projects/:id`

```bash
curl -X PUT http://localhost:5000/api/projects/64f8a1b2c3d4e5f6a7b8c9d1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{
    "title": "Website Redesign - Updated",
    "status": "In Progress"
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "Project updated successfully",
  "data": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d1",
    "title": "Website Redesign - Updated",
    "description": "Complete redesign of the company website with modern UI/UX",
    "status": "In Progress",
    "owner": {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "name": "Alice Johnson",
      "email": "alice@company.com"
    },
    "tenantId": "company_001",
    "createdAt": "2023-09-06T12:30:00.000Z",
    "updatedAt": "2023-09-06T13:15:00.000Z"
  }
}
```

## 9. Delete a Project

**Endpoint:** `DELETE /api/projects/:id`

```bash
curl -X DELETE http://localhost:5000/api/projects/64f8a1b2c3d4e5f6a7b8c9d1 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Response:**
```json
{
  "success": true,
  "message": "Project deleted successfully"
}
```

## 10. Get Project Statistics

**Endpoint:** `GET /api/projects/stats`

```bash
curl -X GET http://localhost:5000/api/projects/stats \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Response:**
```json
{
  "success": true,
  "data": {
    "total": 5,
    "byStatus": {
      "Pending": 2,
      "In Progress": 2,
      "Completed": 1
    }
  }
}
```

## Error Responses

### Validation Error (400)

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email",
      "value": "invalid-email"
    },
    {
      "field": "password",
      "message": "Password must be at least 6 characters long",
      "value": "123"
    }
  ]
}
```

### Authentication Error (401)

```json
{
  "success": false,
  "message": "Access denied. No token provided."
}
```

### Authorization Error (403)

```json
{
  "success": false,
  "message": "Access denied. You can only access your own projects."
}
```

### Not Found Error (404)

```json
{
  "success": false,
  "message": "Project not found"
}
```

### Server Error (500)

```json
{
  "success": false,
  "message": "Server Error"
}
```

## Postman Collection

You can import these examples into Postman:

```json
{
  "info": {
    "name": "Project Management API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "variable": [
    {
      "key": "baseUrl",
      "value": "http://localhost:5000"
    },
    {
      "key": "token",
      "value": ""
    }
  ],
  "item": [
    {
      "name": "Auth",
      "item": [
        {
          "name": "Register",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"name\": \"Alice Johnson\",\n  \"email\": \"alice@company.com\",\n  \"password\": \"SecurePass123\",\n  \"tenantId\": \"company_001\"\n}"
            },
            "url": {
              "raw": "{{baseUrl}}/api/auth/register",
              "host": ["{{baseUrl}}"],
              "path": ["api", "auth", "register"]
            }
          }
        },
        {
          "name": "Login",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"email\": \"alice@company.com\",\n  \"password\": \"SecurePass123\"\n}"
            },
            "url": {
              "raw": "{{baseUrl}}/api/auth/login",
              "host": ["{{baseUrl}}"],
              "path": ["api", "auth", "login"]
            }
          },
          "event": [
            {
              "listen": "test",
              "script": {
                "exec": [
                  "if (pm.response.code === 200) {",
                  "    const response = pm.response.json();",
                  "    pm.collectionVariables.set('token', response.data.token);",
                  "}"
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "name": "Projects",
      "item": [
        {
          "name": "Create Project",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              },
              {
                "key": "Authorization",
                "value": "Bearer {{token}}"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"title\": \"Website Redesign\",\n  \"description\": \"Complete redesign of the company website\",\n  \"status\": \"Pending\"\n}"
            },
            "url": {
              "raw": "{{baseUrl}}/api/projects",
              "host": ["{{baseUrl}}"],
              "path": ["api", "projects"]
            }
          }
        },
        {
          "name": "Get All Projects",
          "request": {
            "method": "GET",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{token}}"
              }
            ],
            "url": {
              "raw": "{{baseUrl}}/api/projects",
              "host": ["{{baseUrl}}"],
              "path": ["api", "projects"]
            }
          }
        }
      ]
    }
  ]
}
```

## Testing with JavaScript

You can also test the API using JavaScript:

```javascript
// Example using fetch API
const API_BASE = 'http://localhost:5000';

// Login
async function login(email, password) {
  const response = await fetch(`${API_BASE}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  
  const data = await response.json();
  
  if (data.success) {
    localStorage.setItem('token', data.data.token);
    return data.data.user;
  } else {
    throw new Error(data.message);
  }
}

// Create project
async function createProject(projectData) {
  const token = localStorage.getItem('token');
  
  const response = await fetch(`${API_BASE}/api/projects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(projectData),
  });
  
  return await response.json();
}

// Usage
login('alice@company.com', 'SecurePass123')
  .then(user => {
    console.log('Logged in as:', user.name);
    return createProject({
      title: 'New Project',
      description: 'Project description',
      status: 'Pending'
    });
  })
  .then(result => {
    console.log('Project created:', result.data);
  })
  .catch(error => {
    console.error('Error:', error.message);
  });
```

These examples cover all the main functionality of the Project Management API. You can use them as a reference for testing and integration.
