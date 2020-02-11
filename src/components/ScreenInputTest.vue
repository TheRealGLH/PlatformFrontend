<template>
  <div class="hello">
    <h2>{{ msg }}</h2>
      <div class="menu">
  <button id="btnLogIn">Log In</button>
<br/>
  <button id="btnRegister">Register</button>
<br/>
  <button id="btnDebug">Test Sprites</button>
<br/>
  <button id="btnInput">Test Input</button>
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
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
button {
  border: 0px hidden #1C6EA4;
  font-size: 32px;
  margin: 7px;
  padding: 20px;
  font-family: Helvetica, Arial, Sans-Serif;
}
button:hover {
-webkit-box-shadow: 0px 0px 6px 5px rgba(0,0,0,0.22); 
box-shadow: 0px 0px 6px 5px rgba(0,0,0,0.22);
}
</style>
