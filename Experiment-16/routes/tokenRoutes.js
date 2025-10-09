const express = require('express');
const router = express.Router();
const bearerAuth = require('../middleware/bearerAuth');

router.get('/', bearerAuth, (req, res) => {
  res.json({ message: 'Access granted with valid Bearer token.' });
});

module.exports = router;
