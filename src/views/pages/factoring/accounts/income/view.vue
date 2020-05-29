<template>
  <div class="container">
    <form-label :label="'额度信息'" />
    <div class="info">
      <div class="item">
        <span class="label">收款日期</span>
        <span>2020-05-14</span>
      </div>
      <div class="item">
        <span class="label">收款银行</span>
        <span></span>
      </div>
      <div class="item">
        <span class="label">收款账号</span>
        <span></span>
      </div>
      <div class="item">
        <span class="label">来款名称</span>
        <span></span>
      </div>
      <div class="item">
        <span class="label">付款金额</span>
        <span></span>
      </div>
      <div class="item">
        <span class="label">银行流水号</span>
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
      <div class="item">
        <span class="label">交易类别</span>
        <span></span>
      </div>
      <div class="item" style="flex: 0 0 100%;">
        <span class="label">摘要	</span>
        <span></span>
      </div>
      <div class="item" style="flex: 0 0 100%;">
        <span class="label">备注</span>
        <span>2020-05-14</span>
      </div>
    </div>
  </div>
</template>

<script>
import FormLabel from '@/views/pages/components/form-label'

export default {
  name: 'IncomeView',
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
        .label{
          padding-right: 5px;
          color: #999;
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
