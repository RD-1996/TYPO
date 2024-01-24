// server/controllers/authController.js

const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (user) => {
  // You can customize the token payload as per your requirements
  const payload = {
    userId: user._id,
    username: user.username,
    email: user.email,
  };

  // Set the token expiration time (e.g., 1 day)
  const options = {
    expiresIn: '1d',
  };

  // Generate and return the JWT token
  return jwt.sign(payload, process.env.JWT_SECRET, options);
};

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: 'Email is already registered' });
    }

    // Create a new user
    const newUser = new User({ username, email, password });
    await newUser.save();

    // Generate a JWT token
    const token = generateToken(newUser);
    console.log('Generated Token:', token);


    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(user);

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { register, login };
