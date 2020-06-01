<template>
  <div class="container">
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
  name: 'CreditMgrDetailGua',
  mixins: [AddRouterQuery],
  data() {
    return {
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
