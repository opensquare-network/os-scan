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
  await bountyCol.deleteMany({ 'indexer.blockHeight': { $gte: blockHeight } })
}

async function deleteBountyStateFrom(blockHeight) {
  const bountyStateCol = await getBountyStateCollection()

  // Remember the affected bounties
  const affectedBounties = await bountyStateCol.distinct('bountyId', { 'indexer.blockHeight': { $gte: blockHeight } })
  // Then we do rollback
  await bountyStateCol.deleteMany({ 'indexer.blockHeight': { $gte: blockHeight } })
  // Update bounty state for affected bounties after deletion
  const bountyCol = await getBountyCollection()
  for (let bountyId of affectedBounties) {
    const state = await bountyStateCol.findOne({ bountyId }, {
      sort: [['indexer.blockHeight', -1], ['sort', -1]],
      projection: { _id: 0, bountyId: 0 }
    })
    await bountyCol.updateOne({ bountyId }, { $set: { state } })
  }
}

async function deleteBountyHuntersFrom(blockHeight) {
  const bountyHuntersCol = await getBountyHuntersCollection()

  // Remember the affected bounties
  const affectedBounties = await bountyHuntersCol.distinct('bountyId', { 'indexer.blockHeight': { $gte: blockHeight } })
  // Then we do rollback
  await bountyHuntersCol.deleteMany({ 'indexer.blockHeight': { $gte: blockHeight } })
  // Update bounty state for affected bounties after deletion
  const bountyCol = await getBountyCollection()
  for (let bountyId of affectedBounties) {
    const hunters = await bountyHuntersCol.findOne({ bountyId }, {
      sort: [['indexer.blockHeight', -1], ['sort', -1]],
      projection: { _id: 0, bountyId: 0 }
    })
    await bountyCol.updateOne({ bountyId }, { $set: { hunters } })
  }
}

module.exports = {
  findNonForkHeight,
  deleteDataFrom
}
