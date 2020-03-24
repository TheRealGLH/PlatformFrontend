<template>
  <div class="hello">
    <h2>{{ msg }}</h2>
<p> Most recent update: {{ recentMessage }} </p>
<canvas id="gamePane" ref="gamePane" :width="w" :height="h"></canvas>
<br/>
Sprite debug:<br/>
<button @click="addTestSprite">Create</button>
<button @click="updateAllSprites">Update</button>
<button @click="deleteAllSprites">Delete</button>
<button @click="showAllSprites">Show all animations</button>
  </div>
</template>

<script>
import * as cjs from '@createjs/easeljs'
import websocketStore from '../resources/websocket-store'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'In game...',
      w: 800,
      h: 600,
      debugSpriteCount: 0,
      spriteMap: new Map(),
      recentMessage: ''
    }
  },
  computed: {
    messageContent () {
      return websocketStore.state.messageContent
    }
  },
  watch: {
    messageContent (newType, oldType) {
      if (newType!== ''){
        var parsed = JSON.parse(newType)
        if (parsed.responseMessageType === 'SpriteUpdate') {
          this.recentMessage = newType
          parsed.spriteUpdates.forEach(spriteUpdate => this.handleSpriteUpdate(spriteUpdate))
        }
      }
    }
  },
  mounted () {
    this.init()
    this.stage = new cjs.Stage(this.$refs.gamePane)
    cjs.Ticker.addEventListener('tick', this.stage)
    var amount = Math.floor(Math.random() * 35)
    for (var i = 0; i < amount; i++) {
      var xPos = Math.floor(Math.random() * this.w)
      var yPos = Math.floor(Math.random() * (this.h / 3))
      var xSize = Math.random() * 2
      this.addBackgroundSprite('star', xPos, yPos, xSize, xSize)
    }
  },
  methods: {
    init () {
      var data = {
        images: ['static/spritesheet.png'],
        frames: {width: 32, height: 32},
        animations: {
          WEAPONPICKUP: {
            frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
          },
          AXE: {
            frames: [12, 13]
          },
          PROJECTILEBOMBEXPLODE: {
            frames: [14, 15, 16, 17, 18, 19, 20, 19, 17, 16, 15, 14]
          },
          PROJECTILEBOMB: {
            frames: [21, 22, 23, 24]
          },
          PLATFORM: 25,
          UNSOLIDPLATFORM: 26,
          PLAYER: 27,
          PROJECTILEROCKET: {
            frames: [28, 29, 30, 31, 32, 33, 34, 35]
          },
          slash: {
            frames: [36, 37, 38, 39, 40]
          },
          slashEnd: 42,
          PROJECTILESWORD: [36, 37, 38, 39, 40, 41, 'slashEnd'],
          PROJECTILEBOMB: 43,
          PROJECTILEBULLET: 44,
          NONE: 45
        },
        framerate: 14
      }
      var backgrounddata = {
        images: ['static/spritesheetbackground.png'],
        frames: {width: 16, height: 16},
        animations: {
          star: {
            frames: [0, 1, 2, 3, 4]
          }
        },
        framerate: 4
      }
      this.backgroundspritesheet = new cjs.SpriteSheet(backgrounddata)
      this.spritesheet = new cjs.SpriteSheet(data)
    },
    addTestSprite () {
      var xPos = Math.floor(Math.random() * this.w)
      var yPos = Math.floor(Math.random() * this.h)
      this.addSprite(this.debugSpriteCount, 'PROJECTILEBOMB', xPos, yPos, 1, 1, false)
      this.debugSpriteCount++
    },
    showAllSprites () {
      this.deleteAllSprites()
      var y = 0
      for (const animation of this.spritesheet.animations) {
        this.addSprite(this.debugSpriteCount, animation, this.debugSpriteCount * 32, y, 1, 1, false)
        this.debugSpriteCount++
      }
    },
    updateAllSprites () {
      for (var row of this.spriteMap) {
        var xPos = Math.floor(Math.random() * this.w)
        var yPos = Math.floor(Math.random() * this.h)
        var xSize = Math.random() * 2
        // var ySize = Math.random() * 2
        var flipped = Boolean(Math.round(Math.random()))
        this.updateSprite(row[0], 'PROJECTILEROCKET', xPos, yPos, xSize, xSize, flipped)
      }
    },
    deleteAllSprites () {
      for (var row of this.spriteMap) {
        this.deleteSprite(row[0])
      }
      this.debugSpriteCount = 0
    },
    addBackgroundSprite (spriteType, posX, posY, scaleX, scaleY) {
      var sprite = new cjs.Sprite(this.backgroundspritesheet, spriteType)
      var frames = this.backgroundspritesheet.getNumFrames(spriteType) - 1
      var startFrame = Math.floor(Math.random() * frames)
      sprite.gotoAndPlay(startFrame)
      sprite.x = posX
      sprite.y = posY
      sprite.scaleX = scaleX
      sprite.scaleY = scaleY
      this.stage.addChild(sprite)
    },
    handleSpriteUpdate(spriteUpdate) {
      switch(spriteUpdate.updateType) {
            case 'MOVE':
              this.updateSprite(spriteUpdate.objectNr, spriteUpdate.spriteType, spriteUpdate.position.x, spriteUpdate.position.y, spriteUpdate.size.x, spriteUpdate.size.y, spriteUpdate.isFacingLeft)
            break;
            case 'CREATE':
              this.addSprite(spriteUpdate.objectNr, spriteUpdate.spriteType, spriteUpdate.position.x, spriteUpdate.position.y, spriteUpdate.size.x, spriteUpdate.size.y, spriteUpdate.isFacingLeft)
            break;            
            case 'DESTROY':
              this.deleteSprite(spriteUpdate.objectNr)
            break;
            default:
              console.log('Unknown spriteUpdate type: ' + spriteUpdate.updateType)
      } 
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
      this.spriteMap.set(spriteNr, sprite)
      alert('added ' +sprite)
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
