const { handleCancelHuntBounty } = require("./bountyHunters");
const { handleHuntBounty } = require("./bountyHunters");
const { safeBlocks } = require("../../utils/consants");
const { getBountyStateCollection } = require("../../mongo");
const { getApi } = require("../../api");
const { getBountyCollection } = require("../../mongo");
const { getAccountCollection } = require("../../mongo");

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
    await saveAccount(jsonData[0])
  } else if ('HuntBounty' === method) {
    await handleHuntBounty(jsonData, indexer)
    await saveAccount(jsonData[1])
  } else if ('CancelHuntBounty' === method) {
    await handleCancelHuntBounty(jsonData, indexer)
  }

  if (isStateChange(method)) {
    await saveBountyState(method, jsonData, indexer)
  }
}

async function saveAccount(address) {
  const accountCol = await getAccountCollection()
  await accountCol.updateOne({ address }, {
    $setOnInsert: {
      address,
      type: 'sr25519',
    },
    $set: {
      balance: null
    }
  }, { upsert: true })
}

async function saveNewBounty(json, indexer) {
  const [address, bountyId] = json

  const api = await getApi()
  const meta = await api.query.osBounties.bounties.at(indexer.blockHash, bountyId)

  const bountyCol = await getBountyCollection()
  await bountyCol.insertOne({
    indexer,
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
    indexer,
    bountyId,
    state: state.toJSON(),
    data: json
  })

  // TODO: handle same business record in one height
  const records = await bountyStateCol
    .find({
      bountyId,
      'indexer.blockHeight': { $lt: indexer.blockHeight - safeBlocks }
    })
    .toArray()

  if (records.length > 1) {
    const maxSafeHeight = Math.max(...records.map(r => r.indexer.blockHeight))
    await bountyStateCol.deleteMany({ bountyId, 'indexer.blockHeight': { $lt: maxSafeHeight } })
  }
}

module.exports = {
  handleBountiesEvent
}
