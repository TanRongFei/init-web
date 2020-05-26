<template>
  <div class="enterprise-customers page">
    <head-title :label="'企业客户'" :total="total"></head-title>

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

    <side-tool :functions="functions" key="enterprise-customers" ref="sideTool" :label="'客户管理'" :data="multipleSelection">
      <template slot="after">
      </template>
    </side-tool>

    <el-table
      ref="multipleTable"
      :default-sort = "{prop: 'productStatus', order: 'descending'}"
      @selection-change="handleSelectionChange"
      :data="tableData" style="width: 100%">
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column type='index' label="序号" width="50" align="center"></el-table-column>
      <el-table-column sortable prop="productStatus" label="信单使用状态" align="center"></el-table-column>
      <el-table-column prop="productStatus" label="信单资料" align="center"></el-table-column>
      <el-table-column prop="compCode" label="客户编号" align="center"></el-table-column>
      <el-table-column prop="compName" label="企业名称" align="center"></el-table-column>
      <el-table-column prop="compUsccCode" label="组织机构代码" align="center"></el-table-column>
      <el-table-column prop="productName" label="业务产品" align="center"></el-table-column>
      <el-table-column prop="occupiedAmount" label="客户类型" align="center"></el-table-column>
      <el-table-column prop="ftCreditAmount" label="创建时间" align="center"></el-table-column>
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
  import HeadTitle from '@/views/pages/components/head-title'
  import TableSearch from '@/views/pages/components/table-search'
  import SideTool from '@/views/pages/components/SideTool'
  import Model from '@/api/factoring/admittance'

  export default {
    name: 'admittance',
    components: {
      HeadTitle,
      TableSearch,
      SideTool
    },
    data() {
      return {
        functions: ['identify-customers', 'admittance-open', 'admittance-disable'], // 标示客户 开通 关闭
        form: {
          checkList: []
        },
        Query: {
          pageNum: 1,
          pageSize: 10,
          orderBy: 'createdTime'
        },
        tableData: [],
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
        this.$router.push({ name: pathName, query: { code: item.code }})
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
