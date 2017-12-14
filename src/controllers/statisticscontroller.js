const Controller = require('./controller')
const StatisticsModel = require('../models/statistics/statistics')
const moment = require('moment')
const extend = require('lodash').extend


class StatisticsController extends Controller {
    constructor() {
        super(StatisticsModel)
        this.projection = extend(this.projection, {password: false})
    }
///:economy/:resource/:year
    getStatistics(req, res, next) {
        let start = moment(req.params.year, 'YYYY').startOf('year')
        let end = start.clone().endOf('year')

        let query = [
            {
                $match : {
                    country_code: req.params.economy,
                    type: req.params.resource,
                    date: {
                        $gte: new Date(start.format()),
                        $lte: new Date(end.format())
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    total: {$sum: "$value"}
                }
            }
        ];
        this.model.aggregate(query)
            .then(docs => this.response(res, 200, {Economy: req.params.economy, Resource: req.params.resource, Year: req.params.year, Total: docs[0].total}))
    }
}

module.exports = new StatisticsController()
