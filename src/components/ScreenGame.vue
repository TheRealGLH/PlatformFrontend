<template>
  <div class="hello">
    <h2>{{ msg }}</h2>
<canvas id="gamePane" ref="gamePane">

</canvas>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'In game...'
    }
  },
  mounted () {
    var img = document.createElement('img')
    var img2 = document.createElement('img')
    var canvas = document.createElement('canvas')
    canvas = this.$refs.gamePane
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)

    img.src = require('../assets/sprites/platformplayer.png')
    img2.src = require('../assets/sprites/rocket.gif')
    img.onload = function (a) {
      // var h = a.target.height
      // var w = a.target.width
      var c = canvas.getContext('2d')
      canvas.width = 1270
      canvas.height = 720
      c.drawImage(img, 0, 0)
      c.drawImage(img, 64, 0)
    }
    img2.onload = function (a) {
      // var h = a.target.height
      // var w = a.target.width
      var c = canvas.getContext('2d')
      c.drawImage(img2, 32, 0)
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="@/assets/css/gameview.css">
</style>
