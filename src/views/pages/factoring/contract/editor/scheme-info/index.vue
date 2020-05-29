<template>
  <div class="basic-info">
    <head-title :label="'方案信息'" :showDefaultButton="false">
      <template slot="after">
        <el-button @click="handleSave" type="primary" size="mini">保 存</el-button>
        <el-button @click="backToList" type="" size="mini">返 回</el-button>
      </template>
    </head-title>

    <el-card shadow="nerve">
      <div class="wrap">
        <el-form :rules="rules"  ref="form" :model="form" label-width="120px">
          <el-row :gutter="20">
            <el-col :span="10">
              <el-row :gutter="10">
                <el-col :span="16">
                  <el-form-item label="融资申请金额" prop="prjtAmountorg">
                    <el-input v-model="form.prjtAmountorg"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-select v-model="form.unitOrg" placeholder="请选择" style="width:100%;">
                    <el-option :label="item.FLAG" :value="item.CODE" v-for="item in dict.unitTypeeList" :key="item.CODE" />
                  </el-select>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="10">
              <el-row :gutter="10">
                <el-col :span="14">
                  <el-form-item label="手续费率" prop="procedureRate">
                    <el-input v-model="form.procedureRate">
                      <template slot="append">%</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-input v-model="form.procedureAmount"></el-input>
                </el-col>
              </el-row>
            </el-col>

            <el-col :span="4">
              <el-select v-model="form.procedureWay" placeholder="请选择" style="width:100%;">
                <el-option :label="item.FLAG" :value="item.CODE" v-for="item in dict.procedureWayEnums" :key="item.CODE" />
              </el-select>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="10">
              <el-row :gutter="10">
                <el-col :span="16">
                  <el-form-item label="融资成数" prop="amountPercent">
                    <el-input v-model="form.amountPercent">
                      <template slot="append">%</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-input v-model="form.amount"></el-input>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="10">
              <el-row :gutter="10">
                <el-col :span="14">
                  <el-form-item label="保理融资利率" prop="annualRate">
                    <el-input v-model="form.annualRate">
                      <template slot="append">%</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-input v-model="form.annualRateunit"></el-input>
                </el-col>
              </el-row>
            </el-col>

            <el-col :span="4">
              <el-select v-model="form.annualRateway" placeholder="请选择" style="width:100%;">
                <el-option :label="item.FLAG" :value="item.CODE" v-for="item in dict.annualRatewayEnums" :key="item.CODE" />
              </el-select>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="10">
              <el-form-item label="资金来源" prop="moneySrc">
                <el-input v-model="form.moneySrc"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-row :gutter="10">
                <el-col :span="14">
                  <el-form-item label="年罚息率" prop="dueYearsRate">
                    <el-input v-model="form.dueYearsRate">
                      <template slot="append">%</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-select v-model="form.dueRateunit" placeholder="请选择" style="width:100%;">
                    <el-option :label="item.FLAG" :value="item.CODE" v-for="item in dict.dueRateunitEnums" :key="item.CODE" />
                  </el-select>
                </el-col>
              </el-row>
            </el-col>

            <el-col :span="4">
              <el-select v-model="form.dueRateway" placeholder="请选择" style="width:100%;">
                <el-option :label="item.FLAG" :value="item.CODE" v-for="item in dict.dueRatewayEnums" :key="item.CODE" />
              </el-select>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="10">
              <el-row :gutter="10">
                <el-col :span="16">
                  <el-form-item label="保证金">
                    <el-input v-model="form.depositRate">
                      <template slot="append">%</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-input v-model="form.depositAmount" />
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="10">
              <el-row :gutter="10">
                <el-col :span="14">
                  <el-form-item label="宽限期/年利率">
                    <el-input v-model="form.limitDays">
                      <template slot="append">天</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-input v-model="form.limitYearsrate">
                    <template slot="append">%</template>
                  </el-input>
                </el-col>
              </el-row>
            </el-col>

            <el-col :span="4">
              <el-select v-model="form.limitWay" placeholder="请选择" style="width:100%;">
                <el-option :label="item.FLAG" :value="item.CODE" v-for="item in dict.limitwayEnums" :key="item.CODE" />
              </el-select>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="10">
              <el-row :gutter="10">
                <el-col :span="16">
                  <el-form-item label="项目周期" prop="prjtStartDate">
                    <el-date-picker
                      style="width: 100%;"
                      v-model="form.prjtStartDate"
                      type="date"
                      placeholder="选择日期">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-date-picker
                    v-model="form.prjtEndDate"
                    style="width: 100%;"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="10">
              <el-row :gutter="10">
                <el-col :span="14">
                  <el-form-item label="担保金额">
                    <el-input v-model="form.guaranteeRate">
                      <template slot="append">%</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-input v-model="form.guaranteeAmount"></el-input>
                </el-col>
              </el-row>
            </el-col>

            <el-col :span="4">
              <el-select v-model="form.guaranteeWay" placeholder="请选择" style="width:100%;">
                <el-option :label="item.FLAG" :value="item.CODE" v-for="item in dict.projectSchemeGuaWayEnums" :key="item.CODE" />
              </el-select>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="10">
              <el-form-item label="确权方式">
                <el-select v-model="form.comfirmWay" placeholder="请选择" style="width:100%;">
                  <el-option :label="item.FLAG" :value="item.CODE" v-for="item in dict.confWay" :key="item.CODE" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="回款方式">
                <el-select v-model="form.paymentWay" placeholder="请选择" style="width:100%;">
                  <el-option :label="item.FLAG" :value="item.CODE" v-for="item in dict.returnWay" :key="item.CODE" />
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="4">
              <el-form-item label="是否作扣">
                <el-switch
                  style="display: block;height:36px;line-height: 36px;"
                  v-model="value">
                </el-switch>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="10">
              <el-form-item label="保理首付款使用费支付方式">
                <el-select v-model="form.downPaymentPayway" placeholder="请选择" style="width:100%;">
                  <el-option :label="item.FLAG" :value="item.CODE" v-for="item in dict.procedurWay" :key="item.CODE" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="宽限期使用费支付方式">
                <el-select v-model="form.limitPayway" placeholder="请选择" style="width:100%;">
                  <el-option :label="item.FLAG" :value="item.CODE" v-for="item in dict.procedurWay" :key="item.CODE" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="10">
              <el-form-item label="融资用途">
                <el-select v-model="form.financingUse" placeholder="请选择" style="width:100%;">
                  <el-option :label="item.FLAG" :value="item.CODE" v-for="item in dict.financingPurpose" :key="item.CODE" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="还款方式" prop="ruleId">
                <el-select v-model="form.ruleId" placeholder="请选择" style="width:100%;">
                  <el-option :label="item.productName" :value="item.bizCode" v-for="item in planType" :key="item.bizCode" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <!--计息方式-->
              <ruleId-dialog @handleClick="getRuleIdForm" />
            </el-col>
          </el-row>
        </el-form>
      </div>

      <form-label :label="'计算结果'" />
      <div class="form-wrap">
        <div class="item">
          <span class="label">本息总额</span>
          <span>{{form.principalInterest}}</span>
        </div>
        <div class="item">
          <span class="label">手续费总额</span>
          <span>{{form.interestAmount}}</span>
        </div>
        <div class="item">
          <span class="label">IRR</span>
          <span>{{form.irr}}</span>
        </div>
        <div class="item">
          <span class="label">XIRR</span>
          <span>{{form.xirr}}</span>
        </div>
      </div>

      <el-tabs v-model="activeName">
        <el-tab-pane label="还款计划" name="1"></el-tab-pane>
        <el-tab-pane label="方案分析" name="2"></el-tab-pane>
      </el-tabs>

      <!--还款计划-->
      <div v-show="activeName==='1'">
        <el-table :data="contPlandetailDTOList" style="width: 100%">
          <el-table-column prop="name" label="期数" width="180" align="center" />
          <el-table-column prop="address" label="还款日" align="center" />
          <el-table-column prop="address" label="应收金额" align="center" />
          <el-table-column prop="address" label="本金" align="center" />
          <el-table-column prop="address" label="手续费" align="center" />
          <el-table-column prop="address" label="剩余本金" align="center" />
        </el-table>
      </div>

      <!--方案分析-->
      <div v-show="activeName==='2'">
        <el-table :data="contSchemeanalysisDTOList" style="width: 100%">
          <el-table-column prop="name" label="期数" width="180" align="center" />
          <el-table-column prop="address" label="应付日期" align="center" />
          <el-table-column prop="address" label="现金流" align="center" />
          <el-table-column prop="address" label="保理预付款" align="center" />
          <el-table-column prop="address" label="手续费" align="center" />
          <el-table-column prop="address" label="保证金" align="center" />
          <el-table-column prop="address" label="利息收日" align="center" />
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import HeadTitle from '@/views/pages/components/head-title'
import FormLabel from '@/views/pages/components/form-label'
import Model from '@/api/factoring/contract'
import AddRouterQuery from '../mixin/add-route-query'
import rules from '@/views/mixins/rules'
import ruleIdDialog from './components/ruleId-dialog'

