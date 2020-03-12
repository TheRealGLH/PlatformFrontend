<template>
  <div class="hello">
    <h2>{{ msg }}</h2>
      <div class="menu">
      <div class="menuBox">
<h3>Players:</h3>
<ul >
  <li v-for="player in players">{{ player.name }}</li>
</ul>

Select map:
 <select id="maps" @change="onMapChange($event)">
  <option value="placeholder" disabled>Select a map</option>
  <option value="2fort">2fort</option>
  <option value="battlefield">battlefield</option>
  <option value="de_dust2">de_dust2</option>
  <option value="aswdgwegwg">This map has no preview</option>
</select>

<h3>Current map: {{ mapName }}</h3>
<transition name="fade">
<img id="lobbyMapPreview" :src="mapPreviewURL" @error="mapImageNotFound" :width="previewWidth" :height="previewHeight" :key="lobbyMapPreview"/>
</transition><br/>
<button>Start game</button>
</div>
  </div>
  <button @click="testMapSwitch" disabled>Test mapswitch</button>
  <button @click="testPlayerAdd">Test player</button>
  <button @click="clearPlayers">clear players</button>
  </div>
</template>

<script>
export default {
  name: 'ScreenLobby',
  data () {
    return {
      msg: 'In lobby',
      players: [],
      player: {name: '', number: 0},
      mapName: '%mapname%',
      mapPreviewDirectory: 'static/mappreview/',
      mapPreviewURL: 'static/mappreview/none.png',
      previewWidth: 300,
      previewHeight: 225
    }
  },
  mounted: function () {
    this.setMapInfo('2fort')
  },
  methods: {
    // UI methods
    setMapInfo (mapName) {
      this.mapName = mapName
      this.mapPreviewURL = this.mapPreviewDirectory + this.mapName + '.png'
    },
    mapImageNotFound (event) {
      event.target.src = this.mapPreviewDirectory + 'none.png'
    },
    addPlayer (playerName, playerNumber) {
      let newPlayer = {
        name: playerName,
        number: playerNumber
      }
      this.players.push(newPlayer)
    },
    clearPlayers () {
      this.players = []
    },
    // Events
    onMapChange (event) {
      this.setMapInfo(event.target.value)
    },
    // Test methods
    testMapSwitch () {
      var name = prompt('Give new name', 'battlefield')
      this.setMapInfo(name)
    },
    testPlayerAdd () {
      var name = prompt('Give player name', 'Fred')
      var number = prompt('Give player number', '12')
      this.addPlayer(name, number)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="@/assets/css/menu.css">
</style>
