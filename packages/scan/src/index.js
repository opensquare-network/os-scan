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
    const num = block.block.header.number.toNumber()
    console.log(`block ${num} is saved to db`)

    await updateScanHeight(scanHeight++)
  }
}

main().then(() => console.log('Scan finished'))
  .catch(console.error)
  // .finally(cleanUp)


async function cleanUp() {
  await disconnect()
}
