const express = require('express');
const { Sequelize } = require('sequelize');

const router = express.Router();

const sequelize = new Sequelize('NoApp', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql'
});

router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    // Registration logic goes here
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred during registration' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    // Login logic goes here
    res.status(200).json({ message: 'User logged in successfully' });
  } catch (error) {
    res.status(401).json({ error: 'Invalid username or password' });
  }
});

router.delete('/delete', async (req, res) => {
  try {
    const { userId } = req.body;
    // Delete user logic goes here
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting user' });
  }
});

module.exports = router;
