<template>
  <div class="container">
    <form-label :label="'来款信息'" />
    <el-table border :data="tableData" :show-header="true" style="width: 100%">
      <el-table-column prop="type" label="期数" align="center" />
      <el-table-column prop="address" label="应收日期" align="center" />
      <el-table-column prop="address" label="应收本金" align="center" />
      <el-table-column prop="address" label="本次核销本金" align="center" />
      <el-table-column prop="address" label="应收利息" align="center" />
      <el-table-column prop="address" label="本次核销利息" align="center" />
      <el-table-column prop="address" label="应收宽限期利息" align="center" />
      <el-table-column prop="address" label="本次核销宽限期利息" align="center" />
      <el-table-column prop="address" label="应收罚息" align="center" />
      <el-table-column prop="address" label="本次核销罚息" align="center" />
    </el-table>

    <form-label :label="'还款计划'" />
    <div class="info">
      <div class="item" style="flex: 0 0 100%;">
        <span class="label">项目名称</span>
        <span></span>
      </div>
      <div class="item">
        <span class="label">业务板块</span>
        <span></span>
      </div>
      <div class="item">
        <span class="label">合同编号</span>
        <span></span>
      </div>
      <div class="item">
        <span class="label">转让总额</span>
        <span></span>
      </div>
      <div class="item">
        <span class="label">放款总额</span>
        <span></span>
      </div>
      <div class="item">
        <span class="label">已收本金</span>
        <span></span>
      </div>
    </div>

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="应收账款" name="first" />
      <el-tab-pane label="其他费用" name="second" />
      <el-tab-pane label="还款计划" name="third" />
      <el-tab-pane label="转出申请" name="fourth" />
    </el-tabs>
    <!--应收账款-->
    <div v-show="activeName==='first'">
      <div class="info">
        <div class="item">
          <span class="label">凭证总额</span>
          <span></span>
        </div>
        <div class="item">
          <span class="label">凭证数量</span>
          <span></span>
        </div>
        <div class="item">
          <span class="label">已收凭证总额</span>
          <span></span>
        </div>
        <div class="item">
          <span class="label">已转出凭证总额</span>
          <span></span>
        </div>
        <div class="item">
          <span class="label">买方数量</span>
          <span>11</span>
        </div>
        <div class="item">
          <span class="label">本次转出凭证金额</span>
          <el-input type="number" />
        </div>
      </div>
      <el-table border :data="tableData" :show-header="true" style="width: 100%">
        <el-table-column prop="type" label="买方名称" align="center" />
        <el-table-column prop="address" label="转让单号" align="center" />
        <el-table-column prop="address" label="凭证号码" align="center" />
        <el-table-column prop="address" label="凭证日期" align="center" />
        <el-table-column prop="address" label="凭证金额" align="center" />
        <el-table-column prop="address" label="凭证到期日" align="center" />
        <el-table-column prop="address" label="已放款金额" align="center" />
        <el-table-column prop="address" label="已收金额" align="center" />
        <el-table-column prop="address" label="已转出金额" align="center" />
        <el-table-column prop="address" label="本次转出金额" align="center" />
        <el-table-column prop="address" label="转出完成" align="center" />
        <el-table-column prop="address" label="备注" align="center" />
      </el-table>
    </div>

    <!--其他费用-->
    <div v-show="activeName==='second'">
      <div class="info">
        <div class="item col-lg-6">
          <span class="label">费用总额</span>
          <span></span>
        </div>
        <div class="item col-lg-6">
          <span class="label">已收总额</span>
          <span></span>
        </div>
        <div class="item col-lg-6">
          <span class="label">应收总额</span>
          <span></span>
        </div>
        <div class="item col-lg-6">
          <span class="label">费用数量</span>
          <span></span>
        </div>
      </div>
      <form-label :label="'转让费用'" />
      <el-table border :data="tableData" :show-header="true" style="width: 100%">
        <el-table-column prop="type" label="费用名称" align="center" />
        <el-table-column prop="address" label="应收总额" align="center" />
        <el-table-column prop="address" label="已收总额" align="center" />
        <el-table-column prop="address" label="未收总额" align="center" />
        <el-table-column prop="address" label="是否内扣" align="center" />
        <el-table-column prop="address" label="备注" align="center" />
      </el-table>

      <form-label :label="'放款费用'" />
      <el-table border :data="tableData" :show-header="true" style="width: 100%">
        <el-table-column prop="type" label="费用名称" align="center" />
        <el-table-column prop="address" label="应收总额" align="center" />
        <el-table-column prop="address" label="已收总额" align="center" />
        <el-table-column prop="address" label="未收总额" align="center" />
        <el-table-column prop="address" label="是否内扣" align="center" />
        <el-table-column prop="address" label="备注" align="center" />
      </el-table>
    </div>

    <!--还款计划-->
    <div v-show="activeName==='third'">
      <div class="info">
        <div class="item col-lg-6">
          <span class="label">放款总额</span>
          <span></span>
        </div>
        <div class="item col-lg-6">
          <span class="label">还款计划数量</span>
          <span></span>
        </div>
        <div class="item col-lg-6">
          <span class="label">应收总额</span>
          <span></span>
        </div>
        <div class="item col-lg-6">
          <span class="label">已收总额</span>
          <span></span>
        </div>
        <div class="item col-lg-6">
          <span class="label">应收本金</span>
          <span></span>
        </div>
        <div class="item col-lg-6">
          <span class="label">已收本金</span>
          <span></span>
        </div>
        <div class="item col-lg-6">
          <span class="label">应收利息</span>
          <span></span>
        </div>
        <div class="item col-lg-6">
          <span class="label">已收利息</span>
          <span></span>
        </div>
      </div>
      <form-label :label="'还款计划'" />
      <el-table border :data="tableData" :show-header="true" style="width: 100%">
        <el-table-column prop="type" label="费用名称" align="center" />
        <el-table-column prop="address" label="应收总额" align="center" />
        <el-table-column prop="address" label="已收总额" align="center" />
        <el-table-column prop="address" label="未收总额" align="center" />
        <el-table-column prop="address" label="是否内扣" align="center" />
        <el-table-column prop="address" label="备注" align="center" />
      </el-table>
    </div>

    <!--转出申请-->
    <div v-show="activeName==='fourth'">
      <form-label :label="'申请信息'" />
      <div class="info">
        <div class="item">
          <span class="label">申请日期</span>
          <span></span>
        </div>
        <div class="item">
          <span class="label">申请金额</span>
          <span></span>
        </div>
        <div class="item">
          <span class="label">收款单位</span>
          <span></span>
        </div>
        <div class="item">
          <span class="label">收款银行</span>
          <span></span>
        </div>
        <div class="item">
          <span class="label">收款账号</span>
          <span></span>
        </div>
        <div class="item col-lg-24">
          <span class="label">支付方式</span>
          <el-checkbox-group v-model="checkList">
            <el-checkbox label="a">现金</el-checkbox>
            <el-checkbox label="b">网银</el-checkbox>
            <el-checkbox label="c">其他</el-checkbox>
            <el-checkbox label="d">承兑汇票</el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="item col-lg-24">
          <span class="label">备注</span>
          <span></span>
        </div>
      </div>

      <form-label :label="'实付信息'" />
      <div class="info">
        <div class="item">
          <span class="label">实付日期</span>
          <span></span>
        </div>
        <div class="item">
          <span class="label">转出金额</span>
          <span></span>
        </div>
        <div class="item">
          <span class="label">付款单位</span>
          <span></span>
        </div>
        <div class="item">
          <span class="label">付款银行</span>
          <span></span>
        </div>
        <div class="item">
          <span class="label">付款账号</span>
          <span></span>
        </div>
        <div class="item col-lg-24">
          <span class="label">支付方式</span>
          <el-checkbox-group v-model="checkList">
            <el-checkbox label="a">现金</el-checkbox>
            <el-checkbox label="b">网银</el-checkbox>
            <el-checkbox label="c">其他</el-checkbox>
            <el-checkbox label="d">承兑汇票</el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="item col-lg-24">
          <span class="label">备注</span>
          <span></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FormLabel from '@/views/pages/components/form-label'

