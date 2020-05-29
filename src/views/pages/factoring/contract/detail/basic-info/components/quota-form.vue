<template>
  <el-form :model="form" label-width="120px" :label-position="'left'" ref="form">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="有无追索权" prop="name">
          <el-radio-group v-model="form.radio" class="set-sidebar-mode">
            <el-radio :label="1"><span style="font-size: 14px;">是</span></el-radio>
            <el-radio :label="0"><span style="font-size: 14px;">否</span></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="保理方式" prop="name">
          <el-radio-group v-model="form.radio" class="set-sidebar-mode">
            <el-radio :label="1"><span style="font-size: 14px;">明保理</span></el-radio>
            <el-radio :label="0"><span style="font-size: 14px;">暗保理</span></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="24">
        <el-checkbox-group v-model="form.checkList">
          <el-checkbox label="1">资料是否交接</el-checkbox>
          <el-checkbox label="2">是否单笔保理</el-checkbox>
        </el-checkbox-group>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="产品名称" prop="name">
          <span>1</span>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
export default {
  name: 'QuotaForm',
  data() {
    return {
      form: {
        checkList: []
      }
    }
  }
}
</script>

<style lang="scss">
.el-form-item__content{
  display: flex;
  align-items: center;
  height: 36px;

  .el-radio__label{
    display: flex;
  }
}
</style>
