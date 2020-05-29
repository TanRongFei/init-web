<template>
  <div class="container" >
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
</template>

<script>
import TableInfo from '../components/table-info'

export default {
  name: 'UserInfo',
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
