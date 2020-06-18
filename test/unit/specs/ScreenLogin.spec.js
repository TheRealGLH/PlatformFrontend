import {shallowMount} from '@vue/test-utils'
import ScreenLogin from '@/components/ScreenLogin.vue'
import WS from 'jest-websocket-mock'


describe('ScreenLogin.vue', () => {
  it('should have empty fields when application starts', () => {
    const wrapper = shallowMount(ScreenLogin)
    expect(wrapper.loginUserName).toBeUndefined()
    expect(wrapper.loginPassword).toBeUndefined()
  })
  it('should do stuff with sockets', async () => {
    const wrapper = shallowMount(ScreenLogin)
    //Mock server
    const server = new WS("ws://localhost:8095/platform/")
    //Ver real client
    const client = new WebSocket("ws://localhost:8095/platform/")
    await server.connected
    var username = 'example'
    var password = 'letmein123'
    wrapper.loginUserName = username;
    wrapper.loginPassword = password
    wrapper.vm.sendLogin()
    //await expect(server).toReceiveMessage("{ messageType: 'Login', name: '" + username + "', password: '" + password + "' }")
    //await expect(server).toReceiveMessage("hello")
    expect(server).toHaveReceivedMessages(['{ messageType: \'Login\', name: \'' + username + '\', password: \'' + password + '\' }'])
  })
})