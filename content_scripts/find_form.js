
/*  RIGHT NOW
 * {
 *    submit: {
 *      elem: {},
 *      event: ""
 *    },
 *    fields: {
 *      user: {},
 *      pass: {}
 *    },
 *    final: bool
 * }
 */

/*  LATER VERSION, WHEN WE WILL WANT TO HAVE MORE FIELDS:
 * {
 *    submit: {
 *      elem: {},
 *      event: ""
 *    },
 *    fields: [
 *      {
 *        name: "",
 *        elem: {}
 *      }
 *    ],
 *    final: bool
 * }
 */

function find_form_wikipedia() {
  let form = document.querySelectorAll("form[name='userlogin']")[0]
  return {
    submit: {
      elem: form,
      event: "submit"
    },
    fields: {
      user: form.querySelectorAll("input[id='wpName1']")[0],
      pass: form.querySelectorAll("input[id='wpPassword1']")[0]
    },
    final: true
  }
}

function find_form_fb() {
  let form = document.querySelectorAll('form[id="u_0_a"]')
  if (form.length != 0)
    form = form[0]
  else
    form = document.querySelectorAll("form[id='login_form']")[0]
  return {
    submit: {
      elem: form,
      event: "submit"
    },
    fields: {
      user: form.querySelectorAll("input[id='email']")[0],
      pass: form.querySelectorAll("input[id='pass']")[0]
    },
    final: true
  }
}

function find_form_amazon() {
  let form = document.querySelectorAll("form[name='signIn']")[0]
  let user = form.querySelectorAll("input[id='ap_email']")
  return {
    submit: {
      elem: form,
      event: "submit"
    },
    fields: {
      user: (user.length != 0 ? user[0] : undefined),
      pass: (user.length != 0 ? form.querySelectorAll("input[id='ap_password']")[0] : undefined)
      // TODO: ????????????????? Pourquoi ça fonctionne ?
    },
    final: (user.length != 0 ? false : true)
  }
}

function find_form_leboncoin() {
  let form = document.querySelectorAll("form[autocomplete='on']")[0]
  return {
    submit: {
      elem: form,
      event: "submit"
    },
    fields: {
      user: form.querySelectorAll("input[id='email']")[0],
      pass: form.querySelectorAll("input[id='password']")[0]
    },
    final: true
  }
}

function find_form_lemonde() {
  let form = document.querySelectorAll("form[name='connection']")[0]
  return {
    submit: {
      elem: form,
      event: "submit"
    },
    fields: {
      user: form.querySelectorAll("input[id='connection_mail']")[0],
      pass: form.querySelectorAll("input[id='connection_password']")[0]
    },
    final: true
  }
}

function find_form_yahoo() {
  let form = document.querySelectorAll("form[id='login-username-form']")
  let form2 = document.querySelectorAll("form[class='pure-form challenge-form']")
  let user = {}
  try {
    user = form[0].querySelectorAll("input[id='login-username']")
  } catch (e) { }
  return {
    submit: {
      elem: (form.length != 0 ? form[0] : form2[0]),
      event: "submit"
    },
    fields: {
      user: (form.length != 0 ? user[0] : undefined),
      pass: (form.length == 0 ? form2[0].querySelectorAll("input[id='login-passwd']")[0] : undefined)
    },
    final: (form.length != 0 ? false : true)
  }
}

function find_form_free() {
  let form = document.querySelectorAll("form[id='log_form']")[0]
  return {
    submit: {
      elem: form,
      event: "submit"
    },
    fields: {
      user: form.querySelectorAll("input[id='login_b']")[0],
      pass: form.querySelectorAll("input[id='pass_b']")[0]
    },
    final: true
  }
}

function find_form_cdiscount() {
  let form = document.querySelectorAll("form[id='LoginForm']")[0]
  return {
    submit: {
      elem: form,
      event: "submit"
    },
    fields: {
      user: form.querySelectorAll("input[id='CustomerLogin_CustomerLoginFormData_Email']")[0],
      pass: form.querySelectorAll("input[id='CustomerLogin_CustomerLoginFormData_Password']")[0]
    },
    final: true
  }
}

