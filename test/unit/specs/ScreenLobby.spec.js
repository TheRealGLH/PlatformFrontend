import {shallowMount} from '@vue/test-utils'
import ScreenLobby from '@/components/ScreenLobby.vue'

describe('ScreenLobby.vue', () => {
  it('should add players properly', () => {
    const wrapper = shallowMount(ScreenLobby)
    const vm = wrapper.vm
    var playerName = 'Mr Test'
    var playerNr = 1
    expect(vm.players.length).toEqual(0)
    vm.addPlayer(playerName, playerNr)
    expect(vm.players[0].name).toEqual(playerName)
    expect(vm.players[0].number).toEqual(playerNr)
    playerName = 'Mrs Test'
    playerNr++
    vm.addPlayer(playerName, playerNr)
    expect(vm.players[1].name).toEqual(playerName)
    expect(vm.players[1].number).toEqual(playerNr)
    
  })
  it('should clear players properly', () => {
    const wrapper = shallowMount(ScreenLobby)
    const vm = wrapper.vm
    var playerName = 'Mr Test'
    var playerNr = 1
    expect(vm.players.length).toEqual(0)
    vm.addPlayer(playerName, playerNr)
    expect(vm.players[0].name).toEqual(playerName)
    expect(vm.players[0].number).toEqual(playerNr)
    expect(vm.players.length).not.toEqual(0)
    vm.clearPlayers()
    expect(vm.players.length).toEqual(0)
  })
  it('should change map image properly', () => {
    const wrapper = shallowMount(ScreenLobby)
    const vm = wrapper.vm
    var mapName = 'de_dust'
    vm.setMapInfo(mapName)
    expect(vm.mapName).toEqual(mapName)
    expect(vm.mapPreviewURL).toEqual('static/mappreview/' + mapName + '.png')
  })
})