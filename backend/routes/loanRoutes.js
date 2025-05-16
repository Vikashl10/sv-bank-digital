
const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get user loans
router.get('/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    
    const [loans] = await db.query(
      'SELECT l.*, a.account_number FROM loan l ' +
      'JOIN accounts a ON l.account_id = a.account_id ' +
      'WHERE l.user_id = ?',
      [userId]
    );

    res.status(200).json(loans);
  } catch (error) {
    console.error('Error fetching loans:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Apply for a loan
router.post('/apply', async (req, res) => {
  const connection = await db.getConnection();
  
  try {
    const { 
      userId, 
      accountId, 
      loanType, 
      principleAmount, 
      interestRate, 
      termMonths, 
      startDate
    } = req.body;
    
    // Calculate due date (startDate + termMonths)
    const start = new Date(startDate);
    const dueDate = new Date(start);
    dueDate.setMonth(dueDate.getMonth() + parseInt(termMonths));
    
    await connection.beginTransaction();
    
    // Insert loan application
    const [loanResult] = await connection.query(
      `INSERT INTO loan 
        (user_id, account_id, loan_type, principle_amount, interest_rate, 
        term_months, start_date, due_date, status) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, "PENDING")`,
      [userId, accountId, loanType, principleAmount, interestRate, termMonths, startDate, 
       dueDate.toISOString().split('T')[0]]
    );
    
    await connection.commit();
    
    res.status(201).json({
      message: 'Loan application submitted successfully',
      loanId: loanResult.insertId
    });
  } catch (error) {
    await connection.rollback();
    console.error('Error during loan application:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  } finally {
    connection.release();
  }
});

// Approve loan (staff only)
router.put('/:loanId/approve', async (req, res) => {
  const connection = await db.getConnection();
  
  try {
    const { loanId } = req.params;
    
    await connection.beginTransaction();
    
    // Get loan details
    const [loans] = await connection.query(
      'SELECT * FROM loan WHERE loan_id = ?',
      [loanId]
    );
    
    if (loans.length === 0) {
      await connection.rollback();
      return res.status(404).json({ message: 'Loan not found' });
    }
    
    const loan = loans[0];
    
    // Update loan status
    await connection.query(
      'UPDATE loan SET status = "APPROVED" WHERE loan_id = ?',
      [loanId]
    );
    
    // Create transaction for loan disbursement
    await connection.query(
      'INSERT INTO transactions (to_account_id, transaction_type, amount, description) VALUES (?, "LOAN_DISBURSEMENT", ?, ?)',
      [loan.account_id, loan.principle_amount, `Loan disbursement - ${loan.loan_type}`]
    );
    
    // Update account balance
    await connection.query(
      'UPDATE accounts SET balance = balance + ? WHERE account_id = ?',
      [loan.principle_amount, loan.account_id]
    );
    
    await connection.commit();
    
    res.status(200).json({
      message: 'Loan approved and disbursed successfully'
    });
  } catch (error) {
    await connection.rollback();
    console.error('Error approving loan:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  } finally {
    connection.release();
  }
});

// Reject loan (staff only)
router.put('/:loanId/reject', async (req, res) => {
  try {
    const { loanId } = req.params;
    
    const [result] = await db.query(
      'UPDATE loan SET status = "REJECTED" WHERE loan_id = ?',
      [loanId]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Loan not found' });
    }
    
    res.status(200).json({
      message: 'Loan application rejected'
    });
  } catch (error) {
    console.error('Error rejecting loan:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
