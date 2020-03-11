<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <h1>Platform Wars!</h1>
    <transition name="fade">
    <router-view/>
    </transition>
    <footer class="footer">Current version <a :href="gitUrl" class="version-hash" target="_blank">{{version}}</a>. Git history: <a href="https://i322496.hera.fhict.nl/platformupdates" class="version-hash" target="_blank">**</a></footer>

  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
    // eslint-disable-next-line
      version: GITHASH,
      // eslint-disable-next-line
      gitUrl: 'https://github.com/TheRealGLH/PlatformFrontend/commit/' + GITHASH
    }
  },
  mounted () {
    // console.log(process.env.VUE_APP_GIT_HASH)
  }
}
</script>

<style>
body{
 background-color: #f6f8f7;
}
a{
 font-weight: bold;
}
@font-face {
  font-family: 'TF2 Bold';
  src: url('assets/fonts/tf2build.ttf') format('truetype');
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
  color: #686963;
  margin-top: 60px;
}
.footer{
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  margin-bottom:15px;
  color:#8aa29e;
}
.version-hash{
  color: #e1737d;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .4s
}
.fade-enter, .fade-leave-to{
  opacity: 0
}
</style>
