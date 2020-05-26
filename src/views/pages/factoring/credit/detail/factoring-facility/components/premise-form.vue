<template>
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
    <el-table-column prop="date" label="前提对象" align="center"></el-table-column>
    <el-table-column prop="name" label="说明" align="center"></el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'PremiseForm',
  data() {
    return {
      tableData: []
    }
  }
}
</script>

<style scoped>

</style>
