const { getApi } = require("../../api");
const { getAccountCollection } = require("../../mongo");


async function handleBalanceEvent(event, indexer) {
  const { method, data } = event
  const jsonData = data.toJSON()

  if (method === 'Reserved') {
    const [accountId, balance] = jsonData
    await saveAccount(accountId)
  } else if (method === 'ReserveRepatriated') {
    const [accountId1, accountId2, balance] = jsonData
    await saveAccount(accountId1)
    await saveAccount(accountId2)
  }
}

async function handleCurrenciesEvent(event, indexer) {
  const { method, data } = event
  const jsonData = data.toJSON()

  if (method === 'Transferred') {
    const [currencyId, accountId1, accountId2, balance] = jsonData
    await saveAccount(accountId1)
    await saveAccount(accountId2)
  }
}

async function saveAccount(address) {
  const api = await getApi()
  let { data } = await api.query.system.account(address);

  const accountCol = await getAccountCollection()
  await accountCol.updateOne({ address }, {
    $setOnInsert: {
      address,
      type: 'sr25519',
    },
    $set: {
      balance: data.toJSON()
    }
  }, { upsert: true })
}

module.exports = {
  handleBalanceEvent,
  handleCurrenciesEvent,
}
