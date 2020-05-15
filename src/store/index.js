import Vuex from 'vuex'
import Vue from 'vue'
import User from './modules/user.js'
Vue.use(Vuex)

const getters = {
  token: state => state.user.token,
  username: state => state.user.username
}

const store = new Vuex.Store({
  modules: {
    user: User
  },
  getters
})

export default store
