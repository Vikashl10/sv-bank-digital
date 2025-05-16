
const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Staff login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const [staff] = await db.query(
      'SELECT staff_id, username, first_name, last_name, position, department ' +
      'FROM staff WHERE username = ? AND password = ?',
      [username, password]
    );

    if (staff.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    res.status(200).json({
      staffId: staff[0].staff_id,
      username: staff[0].username,
      firstName: staff[0].first_name,
      lastName: staff[0].last_name,
      position: staff[0].position,
      department: staff[0].department
    });
  } catch (error) {
    console.error('Error during staff login:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all pending loans (staff only)
router.get('/pending-loans', async (req, res) => {
  try {
    const [loans] = await db.query(
      `SELECT l.*, 
        u.first_name, u.last_name, u.email, 
        a.account_number, a.balance 
      FROM loan l
      JOIN user u ON l.user_id = u.user_id
      JOIN accounts a ON l.account_id = a.account_id
      WHERE l.status = "PENDING"
      ORDER BY l.created_at DESC`
    );
    
    res.status(200).json(loans);
  } catch (error) {
    console.error('Error fetching pending loans:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all users (staff only)
router.get('/users', async (req, res) => {
  try {
    const [users] = await db.query(
      `SELECT u.user_id, u.username, u.email, u.first_name, u.last_name, 
        u.phone_number, u.created_at,
        COUNT(DISTINCT a.account_id) as account_count,
        SUM(a.balance) as total_balance,
        COUNT(DISTINCT l.loan_id) as loan_count
      FROM user u
      LEFT JOIN accounts a ON u.user_id = a.user_id
      LEFT JOIN loan l ON u.user_id = l.user_id
      GROUP BY u.user_id
      ORDER BY u.created_at DESC`
    );
    
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
