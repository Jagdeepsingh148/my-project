module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader)
    return res.status(401).json({ error: 'Missing Authorization header' });

  const token = authHeader.split(' ')[1];
  if (token === 'mysecrettoken') next();
  else res.status(403).json({ error: 'Invalid Bearer token' });
};
