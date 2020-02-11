<template>
  <div class="hello">
    <h2>{{ msg }}</h2>
      <div class="menu">
<ul>
<li>
<input placeholder="User name" id="LoginUserName" class="inputUserInfo"/>
</li>

<li>
<input placeholder="Password" type="password" id="LoginPassword" class="inputUserInfo"/>
</li>

<li>
<button id="LoginSubmit">Log in</button>
</li>
</ul>
<router-link to="/"><button>Back</button></router-link>
  </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Log in.'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="@/assets/css/menu.css">
</style>
