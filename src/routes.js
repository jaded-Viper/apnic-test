const express = require('express')
const statisticsRoutes = require('./routes/statisticsroutes')

const router = express.Router();

router.route('/').get((req, res) => {
    res.json({message: 'Welcome to the APNIC API'});
})

router.use('/statistics', statisticsRoutes)

module.exports = router
