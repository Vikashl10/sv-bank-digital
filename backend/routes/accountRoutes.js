
const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get user accounts
router.get('/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    
    const [accounts] = await db.query(
      'SELECT * FROM accounts WHERE user_id = ?',
      [userId]
    );

    res.status(200).json(accounts);
  } catch (error) {
    console.error('Error fetching accounts:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get account details
router.get('/:accountId', async (req, res) => {
  try {
    const accountId = req.params.accountId;
    
    const [accounts] = await db.query(
      'SELECT * FROM accounts WHERE account_id = ?',
      [accountId]
    );

    if (accounts.length === 0) {
      return res.status(404).json({ message: 'Account not found' });
    }

    res.status(200).json(accounts[0]);
  } catch (error) {
    console.error('Error fetching account details:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create a new account
router.post('/', async (req, res) => {
  try {
    const { userId, accountType } = req.body;
    
    // Generate account number
    const accountNumber = 'SV' + String(Math.floor(Math.random() * 10000000)).padStart(8, '0');
    
    const [result] = await db.query(
      'INSERT INTO accounts (user_id, account_number, account_type, balance) VALUES (?, ?, ?, 0.00)',
      [userId, accountNumber, accountType]
    );

    res.status(201).json({ 
      message: 'Account created successfully',
      accountId: result.insertId,
      accountNumber
    });
  } catch (error) {
    console.error('Error creating account:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
