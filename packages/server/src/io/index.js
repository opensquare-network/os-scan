const { feedLatestExtrinsics } = require("./latestExtrinsic");
const { feedLatestBlocks } = require("./latestBlock");
const { feedLatestStatistics } = require("./latestStatistics");
const { getLatestExtrinsics } = require("./store");
const { latestExtrinsicsRoom } = require("./constant");
const { getLatestBlocks } = require("./store");
const { latestBlocksRoom } = require("./constant");
const { getLatestStatistics } = require("./store");
const { latestStatisticsRoom } = require("./constant");

async function listenAndEmitInfo(io) {
  io.on('connection', socket => {
    socket.on('subscribe', room => {
      if (room === latestBlocksRoom) {
        const blocks = getLatestBlocks()
        socket.emit('latestBlocks', blocks)
      }
      if (room === latestExtrinsicsRoom) {
        const extrinsics = getLatestExtrinsics()
        socket.emit('latestExtrinsics', extrinsics)
      }
      if (room === latestStatisticsRoom) {
        const statistics = getLatestStatistics()
        socket.emit('latestStatistics', statistics)
      }
      socket.join(room)
    })
    socket.on('unsubscribe', room => {
      socket.leave(room)
    })
  })

  await feedLatestBlocks(io)
  await feedLatestExtrinsics(io)
  await feedLatestStatistics(io)
}

module.exports = {
  listenAndEmitInfo
}
