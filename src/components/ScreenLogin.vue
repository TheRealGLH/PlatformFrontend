<template>
  <div class="hello">
    <h2>{{ msg }}</h2>
      <div class="menu">
      <transition>
      <div class="menuBox">
<ul class="menuList">
<li class="menuListItem">
<div class="errorBox" id="loginErrorBox" :style="errorVisible"><!--<img src="static/favicon.png"/>--> ⚠️ {{loginMsgCurrentText}}</div>
</li>
<li class="menuListItem">
<input placeholder="User name" id="LoginUserName" class="inputUserInfo" v-model="loginUserName"/>
</li>

<li class="menuListItem">
<input placeholder="Password" type="password" id="LoginPassword" class="inputUserInfo" v-model="loginPassword"/>
</li>

<li class="menuListItem">
<button id="LoginSubmit" @click="sendLogin" :disabled="loginButtonDisabled">Log in</button>
</li>
<li class="menuListItem">
<!--<img src="static/loading.gif" id="loadingCircle" width="32px" :style="loadingVisible" />-->
<div id="loadingCircle" :style="loadingVisible">
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
     width="24px" height="30px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50;" xml:space="preserve" >
    <rect x="0" y="13" width="4" height="5" fill="#333">
      <animate attributeName="height" attributeType="XML"
        values="5;21;5"
        begin="0s" dur="0.6s" repeatCount="indefinite" />
      <animate attributeName="y" attributeType="XML"
        values="13; 5; 13"
        begin="0s" dur="0.6s" repeatCount="indefinite" />
    </rect>
    <rect x="10" y="13" width="4" height="5" fill="#333">
      <animate attributeName="height" attributeType="XML"
        values="5;21;5"
        begin="0.15s" dur="0.6s" repeatCount="indefinite" />
      <animate attributeName="y" attributeType="XML"
        values="13; 5; 13"
        begin="0.15s" dur="0.6s" repeatCount="indefinite" />
    </rect>
    <rect x="20" y="13" width="4" height="5" fill="#333">
      <animate attributeName="height" attributeType="XML"
        values="5;21;5"
        begin="0.3s" dur="0.6s" repeatCount="indefinite" />
      <animate attributeName="y" attributeType="XML"
        values="13; 5; 13"
        begin="0.3s" dur="0.6s" repeatCount="indefinite" />
    </rect>
  </svg>
</div>
</li>
</ul>
</div>
  </transition>
<router-link to="/"><button>Back</button></router-link>

  </div>

  </div>
</template>

<script>
import websocketStore from '../resources/websocket-store'
export default {
  name: 'HelloWorld',
  data () {
    return {
      visibleTagProp: 'display: inline-block;',
      invisibleTagProp: 'display: none;',
      errorVisible: 'display: none;',
      loadingVisible: 'display: none;',
      loginButtonDisabled: false,
      msg: 'Log in.',
      loginMsgCurrentText: 'Insert Error message here',
      loginMsgFillIn: 'Please fill in BOTH fields',
      loginMsgError: 'Error logging in. Try again later.',
      loginMsgIncorrect: 'Incorrect user credentials supplied',
      loginMsgBanned: 'You are currently banned from playing'
    }
  },
  computed: {
    messageContent () {
      return websocketStore.state.messageContent
    }
  },
  watch: {
    messageContent (newType, oldType) {
      if (newType !== '') {
        var parsed = JSON.parse(newType)
        if (parsed.responseMessageType === 'LoginState') {
          this.loadingVisible = this.invisibleTagProp
          this.loginButtonDisabled = false
          if (parsed.loginState === 'SUCCESS') {
            this.$router.push('/lobby')
          } else {
            var errorText = ''
            switch (parsed.loginState) {
              case 'INCORRECTDATA':
                errorText = this.loginMsgIncorrect
                break
              case 'BANNED':
                errorText = this.loginMsgBanned
                break
              case 'ERROR':
                errorText = this.loginMsgError
                break
              default:
                errorText = 'unknown login response type: ' + parsed.loginState
                break
            }
            this.showErrorMessage(errorText)
          }
        }
      }
    }
  },
  methods: {
    showErrorMessage (text) {
      this.loginMsgCurrentText = text
      this.errorVisible = this.visibleTagProp
    },
    sendLogin () {
      this.errorVisible = this.invisibleTagProp
      if (this.loginUserName && this.loginPassword) {
        this.loadingVisible = this.visibleTagProp
        this.loginButtonDisabled = true
        websocketStore.commit('sendMessage', '{ messageType: \'Login\', name: \'' + this.loginUserName + '\', password: \'' + this.loginPassword + '\' }')
      } else {
        this.showErrorMessage(this.loginMsgFillIn)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="@/assets/css/menu.css">
</style>
