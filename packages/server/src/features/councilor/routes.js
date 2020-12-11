const Router = require('koa-router')
const councilorController = require('./councilor.controller')

const router = new Router()
router.get('/councilor/pendingapprove', councilorController.getPendingApproveBounties)

module.exports = router
