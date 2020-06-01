<template>
  <div class="basic-info">
    <head-title :label="'合同'" :showDefaultButton="showDefaultButton">
      <template slot="after">
        <el-button type="primary" size="mini" @click="handleSave">保 存</el-button>
        <el-button @click="backToList" type="" size="mini">返 回</el-button>
      </template>
    </head-title>

    {{unChange}}
    <el-form :model="form">
      <el-form-item label="合同编号" >
        <el-input v-model="form.auth" />
      </el-form-item>
    </el-form>

    <el-card shadow="never">
      <form-label :label="'基本信息'" />
      <div class="wrap">
        <baseinfo-form :data="baseInfo" :permitDTOList="permitDTOList" ref="baseForm" />
      </div>

      <form-label :label="'授信产品'" />
      <div class="wrap">
<!--        <quota-form />-->
        <el-form :model="form" label-width="120px" :label-position="'left'" ref="form">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="有无追索权" prop="name">
                <el-radio-group v-model="form.hasRecourse" class="set-sidebar-mode">
                  <el-radio :label="1"><span style="font-size: 14px;">是</span></el-radio>
                  <el-radio :label="0"><span style="font-size: 14px;">否</span></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="保理方式" prop="name">
                <el-radio-group v-model="form.factoringType" class="set-sidebar-mode">
                  <el-radio :label="1"><span style="font-size: 14px;">明保理</span></el-radio>
                  <el-radio :label="0"><span style="font-size: 14px;">暗保理</span></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="24">
              <el-checkbox v-model="isHandove" label="1" disabled>资料是否交接</el-checkbox>
              <el-checkbox v-model="governModel" label="2">是否单笔保理</el-checkbox>
            </el-col>
          </el-row>
        </el-form>
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
            <el-input v-model="form.productInfo" type="textarea" />
          </el-form-item>
          <el-form-item label="借款用途">
            <el-input v-model="form.usageLoan" type="textarea" />
          </el-form-item>
          <el-form-item label="交易条件">
            <el-input v-model="form.tradeCdt" type="textarea" />
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
      disabled: false,
      showDefaultButton: false,
      form: {},
      saveForm: {},
      unChange: true,
      baseInfo: {},
      info: '',
      tableData: [],
      permitDTOList: [], // 客户列表
      activeName: 'first'
    }
  },
  computed: {
    isHandove: {
      get() {
        if (this.form.isHandove === 0 || !this.form.isHandove) return false
        if (this.form.isHandove === 1) return  true
      },
      set(v) {
        if (v) {
          this.form.isHandove = 1
        } else {
          this.form.isHandove = 0
        }
        return v
      }
    },
    governModel: {
      get() {
        if (this.form.governModel === 0 || !this.form.governModel) return false
        if (this.form.governModel === 1) return  true
      },
      set(v) {
        if (v) {
          this.form.governModel = 1
        } else {
          this.form.governModel = 0
        }
        return v
      }
    },
    ...mapGetters([
      'dict'
    ])
  },
  watch: {
    // form: {
    //   deep: true,
    //   handler(n, o) {
    //     const _this = this
    //     for (let i in _this.form) {
    //       if(n[i] != _this.saveForm[i]) {
    //         _this.unChange = false
    //         break;
    //       }else {
    //         _this.unChange = true
    //       }
    //     }
    //   }
    // }
  },
  created() {
    console.log(this.$route.query.bizCode)

    this.fetchBase()
    // this.fetchCustlist()
  },
  methods: {
    // 客户列表
    fetchCustlist() {
      Model.custlist({}).then(res => {
        console.log(res)
        if (!res) return
        this.permitDTOList = res.permitDTOList
      })
    },
    // 查看合同方案信息
    fetchBase() {
      const bizCode = this.$route.query.bizCode
      if (!bizCode) return
      Model.viewInfo(bizCode).then(res => {
        console.log('fetchBase', res)
        if (!res) return
        this.baseInfo = JSON.parse(JSON.stringify(res))
        this.form = res
        this.saveForm = JSON.parse(JSON.stringify(res))
      })
    },
    handleSave() {
      // contractInfoDTO 一些基本信息
      // 买方信息
      this.disabled = true
      const param = {
        contractInfoDTO: {
          ...this.$refs.baseForm.form,
          ...this.form
        },
        contBuyerDTO: []
      }
      Model.save(param).then(res => {
        this.fetchBase()
        this.disabled = false
      }).catch(() => {
        this.disabled = false
      })
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
