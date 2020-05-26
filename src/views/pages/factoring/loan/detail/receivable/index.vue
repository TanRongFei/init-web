<template>
  <div class="basic-info">
    <head-title :label="''" :showDefaultButton="showDefaultButton">
      <template slot="after">
        <el-button type="primary" size="mini" @click="handleSave">保 存</el-button>
<!--        <el-button type="" size="mini" @click="back">返 回</el-button>-->
      </template>
    </head-title>

    <el-card shadow="never">
      <form-label :label="'基本信息'" />
      <div class="wrap">
        <baseinfo-form ref="baseForm" :data="form" />
      </div>

      <form-label :label="'基础交易合同'">
        <template slot="after">
          <el-button type="" icon="el-icon-plus" size="mini"></el-button>
          <el-button type="" icon="el-icon-delete" size="mini"></el-button>
        </template>
      </form-label>
      <div class="wrap">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column type="index" label="序号" width="50" />
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
      </div>

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
      <div class="wrap">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column type="selection" width="50" />
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
      </div>

    </el-card>
  </div>
</template>

<script>
import HeadTitle from '@/views/pages/components/head-title'
import FormLabel from '@/views/pages/components/form-label'
import QuotaForm from './components/quota-form'
import BaseinfoForm from './components/baseinfo-form.vue'
import Model from '@/api/factoring/contract'

export default {
  name: 'BasicInfo',
  components: {
    HeadTitle,
    FormLabel,
    QuotaForm,
    BaseinfoForm
  },
  data() {
    return {
      showDefaultButton: false,
      form: {},
      info: '',
      tableData: [],
      activeName: 'first'
    }
  },
  created() {
    this.fetchBase()
  },
  methods: {
    fetchBase() {
      const param = this.$route.query
      if (!param) return
      Model.viewInfo(param).then(res => {
        console.log('fetchBase', res)
      })
    },
    handleSave() {
      const param = {
        ...this.$refs.baseForm.form
      }
      Model.save(param)
    },
    back() {
      this.$router.back()
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap{
  margin-bottom: 20px;
}
</style>
