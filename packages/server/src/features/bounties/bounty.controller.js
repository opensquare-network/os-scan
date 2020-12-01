const { getBountyHuntersCollection } = require("../../mongo");
const { getBountyStateCollection } = require("../../mongo");
const { getBountyCollection } = require("../../mongo");
const { extractPage } = require("../../utils");

async function addStateForBounties(bounties = []) {
  const rawIds = bounties.map(bounty => bounty.bountyId)
  const ids = [...new Set(rawIds)]

  const col = await getBountyStateCollection()

  const bountyStateRecords = await col.find({ bountyId: { $in: ids } }).toArray()
  bountyStateRecords.sort((a, b) => b.blockHeight - a.blockHeight)

  return bounties.map(bounty => {
    const state = bountyStateRecords.find(state => state.bountyId === bounty.bountyId)
    return { ...bounty, state }
  })
}

class BountyController {
  async getBounties(ctx) {
    const { page, pageSize } = extractPage(ctx)
    if (pageSize === 0 || page < 0) {
      ctx.status = 400
      return
    }

    const col = await getBountyCollection()
    const bounties = await col
      .find({})
      .sort({ blockHeight: 1 })
      .skip(page * pageSize)
      .limit(pageSize)
      .toArray()
    const bountiesWithState = await addStateForBounties(bounties)
    const total = await col.estimatedDocumentCount()

    ctx.body = {
      items: bountiesWithState,
      page,
      pageSize,
      total
    }
  }

  async getBounty(ctx) {
    const { bountyId = '' } = ctx.params
    const col = await getBountyCollection()
    const bounty = await col.findOne({ bountyId })
    const bounties = await addStateForBounties([bounty])
    ctx.body = bounties[0]
  }

  async getBountyHunters(ctx) {
    const { bountyId = '' } = ctx.params
    const bountyHuntersCol = await getBountyHuntersCollection()
    const records = await bountyHuntersCol.find({ bountyId }).sort({ blockHeight: -1 }).limit(1).toArray()

    ctx.body = records.length <= 0 ? [] : records[0].hunters
  }
}

module.exports = new BountyController()
