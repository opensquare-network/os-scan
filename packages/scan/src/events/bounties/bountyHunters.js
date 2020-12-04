const { safeBlocks } = require("../../utils/consants");
const { getBountyHuntersCollection, getBountyCollection } = require("../../mongo");

async function handleHuntBounty(json, indexer, sort) {
  const [bountyId, accountId] = json
  const bountyHuntersCol = await getBountyHuntersCollection()

  const records = await bountyHuntersCol
    .find({ bountyId })
    .sort({ 'indexer.blockHeight': -1, sort: -1 })
    .limit(1)
    .toArray()
  let hunters = records.length > 0 ? [...records[0].hunters, { accountId, indexer }] : [{ accountId, indexer }]
  let assignee = records.length > 0 ? records[0].assignee : null
  await saveBountyHunters(bountyId, hunters, assignee, indexer, sort)
}

async function handleCancelHuntBounty(json, indexer, sort) {
  const [bountyId, accountId] = json
  const bountyHuntersCol = await getBountyHuntersCollection()
  const records = await bountyHuntersCol
    .find({ bountyId })
    .sort({ 'indexer.blockHeight': -1, sort: -1 })
    .limit(1)
    .toArray()


  if (records.length <= 0) {
    return
  }

  let hunters = records[0].hunters.filter(hunter => hunter.accountId !== accountId)
  let assignee = records[0].assignee
  await saveBountyHunters(bountyId, hunters, assignee, indexer, sort)
}

async function handleAssignBounty(json, indexer, sort) {
  const [bountyId, accountId] = json
  const bountyHuntersCol = await getBountyHuntersCollection()
  const records = await bountyHuntersCol
    .find({ bountyId })
    .sort({ 'indexer.blockHeight': -1, sort: -1 })
    .limit(1)
    .toArray()

  if (records.length <= 0) {
    return
  }

  let hunters = records[0].hunters
  let assignee = {
    accountId,
    indexer,
  }
  await saveBountyHunters(bountyId, hunters, assignee, indexer, sort)
}

async function handleResign(json, indexer, sort) {
  const [bountyId, accountId] = json
  const bountyHuntersCol = await getBountyHuntersCollection()
  const records = await bountyHuntersCol
    .find({ bountyId })
    .sort({ 'indexer.blockHeight': -1, sort: -1 })
    .limit(1)
    .toArray()

  if (records.length <= 0) {
    return
  }

  let hunters = records[0].hunters.filter(hunter => hunter.accountId !== accountId)
  let assignee = null
  await saveBountyHunters(bountyId, hunters, assignee, indexer, sort)
}

async function saveBountyHunters(bountyId, hunters, assignee, indexer, sort) {
  const bountyHuntersCol = await getBountyHuntersCollection()
  await bountyHuntersCol.insertOne({
    indexer,
    sort,
    bountyId,
    hunters,
    assignee,
  })

  // Also update the latest bounty hunters to bounty collection
  const bountyCol = await getBountyCollection()
  await bountyCol.updateOne({ bountyId }, {
    $set: {
      hunters: {
        indexer,
        sort,
        hunters,
        assignee,
      }
    }
  })

  await removeUselessHistoryRecords(bountyId, indexer)
}

async function removeUselessHistoryRecords(bountyId, indexer) {
  const bountyHuntersCol = await getBountyHuntersCollection()

  const historyRecords = await bountyHuntersCol
    .find({
      bountyId,
      'indexer.blockHeight': { $lt: indexer.blockHeight - safeBlocks }
    })
    .toArray()

  if (historyRecords.length > 1) {
    const maxSafeHeight = Math.max(...historyRecords.map(r => r.indexer.blockHeight))
    await bountyHuntersCol.deleteMany({ bountyId, 'indexer.blockHeight': { $lt: maxSafeHeight } })
  }
}

module.exports = {
  handleHuntBounty,
  handleCancelHuntBounty,
  handleAssignBounty,
  handleResign,
}
