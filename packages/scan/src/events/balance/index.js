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
    const [from, to, balance] = jsonData
    await saveAccount(from, indexer)
    await saveAccountBalance(from, indexer, sort)
    await saveAccount(to, indexer)
    await saveAccountBalance(to, indexer, sort)
  }
}

async function handleCurrenciesEvent(event, indexer, sort) {
  const { method, data } = event
  const jsonData = data.toJSON()

  if (method === 'Transferred') {
    const [currencyId, from, to, balance] = jsonData
    await saveAccount(from, indexer)
    await saveAccountBalance(from, indexer, sort)
    await saveAccount(to, indexer)
    await saveAccountBalance(to, indexer, sort)
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
