const { getBlockCollection } = require("../mongo");
const { getApi } = require("../api");

async function findNonForkHeight(nowHeight) {
  const api = await getApi()

  let trialHeight = nowHeight
  let blockInDb = null
  let chainHash = null

  do {
    trialHeight -= 1
    const blockCol = await getBlockCollection()
    blockInDb = await blockCol.findOne({ 'header.number': trialHeight })
    chainHash = await api.rpc.chain.getBlockHash(trialHeight)
  } while (blockInDb.hash !== chainHash.toString())

  return trialHeight
}

async function deleteDataFrom(blockHeight) {
  const blockCol = await getBlockCollection()
  await blockCol.deleteMany({ 'header.number': { $gte: blockHeight } })
}

module.exports = {
  findNonForkHeight,
  deleteDataFrom
}
