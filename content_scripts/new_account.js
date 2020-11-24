var interv = {}

function retry_find_account() {
  let form = find_form()

  console.log(form);
  if (form) {
    clearInterval(interv)
    setup_account_listener(form)
  }
}

function new_account() {
  let form = find_form()

  console.log(form);
  if (form) {
    setup_account_listener(form)
  }
  else {
    interv = setInterval(retry_find_account, 1000)
  }
}

function setup_account_listener(form) {
  form.submit.elem.addEventListener(form.submit.event, async () => {
    let user_value = ""
    if (form.fields.user)
      user_value = form.fields.user.value
    let pass_value = ""
    if (form.fields.pass)
      pass_value = form.fields.pass.value
    let params = {
      fields: {
        user: user_value,
        pass: pass_value
      },
      final: form.final
    }
    await send_webext_message("add_account_part", params, (response) => { })
    interv = setInterval(retry_find_account, 1000)
  })
}

try {
  new_account()
} catch (e) {
  console.error(e)
}
