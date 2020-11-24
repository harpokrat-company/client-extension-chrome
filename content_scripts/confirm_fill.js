
const look_for_creds_to_fill = async () => {
  let form = find_form()
  if (form) {
    let res = await send_webext_message("find_account_for_domain")
    if (res.success && res.accounts.length > 0) {

      // if (res.accounts.length == 1) {
      // open_modal_dialog({
      //   main_text: "Would you like to fill this form with a recorded account from Harpokrat ?",
      //   button1_text: "Fill",
      //   button2_text: "Decline"
      // }, {
      //   button1: async () => {
      //     if (form.fields.user) {
      //       form.fields.user.value = res.accounts[0].user
      //     }
      //     if (form.fields.pass) {
      //       form.fields.pass.value = res.accounts[0].pass
      //     }
      //   },
      //   button2: async () => {
      //   }
      // }, "close_fill_form_modal")
      // } else {
      let usernames = [];
      for (account of res.accounts) {
        usernames.push(account.username)
      }
      open_modal_list({
        main_text: "Would you like to fill this form with a recorded account from Harpokrat ?",
        button_texts: usernames
      }, async (username) => {
        console.log(username);
        if (form.fields.user) {
          form.fields.user.value = username
        }
        if (form.fields.pass) {
          for (const account of res.accounts) {
            if (account.username == username) {
              form.fields.pass.value = account.password
              console.log(account.password);
            }
          }
        }
      }, "close_fill_form_modal")
      // }

    }
  }
}

try {
  look_for_creds_to_fill()
} catch (e) {
  console.error(e)
}
