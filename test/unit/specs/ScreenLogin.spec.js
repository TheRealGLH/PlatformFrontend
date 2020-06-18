import {shallowMount} from '@vue/test-utils'
import ScreenLogin from '@/components/ScreenLogin.vue'


describe('ScreenLogin.vue', () => {
  it('should have empty fields', () => {
    const wrapper = shallowMount(ScreenLogin)
    expect(wrapper.loginUserName).toBeUndefined()
    expect(wrapper.loginPassword).toBeUndefined()
  })
})