const express = require('express');
const router = express.Router();
const { viewSeats, lockSeat, confirmBooking } = require('./controller');

router.get('/', viewSeats);
router.post('/lock', lockSeat);
router.post('/confirm', confirmBooking);

module.exports = router;
