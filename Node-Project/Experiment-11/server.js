const express = require('express');
const cardRoutes = require('./routes');

const app = express();
const PORT = 3000;

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

	function authMiddleware(req, res, next) {
	  const token = req.headers['authorization'];
	  if (token === 'Bearer mysecrettoken') {
	    next();
	  } else {
	    res.status(403).json({ message: 'Forbidden' });
	  }
	}

	app.get('/admin', authMiddleware, (req, res) => {
	  res.send('This is a protected route');
	});


app.use('/cards', cardRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
  res.send('Welcome to the Playing Cards API! Try /cards to see all cards.');
});



