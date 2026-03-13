const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Register a new user
const registerUser = async (userData) => {
  const { name, email, password, tenantId } = userData;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('User with this email already exists');
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password,
    tenantId,
  });

  // Generate token
  const token = generateToken(user._id);

  // Return user data without password
  const userResponse = {
    _id: user._id,
    name: user.name,
    email: user.email,
    tenantId: user.tenantId,
    createdAt: user.createdAt,
  };

  return {
    success: true,
    message: 'User registered successfully',
    data: {
      user: userResponse,
      token,
    },
  };
};

// Login user
const loginUser = async (email, password) => {
  // Find user by email (include password for comparison)
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    throw new Error('Invalid email or password');
  }

  // Check if password matches
  const isPasswordMatch = await user.matchPassword(password);

  if (!isPasswordMatch) {
    throw new Error('Invalid email or password');
  }

  // Generate token
  const token = generateToken(user._id);

  // Return user data without password
  const userResponse = {
    _id: user._id,
    name: user.name,
    email: user.email,
    tenantId: user.tenantId,
    createdAt: user.createdAt,
  };

  return {
    success: true,
    message: 'Login successful',
    data: {
      user: userResponse,
      token,
    },
  };
};

// Get user profile
const getUserProfile = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error('User not found');
  }

  return {
    success: true,
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      tenantId: user.tenantId,
      createdAt: user.createdAt,
    },
  };
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  generateToken,
};
