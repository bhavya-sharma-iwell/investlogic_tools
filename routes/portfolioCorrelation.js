const express = require('express')
const router = express.Router()
const controller = require('../controllers/portfolioCorrelation')

router.get('/getSchemes', controller.getSchemes)
router.get('/createCorrelationMatrix', controller.createCorrelationMatrix)
router.get('/getLaunchDate', controller.getLaunchDate)
module.exports = router