# API Testing Guide

This guide shows you multiple ways to test your Project Management API.

## 🚀 Quick Start Testing

### Method 1: Automated Test Script (Recommended)

Run the comprehensive test script that tests all endpoints:

```bash
# First, make sure your server is running
npm start

# In a new terminal, run the test script
node test-api.js
```

This will test:
- Health check
- User registration & login
- Project CRUD operations
- Error handling
- Authentication

---

### Method 2: cURL Commands

Test individual endpoints using cURL:

#### 1. Start the Server
```bash
npm start
```

#### 2. Test Health Check
```bash
curl http://localhost:5000/health
```

#### 3. Register a User
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

#### 4. Login and Get Token
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPass123"
  }'
```

**Save the token from the response - you'll need it for protected endpoints**

#### 5. Create a Project (replace YOUR_TOKEN)
```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "Test Project",
    "description": "This is a test project",
    "status": "Pending"
  }'
```

#### 6. Get All Projects
```bash
curl -X GET http://localhost:5000/api/projects \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### 7. Get Project Statistics
```bash
curl -X GET http://localhost:5000/api/projects/stats \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

### Method 3: Postman (GUI Testing)

#### Import Postman Collection:

1. **Open Postman**
2. **Click "Import"**
3. **Select "Raw text"**
4. **Copy and paste this collection:**

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
      "name": "Health Check",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "{{baseUrl}}/health",
          "host": ["{{baseUrl}}"],
          "path": ["health"]
        }
      }
    },
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
              "raw": "{\n  \"name\": \"Test User\",\n  \"email\": \"test@example.com\",\n  \"password\": \"TestPass123\",\n  \"tenantId\": \"company_001\"\n}"
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
              "raw": "{\n  \"email\": \"test@example.com\",\n  \"password\": \"TestPass123\"\n}"
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
                  "    pm.collectionVariables.set('userId', response.data.user._id);",
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
              "raw": "{\n  \"title\": \"Test Project\",\n  \"description\": \"This is a test project\",\n  \"status\": \"Pending\"\n}"
            },
            "url": {
              "raw": "{{baseUrl}}/api/projects",
              "host": ["{{baseUrl}}"],
              "path": ["api", "projects"]
            }
          },
          "event": [
            {
              "listen": "test",
              "script": {
                "exec": [
                  "if (pm.response.code === 201) {",
                  "    const response = pm.response.json();",
                  "    pm.collectionVariables.set('projectId', response.data._id);",
                  "}"
                ]
              }
            }
          ]
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
        },
        {
          "name": "Get Project Stats",
          "request": {
            "method": "GET",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{token}}"
              }
            ],
            "url": {
              "raw": "{{baseUrl}}/api/projects/stats",
              "host": ["{{baseUrl}}"],
              "path": ["api", "projects", "stats"]
            }
          }
        },
        {
          "name": "Get Single Project",
          "request": {
            "method": "GET",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{token}}"
              }
            ],
            "url": {
              "raw": "{{baseUrl}}/api/projects/{{projectId}}",
              "host": ["{{baseUrl}}"],
              "path": ["api", "projects", "{{projectId}}"]
            }
          }
        },
        {
          "name": "Update Project",
          "request": {
            "method": "PUT",
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
              "raw": "{\n  \"title\": \"Updated Project Title\",\n  \"status\": \"In Progress\"\n}"
            },
            "url": {
              "raw": "{{baseUrl}}/api/projects/{{projectId}}",
              "host": ["{{baseUrl}}"],
              "path": ["api", "projects", "{{projectId}}"]
            }
          }
        },
        {
          "name": "Delete Project",
          "request": {
            "method": "DELETE",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{token}}"
              }
            ],
            "url": {
              "raw": "{{baseUrl}}/api/projects/{{projectId}}",
              "host": ["{{baseUrl}}"],
              "path": ["api", "projects", "{{projectId}}"]
            }
          }
        }
      ]
    }
  ]
}
```

---

### Method 4: Web Browser

You can test GET endpoints directly in your browser:

#### Open in Browser:
```
http://localhost:5000/health
http://localhost:5000/api
```

These endpoints don't require authentication and will show the API status and documentation.

