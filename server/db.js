const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI, {
    dbName: 'your_database_name',
  })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas', error);
  });

// Event listener for successful database connection
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to MongoDB');
});

// Event listener for database connection error
mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

// Event listener for disconnected database
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected from MongoDB');
});

// Gracefully close the database connection on application termination
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose connection closed due to application termination');
    process.exit(0);
  });
});

module.exports = mongoose;
