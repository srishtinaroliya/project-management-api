const app = require('./app');
const connectDB = require('./config/database');
const config = require('./config/config');

// Connect to database
connectDB();

const PORT = config.PORT;

const server = app.listen(PORT, () => {
  console.log(`
🚀 Server is running on port ${PORT}
📱 Environment: ${config.NODE_ENV}
🔗 API URL: http://localhost:${PORT}
📚 API Documentation: http://localhost:${PORT}/api
🏥 Health Check: http://localhost:${PORT}/health
  `);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log('Error: ', err);
  // Close server & exit process
  server.close(() => process.exit(1));
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log('Error: ', err);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
    process.exit(0);
  });
});

module.exports = server;
