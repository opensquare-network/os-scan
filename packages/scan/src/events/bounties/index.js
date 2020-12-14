const { handleCancelHuntBounty } = require("./bountyHunters");
const { handleHuntBounty } = require("./bountyHunters");
const { handleAssignBounty } = require("./bountyHunters");
const { handleResign } = require("./bountyHunters");
const { safeBlocks } = require("../../utils/consants");
const { getBountyStateCollection } = require("../../mongo");
const { getApi } = require("../../api");
const { getBountyCollection } = require("../../mongo");
const { saveAccount } = require("../account");

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
    'HunterRemark',
  ].includes(method)
}

async function handleBountiesEvent(event, indexer, eventSort) {
  const { method, data } = event
  const jsonData = data.toJSON()

  // TODO: handle one business events in one block, maybe we have to add the phase of the event to db.

  if ('ApplyBounty' === method) {
    await saveNewBounty(jsonData, indexer)
  } else if ('HuntBounty' === method) {
    await handleHuntBounty(jsonData, indexer, eventSort)

    const accountId = jsonData[1]
    await saveAccount(accountId, indexer)
  } else if ('CancelHuntBounty' === method) {
    await handleCancelHuntBounty(jsonData, indexer, eventSort)
  } else if ('AssignBounty' === method) {
    await handleAssignBounty(jsonData, indexer, eventSort)
  } else if ('Resign' === method) {
    await handleResign(jsonData, indexer, eventSort)
  }

  if (isStateChange(method)) {
    await saveBountyState(method, jsonData, indexer, eventSort)
  }
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

async function saveBountyState(method, json, indexer, sort) {
  const bountyId = json['ApplyBounty' === method ? 1 : 0]

  let state
  if (method === 'HunterRemark') {
    state = 'Remarked'
  } else {
    const api = await getApi()
    state = await api.query.osBounties.bountyStateOf.at(indexer.blockHash, bountyId)
    state = state.toJSON()
  }

  const bountyStateCol = await getBountyStateCollection()
  await bountyStateCol.insertOne({
    indexer,
    sort,
    bountyId,
    state,
    data: json
  })

  // Also update the latest bounty state to bounty collection
  const bountyCol = await getBountyCollection()
  await bountyCol.updateOne({ bountyId }, {
    $set: {
      state: {
        indexer,
        sort,
        state,
        data: json
      }
    }
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
