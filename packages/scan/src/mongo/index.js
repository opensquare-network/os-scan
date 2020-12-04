const { MongoClient } = require('mongodb')

const dbName = 'os-scan'

const blockCollectionName = 'block'
const statusCollectionName = 'status'
const eventCollectionName = 'event'
const extrinsicCollectionName = 'extrinsic'
const bountyCollectionName = 'bounty'
const bountyStateCollectionName = 'bountyState'
const bountyHuntersCollectionName = 'bountyHunters'
const accountCollectionName = 'account'

let client = null
let db = null

let blockCol = null
let statusCol = null
let eventCol = null
let extrinsicCol = null
let bountyCol = null
let bountyStateCol = null
let bountyHuntersCol = null
let accountCol = null

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017'

async function initDb() {
  client = await MongoClient.connect(mongoUrl, {
    useUnifiedTopology: true
  })

  db = client.db(dbName)

  blockCol = db.collection(blockCollectionName)
  statusCol = db.collection(statusCollectionName)
  eventCol = db.collection(eventCollectionName)
  extrinsicCol = db.collection(extrinsicCollectionName)
  bountyCol = db.collection(bountyCollectionName)
  bountyStateCol = db.collection(bountyStateCollectionName)
  bountyHuntersCol = db.collection(bountyHuntersCollectionName)
  accountCol = db.collection(accountCollectionName)

  await _createIndexes()
}

async function _createIndexes() {
  if (!db) {
    console.error('Please call initDb first')
    process.exit(1)
  }

  blockCol.createIndex({ hash: 1 }, { unique: true })
  blockCol.createIndex({ 'header.number': -1 })

  extrinsicCol.createIndex({ hash: 1 }, { unique: true })
  extrinsicCol.createIndex({ 'indexer.blockHeight': -1 })
  extrinsicCol.createIndex({ 'indexer.blockHash': 1 })
  extrinsicCol.createIndex({ 'connect.stakeholders': 1 }, { sparse: true })

  eventCol.createIndex({ 'indexer.blockHeight': -1, sort: -1 }, { unique: true })
  eventCol.createIndex({ extrinsicHash: 1, sort: -1 })

  bountyCol.createIndex({ bountyId: 1 }, { unique: true })
  bountyCol.createIndex({ 'indexer.blockHeight': -1 })
  bountyCol.createIndex({ creator: 1 })
  bountyCol.createIndex({ 'hunters.hunters.accountId': 1 }, { sparse: true })

  bountyStateCol.createIndex({ bountyId: 1, 'indexer.blockHeight': -1, sort: -1 }, { unique: true })
  bountyStateCol.createIndex({ 'indexer.blockHeight': -1 })

  bountyHuntersCol.createIndex({ bountyId: 1, 'indexer.blockHeight': -1, sort: -1 }, { unique: true })
  bountyHuntersCol.createIndex({ 'indexer.blockHeight': -1 })

  accountCol.createIndex({ address: 1 }, { unique: true })
}

async function tryInit(col) {
  if (!col) {
    await initDb()
  }
}

async function getBlockCollection() {
  await tryInit(blockCol)
  return blockCol
}

async function getStatusCollection() {
  await tryInit(statusCol)
  return statusCol
}

async function getExtrinsicCollection() {
  await tryInit(extrinsicCol)
  return extrinsicCol
}

async function getEventCollection() {
  await tryInit(eventCol)
  return eventCol
}

async function getBountyCollection() {
  await tryInit(bountyCol)
  return bountyCol
}

async function getBountyStateCollection() {
  await tryInit(bountyStateCol)
  return bountyStateCol
}

async function getBountyHuntersCollection() {
  await tryInit(bountyHuntersCol)
  return bountyHuntersCol
}

async function getAccountCollection() {
  await tryInit(accountCol)
  return accountCol
}

module.exports = {
  getBlockCollection,
  getStatusCollection,
  getExtrinsicCollection,
  getEventCollection,
  getBountyCollection,
  getBountyStateCollection,
  getBountyHuntersCollection,
  getAccountCollection,
}
