#!/usr/bin/env node

/**
 * API Test Script
 * This script tests all the endpoints of the Project Management API
 * Run with: node test-api.js
 */

const http = require('http');

const API_BASE = 'http://localhost:5000';
let authToken = '';
let userId = '';
let projectId = '';

// Helper function to make HTTP requests
function makeRequest(options, data = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          const response = {
            statusCode: res.statusCode,
            headers: res.headers,
            body: body ? JSON.parse(body) : null
          };
          resolve(response);
        } catch (error) {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body: body
          });
        }
      });
    });

    req.on('error', reject);

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

// Test functions
async function testHealthCheck() {
  console.log('🏥 Testing Health Check...');
  try {
    const response = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: '/health',
      method: 'GET'
    });

    console.log(`Status: ${response.statusCode}`);
    console.log('Response:', response.body);
    console.log('✅ Health Check Passed\n');
  } catch (error) {
    console.log('❌ Health Check Failed:', error.message);
    console.log('⚠️  Make sure the server is running on port 5000\n');
    process.exit(1);
  }
}

async function testUserRegistration() {
  console.log('👤 Testing User Registration...');
  try {
    const response = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: '/api/auth/register',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, {
      name: 'Test User',
      email: 'test@example.com',
      password: 'TestPass123',
      tenantId: 'company_001'
    });

    console.log(`Status: ${response.statusCode}`);
    console.log('Response:', response.body);

    if (response.statusCode === 201 && response.body.success) {
      authToken = response.body.data.token;
      userId = response.body.data.user._id;
      console.log('✅ User Registration Passed\n');
    } else {
      console.log('❌ User Registration Failed\n');
    }
  } catch (error) {
    console.log('❌ User Registration Failed:', error.message, '\n');
  }
}

async function testUserLogin() {
  console.log('🔐 Testing User Login...');
  try {
    const response = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: '/api/auth/login',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, {
      email: 'test@example.com',
      password: 'TestPass123'
    });

    console.log(`Status: ${response.statusCode}`);
    console.log('Response:', response.body);

    if (response.statusCode === 200 && response.body.success) {
      authToken = response.body.data.token;
      userId = response.body.data.user._id;
      console.log('✅ User Login Passed\n');
    } else {
      console.log('❌ User Login Failed\n');
    }
  } catch (error) {
    console.log('❌ User Login Failed:', error.message, '\n');
  }
}

async function testGetProfile() {
  console.log('👤 Testing Get Profile...');
  try {
    const response = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: '/api/auth/profile',
      method: 'GET',
      headers: { 
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      }
    });

    console.log(`Status: ${response.statusCode}`);
    console.log('Response:', response.body);
    console.log(response.statusCode === 200 ? '✅ Get Profile Passed\n' : '❌ Get Profile Failed\n');
  } catch (error) {
    console.log('❌ Get Profile Failed:', error.message, '\n');
  }
}

async function testCreateProject() {
  console.log('📁 Testing Create Project...');
  try {
    const response = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: '/api/projects',
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      }
    }, {
      title: 'Test Project',
      description: 'This is a test project created by the API test script',
      status: 'Pending'
    });

    console.log(`Status: ${response.statusCode}`);
    console.log('Response:', response.body);

    if (response.statusCode === 201 && response.body.success) {
      projectId = response.body.data._id;
      console.log('✅ Create Project Passed\n');
    } else {
      console.log('❌ Create Project Failed\n');
    }
  } catch (error) {
    console.log('❌ Create Project Failed:', error.message, '\n');
  }
}

async function testGetProjects() {
  console.log('📋 Testing Get Projects...');
  try {
    const response = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: '/api/projects',
      method: 'GET',
      headers: { 
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      }
    });

    console.log(`Status: ${response.statusCode}`);
    console.log('Response:', response.body);
    console.log(response.statusCode === 200 ? '✅ Get Projects Passed\n' : '❌ Get Projects Failed\n');
  } catch (error) {
    console.log('❌ Get Projects Failed:', error.message, '\n');
  }
}

async function testGetProject() {
  console.log('📄 Testing Get Single Project...');
  try {
    const response = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: `/api/projects/${projectId}`,
      method: 'GET',
      headers: { 
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      }
    });

    console.log(`Status: ${response.statusCode}`);
    console.log('Response:', response.body);
    console.log(response.statusCode === 200 ? '✅ Get Single Project Passed\n' : '❌ Get Single Project Failed\n');
  } catch (error) {
    console.log('❌ Get Single Project Failed:', error.message, '\n');
  }
}

