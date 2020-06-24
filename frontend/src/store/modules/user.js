import storage from 'store'
import { login, getInfo, logout } from '@/api/login'
import { ACCESS_TOKEN, ACCESS_NAME } from '@/store/mutation-types'
import { welcome } from '@/utils/util'

const user = {
  state: {
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    roles: [],
    info: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    }
  },

  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          // 修改一下，因为我们后台返回的是access_token
          storage.set(ACCESS_TOKEN, response.access_token, 7 * 24 * 60 * 60 * 1000)
          storage.remove(ACCESS_NAME)
          commit('SET_TOKEN', response.access_token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          storage.set(ACCESS_NAME, response.name, 7 * 24 * 60 * 60 * 1000)
          commit('SET_NAME', { name: response.name, welcome: welcome() })
          commit('SET_AVATAR', response.avatar)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    Logout ({ commit, state }) {
      return new Promise((resolve) => {
        logout(state.token).then(() => {
          resolve()
        }).catch(() => {
          resolve()
        }).finally(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          storage.remove(ACCESS_TOKEN)
          storage.remove(ACCESS_NAME)
        })
      })
    }

  }
}

export default user
