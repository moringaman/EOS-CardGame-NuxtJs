import { Api, JsonRpc, RpcError } from 'eosjs'
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig'

async function takeAction(action, dataValue) {
  console.log("datavalue: ", dataValue)
  console.log(process.env.NUXT_APP_EOS_CONTRACT_NAME)
  const privateKey = localStorage.getItem("cardgame_key")
  const rpc = new JsonRpc(process.env.NUXT_APP_EOS_API_ENDPOINT)
  const signatureProvider = new JsSignatureProvider([privateKey])
  console.log('private_key: ', privateKey)
  const api = new Api({
    rpc, signatureProvider,
    textDecoder: new TextDecoder(),
    textEncoder: new TextEncoder()
  })

  try {
    const resultWithConfig = await api.transact({
      actions: [{
        account: process.env.NUXT_APP_EOS_CONTRACT_NAME,
        name: action,
        authorization: [{
          actor: localStorage.getItem('cardgame_account'),
          permission: 'active',
        }],
        data: dataValue,
      }]
    }, {
        blocksBehind: 3,
        expireSeconds: 30,
      })
  } catch (err) {
    throw (err)
  }
}

class apiService {
  static login({ name, key }) {
    console.log(name, key)
    return new Promise((resolve, reject) => {
      localStorage.setItem('cardgame_account', name)
      localStorage.setItem('cardgame_key', key)
      takeAction("login", { username: name })
        .then(() => {
          resolve();
        })
        .catch((err) => {
          localStorage.removeItem('cardgame_account')
          localStorage.removeItem('cardgame_key')
          reject(err)
        })
    })
  }
  static async getUserByName(username) {
    try {
      const rpc = new JsonRpc(process.env.NUXT_APP_EOS_API_ENDPOINT)
      const result = await rpc.get_table_rows({
        "json": true,
        "code": process.env.NUXT_APP_EOS_CONTRACT_NAME,
        "scope": process.env.NUXT_APP_EOS_CONTRACT_NAME,
        "table": "users",
        "limit": 1,
        "lowerbound": username
      })
      return result.rows[0]
    } catch (err) {
      console.error(err)
    }
  }
  static getCurrentUser() {
    return new Promise((resolve, reject) => {
      if(!localStorage.getItem("cardgame_account")) {
        return reject()
      }
      takeAction("login", {username: localStorage.getItem('cardgame_account')})
      .then(() => {
        resolve(localStorage.getItem("cardgame_account"))
      })
      .catch(err => {
        localStorage.removeItem("cardgame_account")
        localStorage.removeItem("cardgame_key")
        reject(err);
      })
    })
  }
}

export default apiService
