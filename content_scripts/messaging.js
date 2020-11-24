
// This file is a simple wrapper used to receive/send messages from/to the
// background script of the WebExt


const send_webext_message = async (message_type, params) => {
  let id = Math.floor(Math.random() * 100000000)
  let request = {id: id, message_type: message_type, params: params}
  console.log(JSON.stringify(request))
  return browser.runtime.sendMessage(request)
}

const add_message_listener = (message_type, handler) => {
  browser.runtime.onMessage.addListener((request, sender) => {
    // check the message comes from background & filter the command
    if (!sender.tab && request.message_type == message_type) {
      return handler(request.params, sender)
    }
  })
}
