<template>
  <div class="app-wrap">
    <header-menu />

    <div class="main-container" :class="{'full-main': !formatClass}">
      <left-sidebar v-show="formatClass" />
      <tabs-sidebar v-show="isShowTabs" />

      <app-main />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import HeaderMenu from './components/HeaderMenu/index'
import LeftSidebar from './components/HeaderMenu/left-sidebar'
import TabsSidebar from './components/HeaderMenu/tabs-sidebar'
import AppMain from './components/AppMain'

export default {
  name: 'WebsiteLayout',
  components: {
    HeaderMenu,
    LeftSidebar,
    TabsSidebar,
    AppMain
  },
  data() {
    return {
    }
  },
  computed: {
    formatClass() {
      if (this.leftSidebarRouters && this.leftSidebarRouters.children) {
        return this.leftSidebarRouters.children.length
      } else {
        return false
      }
    },
    isShowTabs() {
      if (this.tabsSidebarRouters && this.tabsSidebarRouters.children) {
        return this.tabsSidebarRouters.children.length
      } else {
        return false
      }
    },
    ...mapGetters([
      'leftSidebarRouters',
      'permission_routes',
      'tabsSidebarRouters'
    ])
  }
}
</script>

<style lang="scss" scoped>
  .app-wrap{
    position: relative;
    background-color: #eeeeee;

    .main-container{
      .app-main{
        margin-left: 235px;
        width: inherit;
      }
      &.full-main{
        .app-main{
          margin-left: 0;
        }
      }
    }
  }
</style>
