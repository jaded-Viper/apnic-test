const path = require('path')

const environment = process.env.NODE_ENV || 'dev'
let config = require(path.join(__dirname, '/cfg/' + environment + '.js'))
config.environment = environment
    
module.exports = config
