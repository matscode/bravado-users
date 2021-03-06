export const state = () => ({
  userStore: [],
  users: [],
  resultCache: {},
  loadingUsers: true,
})

export const getters = {
  userStore(state) {
    return state.userStore
  },

  users(state, getters) {
    return state.users
  },

  loadingUsers(state, getters) {
    return state.loadingUsers
  },
}

export const mutations = {
  UPDATE_CACHE(state, data) {
    state.resultCache[data.key] = data.users
  },

  SAVE_USERS_TO_STORE(state, users) {
    // console.log(users)
    state.userStore = users
  },

  UPDATE_USERS(state, users) {
    state.users = users
  },

  SET_LOADING(state, isLoading) {
    state.loadingUsers = isLoading
  },
}

export const actions = {
  loadUsers({ commit }) {
    return this.$axios
      .$get('/users.json')
      .then((r) => {
        // const r = r.slice(0, 50)

        commit('SAVE_USERS_TO_STORE', r)
        commit('UPDATE_USERS', r)

        return r
      })
      .catch(() => {
        //  silence
      })
      .finally(() => {
        commit('SET_LOADING', false)
      })
  },

  searchUsers({ commit, state }, payload) {
    if (payload.length > 0) {
      let users = []

      if (state.resultCache[payload]) {
        users = state.resultCache[payload]
      } else {
        users = state.userStore.reduce((users, user) => {
          const email = this.$searchAndHighlight(user.email, payload)
          const name = this.$searchAndHighlight(user.name, payload)
          const title = this.$searchAndHighlight(user.title, payload)
          const city = this.$searchAndHighlight(user.city, payload)

          if (email || name || title || city) {
            users.push({
              ...user,
              email: email || user.email,
              name: name || user.name,
              title: title || user.title,
              city: city || user.city,
            })
          }

          return users
        }, [])

        commit('UPDATE_CACHE', { key: payload, users })
      }

      commit('UPDATE_USERS', users)
    } else {
      commit('UPDATE_USERS', state.userStore)
    }
  },
}
