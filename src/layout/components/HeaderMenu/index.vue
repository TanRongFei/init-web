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
    <div v-show="secondRoute && secondRoute.children" class="second-menu">
      <menu2 :route="secondRoute" />
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
  },
  methods: {
    selectRoute(item = null) {
      this.secondRoute = item

      if (!this.secondRoute) {
        this.secondRoute = this.permission_routes.filter(item => {
          return item.path !== '/' && this.$route.path.includes(item.path)
        })[0]
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
