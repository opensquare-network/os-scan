const { feedLatestBlocks } = require("./latestBlock");
const { getLatestExtrinsics } = require("./store");
const { latestExtrinsicsRoom } = require("./constant");
const { getLatestBlocks } = require("./store");
const { latestBlocksRoom } = require("./constant");

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
      socket.join(room)
    })
    socket.on('unsubscribe', room => {
      socket.leave(room)
    })
  })

  await feedLatestBlocks(io)
}

module.exports = {
  listenAndEmitInfo
}
