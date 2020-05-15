/* 封装axios */
import axios from 'axios'
import {
  Message,
  MessageBox
} from 'element-ui'
import store from '@/store'
import {
  getToken,
  removeToken
} from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 5000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  // Do something before request is sent
  // if (store.getters.token) {
  //   config.headers['X-Token'] = getToken() // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
  // }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  //response => response.data,
  /**
   * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
   * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
   */
  response => {
    const res = response.data;
    if (response.config.url == "/UserManage/GetSearchTypes") {
      return res
    }
    if (res.Code !== 1) {
      Message({
        message: res.Msg,
        type: 'error',
        duration: 5 * 1000
      });
      // 2:Token 过期了;
      if (res.Code === 2) {
        MessageBox.confirm('对不起，您的登陆已失效，请重新登陆！', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/logout').then(() => {
            location.reload(); // 为了重新实例化vue-router对象 避免bug
          });
        })
      }
      return Promise.reject('error');
    } else {
      return response.data;
    }
  },
  error => {
    if (error.config.url == '/Home/GetUserMenus') {
      //getmenu登录失效后端redirect /Home/Login
      //proxy拦截不能修改router?
      //router redirect拦截不住
      removeToken('pass-key')
      window.location.href = '#/login'
    } else {
      console.log('err' + error) // for debug
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(error)
    }
  })

export default service
