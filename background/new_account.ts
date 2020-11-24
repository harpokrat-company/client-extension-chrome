
import { add_message_listener } from './messaging'
import { push_storage_list, get_from_storage_list } from './storage'
import { add_pending_account } from './pending_accounts'
import { addAccount } from './api'

export const add_account_part = async (params: any, sender: any) => {
  let sender_url = new URL(sender.tab.url)
  if (sender_url.host == "") {
    sender_url = new URL("http://localhost")
  }
  // console.log(JSON.stringify(params))
  if (params.fields.user !== "" && params.fields.pass !== "") {
    await add_pending_account({ user: params.fields.user, pass: params.fields.pass }, sender)
  } else {
    if (params.final) {
      let acc = await get_from_storage_list('account_parts', { domain: sender_url.host })
      let new_acc = { user: acc.user, pass: acc.pass }
      if (params.user != "")
        new_acc.user = params.user
      if (params.pass != "")
        new_acc.pass = params.pass
      // console.log({ user: new_acc.user, pass: new_acc.pass }, sender);
      await add_pending_account({ user: new_acc.user, pass: new_acc.pass }, sender)
    } else {
      await push_storage_list('account_parts', {
        name: sender_url.host + " - " + params.fields.user,
        user: params.fields.user,
        pass: params.fields.pass,
        domain: sender_url.host
      })
    }
  }
  return { success: true }
}

// params: {name: "", user: "", pass: "", domain: ""}
export const add_account = async (params: any, sender: any) => {
  // console.log("added account: " + JSON.stringify(params))
  await addAccount({
    name: params.name,
    domain: params.domain,
    username: params.user,
    password: params.pass,
  })
  return { success: true }
}

export function setup_new_account() {
  add_message_listener("add_account", add_account)
  add_message_listener("add_account_part", add_account_part)
}
