const Project = require('../models/Project');

// Create a new project
const createProject = async (projectData, userId, tenantId) => {
  const { title, description, status } = projectData;

  const project = await Project.create({
    title,
    description,
    status: status || 'Pending',
    owner: userId,
    tenantId,
  });

  // Populate owner information
  await project.populate('owner', 'name email');

  return {
    success: true,
    message: 'Project created successfully',
    data: project,
  };
};

// Get all projects for a user
const getUserProjects = async (userId, tenantId, options = {}) => {
  const { page = 1, limit = 10, status } = options;
  
  // Build query
  const query = { owner: userId, tenantId };
  
  if (status) {
    query.status = status;
  }

  const skip = (page - 1) * limit;

  const projects = await Project.find(query)
    .populate('owner', 'name email')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Project.countDocuments(query);

  return {
    success: true,
    data: {
      projects,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    },
  };
};

// Get a single project by ID
const getProjectById = async (projectId, userId) => {
  const project = await Project.findById(projectId).populate('owner', 'name email');

  if (!project) {
    throw new Error('Project not found');
  }

  // Check if user owns the project
  if (project.owner._id.toString() !== userId) {
    throw new Error('Access denied. You can only access your own projects.');
  }

  return {
    success: true,
    data: project,
  };
};

// Update a project
const updateProject = async (projectId, updateData, userId) => {
  const project = await Project.findById(projectId);

  if (!project) {
    throw new Error('Project not found');
  }

  // Check if user owns the project
  if (project.owner.toString() !== userId) {
    throw new Error('Access denied. You can only update your own projects.');
  }

  // Update project
  const updatedProject = await Project.findByIdAndUpdate(
    projectId,
    updateData,
    { new: true, runValidators: true }
  ).populate('owner', 'name email');

  return {
    success: true,
    message: 'Project updated successfully',
    data: updatedProject,
  };
};

// Delete a project
const deleteProject = async (projectId, userId) => {
  const project = await Project.findById(projectId);

  if (!project) {
    throw new Error('Project not found');
  }

  // Check if user owns the project
  if (project.owner.toString() !== userId) {
    throw new Error('Access denied. You can only delete your own projects.');
  }

  await Project.findByIdAndDelete(projectId);

  return {
    success: true,
    message: 'Project deleted successfully',
  };
};

// Get project statistics
const getProjectStats = async (userId, tenantId) => {
  const stats = await Project.aggregate([
    { $match: { owner: userId, tenantId } },
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
      },
    },
  ]);

  const totalProjects = await Project.countDocuments({ owner: userId, tenantId });

  const formattedStats = {
    total: totalProjects,
    byStatus: {},
  };

  stats.forEach(stat => {
    formattedStats.byStatus[stat._id] = stat.count;
  });

  return {
    success: true,
    data: formattedStats,
  };
};

module.exports = {
  createProject,
  getUserProjects,
  getProjectById,
  updateProject,
  deleteProject,
  getProjectStats,
};
