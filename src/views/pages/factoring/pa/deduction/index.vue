<template>
  <div class="enterprise-customers page">
    <head-title
      :label="'保证金抵扣租金'"
      :total="total"
      @handleCheek="handleDetail('paDeductionEditor')" />

    <table-search >
      <template slot="after">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="抵扣日期:">
            <el-date-picker
              v-model="form['beginDate']"
              type="date"
              value-format="yyyy-MM-dd HH:mm:ss"
              size="small"
              clearable
              placeholder="选择开始日期" />
            至
            <el-date-picker
              v-model="form['endDate']"
              type="date"
              value-format="yyyy-MM-dd 23:59:59"
              size="small"
              clearable
              placeholder="选择结束日期" />
          </el-form-item>
          <el-form-item>
            <el-button @click="submit" size="mini" type="primary">搜 索</el-button>
          </el-form-item>
        </el-form>
      </template>
    </table-search>

    <side-tool :functions="functions" key="enterprise-customers" ref="sideTool" :label="'合同制作'" :data="multipleSelection">
      <template slot="after">
      </template>
    </side-tool>

    <el-table
      ref="multipleTable"
      :default-sort = "{prop: 'productStatus', order: 'descending'}"
      @selection-change="handleSelectionChange"
      :data="tableData"
      style="width: 100%">
      <el-table-column type="index" label="序号" width="50" />
      <el-table-column sortable prop="status" label="状态" align="center" />
      <el-table-column sortable prop="contCode" label="客户名称" align="center" />
      <el-table-column sortable prop="compUsccCode" label="合同编号" align="center" />
      <el-table-column sortable prop="productName" label="放款编号" align="center" />
      <el-table-column sortable prop="occupiedAmount" label="抵扣期次" align="center" />
      <el-table-column sortable prop="occupiedAmount" label="应还金额" align="center" />
      <el-table-column sortable prop="occupiedAmount" label="保证金余额" align="center" />
      <el-table-column sortable prop="occupiedAmount" label="抵扣金额" align="center" />
      <el-table-column sortable prop="occupiedAmount" label="抵扣日期" align="center" />
    </el-table>

    <div class="pagination-wrap" >
      <el-pagination
        background
        layout="total, prev, pager, next, sizes"
        :page-sizes="[10, 20, 50, 100]"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import HeadTitle from '@/views/pages/components/head-title'
import TableSearch from '@/views/pages/components/table-search'
import SideTool from '@/views/pages/components/SideTool'
import Model from '@/api/factoring/contract'

export default {
  name: 'PaDeduction',
  components: {
    HeadTitle,
    TableSearch,
    SideTool
  },
  data() {
    return {
      functions: ['data-handover', 'generate-loan', 'contract-change'], // 资料交接 生成放款 合同变更
      form: {
        checkList: []
      },
      Query: {
        pageNum: 1,
        pageSize: 10,
        orderBy: 'createdTime'
      },
      tableData: [
        {
          credCode: 'asss',
          bizCode: 's123456'
        }
      ],
      total: 0,
      multipleSelection: []
    }
  },
  created() {
    // 显示SideTool
    this.$nextTick(function () {
      this.$store.dispatch('app/toggleSideToll', true)
    })
    this.fetchList()
  },
  methods: {
    fetchList() {
      const param = {
        ...this.Query
      }
      Model.list(param).then(res => {
        console.log(res)
        this.tableData = res.list
        this.total = res.total
      })
    },
    submit() {
      console.log('submit', this.form)
    },
    handleDetail(pathName, item) {
      let query = {}
      if (item && item.bizCode) {
        query = {
          bizCode: item.bizCode
        }
      }
      this.$router.push({ name: pathName, query})
      this.$store.dispatch('app/setLeftSidebarRouters', {})
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.Query.pageSize = val
      this.fetchList()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.Query.pageNum = val
      this.fetchList()
    },
    handleCheek(v) {
      /**
       * 查看
       * **/
      this.handleDetail('contractDetail')
    }
  }
}
</script>

<style lang="scss" scoped>
  .pagination-wrap{
    display: flex;
    justify-content: flex-end;
    margin: 20px 0;
  }
</style>
