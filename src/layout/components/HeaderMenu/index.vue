<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    :background-color="backgroundColor"
    :text-color="textColor"
    :active-text-color="activeTextColor">
    <el-menu-item :index="resolvePath(item.path)" v-for="(item, index) in routes" :key="index">{{item.name}}</el-menu-item>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import { isExternal } from '@/utils/validate'
import path from 'path'

export default {
  name: 'HeaderMenu',
  props: {
    saveChildRouters: {
      type: String,
      default: 'aa'
    },
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
    routes: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      activeIndex: '0'
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
  mounted() {
    setTimeout(function() {
      this.activeIndex = '1'
    }.bind(this), 1000)
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
      const childRouters = this.routes
        .filter(item => item.path === key)
        .map(item => {
          return item
        })[0]

      console.log('childRouters', this.saveChildRouters)
      if (this.saveChildRouters && childRouters.children && childRouters.children.length > 1) {
        this.$store.dispatch('app/setChildRouters', childRouters.children)
      }

      console.log(childRouters)

      if (childRouters.children && childRouters.children.length === 1) {
        this.$router.push(childRouters.children[0].path)
      }
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
