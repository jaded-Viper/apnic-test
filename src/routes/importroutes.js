const express = require('express')
const statisticsController = require('../controllers/statisticscontroller')

const router = express.Router()

router.get('/', (req, res, next) => statisticsController.importStatistics(req, res, next))

module.exports = router
