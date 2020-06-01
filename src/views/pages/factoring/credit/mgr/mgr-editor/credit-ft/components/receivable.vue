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
    <div class="container">
      <div>
        <span>应收账款类型</span>
        <el-select v-model="form.receivablesType	" placeholder="请选择活动区域">
          <el-option label="区域一" value="1"></el-option>
          <el-option label="区域二" value="2"></el-option>
        </el-select>
      </div>

      <form-label :label="'基础交易合同'">
        <template slot="after">
          <el-button @click="handleAddBasecont" type="" icon="el-icon-plus" size="mini" />
          <el-button type="" icon="el-icon-delete" size="mini" />
        </template>
      </form-label>
      <el-table :data="basecontList" @selection-change="handleSelectionChange" style="width: 100%">
        <el-table-column type="selection" width="50" />
        <el-table-column type="index" label="序号" width="50" align="center" />
        <el-table-column prop="contName" label="合同名称" width="180" align="center">
          <template slot-scope="scope">
            <el-input type="number" v-model="scope.row.contName" />
          </template>
        </el-table-column>
        <el-table-column prop="contCode" label="合同编号" align="center">
          <template slot-scope="scope">
            <el-input type="number" v-model="scope.row.contCode" />
          </template>
        </el-table-column>
        <el-table-column prop="contAmount" label="合同金额" align="center">
          <template slot-scope="scope">
            <el-input type="number" v-model="scope.row.contAmount" />
          </template>
        </el-table-column>
        <el-table-column prop="receiveablesAmount" label="转让应收账款金额" align="center">
          <template slot-scope="scope">
            <el-input type="number" v-model="scope.row.receiveablesAmount" />
          </template>
        </el-table-column>
        <el-table-column prop="signDate" label="签署日期" align="center">
          <template slot-scope="scope">
            <el-date-picker type="date" placeholder="选择日期" v-model="scope.row.signDate" style="width: 100%;" />
          </template>
        </el-table-column>
        <el-table-column prop="paymentTerm" label="账期" align="center">
          <template slot-scope="scope">
            <el-input type="number" v-model="scope.row.paymentTerm" />
          </template>
        </el-table-column>
        <el-table-column prop="creditQueryResult" label="第三方征信查询结果" align="center">
          <template slot-scope="scope">
            <el-input type="number" v-model="scope.row.creditQueryResult" />
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" align="center">
          <template slot-scope="scope">
            <el-input type="number" v-model="scope.row.remark" />
          </template>
        </el-table-column>

        <el-table-column prop="remark" label="附件" align="center">
          <template slot-scope="scope">
            ss
          </template>
        </el-table-column>
      </el-table>

      <form-label :label="'应收账款'">
        <template slot="after">
          <el-button @click="handleAddReceivable" type="" icon="el-icon-plus" size="mini" />
          <el-button type="" icon="el-icon-delete" size="mini" />
        </template>
      </form-label>
      <el-table :data="receivablesList" @selection-change="handleSelectionChange" style="width: 100%">
        <el-table-column type="selection" width="50" />
        <el-table-column type="index" label="序号" width="50" align="center" />
        <el-table-column prop="billType" label="票据类型" width="180" align="center">
          <template slot-scope="scope">
            <el-input type="number" v-model="scope.row.billType" />
          </template>
        </el-table-column>
        <el-table-column prop="billCode" label="发票代码" align="center">
          <template slot-scope="scope">
            <el-input type="number" v-model="scope.row.billCode" />
          </template>
        </el-table-column>
        <el-table-column prop="billNo" label="发票号码" align="center">
          <template slot-scope="scope">
            <el-input type="number" v-model="scope.row.billNo" />
          </template>
        </el-table-column>
        <el-table-column prop="billVerifyCode" label="发票验证码后六位" align="center">
          <template slot-scope="scope">
            <el-input type="number" v-model="scope.row.billVerifyCode" />
          </template>
        </el-table-column>
        <el-table-column prop="buyerName" label="购买方" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.buyerName" />
          </template>
        </el-table-column>
        <el-table-column prop="billValue" label="发票金额" align="center">
          <template slot-scope="scope">
            <el-input type="number" v-model="scope.row.billValue" />
          </template>
        </el-table-column>
        <el-table-column prop="issueDate" label="开票日期" align="center">
          <template slot-scope="scope">
            <el-date-picker type="date" placeholder="选择日期" v-model="scope.row.issueDate" style="width: 100%;" />
          </template>
        </el-table-column>
        <el-table-column prop="clearingForm" label="结算方式" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.clearingForm" />
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="附件" align="center">
          <template slot-scope="scope">
            ss
          </template>
        </el-table-column>
        <el-table-column prop="identity" label="验票真伪" align="center">
          <template slot-scope="scope">
            <el-input type="number" v-model="scope.row.identity" />
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
  name: 'CreditMgrEditorCreditFtReceivable',
  components: { FormLabel, HeadTitle },
  mixins: [rules],
  props: {
    active: {
      type: String
    }
  },
  data() {
    return {
      showDefaultButton: false,
      disabled: false,
      multipleSelection: [],
      form: {},
      value: false,
      activeName: this.active,
      basecontList: [], // 基础交易合同
      receivablesList: [] // 应收账款
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
      Model.fetchReceivables(bizCode).then(res => {
        console.log(res)
        if (!res) return
        this.form = JSON.parse(JSON.stringify(res))
        this.basecontList = JSON.parse(JSON.stringify(res.basecontList)) // 基础交易合同
        this.receivablesList = JSON.parse(JSON.stringify(res.receivablesList)) // 应收账款
      })
    },
    handleSubmit() {
      this.disabled = true

      const param = {
        bizCode: this.$route.query.bizCode,
        basecontList: this.basecontList,
        receivablesList: this.receivablesList,
        receivablesType: this.form.receivablesType
      }
      Model.saveReceivables(param).then(res => {
        this.fetchDetail()
        this.disabled = false
      }).catch(() => {
        this.disabled = false
      })
    },
    // 基础交易合同
    handleAddBasecont() {
      const temp = {
        contName: '',
        contCode: '',
        contAmount: '',
        receiveablesAmount: '',
        signDate: '',
        paymentTerm: '',
        creditQueryResult: '',
        remark: ''
      }
      this.basecontList.push(temp)
    },
    // 应收账款
    handleAddReceivable() {
      const temp = {
        billType: '',
        billCode: '',
        billNo: '',
        billVerifyCode: '',
        buyerName: '',
        billValue: '',
        issueDate: '',
        clearingForm: ''
      }
      this.receivablesList.push(temp)
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
