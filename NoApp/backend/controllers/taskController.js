// File Type: Controller

const { db } = require('../database/db.js');
const { User } = require('../models/user'); // To be created as a model

const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const newUser = await User.create({ email, password });
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user by username
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Validate password
    if (user.password !== password) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
