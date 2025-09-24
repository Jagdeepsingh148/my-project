const express = require('express');
const app = express();
const seatRoutes = require('./routes');

app.use(express.json());
app.use('/seats', seatRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
  res.send('Welcome to the Concurrent Ticket Booking System API! Use /seats to view and manage bookings.');
});
