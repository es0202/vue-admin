import request from '@/utils/request'
//账密登录
export function login(data) {
  return request({
    url: '/Home/UserLogin',
    method: 'post',
    data
  })
}
//获取菜单
export function getMenu(){
  return request({
    url:'/Home/GetUserMenus',
    method:'post'
  })
}
//登出
export function logout(){
  return request({
    url:'/Home/LoginOut',
    method:'post'
  })
}
