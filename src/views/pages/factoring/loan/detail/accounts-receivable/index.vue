<template>
  <div class="basic-info">
    <head-title :label="'合同'" :showDefaultButton="false">
      <template slot="after">
        <el-button type="primary" size="mini">保 存</el-button>
        <el-button type="" size="mini">返 回</el-button>
      </template>
    </head-title>

    <el-card shadow="nerve">
      <form-label :label="'申请信息'" />
      <div class="wrap">
        <el-form :model="form" label-width="155px">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="申请日期">
                <el-date-picker
                  v-model="form.date"
                  style="width: 100%;"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="还款截至日期">
                <el-date-picker
                  v-model="form.date"
                  style="width: 100%;"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="申请金额">
                <el-input v-model="form.name" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="融资成数">
                <el-input v-model="form.name" >
                  <template slot="append">%</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="应收账款类型" >
                <el-select v-model="form.region" placeholder="请选择" style="width:100%;">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>

      <form-label :label="'基础交易合同'">
        <template slot="after">
          <el-button type="" icon="el-icon-plus" size="mini"></el-button>
          <el-button type="" icon="el-icon-delete" size="mini"></el-button>
        </template>
      </form-label>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
        <el-table-column prop="name" label="合同名称" align="center"></el-table-column>
        <el-table-column prop="address" label="合同编号" align="center"></el-table-column>
        <el-table-column prop="address" label="合同金额" align="center"></el-table-column>
        <el-table-column prop="address" label="转让应收账款金额" align="center"></el-table-column>
        <el-table-column prop="address" label="签署日期" align="center"></el-table-column>
        <el-table-column prop="address" label="账期" align="center"></el-table-column>
        <el-table-column prop="address" label="第三方征信查询结果" align="center"></el-table-column>
        <el-table-column prop="address" label="备注" align="center"></el-table-column>
        <el-table-column prop="address" label="附件" align="center"></el-table-column>
      </el-table>

      <form-label :label="'应收账款'">
        <template slot="after">
          <el-button type="" size="mini">发票验证</el-button>
          <el-button type="" size="mini">下载模板</el-button>
          <el-button type="" size="mini">批量上传</el-button>
          <el-button type="" size="mini">批量删除</el-button>
          <el-button type="" icon="el-icon-plus" size="mini"></el-button>
          <el-button type="" icon="el-icon-delete" size="mini"></el-button>
        </template>
      </form-label>

      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
        <el-table-column prop="name" label="票据类型" align="center"></el-table-column>
        <el-table-column prop="address" label="发票代码" align="center"></el-table-column>
        <el-table-column prop="address" label="发票号码" align="center"></el-table-column>
        <el-table-column prop="address" label="发票验证码后六位" align="center"></el-table-column>
        <el-table-column prop="address" label="购买方" align="center"></el-table-column>
        <el-table-column prop="address" label="发票金额" align="center"></el-table-column>
        <el-table-column prop="address" label="开票日期" align="center"></el-table-column>
        <el-table-column prop="address" label="结算方式" align="center"></el-table-column>
        <el-table-column prop="address" label="附件" align="center"></el-table-column>
        <el-table-column prop="address" label="验票真伪" align="center"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import HeadTitle from '@/views/pages/components/head-title'
import FormLabel from '@/views/pages/components/form-label'

export default {
  name: 'AccountsReceivable',
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
