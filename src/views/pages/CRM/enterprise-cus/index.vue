<template>
  <div class="table-layout">
    <div class="left-sidebar">
      <div class="scope" @click="isCollapse = !isCollapse" :class="{'anition': isCollapse}">
        <div class="left-item" v-show="!isCollapse">
          <img src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80">
          <span>user</span>
        </div>
        <div class="right-item">
          <i v-show="!isCollapse" class="el-icon-s-fold"></i>
          <i v-show="isCollapse" class="el-icon-s-unfold"></i>
        </div>
      </div>

      <div v-show="!isCollapse" class="scope list" :class="{'anition': isCollapse}">
        <div
          class="item"
          :class="{active: item.code === selected.code}"
          v-for="item in list"
          :key="item.code"
          @click="handleSelect(item)">
          <span>{{item.label}}</span>
        </div>
      </div>
    </div>
    <div class="container" :class="{full: isCollapse}">
      <div class="header">
        <div class="head-title">
          <h4>{{selected.label}}</h4>
          <span>共11个</span>
        </div>
        <div class="header-edit">
          <el-button type="primary" size="mini">添 加</el-button>
          <el-button type="primary" size="mini">查 看</el-button>
          <el-button type="primary" size="mini">编 辑</el-button>
          <el-button type="primary" size="mini">删 除</el-button>
          <el-button type="primary" size="mini" disabled>保 存</el-button>
          <el-button type="primary" size="mini" disabled>提交流程</el-button>
          <el-button type="primary" size="mini" disabled>查看流程</el-button>
          <el-button type="primary" size="mini" disabled>套 打</el-button>
        </div>
      </div>
      <div class="search"></div>
      <div class="main">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="date" label="日期" width="180"></el-table-column>
          <el-table-column prop="name" label="姓名" width="180"></el-table-column>
          <el-table-column prop="address" label="地址"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import Module from '@/api/CRM/sysrole'

export default {
  name: 'EnterpriseCus',
  data() {
    return {
      isCollapse: false,
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ],
      list: [
        {
          label: '企业客户',
          code: 1
        },
        {
          label: '客户变更',
          code: 2
        },
        {
          label: '客户评级',
          code: 3
        },
        {
          label: '管理员变更',
          code: 4
        },
        {
          label: '企业用户变更',
          code: 5
        },
        {
          label: '企业用户',
          code: 6
        },
        {
          label: '客户黑名单',
          code: 7
        },
        {
          label: '邀请注册',
          code: 8
        }
      ],
      selected: {}
    }
  },
  created() {
    this.handleSelect(this.list[0])
    this.fetch()
  },
  methods: {
    fetch() {
      Module.fetchList({}).then(res => {
        console.log(res)
      })
    },
    handleSelect(item) {
      this.selected = item
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="scss" scoped>
.table-layout{
  position: relative;
  .left-sidebar{
    position: absolute;
    left: 0;
    top: 0;
    width: 220px;
    margin-right: 10px;
    z-index: 99;
    user-select:none;
    .scope{
      transition: width .4s;
      width: 220px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #ffffff;
      padding: 8px;
      margin-bottom: 16px;
      font-size: 14px;
      cursor: pointer;
      border: 1px solid #d8d8d8;
      .left-item{
        display: flex;
        align-items: center;
        img{
          width: 32px;
          height: 32px;
          margin-right: 4px;
        }
      }
      .right-item{
        height: 32px;
        line-height: 32px;
        font-size: 20px;
        color: #606266;
      }
      &.list{
        display: flex;
        flex-direction: column;
        padding: 0;
        .item{
          width: 100%;
          height: 42px;
          line-height: 42px;
          border-bottom: 1px solid #EBEEF5;
          text-align: left;
          font-size: 14px;
          color: #606266;
          font-weight: normal;
          span{
            margin-left: 20px;
          }
          &:hover{
            color: #427fed;
          }
          &.active{
            background-color: #eeeeee;
            font-weight: bold;
            border-left: 2px solid #427fed;
          }
        }
      }
    }
  }
  .container{
    position: absolute;
    left: 0;
    right: 0;
    height: 100%;
    margin-left: 235px;
    transition: margin .4s;
    &.full{
      margin-left: 65px;
    }
    .header{
      display: flex;
      justify-content: space-between;
      .head-title{
        display: flex;
        align-items: center;
        margin-bottom: 12px;
        h4{
          margin: 0;
          font-size: 20px;
          color: #414141;
          line-height: 35px;
          font-weight: normal;
        }
        span{
          margin-left: 10px;
          color: #999;
          font-size: 14px;
          line-height: 35px;
        }
      }
    }
  }
}

.scope.anition{
  width: 50px !important;
  .right-item{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
