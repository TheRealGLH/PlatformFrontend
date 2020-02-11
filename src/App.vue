<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <h1>Platform Wars!</h1>
    <router-view/>
    <footer class="footer">Current version <b class="version-hash">{{version}}</b></footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      version: process.env.VUE_APP_GIT_HASH
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.footer{
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  margin-bottom:15px;
  color:#DDD;
}
.version-hash{
  color: #FF9D1D;
}
</style>
