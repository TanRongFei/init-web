<template>
  <div class="enterprise-customers page">
    <head-title
      :label="'企业客户'"
      :total="total"
      @handleEditor="handleEditor"
      @handleCheek="handleCheek" />

    <table-search>
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
          <el-form-item label="签署日期:">
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

    <side-tool :functions="functions" key="enterprise-customers" ref="sideTool" :label="'合同制作'" :data="multipleSelection" />

    <el-table
      ref="multipleTable"
      :default-sort="{prop: 'productStatus', order: 'descending'}"
      @selection-change="handleSelectionChange"
      :data="tableData"
      style="width: 100%">
      <el-table-column type="selection" width="50" />
      <el-table-column type="index" label="序号" width="50" align="center" />
      <el-table-column sortable prop="status" label="状态" align="center" />
      <el-table-column prop="contCode" label="合同编号" align="center" />
      <el-table-column prop="credCode" label="授信编号" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="handleDetail('contractDetail', scope.row)">{{ scope.row.credCode }}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="sellerCompName" label="客户名称" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="handleDetail('contractDetail', scope.row)">{{ scope.row.sellerCompName }}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="prjtType" label="项目类型" align="center">
        <template slot-scope="scope">
          {{ scope.row.prjtType + '-prjtTypelist' | filterDict }}
        </template>
      </el-table-column>>
      <el-table-column prop="businessType" label="业务板块" align="center">
        <template slot-scope="scope">{{ scope.row.businessType + '-PlateTypeEnums' | filterDict }}</template>
      </el-table-column>>
      <el-table-column prop="contractType" label="合同类型" align="center">
        <template slot-scope="scope">
          {{ scope.row.contractType + '-contractTypeList' | filterDict }}
        </template>
      </el-table-column>>
      <el-table-column prop="conPmName" label="客户经理" align="center" />
      <el-table-column prop="basicContractSigndate" label="签署日期" align="center">
        <template slot-scope="scope">{{ formatDate(scope.row.basicContractSigndate) }}</template>
      </el-table-column>>
      <el-table-column prop="isHandove" label="合同资料" align="center" />
    </el-table>

    <div class="pagination-wrap">
      <el-pagination
        background
        layout="total, prev, pager, next, sizes"
        :page-sizes="[10, 20, 50, 100]"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange" />
    </div>
  </div>
</template>

<script>
import HeadTitle from '@/views/pages/components/head-title'
import TableSearch from '@/views/pages/components/table-search'
import SideTool from '@/views/pages/components/SideTool'
import Model from '@/api/factoring/contract'
import moment from 'moment'

export default {
  name: 'ContractMgr',
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
  computed: {
    formatDate() {
      return (date) => {
        if (date) {
          return moment(date).format('YYYY-MM-DD')
        } else {
          return date
        }
      }
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
      Model.list(param).then(res => {
        console.log(res)
        this.tableData = res.list
        this.total = res.total
      })
    },
    submit() {
      console.log('submit', this.form)
    },
    handleDetail(pathName, query = {}) {
      console.log('query', query)
      if (!query) return
      this.$store.dispatch('app/hiddenChgInfo').then(() => {
        this.$router.push({ name: pathName, query })
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
    handleCheek(v) {
      /**
       * 查看
       * **/
      if (this.multipleSelection && this.multipleSelection.length === 1) {
        const { bizCode } = this.multipleSelection[0]
        this.handleDetail('contractDetail', { bizCode })
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
        this.handleDetail('contractEditor', { bizCode })
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
