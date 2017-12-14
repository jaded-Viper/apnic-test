const errorHandler = (err, req, res, next) => {
    return res.status(500).json({status: 'fail', data: null, error: {message: err.message}})
}

module.exports = errorHandler
