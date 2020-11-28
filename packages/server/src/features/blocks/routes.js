const Router = require('koa-router')
const blockController = require('./block.controller')

const router = new Router()
router.get('/blocks', blockController.getBlocks)
router.get('/blocks/:heightOrHashOrId', blockController.getBlock)
router.get('/blocks/:heightOrHashOrId/extrinsics', blockController.getBlockExtrinsics)
router.get('/blocks/:heightOrHashOrId/events', blockController.getBlockEvents)

module.exports = router
