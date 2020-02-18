<template>
  <div class="hello">
    <h2>{{ msg }}</h2>

<!--<canvas id="gamePane" ref="gamePane"></canvas>-->
<easel-canvas width="800" height="600" :anti-alias="false" id="gamePane">
    <easel-sprite-sheet
        :images="['images/lastguardian-all.png']"
        :frames="{width:32,height:32}"
        :animations="{
            stand: 7,
            walk: [6, 7],
            walkAndStand: [6, 7, 'stand'],
            confusion: {
                frames: [5, 1, 0, 2],
            },
        }"
        :framerate="4"
    >
        <easel-sprite
            :x="32"
            :y="48"
            animation="stand"
            align="bottom-left"
        >
        </easel-sprite>
    </easel-sprite-sheet>
</easel-canvas>

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
  /*
    var img = document.createElement('img')
    var img2 = document.createElement('img')
    var canvas = document.createElement('canvas')
    canvas = this.$refs.gamePane
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)

    img.src = require('../assets/sprites/spritesheet.png')
    img2.src = require('../assets/sprites/spritesheet.png')
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
    */
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="@/assets/css/gameview.css">
</style>
