const {
  getAccountCollection,
} = require("../mongo");


class AccountService {

  async countAllAccounts() {
    const accountCol = await getAccountCollection()
    return await accountCol.estimatedDocumentCount()
  }

  async getAccount(address) {
    const accountCol = await getAccountCollection()
    const account = await accountCol.findOne({ address })
    return account
  }

  async getAccounts(skip = 0, limit = 20) {
    const accountCol = await getAccountCollection()
    const accounts = await accountCol.find({}).skip(skip).limit(limit).toArray()
    return accounts

  }
}


module.exports = new AccountService()
