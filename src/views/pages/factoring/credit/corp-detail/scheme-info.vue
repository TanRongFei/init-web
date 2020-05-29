<template>
  <div class="container">
    <div class="hd-title hd-title-hit">方案信息</div>
    <div style="background: #f8f8f8;padding: 10px;margin-top: 10px;">
      <table-info :data="infoData4" />
    </div>

    <form-label :label="'计算结果'" />
    <table-info :data="infoData5" />

    <div>
      <el-tabs v-model="activeName" @tab-click="handleClick" style="margin-bottom: 15px;">
        <el-tab-pane label="还款计划" name="first"></el-tab-pane>
        <el-tab-pane label="方案分析" name="second"></el-tab-pane>
      </el-tabs>

      <el-table border :data="tableData" :show-header="true" style="width: 100%">
        <el-table-column prop="type" label="期数" align="center"></el-table-column>
        <el-table-column prop="address" label="还款日" align="center"></el-table-column>
        <el-table-column prop="address" label="应收金额" align="center"></el-table-column>
        <el-table-column prop="address" label="本金" align="center"></el-table-column>
        <el-table-column prop="address" label="利息" align="center"></el-table-column>
        <el-table-column prop="address" label="剩余本金" align="center"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import TableInfo from '../components/table-info'
import FormLabel from '@/views/pages/components/form-label'

export default {
  name: 'SchemeInfo',
  components: {
    TableInfo,
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
      infoData: {
        data: {
          code: 'XY-20200512162922',
          aa: 'KHSX-202005-0001',
          bb: '王者荣耀被注册成酒商标-腾讯起诉国家知识产权局'
        },
        dict: {
          code: '协议编号',
          aa: '流水号',
          bb: '客户名称'
        },
        labelWidth: 25
      },
      infoData2: {
        data: {
          aa: '正向保理',
          bb: '应收账款',
          cc: '国内',
          dd: '融资性',
          ee: '有追',
          ff: '明保理',
          gg: '单笔模式',
          hh: '单保理'
        },
        dict: {
          aa: '产品类型',
          bb: '业务类型',
          cc: '业务区域',
          dd: '贸易融资',
          ee: '有无追索权',
          ff: '保理方式',
          gg: '管理模式',
          hh: '保理商数量'
        }
      },
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
      },
      infoData4: {
        data: {
          aa: '',
          bb: '',
          cc: '',
          dd: '',
          ee: '',
          ff: '',
          gg: '',
          hh: '',
          qq: '',
          ww: '',
          rr: '',
          tt: '',
          yy: '',
          uu: '',
          ii: '',
          oo: '',
          ss: ''
        },
        dict: {
          aa: '融资申请金额',
          bb: '手续费率',
          cc: '融资成数',
          dd: '保理融资服务费率',
          ee: '资金来源',
          ff: '年罚息率',
          gg: '保证金',
          hh: '宽限期/年利率',
          qq: '项目周期',
          ww: '担保金额',
          rr: '确权方式',
          tt: '回款方式',
          yy: '保理首付款使用费',
          uu: '宽限期使用费支付方式',
          ii: '支付方式',
          oo: '融资用途',
          ss: '还款方式'
        }
      },
      infoData5: {
        data: {
          aa: '',
          bb: '',
          cc: '',
          dd: ''
        },
        dict: {
          aa: '本息总额',
          bb: '利息金额',
          cc: 'IRR',
          dd: 'XIRR'
        },
        itemWidth: 25
      },
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
        flex: 0 0 50%;
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

