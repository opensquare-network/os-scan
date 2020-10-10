const { ApiPromise, WsProvider } = require("@polkadot/api");
const types = require('./types')

let provider = null
let api = null

async function getApi() {
  if (!api) {
    const ws_endpoint = process.env.WS_ENDPOINT || 'ws://127.0.0.1:9944'
    provider = new WsProvider(ws_endpoint)
    api = await ApiPromise.create({ provider, types })
  }

  return api
}

async function disconnect() {
  if (provider) {
    provider.disconnect()
  }
}

module.exports = {
  getApi,
  disconnect
}
