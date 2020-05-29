<template>
  <div class="basic-info">
    <head-title :label="'用信信息'" :showDefaultButton="false">
      <template slot="after">
        <el-button @click="backToList" type="" size="mini">返 回</el-button>
      </template>
    </head-title>

    <el-card shadow="nerve">
      <form-label :label="'用信前提'" />
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
        <el-table-column prop="name" label="前提对象" align="center"></el-table-column>
        <el-table-column prop="address" label="说明" align="center"></el-table-column>
      </el-table>

      <form-label :label="'放款前提'" />
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
        <el-table-column prop="name" label="前提对象" align="center"></el-table-column>
        <el-table-column prop="address" label="说明" align="center"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import HeadTitle from '@/views/pages/components/head-title'
import FormLabel from '@/views/pages/components/form-label'
import Model from "@/api/factoring/contract";
import AddRouterQuery from '../mixin/add-route-query'

export default {
  name: 'Information',
  components: {
    HeadTitle,
    FormLabel
  },
  data() {
    return {
      tableData: []
    }
  },
  mixins: [AddRouterQuery],
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

<style scoped>

</style>
