
const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get account transactions
router.get('/account/:accountId', async (req, res) => {
  try {
    const accountId = req.params.accountId;
    
    const [transactions] = await db.query(
      `SELECT t.*, 
        fromAcc.account_number as from_account_number,
        toAcc.account_number as to_account_number
      FROM transactions t 
      LEFT JOIN accounts fromAcc ON t.from_account_id = fromAcc.account_id
      LEFT JOIN accounts toAcc ON t.to_account_id = toAcc.account_id
      WHERE t.from_account_id = ? OR t.to_account_id = ?
      ORDER BY t.transaction_date DESC`,
      [accountId, accountId]
    );

    res.status(200).json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Deposit
router.post('/deposit', async (req, res) => {
  const connection = await db.getConnection();
  
  try {
    const { accountId, amount, description } = req.body;
    
    if (amount <= 0) {
      return res.status(400).json({ message: 'Amount must be positive' });
    }
    
    await connection.beginTransaction();
    
    // Create transaction record
    const [transactionResult] = await connection.query(
      'INSERT INTO transactions (to_account_id, transaction_type, amount, description) VALUES (?, "DEPOSIT", ?, ?)',
      [accountId, amount, description || 'Deposit']
    );
    
    // Update account balance
    await connection.query(
      'UPDATE accounts SET balance = balance + ? WHERE account_id = ?',
      [amount, accountId]
    );
    
    await connection.commit();
    
    // Get updated account details
    const [accounts] = await connection.query(
      'SELECT * FROM accounts WHERE account_id = ?', 
      [accountId]
    );
    
    res.status(200).json({
      message: 'Deposit successful',
      transactionId: transactionResult.insertId,
      updatedBalance: accounts[0].balance
    });
  } catch (error) {
    await connection.rollback();
    console.error('Error during deposit:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  } finally {
    connection.release();
  }
});

// Withdrawal
router.post('/withdraw', async (req, res) => {
  const connection = await db.getConnection();
  
  try {
    const { accountId, amount, description } = req.body;
    
    if (amount <= 0) {
      return res.status(400).json({ message: 'Amount must be positive' });
    }
    
    // Check if sufficient balance
    const [accounts] = await connection.query(
      'SELECT balance FROM accounts WHERE account_id = ?',
      [accountId]
    );
    
    if (accounts.length === 0) {
      return res.status(404).json({ message: 'Account not found' });
    }
    
    if (accounts[0].balance < amount) {
      return res.status(400).json({ message: 'Insufficient funds' });
    }
    
    await connection.beginTransaction();
    
    // Create transaction record
    const [transactionResult] = await connection.query(
      'INSERT INTO transactions (from_account_id, transaction_type, amount, description) VALUES (?, "WITHDRAWAL", ?, ?)',
      [accountId, amount, description || 'Withdrawal']
    );
    
    // Update account balance
    await connection.query(
      'UPDATE accounts SET balance = balance - ? WHERE account_id = ?',
      [amount, accountId]
    );
    
    await connection.commit();
    
    // Get updated account details
    const [updatedAccounts] = await connection.query(
      'SELECT * FROM accounts WHERE account_id = ?', 
      [accountId]
    );
    
    res.status(200).json({
      message: 'Withdrawal successful',
      transactionId: transactionResult.insertId,
      updatedBalance: updatedAccounts[0].balance
    });
  } catch (error) {
    await connection.rollback();
    console.error('Error during withdrawal:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  } finally {
    connection.release();
  }
});

// Transfer
router.post('/transfer', async (req, res) => {
  const connection = await db.getConnection();
  
  try {
    const { fromAccountId, toAccountNumber, amount, description } = req.body;
    
    if (amount <= 0) {
      return res.status(400).json({ message: 'Amount must be positive' });
    }
    
    // Check if sufficient balance
    const [fromAccounts] = await connection.query(
      'SELECT balance FROM accounts WHERE account_id = ?',
      [fromAccountId]
    );
    
    if (fromAccounts.length === 0) {
      return res.status(404).json({ message: 'Source account not found' });
    }
    
    if (fromAccounts[0].balance < amount) {
      return res.status(400).json({ message: 'Insufficient funds' });
    }
    
    // Find destination account
    const [toAccounts] = await connection.query(
      'SELECT account_id FROM accounts WHERE account_number = ?',
      [toAccountNumber]
    );
    
    if (toAccounts.length === 0) {
      return res.status(404).json({ message: 'Destination account not found' });
    }
    
    const toAccountId = toAccounts[0].account_id;
    
    await connection.beginTransaction();
    
    // Create transaction record
    const [transactionResult] = await connection.query(
      'INSERT INTO transactions (from_account_id, to_account_id, transaction_type, amount, description) VALUES (?, ?, "TRANSFER", ?, ?)',
      [fromAccountId, toAccountId, amount, description || 'Transfer']
    );
    
    // Update account balances
    await connection.query(
      'UPDATE accounts SET balance = balance - ? WHERE account_id = ?',
      [amount, fromAccountId]
    );
    
    await connection.query(
      'UPDATE accounts SET balance = balance + ? WHERE account_id = ?',
      [amount, toAccountId]
    );
    
    await connection.commit();
    
    // Get updated account details
    const [updatedAccounts] = await connection.query(
      'SELECT * FROM accounts WHERE account_id = ?', 
      [fromAccountId]
    );
    
    res.status(200).json({
      message: 'Transfer successful',
      transactionId: transactionResult.insertId,
      updatedBalance: updatedAccounts[0].balance
    });
  } catch (error) {
    await connection.rollback();
    console.error('Error during transfer:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  } finally {
    connection.release();
  }
});

module.exports = router;
