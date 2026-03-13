// Utility functions for the project management API

/**
 * Generate a random tenant ID
 * @returns {string} Random tenant ID
 */
const generateTenantId = () => {
  return 'tenant_' + Math.random().toString(36).substr(2, 9);
};

/**
 * Format date for API responses
 * @param {Date} date - Date to format
 * @returns {string} Formatted date string
 */
const formatDate = (date) => {
  return new Date(date).toISOString();
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if email is valid
 */
const isValidEmail = (email) => {
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
};

/**
 * Sanitize user input by removing extra whitespace
 * @param {string} str - String to sanitize
 * @returns {string} Sanitized string
 */
const sanitizeString = (str) => {
  return str.trim().replace(/\s+/g, ' ');
};

/**
 * Create a standardized success response
 * @param {string} message - Success message
 * @param {object} data - Response data
 * @returns {object} Standardized success response
 */
const createSuccessResponse = (message, data = null) => {
  const response = {
    success: true,
    message,
  };
  
  if (data) {
    response.data = data;
  }
  
  return response;
};

/**
 * Create a standardized error response
 * @param {string} message - Error message
 * @param {number} statusCode - HTTP status code
 * @param {object} errors - Additional error details
 * @returns {object} Standardized error response
 */
const createErrorResponse = (message, statusCode = 500, errors = null) => {
  const response = {
    success: false,
    message,
  };
  
  if (errors) {
    response.errors = errors;
  }
  
  return response;
};

/**
 * Paginate array data
 * @param {Array} array - Array to paginate
 * @param {number} page - Page number
 * @param {number} limit - Items per page
 * @returns {object} Paginated data
 */
const paginateArray = (array, page = 1, limit = 10) => {
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  
  const results = {};
  
  if (endIndex < array.length) {
    results.next = {
      page: page + 1,
      limit: limit,
    };
  }
  
  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit: limit,
    };
  }
  
  results.results = array.slice(startIndex, endIndex);
  results.total = array.length;
  results.pages = Math.ceil(array.length / limit);
  results.currentPage = page;
  
  return results;
};

/**
 * Generate a random project ID
 * @returns {string} Random project ID
 */
const generateProjectId = () => {
  return 'proj_' + Math.random().toString(36).substr(2, 9);
};

/**
 * Check if a string is empty or only whitespace
 * @param {string} str - String to check
 * @returns {boolean} True if string is empty or whitespace
 */
const isEmpty = (str) => {
  return !str || str.trim().length === 0;
};

/**
 * Capitalize the first letter of a string
 * @param {string} str - String to capitalize
 * @returns {string} Capitalized string
 */
const capitalize = (str) => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

module.exports = {
  generateTenantId,
  formatDate,
  isValidEmail,
  sanitizeString,
  createSuccessResponse,
  createErrorResponse,
  paginateArray,
  generateProjectId,
  isEmpty,
  capitalize,
};
