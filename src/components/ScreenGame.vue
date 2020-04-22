<template>
  <div class="hello">
    <h2>{{ msg }}</h2>
<canvas id="gamePane" ref="gamePane" :width="w" :height="h"></canvas>
  </div>
</template>

<script>
import * as cjs from '@createjs/easeljs'
import websocketStore from '../resources/websocket-store'
export default {
  name: 'GameView',
  data () {
    return {
      msg: 'In game...',
      w: 800,
      h: 600,
      worldWidth: 600,
      worldHeight: 600,
      debugSpriteCount: 0,
      spriteSize: 32,
      spriteScaleFactor: '',
      spriteMap: new Map(),
      textFont: '14px Consolas',
      textColor: '#000000',
      inputLeftPressed: false,
      inputRightPressed: false,
      inputJumpPressed: false,
      inputCrouchPressed: false,
      inputShootPressed: false,
      testMostRecentInput: '',
      labelMap: new Map()
    }
  },
  computed: {
    messageContent () {
      return websocketStore.state.messageContent
    }
  },
  watch: {
    messageContent (newType, oldType) {
      if (newType !== '') {
        var parsed = JSON.parse(newType)
        if (parsed.responseMessageType === 'SpriteUpdate') {
          parsed.spriteUpdates.forEach(spriteUpdate => this.handleSpriteUpdate(spriteUpdate))
        }
      }
    }
  },
  created () {
    window.addEventListener('keyup', this.handleKeyUp)
    window.addEventListener('keydown', this.handleKeyDown)
  },
  mounted () {
    this.spriteScaleFactor = this.h / this.worldHeight
    this.init()
    this.stage = new cjs.Stage(this.$refs.gamePane)
    cjs.Ticker.addEventListener('tick', this.stage)
    cjs.Ticker.addEventListener('tick', this.sendInput)
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
        frames: {width: this.spriteSize, height: this.spriteSize},
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
          PLAYERINVULN: [27, 42],
          PROJECTILEROCKET: {
            frames: [28, 29, 30, 31, 32, 33, 34, 35]
          },
          slash: {
            frames: [36, 37, 38, 39, 40]
          },
          slashEnd: 42,
          PROJECTILESWORD: [36, 37, 38, 39, 40, 41, 'slashEnd'],
          PROJECTILEBOMBOLD: 43,
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
        this.addSprite(this.debugSpriteCount, animation, this.debugSpriteCount * this.spriteSize, y, 1, 1, false)
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
    handleKeyDown (event) {
      this.testMostRecentInput = event.code
      switch (event.code) {
      case 'KeyW':
      //W
        this.inputJumpPressed = true
        break
      case 'KeyA':
      //A
        this.inputLeftPressed = true
        break
      case 'KeyD':
      //D
        this.inputRightPressed = true
        break
      case 'KeyS':
      //S
        this.inputCrouchPressed = true
        break
      case 'Space':
      //space
        this.inputShootPressed = true
        break
      }
    },
    handleKeyUp (event) {
      switch (event.code) {
      case 'KeyW':
      //W
        this.inputJumpPressed = false
        break
      case 'KeyA':
      //A
        this.inputLeftPressed = false
        break
      case 'KeyD':
      //D
        this.inputRightPressed = false
        break
      case 'KeyS':
      //S
        this.inputCrouchPressed = false
        break
      case 'Space':
      //space
        this.inputShootPressed = false
        break
      }
    },
    sendInput (event) {
      if (this.inputLeftPressed == true) {
        websocketStore.commit('sendMessage', '{ messageType: \'Input\', inputType: ' + 'MOVELEFT' + '}')
      } else if (this.inputRightPressed == true){
        websocketStore.commit('sendMessage', '{ messageType: \'Input\', inputType: ' + 'MOVERIGHT' + '}')
      }
      if (this.inputJumpPressed == true) {
        websocketStore.commit('sendMessage', '{ messageType: \'Input\', inputType: ' + 'JUMP' + '}')
      }
      if (this.inputShootPressed == true) {
        websocketStore.commit('sendMessage', '{ messageType: \'Input\', inputType: ' + 'SHOOT' + '}')
      }
    },
    handleSpriteUpdate (spriteUpdate) {
      switch (spriteUpdate.updateType) {
        case 'MOVE':
          this.updateSprite(spriteUpdate.objectNr, spriteUpdate.spriteType, spriteUpdate.position.x, spriteUpdate.position.y, spriteUpdate.size.x, spriteUpdate.size.y, spriteUpdate.isFacingLeft)
          this.updateLabel(spriteUpdate.objectNr, spriteUpdate.label, spriteUpdate.position.x, spriteUpdate.position.y)
          break
        case 'CREATE':
          this.addSprite(spriteUpdate.objectNr, spriteUpdate.spriteType, spriteUpdate.position.x, spriteUpdate.position.y, spriteUpdate.size.x, spriteUpdate.size.y, spriteUpdate.isFacingLeft)
          this.addLabel(spriteUpdate.objectNr, spriteUpdate.label, spriteUpdate.position.x, spriteUpdate.position.y)
          break
        case 'DESTROY':
          this.deleteSprite(spriteUpdate.objectNr)
          this.deleteLabel(spriteUpdate.objectNr)
          break
        default:
          console.log('Unknown spriteUpdate type: ' + spriteUpdate.updateType)
      }
    },
    addSprite (spriteNr, spriteType, posX, posY, scaleX, scaleY, flipped) {
      var sprite = new cjs.Sprite(this.spritesheet, spriteType)
      this.adjustSpriteTransform(sprite, scaleX, scaleY, posX, posY, flipped)
      this.stage.addChild(sprite)
      this.spriteMap.set(spriteNr, sprite)
    },
    updateSprite (spriteNr, spriteType, posX, posY, scaleX, scaleY, flipped) {
      var sprite = this.spriteMap.get(spriteNr)
      if (sprite.currentAnimation !== spriteType) {
        sprite.gotoAndPlay(spriteType)
      }
      this.adjustSpriteTransform(sprite, scaleX, scaleY, posX, posY, flipped)
    },
    adjustSpriteTransform (sprite, scaleX, scaleY, posX, posY, flipped) {
      sprite.scaleX = scaleX / this.spriteSize / this.spriteScaleFactor
      sprite.scaleY = scaleY / this.spriteSize / this.spriteScaleFactor
      sprite.x = posX
      sprite.y = this.h - posY - this.spriteSize * sprite.scaleY
      if (flipped === true) {
        sprite.scaleX = -sprite.scaleX
      }
    },
    addLabel (spriteNr, labelText, posX, posY) {
      var text = new cjs.Text(labelText, this.textFont, this.textColor)
      text.x = posX
      text.y = this.h - posY - this.spriteSize
      this.stage.addChild(text)
      this.labelMap.set(spriteNr, text)
    },
    updateLabel (spriteNr, labelText, posX, posY) {
      var text = this.labelMap.get(spriteNr)
      text.text = labelText
      text.x = posX
      text.y = this.h - posY - this.spriteSize
    },
    deleteSprite (spriteNr) {
      var sprite = this.spriteMap.get(spriteNr)
      this.stage.removeChild(sprite)
      this.spriteMap.delete(spriteNr)
    },
    deleteLabel (spriteNr) {
      var label = this.labelMap.get(spriteNr)
      this.stage.removeChild(label)
      this.labelMap.delete(spriteNr)
    }

  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="@/assets/css/gameview.css">
</style>
