import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import App from '@/App.vue'

Vue.use(Router)

export default new Router({
  // mode:'history',
  routes: [{
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      component: () => import('@/views/login/index'),
      hidden: true
    }, {
      path: '/',
      redirect: '/UserManage/UserList',
    }, {
      path: '/UserManage',
      component: () => import('@/views/layout/index'),
      children: [{
        path:'',
        redirect:'UserList'
      },{
        path: 'UserList',
        component: () => import('@/views/userlist/index')
      }]
    }
  ]
})
