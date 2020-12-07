const { getEventCollection } = require("../mongo");
const { getExtrinsicCollection } = require("../mongo");
const { getBountyHuntersCollection } = require("../mongo");
const { getBountyStateCollection } = require("../mongo");
const { getBountyCollection } = require("../mongo");
const { getBlockCollection } = require("../mongo");
const {
  getAccountCollection,
  getAccountBalanceCollection,
  getAccountReputationCollection,
} = require("../mongo");
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
  await deleteAccountsFrom(blockHeight)
  await deleteAccountBalanceFrom(blockHeight)
  await deleteAccountReputationFrom(blockHeight)
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

async function deleteAccountsFrom(blockHeight) {
  const accountCol = await getAccountCollection()
  await accountCol.deleteMany({ 'indexer.blockHeight': { $gte: blockHeight } })
}

async function deleteAccountBalanceFrom(blockHeight) {
  const accountBalanceCol = await getAccountBalanceCollection()

  // Remember the affected accounts
  const affectedAddresses = await accountBalanceCol.distinct('address', { 'indexer.blockHeight': { $gte: blockHeight } })
  // Then we do rollback
  await accountBalanceCol.deleteMany({ 'indexer.blockHeight': { $gte: blockHeight } })
  // Update state for affected accounts after deletion
  const accountCol = await getAccountCollection()
  for (let address of affectedAddresses) {
    const accountBalance = await accountBalanceCol.findOne({ address }, {
      sort: [['indexer.blockHeight', -1], ['sort', -1]],
    })
    let balance = accountBalance && accountBalance.balance || null
    await accountCol.updateOne({ address }, { $set: { balance } })
  }
}

async function deleteAccountReputationFrom(blockHeight) {
  const accountReputationCol = await getAccountReputationCollection()

  // Remember the affected accounts
  const affectedAddresses = await accountReputationCol.distinct('address', { 'indexer.blockHeight': { $gte: blockHeight } })
  // Then we do rollback
  await accountReputationCol.deleteMany({ 'indexer.blockHeight': { $gte: blockHeight } })
  // Update state for affected accounts after deletion
  const accountCol = await getAccountCollection()
  for (let address of affectedAddresses) {
    const accountReputation = await accountReputationCol.findOne({ address }, {
      sort: [['indexer.blockHeight', -1], ['sort', -1]],
    })
    let reputation = accountReputation && accountReputation.reputation || null
    await accountCol.updateOne({ address }, { $set: { reputation } })
  }
}

module.exports = {
  findNonForkHeight,
  deleteDataFrom
}
