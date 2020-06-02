<template>
  <div class="container">
<!--    <form-label :label="'分配额度'" />-->
    <el-table :data="form.list" style="width: 100%">
      <el-table-column prop="index" label="序号" width="50" align="center" />
      <el-table-column prop="applyDate" label="申请日期" align="center" />
      <el-table-column prop="credCode" label="授信编号" align="center" />
      <el-table-column prop="address" label="授信期限" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.creditStartDate | formatDate}}</span>
          -
          <span>{{scope.row.creditEndDate | formatDate}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="occupiedAmount" label="已占用授信额度" align="center" />
      <el-table-column prop="ftCreditAmount" label="保理分配额度" align="center" />
    </el-table>
  </div>
</template>

<script>
import HeadTitle from '@/views/pages/components/head-title'
import FormLabel from '@/views/pages/components/form-label'
import Model from '@/api/factoring/credit'
import AddRouterQuery from '../mixin/add-route-query'

export default {
  name: 'CreditMgrDetailCreditHistory',
  mixins: [AddRouterQuery],
  components: { HeadTitle, FormLabel },
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
      Model.fetchCreditHistory(bizCode).then(res => {
        console.log(res)
        if (!res) return
        this.form = JSON.parse(JSON.stringify(res))
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/styles/editor.scss";

</style>

