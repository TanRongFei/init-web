<template>
  <div>
    <head-title :label="'前期款收取'" :showDefaultButton="showDefaultButton">
      <template slot="after">
        <el-button :disabled="disabled" type="primary" size="mini" @click="handleSubmit">保 存</el-button>
        <el-button @click="$router.back()" type="" size="mini">返 回</el-button>
      </template>
    </head-title>
    <div class="container">
      <form-label :label="'基本信息'" />
      <el-form :rules="rules" :model="paPreamt" label-width="120px" ref="paPreamt">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="合同编号">
              <el-input v-model="paPreamt.contCode" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目名称">
              <el-input v-model="paPreamt.custCode" disabled />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="合同金额">
              <el-input v-model="paPreamt.contAmount" disabled />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <form-label :label="'收取信息'" />
      <el-form :rules="rules" :model="paPreamtDetailList" label-width="140px" ref="form">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="费用类型">
<!--              <el-select v-model="paPreamtDetailList.costType" placeholder="请选择" style="width:100%;">-->
<!--                <el-option :label="item.flag" :value="item.code" v-for="item in initBase.expenseType" :key="item.code" />-->
<!--              </el-select>-->
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="保证金金额">
              <el-input v-model="paPreamtDetailList.creditAmount" disabled />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="已收取保证金金额">
              <el-input v-model="paPreamtDetailList.creditAmount" disabled />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="收款单位">
              <el-input v-model="paPreamtDetailList.recPayee" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="收款银行">
<!--              <el-select v-model="paPreamtDetailList.recBankname" placeholder="请选择" style="width:100%;">-->
<!--                <el-option :label="item.bankName" :value="item.bankNumber" v-for="item in initBase.payee.banks" :key="item.bankNumber" />-->
<!--              </el-select>-->
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="收款账号">
              <el-input v-model="paPreamtDetailList.recAccountnum" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="付款单位">
              <el-input v-model="paPreamtDetailList.payPayee" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="付款银行">
<!--              <el-select v-model="paPreamtDetailList.payBankname" placeholder="请选择" style="width:100%;" disabled>-->
<!--                <el-option :label="item.bankName" :value="item.bankNumber" v-for="item in initBase.payer.banks" :key="item.bankNumber" />-->
<!--              </el-select>-->
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="付款账号">
              <el-input v-model="paPreamtDetailList.payAccountnum" disabled />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="收款金额">
              <el-input v-model="paPreamtDetailList.recAmount" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="计划收取日期">
              <el-date-picker
                style="width: 100%;"
                v-model="paPreamtDetailList.planGatherTime"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="实收I日期">
              <el-date-picker
                style="width: 100%;"
                v-model="form.realityGatherTime	"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <br />

      </el-form>

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import rules from '@/views/mixins/rules'
import FormLabel from '@/views/pages/components/form-label'
import HeadTitle from '@/views/pages/components/head-title'
import Model from '@/api/factoring/pa'
import { isPlainObject } from '@/utils'

export default {
  name: 'CreditMgrEditorBasic',
  components: { FormLabel, HeadTitle },
  mixins: [rules],
  data() {
    return {
      disabled: false,
      showDefaultButton: false,
      multipleSelection: [],
      form: {},
      paPreamt: {},
      paPreamtDetailList	: {},
      initBase: {},
      credPlatAllocationList: [] // 额度分配
    }
  },
  computed: {
    ...mapGetters([
      'creditDict'
    ])
  },
  created() {
    // this.fetchDetail()
    // this.fetchInitBase()
  },
  methods: {
    fetchDetail() {
      const bizCode = this.$route.query.bizCode
      if (!bizCode) return
      Model.viewBaseInfo(bizCode).then(res => {
        console.log(res)
        if (!res) return
        this.form = JSON.parse(JSON.stringify(res))
        this.credPlatAllocationList = JSON.parse(JSON.stringify(res.credPlatAllocationList))
      })
    },
    fetchInitBase() {
      Model.initBase().then(res => {
        console.log('fetchInitBase', res)
        if (!res) return
        this.initBase = JSON.parse(JSON.stringify(res))
        this.initBase.expenseType = []

        const _this = this
        for (let key in res.expenseType) {
          _this.initBase.expenseType.push({
            code: key,
            flag: res.expenseType[key]
          })
        }
      })
    },
    handleSubmit() {
      this.disabled = true

      const param = {
        paPreamt: this.paPreamt,
        paPreamtDetailList: this.paPreamtDetailList
      }
      Model.saveBaseInfo(param).then(res => {
        this.fetchDetail()
        this.disabled = false
      }).catch(() => {
        this.disabled = false
      })
    },
    handleAdd() {
      // 额度分配
      const temp = {
        productCode: '',
        productName: '',
        allocateAmount: '',
        creditDuration: this.form.creditAmount
      }
      this.credPlatAllocationList.push(temp)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/styles/editor.scss";

</style>
