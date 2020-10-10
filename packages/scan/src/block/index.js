const { getApi } = require("../api");
const extractAuthor = require('./extractAuthor')
const extractBlockTime = require('./extractBlockTime')
const { getBlockCollection } = require("../mongo");

async function handleBlock(blockHash) {
  const api = await getApi()

  // const validators = await api.query.session.validators.at(blockHash)

  const block = await api.rpc.chain.getBlock(blockHash)
  // const author = extractAuthor(validators, block.block.header)

  await extractBlockData(block.block)
}

async function extractBlockData(block) {
  const hash = block.hash.toHex()
  const blockJson = block.toJSON()

  const blockTime = extractBlockTime(block.extrinsics)
  await saveBlock(hash, blockTime, blockJson)

  // const blockHeight = block.header.number.toNumber()
  // const blockIndexer = { blockHeight, blockHash: hash, blockTime }
  // const api = await getApi()
}

async function saveBlock(hash, blockTime, blockJson) {
  const blockCol = await getBlockCollection()
  const result = await blockCol.insertOne({
    hash,
    blockTime,
    ...blockJson
  })

  if (result.result && !result.result.ok) {
    // TODO: Handle insertion failed
  }
}

module.exports = {
  handleBlock
}