---

### Method 5: JavaScript/Fetch API

Create a test file `browser-test.html`:

```html
<!DOCTYPE html>
<html>
<head>
    <title>API Test</title>
</head>
<body>
    <h1>API Test Console</h1>
    <button onclick="testHealth()">Test Health</button>
    <button onclick="testRegister()">Test Register</button>
    <button onclick="testLogin()">Test Login</button>
    <button onclick="testCreateProject()">Create Project</button>
    <button onclick="testGetProjects()">Get Projects</button>
    
    <div id="output" style="margin-top: 20px; padding: 10px; background: #f0f0f0;"></div>

    <script>
        const output = document.getElementById('output');
        let token = '';

        function log(message) {
            output.innerHTML += '<pre>' + JSON.stringify(message, null, 2) + '</pre>';
        }

        async function testHealth() {
            try {
                const response = await fetch('http://localhost:5000/health');
                const data = await response.json();
                log(data);
            } catch (error) {
                log({error: error.message});
            }
        }

        async function testRegister() {
            try {
                const response = await fetch('http://localhost:5000/api/auth/register', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        name: 'Test User',
                        email: 'test@example.com',
                        password: 'TestPass123',
                        tenantId: 'company_001'
                    })
                });
                const data = await response.json();
                log(data);
            } catch (error) {
                log({error: error.message});
            }
        }

        async function testLogin() {
            try {
                const response = await fetch('http://localhost:5000/api/auth/login', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        email: 'test@example.com',
                        password: 'TestPass123'
                    })
                });
                const data = await response.json();
                if (data.success) {
                    token = data.data.token;
                }
                log(data);
            } catch (error) {
                log({error: error.message});
            }
        }

        async function testCreateProject() {
            try {
                const response = await fetch('http://localhost:5000/api/projects', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        title: 'Test Project',
                        description: 'This is a test project',
                        status: 'Pending'
                    })
                });
                const data = await response.json();
                log(data);
            } catch (error) {
                log({error: error.message});
            }
        }

        async function testGetProjects() {
            try {
                const response = await fetch('http://localhost:5000/api/projects', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                log(data);
            } catch (error) {
                log({error: error.message});
            }
        }
    </script>
</body>
</html>
```

---

## 🧪 Testing Scenarios

### 1. Happy Path Tests
- ✅ User registration works
- ✅ User login returns token
- ✅ Authenticated user can create projects
- ✅ User can only access their own projects
- ✅ Project CRUD operations work

### 2. Error Handling Tests
- ❌ Invalid email format
- ❌ Weak password
- ❌ Wrong login credentials
- ❌ Missing authentication token
- ❌ Accessing other user's projects
- ❌ Invalid project data

### 3. Edge Cases
- Empty project title
- Very long descriptions
- Special characters in data
- Concurrent requests

---

## 📊 Expected Responses

### Success Response Format:
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    // Response data
  }
}
```

### Error Response Format:
```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

---

## 🔧 Troubleshooting

### Common Issues:

1. **Server Not Running**
   ```bash
   # Start the server
   npm start
   # or for development
   npm run dev
   ```

2. **MongoDB Connection Failed**
   - Check if MongoDB is running
   - Verify MONGO_URI in .env
   - Ensure database exists

3. **Authentication Errors**
   - Make sure you're using the correct token
   - Check token hasn't expired
   - Verify Authorization header format: `Bearer <token>`

4. **CORS Errors (Browser Testing)**
   - The API allows all origins in development
   - For production, update CORS settings

5. **Validation Errors**
   - Check required fields
   - Verify data formats
   - Ensure password meets requirements

---

## 🚀 Pro Testing Tips

1. **Use Environment Variables**
   - Set different environments (dev, staging, prod)
   - Use different databases for testing

2. **Automated Testing**
   - Run `node test-api.js` before each deployment
   - Set up CI/CD pipeline with tests

3. **Load Testing**
   - Use tools like Apache JMeter or k6
   - Test API performance under load

4. **API Documentation**
   - Visit `http://localhost:5000/api` for endpoint documentation
   - Check API_EXAMPLES.md for detailed examples

Now you're ready to test your API! Choose the method that works best for you. 🎉
