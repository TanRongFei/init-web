import Module from '@/api/factoring/admittance'

const state = {
  dict: []
}

const mutations = {
  SET_DICT: (state, dict) => {
    state.dict = dict
  }
}

const actions = {
  fetchDict({ commit }) {
    console.log('fetchDict')
    Module.listDict().then(res => {
      commit('SET_DICT', res)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
