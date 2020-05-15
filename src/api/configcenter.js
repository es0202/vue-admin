import request from '@/utils/request'

export function SearchVersion(data) {
  return request({
    url: '/ConfigCenter/SearchVersion',
    method: "post",
    data
  })
}

export function GetAppVersion(data){
  return request({
    url:'/ConfigCenter/GetAppVersions',
    method:'post',
    data
  })
}
