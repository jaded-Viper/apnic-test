const express = require('express')
const mongoose = require('mongoose')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const bluebird = require('bluebird')
const errorHandler = require('./utils/errorhandler')
const config = require('./config')
const routes = require('./routes')
const app = express()

app.use(helmet());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/', routes)
app.use(errorHandler)

mongoose.Promise = bluebird;
mongoose.connect(
    config.mongo,
    {useMongoClient: true}
).then(() => {
    app.listen(config.server.port, config.server.host, () => {
        console.log(`Express server is listening at ${config.server.host}:${config.server.port}`);
    })
})

module.exports = app
