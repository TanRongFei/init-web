<template>
  <div class="factoring-survey">
    <el-card shadow="never" style="margin-bottom: 10px;">
      <div class="wrap">
        <div class="item item-6">
          <div class="it-icon">
            <span>01</span>
            <span>合同</span>
          </div>
          <div class="sub-tit">
            <span>{{compMap.totalCount ? compMap.totalCount : 0}}个</span>
            <i>/</i>
            <span>总额: {{compMap.totalMoney}} <span v-show="compMap.totalMoney">元</span></span>
          </div>
        </div>
        <div class="item item-6">
          <div class="it-icon">
            <span>02</span>
            <span>放款</span>
          </div>
          <div class="sub-tit">
            <span>{{loanMap.totalCount ? loanMap.totalCount : 0}}个</span>
            <i>/</i>
            <span>总额: {{loanMap.totalMoney}} <span v-show="loanMap.totalMoney">元</span></span>
          </div>
        </div>
        <div class="item item-6">
          <div class="it-icon">
            <span>03</span>
            <span>回款</span>
          </div>
          <div class="sub-tit">
            <span>{{finaMap.totalCount ? finaMap.totalCount : 0}}个</span>
            <i>/</i>
            <span>总额: {{finaMap.totalMoney}} <span v-show="finaMap.totalMoney">元</span></span>
          </div>
        </div>
        <div class="item item-6">
          <div class="it-icon">
            <span>04</span>
            <span>还款</span>
          </div>
          <div class="sub-tit">
            <span>{{loanPlanMap.totalCount ? loanPlanMap.totalCount : 0}}个</span>
            <i>/</i>
            <span>总额: {{loanPlanMap.totalMoney}} <span v-show="loanPlanMap.totalMoney">元</span></span>
          </div>
        </div>
      </div>
    </el-card>

    <el-row :gutter="10" style="margin-bottom: 10px;">
      <el-col :span="12">
        <el-card shadow="never">
          <pie-chart :chartData="chartData" :title="'数量统计(个)'"></pie-chart>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="never">
          <pie-chart :chartData="chartData" :title="'金额统计(元)'"></pie-chart>
        </el-card>
      </el-col>
    </el-row>

    <el-card shadow="never" style="margin-bottom: 10px;">
      <line-chart :chartData="loanInfoList" :title="'放款计划'"></line-chart>
    </el-card>

    <el-card shadow="never">
      <line-chart :chartData="planDetailList" :title="'回款计划'"></line-chart>
    </el-card>
  </div>
</template>

<script>
import PieChart from '@/views/pages/components/echarts/PieChart'
import LineChart from '@/views/pages/components/echarts/LineChart'
import Model from '@/api/factoring/survey'

export default {
  name: 'Survey',
  components: { PieChart, LineChart },
  data() {
    return {
      chartData: [
        {value: 335, name: '直接访问'},
        {value: 310, name: '邮件营销'},
        {value: 234, name: '联盟广告'},
        {value: 135, name: '视频广告'},
        {value: 1548, name: '搜索引擎'}
      ],
      compMap: {},
      finaMap: {},
      loanMap: {},
      loanPlanMap: {},
      loanInfoList: {
        xAxisData: [],
        legendData: ['appMoney', 'payMoney'],
        appMoney: [],
        payMoney: [],
        dict: ['预计放款金额', '实际放款金额']
      }, // 每月的放款情况
      planDetailList: {
        xAxisData: [],
        legendData: ['paidRent', 'rent'],
        paidRent: [],
        rent: [],
        dict: ['实际回款', '预计回款']
      } // 每月的回款情况
    }
  },
  created() {
    this.countView()
  },
  methods: {
    countView() {
      // const res = await Model.countView()
      Model.countView().then(res => {
        console.log('countView', res)
        if (!res) return
        this.compMap = res.compMap
        this.finaMap = res.finaMap
        this.loanMap = res.loanMap
        this.loanPlanMap = res.loanPlanMap

        // 每月的放款情况
        res.loanInfoList.forEach(item => {
          this.loanInfoList.xAxisData.push(item.yearMonth)
          this.loanInfoList.appMoney.push(item.appMoney)
          this.loanInfoList.payMoney.push(item.payMoney)
        })

        // 每月的回款
        res.planDetailList.forEach(item => {
          this.planDetailList.xAxisData.push(item.yearMonth)
          this.planDetailList.paidRent.push(item.paidRent)
          this.planDetailList.rent.push(item.rent)
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.factoring-survey{
  .wrap{
    display: flex;
    .item{
      padding: 0 15px;
    }
    .item-6{
      flex: 0 0 25%
    }
    .item-12{
      flex: 0 0 50%
    }

    .it-icon{
      position: relative;
      width: 100%;
      height: 40px;
      line-height: 40px;
      border-radius: 3px;
      background: #ffb173;
      transform:skew(-10deg);
      padding: 0 15px;
      font-size: 16px;
      color: #ffffff;
      >span{
        margin-right: 10px;
      }
    }

    .sub-tit{
      font-size: 13px;
      color: #666;
      line-height: 24px;
      padding: 5px 10px;
      border-bottom: 1px solid #eee;
      >i{
        font-style: italic;
        margin: 0 2px;
        color: #ddd;
      }
    }
  }
}
</style>
