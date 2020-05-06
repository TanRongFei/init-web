<template>
  <el-menu
    :default-active="activeIndex2"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    background-color="#ffffff"
    text-color="#545c64"
    active-text-color="#ffd04b">
    <el-menu-item index="1">工作</el-menu-item>
    <el-menu-item index="2">CRM</el-menu-item>
    <el-menu-item index="3">业务</el-menu-item>
    <el-menu-item index="4">应用</el-menu-item>
    <el-menu-item index="5">管理</el-menu-item>
    <el-menu-item index="6">报表</el-menu-item>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ChildMenu',
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    }
  },
  computed: {
    ...mapGetters([
      ''
    ])
  },
  methods: {
    handleSelect(n, v) {
      console.log(n, v)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
