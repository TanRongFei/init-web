<template>
  <div class="side-tool">
    <h2>{{label}}</h2>
    <div class="wrap">
      <!--标示客户-->
      <div v-if="functions.includes('identify-customers')">
        <identify-customers :data="data" :generation="generation" />
      </div>

      <!--开通-->
      <div v-if="functions.includes('admittance-open')">
        <admittance-open :data="data" :generation="generation"/>
      </div>

      <!--关闭-->
      <div v-if="functions.includes('admittance-disable')">
        <admittance-disable :data="data" :generation="generation"/>
      </div>

      <!--资料交接-->
      <div v-if="functions.includes('data-handover')">
        <data-handover :data="data" :generation="generation"/>
      </div>

      <!--生成放款-->
      <div v-if="functions.includes('generate-loan')">
        <generate-loan :data="data" :generation="generation"/>
      </div>

      <!--合同变更-->
      <div v-if="functions.includes('contract-change')">
        <contract-change :data="data" :generation="generation"/>
      </div>

      <!--合同审批通过-->
      <div v-if="functions.includes('info-audit')">
        <info-audit :data="data" @handleInfoAudit="handleInfoAudit"/>
      </div>

      <!--合同审批不通过-->
      <div v-if="functions.includes('un-audit')">
        <un-audit :data="data" @handleUnAudit="handleUnAudit"/>
      </div>

      <!--生成合同-->
      <div v-if="functions.includes('add-contract')">
        <add-contract :data="data" :generation="generation"/>
      </div>

      <!--变更审批通过-->
      <div v-if="functions.includes('change-audit')">
        <change-audit :data="data" @handleChangeAudit="handleChangeAudit"/>
      </div>

      <!--变更审批不通过-->
      <div v-if="functions.includes('change-unAudit')">
        <change-unAudit :data="data" @handleChangeUnAudit="handleChangeUnAudit"/>
      </div>

      <!--额度分配-->
      <div v-if="functions.includes('quota-allocation')">
        <quotaAllocation :data="data" />
      </div>

      <!--授信变更-->
      <div v-if="functions.includes('change-credit')">
        <change-credit :data="data" />
      </div>

      <slot name="after"></slot>
    </div>

  </div>
</template>

<script>
import IdentifyCustomers from './identify-customers'
import AdmittanceSave from './admittance-save'
import AdmittanceOpen from './admittance-open'
import AdmittanceDisable from './admittance-disable'
import DataHandover from './data-handover'
import GenerateLoan from './generate-loan'
import ContractChange from './contract-change'
import AddContract from './add-contract'
import infoAudit from './infoAudit'
import unAudit from './unAudit'
import changeUnAudit from './change-unAudit'
import changeAudit from './change-audit'
import quotaAllocation from './quota-allocation'
import changeCredit from './change-credit'

export default {
  name: 'SideTool',
  props: {
    data: {
      type: Object|Array
    },
    label: {
      type: String
    },
    // generation 客户类型
    // cust:公司客户 user:个人客户
    // 准入用来区分标示客户，开通，关闭请求地址与参数
    generation: {
      type: String,
      default: 'cust'
    },
    // functions 功能
    // 侧边栏展示功能的列表
    functions: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  components: {
    IdentifyCustomers, // 标示客户
    AdmittanceSave,
    AdmittanceOpen, // 开通
    AdmittanceDisable, // 关闭
    DataHandover, // 资料交接
    GenerateLoan, // 生成放款
    ContractChange, // 生成放款
    AddContract, // 生成合同
    infoAudit, // 合同审批通过
    unAudit, // 合同审批不通过
    changeAudit, // 变更审批通过
    changeUnAudit, // 变更审批不通过
    quotaAllocation, // 额度分配，
    changeCredit // 授信变更
  },
  data() {
    return {}
  },
  created() {
    this.$store.dispatch('app/toggleSideToll', true)
  },
  beforeDestroy() {
    this.$store.dispatch('app/toggleSideToll', false)
  },
  methods: {
    handleInfoAudit() {
      this.$emit('handleInfoAudit')
    },
    handleUnAudit() {
      this.$emit('handleUnAudit')
    },
    handleChangeAudit() {
      this.$emit('handleChangeAudit')
    },
    handleChangeUnAudit() {
      this.$emit('handleChangeUnAudit')
    }
  }
}
</script>

<style lang="scss">
  .side-tool{
    position: fixed;
    right: 0;
    top: 125px;
    width: 35px;
    background: #9fa0a4;
    z-index: 999;
    cursor: pointer;
    h2{
      font-size: 13px;
      color: #fff;
      background: #3d78ec;
      padding: 10px 10px;
      line-height: 16px;
      height: auto;
    }
    .wrap{
      width: 35px;
      display: flex;
      flex-direction: column;
      .item{
        &:hover{
          background-color: #3d78ec;
          color: #ffffff;
          .title{
            display: flex;
            right: 35px;
          }
        }
      }
    }
  }
</style>
