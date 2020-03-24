import {
  getToken,
  setToken,
  removeToken
} from '@/utils/auth'
import {
  login,
  logout
} from '@/api/user'
import {
  hex_md5
} from '@/utils/md5.js'

const state = {
  //后端写的cookie httponly前端无法读取
  token: getToken()
}
const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
  }
}
const actions = {
  login({
    commit
  }, userInfo) {
    const {
      username,
      password
    } = userInfo;
    return new Promise((resolve, reject) => {
      login({
        account: username,
        password: hex_md5(password)
      }).then(res => {
        commit('SET_TOKEN', username)
        setToken(username)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },

  logout({
    commit,
    state,
    dispatch
  }) {
    logout().then(res => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  }
}
export default {
  namespaced: true, //调用路径以“user/”开头
  state,
  mutations,
  actions
}
