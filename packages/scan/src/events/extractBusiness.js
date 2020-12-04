const { handleBountiesEvent } = require("./bounties");
const { handleBalanceEvent, handleCurrenciesEvent } = require("./balance");
const { sections } = require("../utils/consants");

async function extractEventBusinessData(event, indexer, eventSort) {
  const { section } = event

  if (sections.bounties === section) {
    await handleBountiesEvent(event, indexer, eventSort)
  } else if (sections.balances === section) {
    await handleBalanceEvent(event, indexer)
  } else if (sections.currencies === section) {
    await handleCurrenciesEvent(event, indexer)
  }
}

module.exports = {
  extractEventBusinessData
}
