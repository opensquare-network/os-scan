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

  let {
    hunters,
    assignee,
    funderRemark,
    hunterRemark,
  } = (records.length > 0
        ? records[0]
        : {
            hunters: [],
            assignee: null,
            funderRemark: null,
            hunterRemark: null,
          })

  hunters = [...hunters, { accountId, indexer }]
  await saveBountyHunters({ bountyId, hunters, assignee, funderRemark, hunterRemark, indexer, sort })
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

  let {
    hunters,
    assignee,
    funderRemark,
    hunterRemark,
  } = records[0]

  hunters = hunters.filter(hunter => hunter.accountId !== accountId)
  await saveBountyHunters({ bountyId, hunters, assignee, funderRemark, hunterRemark, indexer, sort })
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

  let {
    hunters,
    assignee,
    funderRemark,
    hunterRemark,
  } = records[0]

  assignee = {
    accountId,
    indexer,
  }
  await saveBountyHunters({ bountyId, hunters, assignee, funderRemark, hunterRemark, indexer, sort })
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

  let {
    hunters,
    assignee,
    funderRemark,
    hunterRemark,
  } = records[0]

  hunters = hunters.filter(hunter => hunter.accountId !== accountId)
  assignee = null
  await saveBountyHunters({ bountyId, hunters, assignee, funderRemark, hunterRemark, indexer, sort })
}

async function handleFunderRemark(json, indexer, sort) {
  const [bountyId, hunter, remark] = json
  const bountyHuntersCol = await getBountyHuntersCollection()
  const records = await bountyHuntersCol
    .find({ bountyId })
    .sort({ 'indexer.blockHeight': -1, sort: -1 })
    .limit(1)
    .toArray()

  if (records.length <= 0) {
    return
  }

  let {
    hunters,
    assignee,
    funderRemark,
    hunterRemark,
  } = records[0]

  funderRemark = {
    hunter,
    remark,
    indexer,
  }
  await saveBountyHunters({ bountyId, hunters, assignee, funderRemark, hunterRemark, indexer, sort })
}

async function handleHunterRemark(json, indexer, sort) {
  const [bountyId, funder, remark] = json
  const bountyHuntersCol = await getBountyHuntersCollection()
  const records = await bountyHuntersCol
    .find({ bountyId })
    .sort({ 'indexer.blockHeight': -1, sort: -1 })
    .limit(1)
    .toArray()

  if (records.length <= 0) {
    return
  }

  let {
    hunters,
    assignee,
    funderRemark,
    hunterRemark,
  } = records[0]

  hunterRemark = {
    funder,
    remark,
    indexer,
  }
  await saveBountyHunters({ bountyId, hunters, assignee, funderRemark, hunterRemark, indexer, sort })
}

async function saveBountyHunters({ bountyId, hunters, assignee, funderRemark, hunterRemark, indexer, sort }) {
  const bountyHuntersCol = await getBountyHuntersCollection()
  await bountyHuntersCol.insertOne({
    indexer,
    sort,
    bountyId,
    hunters,
    assignee,
    funderRemark,
    hunterRemark,
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
        funderRemark,
        hunterRemark,
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
  handleFunderRemark,
  handleHunterRemark,
}
