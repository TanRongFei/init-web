<template>
  <div class="basic-info">
    <head-title :label="'基本信息'" :showDefaultButton="showDefaultButton">
      <template slot="after">
        <el-button type="primary" size="mini">保 存</el-button>
        <el-button type="" size="mini">返 回</el-button>
      </template>
    </head-title>

    <el-card shadow="never">
      <form-label :label="'基本信息'" />
      <div class="wrap">
        <baseinfo-form />
      </div>

      <el-tabs v-model="activeName">
        <el-tab-pane label="客户档案" name="first"></el-tab-pane>
      </el-tabs>
      <div class="wrap" style="margin-top: 15px;">
        <el-table border :data="tableData" :show-header="true" style="width: 100%">
          <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
          <el-table-column prop="address" label="资料类型" align="center"></el-table-column>
          <el-table-column prop="address" label="文件列表" align="center"></el-table-column>
          <el-table-column prop="address" label="版本" align="center"></el-table-column>
        </el-table>
      </div>

      <form-label :label="'额度信息'" />
      <div class="wrap">
        <quota-form />
      </div>

      <form-label :label="'额度分配'">
        <template slot="after">
          <el-button type="" icon="el-icon-plus" size="mini"></el-button>
          <el-button type="" icon="el-icon-delete" size="mini"></el-button>
        </template>
      </form-label>
      <div class="wrap">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
          <el-table-column prop="date" label="产品" align="center"></el-table-column>
          <el-table-column prop="name" label="分配额度" align="center"></el-table-column>
          <el-table-column prop="address" label="授信期限" align="center"></el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
import HeadTitle from '@/views/pages/components/head-title'
import FormLabel from '@/views/pages/components/form-label'
import QuotaForm from './components/quota-form'
import BaseinfoForm from './components/baseinfo-form.vue'

export default {
  name: 'BasicInfo',
  components: {
    HeadTitle,
    FormLabel,
    QuotaForm,
    BaseinfoForm
  },
  data() {
    return {
      showDefaultButton: false,
      form: {},
      tableData: [],
      activeName: 'first'
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap{
  margin-bottom: 20px;
}
</style>
