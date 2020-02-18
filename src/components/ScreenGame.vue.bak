<template>
  <div class="hello">
    <h2>{{ msg }}</h2>

<!--<canvas id="gamePane" ref="gamePane"></canvas>-->
<easel-canvas width="800" height="600" :anti-alias="false" id="gamePane">
    <easel-sprite-sheet
        :images="['static/spritesheet.png']"
        :frames="{width:32,height:32}"
        :animations="{
            ammo: {
                frames: [0, 2, 3 ,4 ,5 ,6 ,7, 8, 9, 10, 11],
            },
            axe: {
                frames: [12, 13],
            },
            explosion: {
                frames: [14, 15, 16, 17, 18, 19, 20],
            },
            grenade: {
                frames: [21, 22, 23, 24],
            },
            platformsolid: 25,
            platformnonsolid: 26,
            player: 27,
            rocket: {
                frames: [28, 29, 30, 31, 32, 33, 34, 35],
            },
            slash: {
                frames: [36, 37, 38, 39, 40],
            },
            slashEnd: 42,
            swordAttack: [36, 37, 38, 39, 40, 41, 'slashEnd'],
            bomb: 43,
            bullet: 44,
            placeholder: 45,
            stand: 7,
            walk: [6, 7],
            walkAndStand: [6, 7, 'stand'],
            confusion: {
                frames: [5, 1, 0, 2],
            },
        }"
        :framerate="12"
    >
        <easel-sprite
            :x="32"
            :y="32"
            animation="ammo"
            align="bottom-center"
        >
        </easel-sprite>
        <easel-sprite
            :x="64"
            :y="32"
            animation="axe"
            align="bottom-center"
        >
        </easel-sprite>
        <easel-sprite
            :x="96"
            :y="32"
            animation="explosion"
            align="bottom-center"
        >
        </easel-sprite>
        <easel-sprite
            :x="128"
            :y="32"
            animation="grenade"
            align="bottom-center"
        >
        </easel-sprite>
        <easel-sprite
            :x="160"
            :y="32"
            animation="platformnonsolid"
            align="bottom-center"
        >
        </easel-sprite>
        <easel-sprite
            :x="192"
            :y="32"
            animation="platformsolid"
            align="bottom-center"
        >
        </easel-sprite>
        <easel-sprite
            :x="224"
            :y="32"
            animation="player"
            align="bottom-center"
        >
        </easel-sprite>
        <easel-sprite
            :x="256"
            :y="32"
            animation="rocket"
            align="bottom-center"
        >
        </easel-sprite>
        <easel-sprite
            :x="288"
            :y="32"
            animation="slash"
            align="bottom-center"
        >
        </easel-sprite>
        <easel-sprite
            :x="320"
            :y="32"
            animation="bomb"
            align="bottom-center"
        >
        </easel-sprite>
        <easel-sprite
            :x="352"
            :y="32"
            animation="bullet"
            align="bottom-center"
        >
        </easel-sprite>
        <easel-sprite
            :x="384"
            :y="32"
            animation="placeholder"
            align="bottom-center"
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
