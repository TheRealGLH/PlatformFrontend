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
  <option v-for="map in maps" :value="map">{{ map }}</option>
</select>

<h3>Current map: {{ mapName }}</h3>
<transition name="fade">
<img id="lobbyMapPreview" :src="mapPreviewURL" @error="mapImageNotFound" :width="previewWidth" :height="previewHeight" :key="lobbyMapPreview"/>
</transition><br/>
<button @click="sendStartGame">Start game</button>
</div>
  </div>
  </div>
</template>

<script>
import websocketStore from '../resources/websocket-store'
export default {
  name: 'ScreenLobby',
  data () {
    return {
      msg: 'In lobby',
      isLobbyLeader: true,
      players: [],
      player: {name: '', number: 0},
      maps: [],
      mapName: '%mapname%',
      mapPreviewDirectory: 'static/mappreview/',
      mapPreviewURL: 'static/mappreview/none.png',
      previewWidth: 300,
      previewHeight: 225
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
        if (parsed.responseMessageType === 'LobbyNameChange') {
          // alert(parsed.names)
          this.clearPlayers()
          parsed.names.forEach(name => this.addPlayer(name))
        } else if (parsed.responseMessageType === 'LobbyMapList') {
          this.maps = parsed.mapNames
        } else if (parsed.responseMessageType === 'LobbyMapChange') {
          this.setMapInfo(parsed.mapName)
        } else if (parsed.responseMessageType === 'NotifyStart') {
          this.$router.push('/game')
        }
      }
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
      // this.setMapInfo(event.target.value)
      this.sendMapChoice(event.target.value)
    },
    sendMapChoice (mapName) {
      websocketStore.commit('sendMessage', '{ messageType: \'MapChange\', mapName: ' + mapName + ' }')
    },
    sendStartGame () {
      websocketStore.commit('sendMessage', '{ messageType: \'StartGame\' }')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="@/assets/css/menu.css">
</style>
