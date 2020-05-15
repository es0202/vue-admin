import request from '@/utils/request'
export function GetSearchTypes() {
  return request({
    url: '/UserManage/GetSearchTypes',
    method: 'post'
  })
}

export function GetUserInfo({
  data,
  header
}) {
  return request({
    url: '/UserManage/GetUserInfo',
    method: 'post',
    data: data,
    headers: header
  })
}
