<template>
  <div class="enterprise-customers page">
    <head-title
      :label="'企业客户'"
      :total="total"
      :functions="btnFunctions"
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
          <el-form-item label="申请日期:">
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

    <side-tool
      :functions="functions"
      key="enterprise-customers"
      ref="sideTool"
      :label="'合同变更'"
      :data="multipleSelection"
      @handleChangeAudit="handleDetail"
      @handleChangeUnAudit="handleDetail"
    />

    <el-table
      ref="multipleTable"
      :default-sort = "{prop: 'productStatus', order: 'descending'}"
      @selection-change="handleSelectionChange"
      :data="tableData"
      style="width: 100%">
      <el-table-column type="selection" width="50" />
      <el-table-column type='index' label="序号" width="50" align="center" />
      <el-table-column sortable prop="status" label="状态" align="center">
        <template slot-scope="scope">
          {{ scope.row.status + '-stutasEnum' | filterDict }}
        </template>
      </el-table-column>
      <el-table-column prop="cochCode" label="变更编号" align="center" />
      <el-table-column prop="credCode" label="合同编号" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="handleDetail('contractDetail', scope.row)">{{scope.row.credCode}}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="contCode" label="客户名称" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="handleDetail('contractDetail', scope.row)">{{scope.row.contCode}}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="version" label="版本" align="center" />
      <el-table-column prop="businessType" label="有效性" align="center" />
      <el-table-column prop="applyUserName" label="申请人" align="center" />
      <el-table-column prop="applyDate" label="申请时间" align="center">
        <template slot-scope="scope">{{ scope.row.applyDate | formatDate }}</template>
      </el-table-column>
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
  name: 'ContractChg',
  components: {
    HeadTitle,
    TableSearch,
    SideTool
  },
  data() {
    return {
      btnFunctions: ['check', 'editor', 'delete'],
      functions: ['change-audit', 'change-unAudit'], // 变更审批通过 变更审批不通过
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
    this.$nextTick(function() {
      this.$store.dispatch('app/toggleSideToll', true)
    })
    this.fetchList()
  },
  methods: {
    fetchList() {
      const param = {
        ...this.Query
      }
      Model.changeList(param).then(res => {
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
      // const path = '/factoring/contract/contract-editor/chg-info'

      this.$store.dispatch('app/showChgInfo').then(() => {
        this.$router.push({ name: pathName, query })
        // this.$router.push({ name: pathName, query})
      })
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
    handleCheck(v) {
      /**
       * 查看
       * **/
      if (this.multipleSelection && this.multipleSelection.length === 1) {
        const { bizCode } = this.multipleSelection[0]
        // this.handleDetail('contractDetail', { bizCode })
        this.$store.dispatch('app/showChgInfo').then(() => {
          this.$router.push({ path: '/factoring/contract/contract-detail/chg-info', query: { bizCode }})
        })
      } else if (this.multipleSelection && this.multipleSelection.length > 1) {
        this.$message({
          message: '只能选取一条数据进行查看！',
          type: 'warning'
        })
      } else {
        this.$message({
          message: '请选取一条数据进行查看！',
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
        this.$store.dispatch('app/showChgInfo').then(() => {
          this.$router.push({ path: '/factoring/contract/contract-editor/chg-info', query: { bizCode }})
        })
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
        Model.changeDelete(bizCode).then(() => {
          this.handleDetail()
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
