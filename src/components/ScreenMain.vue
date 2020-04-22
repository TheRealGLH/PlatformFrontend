<template>
  <div class="hello">
    <h2>{{ msg }}</h2>
      <div class="menu">
  <router-link to="/login"><button id="btnLogIn">Log In</button></router-link>
<br/>
  <router-link to="/register"><button id="btnRegister">Register</button></router-link>
<br/>
  <router-link to="/game"><button id="btnDebug">Sprites</button></router-link>
<br/>
  <router-link to="/input"><button id="btnInput">Test Input</button></router-link>
  </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome!'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="@/assets/css/menu.css">
</style>
