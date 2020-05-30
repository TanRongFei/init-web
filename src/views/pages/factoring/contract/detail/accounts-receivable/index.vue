<template>
  <div class="container">
    <div class="info">
      <div class="item">
        <span class="label">应收账款类型</span>
        <span>{{ form.receWay + '-dueTypeEnums' | filterDict }}</span>
      </div>
    </div>

    <form-label :label="'基础交易合同'" />
    <el-table :data="contractTradeVO" style="width: 100%">
      <el-table-column type="index" label="序号" width="50" align="center" />
      <el-table-column prop="contName" label="合同名称" align="center" />
      <el-table-column prop="contCode" label="合同编号" align="center" />
      <el-table-column prop="contAmount" label="合同金额" align="center" />
      <el-table-column prop="duepayAmount" label="转让应收账款金额" align="center" />
      <el-table-column prop="signDate" label="签署日期" align="center">
        <template slot-scope="scope">
          {{ scope.row.signDate | formatDate }}
        </template>
      </el-table-column>
      <el-table-column prop="paymentTerm" label="账期" align="center" />
      <el-table-column prop="creditQueryResult" label="第三方征信查询结果" align="center" />
      <el-table-column prop="remark" label="备注" align="center" />
      <el-table-column prop="fileName" label="附件" align="center" />
    </el-table>

    <form-label :label="'应收账款'" />

    <el-table :data="contractDuepayVO" style="width: 100%">
      <el-table-column type="index" label="序号" width="50" align="center" />
      <el-table-column prop="invoicetype" label="票据类型" align="center" />
      <el-table-column prop="invoicecode" label="发票代码" align="center" />
      <el-table-column prop="billNum" label="发票号码" align="center" />
      <el-table-column prop="checkCodeSix" label="发票验证码后六位" align="center" />
      <el-table-column prop="buyName" label="购买方" align="center" />
      <el-table-column prop="billAmount" label="发票金额" align="center" />
      <el-table-column prop="billDate" label="开票日期" align="center">
        <template slot-scope="scope">
          {{ scope.row.billDate | formatDate }}
        </template>
      </el-table-column>
      <el-table-column prop="settlementWay" label="结算方式" align="center" />
      <el-table-column prop="fileName" label="附件" align="center" />
      <el-table-column prop="state" label="验票真伪" align="center" />
    </el-table>
  </div>
</template>

<script>
import HeadTitle from '@/views/pages/components/head-title'
import FormLabel from '@/views/pages/components/form-label'
import Model from "@/api/factoring/contract";
import AddRouterQuery from '../mixin/add-route-query'

export default {
  name: 'AccountsReceivable',
  components: {
    HeadTitle,
    FormLabel
  },
  mixins: [AddRouterQuery],
  data() {
    return {
      contractTradeVO: [],
      contractDuepayVO: [],
      form: {}
    }
  },
  created() {
    this.fetchDetail()
  },
  methods: {
    fetchDetail() {
      const bizCode = this.$route.query.bizCode
      if (!bizCode) return
      Model.dueView(bizCode).then(res => {
        console.log(res)
        if (!res) return
        this.form = res.contractDuepaySchemeDTO ? res.contractDuepaySchemeDTO : {}
        this.contractTradeVO = res.contractTradeDTO ? res.contractTradeDTO : []
        this.contractDuepayVO = res.contractDuepayDTO ? res.contractDuepayDTO : []
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .container{
    padding: 20px 25px;
    margin-top: 18px;
    background-color: #fff;
    border: 1px solid #d9d9d9;
    position: relative;
    .info{
      display: flex;
      flex-wrap: wrap;
      padding: 15px 0;
      .item{
        flex: 0 0 33%;
        line-height: 28px;
        padding: 4px 0;
        color: #333;
        word-wrap: break-word;
        word-break: break-all;
        .label{
          padding-right: 5px;
          color: #999;
        }
      }
    }
  }

</style>
