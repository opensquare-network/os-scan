const {
  getExtrinsicCollection,
} = require("../../mongo");
const { extractPage } = require("../../utils");
const bountyService = require("../../services/bountyService");
const accountService = require("../../services/accountService");


class AccountController {
  async getAccounts(ctx) {
    const { page, pageSize } = extractPage(ctx)
    if (pageSize === 0 || page < 0) {
      ctx.status = 400
      return
    }

    const accounts = await accountService.getAccounts(page * pageSize, pageSize)
    const total = await accountService.countAllAccounts()

    ctx.body = {
      items: accounts,
      page,
      pageSize,
      total
    }
  }


  async getAccount(ctx) {
    const { address } = ctx.params

    const account = await accountService.getAccount(address)
    ctx.body = account
  }

  async getAccountExtrinsics(ctx) {
    const { address } = ctx.params
    const { page, pageSize } = extractPage(ctx)
    if (pageSize === 0) {
      ctx.status = 400
      return
    }

    const col = await getExtrinsicCollection()
    const total = await col.countDocuments({ 'connect.stakeholders': address })
    const extrinsics = await col
      .find({ 'connect.stakeholders': address })
      .sort({ 'indexer.blockHeight': -1 })
      .toArray()

    ctx.body = {
      items: extrinsics,
      page,
      pageSize,
      total
    }
  }

  async getFundBounties(ctx) {
    const { address } = ctx.params
    const { page, pageSize } = extractPage(ctx)
    if (pageSize === 0) {
      ctx.status = 400
      return
    }

    const total = await bountyService.countBounties({ creator: address })
    const bounties = await bountyService.findBounties({ creator: address }, page * pageSize, pageSize)

    ctx.body = {
      items: bounties,
      page,
      pageSize,
      total
    }
  }

  async getExaminedBounties(ctx) {
    const { address } = ctx.params
    const { page, pageSize } = extractPage(ctx)
    if (pageSize === 0) {
      ctx.status = 400
      return
    }

    const total = await bountyService.countBounties({ creator: address, 'state.state': { $ne: 'Applying' } })
    const bounties = await bountyService.findBounties({ creator: address, 'state.state': { $ne: 'Applying' } }, page * pageSize, pageSize)

    ctx.body = {
      items: bounties,
      page,
      pageSize,
      total
    }
  }

  async getPendingApproveBounties(ctx) {
    const { address } = ctx.params
    const { page, pageSize } = extractPage(ctx)
    if (pageSize === 0) {
      ctx.status = 400
      return
    }

    const total = await bountyService.countBounties({ creator: address, 'state.state': 'Applying' })
    const bounties = await bountyService.findBounties({ creator: address, 'state.state': 'Applying' }, page * pageSize, pageSize)

    ctx.body = {
      items: bounties,
      page,
      pageSize,
      total
    }
  }

  async getHuntBounties(ctx) {
    const { address } = ctx.params
    const { page, pageSize } = extractPage(ctx)
    if (pageSize === 0) {
      ctx.status = 400
      return
    }

    const total = await bountyService.countBountiesByHunter(address)
    const bounties = await bountyService.findBountiesByHunter(address, {}, page * pageSize, pageSize)

    ctx.body = {
      items: bounties,
      page,
      pageSize,
      total
    }
  }

  async getApplyingBounties(ctx) {
    const { address } = ctx.params
    const { page, pageSize } = extractPage(ctx)
    if (pageSize === 0) {
      ctx.status = 400
      return
    }

    const total = await bountyService.countBountiesByHunter(address, { 'state.state': 'Accepted' })
    const bounties = await bountyService.findBountiesByHunter(address, { 'state.state': 'Accepted' }, page * pageSize, pageSize)

    ctx.body = {
      items: bounties,
      page,
      pageSize,
      total
    }
  }

  async getAssignedBounties(ctx) {
    const { address } = ctx.params
    const { page, pageSize } = extractPage(ctx)
    if (pageSize === 0) {
      ctx.status = 400
      return
    }

    const total = await bountyService.countBountiesByAssignee(address,
      {
        'state.state': {
          $ne: 'Accepted'
        }
      })
    const bounties = await bountyService.findBountiesByAssignee(address,
      {
        'state.state': {
          $ne: 'Accepted'
        }
      }, page * pageSize, pageSize)

    ctx.body = {
      items: bounties,
      page,
      pageSize,
      total
    }
  }

  async getBehaviors(ctx) {
    const { address } = ctx.params
    const { page, pageSize } = extractPage(ctx)
    if (pageSize === 0) {
      ctx.status = 400
      return
    }

    const col = await getExtrinsicCollection()
    const total = await col.countDocuments({ signer: address })
    const extrinsics = await col
      .find({ signer: address })
      .sort({ 'indexer.blockHeight': -1 })
      .toArray()

    ctx.body = {
      items: extrinsics,
      page,
      pageSize,
      total
    }
  }

}

module.exports = new AccountController()
