/* content: {
 *   main_text: "",
 *   button1_text: "",
 *   button2_text: ""
 * }
 * actions: {
 *   button1: fn(),
 *   button2: fn()
 * }
 * close_event: ""
 */
async function open_modal_dialog(content, actions, close_event) {
  let link = document.createElement("LINK");
  link.href = "https://fonts.googleapis.com/css?family=Montserrat"
  link.rel = "stylesheet"
  document.head.appendChild(link)

  let rand_id = Math.floor(Math.random() * 100000000)
  let modal = document.createElement("DIV")
  modal.id = "harpokratModal" + rand_id
  modal.style = `
  display: block;
  position: fixed;
  z-index: 999999999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  `

  let modal_content = document.createElement("DIV")
  modal_content.style = `
  position: absolute;
  border: 4px solid #38678f;
  top: 4px;
  right: 4px;
  background-color: #fefefe;
  padding: 20px;
  width: 325px;
  -webkit-box-shadow: 0px 0px 1px 1px rgba(110,110,110,0.23);
  -moz-box-shadow: 0px 0px 1px 1px rgba(110,110,110,0.23);
  box-shadow: 0px 0px 1px 1px rgba(110,110,110,0.23);
  `

  let p = document.createElement("P")
  p.style = "font-family: 'Montserrat', sans-serif !important;"
  p.textContent = content.main_text

  let btn1 = document.createElement("BUTTON")
  btn1.style = `
  color: #fff;
  border: 2px solid #38678f;
  min-width: 100px;
  background-color: #38678f;
  font-weight: 400;
  padding: .375rem .75rem;
  font-size: 1rem;
  line-height: 1.5;
  `
  btn1.textContent = content.button1_text

  let btn2 = document.createElement("BUTTON")
  btn2.style = `
  color: #000;
  font-weight: 400;
  border: 2px solid #212529;
  min-width: 100px;
  padding: .375rem .75rem;
  font-size: 1rem;
  line-height: 1.5;
  margin-left: 2px;
  background-color: #fefefe;
  `
  btn2.textContent = content.button2_text

  let hr = document.createElement("div")
  hr.style = `
  border: 10px solid transparent;
  `

  let img = document.createElement("IMG")
  img.src = "https://harpokrat.com/assets/img/hpk.svg"
  img.style = `
  max-width: 64px;
  display: inline-block;
  margin-left: 5px;
  float:right;
  `

  let mark = document.createElement("P")
  mark.style = `
  font-family: 'Montserrat', sans-serif !important;
  display: inline-block;
  margin-left: 5px;
  font-size: 20px;
  float:right;
  `
  mark.textContent = "Harpokrat"

  let markContainer = document.createElement("DIV")
  markContainer.appendChild(img)
  // modal_content.appendChild(mark)

  btn1.onclick = async function () {
    modal.style.display = "none";
    await actions.button1()
  }

  btn2.onclick = async function () {
    modal.style.display = "none";
    await actions.button2()
  }

  modal_content.appendChild(markContainer)
  modal_content.appendChild(p)
  modal_content.appendChild(hr)
  modal_content.appendChild(btn1)
  modal_content.appendChild(btn2)
  modal.appendChild(modal_content)
  document.body.appendChild(modal)

  add_message_listener(close_event, () => {
    modal.style.display = "none";
  })
}

/* content: {
 *   main_text: "",
 *   button_texts: [""]
 * }
 * action: fn(),
 * close_event: ""
 */
async function open_modal_list(content, action, close_event) {
  let link = document.createElement("LINK");
  link.href = "https://fonts.googleapis.com/css?family=Montserrat"
  link.rel = "stylesheet"
  document.head.appendChild(link)

  let rand_id = Math.floor(Math.random() * 100000000)
  let modal = document.createElement("DIV")
  modal.id = "harpokratModal" + rand_id
  modal.style = `
  display: block;
  position: fixed;
  z-index: 999999999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  `

  let modal_content = document.createElement("DIV")
  modal_content.style = `
  position: absolute;
  border: 4px solid #38678f;
  top: 4px;
  right: 4px;
  background-color: #fefefe;
  padding: 20px;
  width: 325px;
  -webkit-box-shadow: 0px 0px 1px 1px rgba(110,110,110,0.23);
  -moz-box-shadow: 0px 0px 1px 1px rgba(110,110,110,0.23);
  box-shadow: 0px 0px 1px 1px rgba(110,110,110,0.23);
  `

  let p = document.createElement("P")
  p.style = "font-family: 'Montserrat', sans-serif !important;"
  p.textContent = content.main_text

  let btnClose = document.createElement("BUTTON")
  btnClose.style = `
  color: #000;
  font-weight: 400;
  border: 2px solid #212529;
  width: 80%;
  padding: .375rem .75rem;
  font-size: 1rem;
  line-height: 1.5;
  margin: 5px;
  background-color: #fefefe;
  `
  btnClose.textContent = "Cancel"

  let hr = document.createElement("div")
  hr.style = `
  border: 10px solid transparent;
  `

  let img = document.createElement("IMG")
  img.src = "https://harpokrat.com/assets/img/hpk.svg"
  img.style = `
  max-width: 64px;
  display: inline-block;
  margin-left: 5px;
  float:right;
  `

  let mark = document.createElement("P")
  mark.style = `
  font-family: 'Montserrat', sans-serif !important;
  display: inline-block;
  margin-left: 5px;
  font-size: 20px;
  float:right;
  `
  mark.textContent = "Harpokrat"

  let markContainer = document.createElement("DIV")
  markContainer.appendChild(img)
  // modal_content.appendChild(mark)

  btnClose.onclick = async function () {
    modal.style.display = "none";
  }

  modal_content.appendChild(markContainer)
  modal_content.appendChild(p)
  modal_content.appendChild(hr)

  for (text of content.button_texts) {
    let btn1 = document.createElement("BUTTON")
    btn1.style = `
    color: #fff;
    border: 2px solid #38678f;
    width: 80%;
    background-color: #38678f;
    font-weight: 400;
    padding: .375rem .75rem;
    margin: 5px;
    font-size: 1rem;
    line-height: 1.5;
    `
    btn1.textContent = text

    btn1.onclick = async function () {
      modal.style.display = "none";
      await action(btn1.textContent)
    }

    modal_content.appendChild(btn1)
  }

  modal_content.appendChild(btnClose)
  modal.appendChild(modal_content)
  document.body.appendChild(modal)

  add_message_listener(close_event, () => {
    modal.style.display = "none";
  })
}

