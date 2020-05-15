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
    },
    {
      path: '/',
      redirect: '/UserManage/UserList',
    },
    {
      path: '/UserManage',
      component: () => import('@/views/layout/index'),
      meta: {
        title: '通行证管理'
      },
      children: [{
        path: '',
        redirect: 'UserList'
      }, {
        path: 'UserList',
        component: () => import('@/views/usermanage/userlist'),
        meta: {
          title: '通行证账号管理'
        }
      }]
    },
    {
      path: '/ConfigCenter',
      component: () => import('@/views/layout/index'),
      meta: {
        title: '配置中心'
      },
      children: [{
        path: '',
        redirect: 'VersionManage'
      }, {
        path: 'VersionManage',
        component: () => import('@/views/configcenter/versionmanage'),
        meta:{
          title:"版本管理"
        }
      }]
    }
  ]
})
