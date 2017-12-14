const MongoModel = require('../mongomodel')
const StatisticsSchema = require('./schema')

class StatisticsModel extends MongoModel {
    constructor() {
        super('Statistics', StatisticsSchema)
    }
}

module.exports = new StatisticsModel()
