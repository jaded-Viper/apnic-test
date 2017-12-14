const MongoModel = require('../mongomodel')
const HeaderSchema = require('./schema')

class HeaderModel extends MongoModel {
    constructor() {
        super('Header', HeaderSchema)
    }
}

module.exports = new HeaderModel()
