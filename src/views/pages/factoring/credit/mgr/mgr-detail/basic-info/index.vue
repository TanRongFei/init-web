<template>
  <div class="container">
    <form-label :label="'方案信息'" />
    <div class="info">
      <div class="item">
        <span class="label">授信编号</span>
        <span></span>
      </div>
      <div class="item">
        <span class="label">客户编号</span>
        <span>{{form.custCode}}</span>
      </div>
      <div class="item">
        <span class="label">客户名称</span>
        <span>{{form.custName}}</span>
      </div>
      <div class="item">
        <span class="label">归属集团</span>
        <span>{{form.parentGroup}}</span>
      </div>
      <div class="item">
        <span class="label">客户经理</span>
        <span>{{form.createdName}}</span>
      </div>
      <div class="item">
        <span class="label">客户经理等级</span>
        <span>{{form.managerLevel}}</span>
      </div>
    </div>

    <el-tabs v-model="activeName">
      <el-tab-pane label="客户档案" name="1"></el-tab-pane>
    </el-tabs>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" label="序号" width="50" align="center" />
      <el-table-column prop="period" label="资料类型" align="center" />
      <el-table-column prop="paydate" label="文件列表" align="center" />
      <el-table-column prop="" label="版本" align="center" />
    </el-table>

    <form-label :label="'额度信息'" />
    <div class="info">
      <div class="item">
        <span class="label">申请日期</span>
        <span>{{form.applyDate}}</span>
      </div>
      <div class="item">
        <span class="label">授信额度</span>
        <span>{{form.creditAmount}}</span>
      </div>
      <div class="item">
        <span class="label">循环授信</span>
        <span>{{form.annualRate}}</span>
      </div>
      <div class="item">
        <span class="label">授信期限</span>
        <span>{{form.creditDuration}}</span>
      </div>
      <div class="item">
        <span class="label">授信开始日</span>
        <span>{{form.creditStartDate}}</span>
      </div>
      <div class="item">
        <span class="label">授信截止日</span>
        <span>{{form.creditEndDate}}</span>
      </div>
      <div class="item">
        <span class="label">已占用授信额度</span>
        <span>{{form.occupiedAmount}}</span>
      </div>
    </div>

    <form-label :label="'分配额度'" />
    <el-table :data="form.credPlatAllocationList" style="width: 100%">
      <el-table-column type="index" label="序号" width="50" align="center" />
      <el-table-column prop="productName" label="产品" align="center" />
      <el-table-column prop="allocateAmount" label="分配额度" align="center" />
      <el-table-column prop="creditDuration" label="授信期限" align="center" />
    </el-table>

  </div>
</template>

<script>
import HeadTitle from '@/views/pages/components/head-title'
import FormLabel from '@/views/pages/components/form-label'
import Model from '@/api/factoring/credit'
import AddRouterQuery from '../mixin/add-route-query'

export default {
  name: 'CreditMgrDetailBasic',
  components: {
    HeadTitle,
    FormLabel
  },
  mixins: [AddRouterQuery],
  data() {
    return {
      tableData: [],
      activeName: '1',
      form: {},
      contPlandetailDTOList: [],
      contSchemeanalysisDTOList: []
    }
  },
  created() {
    this.fetchDetail()
  },
  methods: {
    fetchDetail() {
      const bizCode = this.$route.query.bizCode
      if (!bizCode) return
      Model.fetchCreditPlatform(bizCode).then(res => {
        console.log(res)
        if (!res) return
        this.form = res.contractSchemeDTO
        this.contPlandetailDTOList = res.contPlandetailDTOList
        this.contSchemeanalysisDTOList = res.contSchemeanalysisDTOList
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/styles/editor.scss";
</style>
