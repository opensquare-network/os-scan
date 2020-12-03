const {
  getBountyHuntersCollection,
  getBountyStateCollection,
  getBountyCollection
} = require("../mongo");


class BountyService {

  async countAllBounties() {
    const col = await getBountyCollection()
    return await col.estimatedDocumentCount()
  }

  async countBounties(query = {}) {
    const col = await getBountyCollection()
    return await col.countDocuments(query)
  }

  async addStateForBounties(bounties = []) {
    const rawIds = bounties.map(bounty => bounty.bountyId)
    const ids = [...new Set(rawIds)]

    const col = await getBountyStateCollection()

    const bountyStateRecords = await col.find({ bountyId: { $in: ids } }).toArray()
    bountyStateRecords.sort((a, b) => b.indexer.blockHeight - a.indexer.blockHeight)

    return bounties.map(bounty => {
      const state = bountyStateRecords.find(state => state.bountyId === bounty.bountyId)
      return { ...bounty, state }
    })
  }

  getBounties(skip = 0, limit = 20) {
    return this.findBounties({}, skip, limit)
  }

  async findBounties(query = {}, skip = 0, limit = 20) {
    const col = await getBountyCollection()
    const bounties = await col
      .find(query)
      .sort({ 'indexer.blockHeight': -1 })
      .skip(skip)
      .limit(limit)
      .toArray()
    const bountiesWithState = await this.addStateForBounties(bounties)
    return bountiesWithState
  }

  async getBounty(bountyId) {
    const col = await getBountyCollection()
    const bounty = await col.findOne({ bountyId })
    const bounties = await this.addStateForBounties([bounty])
    return bounties[0]
  }

  async getBountyHunters(bountyId) {
    const bountyHuntersCol = await getBountyHuntersCollection()
    const records = await bountyHuntersCol.find({ bountyId }).sort({ 'indexer.blockHeight': -1 }).limit(1).toArray()

    return records.length > 0 ? records[0].hunters : []
  }

  constructBountiesByHunterQuery(hunter) {
    return [
      // Step 1: Find out bounties this hunter ever has applied for
      {
        $match: {
          'hunters.accountId': hunter
        }
      }, {
        $group: {
          _id: '$bountyId'
        }
      },
      // Step 2: Find the up-to-date hunters list for these bounties
      {
        $lookup: {
          from: 'bountyHunters',
          let: { bountyId: '$_id', hunter },
          pipeline: [
            // Take the latest hunters list for these bounties
            {
              $match: {
                $expr: { $eq: ['$bountyId', '$$bountyId'] }
              }
            }, {
              $sort: { 'indexer.blockHeight': -1 }
            }, {
              $limit: 1
            }, {
              $project: {
                hunter: {
                  $arrayElemAt: [{
                    $filter: {
                      input:"$hunters",
                      cond: { $eq: ["$$this.accountId", "$$hunter"] }
                    }
                  }, 0]
                }
              }
            },
            // Make sure this hunter still in hunters list 
            {
              $match: {
                hunter: { $ne: null }
              }
            }],
          as: 'latestBountyHunters'
        }
      },
      // Step 3: Filter out records which does not includes the hunter
      {
        $match: {
          latestBountyHunters: { $size: 1 }
        }
      }]
  }

  async countBountiesByHunter(hunter) {
    const query = [
      ...this.constructBountiesByHunterQuery(hunter),
      {
        $count: 'numOfHuntBounties'
      }]

    const bountyHunterCol = await getBountyHuntersCollection()
    const result = await bountyHunterCol.aggregate(query).toArray()
    return result.length > 0 ? result[0].numOfHuntBounties : 0
  }

  async findBountiesByHunter(hunter, skip = 0, limit = 20) {
    const query = [
      ...this.constructBountiesByHunterQuery(hunter),
      {
        $sort: {
          'hunter.indexer.blockHeight': -1
        }
      },
      { $skip: skip },
      { $limit: limit },
      {
        $lookup: {
          from: 'bounty',
          localField: '_id',
          foreignField: 'bountyId',
          as: 'bountyDetail'
        }
      }, {
        $project: {
          bounty: { $arrayElemAt: ['$bountyDetail', 0] },
          hunter: { $arrayElemAt: ['$latestBountyHunters.hunter', 0] }
        }
      }]

    const bountyHunterCol = await getBountyHuntersCollection()
    const result = await bountyHunterCol.aggregate(query).toArray()
    const bountiesWithState = await this.addStateForBounties(result.map(item => item.bounty))
    return bountiesWithState
  }
}


module.exports = new BountyService()