/* action: fn(),
 * close_event: ""
 */
async function open_modal_login(action, close_event) {
  let link = document.createElement("LINK");
  link.href = "https://fonts.googleapis.com/css?family=Montserrat"
  link.rel = "stylesheet"
  document.head.appendChild(link)

  let rand_id = Math.floor(Math.random() * 100000000)
  let modal = document.createElement("DIV")
  modal.id = "harpokratModal" + rand_id
  modal.style = `
  display: block;
  position: fixed;
  z-index: 999999999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  `

  let modal_content = document.createElement("DIV")
  modal_content.style = `
  position: absolute;
  border: 4px solid #38678f;
  top: 4px;
  right: 4px;
  background-color: #fefefe;
  padding: 20px;
  width: 325px;
  -webkit-box-shadow: 0px 0px 1px 1px rgba(110,110,110,0.23);
  -moz-box-shadow: 0px 0px 1px 1px rgba(110,110,110,0.23);
  box-shadow: 0px 0px 1px 1px rgba(110,110,110,0.23);
  `

  let p = document.createElement("P")
  p.style = "font-family: 'Montserrat', sans-serif !important;"
  p.textContent = "Please log into you HPK account: "

  let btn1 = document.createElement("BUTTON")
  btn1.style = `
  color: #fff;
  border: 2px solid #38678f;
  min-width: 100px;
  background-color: #38678f;
  font-weight: 400;
  padding: .375rem .75rem;
  font-size: 1rem;
  margin: 5px;
  line-height: 1.5;
  `
  btn1.textContent = "Log In"

  let btn2 = document.createElement("BUTTON")
  btn2.style = `
  color: #000;
  font-weight: 400;
  border: 2px solid #212529;
  min-width: 100px;
  padding: .375rem .75rem;
  font-size: 1rem;
  line-height: 1.5;
  margin: 5px;
  background-color: #fefefe;
  `
  btn2.textContent = "Cancel"

  let hr = document.createElement("div")
  hr.style = `
  border: 10px solid transparent;
  `

  let img = document.createElement("IMG")
  img.src = "https://harpokrat.com/assets/img/hpk.svg"
  img.style = `
  max-width: 64px;
  display: inline-block;
  margin-left: 5px;
  float:right;
  `

  let mark = document.createElement("P")
  mark.style = `
  font-family: 'Montserrat', sans-serif !important;
  display: inline-block;
  margin-left: 5px;
  font-size: 20px;
  float:right;
  `
  mark.textContent = "Harpokrat"

  let markContainer = document.createElement("DIV")
  markContainer.appendChild(img)
  // modal_content.appendChild(mark)

  let input1 = document.createElement("INPUT")
  input1.setAttribute("type", "text")
  input1.style = `
  color: #fff;
  border: 2px solid #38678f;
  min-width: 100px;
  color: #000;
  font-weight: 400;
  padding: .375rem .75rem;
  font-size: 1rem;
  margin: 5px;
  line-height: 1.5;
  `

  let input2 = document.createElement("INPUT")
  input2.setAttribute("type", "password")
  input2.style = `
  color: #fff;
  border: 2px solid #38678f;
  min-width: 100px;
  color: #000;
  font-weight: 400;
  padding: .375rem .75rem;
  font-size: 1rem;
  margin: 5px;
  line-height: 1.5;
  `

  btn1.onclick = async function () {
    modal.style.display = "none";
    await action({ email: input1.value, password: input2.value })
  }

  btn2.onclick = async function () {
    modal.style.display = "none";
  }

  modal_content.appendChild(markContainer)
  modal_content.appendChild(p)
  modal_content.appendChild(hr)

  modal_content.appendChild(input1)
  modal_content.appendChild(input2)

  modal_content.appendChild(hr)
  modal_content.appendChild(btn1)
  modal_content.appendChild(btn2)
  modal.appendChild(modal_content)
  document.body.appendChild(modal)

  add_message_listener(close_event, () => {
    modal.style.display = "none";
    look_for_creds_to_fill()
  })
}

// ===========================
// LOGIN MESSAGE HANDLING
const ask_login_handler = async (params, sender) => {
  open_modal_login((cred) => {
    send_webext_message("hpk_login", cred)
  }, "closeAllLogins")
}

add_message_listener("askLogin", ask_login_handler)
