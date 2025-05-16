
const express = require('express');
const router = express.Router();
const db = require('../config/db');

// User registration
router.post('/register', async (req, res) => {
  try {
    const { username, password, email, firstName, lastName, phone } = req.body;
    
    // Check if user already exists
    const [existingUsers] = await db.query(
      'SELECT * FROM user WHERE username = ? OR email = ?',
      [username, email]
    );
    
    if (existingUsers.length > 0) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    // Insert new user
    const [result] = await db.query(
      'INSERT INTO user (username, password, email, first_name, last_name, phone_number) VALUES (?, ?, ?, ?, ?, ?)',
      [username, password, email, firstName, lastName, phone]
    );

    // Generate account number
    const accountNumber = 'SV' + String(Math.floor(Math.random() * 10000000)).padStart(8, '0');
    
    // Create default savings account for new user
    await db.query(
      'INSERT INTO accounts (user_id, account_number, account_type, balance) VALUES (?, ?, "SAVINGS", 0.00)',
      [result.insertId, accountNumber]
    );

    res.status(201).json({ 
      message: 'User registered successfully',
      userId: result.insertId,
      accountNumber
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// User login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const [users] = await db.query(
      'SELECT u.user_id, u.username, u.first_name, u.last_name, u.email, a.account_number, a.balance, a.account_id ' +
      'FROM user u JOIN accounts a ON u.user_id = a.user_id ' +
      'WHERE u.username = ? AND u.password = ?',
      [username, password]
    );

    if (users.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = users[0];
    
    res.status(200).json({
      userId: user.user_id,
      username: user.username,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      accountNumber: user.account_number,
      accountId: user.account_id,
      balance: user.balance
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user profile
router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    
    const [users] = await db.query(
      'SELECT user_id, username, email, first_name, last_name, phone_number, address ' +
      'FROM user WHERE user_id = ?',
      [userId]
    );

    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(users[0]);
  } catch (error) {
    console.error('Error getting user profile:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
