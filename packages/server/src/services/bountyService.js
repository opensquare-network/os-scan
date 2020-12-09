const {
  getBountyCollection
} = require("../mongo");


class BountyService {

  async countBounties(query = {}) {
    const col = await getBountyCollection()
    return await col.countDocuments(query)
  }

  async findBounties(query = {}, skip = 0, limit = 20) {
    const col = await getBountyCollection()
    const bounties = await col
      .find(query)
      .sort({ 'indexer.blockHeight': -1 })
      .skip(skip)
      .limit(limit)
      .toArray()
    return bounties
  }

  async getBounty(bountyId) {
    const col = await getBountyCollection()
    const bounty = await col.findOne({ bountyId })
    return bounty
  }

  async getBountyHunters(bountyId) {
    const col = await getBountyCollection()
    const bounty = await col.findOne({ bountyId })
    if (!bounty) {
      return null
    }
    if (!bounty.hunters) {
      return []
    }
    return bounty.hunters.hunters
  }

  async countBountiesByHunter(hunter) {
    const bountyCol = await getBountyCollection()
    const result = await bountyCol.countDocuments({ 'hunters.hunters.accountId': hunter })
    return result
  }

  async findBountiesByHunter(hunter, cond, skip = 0, limit = 20) {
    const bountyCol = await getBountyCollection()
    const result = await bountyCol.aggregate([
      // Step 1: Find out bounties that includes the hunter
      {
        $match: {
          'hunters.hunters.accountId': hunter,
          ...cond
        }
      },
      // Step 2: Pick hunter information we care about
      {
        $addFields: {
          hunter: {
            $arrayElemAt: [{
              $filter: {
                input: '$hunters.hunters',
                cond: { $eq: ["$$this.accountId", hunter] }
              }
            }, 0]
          },
          assignee: '$hunters.assignee'
        }
      }, {
        $project: {
          hunters: 0
        }
      },
      // Step 3: sort and return data
      {
        $sort: { 'hunter.indexer.blockHeight': -1 }
      }, {
        $skip: skip
      }, {
        $limit: limit
      }]).toArray()

    return result
  }

  async countBountiesByAssignee(hunter, cond = {}) {
    const bountyCol = await getBountyCollection()
    const result = await bountyCol.countDocuments({ 'hunters.assignee.accountId': hunter, ...cond })
    return result
  }

  async findBountiesByAssignee(hunter, cond = {}, skip = 0, limit = 20) {
    const bountyCol = await getBountyCollection()
    const query = [
      // Step 1: Find out bounties that includes the hunter
      {
        $match: {
          'hunters.assignee.accountId': hunter,
          ...cond
        }
      },
      // Step 2: sort and return data
      {
        $sort: { 'state.indexer.blockHeight': -1 }
      }, {
        $skip: skip
      }, {
        $limit: limit
      }]
    const result = await bountyCol.aggregate(query).toArray()

    return result
  }
}


module.exports = new BountyService()