function find_form_sfr() {
  let form = document.querySelectorAll("form[id='loginForm']")[0]
  return {
    submit: {
      elem: form,
      event: "submit"
    },
    fields: {
      user: form.querySelectorAll("input[id='username']")[0],
      pass: form.querySelectorAll("input[id='password']")[0]
    },
    final: true
  }
}

function find_form_lefigaro() {
  let form = document.querySelectorAll("form")[0]
  console.log(form);
  return {
    submit: {
      elem: form,
      event: "submit"
    },
    fields: {
      user: form.querySelectorAll("input[id='username']")[0],
      pass: form.querySelectorAll("input[id='password']")[0]
    },
    final: true
  }
}

function find_form_jvc() {
  let form = document.querySelectorAll("form")[0]
  console.log(form);
  return {
    submit: {
      elem: form,
      event: "submit"
    },
    fields: {
      user: form.querySelectorAll("input[name='login_pseudo']")[0],
      pass: form.querySelectorAll("input[name='login_password']")[0]
    },
    final: true
  }
}

function find_form_marmiton() {
  let form = document.querySelectorAll("div[id='content']")[0].querySelectorAll("form")[0]
  console.log(form);
  return {
    submit: {
      elem: form,
      event: "submit"
    },
    fields: {
      user: form.querySelectorAll("input[id='af_login']")[0],
      pass: form.querySelectorAll("input[id='af_pass']")[0]
    },
    final: true
  }
}

function find_form_ouest_france() {
  let form = document.querySelectorAll("form[id='kc-form-login']")[0]
  let user = form.querySelectorAll("input[id='username']")
  console.log(user);
  return {
    submit: {
      elem: form,
      event: "submit"
    },
    fields: {
      user: (user.length != 0 ? user[0] : undefined),
      pass: (user.length == 0 ? form.querySelectorAll("input[id='password']")[0] : undefined)
    },
    final: (user.length != 0 ? false : true)
  }
}

function find_form_twitter() {
  let form = document.querySelectorAll("form[action='/sessions']")[0]
  return {
    submit: {
      elem: form,
      event: "submit"
    },
    fields: {
      user: form.querySelectorAll("input[type='text']")[0],
      pass: form.querySelectorAll("input[type='password']")[0]
    },
    final: true
  }
}

function find_form_instagram() {
  let form = document.querySelectorAll("form[id='loginForm']")[0]
  return {
    submit: {
      elem: form,
      event: "submit"
    },
    fields: {
      user: form.querySelectorAll("input[name='username']")[0],
      pass: form.querySelectorAll("input[name='password']")[0]
    },
    final: true
  }
}

function find_form_ebay() {
  let form = document.querySelectorAll("form[id='signin-form']")[0]
  let user = form.querySelectorAll("input[id='userid']")
  console.log(form);
  console.log(user);
  return {
    submit: {
      elem: form,
      event: "submit"
    },
    fields: {
      user: (user.length != 0 ? user[0] : undefined),
      pass: (user.length == 0 ? form.querySelectorAll("input[id='pass']")[0] : undefined)
    },
    final: (form.length != 0 ? false : true)
  }
}

function find_form() {
  let finders = new Map([
    ["wikipedia.org", find_form_wikipedia],
    ["facebook.com", find_form_fb],
    ["www.amazon.fr", find_form_amazon],
    ["auth.leboncoin.fr", find_form_leboncoin],
    ["secure.lemonde.fr", find_form_lemonde],
    ["login.yahoo.com", find_form_yahoo],
    ["subscribe.free.fr", find_form_free],
    ["order.cdiscount.com", find_form_cdiscount],
    ["sfr.fr", find_form_sfr],
    ["auth.ouest-france.fr", find_form_ouest_france],
    ["connect.lefigaro.fr", find_form_lefigaro],
    ["jeuxvideo.com", find_form_jvc],
    ["marmiton.org", find_form_marmiton],
    ["twitter.com", find_form_twitter],         // -----------
    ["instagram.com", find_form_instagram],     // -----------
    ["signin.ebay.com", find_form_ebay],        // -----------
  ])

  let curr_url = new URL(location.href)
  let curr_host = curr_url.hostname
  for (let [k, f] of finders) {
    if (curr_host == k || curr_host.search("." + k) != -1) {
      try {
        let r = f()
        console.log(r);
        return r
      } catch (error) {
        console.log(error)
      }
    }
  }
  return false
}
