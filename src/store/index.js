import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage.js'

Vue.use(Vuex)

const TOKEN_KEY = 'TOKEN_USER'

export default new Vuex.Store({
  state: {
    // 一个对象存储当前登录用户信息（token等数据）
    user: getItem(TOKEN_KEY)
  },
  getters: {
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      // 将数据备份到本地存储
      setItem(TOKEN_KEY, state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
