<template>
  <div class="input">
    <h2>{{ msg }}</h2>
    <div class="menu">
        <div class="menuBox">
            <div id="inputJump" :class="jumpClass">jump</div>
            <div id="inputLeft" :class="leftClass">left</div>
            <div id="inputRight" :class="rightClass">right</div>
            <div id="inputShoot" :class="shootClass">shoot</div>
            <div id="inputCrouch" :class="crouchClass">crouch</div>
            Unknown keyCode: <p>{{ unknownKeycode }}</p>
        </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'Input',
  data () {
    return {
      msg: 'Input test',
      notPressedClass: 'inputBox',
      pressedClass: 'pressed',
      jumpClass: 'inputBox',
      leftClass: 'inputBox',
      rightClass: 'inputBox',
      shootClass: 'inputBox',
      crouchClass: 'inputBox',
      unknownKeycode: 'none so far'
    }
  },

  created () {
    window.addEventListener('keyup', this.keyReleased)
    window.addEventListener('keydown', this.keyPressed)
  },

  methods: {
    keyPressed (e) {
      switch (e.keyCode) {
        case 32:
        // space
          this.shootClass = this.pressedClass
          break
        case 65:
        // A
          this.leftClass = this.pressedClass
          break
        case 68:
        // D
          this.rightClass = this.pressedClass
          break
        case 87:
        // W
          this.jumpClass = this.pressedClass
          break
        case 83:
        // S
          this.crouchClass = this.pressedClass
          break
        default:
          this.unknownKeycode = e.keyCode
      }
    },
    // TODO this needs to be a seperate method because you seemingly can't pass parameters to event handlers?????
    keyReleased (e) {
      switch (e.keyCode) {
        case 32:
        // space
          this.shootClass = this.notPressedClass
          break
        case 65:
        // A
          this.leftClass = this.notPressedClass
          break
        case 68:
        // D
          this.rightClass = this.notPressedClass
          break
        case 87:
        // W
          this.jumpClass = this.notPressedClass
          break
        case 83:
        // S
          this.crouchClass = this.notPressedClass
          break
      }
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="@/assets/css/menu.css">
</style>
<style scoped>
.menuBox {
color:black;
}
.inputBox {
width: 50px;
height: 50px;
background-color: gray;
margin: 3px;
}
.pressed {
width: 50px;
height: 50px;
background-color: red;
margin: 3px;
}
</style>
