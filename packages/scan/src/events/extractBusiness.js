const { handleBountiesEvent } = require("./bounties");
const { handleBalanceEvent, handleCurrenciesEvent } = require("./balance");
const { sections } = require("../utils/consants");

async function extractEventBusinessData(event, indexer) {
  const { section } = event

  if (sections.bounties === section) {
    await handleBountiesEvent(event, indexer)
  } else if (sections.balance === section) {
    await handleBalanceEvent(event, indexer)
  } else if (sections.currencies === section) {
    await handleCurrenciesEvent(event, indexer)
  }
}

module.exports = {
  extractEventBusinessData
}
