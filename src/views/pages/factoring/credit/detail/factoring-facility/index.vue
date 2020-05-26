<template>
  <div class="basic-info">
    <head-title :label="'保理授信'" :show-default-button="false">
      <template slot="after">
        <el-button type="primary" size="mini">保 存</el-button>
        <el-button type="" size="mini">返 回</el-button>
      </template>
    </head-title>

    <el-card shadow="never">
      <form-label :label="'基本信息'" />
      <div class="wrap">
        <base-form />
      </div>

      <form-label :label="'授信产品'" />
      <div class="wrap">
        <products-form />
      </div>

      <form-label :label="'交易对象'" />
      <div class="wrap">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column type="index" label="序号" width="50" align="center" />
          <el-table-column prop="date" label="状态" align="center" />
          <el-table-column prop="name" label="额度" align="center" />
          <el-table-column prop="name" label="剩余额度" align="center" />
          <el-table-column prop="name" label="说明" align="center" />
        </el-table>
      </div>

      <form-label :label="'用信前提'" />
      <div class="wrap">
        <premise-form />
      </div>

      <form-label :label="'放款前提'" />
      <div class="wrap">
        <premise-form />
      </div>
    </el-card>
  </div>
</template>

<script>
import HeadTitle from '../../../../components/head-title'
import FormLabel from '../../../../components/form-label'
import BaseForm from './components/base-form'
import ProductsForm from './components/products-form'
import PremiseForm from './components/premise-form'

export default {
  name: 'FactoringFacility',
  components: {
    HeadTitle,
    FormLabel,
    BaseForm,
    ProductsForm,
    PremiseForm
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
