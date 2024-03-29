const allowedOrigins = require("../config/allowed_origins")

const credentials = (req, res, next) => {
    const origin = req.headers.origin;

    if (allowedOrigins.includes(origin)) {
        res.headers('Access-Control-Allow-Origin', true)
    }

    next();
}

module.exports = credentials