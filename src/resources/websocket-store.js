import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// TODO make this url configurable and set it on webpack build as an envir var
var ws = new WebSocket('ws://localhost:8095/platform/')
ws.onopen = function (evt) {
  websocketStore.state.socketConnected = true
}
ws.onmessage = function (evt) {
  websocketStore.state.messageContent = evt.data
  // websocketStore.state.messageContent = ''
  // TODO send this shit to the store and make the store react properly
}
ws.onclose = function () {
  websocketStore.state.socketConnected = false
  alert('Connection to the server was closed. You may want to refresh the page.')
  // TODO make the page respond to this... Perhaps remove the template from the page?
}

ws.onerror = function (err) {
  alert('Error connecting to the server: ' + err.message)
  // TODO make the page respond to this... Perhaps remove the template from the page?
}
const websocketStore = new Vuex.Store({
  state: {
    socketConnected: false,
    // these are the RECEIVED messages, we don't store our sent messages locally
    messageType: '',
    messageContent: '',
    loggedIn: false
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
})

export default websocketStore
