<template>
  <div class="hello">
    <h2>{{ msg }}</h2>
      <div class="menu">
      <div class="menuBox">
<ul class="menuList">
<li class="menuListItem">
<input placeholder="User name" id="RegisterUserName" class="inputUserInfo"/>
</li>

<li class="menuListItem">
<input placeholder="Password" type="password" id="RegisterPassword" class="inputUserInfo"/>
</li>

<li class="menuListItem">
<input placeholder="Confirm" type="password" id="RegisterPasswordConfirm" class="inputUserInfo"/>
</li>

<li class="menuListItem">
<button id="RegisterSubmit">Register</button>
</li>
</ul>
</div>
<router-link to="/"><button>Back</button></router-link>

  </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Register'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="@/assets/css/menu.css">
</style>
