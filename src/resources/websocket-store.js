import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
var ws = new WebSocket('ws://localhost:8095/platform/')
ws.onmessage = function (evt) {
  alert('Message: ' + evt.data)
  // TODO send this shit to the store and make the store react properly
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
