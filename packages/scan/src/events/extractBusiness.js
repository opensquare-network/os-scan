const { handleBountiesEvent } = require("./bounties");
const { sections } = require("../utils/consants");

async function extractEventBusinessData(event, indexer) {
  const { section } = event

  if (sections.bounties === section) {
    await handleBountiesEvent(event, indexer)
  }
}

module.exports = {
  extractEventBusinessData
}
