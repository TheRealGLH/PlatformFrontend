<template>
  <div class="hello">
    <h2>{{ msg }}</h2>
      <div class="menu">
      <transition>
      <div class="menuBox">
<ul class="menuList">
<li class="menuListItem">
<div class="errorBox" id="registerErrorBox" :style="errorVisible"><!--<img src="static/favicon.png"/>--> ⚠️ {{registerMsgCurrentText}}</div>
</li>
<li class="menuListItem">
<input placeholder="User name" id="RegisterUserName" class="inputUserInfo" v-model="registerUserName"/>
</li>

<li class="menuListItem">
<input placeholder="Password" type="password" id="RegisterPassword" class="inputUserInfo" v-model="registerPassword"/>
</li>

<li class="menuListItem">
<input placeholder="Confirm password" type="password" id="RegisterPasswordConfirm" class="inputUserInfo" v-model="registerPasswordConfirm"/>
</li>

<li class="menuListItem">
<button id="RegisterSubmit" @click="sendRegister" :disabled="registerButtonDisabled">Log in</button>
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
      registerButtonDisabled: false,
      msg: 'Registering',
      registerMsgCurrentText: 'Insert Error message here',
      registerMsgFillIn: 'Please fill in ALL fields',
      registerMsgNoMatch: 'Please type in your password twice.',
      registerMsgError: 'Error registering your account. Try again later.',
      registerMsgIncorrect: 'Username and/ or password too short.',
      registerMsgAlreadyExists: 'A user by this name is already registed.',
      registerMsgBanned: 'You are currently banned from playing'
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
        if (parsed.responseMessageType === 'RegisterState') {
          this.loadingVisible = this.invisibleTagProp
          this.registerButtonDisabled = false
          if (parsed.registerState === 'SUCCESS') {
            alert('Registration successful! You may now log in.')
            // TODO make a nice message box for this with a button that sends us to the login menu
            this.$router.push('/login')
          } else {
            var errorText = ''
            switch (parsed.registerState) {
              case 'INCORRECTDATA':
                errorText = this.registerMsgIncorrect
                break
              case 'ALREADYEXISTS':
                errorText = this.registerMsgAlreadyExists
                break
              case 'ERROR':
                errorText = this.registerMsgError
                break
              default:
                errorText = 'unknown register response type: ' + parsed.registerState
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
      this.registerMsgCurrentText = text
      this.errorVisible = this.visibleTagProp
    },
    sendRegister () {
      this.errorVisible = this.invisibleTagProp
      if (this.registerPassword === this.registerPasswordConfirm) {
        if (this.registerUserName && this.registerPassword && this.registerPasswordConfirm) {
          this.loadingVisible = this.visibleTagProp
          this.registerButtonDisabled = true
          websocketStore.commit('sendMessage', '{ messageType: \'Register\', name: ' + this.registerUserName + ', password: ' + this.registerPassword + ' }')
        } else {
          this.showErrorMessage(this.registerMsgFillIn)
        }
      }
      // this.$refs["RegisterPasswordConfirm"].classList.add("inputUserInfoError")
      this.showErrorMessage(this.registerMsgNoMatch)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="@/assets/css/menu.css">
</style>
