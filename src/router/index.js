import Vue from 'vue'
import Router from 'vue-router'
import ScreenMain from '@/components/ScreenMain'
import ScreenPlaceholder from '@/components/ScreenPlaceholder'
import ScreenLogin from '@/components/ScreenLogin'
import ScreenRegister from '@/components/ScreenRegister'
import ScreenGame from '@/components/ScreenGame'
import ScreenLobby from '@/components/ScreenLobby'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ScreenMain',
      component: ScreenMain
    },
    {
      path: '/placeholder',
      name: 'ScreenPlaceholder',
      component: ScreenPlaceholder
    },
    {
      path: '/login',
      name: 'ScreenLogin',
      component: ScreenLogin
    },
    {
      path: '/register',
      name: 'ScreenRegister',
      component: ScreenRegister
    },
    {
      path: '/game',
      name: 'ScreenGame',
      component: ScreenGame
    },
    {
      path: '/lobby',
      name: 'ScreenLobby',
      component: ScreenLobby
    }
  ]
})
