const { handleCancelHuntBounty } = require("./bountyHunters");
const { handleHuntBounty } = require("./bountyHunters");
const { safeBlocks } = require("../../utils/consants");
const { getBountyStateCollection } = require("../../mongo");
const { getApi } = require("../../api");
const { getBountyCollection } = require("../../mongo");

function isStateChange(method) {
  return [
    'ApplyBounty',
    'Accept',
    'Reject',
    'Close',
    'ForceClosed',
    'AssignBounty',
    'Submit',
    'Resign',
    'Resolve',
  ].includes(method)
}

async function handleBountiesEvent(event, indexer) {
  const { method, data } = event
  const jsonData = data.toJSON()

  // TODO: handle one business events in one block, maybe we have to add the phase of the event to db.

  if ('ApplyBounty' === method) {
    await saveNewBounty(jsonData, indexer)
  } else if ('HuntBounty' === method) {
    await handleHuntBounty(jsonData, indexer)
  } else if ('CancelHuntBounty' === method) {
    await handleCancelHuntBounty(jsonData, indexer)
  }

  if (isStateChange(method)) {
    await saveBountyState(method, jsonData, indexer)
  }
}

async function saveNewBounty(json, indexer) {
  const [address, bountyId] = json

  const api = await getApi()
  const meta = await api.query.osBounties.bounties.at(indexer.blockHash, bountyId)

  const bountyCol = await getBountyCollection()
  await bountyCol.insertOne({
    blockHeight: indexer.blockHeight,
    creator: address,
    bountyId,
    meta: meta.toJSON()
  })
  // FIXME: handle insertion failure
}

async function saveBountyState(method, json, indexer) {
  const bountyId = json['ApplyBounty' === method ? 1 : 0]

  const api = await getApi()
  const state = await api.query.osBounties.bountyStateOf.at(indexer.blockHash, bountyId)

  const bountyStateCol = await getBountyStateCollection()
  await bountyStateCol.insertOne({
    blockHeight: indexer.blockHeight,
    bountyId,
    state: state.toJSON(),
    data: json
  })

  // TODO: handle same business record in one height
  const records = await bountyStateCol
    .find({
      bountyId,
      blockHeight: { $lt: indexer.blockHeight - safeBlocks }
    })
    .toArray()

  if (records.length > 1) {
    const maxSafeHeight = Math.max(...records.map(r => r.blockHeight))
    await bountyStateCol.deleteMany({ blockHeight: { $lt: maxSafeHeight } })
  }
}

module.exports = {
  handleBountiesEvent
}
