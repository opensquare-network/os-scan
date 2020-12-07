let latestBlocks = []
let latestExtrinsics = []
let latestStatistics = {
  totalAccounts: 0,
  totalExtrinsics: 0,
  totalBounties: 0,
  totalBountiesApplying: 0,
  totalBountiesResolved: 0,
}

function setLatestBlocks(blocks) {
  latestBlocks = blocks
}

function getLatestBlocks() {
  return latestBlocks
}

function setLatestExtrinsics(extrinsics) {
  latestExtrinsics = extrinsics
}

function getLatestExtrinsics() {
  return latestExtrinsics
}

function setLatestStatistics(statistics) {
  latestStatistics = statistics
}

function getLatestStatistics() {
  return latestStatistics
}

module.exports = {
  setLatestBlocks,
  getLatestBlocks,
  setLatestExtrinsics,
  getLatestExtrinsics,
  setLatestStatistics,
  getLatestStatistics,
}
