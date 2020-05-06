<template>
  <div class="topbar">
    <div class="header-menu">
      <div class="left-menu"></div>

      <header-menu :routes="routes" />

      <div class="right-menu">
        <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
          <div class="avatar-wrapper">
            <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
            <i class="el-icon-caret-bottom" />
          </div>
          <el-dropdown-menu slot="dropdown">
            <router-link to="/profile/index">
              <el-dropdown-item>Profile</el-dropdown-item>
            </router-link>
            <router-link to="/">
              <el-dropdown-item>Dashboard</el-dropdown-item>
            </router-link>
            <a target="_blank" href="https://github.com/PanJiaChen/vue-element-admin/">
              <el-dropdown-item>Github</el-dropdown-item>
            </a>
            <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">
              <el-dropdown-item>Docs</el-dropdown-item>
            </a>
            <el-dropdown-item divided @click.native="logout">
              <span style="display:block;">Log Out</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>

    <div class="child-menu ">
      <header-menu
        :saveChildRouters="saveChildRouters"
        :routes="childRouters"
        :backgroundColor="'#ffffff'"
        :textColor="'#545c64'"
        :activeTextColor="'#ffd04b'"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import HeaderMenu from './HeaderMenu'

export default {
  components: {
    HeaderMenu
  },
  data() {
    return {
      saveChildRouters: 'true'
    }
  },
  computed: {
    routes() {
      return this.permission_routes
        .filter(item => !item.hidden)
        .map(item => {
          if (item.children && item.children.length === 1) {
            item.name = item.children[0].name
          }
          return this.formatPath(item)
        })
    },
    ...mapGetters([
      'sidebar',
      'avatar',
      'device',
      'permission_routes',
      'childRouters'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    formatPath(obj) {
      if (obj.children && obj.children.length) {
        obj.children.map(item => {
          item.path = `${obj.path}/${item.path}`
          this.formatPath(item)
        })
      }
      return obj
    }
  }
}
</script>

<style lang="scss" scoped>
  .header-menu, .child-menu {
    display: flex;
    justify-content: space-between;
    background-color: #545c64;
    color: #ffffff;
    border-bottom-color: transparent;

    .left-menu {
      min-width: 100px;
    }

    .right-menu {
      display: flex;
      height: 60px;
      min-width: 100px;
      justify-content: center;
      align-items: center;
      float: right;

      &:focus {
        outline: none;
      }

      .right-menu-item {
        display: inline-block;
        padding: 0 8px;
        height: 100%;
        font-size: 18px;
        color: #5a5e66;
        vertical-align: text-bottom;

        &.hover-effect {
          cursor: pointer;
          transition: background .3s;

          &:hover {
            background: rgba(0, 0, 0, .025)
          }
        }
      }

      .avatar-container {
        display: flex;
        align-items: center;
        margin-right: 30px;

        .avatar-wrapper {
          margin-top: 5px;
          position: relative;

          .user-avatar {
            cursor: pointer;
            width: 40px;
            height: 40px;
            border-radius: 10px;
          }

          .el-icon-caret-bottom {
            cursor: pointer;
            position: absolute;
            right: -20px;
            top: 16px;
            font-size: 12px;
            color: #ffffff;
          }
        }
      }
    }
  }
  .child-menu{
    background-color: #ffffff;
    justify-content: center;
  }
</style>
