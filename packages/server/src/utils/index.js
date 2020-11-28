const httpUtils = require('./http')
const BigNumber = require('bignumber.js')

function isMongoId(str = '') {
  return /^[\da-fA-F]{24}$/.test(str)
}

function ensure0xPrefix(str = '') {
  if (!str.startsWith('0x')) {
    return `0x${str}`
  }
  return str
}

function isHash(str = '') {
  const normalized = ensure0xPrefix(str)
  return /^(0x)?[\da-fA-F]{64}$/.test(normalized)
}

function isNum(str = null) {
  return str !== null && /^\d+$/.test(str)
}

function safeAdd(...items) {
  return items.reduce((result, item) => {
    return new BigNumber(result).plus(item).toString()
  }, 0)
}

module.exports = {
  isMongoId,
  isHash,
  isNum,
  ensure0xPrefix,
  safeAdd,
  ...httpUtils,
}

