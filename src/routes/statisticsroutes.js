const express = require('express')
const statisticsController = require('../controllers/statisticscontroller')

const router = express.Router()

router.get('/:economy/:resource/:year', (req, res, next) => statisticsController.getStatistics(req, res, next))

module.exports = router
