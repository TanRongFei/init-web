<template>
  <el-form :model="form" label-width="120px" ref="form">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="申请日期" prop="name">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.date" style="width: 100%;"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="授信额度" prop="name">
          <el-input v-model="form.num" type="number"></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="循环授信" prop="name">
          <el-radio-group v-model="form.radio" class="set-sidebar-mode">
            <el-radio :label="1"><span style="font-size: 14px;">是</span></el-radio>
            <el-radio :label="0"><span style="font-size: 14px;">否</span></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="授信开始日" prop="name">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.date" style="width: 100%;"></el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="授信期限" prop="region">
          <el-select v-model="form.region" placeholder="请选择活动区域" style="width:100%;">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="授信截至日" prop="name">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.date" style="width: 100%;"></el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="已占用授信额度" prop="region">
          <el-input v-model="form.num" type="number"></el-input>
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
