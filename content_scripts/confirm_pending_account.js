
const look_for_pending_account = async () => {
  let res = await send_webext_message("is_account_pending")
  console.log(JSON.stringify(res));
  if (res.success) {
    await open_modal_dialog({
      main_text: "Would you like to record this new account to you HPK Vault ?",
      button1_text: "Record",
      button2_text: "Decline"
    }, {
      button1: async () => {
        await send_webext_message("add_account", res.account)
        await send_webext_message("delete_first_pending_account", {})
      },
      button2: async () => {
        await send_webext_message("delete_first_pending_account", {})
      }
    }, "close_pending_account_modal")
  }
}

try {
  look_for_pending_account()
} catch (e) {
  console.error(e)
}
