<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <h1>Platform Wars!</h1>
    <router-view/>
    <footer class="version-info">Current version {{version}}</footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      version: gitDescribeSync().hash
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
.version-info{
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  margin-bottom:15px;
}
</style>
