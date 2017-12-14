const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const StatisticsSchema = new Schema({
    registry: {
        type: String,
        required: [true, 'Registry is a required field']
    },
    country_code: {
        type: String,
        required: [true, 'Country Code is required']
    },
    type: {
        type: String,
        enum: {
            values: ['asn', 'ipv4', 'ipv6'],
            message: 'Type must be one of "asn", "ipv4" or "ipv6'
        },
        required: [true, 'Type is a required field']
    },
    start: {
        type: String,
        required: [true, 'Start is a required field']
    },
    value: {
        type: Number,
        required: [true, 'Value is a required field']
    },
    date: {
        type: Date
    },
    status: {
        type: String,
        enum: {
            values: ['allocated', 'assigned'],
            message: 'Status must be one of allocated or assigned'
        },
        required: [true, 'Status is a required field']
    }
})

module.exports = StatisticsSchema
