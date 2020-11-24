
// send message to currently viewed tab
export const send_current_tab_message = async (message_type: string, params: any) => {
  let id = Math.floor(Math.random() * 100000000)
  let request = { id: id, message_type: message_type, params: params }
  // console.log(JSON.stringify(request))
  let tabs = await browser.tabs.query({ active: true, currentWindow: true })
  return browser.tabs.sendMessage(tabs[0].id, request)
}

// send message to all tabs
export const send_all_tabs_message = async (message_type: string, params: any) => {
  let id = Math.floor(Math.random() * 100000000)
  let request = { id: id, message_type: message_type, params: params }
  // console.log(JSON.stringify(request))
  let tabs = await browser.tabs.query({})
  tabs.forEach(async (tab) => {
    try {
      await browser.tabs.sendMessage(tab.id, request)
    } catch (error) {
      // console.log(error)
    }
  })
}

// Simple wrapper used to receive (and respond to) messages from the content
// scripts and the Angular popup. handler's resolve value will be the answer
export const add_message_listener = (message_type: string, handler: any) => {
  browser.runtime.onMessage.addListener((request: any, sender: any) => {
    if (request.message_type == message_type) {
      return handler(request.params, sender)
    }
  })
}
