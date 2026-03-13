const projectService = require('../services/projectService');
const { asyncHandler } = require('../middleware/error');

// Create a new project
const createProject = asyncHandler(async (req, res) => {
  const result = await projectService.createProject(
    req.body,
    req.user.id,
    req.user.tenantId
  );
  
  res.status(201).json(result);
});

// Get all projects for the logged-in user
const getProjects = asyncHandler(async (req, res) => {
  const { page, limit, status } = req.query;
  
  const options = {
    page: page || 1,
    limit: limit || 10,
    status,
  };
  
  const result = await projectService.getUserProjects(
    req.user.id,
    req.user.tenantId,
    options
  );
  
  res.status(200).json(result);
});

// Get a single project by ID
const getProject = asyncHandler(async (req, res) => {
  const result = await projectService.getProjectById(
    req.params.id,
    req.user.id
  );
  
  res.status(200).json(result);
});

// Update a project
const updateProject = asyncHandler(async (req, res) => {
  const result = await projectService.updateProject(
    req.params.id,
    req.body,
    req.user.id
  );
  
  res.status(200).json(result);
});

// Delete a project
const deleteProject = asyncHandler(async (req, res) => {
  const result = await projectService.deleteProject(
    req.params.id,
    req.user.id
  );
  
  res.status(200).json(result);
});

// Get project statistics
const getProjectStats = asyncHandler(async (req, res) => {
  const result = await projectService.getProjectStats(
    req.user.id,
    req.user.tenantId
  );
  
  res.status(200).json(result);
});

module.exports = {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
  getProjectStats,
};
