<template>
  <div class="basic-info">
    <head-title :label="'商务条款'" :showDefaultButton="false">
      <template slot="after">
        <el-button type="primary" size="mini">保 存</el-button>
        <el-button type="" size="mini">返 回</el-button>
      </template>
    </head-title>

    <el-card shadow="nerve">
      <form-label :label="'合同当事人'" />
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="当事方类型" align="center"></el-table-column>
        <el-table-column prop="address" label="当事方" align="center"></el-table-column>
        <el-table-column prop="address" label="名称" align="center"></el-table-column>
        <el-table-column prop="address" label="银行" align="center"></el-table-column>
        <el-table-column prop="address" label="账号" align="center"></el-table-column>
        <el-table-column prop="address" label="银行号" align="center"></el-table-column>
        <el-table-column prop="address" label="备注" align="center"></el-table-column>
      </el-table>

      <form-label :label="'合同明细'" />
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="合同类型" align="center"></el-table-column>
        <el-table-column prop="address" label="合同编号" align="center"></el-table-column>
        <el-table-column prop="address" label="合同名称" align="center"></el-table-column>
        <el-table-column prop="address" label="份数" align="center"></el-table-column>
        <el-table-column prop="address" label="文件" align="center"></el-table-column>
      </el-table>

      <form-label :label="'签约先决条件'" />
      <div class="wrap">
        <el-form :model="form" label-width="168px">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="合同签订需提前完成天数">
                <el-input v-model="form.name" />天
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="合同希望签订日期">
                <el-date-picker
                  v-model="form.date"
                  style="width: 100%;"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="所有签约条件完成日期">
                <el-date-picker
                  v-model="form.date"
                  style="width: 100%;"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>

      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="条款内容" align="center"></el-table-column>
        <el-table-column prop="address" label="说明" align="center"></el-table-column>
        <el-table-column prop="address" label="预计完成时间" align="center"></el-table-column>
        <el-table-column prop="address" label="协调/执行人" align="center"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
  import HeadTitle from '@/views/pages/components/head-title'
  import FormLabel from '@/views/pages/components/form-label'

  export default {
    name: 'CommercialTerms',
    components: {
      HeadTitle,
      FormLabel
    },
    data() {
      return {
        tableData: [],
        form: {}
      }
    }
  }
</script>

<style scoped>

</style>
