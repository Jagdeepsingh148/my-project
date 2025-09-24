const seats = require('./models');
const { isLockExpired } = require('./lock_manager');

exports.viewSeats = (req, res) => {
  Object.values(seats).forEach(seat => isLockExpired(seat));
  res.json(seats);
};

exports.lockSeat = (req, res) => {
  const { seatId, userId } = req.body;
  const seat = seats[seatId];

  if (!seat) return res.status(404).json({ message: "Seat not found" });

  isLockExpired(seat);

  if (seat.status === 'available') {
    seat.status = 'locked';
    seat.lockOwner = userId;
    seat.lockExpiry = Date.now() + 60000; // 1 min lock
    return res.json({ message: "Seat locked successfully", seatId });
  }

  res.status(400).json({ message: "Seat already locked or booked" });
};

exports.confirmBooking = (req, res) => {
  const { seatId, userId } = req.body;
  const seat = seats[seatId];

  if (!seat) return res.status(404).json({ message: "Seat not found" });

  isLockExpired(seat);

  if (seat.status === 'locked' && seat.lockOwner === userId) {
    seat.status = 'booked';
    seat.lockOwner = null;
    seat.lockExpiry = null;
    return res.json({ message: "Booking confirmed", seatId });
  }

  res.status(400).json({ message: "Seat not locked by you or already booked" });
};

