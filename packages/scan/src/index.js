const { handleBlock } = require("./block");
const { updateScanHeight } = require("./mongo/scanHeight");
const { sleep } = require("./utils/sleep");
const { getLatestHeight } = require("./chain/latestHead");
const { getFirstScanHeight } = require("./mongo/scanHeight");
const { getApi, disconnect } = require('./api/index')
const { updateHeight } = require('./chain/latestHead')

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
      // Should no happen
      await sleep(1000)
      continue
    }

    await handleBlock(blockHash)
    // TODO: handle blocks rollback
    await updateScanHeight(scanHeight++)
  }
}

main().then(() => console.log('Scan finished'))
  .catch(console.error)
  // .finally(cleanUp)


async function cleanUp() {
  await disconnect()
}
