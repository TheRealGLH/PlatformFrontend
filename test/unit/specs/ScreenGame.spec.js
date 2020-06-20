import {shallowMount} from '@vue/test-utils'
import ScreenGame from '@/components/ScreenGame.vue'

describe('ScreenGame.vue', () => {
  it('should add sprites properly', () => {
    const wrapper = shallowMount(ScreenGame)
    const vm = wrapper.vm
    var id = 1;
    var xPos = 1;
    var yPos = 2;
    var xScale = 1;
    var yScale = 2;
    vm.addSprite(id, 'PLAYER', xPos, yPos, xScale, yScale, false)
    var sprite = vm.spriteMap.get(id)
    expect(sprite).toBeDefined()
    //Check position. Y pos is altered because Y0 is the bottom in game data, but the top of the screen.
    expect(sprite.x).toEqual(xPos)
    expect(sprite.y).toEqual(vm.h - yPos - vm.spriteSize * sprite.scaleY)
    //Check scale, size is adjusted for screen size and size of the images
    expect(sprite.scaleX).toEqual(xScale / vm.spriteSize / vm.spriteScaleFactor)
    expect(sprite.scaleY).toEqual(yScale / vm.spriteSize / vm.spriteScaleFactor)
  })
  it('should update sprites properly', () => {
    const wrapper = shallowMount(ScreenGame)
    const vm = wrapper.vm
    var anim = 'PLAYER'
    var id = 1;
    var xPos = 1;
    var yPos = 2;
    var xScale = 1;
    var yScale = 2;
    
    var posUpdateFactor = 3;
    var scaleUpdateFactor = 4;
    var animUpdate = 'PLATFORM'
    vm.addSprite(id, 'PLAYER', xPos, yPos, xScale, yScale, false)
    vm.updateSprite(id, animUpdate, xPos * posUpdateFactor, yPos * posUpdateFactor, xScale * scaleUpdateFactor, yScale * scaleUpdateFactor, true)
    var sprite = vm.spriteMap.get(id)
    expect(sprite).toBeDefined()
    //Check position. X pos is altered because it's flipped. Y pos is altered because Y0 is the bottom in game data, but the top of the screen.
    expect(sprite.x).toEqual(xPos * posUpdateFactor - sprite.scaleX * vm.spriteSize)
    expect(sprite.y).toEqual(vm.h - yPos * posUpdateFactor - vm.spriteSize * sprite.scaleY)
    //Check scale, size is adjusted for screen size and size of the images
    expect(sprite.scaleX).toEqual(-xScale * scaleUpdateFactor / vm.spriteSize / vm.spriteScaleFactor)
    expect(sprite.scaleY).toEqual(yScale * scaleUpdateFactor / vm.spriteSize / vm.spriteScaleFactor)
  })
  it('should update sprites properly', () => {
    const wrapper = shallowMount(ScreenGame)
    const vm = wrapper.vm
    var anim = 'PLAYER'
    var id = 1;
    var xPos = 1;
    var yPos = 2;
    var xScale = 1;
    var yScale = 2;
    
    vm.addSprite(id, 'PLAYER', xPos, yPos, xScale, yScale, false)
    var sprite = vm.spriteMap.get(id)
    expect(sprite).toBeDefined()
    vm.deleteSprite(id)
    sprite = vm.spriteMap.get(id)
    expect(sprite).toBeUndefined()
  })

})