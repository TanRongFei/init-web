<template>
  <div class="basic-info">
    <head-title :label="'方案信息'" :showDefaultButton="false">
      <template slot="after">
        <el-button type="primary" size="mini">保 存</el-button>
      </template>
    </head-title>

    <el-card shadow="nerve">
      <form-label :label="'还款计划'" />
      <div class="form-wrap">
        <div class="item">
          <span class="label">申请人</span>
          <span></span>
        </div>
        <div class="item">
          <span class="label">所属部门</span>
          <span></span>
        </div>
        <div class="item">
          <span class="label">授信方式</span>
          <span></span>
        </div>
        <div class="item">
          <span class="label">还款计划生成方式</span>
          <span></span>
        </div>
        <div class="item">
          <span class="label">融资成数</span>
          <span></span>
        </div>
        <div class="item">
          <span class="label">还款方式</span>
          <span></span>
        </div>
        <div class="item">
          <span class="label">申请金额</span>
          <span></span>
        </div>
        <div class="item">
          <span class="label">保证金</span>
          <span></span>
        </div>
        <div class="item">
          <span class="label">融资服务费率</span>
          <span></span>
        </div>
        <div class="item">
          <span class="label">手续费率</span>
          <span></span>
        </div>
      </div>

      <form-label :label="'还款计划'">
        <template slot="after">
          <el-button type="" size="mini">下载模板</el-button>
          <el-button type="" size="mini">批量上传</el-button>
          <el-button type="" icon="el-icon-plus" size="mini"></el-button>
          <el-button type="" icon="el-icon-delete" size="mini"></el-button>
        </template>
      </form-label>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="期数" width="180" align="center" />
        <el-table-column prop="address" label="还款日" align="center" />
        <el-table-column prop="address" label="应收金额" align="center" />
        <el-table-column prop="address" label="本金" align="center" />
        <el-table-column prop="address" label="手续费" align="center" />
        <el-table-column prop="address" label="剩余本金" align="center" />
      </el-table>
    </el-card>
  </div>
</template>

<script>
import HeadTitle from '@/views/pages/components/head-title'
import FormLabel from '@/views/pages/components/form-label'

export default {
  name: 'SchemeInfo',
  components: {
    HeadTitle,
    FormLabel
  },
  data() {
    return {
      tableData: [],
      activeName: '1',
      form: {}
    }
  }
}
</script>

<style lang="scss" scoped>
.form-wrap{
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
  .item{
    flex: 0 0 50%;
    height: 32px;
    line-height: 32px;
  }
}
</style>
