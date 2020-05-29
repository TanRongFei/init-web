<template>
  <div class="container">
    <form-label :label="'用信前提'" />
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" label="序号" width="50" align="center" />
      <el-table-column prop="name" label="前提对象" align="center" />
      <el-table-column prop="address" label="说明" align="center" />
    </el-table>

    <form-label :label="'放款前提'" />
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" label="序号" width="50" align="center" />
      <el-table-column prop="name" label="前提对象" align="center" />
      <el-table-column prop="address" label="说明" align="center" />
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
      Model.businessInfoView(bizCode).then(res => {
        console.log(res)
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
