const Router = require('koa-router')
const router = new Router()

const bountyController = require('./bounty.controller')

router.get('/bounties', bountyController.getBounties)
router.get('/bounties/huntable', bountyController.getHuntableBounties)
router.get('/bounties/:bountyId', bountyController.getBounty)
router.get('/bounties/:bountyId/hunters', bountyController.getBountyHunters)

module.exports = router
