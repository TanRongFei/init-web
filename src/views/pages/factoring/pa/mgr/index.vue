<template>
  <div class="facility-management">
    <head-title
      :label="'客户授信'"
      :total="total"
      :functions="btnFunctions"
      @handleAdd="handleDetail('deduction-editor')"
      @handleDelete="handleDel"
      @handleEditor="handleEditor"
      @handleCheck="handleCheck" />

    <table-search >
      <template slot="after">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="状态:">
            <el-checkbox-group v-model="form.checkList">
              <el-checkbox label="a">保存</el-checkbox>
              <el-checkbox label="b">提交</el-checkbox>
              <el-checkbox label="c">审批通过</el-checkbox>
              <el-checkbox label="d">审批不通过</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="创建日期:">
            <el-date-picker
              v-model="form['beginDate']"
              type="date"
              value-format="yyyy-MM-dd HH:mm:ss"
              size="small"
              clearable
              placeholder="选择开始日期">
            </el-date-picker>
            至
            <el-date-picker
              v-model="form['endDate']"
              type="date"
              value-format="yyyy-MM-dd 23:59:59"
              size="small"
              clearable
              placeholder="选择结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button @click="submit" size="mini" type="primary">搜 索</el-button>
          </el-form-item>
        </el-form>
      </template>
    </table-search>

    <side-tool
      :functions="functions"
      key="enterprise-customers"
      :data="multipleSelection"
      ref="sideTool"
      :label="'保证金'" />

    <el-table
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="50" />
      <el-table-column type='index' label="序号" width="50" align="center" />
      <el-table-column prop="compName" label="客户名称" align="center"/>
      <el-table-column prop="contCode" label="合同编号" align="center" />
      <el-table-column prop="loanCode" label="放款编号" align="center" />
      <el-table-column prop="loanAmount" label="放款金额" align="center" />
      <el-table-column prop="marginAmount" label="保证金金额" align="center" />
      <el-table-column prop="marginBalance" label="保证金余额" align="center" />
      <el-table-column label="收取日期" align="center" />
      <el-table-column prop="servicechargeAmount" label="服务费" align="center" />
    </el-table>

    <div class="pagination-wrap" >
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, prev, pager, next, sizes"
        :page-sizes="[10, 20, 50, 100]"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import HeadTitle from '../../../components/head-title'
import TableSearch from '@/views/pages/components/table-search'
import Model from '@/api/factoring/pa'
import SideTool from '@/views/pages/components/SideTool'
import Pagination from '../mixin/pagination'

export default {
  name: 'CreditMgr',
  components: {
    HeadTitle,
    TableSearch,
    SideTool
  },
  mixins: [ Pagination ],
  data() {
    return {
      btnFunctions: ['check', 'editor', 'delete'],
      functions: ['pa-audit', 'pa-unAudit'], // 生成合同 额度分配 授信变更
      form: {
        checkList: []
      },
      tableData: [
        {
          id: 1,
          status: 1,
          bizCode: 's123',
          credCode: 's123',
          custName: '中金云创'
        }
      ],
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
        if (!res) return
        this.total = res.total
        this.tableData = res.list
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
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleCheck(v) {
      /**
       * 查看
       * **/
      if (this.multipleSelection && this.multipleSelection.length === 1) {
        const { bizCode } = this.multipleSelection[0]
        this.$router.push({ path: '/factoring/pa/mgr-detail/basic-info', query: { bizCode }})
      } else if (this.multipleSelection && this.multipleSelection.length > 1) {
        this.$message({
          message: '只能选取一条数据进行编辑！',
          type: 'warning'
        })
      } else {
        this.$message({
          message: '请选取一条数据进行编辑！',
          type: 'warning'
        })
      }
    },
    handleEditor() {
      /**
       * 编辑
       * **/
      if (this.multipleSelection && this.multipleSelection.length === 1) {
        const { bizCode } = this.multipleSelection[0]
        this.$router.push({ path: '/factoring/pa/mgr-editor/basic-info', query: { bizCode }})
      } else if (this.multipleSelection && this.multipleSelection.length > 1) {
        this.$message({
          message: '只能选取一条数据进行编辑！',
          type: 'warning'
        })
      } else {
        this.$message({
          message: '请选取一条数据进行编辑！',
          type: 'warning'
        })
      }
    },
    handleDel() {
      /**
       * 删除
       * **/
      if (this.multipleSelection && this.multipleSelection.length === 1) {
        const { bizCode } = this.multipleSelection[0]
        Model.deleteInfo(bizCode).then(() => {
          this.fetchList()
        })
      } else if (this.multipleSelection && this.multipleSelection.length > 1) {
        this.$message({
          message: '只能选取一条数据进行删除！',
          type: 'warning'
        })
      } else {
        this.$message({
          message: '请选取一条数据进行删除！',
          type: 'warning'
        })
      }
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
