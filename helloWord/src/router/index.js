import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import tuodong from '@/components/tuodong'
import flexBox from '@/components/flexbox'
import shoufengqin from '@/components/shoufengqin'
import sync from '@/components/sync'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/tuodong',
      name: 'tuodong',
      component: tuodong
    },
    {
      path: '/flexBox',
      name: 'flexBox',
      component: flexBox
    },
    {
      path: '/shoufengqin',
      name: 'shoufengqin',
      component: shoufengqin
    },
    {
      path: '/sync',
      name: 'sync',
      component: sync
    }
  ]
})
