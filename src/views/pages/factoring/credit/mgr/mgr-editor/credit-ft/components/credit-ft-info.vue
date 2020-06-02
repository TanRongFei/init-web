<template>
  <div>
    <head-title :label="'保理授信'" :showDefaultButton="showDefaultButton">
      <template slot="after">
        <el-button :disabled="disabled" type="primary" size="mini" @click="handleSubmit">保 存</el-button>
        <el-button @click="backToList" type="" size="mini">返 回</el-button>
      </template>
    </head-title>
    <el-tabs v-model="activeName" @tab-click="handleTab">
      <el-tab-pane label="授信信息" name="1"></el-tab-pane>
      <el-tab-pane label="应收账款" name="2"></el-tab-pane>
    </el-tabs>
    <div class="container" >
      <el-form :rules="rules" :model="form" label-width="120px" ref="form">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="申请日期">
              <el-date-picker
                style="width: 100%;"
                disabled
                v-model="form.applyDate"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="授信额度">
              <el-input v-model="form.creditAmount" type="number" disabled />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="循环授信">
              <el-switch
                disabled
                style="display: block;height:36px;line-height: 36px;"
                v-model="value">
              </el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="授信开始日">
              <el-date-picker
                style="width: 100%;"
                disabled
                v-model="form.creditStartDate"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12"><el-form-item label="授信期限">
            <el-select v-model="form.creditDuration" placeholder="请选择" style="width:100%;" disabled>
              <el-option :label="item.flag" :value="item.code" v-for="item in creditDict.duration	" :key="item.code" />
            </el-select>
          </el-form-item></el-col>
          <el-col :span="12"><el-form-item label="授信截至日">
            <el-date-picker
              style="width: 100%;"
              v-model="form.creditEndDate"
              disabled
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="占用授信余额">
              <el-input v-model="form.creditBalance" type="number" disabled />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <form-label :label="'授信产品'" />
      <el-form :rules="rules" :model="form" label-width="120px" ref="form">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="产品类型">
              <el-radio-group v-model="form.productType">
                <el-radio :label="item.code" v-for="item in creditDict.productType" :key="item.code">{{item.flag}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="业务类型">
              <el-radio-group v-model="form.businessType">
                <el-radio :label="item.code" v-for="item in creditDict.businessType" :key="item.code">{{item.flag}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="业务区域">
              <el-radio-group v-model="form.businessArea">
                <el-radio :label="item.code" v-for="item in creditDict.businessArea" :key="item.code">{{item.flag}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="保理方式">
              <el-radio-group v-model="form.factoringType">
                <el-radio :label="item.code" v-for="item in creditDict.factoringMode" :key="item.code">{{item.flag}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="有无追索权">
              <el-radio-group v-model="form.hasRecourse">
                <el-radio :label="item.code" v-for="item in creditDict.hasRecourse" :key="item.code">{{item.flag}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="保理商数量">
              <el-radio-group v-model="form.factoryCount">
                <el-radio :label="item.code" v-for="item in creditDict.factorCount" :key="item.code">{{item.flag}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="管理模式">
              <el-radio-group v-model="form.governModel">
                <el-radio :label="item.code" v-for="item in creditDict.manageMode" :key="item.code">{{item.flag}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <form-label :label="'交易对象'">
        <template slot="after">
          <el-button @click="handleAddAllocation" type="" icon="el-icon-plus" size="mini" />
          <el-button type="" icon="el-icon-delete" size="mini" />
        </template>
      </form-label>
      <el-table :data="credFtAllocationList" style="width: 100%">
        <el-table-column type="selection" width="50" />
        <el-table-column prop="index" label="序号" width="50" align="center" />
        <el-table-column prop="custName" label="买/卖方名称" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.custName" />
          </template>
        </el-table-column>
        <el-table-column prop="allocateAmount" label="额度" align="center">
          <template slot-scope="scope">
            <el-input type="number" v-model="scope.row.allocateAmount" />
          </template>
        </el-table-column>
        <el-table-column prop="creditBalance" label="剩余额度" align="center">
          <template slot-scope="scope">
            <el-input type="number" v-model="scope.row.creditBalance" />
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="说明" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.remark" />
          </template>
        </el-table-column>
      </el-table>

      <form-label :label="'用信前提'">
        <template slot="after">
          <el-button @click="handleAddLoan" type="" icon="el-icon-plus" size="mini" />
          <el-button type="" icon="el-icon-delete" size="mini" />
        </template>
      </form-label>
      <el-table :data="credFtLoanPremiseList" @selection-change="handleSelectionChange" style="width: 100%">
        <el-table-column type="selection" width="50" />
        <el-table-column type="index" label="序号" width="50" align="center" />
        <el-table-column prop="counterpartyName" label="前提对象" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.counterpartyName" />
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="说明" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.remark" />
          </template>
        </el-table-column>
      </el-table>

      <form-label :label="'放款前提'">
        <template slot="after">
          <el-button @click="handleAddUse" type="" icon="el-icon-plus" size="mini" />
          <el-button type="" icon="el-icon-delete" size="mini" />
        </template>
      </form-label>
      <el-table :data="credFtUsePremiseList" @selection-change="handleSelectionChange" style="width: 100%">
        <el-table-column type="selection" width="50" />
        <el-table-column type="index" label="序号" width="50" align="center" />
        <el-table-column prop="counterpartyName" label="前提对象" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.counterpartyName" />
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="说明" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.remark" />
          </template>
        </el-table-column>
      </el-table>

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import rules from '@/views/mixins/rules'
import FormLabel from '@/views/pages/components/form-label'
import HeadTitle from '@/views/pages/components/head-title'
import Model from '@/api/factoring/credit'

export default {
  name: 'CreditMgrEditorCreditFtInfo',
  components: { FormLabel, HeadTitle },
  mixins: [rules],
  props: {
    active: {
      type: String
    }
  },
  data() {
    return {
      disabled: false,
      showDefaultButton: false,
      multipleSelection: [],
      form: {},
      value: false,
      activeName: this.active,
      credFtAllocationList: [], // 交易对象
      credFtLoanPremiseList: [], // 放款前提
      credFtUsePremiseList: [] // 用信前提
    }
  },
  computed: {
    ...mapGetters([
      'creditDict'
    ])
  },
  created() {
    this.fetchDetail()
  },
  methods: {
    fetchDetail() {
      const bizCode = this.$route.query.bizCode
      if (!bizCode) return
      Model.fetchCreditFt(bizCode).then(res => {
        console.log(res)
        if (!res) return
        this.form = JSON.parse(JSON.stringify(res))
        this.credFtAllocationList = JSON.parse(JSON.stringify(res.credFtAllocationList)) // 交易对象
        this.credFtLoanPremiseList = JSON.parse(JSON.stringify(res.credFtLoanPremiseList)) // 放款前提
        this.credFtUsePremiseList = JSON.parse(JSON.stringify(res.credFtUsePremiseList)) // 用信前提
      })
    },
    handleSubmit() {
      this.disabled = true
      this.$refs.form.validate((valid) => {
        if (valid) {
          const param = {
            ...this.form,
            isLoopCredit: this.value ? 1 : 0,
            credFtAllocationList: this.credFtAllocationList,
            credFtLoanPremiseList: this.credFtLoanPremiseList,
            credFtUsePremiseList: this.credFtUsePremiseList
          }
          Model.saveCreditPlatform(param).then(res => {
            this.fetchDetail()
            this.disabled = false
          }).catch(() => {
            this.disabled = false
          })
        } else {
          console.log('error submit!!')
          return false;
        }
      })
    },
    // 交易对象
    handleAddAllocation() {
      // 额度分配
      const temp = {
        custName: '',
        allocateAmount: '',
        creditBalance: '',
        remark: ''
      }
      this.credFtAllocationList.push(temp)
    },
    // 放款前提
    handleAddLoan() {
      // 额度分配
      const temp = {
        counterpartyName: '',
        remark: ''
      }
      this.credFtLoanPremiseList.push(temp)
    },
    // 用信前提
    handleAddUse() {
      // 额度分配
      const temp = {
        counterpartyName: '',
        remark: ''
      }
      this.credFtUsePremiseList.push(temp)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    backToList() {
      this.$emit('backToList')
    },
    handleTab(v) {
      this.$emit('handleTab', v.name)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/styles/editor.scss";

</style>
