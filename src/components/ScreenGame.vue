<template>
  <div class="hello">
    <h2>{{ msg }}</h2>

<canvas id="gamePane" ref="gamePane"></canvas>

  </div>
</template>

<script>
// eslint-disable-next-line
const cjs = 'createjs'

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'In game...'
    }
  },
  mounted () {

  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="@/assets/css/gameview.css">
</style>
