const { getApi } = require("../../api");
const { getBountyCollection } = require("../../mongo");

async function handleBountiesEvent(event, indexer) {
  const { method, data } = event
  const jsonData = data.toJSON()

  if ('ApplyBounty' === method) {
    await saveNewBounty(jsonData, indexer)
  }
}

async function saveNewBounty(json, indexer) {
  const [address, bountyId] = json

  const api = await getApi()
  const meta = await api.query.osBounties.bounties.at(indexer.blockHash, bountyId)

  const bountyCol = await getBountyCollection()
  await bountyCol.insertOne({ indexer, creator: address, bountyId, meta: meta.toJSON() })
  // FIXME: handle insertion failure
}

module.exports = {
  handleBountiesEvent
}
