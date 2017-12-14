const config = {
    server: {
        port: process.env.PORT || 80,
        host: process.env.HOST || '0.0.0.0'
    },
    mongo: 'mongodb://mongo/apnic'
}

module.exports = config
