const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./middleware/logger');
const publicRoutes = require('./routes/publicRoutes');
const tokenRoutes = require('./routes/tokenRoutes');
const bankingRoutes = require('./routes/bankingRoutes');

const app = express();
app.use(bodyParser.json());

app.use(logger);

app.use('/public', publicRoutes);
app.use('/token-protected', tokenRoutes);
app.use('/banking', bankingRoutes);

app.listen(3000, () => console.log('Server running on port 3000'));
