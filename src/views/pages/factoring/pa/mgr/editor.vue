<template>
  <div class="basic-info">
    <head-title :label="'前期款收取'" :showDefaultButton="false">
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
          <span class="label">合同金额</span>
          <span></span>
        </div>
      </div>

      <form-label :label="'收取信息'" />
      <div class="info">
        <div class="item">
          <span class="label">费用类型</span>
          <el-select v-model="form.region" placeholder="请选择" style="width: 100%;">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </div>
        <div class="item">
          <span class="label">保证金金额</span>
          <span></span>
        </div>
        <div class="item">
          <span class="label">已收取保证金金额</span>
          <span></span>
        </div>
        <div class="item">
          <span class="label">收款单位</span>
          <el-select v-model="form.region" placeholder="请选择" style="width: 100%;">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </div>
        <div class="item">
          <span class="label">收款银行</span>
          <el-select v-model="form.region" placeholder="请选择" style="width: 100%;">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </div>
        <div class="item">
          <span class="label">收款账号</span>
          <el-select v-model="form.region" placeholder="请选择" style="width: 100%;">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </div>
        <div class="item">
          <span class="label">付款单位</span>
          <el-select v-model="form.region" placeholder="请选择" style="width: 100%;">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </div>
        <div class="item">
          <span class="label">收款银行</span>
          <el-select v-model="form.region" placeholder="请选择" style="width: 100%;">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </div>
        <div class="item">
          <span class="label">收款账号</span>
          <el-select v-model="form.region" placeholder="请选择" style="width: 100%;">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </div>
        <div class="item">
          <span class="label">收款金额</span>
          <el-input />
        </div>
        <div class="item">
          <span class="label">计划收取日期</span>
          <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;" />
        </div>
        <div class="item">
          <span class="label">实收I日期</span>
          <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;" />
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
      padding: 4px 8px 4px 4px;
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
