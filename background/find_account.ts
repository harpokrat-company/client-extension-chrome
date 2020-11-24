
import { add_message_listener } from './messaging'
import { getAllUserPasswords } from './api'

export const find_accounts_for_domain = async (params: any, sender: any) => {
  let sender_url = new URL(sender.tab.url)
  if (sender_url.host == "") {
    sender_url = new URL("http://localhost")
  }
  const accounts: any = await getAllUserPasswords();
  let matchedAccounts = [];

  for (const account of accounts) {
    let re = new RegExp(account.domain)
    if (re.test(sender_url.host)) {
      matchedAccounts.push(account);
    }
  }

  if (accounts.length > 0) {
    return { success: true, accounts: matchedAccounts }
  }
  return { success: false }

  // TEST PLACEHOLDER
  // if (sender_url.host == "en.wikipedia.org") {
  //   return { success: true, account: { "name": "en.wikipedia.org - Aledoskour", "user": "kapno.cc", "pass": "aledoskour", "domain": "en.wikipedia.org" } }
  // }
}

export function setup_find_account() {
  add_message_listener("find_account_for_domain", find_accounts_for_domain)
}
