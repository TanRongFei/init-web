<template>
  <div class="facility-management">
    <head-title :label="'客户授信'" :total="total" @handleCheek="handleCheek"></head-title>

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

    <side-tool :functions="functions" key="enterprise-customers" ref="sideTool" :label="'授信'" />

    <el-table :data="tableData" style="width: 100%">
      <el-table-column type='index' label="序号" width="50" align="center" />
      <el-table-column prop="status" label="状态" width="180" align="center" />
      <el-table-column prop="applyDate" label="申请日期" width="180" align="center" />
      <el-table-column prop="credCode" label="授信编号" align="center">
        <template slot-scope="scope">
         <el-button type="text" @click="handleDetail('CorpDetail', scope.row)">{{scope.row.credCode}}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="custName" label="客户名称" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="handleDetail('PersonalDetail', scope.row)">{{scope.row.custName}}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="creditAmount" label="授信额度" align="center" />
      <el-table-column prop="address" label="授信期限" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.creditStartDate}}</span> <span v-show="scope.row.creditStartDate && scope.row.creditEndDate">-</span> <span>{{scope.row.creditEndDate}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="occupiedAmount" label="已占用授信额度" align="center" />
      <el-table-column prop="ftCreditAmount" label="保理分配额度" align="center" />
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
import Model from '@/api/factoring/facility/creditList'
import SideTool from '@/views/pages/components/SideTool'

export default {
  name: 'CreditMgr',
  components: {
    HeadTitle,
    TableSearch,
    SideTool
  },
  data() {
    return {
      functions: ['add-contract'], // 生成合同
      form: {
        checkList: []
      },
      tableData: [
        {
          id: 1,
          status: 1,
          credCode: 's123',
          custName: '中金云创'
        }
      ],
      total: 22
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
        pageNum: 1,
        pageSize: 10,
        searchValue: '',
        orderBy: 'createdTime'
      }
      Model.fetchList(param).then(res => {
        console.log(res)
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
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    handleCheek(v) {
      /**
       * 查看
       * **/
      this.handleDetail('CreditDetail')
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
