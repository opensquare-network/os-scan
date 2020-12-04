const { extractExtrinsicEvents } = require("../utils");
const { getExtrinsicCollection } = require("../mongo");
const { isExtrinsicSuccess } = require("../utils");
const { u8aToHex } = require('@polkadot/util')
const { sections } = require("../utils/consants");

async function handleExtrinsics(extrinsics = [], allEvents = [], indexer) {
  let index = 0
  for (const extrinsic of extrinsics) {
    const events = extractExtrinsicEvents(allEvents, index)

    await handleExtrinsic(
      extrinsic,
      {
        ...indexer,
        index: index++
      },
      events
    )
  }
}

/**
 *
 * 解析并处理交易
 *
 */
async function handleExtrinsic(extrinsic, indexer, events) {
  const hash = extrinsic.hash.toHex()
  const callIndex = u8aToHex(extrinsic.callIndex)
  const { args } = extrinsic.method.toJSON()
  const name = extrinsic.method.methodName
  const section = extrinsic.method.sectionName
  let signer = extrinsic._raw.signature.get('signer').toString()
  //如果signer的解析长度不正确，则该交易是无签名交易
  if (signer.length < 48) {
    signer = ''
  }

  // TODO: extract business data from extrinsic
  // await extractExtrinsicBusinessData(extrinsic, indexer, events)
  const isSuccess = isExtrinsicSuccess(events)

  const version = extrinsic.version
  const data = u8aToHex(extrinsic.data) // 原始数据

  const stakeholders = extractStakeHolders(events, signer)

  const doc = {
    hash,
    indexer,
    signer,
    section,
    name,
    callIndex,
    version,
    args,
    data,
    isSuccess,
    connect: {
      stakeholders
    },
  }

  const exCol = await getExtrinsicCollection()
  const result = await exCol.insertOne(doc)
  if (result.result && !result.result.ok) {
    // FIXME: 处理交易插入不成功的情况
  }
}

function extractStakeHolders(events, signer) {
  let stakeholders = new Set([signer])

  for (let i = 0; i < events.length; i++) {
    const { event } = events[i]
    const section = event.section
    const method = event.method
    const data = event.data.toJSON()

    if (section === sections.bounties) {
      if (method === 'AssignBounty') {
        const [bountyId, accountId] = data
        stakeholders.add(accountId)
      }
    } else if (section === sections.reputation) {
      if (method === 'ReputationAdded') {
        const [accountId, reputation] = data
        stakeholders.add(accountId)
      }
    } else if (section === sections.balances) {
      if (method === 'Transfer') {
        const [from, to, balance] = data
        stakeholders.add(from)
        stakeholders.add(to)
      } else if (method === 'ReserveRepatriated') {
        const [from, to, balance] = data
        stakeholders.add(from)
        stakeholders.add(to)
      }
    }
  }

  return Array.from(stakeholders)
}

module.exports = {
  handleExtrinsics
}
