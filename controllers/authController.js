const authService = require('../services/authService');
const { asyncHandler } = require('../middleware/error');

// Register a new user
const register = asyncHandler(async (req, res) => {
  const result = await authService.registerUser(req.body);
  
  res.status(201).json(result);
});

// Login user
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const result = await authService.loginUser(email, password);
  
  res.status(200).json(result);
});

// Get user profile
const getProfile = asyncHandler(async (req, res) => {
  const result = await authService.getUserProfile(req.user.id);
  
  res.status(200).json(result);
});

module.exports = {
  register,
  login,
  getProfile,
};
