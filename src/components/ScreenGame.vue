<template>
  <div class="hello">
    <h2>{{ msg }}</h2>

<canvas id="gamePane" ref="gamePane"></canvas>
<br/><button @click="addSprite">Add Sprite</button>
  </div>
</template>

<script>
import * as cjs from '@createjs/easeljs'

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'In game...'
    }
  },
  mounted () {
    this.stage = new cjs.Stage(this.$refs.gamePane)
    cjs.Ticker.addEventListener('tick', this.stage)
  },
  methods: {
    addSprite () {
      var newText = new cjs.Text('Hello World')
      newText.x = 32
      newText.y = 32
      this.stage.addChild(newText)
    }

  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="@/assets/css/gameview.css">
</style>
