import Vue from 'vue'
import Router from 'vue-router'
import ScreenMain from '@/components/ScreenMain'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ScreenMain',
      component: ScreenMain
    }
  ]
})
