<template>
  <div class="tabs-sidebar">
    <div class="title">
      <span>查看详情</span>
      <el-button type="primary" size="mini" @click="$router.back()">返回</el-button>
    </div>
    <div class="tab-menu">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane :label="item.meta.title" :name="item.path" v-for="item in formatRoutes" />
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { isExternal } from '@/utils/validate'
import path from 'path'

export default {
  name: 'TabsSidebar',
  computed: {
    formatRoutes() {
      if (this.tabsSidebarRouters && this.tabsSidebarRouters.children) {
        return this.tabsSidebarRouters.children.filter(item => !item.hidden)
      }
    },
    ...mapGetters([
      'tabsSidebarRouters',
      'tabsActiveName'
    ])
  },
  data() {
    return {
      activeName: ''
    }
  },
  watch: {
    tabsActiveName(n) {
      if (n) {
        this.activeName = n
      }
    }
  },
  created() {
    const path = this.$route.fullPath.split('/')
    this.activeName = path[path.length - 1]
  },
  methods: {
    handleClick(tab, e) {
      const route = this.formatRoutes[tab.index]
      let path = ''
      if (route && route.tabsSidebar && route.path) {
        this.activeName = route.path

        path = this.resolvePath(route.tabsSidebar, route.path)
        this.$router.push({ path })
      }
    },
    resolvePath(basePath, routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(basePath)) {
        return basePath
      }

      return path.resolve(basePath, routePath)
    }
  }
}
</script>

<style lang="scss" scoped>
  .tabs-sidebar{
    background-color: #ffffff;
    border: 1px solid #E4E7ED;
    border-bottom: none;
    margin: 15px 15px 0;
    .title{
      display: flex;
      justify-content: space-between;
      padding: 20px 25px 5px;
      span{
        display: inline-block;
        margin: 0;
        font-weight: normal;
        font-size: 26px;
        line-height: 1;
        color: #333;
      }
    }
    .tags{
      display: flex;
      justify-content: space-between;
      padding: 10px 25px;
      .item{
        height: 30px;
        line-height: 30px;
      }
    }
  }
</style>
