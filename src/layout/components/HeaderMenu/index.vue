<template>
  <div class="header-menu">
    <div class="first-menu">
      <div class="left-menu">
        <img src="../../../assets/logo.png" alt="">
      </div>

      <div class="sidebar-menu">
        <sidebar-item
          v-for="route in permission_routes"
          :generation="'first-menu'"
          :key="route.path"
          :index="activeIndexFull"
          :item="route"
          :base-path="route.path"
          @selectedRoute="selectedRoute" />
      </div>

      <div class="right-menu" style="width: 190px;">
        <navbar />
      </div>
    </div>

    <div class="second-menu" v-if="showSecondMenu">
      <div class="sidebar-menu">
        <sidebar-item
          v-for="route in childrenRoutes"
          :generation="'second-menu'"
          :key="route.path"
          :index="activeIndexFull"
          :item="route"
          :base-path="parent.path" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import Navbar from '../Navbar'

export default {
  name: 'Index3',
  components: {
    SidebarItem,
    Navbar
  },
  data() {
    return {
      childrenRoutes: [],
      parent: '',
      showSecondMenu: false,
      activeIndexFull: ''
    }
  },
  computed: {
    formatRoutes() {
      return this.permission_routes.filter(item => !item.hidden)
    },
    ...mapGetters([
      'permission_routes',
      'sidebar'
    ])
  },
  watch: {
    '$route'(n, o) {
      this.activeIndexFull = n.fullPath
    }
  },
  methods: {
    selectedRoute(item) {
      if (!item) {
        this.showSecondMenu = false
        return
      }
      this.showSecondMenu = true
      this.childrenRoutes = item.children
      this.parent = item
    },
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item
          return true
        }
      })

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ... parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    }
  }
}
</script>

<style lang="scss" scoped>
.header-menu{
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}

.sidebar-menu{
  display: flex;
  height: 60px;
  line-height: 60px;
  padding: 0 20px;
  .sidebar-item{
    margin: 0 14px;
    padding: 0 6px;
    cursor: pointer;
  }
  .second-sidebar.sidebar-item{
    padding: 0;
    margin: 0 12px;
    a{
      display: block;
    }
  }
}

.first-menu{
  display: flex;
  flex: 0 0 100%;
  justify-content: space-between;
  background-color: #019fe8;
  color: #ffffff;
  position: relative;
  z-index: 10;
}

.second-menu{
  box-shadow: 0 2px 4px 0 rgba(7, 17, 27, 0.1);
  position: relative;
  z-index: 1;
  .sidebar-menu{
    display: flex;
    justify-content: center;
    height: 50px;
    line-height: 50px;
  }
}

.right-menu{
  height: 100%;
  background-color: #019fe8;
}

.left-menu{
  display: flex;
  align-items: center;
  padding: 0 20px;
  img{
    width: 150px;
  }
}
</style>

<style lang="scss">
  .second-sidebar.sidebar-item{
    a{
      display: block;
    }
  }
</style>
