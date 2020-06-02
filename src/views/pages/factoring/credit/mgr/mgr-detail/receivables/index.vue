<template>
  <div class="container">
    <form-label :label="'基础交易合同'" />
    <el-table :data="basecontList" style="width: 100%">
      <el-table-column type="selection" width="50" />
      <el-table-column type="index" label="序号" width="50" align="center" />
      <el-table-column prop="contName" label="合同名称" width="180" align="center">
        <template slot-scope="scope">
          <el-input type="number" v-model="scope.row.contName" />
        </template>
      </el-table-column>
      <el-table-column prop="contCode" label="合同编号" align="center">
        <template slot-scope="scope">
          <el-input v-model="scope.row.contCode" />
        </template>
      </el-table-column>
      <el-table-column prop="contAmount" label="合同金额" align="center">
        <template slot-scope="scope">
          <el-input type="number" v-model="scope.row.contAmount" />
        </template>
      </el-table-column>
      <el-table-column prop="receiveablesAmount" label="转让应收账款金额" align="center">
        <template slot-scope="scope">
          <el-input type="number" v-model="scope.row.receiveablesAmount" />
        </template>
      </el-table-column>
      <el-table-column prop="signDate" label="签署日期" align="center">
        <template slot-scope="scope">
          <el-date-picker type="date" placeholder="选择日期" v-model="scope.row.signDate" style="width: 100%;" />
        </template>
      </el-table-column>
      <el-table-column prop="paymentTerm" label="账期" align="center">
        <template slot-scope="scope">
          <el-input type="number" v-model="scope.row.paymentTerm" />
        </template>
      </el-table-column>
      <el-table-column prop="creditQueryResult" label="第三方征信查询结果" align="center">
        <template slot-scope="scope">
          <el-input v-model="scope.row.creditQueryResult" />
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注" align="center">
        <template slot-scope="scope">
          <el-input v-model="scope.row.remark" />
        </template>
      </el-table-column>

      <el-table-column prop="remark" label="附件" align="center">
        <template slot-scope="scope">
          ss
        </template>
      </el-table-column>
    </el-table>

    <form-label :label="'应收账款'" />
    <el-table :data="receivablesList" style="width: 100%">
      <el-table-column type="selection" width="50" />
      <el-table-column type="index" label="序号" width="50" align="center" />
      <el-table-column prop="billType" label="票据类型" width="180" align="center">
        <template slot-scope="scope">
          <el-input type="number" v-model="scope.row.billType" />
        </template>
      </el-table-column>
      <el-table-column prop="billCode" label="发票代码" align="center">
        <template slot-scope="scope">
          <el-input v-model="scope.row.billCode" />
        </template>
      </el-table-column>
      <el-table-column prop="billNo" label="发票号码" align="center">
        <template slot-scope="scope">
          <el-input v-model="scope.row.billNo" />
        </template>
      </el-table-column>
      <el-table-column prop="billVerifyCode" label="发票验证码后六位" align="center">
        <template slot-scope="scope">
          <el-input v-model="scope.row.billVerifyCode" />
        </template>
      </el-table-column>
      <el-table-column prop="buyerName" label="购买方" align="center">
        <template slot-scope="scope">
          <el-input v-model="scope.row.buyerName" />
        </template>
      </el-table-column>
      <el-table-column prop="billValue" label="发票金额" align="center">
        <template slot-scope="scope">
          <el-input type="number" v-model="scope.row.billValue" />
        </template>
      </el-table-column>
      <el-table-column prop="issueDate" label="开票日期" align="center">
        <template slot-scope="scope">
          <el-date-picker type="date" placeholder="选择日期" v-model="scope.row.issueDate" style="width: 100%;" />
        </template>
      </el-table-column>
      <el-table-column prop="clearingForm" label="结算方式" align="center">
        <template slot-scope="scope">
          <el-input v-model="scope.row.clearingForm" />
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="附件" align="center">
        <template slot-scope="scope">
          ss
        </template>
      </el-table-column>
      <el-table-column prop="identity" label="验票真伪" align="center">
        <template slot-scope="scope">
          <el-input type="number" v-model="scope.row.identity" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import HeadTitle from '@/views/pages/components/head-title'
import FormLabel from '@/views/pages/components/form-label'
import Model from '@/api/factoring/credit'
import AddRouterQuery from '../mixin/add-route-query'

export default {
  name: 'CreditMgrDetailReceivables',
  mixins: [AddRouterQuery],
  components: { HeadTitle, FormLabel },
  data() {
    return {
      form: {},
      basecontList: [], // 基础交易合同
      receivablesList: [] // 应收账款
    }
  },
  created() {
    this.fetchDetail()
  },
  methods: {
    fetchDetail() {
      const bizCode = this.$route.query.bizCode
      if (!bizCode) return
      Model.fetchReceivables(bizCode).then(res => {
        console.log(res)
        if (!res) return
        this.form = JSON.parse(JSON.stringify(res))
        this.basecontList = JSON.parse(JSON.stringify(res.basecontList)) // 基础交易合同
        this.receivablesList = JSON.parse(JSON.stringify(res.receivablesList)) // 应收账款
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/styles/editor.scss";

</style>

