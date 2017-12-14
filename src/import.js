const Curl = require('node-libcurl').Curl
const mongoose = require('mongoose')
const Promise = require('bluebird')
const moment = require('moment')
const statisticsModel = require('./models/statistics/statistics')
const headerModel = require('./models/header/header')
const Schema = mongoose.Schema;
const url = 'ftp.apnic.net/apnic/stats/apnic/delegated-apnic-latest'

let curl = new Curl()
curl.setOpt('URL', url)
curl.setOpt('FOLLOWLOCATION', true)

curl.on('end', (statusCode, body, headers) => {
    mongoose.Promise = Promise
    mongoose.connect(
        'mongodb://mongo/apnic',
        {useMongoClient: true}
    )

    mongoose.connection.on('connected', () => {
        let lines = body.split("\n")
        let count = 0
        let searches = []
        let inserts = []
        let header = null
        let oldHeader = null
        headerModel.findOne()
            .then(doc => {
                oldHeader = doc
                lines.some(line => {
                    if (line.indexOf('#') === 0) {
                        // Discard line
                    } else if (count++ === 0) {
                        header = getHeader(line)
                        if (doc && doc.serial === header.serial) {
                            console.log('Already up to date, skipping')
                            return true
                        }
                    } else if (count++ > 3) {
                        let allocation = getRow(line)
                        if (allocation) {
                            searches.push(statisticsModel.findOne(allocation)
                                .then(doc => {
                                    if (!doc) {
                                        console.log(`Inserting ${allocation.country_code} ${allocation.type}  ${allocation.start}  ${allocation.value} ${allocation.date}`)
                                        inserts.push(allocation)
                                    } else {
                                        console.log('Found, skipping')
                                    }
                                }))
                        }
                    }
                })

                Promise.all(searches)
                    .then(() => {
                        if (inserts.length) {
                            return statisticsModel.insertMany(inserts)
                        }
                        return true
                    })
                    .then(() => {
                        if (oldHeader) {
                            return headerModel.update({_id: oldHeader._id}, header)
                        } else {
                            return headerModel.create(header)
                        }
                    })
                    .then(() => mongoose.connection.close())
                    .catch(err => {
                        console.log(err)
                        mongoose.connection.close()
                    })
            })
    })
})

curl.on('error', (err, errCode) => {
    console.log(err)
    curl.close.bind(curl)
})

function getHeader(line) {
    console.log(line)
    let header = line.split('|')
    return {
        version: Number(header[0]),
        registry: header[1],
        serial: header[2],
        records: Number(header[3]),
        start_date: new Date(moment(header[4], 'YYYYMMDD').format()),
        end_date: new Date(moment(header[5], 'YYYYMMDD').format()),
        utc_offset: header[6]
    }
}

function getRow(line) {
    let row = line.split('|')
    return row.length === 7 ?
        {
            registry: row[0],
            country_code: row[1],
            type: row[2],
            start: row[3],
            value: Number(row[4]),
            date: new Date(moment(row[5], 'YYYYMMDD').format()),
            status: row[6]
        } :
        false
}

curl.perform()
