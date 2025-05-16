
-- MySQL Database Schema for SV BANK

-- Create database
CREATE DATABASE IF NOT EXISTS sv_bank;
USE sv_bank;

-- Users table
CREATE TABLE IF NOT EXISTS user (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  password VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  phone_number VARCHAR(15),
  address TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Staff table
CREATE TABLE IF NOT EXISTS staff (
  staff_id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  password VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  position VARCHAR(50),
  department VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Accounts table
CREATE TABLE IF NOT EXISTS accounts (
  account_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  account_number VARCHAR(20) NOT NULL UNIQUE,
  account_type ENUM('SAVINGS', 'CURRENT', 'FIXED_DEPOSIT') DEFAULT 'SAVINGS',
  balance DECIMAL(15,2) DEFAULT 0.00,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE
);

-- Transactions table
CREATE TABLE IF NOT EXISTS transactions (
  transaction_id INT AUTO_INCREMENT PRIMARY KEY,
  from_account_id INT,
  to_account_id INT,
  transaction_type ENUM('DEPOSIT', 'WITHDRAWAL', 'TRANSFER', 'LOAN_DISBURSEMENT', 'LOAN_PAYMENT') NOT NULL,
  amount DECIMAL(15,2) NOT NULL,
  description TEXT,
  transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status ENUM('PENDING', 'COMPLETED', 'FAILED') DEFAULT 'COMPLETED',
  FOREIGN KEY (from_account_id) REFERENCES accounts(account_id),
  FOREIGN KEY (to_account_id) REFERENCES accounts(account_id)
);

-- Loan table
CREATE TABLE IF NOT EXISTS loan (
  loan_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  account_id INT NOT NULL,
  loan_type ENUM('PERSONAL', 'HOME', 'AUTO', 'EDUCATION', 'BUSINESS') NOT NULL,
  principle_amount DECIMAL(15,2) NOT NULL,
  interest_rate DECIMAL(5,2) NOT NULL,
  term_months INT NOT NULL,
  start_date DATE NOT NULL,
  due_date DATE NOT NULL,
  status ENUM('PENDING', 'APPROVED', 'REJECTED', 'ACTIVE', 'CLOSED') DEFAULT 'PENDING',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE,
  FOREIGN KEY (account_id) REFERENCES accounts(account_id)
);

-- Insert sample data for testing
INSERT INTO user (username, password, email, first_name, last_name, phone_number) 
VALUES ('john_doe', 'password123', 'john@example.com', 'John', 'Doe', '9876543210');

INSERT INTO staff (username, password, email, first_name, last_name, position, department) 
VALUES ('admin_user', 'admin123', 'admin@svbank.com', 'Admin', 'User', 'Manager', 'Operations');

INSERT INTO accounts (user_id, account_number, account_type, balance) 
VALUES (1, 'SV00012345', 'SAVINGS', 85500.00);

INSERT INTO transactions (from_account_id, to_account_id, transaction_type, amount, description) 
VALUES (1, NULL, 'DEPOSIT', 5000.00, 'Initial deposit');

INSERT INTO loan (user_id, account_id, loan_type, principle_amount, interest_rate, term_months, start_date, due_date, status) 
VALUES (1, 1, 'PERSONAL', 50000.00, 8.5, 24, '2025-05-01', '2027-05-01', 'ACTIVE');
