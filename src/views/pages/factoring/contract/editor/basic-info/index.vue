<template>
  <div class="basic-info">
    <head-title :label="'合同'" :showDefaultButton="showDefaultButton">
      <template slot="after">
        <el-button type="primary" size="mini" @click="handleSave">保 存</el-button>
        <el-button @click="backToList" type="" size="mini">返 回</el-button>
      </template>
    </head-title>

    <el-card shadow="never">
      <form-label :label="'基本信息'" />
      <div class="wrap">
        <baseinfo-form :data="baseInfo" :permitDTOList="permitDTOList" ref="baseForm" />
      </div>

      <form-label :label="'授信产品'" />
      <div class="wrap">
        <quota-form />
      </div>

      <form-label :label="'客户信息'" >
        <template slot="after" >
          <div style="width: 300px;">
            <el-select v-model="info" placeholder="请选择" style="width:100%;">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </div>
        </template>
      </form-label>

      <form-label :label="'交易对象信息'">
        <template slot="after">
          <el-button type="" icon="el-icon-plus" size="mini"></el-button>
          <el-button type="" icon="el-icon-delete" size="mini"></el-button>
        </template>
      </form-label>
      <div class="wrap">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column type="selection" width="50" />
          <el-table-column prop="name" label="卖/买方名称" align="center"></el-table-column>
          <el-table-column prop="address" label="其他信息" align="center"></el-table-column>
        </el-table>
      </div>

      <div class="wrap">
        <el-form :model="form" label-width="80px">
          <el-form-item label="产品信息">
            <el-input v-model="form.name" type="textarea" />
          </el-form-item>
          <el-form-item label="借款用途">
            <el-input v-model="form.name" type="textarea" />
          </el-form-item>
          <el-form-item label="交易条件">
            <el-input v-model="form.name" type="textarea" />
          </el-form-item>
        </el-form>
      </div>

    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import HeadTitle from '@/views/pages/components/head-title'
import FormLabel from '@/views/pages/components/form-label'
import QuotaForm from './components/quota-form'
import BaseinfoForm from './components/baseinfo-form.vue'
import Model from '@/api/factoring/contract'
import AddRouterQuery from '../mixin/add-route-query'

export default {
  name: 'BasicInfo',
  components: {
    HeadTitle,
    FormLabel,
    QuotaForm,
    BaseinfoForm
  },
  mixins: [AddRouterQuery],
  data() {
    return {
      showDefaultButton: false,
      form: {},
      baseInfo: {},
      info: '',
      tableData: [],
      permitDTOList: [], // 客户列表
      activeName: 'first'
    }
  },
  computed: {
    ...mapGetters([
      'dict'
    ])
  },
  created() {
    this.fetchBase()
    this.fetchCustlist()
  },
  methods: {
    // 客户列表
    fetchCustlist() {
      Model.custlist({}).then(res => {
        console.log(res)
        this.permitDTOList = res.permitDTOList
      })
    },
    // 查看合同方案信息
    fetchBase() {
      const bizCode = this.$route.query.bizCode
      if (!bizCode) return
      Model.viewInfo(bizCode).then(res => {
        console.log('fetchBase', res)
        this.baseInfo = JSON.parse(JSON.stringify(res))
      })
    },
    handleSave() {
      // contractInfoDTO 一些基本信息
      // 买方信息
      const param = {
        contractInfoDTO: {
          ...this.$refs.baseForm.form
        },
        contBuyerDTO: []
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
