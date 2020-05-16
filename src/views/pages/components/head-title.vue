<template>
  <div class="header">
    <div class="head-title">
      <h4>{{ label }}</h4>
      <span>共{{ total }}个</span>
    </div>
    <div class="header-edit">
      <el-button type="primary" size="mini">添 加</el-button>
      <el-button type="primary" size="mini">查 看</el-button>
      <el-button type="primary" size="mini">编 辑</el-button>
      <el-button type="primary" size="mini">删 除</el-button>
      <el-button type="primary" size="mini" disabled>保 存</el-button>
      <el-button type="primary" size="mini" disabled>提交流程</el-button>
      <el-button type="primary" size="mini" disabled>查看流程</el-button>
      <el-button type="primary" size="mini" disabled>套 打</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeadTitle',
  props: {
    label: {
      type: String,
      default: ''
    },
    total: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style scoped lang="scss">
  .header{
    display: flex;
    justify-content: space-between;
    .head-title{
      display: flex;
      align-items: center;
      margin-bottom: 12px;
      h4{
        margin: 0;
        font-size: 20px;
        color: #414141;
        line-height: 35px;
        font-weight: normal;
      }
      span{
        margin-left: 10px;
        color: #999;
        font-size: 14px;
        line-height: 35px;
      }
    }
  }
</style>
