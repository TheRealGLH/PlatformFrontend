import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// TODO make this url configurable and set it on webpack build as an envir var
var ws = new WebSocket('ws://localhost:8095/platform/')
ws.onmessage = function (evt) {
  alert('Message: ' + evt.data)
  // TODO send this shit to the store and make the store react properly
}
ws.onclose = function () {
  alert('Connection to the server was closed. You may want to refresh the page.')
  // TODO make the page respond to this... Perhaps remove the template from the page?
}

ws.onerror = function (err) {
  alert('Error connecting to the server: ' + err)
  // TODO make the page respond to this... Perhaps remove the template from the page?
}
const basket = new Vuex.Store({
  state: {
    // these are the RECEIVED messages, we don't store our sent messages locally
    messageType: '',
    messageContent: ''
  },
  getters: {
    messageType (state) {
      return state.messageType
    },
    messageContent (state) {
      return state.messageContent
    }
  },
  mutations: {
    sendMessage (state, json) {
      ws.send(json)
    }
  }
  // Obvously you would need some mutations and actions,
  // but to make example cleaner I'll skip this part.
})

export default basket
