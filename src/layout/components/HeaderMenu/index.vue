<template>
  <div class="header-menu">
    <div class="first-menu">
      <div class="left-menu">
        <img src="../../../assets/logo.png" alt="">
      </div>

      <menu1 @selectRoute="selectRoute" />

      <div class="right-menu" style="width: 190px;">
        <navbar />
      </div>
    </div>
    <div v-show="secondRoute && secondRoute.children && secondRoute.children.length > 1" class="second-menu">
      <menu2 :route="secondRoute" @selectRoute="saveRoute" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import menu1 from './menu-1'
import menu2 from './menu-2'
import Navbar from '../Navbar'

export default {
  name: 'Headermenu',
  components: {
    menu1,
    menu2,
    Navbar
  },
  data() {
    return {
      secondRoute: null
    }
  },
  computed: {
    ...mapGetters([
      'permission_routes'
    ])
  },
  created() {
    this.selectRoute()

    /*
   * 页面刷新根据路由筛选侧边导航
   * */
    const arr = this.permission_routes.filter(item => {
      if (this.$route.path.includes(item.path) && item.path !== '/') return item
    })

    if (arr && arr[0] && arr[0].children) {
      const obj = arr[0].children.filter(item => {
        return item.redirect === this.$route.path
      })

      if (obj && obj[0]) this.$store.dispatch('app/setLeftSidebarRouters', { ...obj[0], basePath: this.secondRoute.path })
    }
  },
  methods: {
    selectRoute(item = null) {
      this.secondRoute = item

      if (!this.secondRoute) {
        this.secondRoute = this.permission_routes.filter(item => {
          return item.path !== '/' && this.$route.path.includes(item.path)
        })[0]
      }

      this.saveRoute({})
    },
    saveRoute(item) {
      // 保存侧边导航
      if (item.children) {
        this.$store.dispatch('app/setLeftSidebarRouters', { ...item, basePath: this.secondRoute.path })
      } else {
        this.$store.dispatch('app/setLeftSidebarRouters', {})
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.header-menu{
  display: flex;
  flex-direction: column;
  .first-menu{
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #019fe8;
    color: #ffffff;
    position: relative;
    z-index: 99;
  }

  .second-menu{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    line-height: 50px;
    background: #ffffff;
    position: relative;
    z-index: 9;
    box-shadow: 0 2px 4px 0 rgba(7, 17, 27, 0.1);
  }
}
</style>

<style lang="scss">
  .first-menu{
    .menu-1{
      height: 60px;
      line-height: 60px;
    }
    .menu-item{
      padding:0 15px;
      a{
        display: block;
      }
    }
  }

  .second-menu{
    .menu-item{
      padding:0 10px;
      color: #606266;
    }
  }
</style>
