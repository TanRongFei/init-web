<template>
  <div class="container">
    <form-label :label="'资料信息'" />

    <el-table :data="credDistriFileList" style="width: 100%">
      <el-table-column prop="datumName" label="资料清单" width="180" align="center" />
      <el-table-column prop="isMust" label="必要件" align="center" />
      <el-table-column prop="isCopy" label="复印件" align="center" />
      <el-table-column prop="isOriginal" label="原件" align="center" />
      <el-table-column prop="address" label="附件" align="center" />
      <el-table-column prop="remark" label="备注" align="center" />
      <el-table-column prop="recordUserName" label="记录人" align="center" />
      <el-table-column prop="recordDate" label="记录时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.recordDate | formatDate }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import HeadTitle from '@/views/pages/components/head-title'
import FormLabel from '@/views/pages/components/form-label'
import Model from '@/api/factoring/credit'
import AddRouterQuery from '../mixin/add-route-query'

export default {
  name: 'CreditQuotaDetailCreditFile',
  mixins: [AddRouterQuery],
  components: { HeadTitle, FormLabel },
  data() {
    return {
      form: {},
      credDistriFileList: []
    }
  },
  created() {
    this.fetchDetail()
  },
  methods: {
    fetchDetail() {
      const bizCode = this.$route.query.bizCode
      if (!bizCode) return
      Model.fetchCredDistributionFile(bizCode).then(res => {
        console.log(res)
        if (!res) return
        this.form = JSON.parse(JSON.stringify(res))
        this.credDistriFileList = JSON.parse(JSON.stringify(res.credDistriFileList))
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/styles/editor.scss";

</style>

