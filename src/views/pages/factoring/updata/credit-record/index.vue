<template>
  <div class="basic-info">
    <head-title :label="'授信记录'" :showDefaultButton="false">
      <template slot="after">
        <el-button type="" size="mini">返 回</el-button>
      </template>
    </head-title>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column type='index' label="序号" width="50" align="center"></el-table-column>
      <el-table-column prop="name" label="申请日期" width="180" align="center"></el-table-column>
      <el-table-column prop="code" label="授信编号" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="handleDetail('FactoringDetail', scope.row)">{{scope.row.code}}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="授信额度" align="center"></el-table-column>
      <el-table-column prop="address" label="授信期限" align="center"></el-table-column>
      <el-table-column prop="address" label="已占用授信额度" align="center"></el-table-column>
      <el-table-column prop="address" label="保理分配额度" align="center"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import HeadTitle from '../../../components/head-title'

export default {
  name: 'FactoringFacility',
  components: {
    HeadTitle
  },
  data() {
    return {
      tableData: [
        {
          id: 1,
          status: 1,
          code: 's123',
          codename: '中金云创'
        }
      ]
    }
  },
  methods: {
    handleDetail(pathName, item) {
      this.$router.push({ name: pathName, query: { code: item.code } })
      this.$store.dispatch('app/setLeftSidebarRouters', {})
    }
  }
}
</script>

<style scoped>

</style>
