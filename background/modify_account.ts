
import { add_message_listener } from './messaging'
import { modifyAccount } from './api'

const modify_account = async (params: any, sender: any) => {
  // console.log("modified account: " + JSON.stringify(params))
  let res = await modifyAccount(params);

  return { success: true }
}

export function setup_modify_account() {
  add_message_listener("modify_account", modify_account)
}
