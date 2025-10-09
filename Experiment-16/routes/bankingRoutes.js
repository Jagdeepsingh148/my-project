const express = require('express');
const jwt = require('jsonwebtoken');
const verifyJWT = require('../middleware/verifyJWT');
const Account = require('../models/accountModel');

const router = express.Router();
const SECRET_KEY = 'banking_secret_key';

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'Jagdeepsingh' && password === '23bai70099') {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

router.get('/balance', verifyJWT, (req, res) => {
  res.json({ balance: Account.getBalance() });
});

router.post('/deposit', verifyJWT, (req, res) => {
  const { amount } = req.body;
  const newBalance = Account.deposit(amount);
  res.json({ message: `Deposited ₹${amount}`, newBalance });
});

router.post('/withdraw', verifyJWT, (req, res) => {
  const { amount } = req.body;
  const newBalance = Account.withdraw(amount);
  if (newBalance === null)
    return res.status(400).json({ error: 'Insufficient balance' });
  res.json({ message: `Withdrawn ₹${amount}`, remainingBalance: newBalance });
});

module.exports = router;
