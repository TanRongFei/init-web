<template>
  <div class="header">
    <div class="head-title">
      <h4>{{ label }}</h4>
      <span v-if="total">共{{ total }}个</span>
    </div>
    <div class="header-edit">
      <slot name="after" />
      <template v-if="showDefaultButton">
        <el-button :disabled="!functions.includes('add')" @click="handleAdd" type="primary" size="mini">添 加</el-button>
        <el-button :disabled="!functions.includes('check')" @click="handleCheck" type="primary" size="mini">查 看</el-button>
        <el-button :disabled="!functions.includes('editor')" @click="handleEditor" type="primary" size="mini">编 辑</el-button>
        <el-button :disabled="!functions.includes('delete')" @click="handleDelete" type="primary" size="mini">删 除</el-button>
        <el-button :disabled="!functions.includes('save')" @click="handleSave" type="primary" size="mini" disabled>保 存</el-button>
        <el-button :disabled="!functions.includes('submit')" type="primary" size="mini">提交流程</el-button>
        <el-button :disabled="!functions.includes('flowPath')" type="primary" size="mini">查看流程</el-button>
        <el-button :disabled="!functions.includes('overprint')" type="primary" size="mini">套 打</el-button>
      </template>
      <slot name="before" />
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
    },
    showDefaultButton: {
      type: Boolean,
      default: true
    },
    functions: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  methods: {
    handleDetail(pathName, item) {
      this.$router.push({ name: pathName, query: item })
      this.$store.dispatch('app/setLeftSidebarRouters', {})
    },
    handleCheck() {
      this.$emit('handleCheck')
    },
    handleEditor() {
      this.$emit('handleEditor')
    },
    handleAdd() {
      this.$emit('handleAdd')
    },
    handleDelete() {
      this.$emit('handleDelete')
    },
    handleSave() {
      this.$emit('handleSave')
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
        font-weight: lighter;
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
