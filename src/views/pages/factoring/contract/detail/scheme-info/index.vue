<template>
  <div class="container">
    <form-label :label="'方案信息'" />
    <div class="info">
      <div class="item">
        <span class="label">授信金额</span>
        <span>{{form.prjtAmountorg}}</span>
        <span>{{ form.unitOrg + '-unitTypeeList' | filterDict }}</span>
      </div>
      <div class="item">
        <span class="label">服务费率</span>
        <div class="item-wrap">
          <div class="item-wrap-contain">
            <span>{{form.procedureRate}}</span>
            <span>{{form.procedureAmount}}</span>
          </div>
          <div class="item-wrap-contain">
            <span>{{ form.procedureWay + '-procedureWayEnums' | filterDict }}</span>
          </div>
        </div>
      </div>
      <div class="item">
        <span class="label">融资成数</span>
        <span>{{form.amountPercent}}</span>
        <span>{{form.amount}}</span>
      </div>
      <div class="item">
        <span class="label">保理融资利率</span>
        <span>{{form.annualRate}}</span>
        <span>{{form.annualRateunit}}</span>
        <span>{{ form.annualRateway + '-annualRatewayEnums' | filterDict }}</span>
      </div>
      <div class="item">
        <span class="label">资金来源</span>
        <span>{{form.moneySrc}}</span>
      </div>
      <div class="item">
        <span class="label">年罚息率</span>
        <span>{{form.dueYearsRate}}</span>
        <span>{{ form.dueRateunit + '-dueRateunitEnums' | filterDict }}</span>
        <span>{{ form.dueRateway + '-dueRatewayEnums' | filterDict }}</span>
      </div>
      <div class="item" >
        <span class="label">保证金</span>
        <span>{{form.depositRate}}</span>
        <span>{{form.depositAmount}}</span>
      </div>
      <div class="item">
        <span class="label">宽限期/年利率</span>
        <span>{{form.limitDays}}</span>
        <span>{{form.limitYearsrate}}</span>
        <span>{{ form.limitWay + '-limitwayEnums' | filterDict }}</span>
      </div>

      <div class="item">
        <span class="label">项目周期</span>
        <span>{{ formatDate(form.prjtStartDate) }}</span>
        <span>{{ formatDate(form.prjtEndDate) }}</span>
      </div>
      <div class="item">
        <span class="label">担保金额</span>
        <span>{{form.guaranteeRate}}</span>
        <span>{{form.guaranteeAmount}}</span>
        <span>{{form.guaranteeWay + '-projectSchemeGuaWayEnums' | filterDict}}</span>
      </div>
      <div class="item">
        <span class="label">确权方式</span>
        <span>{{ form.isMargindeduction + '-confWay' | filterDict }}</span>
      </div>
      <div class="item">
        <span class="label">回款方式</span>
        <span>{{ form.paymentWay + '-returnWay' | filterDict }}</span>
      </div>
      <div class="item">
        <span class="label">保证金是否作扣</span>
        <span>{{form.isMargindeduction}}</span>
      </div>
      <div class="item">
        <span class="label">保理首付款使用费支付方式</span>
        <span>{{ form.downPaymentPayway + '-procedurWay' | filterDict }}</span>
      </div>
      <div class="item">
        <span class="label">宽限期使用费支付方式</span>
        <span>{{ form.limitPayway + '-procedurWay' | filterDict }}</span>
      </div>
      <div class="item">
        <span class="label">融资用途</span>
        <span>{{ form.financingUse + '-financingPurpose' | filterDict }}</span>
      </div>
      <div class="item">
        <span class="label">还款方式</span>
        <span>{{form.ruleId}}</span>
      </div>
    </div>

    <form-label :label="'计算结果'" />
    <div class="form-wrap">
      <div class="item">
        <span class="label">本息总额</span>
        <span></span>
      </div>
      <div class="item">
        <span class="label">手续费总额</span>
        <span></span>
      </div>
      <div class="item">
        <span class="label">IRR</span>
        <span></span>
      </div>
      <div class="item">
        <span class="label">XIRR</span>
        <span></span>
      </div>
    </div>

    <el-tabs v-model="activeName">
      <el-tab-pane label="还款计划" name="1"></el-tab-pane>
      <el-tab-pane label="方案分析" name="2"></el-tab-pane>
    </el-tabs>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="期数" width="180" align="center" />
      <el-table-column prop="address" label="还款日" align="center" />
      <el-table-column prop="address" label="应收金额" align="center" />
      <el-table-column prop="address" label="本金" align="center" />
      <el-table-column prop="address" label="手续费" align="center" />
      <el-table-column prop="address" label="剩余本金" align="center" />
    </el-table>
    <!--还款计划-->
    <div v-show="activeName==='1'">
      <el-table :data="contPlandetailDTOList" style="width: 100%">
        <el-table-column prop="period" label="期数" width="180" align="center" />
        <el-table-column prop="paydate" label="还款日" align="center" />
        <el-table-column prop="rent" label="应收金额" align="center" />
        <el-table-column prop="principal" label="本金" align="center" />
        <el-table-column prop="interest" label="手续费" align="center" />
        <el-table-column prop="remainingPrincipal" label="剩余本金" align="center" />
      </el-table>
    </div>

    <!--方案分析-->
    <div v-show="activeName==='2'">
      <el-table :data="contSchemeanalysisDTOList" style="width: 100%">
        <el-table-column prop="period" label="期数" width="180" align="center" />
        <el-table-column prop="paydate" label="应付日期" align="center" />
        <el-table-column prop="address" label="现金流" align="center" />
        <el-table-column prop="cashflow" label="保理预付款" align="center" />
        <el-table-column prop="procedure" label="手续费" align="center" />
        <el-table-column prop="deposit" label="保证金" align="center" />
        <el-table-column prop="interest" label="利息收日" align="center" />
      </el-table>
    </div>
  </div>
</template>

<script>
import HeadTitle from '@/views/pages/components/head-title'
import FormLabel from '@/views/pages/components/form-label'
import Model from '@/api/factoring/contract'
import AddRouterQuery from '../mixin/add-route-query'
import moment from 'moment'

export default {
  name: 'SchemeInfo',
  components: {
    HeadTitle,
    FormLabel
  },
  mixins: [AddRouterQuery],
  data() {
    return {
      tableData: [],
      activeName: '1',
      form: {},
      contPlandetailDTOList: [],
      contSchemeanalysisDTOList: []
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
    this.fetchDetail()
  },
  methods: {
    fetchDetail() {
      const bizCode = this.$route.query.bizCode
      if (!bizCode) return
      Model.schemeView(bizCode).then(res => {
        console.log(res)
        if (!res) return
        this.form = res.contractSchemeDTO
        this.contPlandetailDTOList = res.contPlandetailDTOList
        this.contSchemeanalysisDTOList = res.contSchemeanalysisDTOList
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.form-wrap{
  display: flex;
  margin-bottom: 20px;
  .item{
    flex: 0 0 25%;
  }
}

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
      flex: 0 0 50%;
      display: flex;
      line-height: 28px;
      padding: 4px 0;
      color: #333;
      word-wrap: break-word;
      word-break: break-all;
      span{
        margin-right: 10px;
      }
      .label{
        display: inline-flex;
        padding-right: 5px;
        color: #999;
        width: 140px;
      }
      .item-wrap{
        flex: 1;
        display: flex;
        .item-wrap-contain{
          flex: 0 0 50%;
        }
      }
    }
  }
}
</style>
