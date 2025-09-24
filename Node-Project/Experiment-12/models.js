const seats = {};

for (let i = 1; i <= 10; i++) {
  seats[i] = { status: 'available', lockOwner: null, lockExpiry: null };
}

module.exports = seats;
