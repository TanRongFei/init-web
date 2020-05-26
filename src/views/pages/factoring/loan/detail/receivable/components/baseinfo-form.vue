<template>
  <el-form :rules="rules" :model="form" label-width="155px" :label-position="'left'" ref="form">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="申请日期">
          <el-date-picker
            v-model="form.signatureTime"
            style="width: 100%;"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="还款日期" >
          <el-date-picker
            v-model="form.repoTime"
            style="width: 100%;"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="申请金额">
          <el-input v-model="form.contractArea1"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="融资成数" >
          <el-input v-model="form.contractArea1" disabled>
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="应收账款类型">
          <el-select v-model="form.contPmId" placeholder="请选择" style="width:100%;">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-checkbox v-model="form.checked">特殊放款</el-checkbox>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import rules from '@/views/mixins/rules'

export default {
  name: 'BaseinfoForm',
  mixins: [rules],
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      form: {}
    }
  },
  created() {
    this.form = JSON.parse(JSON.stringify(this.data))
    console.log(this.form)
  }
}
</script>

<style scoped>

</style>
