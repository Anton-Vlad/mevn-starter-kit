function errorHandler(err, req, next) {
    req.status(500).send(err.message)
}

module.exports = errorHandler