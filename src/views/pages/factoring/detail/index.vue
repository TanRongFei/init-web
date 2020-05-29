<template>
    <div class="detail">
      <div class="detail-tab">
        <div class="title">
          <span>查看授信</span>
          <el-button type="primary" size="mini">返回</el-button>
        </div>
        <div class="tags">
          <div class="item">
            版本1 - - 由user负责
          </div>
          <div class="item">
            协议编号：XY-20200512162922
          </div>
        </div>
        <div class="tab-menu">
          <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="基本信息" name="first"></el-tab-pane>
            <el-tab-pane label="方案信息" name="second"></el-tab-pane>
            <el-tab-pane label="担保信息" name="third"></el-tab-pane>
            <el-tab-pane label="档案管理" name="fourth"></el-tab-pane>
          </el-tabs>
        </div>
      </div>

      <!--基本信息-->
      <div class="container" v-show="activeName==='first'">
        <table-info :data="infoData" />

        <div>
          <el-tabs v-model="activeName" @tab-click="handleClick" style="margin-bottom: 15px;">
            <el-tab-pane label="客户档案" name="first"></el-tab-pane>
          </el-tabs>

          <el-table border :data="tableData" :show-header="true" style="width: 100%">
            <el-table-column type='index' label="序号" width="50" align="center"></el-table-column>
            <el-table-column prop="type" label="资料类型" align="center"></el-table-column>
            <el-table-column prop="address" label="文件列表" align="center"></el-table-column>
            <el-table-column prop="address" label="版本" align="center"></el-table-column>
          </el-table>
        </div>

<!--        <div class="hd-title">产品信息</div>-->
        <form-label :label="'产品信息'" />
        <table-info :data="infoData2" />

        <form-label :label="'额度信息'" />
        <table-info :data="infoData3" />
      </div>

      <!--方案信息-->
      <div class="container" v-show="activeName==='second'">
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

      <!--担保信息-->
      <div class="container" v-show="activeName==='third'">
        <div class="hd-title hd-title-hit">担保信息</div>
        <form-label :label="'企业保证'" />
        <el-table border :data="tableData" :show-header="true" style="width: 100%">
          <el-table-column prop="type" label="企业名称" align="center"></el-table-column>
          <el-table-column prop="address" label="统一社会信用代码" align="center"></el-table-column>
          <el-table-column prop="address" label="关联关系" align="center"></el-table-column>
          <el-table-column prop="address" label="保证类型" align="center"></el-table-column>
          <el-table-column prop="address" label="保证金额" align="center"></el-table-column>
          <el-table-column prop="address" label="其他说明" align="center"></el-table-column>
        </el-table>

        <form-label :label="'个人保证'" />

        <el-table border :data="tableData" :show-header="true" style="width: 100%">
          <el-table-column prop="type" label="担保人名称" align="center"></el-table-column>
          <el-table-column prop="address" label="证件类型" align="center"></el-table-column>
          <el-table-column prop="address" label="证件号码" align="center"></el-table-column>
          <el-table-column prop="address" label="保证金额" align="center"></el-table-column>
          <el-table-column prop="address" label="关联关系" align="center"></el-table-column>
          <el-table-column prop="address" label="保证类型" align="center"></el-table-column>
          <el-table-column prop="address" label="其他说明" align="center"></el-table-column>
        </el-table>
      </div>

      <!--档案管理-->
      <div class="container" v-show="activeName==='fourth'">
        <div class="hd-title hd-title-hit">档案资料</div>
        <el-table border :data="tableData" :show-header="true" style="width: 100%">
          <el-table-column prop="type" label="资料清单" align="center"></el-table-column>
          <el-table-column prop="address" label="必要件" align="center"></el-table-column>
          <el-table-column prop="address" label="复印件" align="center"></el-table-column>
          <el-table-column prop="address" label="原件" align="center"></el-table-column>
          <el-table-column prop="address" label="数量" align="center"></el-table-column>
          <el-table-column prop="address" label="初审" align="center"></el-table-column>
          <el-table-column prop="address" label="附件" align="center"></el-table-column>
          <el-table-column prop="address" label="备注" align="center"></el-table-column>
          <el-table-column prop="address" label="记录人" align="center"></el-table-column>
          <el-table-column prop="address" label="记录时间" align="center"></el-table-column>
        </el-table>
      </div>
    </div>
</template>

<script>
import TableInfo from './components/table-info'
import FormLabel from '../../components/form-label'

export default {
  name: 'FactoringDetail',
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
.detail-tab{
  background-color: #ffffff;
  border: 1px solid #E4E7ED;
  border-bottom: none;
  .title{
    display: flex;
    justify-content: space-between;
    padding: 20px 25px 5px;
    span{
      display: inline-block;
      margin: 0;
      font-weight: normal;
      font-size: 26px;
      line-height: 1;
      color: #333;
    }
  }
  .tags{
    display: flex;
    justify-content: space-between;
    padding: 10px 25px;
    .item{
      height: 30px;
      line-height: 30px;
    }
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
