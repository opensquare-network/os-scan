const extractBlockTime = require('./extractBlockTime')
const { getBlockCollection } = require("../mongo");

async function handleBlock(block) {
  // TODO: extract author from the block info
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
