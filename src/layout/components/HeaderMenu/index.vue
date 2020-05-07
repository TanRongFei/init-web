<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    :background-color="backgroundColor"
    :text-color="textColor"
    :active-text-color="activeTextColor">
    <el-menu-item :index="item.path" v-for="item in routes" :key="item.path">{{item.name}}</el-menu-item>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import { isExternal } from '@/utils/validate'
import path from 'path'

export default {
  name: 'HeaderMenu',
  props: {
    backgroundColor: {
      type: String,
      default: '#545c64'
    },
    textColor: {
      type: String,
      default: '#ffffff'
    },
    activeTextColor: {
      type: String,
      default: '#ffd04b'
    },
    saveChildRouters: {
      type: Boolean,
      default: false
    },
    routes: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      activeIndex: ''
    }
  },
  computed: {
    ...mapGetters([
      'permission_routes'
    ])
  },
  created() {
    console.log(this.$route)
    console.log(this.permission_routes)
    console.log('routes', this.routes)
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
      const childRouters = this.routes
        .filter(item => item.path === key)
        .map(item => {
          return item
        })[0]

      if (this.saveChildRouters && childRouters.children && childRouters.children.length > 1) {
        this.$store.dispatch('app/setChildRouters', childRouters.children)
      } else if (this.saveChildRouters) {
        this.$store.dispatch('app/setChildRouters', [])
      }

      console.log(childRouters)

      if (childRouters && childRouters.children && childRouters.children.length) {
        this.$router.push(childRouters.children[0].fullPath)
        this.activeIndex = childRouters.children[0].fullPath
      } else {
        this.$router.push(childRouters.path)
        this.activeIndex = childRouters.path
      }
      console.log(this.activeIndex, typeof this.activeIndex)
    },
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-menu-demo{
    &.el-menu.el-menu--horizontal{
      border: none;
    }
  }
</style>
