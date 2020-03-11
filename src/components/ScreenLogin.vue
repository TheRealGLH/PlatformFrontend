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
<button id="LoginSubmit" @click="sendLogin">Log in</button>
</li>
<li class="menuListItem">
<img src="static/loading.gif" id="loadingCircle" width="32px" :style="loadingVisible" />
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
      msg: 'Log in.',
      loginMsgCurrentText: 'Insert Error message here',
      loginMsgError: 'There was an error with our login service, try again later',
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
      this.loadingVisible = this.visibleTagProp
      websocketStore.commit('sendMessage', '{ messageType: \'Login\', name: ' + this.loginUserName + ', password: ' + this.loginPassword + ' }')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="@/assets/css/menu.css">
</style>
