const express = require('express');
const mongoose = require('./db'); // Import the mongoose instance from db.js
const dotenv = require('dotenv');

// Import middleware and routes
const middleware = require('./utils/middleware');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Start the server after successfully connecting to the database
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//cors issues
app.use(cors());

// Middleware for JSON parsing
app.use(express.json());

// Routes
app.use('/auth', authRoutes);

// Example unprotected route
app.get('/', (req, res) => {
  res.send('Welcome to the Typo App!');
});

// Example protected route
app.get('/protected', middleware.authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected route!', user: req.user });
});
