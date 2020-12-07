const { FEED_INTERVAL } = require('./constant')
const { latestStatisticsRoom } = require('./constant')
const { getLatestStatistics, setLatestStatistics } = require('./store')
const {
  getAccountCollection,
  getBountyCollection,
  getExtrinsicCollection,
} = require("../mongo");

async function feedLatestStatistics(io) {
  const accountCol = await getAccountCollection();
  const totalAccounts = await accountCol.estimatedDocumentCount();

  const bountyCol = await getBountyCollection();
  const totalBounties = await bountyCol.estimatedDocumentCount();
  const totalBountiesApplying = await bountyCol.countDocuments({ 'state.state': 'Applying' });
  const totalBountiesResolved = await bountyCol.countDocuments({ 'state.state': 'Resolved' });

  const extrinsicCol = await getExtrinsicCollection();
  const totalExtrinsics = await extrinsicCol.estimatedDocumentCount();

  try {
    const latestStatistics = {
      totalAccounts,
      totalBounties,
      totalBountiesApplying,
      totalBountiesResolved,
      totalExtrinsics,
    }
    io.to(latestStatisticsRoom).emit('latestStatistics', latestStatistics)
    setLatestStatistics(latestStatistics)
  } catch (e) {
    console.error(e)
  } finally {
    setTimeout(feedLatestStatistics.bind(null, io), FEED_INTERVAL)
  }
}

module.exports = {
  feedLatestStatistics
}
