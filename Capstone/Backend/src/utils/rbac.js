const roles = {
  admin: ['read', 'write', 'backfill'],
  reader: ['read'],
  writer: ['read', 'write']
}

export function authorizeRole(role, action) {
  return (req, res, next) => {
    if (!roles[role] || !roles[role].includes(action))
      return res.status(403).send({ error: 'forbidden' })
    next()
  }
}
