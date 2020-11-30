const Router = require('koa-router')
const router = new Router()

const bountyController = require('./bounty.controller')

router.get('/bounties', bountyController.getBounties)
router.get('/bounties/:bountyId', bountyController.getBounty)

module.exports = router
