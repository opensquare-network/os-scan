const BigNumber = require('bignumber.js')

function extractExtrinsicEvents(events, extrinsicIndex) {
  return events.filter(event => {
    const { phase } = event
    return !phase.isNull && phase.value.toNumber() === extrinsicIndex
  })
}

function isExtrinsicSuccess(events) {
  return events.some(e => e.event.method === 'ExtrinsicSuccess')
}

function normalizeAmount(raw = 0) {
  return new BigNumber(raw).toString()
}

module.exports = {
  isExtrinsicSuccess,
  extractExtrinsicEvents,
  normalizeAmount
}
