<template>
  <div class="facility-management">
    <head-title
      :label="'授信列表'"
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
          <el-form-item label="创建日期:">
            <el-date-picker
              v-model="form['applyStartDate']"
              type="date"
              size="small"
              clearable
              placeholder="选择开始日期">
            </el-date-picker>
            至
            <el-date-picker
              v-model="form['applyEndDate']"
              type="date"
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

    <el-table
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="50" />
      <el-table-column type='index' label="序号" width="50" align="center" />
      <el-table-column prop="status" label="状态" align="center">
        <template slot-scope="scope">{{ scope.row.status + '-status' | filterDict }}</template>
      </el-table-column>
      <el-table-column prop="chgCode" label="变更编号" align="center" />
      <el-table-column prop="credCode" label="授信编号" align="center" width="160">
        <template slot-scope="scope">
          <el-button type="text" @click="handleDetail('credit-ft-detail', scope.row)">{{scope.row.credCode}}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="custName" label="客户名称" align="center" width="160">
        <template slot-scope="scope">
          <el-button type="text" @click="handleDetail('deduction-detail', scope.row)">{{scope.row.custName}}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="chgVersion" label="版本" align="center" width="160" />
      <el-table-column prop="isValid" label="有效性" align="center">
        <template slot-scope="scope">{{ scope.row.isValid + '-isValid' | filterDict }}</template>
      </el-table-column>
      <el-table-column prop="applicant" label="申请人" align="center" />
      <el-table-column prop="applyDate" label="申请时间" align="center" width="160" />
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
import Model from '@/api/factoring/credit'
import Pagination from '../mixin/pagination'

export default {
  name: 'CreditQuota',
  components: {
    HeadTitle,
    TableSearch
  },
  mixins: [ Pagination ],
  data() {
    return {
      btnFunctions: ['check', 'editor', 'delete'],
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
    this.fetchList()
  },
  methods: {
    fetchList() {
      const param = {
        ...this.Query
      }
      Model.credChangeList(param).then(res => {
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
        this.handleDetail('chg-detail', { bizCode })
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
        this.handleDetail('chg-editor', { bizCode })
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
        Model.deleteCredChange(bizCode).then(() => {
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
