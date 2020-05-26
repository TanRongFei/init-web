<template>
  <div class="label">
    <div class="label-wrap">
      <span class="label-header">{{label}}</span>
      <div>
        <slot name="after"></slot>
      </div>
    </div>
<!--    <el-divider></el-divider>-->
  </div>
</template>

<script>
export default {
  name: 'FormLabel',
  props: ['label']
}
</script>

<style lang="scss" scoped>
.label{
  border-bottom: 1px solid #DCDFE6;
  margin-bottom: 15px;
  padding: 5px 0;
  .label-wrap{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .label-header{
    font-weight: 600;
    font-size: 15px;
    color: #333;
    line-height: 32px;
    padding-top: 4px;
  }
}
</style>
