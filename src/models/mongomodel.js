const mongoose = require('mongoose')

class MongoModel {
    constructor(name, schema) {
        this.model = mongoose.model(name, schema);
        this.projection = {
            __v: false
        }
    }

    create(body) {
        const model = new this.model(body);
        return model.save()
    }

    insertMany(records) {
        return this.model
            .insertMany(records)
    }
    find(...args) {
        return this.model
            .find(...args)
            .exec()
    }

    findOne(...args) {
        return this.model
            .findOne(...args)
            .exec()
    }

    findById(...args) {
        return this.model
            .findById(...args)
            .exec()
    }

    update(...args) {
        return this.model
            .update(...args)
            .exec()
    }

    remove(...args) {
        return this.model
            .remove(...args)
            .exec()
    }

    aggregate(query) {
        return this.model
            .aggregate(query)
            .exec()
    }
}

module.exports = MongoModel
