const { getApi } = require("../../api");
const { saveAccount } = require('../account');
const {
  getAccountCollection,
  getAccountReputationCollection,
} = require("../../mongo");

async function handleReputationEvent(event, indexer, sort) {
  const { method, data } = event
  const jsonData = data.toJSON()

  if (method === 'ReputationAdded') {
    const [address, reputation] = jsonData
    await saveAccount(address, indexer)
    await saveAccountReputation(address, indexer, sort)
  }
}

async function saveAccountReputation(address, indexer, sort) {
  const api = await getApi()
  let reputation = await api.query.osReputation.behaviorScore.at(indexer.blockHash, address);

  const accountReputationsCol = await getAccountReputationCollection()
  await accountReputationsCol.insertOne({
    indexer,
    sort,
    address,
    reputation: reputation.toNumber(),
  })

  const accountCol = await getAccountCollection()
  await accountCol.updateOne({ address }, {
    $set: {
      reputation: reputation.toNumber(),
    }
  })
}

module.exports = {
  handleReputationEvent,
}
