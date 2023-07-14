const portfolioOverlap = require('../services/portfolioOverlap')
const { RESPONSE_MSG, RESPONSE_STATUS } = require('../constants/index')

const getSchemes = async (request, response) => {
  try {
    let {schemeName} = request.query
    if (!schemeName)
      throw 'Invalid Scheme Name'
    schemeName = schemeName.trim()  
    const schemes = await portfolioOverlap.getSchemes(schemeName)
    response.send({
      status: RESPONSE_STATUS.SUCCESS,
      message: RESPONSE_MSG.SUCCESS,
      result: schemes
    })
  } catch (error) {
    response.send({
      status: RESPONSE_STATUS.FAILED,
      message: error || RESPONSE_MSG.FAILED
    })
  }
}

const getPortfolioOverlap = async (request, response) => {
  try {
    let { schid1, schid2 } = request.query
    if (!schid1 || !schid2)
      throw 'Invalid schid'

    schid1 = parseInt(schid1)
    schid2 = parseInt(schid2)


    const schemeHolding = await portfolioOverlap.getPortfolioOverlap(schid1, schid2)
    response.send({
      status: RESPONSE_STATUS.SUCCESS,
      message: RESPONSE_MSG.SUCCESS,
      result: schemeHolding
    })
  } catch (error) {
    response.send({
      status: RESPONSE_STATUS.FAILED,
      message: error || RESPONSE_MSG.FAILED
    })
  }
}

module.exports = {
  getSchemes,
  getPortfolioOverlap
}
