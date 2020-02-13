<template>
  <div class="hello">
    <h2>{{ msg }}</h2>
<div id="gamePane" ref="gamePane">

</div>
  </div>
</template>

<script>
import * as PIXI from 'pixi.js'
import Vue from 'vue'
export default {
  name: 'Game',
  data () {
    return {
      msg: 'In game...',
      // These need to be contained in an object because providers are not reactive.
      PIXIWrapper: {
        // Expose PIXI and the created app to all descendants.
        PIXI,
        PIXIApp: null
      },
      // Expose the event bus to all descendants so they can listen for the app-ready event.
      EventBus: new Vue()
    }
  },
  // Allows descendants to inject everything.
  provide () {
    return {
      PIXIWrapper: this.PIXIWrapper,
      EventBus: this.EventBus
    }
  },

  mounted () {
    // Determine the width and height of the renderer wrapper element.
    const renderCanvas = this.$refs.gamePane
    const w = renderCanvas.offsetWidth
    const h = renderCanvas.offsetHeight

    // Create a new PIXI app.
    this.PIXIWrapper.PIXIApp = new PIXI.Application(w, h, {
      view: renderCanvas,
      backgroundColor: 0x000000
    })
    renderCanvas.appendChild(this.PIXIWrapper.PIXIApp.view)

    this.EventBus.$emit('ready')
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="@/assets/css/gameview.css">
</style>
