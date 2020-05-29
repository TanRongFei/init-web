import Module from '@/api/factoring/contract'
import CrmModule from '@/api/factoring/crm'

const state = {
  dict: [],
  custList: [],
  province: [],
  area: []
}

const mutations = {
  SET_DICT: (state, dict) => {
    state.dict = dict
  },
  SET_CUSTLIST: (state, custList) => {
    state.custList = custList
  },
  SET_PROVINCE: (state, province) => {
    state.province = province
  },
  SET_AREA: (state, area) => {
    state.area = area
  }
}

const actions = {
  fetchDict({ commit }) {
    Module.dict().then(res => {
      commit('SET_DICT', res)
    })
  },
  fetchCustList({ commit }) {
    debugger
    console.log('fetchCustList')
    Module.custlist.then(res => {
      commit('SET_CUSTLIST', res)
    })
  },
  fetchProvince({ commit }) {
    CrmModule.provinceList().then(res => {
      commit('SET_PROVINCE', res)
    })
  },
  fetchArea({ commit }, pId) {
    return CrmModule.areaList(pId).then(res => {
      commit('SET_AREA', res)
      return res
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
