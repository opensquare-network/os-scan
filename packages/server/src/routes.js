const featureRouters = [
  require('./features/blocks/routes'),
  require('./features/extrinsics/routes'),
  require('./features/events/routes'),
  require('./features/bounties/routes'),
]

module.exports = app => {
  for (const router of featureRouters) {
    app.use(router.routes()).use(router.allowedMethods({ throw: true }))
  }
}
