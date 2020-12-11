const Router = require('koa-router')
const accountController = require('./account.controller')

const router = new Router()

// API for Explorer
router.get('/accounts', accountController.getAccounts)
router.get('/accounts/:address', accountController.getAccount)
router.get('/accounts/:address/extrinsics', accountController.getAccountExtrinsics)
router.get('/accounts/:address/fundbounties', accountController.getFundBounties)
router.get('/accounts/:address/huntbounties', accountController.getHuntBounties)

// APIs for Dapp Account Profile
router.get('/accounts/:address/applyingbounties', accountController.getApplyingBounties)
router.get('/accounts/:address/assignedbounties', accountController.getAssignedBounties)
router.get('/accounts/:address/behaviors', accountController.getBehaviors)
router.get('/accounts/:address/pendingapprove', accountController.getPendingApproveBounties)
router.get('/accounts/:address/examinedbounties', accountController.getExaminedBounties)

router.get('/accounts/:address/applyingbountiescount', accountController.getApplyingBountiesCount)
router.get('/accounts/:address/assignedbountiescount', accountController.getAssignedBountiesCount)
router.get('/accounts/:address/behaviorscount', accountController.getBehaviorsCount)
router.get('/accounts/:address/pendingapprovecount', accountController.getPendingApproveBountiesCount)
router.get('/accounts/:address/examinedbountiescount', accountController.getExaminedBountiesCount)

module.exports = router
