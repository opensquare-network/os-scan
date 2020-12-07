const {
  getAccountCollection,
} = require("../../mongo");

async function saveAccount(address, indexer) {
  const accountCol = await getAccountCollection()
  await accountCol.updateOne({ address }, {
    $setOnInsert: {
      indexer,
      address,
      type: 'sr25519',
    }
  }, { upsert: true })
}

module.exports = {
  saveAccount,
}
