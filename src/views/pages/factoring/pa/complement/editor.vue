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
        <div class="item">
          <span class="label">保证金金额</span>
          <span></span>
        </div>
        <div class="item">
          <span class="label">保证金余额</span>
          <span></span>
        </div>
        <div class="item">
          <span class="label">本次抵扣金额</span>
          <span></span>
        </div>
        <div class="item col-lg-12">
          <span class="label">来款（银行流水）</span>
          <el-select v-model="form.region" placeholder="请选择" >
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </div>
        <div class="item col-lg-12">
          <span class="label">可用余额</span>
          <span></span>
        </div>
        <div class="item col-lg-24">
          <span class="label">本次补足金额</span>
          <el-input style="width: 200px;" />
        </div>
        <div class="item col-lg-12">
          <span class="label">操作人</span>
          <span></span>
        </div>
        <div class="item col-lg-12">
          <span class="label">操作日期</span>
          <span></span>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import HeadTitle from '@/views/pages/components/head-title'
import FormLabel from '@/views/pages/components/form-label'

export default {
  name: 'PaMgrEditor',
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
      &.col-lg-12{
        flex: 0 0 50%;
      }
    }
  }
</style>
