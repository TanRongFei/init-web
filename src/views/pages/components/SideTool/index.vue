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

      <!--生成放款-->
      <div v-if="functions.includes('contract-change')">
        <contract-change :data="data" :generation="generation"/>
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
    ContractChange // 生成放款
  },
  data() {
    return {}
  },
  created() {
    this.$store.dispatch('app/toggleSideToll', true)
  },
  beforeDestroy() {
    this.$store.dispatch('app/toggleSideToll', false)
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
        text-align: center;
        font-size: 13px;
        position: relative;
        .icon{
          height: 35px;
          line-height: 35px;
          color: #ffffff;
        }
        .title{
          display: none;
          min-width: 80px;
          position: absolute;
          padding: 0 10px;
          right: 80px;
          top: 0;
          background: #9fa0a4;
          height: 35px;
          line-height: 35px;
          z-index: 999;
          animation:mymove .3s ease-in-out;
          .t{
            display: block;
            position: absolute;
            left: 80px;
            top: 11px;
            width: 0;
            height: 0;
            border-left: 8px solid #9fa0a3;
            border-top: 6px solid transparent;
            border-bottom: 6px solid transparent;
          }
        }
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

  @keyframes mymove{
    from {
      right: 60px;
    }
    to{
      right: 35px;
    }
  }
</style>
