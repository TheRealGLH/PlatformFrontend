<template>
  <div class="hello">
    <h2>{{ msg }}</h2>

<canvas id="gamePane" ref="gamePane" :width="w" :height="h"></canvas>
<br/>
<button @click="addTestSprite">Add Sprite</button>
<button @click="updateAllSprites">Update</button>
<button @click="deleteAllSprites">Delete</button>
<button @click="showAllSprites">Show all sprites</button>
  </div>
</template>

<script>
import * as cjs from '@createjs/easeljs'

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'In game...',
      w: 800,
      h: 600,
      debugSpriteCount: 0
    }
  },
  props: {
    // spritesheet: Object
  },
  mounted () {
    this.init()
    this.stage = new cjs.Stage(this.$refs.gamePane)
    cjs.Ticker.addEventListener('tick', this.stage)
  },
  methods: {
    init () {
      this.spriteMap = new Map()
      var data = {
        images: ['static/spritesheet.png'],
        frames: {width: 32, height: 32},
        animations: {
          ammo: {
            frames: [0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
          },
          axe: {
            frames: [12, 13]
          },
          explosion: {
            frames: [14, 15, 16, 17, 18, 19, 20]
          },
          grenade: {
            frames: [21, 22, 23, 24]
          },
          platformsolid: 25,
          platformnonsolid: 26,
          player: 27,
          rocket: {
            frames: [28, 29, 30, 31, 32, 33, 34, 35]
          },
          slash: {
            frames: [36, 37, 38, 39, 40]
          },
          slashEnd: 42,
          swordAttack: [36, 37, 38, 39, 40, 41, 'slashEnd'],
          bomb: 43,
          bullet: 44,
          placeholder: 45
        }
      }
      this.spritesheet = new cjs.SpriteSheet(data)
    },
    addTestSprite () {
      var xPos = Math.floor(Math.random() * this.w)
      var yPos = Math.floor(Math.random() * this.h)
      this.addSprite(this.debugSpriteCount, 'placeholder', xPos, yPos, 1, 1, false)
      this.debugSpriteCount++
    },
    showAllSprites() {
      this.deleteAllSprites()
      var y = 32
      this.addSprite(this.debugSpriteCount, 'ammo', this.debugSpriteCount * 32, y, 1, 1, false)
      this.debugSpriteCount++
      this.addSprite(this.debugSpriteCount, 'axe', this.debugSpriteCount * 32, y, 1, 1, false)
      this.debugSpriteCount++
      this.addSprite(this.debugSpriteCount, 'explosion', this.debugSpriteCount * 32, y, 1, 1, false)
      this.debugSpriteCount++
      this.addSprite(this.debugSpriteCount, 'grenade', this.debugSpriteCount * 32, y, 1, 1, false)
      this.debugSpriteCount++
      this.addSprite(this.debugSpriteCount, 'platformsolid', this.debugSpriteCount * 32, y, 1, 1, false)
      this.debugSpriteCount++
      this.addSprite(this.debugSpriteCount, 'platformnonsolid', this.debugSpriteCount * 32, y, 1, 1, false)
      this.debugSpriteCount++
      this.addSprite(this.debugSpriteCount, 'player', this.debugSpriteCount * 32, y, 1, 1, false)
      this.debugSpriteCount++
      this.addSprite(this.debugSpriteCount, 'rocket', this.debugSpriteCount * 32, y, 1, 1, false)
      this.debugSpriteCount++
      this.addSprite(this.debugSpriteCount, 'slash', this.debugSpriteCount * 32, y, 1, 1, false)
      this.debugSpriteCount++
      this.addSprite(this.debugSpriteCount, 'bomb', this.debugSpriteCount * 32, y, 1, 1, false)
      this.debugSpriteCount++
      this.addSprite(this.debugSpriteCount, 'bullet', this.debugSpriteCount * 32, y, 1, 1, false)
      this.debugSpriteCount++
      this.addSprite(this.debugSpriteCount, 'placeholder', this.debugSpriteCount * 32, y, 1, 1, false)
      this.debugSpriteCount++
    },
    updateAllSprites () {
      for (var row of this.spriteMap) {
        var xPos = Math.floor(Math.random() * this.w)
        var yPos = Math.floor(Math.random() * this.h)
        var xSize = Math.random() * 2
        var ySize = Math.random() * 2
        var flipped = Boolean(Math.round(Math.random()))
        this.updateSprite(row[0], 'explosion', xPos, yPos, xSize, xSize, flipped)
      }
    },
    deleteAllSprites () {
      for (var row of this.spriteMap) {
        this.deleteSprite(row[0])
      }
      this.debugSpriteCount = 0;
    },
    addSprite (spriteNr, spriteType, posX, posY, scaleX, scaleY, flipped) {
      var sprite = new cjs.Sprite(this.spritesheet, spriteType)
      sprite.x = posX
      sprite.y = posY
      sprite.scaleX = scaleX
      sprite.scaleY = scaleY
      if (flipped === true) {
        sprite.scaleX = -sprite.scaleX
      }
      this.stage.addChild(sprite)
      this.spriteMap.set(this.debugSpriteCount, sprite)
    },
    updateSprite (spriteNr, spriteType, posX, posY, scaleX, scaleY, flipped) {
      var sprite = this.spriteMap.get(spriteNr)
      sprite.gotoAndPlay(spriteType)
      sprite.x = posX
      sprite.y = posY
      sprite.scaleX = scaleX
      sprite.scaleY = scaleY
      if (flipped === true) {
        sprite.scaleX = -sprite.scaleX
      }
    },
    deleteSprite (spriteNr) {
      var sprite = this.spriteMap.get(spriteNr)
      this.stage.removeChild(sprite)
      this.spriteMap.delete(spriteNr)
    }

  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="@/assets/css/gameview.css">
</style>
