const Router = require('koa-router')
const accountController = require('./account.controller')

const router = new Router()
router.get('/accounts', accountController.getAccounts)
router.get('/accounts/:address', accountController.getAccount)
router.get('/accounts/:address/extrinsics', accountController.getAccountExtrinsics)
router.get('/accounts/:address/fundbounties', accountController.getFundBounties)
router.get('/accounts/:address/huntbounties', accountController.getHuntBounties)

module.exports = router
