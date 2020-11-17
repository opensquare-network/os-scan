const { getEventCollection } = require("../mongo");
const { getExtrinsicCollection } = require("../mongo");
const { getBountyHuntersCollection } = require("../mongo");
const { getBountyStateCollection } = require("../mongo");
const { getBountyCollection } = require("../mongo");
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

  await deleteExtrinsicsFrom(blockHeight)
  await deleteEventsFrom(blockHeight)
  await deleteBountiesFrom(blockHeight)
  await deleteBountyStateFrom(blockHeight)
  await deleteBountyHuntersFrom(blockHeight)
}

async function deleteExtrinsicsFrom(blockHeight) {
  const col = await getExtrinsicCollection()
  await col.deleteMany({ 'indexer.blockHeight': { $gte: blockHeight } })
}

async function deleteEventsFrom(blockHeight) {
  const col = await getEventCollection()
  await col.deleteMany({ 'indexer.blockHeight': { $gte: blockHeight } })
}

async function deleteBountiesFrom(blockHeight) {
  const bountyCol = await getBountyCollection()
  await bountyCol.deleteMany({ blockHeight: { $gte: blockHeight } })
}

async function deleteBountyStateFrom(blockHeight) {
  const bountyStateCol = await getBountyStateCollection()
  await bountyStateCol.deleteMany({ blockHeight: { $gte: blockHeight } })
}

async function deleteBountyHuntersFrom(blockHeight) {
  const bountyHuntersCol = await getBountyHuntersCollection()
  await bountyHuntersCol.deleteMany({ blockHeight: { $gte: blockHeight } })
}

module.exports = {
  findNonForkHeight,
  deleteDataFrom
}
