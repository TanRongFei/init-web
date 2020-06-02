<template>
  <div>
    <head-title :label="'合同'" :showDefaultButton="showDefaultButton">
      <template slot="after">
        <el-button :disabled="disabled" type="primary" size="mini" @click="handleSubmit">保 存</el-button>
        <el-button @click="backToList" type="" size="mini">返 回</el-button>
      </template>
    </head-title>
    <div class="container">
      <form-label :label="'额度信息'" />
      <el-form :rules="rules" :model="form" label-width="120px" ref="form">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="授信编号">
              <el-input v-model="form.ftCredCode" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="客户名称">
              <span>{{form.custName}}</span>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="产品类型">
              <span>{{form.productType}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="授信额度">
              <el-input v-model="form.creditAmount" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="可用授信余额">
              <el-input v-model="form.creditBalance" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="授信分配总额度">
              <span>{{form.distributeAmount}}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <form-label :label="'额度分配'">
        <template slot="after">
          <el-button @click="handleAddFtAllocation" type="" icon="el-icon-plus" size="mini" />
          <el-button type="" icon="el-icon-delete" size="mini" />
        </template>
      </form-label>
      <el-table :data="credFtAllocationList" @selection-change="handleSelectionChange" style="width: 100%">
        <el-table-column type="selection" width="50" />
        <el-table-column type="index" label="序号" width="50" align="center" />
        <el-table-column prop="custName" label="买/卖方名称" width="180" align="center" />
        <el-table-column prop="allocateAmount" label="分配额度" align="center" />
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
          <el-button @click="handleAddFtUsePremise" type="" icon="el-icon-plus" size="mini" />
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

      <form-label :label="'放款前提'">
        <template slot="after">
          <el-button @click="handleAddFtLoanPremise" type="" icon="el-icon-plus" size="mini" />
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

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import rules from '@/views/mixins/rules'
import AddRouteQuery from '../mixin/add-route-query'
import FormLabel from '@/views/pages/components/form-label'
import HeadTitle from '@/views/pages/components/head-title'
import Model from '@/api/factoring/credit'

export default {
  name: 'CreditQuotaEditorBasic',
  components: { FormLabel, HeadTitle },
  mixins: [rules, AddRouteQuery],
  data() {
    return {
      disabled: false,
      showDefaultButton: false,
      multipleSelection: [],
      form: {},
      value: false,
      activeName: '1',
      credFtAllocationList: [], // 额度分配
      credFtLoanPremiseList: [], // 放款前提
      credFtUsePremiseList: [] // 用信前提
    }
  },
  computed: {
    ...mapGetters([
      'dict'
    ])
  },
  created() {
    this.fetchDetail()
  },
  methods: {
    fetchDetail() {
      const bizCode = this.$route.query.bizCode
      if (!bizCode) return
      Model.fetchCredDistribution({ bizCode }).then(res => {
        console.log(res)
        if (!res) return
        this.form = JSON.parse(JSON.stringify(res))
        this.credFtAllocationList = JSON.parse(JSON.stringify(res.credFtAllocationList))
        this.credFtLoanPremiseList = JSON.parse(JSON.stringify(res.credFtLoanPremiseList))
        this.credFtUsePremiseList = JSON.parse(JSON.stringify(res.credFtUsePremiseList))
      })
    },
    handleSubmit() {
      this.disabled = true
      this.$refs.form.validate((valid) => {
        if (valid) {
          const param = {
            ...this.form,
            credFtAllocationList: this.credFtAllocationList,
            credFtLoanPremiseList: this.credFtLoanPremiseList,
            credFtUsePremiseList: this.credFtUsePremiseList
          }
          Model.saveCredDistribution(this.form).then(res => {
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
    // 额度分配
    handleAddFtAllocation() {
      const temp = {
        custName: '',
        allocateAmount: '',
        creditBalance: '',
        remark: ''
      }
      this.credFtAllocationList.push(temp)
    },
    // 放款前提
    handleAddFtLoanPremise() {
      const temp = {
        counterpartyName: '',
        remark: ''
      }
      this.credFtLoanPremiseList.push(temp)
    },
    // 用信前提
    handleAddFtUsePremise() {
      const temp = {
        counterpartyName: '',
        remark: ''
      }
      this.credFtUsePremiseList.push(temp)
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
