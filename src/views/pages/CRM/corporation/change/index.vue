<template>
  <div class="enterprise-customers page">
    <head-title :label="'客户信息变更'" :total="100" />

    <table-search>
      <template slot="after">
         <div>高级搜索</div>
      </template>
    </table-search>

    <side-tool key="enterprise-customers" ref="sideTool" :label="'客户管理'" :data="multipleSelection">
      <template slot="after" />
    </side-tool>

    <el-table
      ref="multipleTable"
      :data="tableData"
      style="width: 100%">
      <el-table-column type="selection" width="50" />
      <el-table-column type="index" label="序号" width="50" align="center" />
      <el-table-column sortable prop="productStatus" label="信单使用状态" align="center" />
      <el-table-column prop="productStatus" label="信单资料" align="center" />
      <el-table-column prop="compCode" label="客户编号" align="center" />
      <el-table-column prop="compName" label="企业名称" align="center" />
      <el-table-column prop="compUsccCode" label="组织机构代码" align="center" />
      <el-table-column prop="productName" label="业务产品" align="center" />
      <el-table-column prop="occupiedAmount" label="客户类型" align="center" />
      <el-table-column prop="ftCreditAmount" label="创建时间" align="center" />
    </el-table>

    <div class="pagination-wrap">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, prev, pager, next, sizes"
        :page-sizes="[10, 20, 50, 100]"
        :total="100" />
    </div>

  </div>
</template>

<script>
import HeadTitle from '@/views/pages/components/head-title'
import TableSearch from '@/views/pages/components/table-search'
import SideTool from '@/views/pages/components/SideTool'

export default {
  name: 'CorpotationPageList',
  components: {
    HeadTitle,
    TableSearch,
    SideTool
  },
  data() {
    return {
      multipleSelection: [],
      tableData: []
    }
  },
  created() {

  },
  methods: {
    handleSizeChange(val) {

    },
    handleCurrentChange(val) {

    }
  }
}
</script>
