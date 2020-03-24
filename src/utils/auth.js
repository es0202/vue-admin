import Cookies from 'js-cookie'

const key = "pass-key"
export function getToken() {
  return Cookies.get(key)
}

export function setToken(value) {
  return Cookies.set(key, value)
}

export function removeToken(value){
  return Cookies.remove(key)
}
