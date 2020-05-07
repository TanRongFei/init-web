import Cookies from 'js-cookie'

const state = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false
  },
  sidebarMode: 'horizontal', // horizontal 顶部水平模式, vertical 侧边栏模式
  device: 'desktop',
  size: Cookies.get('size') || 'medium',
  childRouters: []
}

const mutations = {
  SET_SIDEBARMODE: (state, sidebarMode) => {
    state.sidebarMode = sidebarMode
  },
  SET_CHILDROUTERS: (state, childRouters) => {
    state.childRouters = childRouters
  },
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  SET_SIZE: (state, size) => {
    state.size = size
    Cookies.set('size', size)
  }
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  setSize({ commit }, size) {
    commit('SET_SIZE', size)
  },
  setChildRouters({ commit }, childRouters) {
    commit('SET_CHILDROUTERS', childRouters)
  },
  setSidebarMode({ commit }, sidebarMode) {
    commit('SET_SIDEBARMODE', sidebarMode)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
