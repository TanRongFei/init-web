<template>
  <el-form :rules="rules" :model="form" label-width="120px" ref="form">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="协议编号" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="流水号" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="客户名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="客户档案" prop="region">
          <el-select v-model="form.region" placeholder="请选择活动区域" style="width:100%;">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="归属集团" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="客户经理" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="客户经理等级" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import rules from '@/views/mixins/rules'

export default {
  name: 'BaseinfoForm',
  mixins: [rules],
  data() {
    return {
      form: {}
    }
  },
  created() {
    console.log(this)
  }
}
</script>

<style scoped>

</style>
