<template>
  <div class="basic-info">
    <head-title :label="'保证金抵扣租金'" :showDefaultButton="false">
      <template slot="after">
        <el-button type="primary" size="mini">保 存</el-button>
        <el-button type="" size="mini">返 回</el-button>
      </template>
    </head-title>

    <el-card shadow="nerve">
      <form-label :label="'基本信息'" />
      <div class="info">
        <div class="item col-lg-12">
          <span class="label">合同编号</span>
          <span></span>
        </div>
        <div class="item col-lg-12">
          <span class="label">项目名称</span>
          <span></span>
        </div>
        <div class="item col-lg-12">
          <span class="label">保证金金额</span>
          <span></span>
        </div>
        <div class="item col-lg-12">
          <span class="label">保证金余额</span>
          <span></span>
        </div>
      </div>

      <form-label :label="'退款申请信息'" />
      <div class="info">
        <div class="item">
          <span class="label">退款金额</span>
          <el-input />
        </div>
        <div class="item">
          <span class="label">申请人</span>
          <span></span>
        </div>
        <div class="item">
          <span class="label">申请日期</span>
          <span></span>
        </div>
        <div class="item">
          <span class="label">收款单位</span>
          <el-input />
        </div>
        <div class="item">
          <span class="label">收款银行</span>
          <el-input />
        </div>
        <div class="item">
          <span class="label">收款账号</span>
          <el-input />
        </div>

        <div class="item">
          <span class="label col-lg-24">备注</span>
          <el-input />
        </div>
      </div>

      <form-label :label="'退款实付信息'" />
      <div class="info">
        <div class="item">
          <span class="label">退款日期</span>
          <span></span>
        </div>
        <div class="item">
          <span class="label">退款方式</span>
          <el-checkbox-group v-model="form.checkList">
            <el-checkbox label="a">现金</el-checkbox>
            <el-checkbox label="b">网银</el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="item">
          <span class="label">退款银行</span>
          <el-input />
        </div>
        <div class="item">
          <span class="label">退款账号</span>
          <el-input />
        </div>

        <div class="item col-lg-24">
          <span class="label">备注</span>
          <el-input />
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import HeadTitle from '@/views/pages/components/head-title'
import FormLabel from '@/views/pages/components/form-label'

export default {
  name: 'PaReturnEditor',
  components: {
    HeadTitle,
    FormLabel
  },
  data() {
    return {
      tableData: [],
      form: {}
    }
  }
}
</script>

<style lang="scss" scoped>
  .info{
    display: flex;
    flex-wrap: wrap;
    padding: 15px 0;
    .item{
      flex: 0 0 33%;
      line-height: 28px;
      padding: 4px 8px 4px 0;
      color: #333;
      word-wrap: break-word;
      word-break: break-all;
      display: flex;
      .label{
        padding-right: 5px;
        color: #999;
        flex: 0 0 140px;
      }
      &.col-lg-6{
        flex: 0 0 25%;
      }
      &.col-lg-24{
        flex: 0 0 100%;
      }
      &.col-lg-12{
        flex: 0 0 50%;
      }
    }
  }
</style>
