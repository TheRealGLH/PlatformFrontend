import {shallowMount} from '@vue/test-utils'
import ScreenRegister from '@/components/ScreenRegister.vue'
import WS from 'jest-websocket-mock'


describe('ScreenRegister.vue', () => {
  it('should have empty fields when application starts', () => {
    const wrapper = shallowMount(ScreenRegister)
    expect(wrapper.vm.registerUserName).toBeUndefined()
    expect(wrapper.vm.registerPassword).toBeUndefined()
    expect(wrapper.vm.registerPasswordConfirm).toBeUndefined()
  })
  it('should do stuff with sockets', async () => {
    const wrapper = shallowMount(ScreenRegister)
    //Mock server
    const server = new WS("ws://localhost:8095/platform/")
    //Ver real client
    const client = new WebSocket("ws://localhost:8095/platform/")
    await server.connected
    var username = 'example'
    var password = 'letmein123'
    wrapper.registerUserName = username;
    wrapper.registerPassword = password
    wrapper.vm.sendRegister()
  })
  it('should display error message correctly', () => {
    var errorMessage = 'Here\'s a test message'
    const wrapper = shallowMount(ScreenRegister)
    expect(wrapper.vm.registerMsgCurrentText).toEqual('Insert Error message here')
    wrapper.vm.showErrorMessage(errorMessage)
    expect(wrapper.vm.registerMsgCurrentText).toEqual(errorMessage)
  })
})