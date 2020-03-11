<template>
  <div class="hello">
    <h2>{{ msg }}</h2>
      <div class="menu">
      <div class="menuBox">
<h3>Players:</h3>
<ul>
    <li>LOREM</li>
    <li>IPSUM</li>
</ul>

Select map:
 <select id="maps" @change="onMapChange($event)">
  <option value="2fort">2fort</option>
  <option value="battlefield">battlefield</option>
  <option value="de_dust2">de_dust2</option>
  <option value="aswdgwegwg">This map has no preview</option>
</select>

<h3>Current map: {{ mapName }}</h3>
<transition name="fade">
<img id="lobbyMapPreview" :src="mapPreviewURL" @error="mapImageNotFound" :width="previewWidth" :height="previewHeight" :key="lobbyMapPreview"/>
</transition>
<button>Start game</button>
</div>
  </div>
  <button @click="testMapSwitch" disabled>Test mapswitch</button>
  </div>
</template>

<script>
export default {
  name: 'ScreenLobby',
  data () {
    return {
      msg: 'In lobby',
      mapName: '%mapname%',
      mapPreviewDirectory: 'static/mappreview/',
      mapPreviewURL: 'static/mappreview/none.png',
      previewWidth: 300,
      previewHeight: 225
    }
  },
  methods: {
    setMapInfo (mapName) {
      this.mapName = mapName
      this.mapPreviewURL = this.mapPreviewDirectory + this.mapName + '.png'
    },
    mapImageNotFound (event) {
      event.target.src = this.mapPreviewDirectory + 'none.png'
    },
    onMapChange (event) {
      this.setMapInfo(event.target.value)
    },
    testMapSwitch () {
      var name = prompt('Give new name', 'battlefield')
      this.setMapInfo(name)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="@/assets/css/menu.css">
</style>
