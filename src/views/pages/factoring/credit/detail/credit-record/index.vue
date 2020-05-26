<template>
  <div class="basic-info">
    <head-title :label="'基本信息'" :showDefaultButton="showDefaultButton">
      <template slot="after">
        <el-button type="primary" size="mini">保 存</el-button>
        <el-button type="" size="mini">返 回</el-button>
      </template>
    </head-title>

    <el-card shadow="never">
      <form-label :label="'额度分配'">
        <template slot="after">
          <el-button type="" icon="el-icon-plus" size="mini"></el-button>
          <el-button type="" icon="el-icon-delete" size="mini"></el-button>
        </template>
      </form-label>
      <div class="wrap">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column type="index" label="序号" width="50" align="center" />
          <el-table-column prop="date" label="申请日期" align="center" />
          <el-table-column prop="name" label="授信编号" align="center"></el-table-column>
          <el-table-column prop="address" label="授信额度" align="center" />
          <el-table-column prop="address" label="授信期限" align="center" />
          <el-table-column prop="address" label="已占用授信额度" align="center" />
          <el-table-column prop="address" label="保理分配额度" align="center" />
        </el-table>
      </div>

    </el-card>
  </div>
</template>

<script>
import HeadTitle from '@/views/pages/components/head-title'
import FormLabel from '@/views/pages/components/form-label'

export default {
  name: 'CreditRecord',
  components: {
    HeadTitle,
    FormLabel
  },
  data() {
    return {
      showDefaultButton: false,
      form: {},
      tableData: []
    }
  }
}
</script>

<style lang="scss" scoped>
  .wrap{
    margin-bottom: 20px;
  }
</style>
