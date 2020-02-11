import Vue from 'vue'
import Router from 'vue-router'
import ScreenMain from '@/components/ScreenMain'
import ScreenPlaceholder from '@/components/ScreenPlaceholder'
import ScreenLogin from '@/components/ScreenLogin'

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
    }
  ]
})
