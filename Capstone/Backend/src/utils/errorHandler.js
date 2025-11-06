export function errorHandler(logger) {
  return (err, req, res, next) => {
    logger.error({ err, path: req.path })
    res.status(500).send({ error: 'internal server error', message: err.message })
  }
}
