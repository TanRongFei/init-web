<template>
  <div class="basic-info">
    <head-title :label="'合同'" :showDefaultButton="false">
      <template slot="after">
        <el-button @click="handleSave" type="primary" size="mini">保 存</el-button>
        <el-button @click="backToList" type="" size="mini">返 回</el-button>
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
                  v-model="form.createdTime"
                  style="width: 100%;"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="还款截至日期">
                <el-date-picker
                  v-model="form.prjtEndDate"
                  style="width: 100%;"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="申请金额">
                <el-input v-model="form.amount" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="融资成数">
                <el-input v-model="form.amountPercent" >
                  <template slot="append">%</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="应收账款类型" >
                <el-select v-model="form.receWay" placeholder="请选择" style="width:100%;">
                  <el-option :label="item.FLAG" :value="item.CODE" v-for="item in dict.dueTypeEnums" :key="item.CODE" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>

      <form-label :label="'基础交易合同'">
        <template slot="after">
          <el-button @click="handleAddContract" type="" icon="el-icon-plus" size="mini"></el-button>
          <el-button type="" icon="el-icon-delete" size="mini"></el-button>
        </template>
      </form-label>
      <el-table :data="contractTradeVO" @selection-change="handleSelectionChange" ref="multipleTable" style="width: 100%">
        <el-table-column type="selection" width="55" />
        <el-table-column type="index" label="序号" width="50" align="center" />
        <el-table-column prop="contName" label="合同名称" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.contName" placeholder="请输入" />
          </template>
        </el-table-column>
        <el-table-column prop="contCode" label="合同编号" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.contCode" placeholder="请输入" />
          </template>
        </el-table-column>
        <el-table-column prop="contAmount" label="合同金额" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.contAmount" placeholder="请输入" type="number" />
          </template>
        </el-table-column>
        <el-table-column prop="duepayAmount" label="转让应收账款金额" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.duepayAmount" placeholder="请输入" type="number" />
          </template>
        </el-table-column>
        <el-table-column prop="signDate" label="签署日期" align="center">
          <template slot-scope="scope">
            <el-date-picker
              v-model="scope.row.signDate"
              style="width: 100%;"
              type="date"
              placeholder="选择日期" />
          </template>
        </el-table-column>
        <el-table-column prop="paymentTerm" label="账期" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.paymentTerm" placeholder="请输入" type="number" />
          </template>
        </el-table-column>
        <el-table-column prop="creditQueryResult" label="第三方征信查询结果" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.creditQueryResult" placeholder="请输入" />
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.remark" placeholder="请输入" />
          </template>
        </el-table-column>
        <el-table-column prop="fileName" label="附件" align="center"></el-table-column>
      </el-table>

      <form-label :label="'应收账款'">
        <template slot="after">
          <el-button type="" size="mini">发票验证</el-button>
          <el-button type="" size="mini">下载模板</el-button>
          <el-button type="" size="mini">批量上传</el-button>
          <el-button type="" size="mini">批量删除</el-button>
          <el-button @click="handleAddContractDuepay" type="" icon="el-icon-plus" size="mini"></el-button>
          <el-button type="" icon="el-icon-delete" size="mini"></el-button>
        </template>
      </form-label>

      <el-table :data="contractDuepayVO" style="width: 100%">
        <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
        <el-table-column prop="invoicetype" label="票据类型" align="center">
          <template slot-scope="scope">
            <el-select v-model="scope.row.invoicetype" placeholder="请选择" style="width:100%;">
              <el-option :label="item.FLAG" :value="item.CODE" v-for="item in dict.unitTypeeList" :key="item.CODE" />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="invoicecode" label="发票代码" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.invoicecode" placeholder="请输入" />
          </template>
        </el-table-column>
        <el-table-column prop="billNum" label="发票号码" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.billNum" placeholder="请输入" />
          </template>
        </el-table-column>
        <el-table-column prop="checkCodeSix" label="发票验证码后六位" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.checkCodeSix" placeholder="请输入" />
          </template>
        </el-table-column>
        <el-table-column prop="buyName" label="购买方" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.buyName" placeholder="请输入" />
          </template>
        </el-table-column>
        <el-table-column prop="billAmount" label="发票金额" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.billAmount" placeholder="请输入" />
          </template>
        </el-table-column>
        <el-table-column prop="billDate" label="开票日期" align="center">
          <template slot-scope="scope">
            <el-date-picker
              style="width: 100%;"
              v-model="scope.row.billDate"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </template>
        </el-table-column>
        <el-table-column prop="settlementWay" label="结算方式" align="center">
          <template slot-scope="scope">
            <el-select v-model="scope.row.settlementWay" placeholder="请选择" style="width:100%;">
              <el-option :label="item.FLAG" :value="item.CODE" v-for="item in dict.settlementWayEnums" :key="item.CODE" />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="fileName" label="附件" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.fileName" placeholder="请输入" />
          </template>
        </el-table-column>
        <el-table-column prop="state" label="验票真伪" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.state" placeholder="请输入" />
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import HeadTitle from '@/views/pages/components/head-title'
import FormLabel from '@/views/pages/components/form-label'
import Model from "@/api/factoring/contract";
import AddRouterQuery from '../mixin/add-route-query'

