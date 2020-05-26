<template>
  <el-form :model="form" label-width="120px" ref="form">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="产品类型" prop="name">
          <el-radio-group v-model="form.radio" class="set-sidebar-mode">
            <el-radio :label="1"><span style="font-size: 14px;">正向保理</span></el-radio>
            <el-radio :label="0"><span style="font-size: 14px;">反向保理</span></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="业务类型" prop="name">
          <el-radio-group v-model="form.radio" class="set-sidebar-mode">
            <el-radio :label="1"><span style="font-size: 14px;">应收账款</span></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="业务区域" prop="name">
          <el-radio-group v-model="form.radio" class="set-sidebar-mode">
            <el-radio :label="1"><span style="font-size: 14px;">国内</span></el-radio>
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
      <el-col :span="12">
        <el-form-item label="有无追索权" prop="region">
          <el-radio-group v-model="form.radio" class="set-sidebar-mode">
            <el-radio :label="1"><span style="font-size: 14px;">有追</span></el-radio>
            <el-radio :label="0"><span style="font-size: 14px;">无追</span></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="保理商数量" prop="name">
          <el-radio-group v-model="form.radio" class="set-sidebar-mode">
            <el-radio :label="1"><span style="font-size: 14px;">单保理</span></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="管理模式" prop="region">
          <el-radio-group v-model="form.radio" class="set-sidebar-mode">
            <el-radio :label="1"><span style="font-size: 14px;">单笔保理</span></el-radio>
            <el-radio :label="0"><span style="font-size: 14px;">框架保理</span></el-radio>
            <el-radio :label="3"><span style="font-size: 14px;">池保理</span></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
  export default {
    name: 'ProductsForm',
    data() {
      return {
        form: {}
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
