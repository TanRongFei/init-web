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
          <el-tab-pane label="配偶信息" name="second"></el-tab-pane>
          <el-tab-pane label="用户信息" name="third"></el-tab-pane>
          <el-tab-pane label="事件信息" name="fourth"></el-tab-pane>
          <el-tab-pane label="其他信息" name="five"></el-tab-pane>
          <el-tab-pane label="账户信息" name="six"></el-tab-pane>
          <el-tab-pane label="资料信息" name="seven"></el-tab-pane>
        </el-tabs>
      </div>
    </div>

    <!--基本信息-->
    <div class="container" v-show="activeName==='first'">
      <div class="hd-title hd-title-hit">基本信息</div>

      <table-info :data="infoData1" />

    </div>

    <!--配偶信息-->
    <div class="container" v-show="activeName==='second'">
      <div class="hd-title hd-title-hit">方案信息</div>
      <table-info :data="infoData1" />

    </div>

    <!--用户信息-->
    <div class="container" v-show="activeName==='third'">
      <div class="hd-title hd-title-hit">个人用户信息</div>
      <el-table border :data="tableData" :show-header="true" style="width: 100%">
        <el-table-column prop="type" label="企业名称" align="center"></el-table-column>
        <el-table-column prop="address" label="统一社会信用代码" align="center"></el-table-column>
        <el-table-column prop="address" label="关联关系" align="center"></el-table-column>
        <el-table-column prop="address" label="保证类型" align="center"></el-table-column>
        <el-table-column prop="address" label="保证金额" align="center"></el-table-column>
        <el-table-column prop="address" label="其他说明" align="center"></el-table-column>
      </el-table>

    </div>

    <!--事件信息-->
    <div class="container" v-show="activeName==='fourth'">
      <div class="hd-title">查看事件信息</div>
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

    <!--其他信息-->
    <div class="container" v-show="activeName==='five'">
      <div class="hd-title hd-title-hit">其他信息</div>

    </div>

    <!--账户信息-->
    <div class="container" v-show="activeName==='six'">
      <div class="hd-title hd-title-hit">银行卡绑定信息</div>

    </div>

    <!--资料信息-->
    <div class="container" v-show="activeName==='seven'">
      <div class="hd-title hd-title-hit">资料信息</div>

    </div>

  </div>
</template>

<script>
  import TableInfo from './components/table-info'

  export default {
    name: 'PersonalDetail',
    components: {
      TableInfo
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
        infoData1: {
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
            ss: '',
            aaa: '',
            bbb: '',
            ccc: '',
            ddd: '',
            eee: '',
            fff: '',
            ggg: '',
            hhh: '',
            qqq: '',
            www: '',
            rrr: '',
            ttt: '',
            yyy: '',
            uuu: ''
          },
          dict: {
            aa: '客户分类',
            bb: '客户名称',
            cc: '业务板块',
            dd: '客户性质',
            ee: '行业分类',
            ff: '客户区域',
            gg: '客户类型',
            hh: '证件类型',
            qq: '证件号码',
            ww: '户籍地址',
            rr: '国籍',
            tt: '民族',
            yy: '年龄',
            uu: '性别',
            ii: '婚否',
            oo: '学历',
            ss: '住房',
            aaa: '年限',
            bbb: '固定电话',
            ccc: '传真',
            ddd: 'Email',
            eee: '手机1',
            fff: '手机2',
            ggg: '其他联系方式',
            hhh: '工作单位',
            qqq: '工作年限',
            www: '身份',
            rrr: '办公地址',
            ttt: '邮编',
            yyy: '邮寄地址',
            uuu: '其他信息'
          },
          aa: {
            type: 'itemWidth',
            value: 100
          },
          ff: {
            type: 'itemWidth',
            value: 100
          },
          gg: {
            type: 'itemWidth',
            value: 33.3
          },
          hh: {
            type: 'itemWidth',
            value: 33.3
          },
          qq: {
            type: 'itemWidth',
            value: 33.3
          },
          uuu: {
            type: 'itemWidth',
            value: 100
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
