<template>
  <div class="container">
    <form-label :label="'企业保证'" />
    <el-table :data="credCompGuaList" style="width: 100%">
      <el-table-column type="index" label="序号" width="50" align="center" />
      <el-table-column prop="custName" label="名称" align="center" />
      <el-table-column prop="socialCreditCode" label="统一社会信用代码" align="center" />
      <el-table-column prop="relType" label="关联关系" align="center" />
      <el-table-column prop="guaType" label="保证类型" align="center" />
      <el-table-column prop="amount" label="保证金额" align="center" />
      <el-table-column prop="remark" label="其他说明" align="center" />
    </el-table>

    <form-label :label="'个人保证'" />
    <el-table :data="form.credPersonGuaList" style="width: 100%">
      <el-table-column type="index" label="序号" width="50" align="center" />
      <el-table-column prop="custName" label="担保人姓名" align="center" />
      <el-table-column prop="" label="证件类型" align="center" />
      <el-table-column prop="idno" label="证件号码" align="center" />
      <el-table-column prop="relType" label="关联关系" align="center" />
      <el-table-column prop="guaType" label="保证类型" align="center" />
      <el-table-column prop="amount" label="保证金额" align="center" />
      <el-table-column prop="remark" label="其他说明" align="center" />
    </el-table>

    <form-label :label="'抵押品'" />
    <el-table :data="form.credMortgageList" style="width: 100%">
      <el-table-column type="index" label="序号" width="50" align="center" />
      <el-table-column prop="pledgeName" label="抵押品名称" align="center" />
      <el-table-column prop="certificateNo" label="权属证书及其他有关证书编号" align="center" />
      <el-table-column prop="mortgager" label="抵押人" align="center" />
      <el-table-column prop="area" label="面积" align="center" />
      <el-table-column prop="value" label="价值(万元)" align="center" />
      <el-table-column prop="remark" label="备注" align="center" />
    </el-table>


    <form-label :label="'质押品'" />
    <el-table :data="form.credPledgeList" style="width: 100%">
      <el-table-column type="index" label="序号" width="50" align="center" />
      <el-table-column prop="pledgeName" label="抵押品名称" align="center" />
      <el-table-column prop="certificateNo" label="权属证书及其他有关证书编号" align="center" />
      <el-table-column prop="pledgor" label="抵押人" align="center" />
      <el-table-column prop="quantity" label="数量" align="center" />
      <el-table-column prop="value" label="价值(万元)" align="center" />
      <el-table-column prop="remark" label="备注" align="center" />
    </el-table>

    <form-label :label="'其他担保'" />
    <el-input type="textarea" v-model="form.otherGua" disabled />

  </div>
</template>

<script>
import HeadTitle from '@/views/pages/components/head-title'
import FormLabel from '@/views/pages/components/form-label'
import Model from '@/api/factoring/credit'
import AddRouterQuery from '../mixin/add-route-query'

export default {
  name: 'CreditMgrDetailGua',
  mixins: [AddRouterQuery],
  components: { HeadTitle, FormLabel },
  data() {
    return {
      form: {},
      credCompGuaList: [],
      credMortgageList: [],
      credPersonGuaList: [],
      credPledgeList: []
    }
  },
  created() {
    this.fetchDetail()
  },
  methods: {
    fetchDetail() {
      const bizCode = this.$route.query.bizCode
      if (!bizCode) return
      Model.fetchCreditGua(bizCode).then(res => {
        console.log(res)
        if (!res) return

        this.form = JSON.parse(JSON.stringify(res))
        this.credCompGuaList = JSON.parse(JSON.stringify(res.credCompGuaList))// 企业担保
        this.credMortgageList = JSON.parse(JSON.stringify(res.credMortgageList)) // 抵押品
        this.credPersonGuaList = JSON.parse(JSON.stringify(res.credPersonGuaList)) // 个人担保
        this.credPledgeList = JSON.parse(JSON.stringify(res.credPledgeList)) // 质押品
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/styles/editor.scss";

</style>