export default {
  name: 'FinalView',
  components: {
    FormLabel
  },
  data() {
    return {
      activeName: 'first',
      tableData: [
        {
          id: 1,
          type: 1
        }
      ],
      checkList: [],
      infoData3: {
        data: {
          aa: '2020-05-20',
          bb: '1,111.00',
          cc: '是',
          dd: '2020-05-12',
          ee: '12月',
          ff: '2021-05-11',
          gg: '1,111.00',
          hh: '期初一次性支付'
        },
        dict: {
          aa: '授信日期',
          bb: '授信额度',
          cc: '循环授信',
          dd: '授信开始日',
          ee: '授信期限',
          ff: '授信截至日',
          gg: '可用授信余额',
          hh: '手续费支付方式'
        }
      }
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
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
        display: flex;
        .label{
          padding-right: 5px;
          color: #999;
          width: 160px;
        }
        &.col-lg-6{
          flex: 0 0 25%;
        }
        &.col-lg-24{
          flex: 0 0 100%;
        }
      }
    }
  }

  .hd-title{
    padding-top: 10px;
    border-bottom: 1px solid #d8d8d8;
    line-height: 32px;
    font-size: 15px;
    color: #333;
    font-weight: 600;
    box-sizing: border-box !important;
    &.hd-title-hit{
      font-weight: lighter;
      font-size: 18px;
      line-height: 30px;
      height: 50px;
    }
  }
</style>
