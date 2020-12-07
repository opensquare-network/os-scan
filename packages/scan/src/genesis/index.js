const { saveAccountBalance } = require("../events/balance");
const { saveAccount } = require("../events/account");
const { accounts } = require('./accounts')

async function initGenesisData(blockIndexer) {
  for (const account of accounts) {
    await saveAccount(account, blockIndexer)
    await saveAccountBalance(account, blockIndexer, 0)
  }
}

module.exports = {
  initGenesisData
}
