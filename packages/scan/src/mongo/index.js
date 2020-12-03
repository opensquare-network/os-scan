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
const accountExtrinsicCollectionName = 'accountExtrinsic'

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
let accountExtrinsicCol = null

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
  accountExtrinsicCol = db.collection(accountExtrinsicCollectionName)

  await _createIndexes()
}

async function _createIndexes() {
  if (!db) {
    console.error('Please call initDb first')
    process.exit(1)
  }

  // TODO: create indexes for DB collections
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

async function getAccountExtrinsicCollection() {
  await tryInit(accountExtrinsicCol)
  return accountExtrinsicCol
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
  getAccountExtrinsicCollection,
}
