<template>
  <div class="basic-info">
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
          <span></span>
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
          <span></span>
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
          <span class="label">付款单位</span>
          <span></span>
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
          <span class="label">收款金额</span>
          <span></span>
        </div>
        <div class="item">
          <span class="label">计划收取日期</span>
          <span></span>
        </div>
        <div class="item">
          <span class="label">实收I日期</span>
          <span></span>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import FormLabel from '@/views/pages/components/form-label'
import Model from '@/api/factoring/pa'

export default {
  name: 'PaMgrEditor',
  components: {
    FormLabel
  },
  data() {
    return {
      tableData: [],
      form: {}
    }
  },
  created() {
    this.fetchDetail()
  },
  methods: {
    fetchDetail() {
      const bizCode = this.$route.query.bizCode
      if (!bizCode) return
      Model.viewBaseInfo(bizCode).then(res => {
        console.log(res)
        if (!res) return
        this.form = JSON.parse(JSON.stringify(res))
        this.credPlatAllocationList = JSON.parse(JSON.stringify(res.credPlatAllocationList))
      })
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
