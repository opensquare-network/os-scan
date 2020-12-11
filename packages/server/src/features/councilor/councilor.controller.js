const { extractPage } = require("../../utils");
const bountyService = require("../../services/bountyService");


class CouncilorController {

  async getPendingApproveBounties(ctx) {
    const { page, pageSize } = extractPage(ctx)
    if (pageSize === 0) {
      ctx.status = 400
      return
    }

    const total = await bountyService.countBounties({ 'state.state': 'Applying' })
    const bounties = await bountyService.findBounties({ 'state.state': 'Applying' }, page * pageSize, pageSize)

    ctx.body = {
      items: bounties,
      page,
      pageSize,
      total
    }
  }
}

module.exports = new CouncilorController()
