
import { setup_new_account } from './new_account'
import { setup_find_account } from './find_account'
import { setup_modify_account } from './modify_account'
import { setup_pending_accounts_messages } from './pending_accounts'
import { setup_pending_modification_accounts_messages } from './pending_modification_accounts'
import { run_tests } from './tests'
import { login, getAllUserPasswords } from './api'

browser.runtime.onInstalled.addListener(async function ({ reason, temporary }: any) {
  // setup storage lists
  // storage['aled'] is used for dev testing purposes
  await browser.storage.local.set({ aled: [], account_parts: [], pending_accounts: [], pending_modification_accounts: [] })

  setup_new_account()
  setup_find_account()
  setup_modify_account()
  setup_pending_accounts_messages()
  setup_pending_modification_accounts_messages()

  // login("aled@oskour.fi", "aledoskour").then((_) => {
  //   getAllUserPasswords()
  // });

  if (temporary) {
    run_tests()
      .then()
      .catch((err) => {
        console.log(err)
      })
  }
  switch (reason) {
    case "install":
      {
        if (temporary) {
          // break;
        }
        const url = browser.runtime.getURL("./installed.html");
        await browser.tabs.create({ url });
      }
      break;
  }
})
