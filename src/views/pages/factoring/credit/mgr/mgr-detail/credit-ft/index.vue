<template>
  <div class="container">
    <form-label :label="'基本信息'" />
    <div class="info">
      <div class="item">
        <span class="label">申请日期</span>
        <span>{{form.applyDate}}</span>
      </div>
      <div class="item">
        <span class="label">授信额度</span>
        <span>{{form.creditAmount}}</span>
      </div>
      <div class="item">
        <span class="label">循环授信</span>
        <span>{{form.isLoopCredit}}</span>
      </div>
      <div class="item">
        <span class="label">授信期限</span>
        <span>{{form.creditDuration}}</span>
      </div>
      <div class="item">
        <span class="label">授信开始日</span>
        <span>{{form.creditStartDate}}</span>
      </div>
      <div class="item">
        <span class="label">授信截止日</span>
        <span>{{form.creditEndDate}}</span>
      </div>
      <div class="item">
        <span class="label">已占用授信额度</span>
        <span>{{form.creditBalance}}</span>
      </div>
    </div>

    <form-label :label="'交易对象'" />
    <el-table :data="credFtAllocationList" style="width: 100%">
      <el-table-column prop="index" label="序号" width="50" align="center" />
      <el-table-column prop="" label="状态" align="center" />
      <el-table-column prop="custName" label="买/卖方名称" align="center" />
      <el-table-column prop="allocateAmount" label="额度" align="center" />
      <el-table-column prop="creditBalance" label="剩余额度" align="center" />
      <el-table-column prop="remark" label="说明" align="center" />
    </el-table>

    <form-label :label="'用信前提'" />
    <el-table :data="credFtLoanPremiseList" style="width: 100%">
      <el-table-column type="index" label="序号" width="50" align="center" />
      <el-table-column prop="counterpartyName" label="前提对象" align="center" />
      <el-table-column prop="remark" label="说明" align="center" />
    </el-table>

    <form-label :label="'放款前提'" />
    <el-table :data="credFtUsePremiseList" style="width: 100%">
      <el-table-column type="index" label="序号" width="50" align="center" />
      <el-table-column prop="counterpartyName" label="前提对象" />
      <el-table-column prop="remark" label="说明" align="center" />
    </el-table>
  </div>
</template>

<script>
import HeadTitle from '@/views/pages/components/head-title'
import FormLabel from '@/views/pages/components/form-label'
import Model from '@/api/factoring/credit'
import AddRouterQuery from '../mixin/add-route-query'

export default {
  name: 'CreditMgrDetailCreditFt',
  mixins: [AddRouterQuery],
  components: { HeadTitle, FormLabel },
  data() {
    return {
      form: {},
      credFtAllocationList: [],
      credFtLoanPremiseList: [],
      credFtUsePremiseList: []
    }
  },
  created() {
    this.fetchDetail()
  },
  methods: {
    fetchDetail() {
      const bizCode = this.$route.query.bizCode
      if (!bizCode) return
      Model.fetchCreditFt(bizCode).then(res => {
        console.log(res)
        if (!res) return
        this.form = JSON.parse(JSON.stringify(res))
        this.credFtAllocationList = JSON.parse(JSON.stringify(res.credFtAllocationList)) // 交易对象
        this.credFtLoanPremiseList = JSON.parse(JSON.stringify(res.credFtLoanPremiseList)) // 放款前提
        this.credFtUsePremiseList = JSON.parse(JSON.stringify(res.credFtUsePremiseList)) // 用信前提
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/styles/editor.scss";

</style>
