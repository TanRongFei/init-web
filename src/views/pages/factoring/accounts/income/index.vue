<template>
  <div class="enterprise-customers page">
    <head-title
      :label="'来款管理'"
      :total="total"
      @handleCheek="handleDetail('incomeView')" />

    <table-search >
      <template slot="after">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="状态:">
            <el-checkbox-group v-model="form.checkList">
              <el-checkbox label="a">保存</el-checkbox>
              <el-checkbox label="b">提交</el-checkbox>
              <el-checkbox label="c">审批中</el-checkbox>
              <el-checkbox label="d">打回修改</el-checkbox>
              <el-checkbox label="d">审批通过</el-checkbox>
              <el-checkbox label="d">审批不通过</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="核销状态:">
            <el-radio-group v-model="form.radio">
              <el-radio :label="3">全部</el-radio>
              <el-radio :label="6">已核销完</el-radio>
              <el-radio :label="9">未核销完</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="到账日期:">
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
      <el-table-column type="selection" width="50" />
      <el-table-column sortable prop="status" label="状态" width="80" align="center" />
      <el-table-column sortable prop="status" label="放款编号" align="center" />
      <el-table-column sortable prop="compUsccCode" label="来款类型" align="center" />
      <el-table-column sortable prop="productName" label="到账日期" align="center" />
      <el-table-column sortable prop="occupiedAmount" label="金额(元)" align="center" />
      <el-table-column sortable prop="ftCreditAmount" label="来款名称(C)" align="center" />
      <el-table-column sortable prop="ftCreditAmount" label="付款帐号(C)" align="center" />
      <el-table-column sortable prop="ftCreditAmount" label="收款银行(F)" align="center" />
      <el-table-column sortable prop="ftCreditAmount" label="已核销金额" align="center" />
      <el-table-column sortable prop="ftCreditAmount" label="待核销金额" align="center" />
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
  name: 'Income',
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
          credCode: '项目名称',
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
    // this.fetchList()
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
      this.handleDetail('incomeView')
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