export default {
  name: 'SchemeInfo',
  components: {
    HeadTitle,
    FormLabel,
    ruleIdDialog
  },
  mixins: [AddRouterQuery, rules],
  data() {
    return {
      value: false,
      tableData: [],
      planType: [],
      contPlandetailDTOList: [], // 还款计划
      contSchemeanalysisDTOList: [], // 方案分析
      activeName: '1',
      form: {},
      ruleIdForm: {} // 计息方式
    }
  },
  computed: {
    ...mapGetters([
      'dict'
    ])
  },
  created() {
    this.fetchDetail()
    this.fetchPlanType()
  },
  methods: {
    fetchDetail() {
      const bizCode = this.$route.query.bizCode
      if (!bizCode) return
      Model.schemeView(bizCode).then(res => {
        console.log(res)
        this.form = JSON.parse(JSON.stringify(res.contractSchemeDTO))
      })
    },
    fetchPlanType() {
      Model.planType().then(res => {
        console.log(res)
        this.planType = res.rulerSelectDTOList
      })
    },
    handleSave() {
      const param = {
        contractSchemeVO: {
          contBizCode: this.$route.query.bizCode,
          ...this.form,
          ...this.ruleIdForm,
          isMargindeduction: this.value ? 1 : 2
        },
        contPlandetailVOList: []
      }
      Model.schemeSave(param)
    },
    getRuleIdForm(v) {
      this.ruleIdForm = v
    }
  }
}
</script>

<style lang="scss" scoped>
.form-wrap{
  display: flex;
  margin-bottom: 20px;
  .item{
    flex: 0 0 25%;
    .label{
      display: inline-flex;
      width: 80px;
    }
  }
}

  .el-switch__label{
    background-color: #ffffff;
  }
</style>
