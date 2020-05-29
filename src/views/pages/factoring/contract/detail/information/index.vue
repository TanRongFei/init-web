<template>
  <div class="container">
    <form-label :label="'资料信息'" />

    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="datumName" label="资料清单" width="180" align="center" />
      <el-table-column prop="isMust" label="必要件" align="center" />
      <el-table-column prop="isCopy" label="复印件" align="center" />
      <el-table-column prop="isOriginal" label="原件" align="center" />
      <el-table-column prop="address" label="附件" align="center" />
      <el-table-column prop="recordUserName" label="上传人" align="center" />
      <el-table-column prop="recordDate" label="上传时间" align="center" />
      <el-table-column prop="remark" label="备注" align="center" />
    </el-table>
  </div>
</template>

<script>
import FormLabel from '@/views/pages/components/form-label'
import Model from '@/api/factoring/contract'
import AddRouterQuery from '../mixin/add-route-query'

export default {
  name: 'Information',
  components: {
    FormLabel
  },
  mixins: [AddRouterQuery],
  data() {
    return {
      tableData: []
    }
  },
  created() {
    this.fetchDetail()
  },
  methods: {
    fetchDetail() {
      const bizCode = this.$route.query.bizCode
      if (!bizCode) return
      Model.fileView(bizCode).then(res => {
        console.log(res)
        if (!res) return
        this.tableData = res.contFileDTO ? res.contFileDTO : []
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .container{
    padding: 20px 25px;
    margin-top: 18px;
    background-color: #fff;
    border: 1px solid #d9d9d9;
    position: relative;
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
        .label{
          padding-right: 5px;
          color: #999;
        }
      }
    }
  }
</style>
