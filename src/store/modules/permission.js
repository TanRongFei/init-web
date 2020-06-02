import { asyncRoutes, constantRoutes } from '@/router'
import store from '@/store'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}
/**
 * 过滤左侧路由导航
 * **/
function hasLeftSideRoute(router, fullPath) {
  if (!router.children) return

  const arr = fullPath.split('/')
  let fullPathName = ''
  if (arr && arr.length) {
    fullPathName = arr[arr.length - 1]
  }

  let child = null
  router.children.forEach(item => {
    if (item.path === fullPathName && fullPath.includes(item.leftSidebar)) {
      child = item
    }
  })

  if (router.leftSidebar
    && fullPath.includes(router.leftSidebar)
    && fullPathName
    && child
    && child.leftSidebar
    && fullPathName === child.path) {
    return router
  } else {
    return false
  }
}

/**
 * 过滤tabs路由导航
 * tabs需要额外添加activeName(选中状态)
 * **/
function hasTabsSideRoute(router, fullPath) {
  if (!router.children) return

  const arr = fullPath.split('/')
  let fullPathName = ''
  if (arr && arr.length) {
    fullPathName = arr[arr.length - 1]
  }

  let child = null
  router.children.forEach(item => {
    if (item.path === fullPathName && fullPath.includes(item.tabsSidebar)) {
      child = item
    }
  })

  if (router.tabsSidebar
    && fullPath.includes(router.tabsSidebar)
    && fullPathName
    && child
    && child.tabsSidebar
    && fullPathName === child.path) {
    return router
  } else {
    return false
  }
}
/**
 * 添加左侧路由导航
 * 添加tabs路由导航
 * **/
function addLefeSidebar(routers, fullPath) {
  routers.forEach(item => {
    if (hasLeftSideRoute(item, fullPath)) {
      const tem = {
        basePath: item.path,
        ...item
      }

      store.dispatch('permission/addLeftSidebarRouters', tem)
    } else if (!item.hidden && item.children) {
      addLefeSidebar(item.children, fullPath)
    }

    if (hasTabsSideRoute(item, fullPath)) {
      const router = {
        basePath: item.path,
        ...item
      }

      store.dispatch('permission/addTabsSidebarRouters', {router, fullPath})
    } else if (!item.hidden && item.children) {
      addLefeSidebar(item.children, fullPath)
    }
  })
}

const state = {
  routes: constantRoutes,
  addRoutes: [],
  leftSidebarRouters: {},
  tabsSidebarRouters: {},
  tabsActiveName: ''
}

const mutations = {
  SET_TABS_AVTIVENAME: (state, tabsActiveName) => {
    state.tabsActiveName = tabsActiveName
  },
  SET_CHILDROUTERS: (state, leftSidebarRouters) => {
    state.leftSidebarRouters = leftSidebarRouters
  },
  SET_TABS_SIDEBAR: (state, tabsSidebarRouters) => {
    state.tabsSidebarRouters = tabsSidebarRouters
  },
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes || []
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  },
  setLeftSidebarRouters({ commit, state }, fullPath) {
    /**
    * 设置左侧路由列表、tabs路由列表
     * 先置空
     * 判断是否有左侧路由列表，有就添加
    * */
    commit('SET_CHILDROUTERS', null)
    commit('SET_TABS_SIDEBAR', null)

    addLefeSidebar(state.routes, fullPath)
  },
  addLeftSidebarRouters({ commit }, router) {
    /**
     * 添加左侧路由列表
     * **/

    commit('SET_CHILDROUTERS', router)
  },
  addTabsSidebarRouters({ commit }, {router, fullPath}) {
    // 添加tabs路由列表
    commit('SET_TABS_SIDEBAR', router)

    // tabs需要额外添加activeName(选中状态)
    const path = fullPath.split('/')
    const activeName = path[path.length - 1]
    commit('SET_TABS_AVTIVENAME', activeName)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
