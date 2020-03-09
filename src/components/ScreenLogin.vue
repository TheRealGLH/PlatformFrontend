<template>
  <div class="hello">
    <h2>{{ msg }}</h2>
      <div class="menu">
      <div class="menuBox">
<ul class="menuList">
<li class="menuListItem">
<input placeholder="User name" id="LoginUserName" class="inputUserInfo" v-model="loginUserName"/>
</li>

<li class="menuListItem">
<input placeholder="Password" type="password" id="LoginPassword" class="inputUserInfo" v-model="loginPassword"/>
</li>

<li class="menuListItem">
<button id="LoginSubmit" @click="sendLogin">Log in</button>
</li>
</ul>
</div>
<router-link to="/"><button>Back</button></router-link>

  </div>
  </div>
</template>

<script>
import basket from '../resources/websocket-store'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Log in.'
    }
  },
  computed: {
    messageType () {
      return basket.state.messageType
      // Or return basket.getters.fruitsCount
      // (depends on your design decisions).
    }
  },
  watch: {
    messageType (newType, oldType) {
      // Our fancy notification (2).
      console.log(`Received messagetype ${newType}.`)
    }
  },
  methods: {
    sendLogin () {
      basket.commit('sendMessage', '{ messageType: \'Login\', name: ' + this.loginUserName + ', password: ' + this.loginPassword + ' }')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="@/assets/css/menu.css">
</style>
