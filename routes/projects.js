const express = require('express');
const router = express.Router();

const projectController = require('../controllers/projectController');
const { protect } = require('../middleware/auth');
const {
  validateProjectCreation,
  validateProjectUpdate
} = require('../middleware/validation');

// All project routes are protected
router.use(protect);

// POST /api/projects - Create a new project
router.post('/', validateProjectCreation, projectController.createProject);

// GET /api/projects - Get all projects for the logged-in user
// Optional query parameters: page, limit, status
router.get('/', projectController.getProjects);

// GET /api/projects/stats - Get project statistics
router.get('/stats', projectController.getProjectStats);

// GET /api/projects/:id - Get a specific project
router.get('/:id', projectController.getProject);

// PUT /api/projects/:id - Update a project
router.put('/:id', validateProjectUpdate, projectController.updateProject);

// DELETE /api/projects/:id - Delete a project
router.delete('/:id', projectController.deleteProject);

module.exports = router;
