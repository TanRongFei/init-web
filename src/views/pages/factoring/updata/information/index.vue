<template>
  <div class="basic-info">
    <head-title :label="'编辑授信信息'" :showDefaultButton="false">
      <template slot="after">
        <el-button type="primary" size="mini">保 存</el-button>
        <el-button type="" size="mini">返 回</el-button>
      </template>
    </head-title>

    <el-card shadow="nerve">
      <form-label :label="'资料信息'">
        <template slot="after">
          <el-button type="" icon="el-icon-plus" size="mini"></el-button>
          <el-button type="" icon="el-icon-delete" size="mini"></el-button>
        </template>
      </form-label>

      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="资料清单" width="180" align="center"></el-table-column>
        <el-table-column prop="address" label="必要件" align="center"></el-table-column>
        <el-table-column prop="address" label="复印件" align="center"></el-table-column>
        <el-table-column prop="address" label="原件" align="center"></el-table-column>
        <el-table-column prop="address" label="附件" align="center"></el-table-column>
        <el-table-column prop="address" label="上传人" align="center"></el-table-column>
        <el-table-column prop="address" label="上传时间" align="center"></el-table-column>
        <el-table-column prop="address" label="备注" align="center"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import HeadTitle from '../../../components/head-title'
import FormLabel from '../../../components/form-label'

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
  }
}
</script>

<style scoped>

</style>