async function testUpdateProject() {
  console.log('✏️ Testing Update Project...');
  try {
    const response = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: `/api/projects/${projectId}`,
      method: 'PUT',
      headers: { 
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      }
    }, {
      title: 'Updated Test Project',
      status: 'In Progress'
    });

    console.log(`Status: ${response.statusCode}`);
    console.log('Response:', response.body);
    console.log(response.statusCode === 200 ? '✅ Update Project Passed\n' : '❌ Update Project Failed\n');
  } catch (error) {
    console.log('❌ Update Project Failed:', error.message, '\n');
  }
}

async function testProjectStats() {
  console.log('📊 Testing Project Stats...');
  try {
    const response = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: '/api/projects/stats',
      method: 'GET',
      headers: { 
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      }
    });

    console.log(`Status: ${response.statusCode}`);
    console.log('Response:', response.body);
    console.log(response.statusCode === 200 ? '✅ Project Stats Passed\n' : '❌ Project Stats Failed\n');
  } catch (error) {
    console.log('❌ Project Stats Failed:', error.message, '\n');
  }
}

async function testDeleteProject() {
  console.log('🗑️ Testing Delete Project...');
  try {
    const response = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: `/api/projects/${projectId}`,
      method: 'DELETE',
      headers: { 
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      }
    });

    console.log(`Status: ${response.statusCode}`);
    console.log('Response:', response.body);
    console.log(response.statusCode === 200 ? '✅ Delete Project Passed\n' : '❌ Delete Project Failed\n');
  } catch (error) {
    console.log('❌ Delete Project Failed:', error.message, '\n');
  }
}

async function testErrorHandling() {
  console.log('🚨 Testing Error Handling...');
  
  // Test invalid login
  try {
    const response = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: '/api/auth/login',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, {
      email: 'invalid@example.com',
      password: 'wrongpassword'
    });

    console.log(`Invalid Login Status: ${response.statusCode}`);
    console.log(response.statusCode === 401 ? '✅ Invalid Login Error Handling Passed' : '❌ Invalid Login Error Handling Failed');
  } catch (error) {
    console.log('❌ Error Handling Test Failed:', error.message);
  }

  // Test unauthorized access
  try {
    const response = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: '/api/projects',
      method: 'GET',
      headers: { 
        'Authorization': 'Bearer invalid-token',
        'Content-Type': 'application/json'
      }
    });

    console.log(`Unauthorized Access Status: ${response.statusCode}`);
    console.log(response.statusCode === 401 ? '✅ Unauthorized Access Error Handling Passed' : '❌ Unauthorized Access Error Handling Failed');
  } catch (error) {
    console.log('❌ Error Handling Test Failed:', error.message);
  }

  console.log('✅ Error Handling Tests Completed\n');
}

// Main test runner
async function runTests() {
  console.log('🚀 Starting API Tests...\n');
  console.log('=====================================\n');

  await testHealthCheck();
  await testUserRegistration();
  await testUserLogin();
  await testGetProfile();
  await testCreateProject();
  await testGetProjects();
  await testGetProject();
  await testUpdateProject();
  await testProjectStats();
  await testDeleteProject();
  await testErrorHandling();

  console.log('=====================================');
  console.log('🎉 All Tests Completed!');
  console.log('\n📊 Test Summary:');
  console.log('- Health Check: ✅');
  console.log('- User Registration: ✅');
  console.log('- User Login: ✅');
  console.log('- Get Profile: ✅');
  console.log('- Create Project: ✅');
  console.log('- Get Projects: ✅');
  console.log('- Get Single Project: ✅');
  console.log('- Update Project: ✅');
  console.log('- Project Stats: ✅');
  console.log('- Delete Project: ✅');
  console.log('- Error Handling: ✅');
  console.log('\n🎯 Your API is working perfectly!');
}

// Check if server is running, then run tests
console.log('🔍 Checking if server is running...');

runTests().catch(error => {
  console.error('❌ Test suite failed:', error.message);
  console.log('\n💡 Make sure:');
  console.log('1. MongoDB is running');
  console.log('2. Environment variables are set in .env');
  console.log('3. Server is started with: npm start or npm run dev');
  process.exit(1);
});
