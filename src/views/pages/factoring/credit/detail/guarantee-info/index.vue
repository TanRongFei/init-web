<template>
  <div class="basic-info">
    <head-title :label="'承保信息'"></head-title>

    <el-card shadow="never">
      <form-label :label="'企业保证'" >
        <template slot="after">
          <el-button type="" icon="el-icon-plus" size="mini"></el-button>
          <el-button type="" icon="el-icon-delete" size="mini"></el-button>
        </template>
      </form-label>
      <div class="wrap">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="date" label="名称" align="center"></el-table-column>
          <el-table-column prop="name" label="统一社会信用代码" align="center"></el-table-column>
          <el-table-column prop="address" label="关联关系" align="center"></el-table-column>
          <el-table-column prop="address" label="保证类型" align="center"></el-table-column>
          <el-table-column prop="address" label="保证金额" align="center"></el-table-column>
          <el-table-column prop="address" label="其他说明" align="center"></el-table-column>
        </el-table>
      </div>

      <form-label :label="'个人保证'" >
        <template slot="after">
          <el-button type="" icon="el-icon-plus" size="mini"></el-button>
          <el-button type="" icon="el-icon-delete" size="mini"></el-button>
        </template>
      </form-label>
      <div class="wrap">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="date" label="担保人名称" align="center"></el-table-column>
          <el-table-column prop="name" label="统一社会信用代码" align="center"></el-table-column>
          <el-table-column prop="address" label="关联关系" align="center"></el-table-column>
          <el-table-column prop="address" label="保证类型" align="center"></el-table-column>
          <el-table-column prop="address" label="保证金额" align="center"></el-table-column>
          <el-table-column prop="address" label="其他说明" align="center"></el-table-column>
        </el-table>
      </div>

      <form-label :label="'抵押品'" >
        <template slot="after">
          <el-button type="" icon="el-icon-plus" size="mini"></el-button>
          <el-button type="" icon="el-icon-delete" size="mini"></el-button>
        </template>
      </form-label>
      <div class="wrap">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="date" label="抵押品名称" align="center"></el-table-column>
          <el-table-column prop="name" label="权属证书及其他有关证书编号" align="center"></el-table-column>
          <el-table-column prop="address" label="抵押人" align="center"></el-table-column>
          <el-table-column prop="address" label="面积" align="center"></el-table-column>
          <el-table-column prop="address" label="价值(万元)" align="center"></el-table-column>
          <el-table-column prop="address" label="备注" align="center"></el-table-column>
        </el-table>
      </div>

    </el-card>
  </div>
</template>

<script>
import HeadTitle from '../../../../components/head-title'
import FormLabel from '../../../../components/form-label'

export default {
  name: 'GuaranteeInfo',
  components: {
    HeadTitle,
    FormLabel
  },
  data() {
    return {
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
