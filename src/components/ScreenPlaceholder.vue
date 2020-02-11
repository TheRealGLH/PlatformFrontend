<template>
  <div class="hello">
    <h2>{{ msg }}</h2>
      <div class="menu">
<h3>To be made</h3>
<router-link to="/"><button>Back</button></router-link>
  </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Placeholder menu...'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="@/assets/css/menu.css">
</style>
