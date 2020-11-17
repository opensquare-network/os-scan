const { safeBlocks } = require("../../utils/consants");
const { getBountyHuntersCollection } = require("../../mongo");

async function handleHuntBounty(json, indexer) {
  const [bountyId, accountId] = json
  const bountyHuntersCol = await getBountyHuntersCollection()

  const records = await bountyHuntersCol.find({ bountyId }).sort({ blockHeight: -1 }).limit(1).toArray()
  let hunters = records.length > 0 ? [...records[0].hunters, accountId] : [accountId]
  await bountyHuntersCol.insertOne({
    blockHeight: indexer.blockHeight,
    bountyId,
    hunters
  })

  await removeUselessHistoryRecords(bountyId, indexer)
}

async function handleCancelHuntBounty(json, indexer) {
  const [bountyId, accountId] = json
  const bountyHuntersCol = await getBountyHuntersCollection()
  const records = await bountyHuntersCol.find({ bountyId }).sort({ blockHeight: -1 }).limit(1).toArray()

  if (records.length <= 0) {
    return
  }

  let hunters = records[0].hunters.filter(hunter => hunter !== accountId)
  await bountyHuntersCol.insertOne({
    blockHeight: indexer.blockHeight,
    bountyId,
    hunters
  })

  await removeUselessHistoryRecords(bountyId, indexer)
}

async function removeUselessHistoryRecords(bountyId, indexer) {
  const bountyHuntersCol = await getBountyHuntersCollection()

  const historyRecords = await bountyHuntersCol
    .find({
      bountyId,
      blockHeight: { $lt: indexer.blockHeight - safeBlocks }
    })
    .toArray()

  if (historyRecords.length > 1) {
    const maxSafeHeight = Math.max(...historyRecords.map(r => r.blockHeight))
    await bountyHuntersCol.deleteMany({ blockHeight: { $lt: maxSafeHeight } })
  }
}

module.exports = {
  handleHuntBounty,
  handleCancelHuntBounty
}
