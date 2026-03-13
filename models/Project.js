const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Project description is required'],
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  status: {
    type: String,
    required: [true, 'Project status is required'],
    enum: ['Pending', 'In Progress', 'Completed'],
    default: 'Pending'
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Project owner is required'],
    ref: 'User'
  },
  tenantId: {
    type: String,
    required: [true, 'Tenant ID is required'],
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for faster queries
projectSchema.index({ owner: 1, tenantId: 1 });
projectSchema.index({ status: 1 });

module.exports = mongoose.model('Project', projectSchema);