export default {
  name: 'AccountsReceivable',
  components: {
    HeadTitle,
    FormLabel
  },
  mixins: [AddRouterQuery],
  data() {
    return {
      tableData: [],
      contractTradeVO: [],
      form: {},
      contractTradeObj: { // 基础交易合同
        contBizCode: this.$route.query.bizCode ? this.$route.query.bizCode : '',
        contName: '',
        contCode: '',
        contAmount: '',
        duepayAmount: '',
        signDate: '',
        paymentTerm: '',
        creditQueryResult: '',
        remark: '',
        fileName: ''
      },
      contractDuepay: { // 应收账款
        contBizCode: this.$route.query.bizCode ? this.$route.query.bizCode : '',
        invoicetype: '',
        invoicecode: '',
        billNum: '',
        checkCodeSix: '',
        buyName: '',
        billAmount: '',
        billDate: '',
        settlementWay: '',
        fileName: '',
        state: ''
      },
      contractDuepayVO: []
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
    handleSave() {
      const param = {
        contractDuepaySchemeVO: {
          contBizCode: this.$route.query.bizCode,
          ...this.form
        },
        contractTradeVO: this.contractTradeVO.map(item => {
          delete item.index
          return item
        }),
        contractDuepayVO: this.contractDuepayVO.map(item => {
          delete item.index
          return item
        })
      }
      Model.dueSave(param)
    },
    // 添加基础交易合同
    handleAddContract() {
      const temp = JSON.parse(JSON.stringify(this.contractTradeObj))
      temp.index = this.contractTradeVO.length
      this.contractTradeVO.push(temp)
    },
    // 删除基础交易合同
    handleDelContract() {},
    // 添加应收账款
    handleAddContractDuepay() {
      const temp = JSON.parse(JSON.stringify(this.contractDuepay))
      temp.index = this.contractDuepayVO.length
      this.contractDuepayVO.push(temp)
    },
    // 删除应收账款
    handleDelContractDuepay() {},
    fetchDetail() {
      const bizCode = this.$route.query.bizCode
      if (!bizCode) return
      Model.dueView(bizCode).then(res => {
        console.log(res)
        if (!res) return
        this.form = res.contractDuepaySchemeDTO ? res.contractDuepaySchemeDTO : {}
        this.contractTradeVO = res.contractTradeDTO ? res.contractTradeDTO : []
        this.contractDuepayVO = res.contractDuepayDTO ? res.contractDuepayDTO : []
      })
    },
    handleSelectionChange(val) {
      console.log('handleSelectionChange', val)
    }
  }
}
</script>

<style scoped>

</style>
