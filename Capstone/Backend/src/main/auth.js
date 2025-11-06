import jwt from 'jsonwebtoken'

export function authMiddleware(secret) {
  return (req, res, next) => {
    const auth = req.headers.authorization
    if (!auth) return res.status(401).send({ error: 'missing auth header' })
    const token = auth.split(' ')[1]
    try {
      req.user = jwt.verify(token, secret)
      next()
    } catch (e) {
      res.status(401).send({ error: 'invalid token' })
    }
  }
}

export function generateToken(payload, secret) {
  return jwt.sign(payload, secret, { expiresIn: '1h' })
}
