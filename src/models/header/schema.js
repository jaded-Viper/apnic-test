const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const HeaderSchema = new Schema({
    version: {
        type: Number,
        required: [true, 'Version is a required field']
    },
    registry: {
        type: String,
        required: [true, 'Registry is required']
    },
    serial: {
        type: String,
        required: [true, 'Serial is a required field']
    },
    records: {
        type: Number,
        required: [true, 'Records is a required field']
    },
    start_date: {
        type: Date,
        required: [true, 'Start date is a required field']
    },
    end_date: {
        type: Date,
        required: [true, 'End date is a required field']
    },
    utc_offset: {
        type: String,
        required: [true, 'UTC offset is a required field']
    }
})

module.exports = HeaderSchema
