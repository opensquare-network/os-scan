const { getApi } = require("../../api");
const { saveAccount } = require('../account');
const {
  getAccountCollection,
  getAccountBalanceCollection,
} = require("../../mongo");

async function handleBalanceEvent(event, indexer, sort) {
  const { method, data } = event
  const jsonData = data.toJSON()

  if (method === 'Reserved') {
    const [accountId, balance] = jsonData
    await saveAccount(accountId, indexer)
    await saveAccountBalance(accountId, indexer, sort)
  } else if (method === 'ReserveRepatriated') {
    const [accountId1, accountId2, balance] = jsonData
    await saveAccount(accountId1, indexer)
    await saveAccountBalance(accountId1, indexer, sort)
    await saveAccount(accountId2, indexer)
    await saveAccountBalance(accountId2, indexer, sort)
  }
}

async function handleCurrenciesEvent(event, indexer, sort) {
  const { method, data } = event
  const jsonData = data.toJSON()

  if (method === 'Transferred') {
    const [currencyId, accountId1, accountId2, balance] = jsonData
    await saveAccount(accountId1, indexer)
    await saveAccountBalance(accountId1, indexer, sort)
    await saveAccount(accountId2, indexer)
    await saveAccountBalance(accountId2, indexer, sort)
  }
}

async function saveAccountBalance(address, indexer, sort) {
  const api = await getApi()
  let { data } = await api.query.system.account(address);
  const balance = data.toJSON()

  const accountBalanceCol = await getAccountBalanceCollection()
  await accountBalanceCol.insertOne({
    indexer,
    sort,
    address,
    balance,
  })

  const accountCol = await getAccountCollection()
  await accountCol.updateOne({ address }, {
    $set: {
      balance,
    }
  })

}

module.exports = {
  handleBalanceEvent,
  handleCurrenciesEvent,
}
