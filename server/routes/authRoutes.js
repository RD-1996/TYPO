// server/routes/authRoutes.js

const express = require('express');
const authController = require('../controllers/authController');
const middleware = require('../utils/middleware');

const router = express.Router();

// Register a new user
router.post('/register', authController.register);

// Login
router.post('/login', authController.login);

// Example protected route (requires authentication)
router.get('/protected', middleware.authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected route!' });
});

module.exports = router;
