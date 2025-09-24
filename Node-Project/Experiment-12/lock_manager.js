function isLockExpired(seat) {
  if (seat.lockExpiry && seat.lockExpiry < Date.now()) {
    seat.status = 'available';
    seat.lockOwner = null;
    seat.lockExpiry = null;
  }
}

module.exports = { isLockExpired };
