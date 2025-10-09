const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'This is a public route accessible by anyone.' });
});

module.exports = router;
