const bountyService = require("../../services/bountyService");
const { extractPage } = require("../../utils");


class BountyController {
  async getBounties(ctx) {
    const { page, pageSize } = extractPage(ctx)
    if (pageSize === 0 || page < 0) {
      ctx.status = 400
      return
    }

    const { state } = ctx.query;

    let query
    if (state) {
      query = { 'state.state': state }
    } else {
      query = {}
    }

    const bounties = await bountyService.findBounties(query, page * pageSize, pageSize)
    const total = await bountyService.countBounties(query)

    ctx.body = {
      items: bounties,
      page,
      pageSize,
      total
    }
  }

  async getHuntableBounties(ctx) {
    const { page, pageSize } = extractPage(ctx)
    if (pageSize === 0 || page < 0) {
      ctx.status = 400
      return
    }

    const query = {
      'state.state': {
        $in: ['Accepted', 'Assigned', 'Submitted']
      }
    }

    const bounties = await bountyService.findBounties(query, page * pageSize, pageSize)
    const total = await bountyService.countBounties(query)

    ctx.body = {
      items: bounties,
      page,
      pageSize,
      total
    }
  }

  async getBounty(ctx) {
    const { bountyId = '' } = ctx.params

    const bounty = await bountyService.getBounty(bountyId)

    ctx.body = bounty
  }

  async getBountyHunters(ctx) {
    const { bountyId = '' } = ctx.params

    const bountyHunters = await bountyService.getBountyHunters(bountyId)

    ctx.body = bountyHunters
  }
}

module.exports = new BountyController()
