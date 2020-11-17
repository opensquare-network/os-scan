const { handleExtrinsics } = require("./extrinsic");
const { handleEvents } = require("./events");
const { getBlockIndexer } = require("./block/getBlockIndexer");
const { deleteDataFrom } = require("./rollback");
const { findNonForkHeight } = require("./rollback");
const { handleBlock } = require("./block");
const { updateScanHeight } = require("./mongo/scanHeight");
const { sleep } = require("./utils/sleep");
const { getLatestHeight } = require("./chain/latestHead");
const { getFirstScanHeight } = require("./mongo/scanHeight");
const { getApi, disconnect } = require('./api/index')
const { updateHeight } = require('./chain/latestHead')

let preBlockHash = null

async function main() {
  const api = await getApi()
  await updateHeight()
  let scanHeight = await getFirstScanHeight()
  await deleteDataFrom(scanHeight)

  while (true) {
    const chainHeight = getLatestHeight()
    if (scanHeight > chainHeight) {
      // Just wait if the to scan height greater than current chain height
      await sleep(1000)
      continue
    }

    let blockHash
    try {
      blockHash = await api.rpc.chain.getBlockHash(scanHeight)
    } catch (e) {
      console.log(e.message)
      await sleep(1000)
      continue
    }

    if (!blockHash) {
      // Expect not happen
      await sleep(1000)
      continue
    }

    const block = await api.rpc.chain.getBlock(blockHash)
    if (
      preBlockHash &&
      block.block.header.parentHash.toString('hex') !== preBlockHash
    ) {
      // There is a fork, and we have to rollback
      const nonForkHeight = await findNonForkHeight(scanHeight)
      await updateScanHeight(nonForkHeight)
      scanHeight = nonForkHeight + 1
      preBlockHash = null
      await deleteDataFrom(scanHeight)
      continue
    }

    await handleBlock(block)
    preBlockHash = block.block.hash.toHex()
    console.log(`block ${(block.block.header.number.toNumber())} is saved to db`)

    const blockIndexer = getBlockIndexer(block.block)
    const allEvents = await api.query.system.events.at(blockHash)
    await handleEvents(allEvents, blockIndexer, block.block.extrinsics)
    await handleExtrinsics(block.block.extrinsics, allEvents, blockIndexer)

    await updateScanHeight(scanHeight++)
  }
}

main().then(() => console.log('Scan finished'))
  .catch(console.error)
  // .finally(cleanUp)


async function cleanUp() {
  await disconnect()
}
