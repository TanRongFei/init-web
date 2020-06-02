<template>
  <div>
    <head-title :label="'担保信息'" :showDefaultButton="showDefaultButton">
      <template slot="after">
        <el-button :disabled="disabled" type="primary" size="mini" @click="handleSubmit">保 存</el-button>
        <el-button @click="backToList" type="" size="mini">返 回</el-button>
      </template>
    </head-title>
    <div class="container">
      <form-label :label="'企业保证'">
        <template slot="after">
          <el-button @click="handleAddComp" type="" icon="el-icon-plus" size="mini" />
          <el-button type="" icon="el-icon-delete" size="mini" />
        </template>
      </form-label>
      <el-table :data="credCompGuaList" @selection-change="handleSelectionChange" style="width: 100%">
        <el-table-column type="selection" width="50" />
        <el-table-column type="index" label="序号" width="50" align="center" />
        <el-table-column prop="custName" label="名称" align="center" />
        <el-table-column prop="socialCreditCode" label="统一社会信用代码" align="center" />
        <el-table-column prop="relType" label="关联关系" align="center">
          <template slot-scope="scope">
            <el-select v-model="scope.row.relType" placeholder="请选择" style="width:100%;">
              <el-option :label="item.flag" :value="item.code" v-for="item in creditDict.compRelations" :key="item.code" />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="guaType" label="保证类型" align="center">
          <template slot-scope="scope">
            <el-select v-model="scope.row.guaType" placeholder="请选择" style="width:100%;">
              <el-option :label="item.flag" :value="item.code" v-for="item in creditDict.guaType" :key="item.code" />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="amount" label="保证金额" align="center">
          <template slot-scope="scope">
            <el-input type="number" v-model="scope.row.amount" />
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="其他说明" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.remark" />
          </template>
        </el-table-column>
      </el-table>

      <form-label :label="'个人保证'">
        <template slot="after">
          <el-button @click="handleAddPerson" type="" icon="el-icon-plus" size="mini" />
          <el-button type="" icon="el-icon-delete" size="mini" />
        </template>
      </form-label>
      <el-table :data="credPersonGuaList" @selection-change="handleSelectionChange" style="width: 100%">
        <el-table-column type="selection" width="50" />
        <el-table-column type="index" label="序号" width="50" align="center" />
        <el-table-column prop="custName" label="担保人姓名" align="center" />
        <el-table-column prop="guaType" label="证件类型" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.guaType + '-guaType' | filterDict}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="idno" label="证件号码" align="center" />
        <el-table-column prop="relType" label="关联关系" align="center">
          <template slot-scope="scope">
            <el-select v-model="scope.row.relType" placeholder="请选择" style="width:100%;">
              <el-option :label="item.flag" :value="item.code" v-for="item in creditDict.personRelations" :key="item.code" />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="guaType" label="保证类型" align="center">
          <template slot-scope="scope">
            <el-select v-model="scope.row.guaType" placeholder="请选择" style="width:100%;">
              <el-option :label="item.flag" :value="item.code" v-for="item in creditDict.guaType" :key="item.code" />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="amount" label="保证金额" align="center">
          <template slot-scope="scope">
            <el-input type="number" v-model="scope.row.creditDuration" />
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="其他说明" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.remark" />
          </template>
        </el-table-column>
      </el-table>

      <form-label :label="'抵押品'">
        <template slot="after">
          <el-button @click="handleAddMortgage" type="" icon="el-icon-plus" size="mini" />
          <el-button type="" icon="el-icon-delete" size="mini" />
        </template>
      </form-label>
      <el-table :data="credMortgageList" @selection-change="handleSelectionChange" style="width: 100%">
        <el-table-column type="selection" width="50" />
        <el-table-column type="index" label="序号" width="50" align="center" />
        <el-table-column prop="mortName" label="抵押品名称" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.certificateNo" />
          </template>
        </el-table-column>
        <el-table-column prop="certificateNo" label="权属证书及其他有关证书编号" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.certificateNo" />
          </template>
        </el-table-column>
        <el-table-column prop="mortgager" label="抵押人" align="center" />
        <el-table-column prop="area" label="面积" align="center">
          <template slot-scope="scope">
            <el-input type="number" v-model="scope.row.area" />
          </template>
        </el-table-column>
        <el-table-column prop="value" label="价值(万元)" align="center">
          <template slot-scope="scope">
            <el-input type="number" v-model="scope.row.value" />
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.remark" />
          </template>
        </el-table-column>
      </el-table>

      <form-label :label="'质押品'">
        <template slot="after">
          <el-button @click="handleAddPledge" type="" icon="el-icon-plus" size="mini" />
          <el-button type="" icon="el-icon-delete" size="mini" />
        </template>
      </form-label>
      <el-table :data="credPledgeList" @selection-change="handleSelectionChange" style="width: 100%">
        <el-table-column type="selection" width="50" />
        <el-table-column type="index" label="序号" width="50" align="center" />
        <el-table-column prop="pledgeName" label="质押品名称" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.pledgeName" />
          </template>
        </el-table-column>
        <el-table-column prop="certificateNo" label="权属证书及其他有关证书编号" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.certificateNo" />
          </template>
        </el-table-column>
        <el-table-column prop="pledgor" label="质押人" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.pledgor" />
          </template>
        </el-table-column>
        <el-table-column prop="quantity" label="数量" align="center">
          <template slot-scope="scope">
            <el-input type="number" v-model="scope.row.quantity" />
          </template>
        </el-table-column>
        <el-table-column prop="value" label="价值(万元)" align="center">
          <template slot-scope="scope">
            <el-input type="number" v-model="scope.row.value" />
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.remark" />
          </template>
        </el-table-column>
      </el-table>

      <form-label :label="'其他担保'" />
      <el-input type="textarea" v-model="form.otherGua" />

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
  name: 'CreditMgrEditorGua',
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
      credCompGuaList: [], // 企业担保
      credMortgageList: [], // 抵押品
      credPersonGuaList: [], // 个人担保
      credPledgeList: [] // 质押品
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
      Model.fetchCreditGua(bizCode).then(res => {
        console.log(res)
        if (!res) return

        this.form = JSON.parse(JSON.stringify(res))
        this.credCompGuaList = JSON.parse(JSON.stringify(res.credCompGuaList))// 企业担保
        this.credMortgageList = JSON.parse(JSON.stringify(res.credMortgageList)) // 抵押品
        this.credPersonGuaList = JSON.parse(JSON.stringify(res.credPersonGuaList)) // 个人担保
        this.credPledgeList = JSON.parse(JSON.stringify(res.credPledgeList)) // 质押品
      })
    },
    handleSubmit() {
      this.disabled = true
      const param = {
        ...this.form,
        credCompGuaList: this.credCompGuaList,
        credPersonGuaList: this.credPersonGuaList,
        credMortgageList: this.credMortgageList,
        credPledgeList: this.credPledgeList,
      }
      Model.saveCreditGua(param).then(res => {
        this.fetchDetail()
        this.disabled = false
      }).catch(() => {
        this.disabled = false
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 企业担保
    handleAddComp() {
      const temp = {
        custBizCode: this.$route.query.bizCode,
        amount: '',
        custCode: '',
        custName: '',
        guaType: '',
        relType: '',
        remark: ''
      }
      this.credCompGuaList.push(temp)
    },
    // 个人担保
    handleAddPerson() {
      const temp = {
        custBizCode: this.$route.query.bizCode,
        amount: '',
        custCode: '',
        custName: '',
        guaType: '',
        relType: '',
        remark: ''
      }
      this.credPersonGuaList.push(temp)
    },
    // 质押品
    handleAddPledge() {
      const temp = {
        pledgeName: '',
        certificateNo: '',
        pledgor: '',
        quantity: '',
        remark: '',
        value: ''
      }
      this.credPledgeList.push(temp)
    },
    // 抵押品
    handleAddMortgage() {
      const temp = {
        certificateNo: '',
        mortName: '',
        pledgor: '',
        quantity: '',
        remark: '',
        value: ''
      }
      this.credMortgageList.push(temp)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/styles/editor.scss";

</style>
