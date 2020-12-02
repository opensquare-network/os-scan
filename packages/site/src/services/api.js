import ApiBase from "./apiBase";

class Api extends ApiBase {

  fetchBlocks = params => {
    return this.cancelableFetch('/blocks', params)
  }

  fetchBlock = blockId => {
    return this.cancelableFetch(`/blocks/${blockId}`)
  }

  fetchExtrinsics = params => {
    return this.cancelableFetch('/extrinsics', params)
  }

  fetchExtrinsic = hash => {
    return this.cancelableFetch(`/extrinsics/${hash}`)
  }

  fetchEvents = params => {
    return this.cancelableFetch('/events', params)
  }

  fetchAccounts = params => {
    return this.cancelableFetch('/accounts', params)
  }

  fetchAccount = address => {
    return this.cancelableFetch(`/accounts/${address}`)
  }

  fetchTransfer = params => {
    return this.cancelableFetch(`/transfer`, params)
  }

  fetchAccountTransfers = (address, params) => {
    return this.cancelableFetch(`/accounts/${address}/transfers`, params)
  }

  fetchTransactoin = params => {
    return this.cancelableFetch(`/transaction`, params)
  }

  fetchNativeAssets = address => {
    return this.cancelableFetch(`/accounts/${address}/assets`)
  }

  fetchEvent = eventId => {
    return this.cancelableFetch(`/events/${eventId}`)
  }

  fetchAccountNominations = params => {
    return this.cancelableFetch(`/nomination`, params)
  }
}

const api = new Api(process.env.REACT_APP_SERVER)

export default api
