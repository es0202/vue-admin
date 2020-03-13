// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Element from 'element-ui'
import Cookies from 'js-cookie'
import SvgIcon from '@/components/SvgIcon'// svg component
import 'element-ui/lib/theme-chalk/index.css'

// 注册全局组件
Vue.component('svg-icon', SvgIcon)

//webpack 动态加载文件
//require.context(搜素目录，是否搜素子目录，匹配文件的正则)
const req = require.context('./icons', true, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)


Vue.config.productionTip = false

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
