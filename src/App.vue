<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <h1>Platform Wars!</h1>
    <transition name="fade">
    <router-view/>
    </transition>
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
@font-face {
  font-family: 'TF2 Bold';
  src: url(/static/fonts/tf2build.ttf) format('truetype');
  font-weight: 400;
}
h1,h2,h3{
  font-family: TF2 Bold;
}
h1{
  font-size:60px;
}
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
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0
}
</style>
