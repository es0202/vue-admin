import router from './router'
import Cookie from 'js-cookie'
//router为login死循环
const whiteList = ['/login']

router.beforeEach((to, from, next) => {
  if (!Cookie.get('pass-key')) {
    //未登录
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      next({
        path: '/login'
      })
    }
  } else {
    next()
  }

})

router.afterEach(route => {

})
