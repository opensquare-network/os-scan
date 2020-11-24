const { FEED_INTERVAL } = require('./constant')
const { setLatestExtrinsics } = require('./store')
const { latestExtrinsicsRoom } = require('./constant')
const { getExtrinsicCollection } = require('../mongo')

const extrinsicSize = 10

async function feedLatestExtrinsics(io) {
  try {
    const col = await getExtrinsicCollection()
    const extrinsics = await col
      .find({ section: { $ne: 'timestamp' } })
      .sort({ 'indexer.blockHeight': -1, 'indexer.index': -1 })
      .limit(extrinsicSize)
      .toArray()

    const simpleExtrinsics = extrinsics.map(
      ({ indexer, signer, hash, section, name }) => {
        return {
          indexer,
          signer,
          hash,
          section,
          name
        }
      }
    )

    if (simpleExtrinsics.length > 0) {
      io.to(latestExtrinsicsRoom).emit('latestExtrinsics', simpleExtrinsics)
      setLatestExtrinsics(simpleExtrinsics)
    }
  } catch (e) {
    console.error(e)
  } finally {
    setTimeout(feedLatestExtrinsics.bind(null, io), FEED_INTERVAL)
  }
}

module.exports = {
  feedLatestExtrinsics
}
