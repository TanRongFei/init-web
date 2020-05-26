<template>
    <div class="factoring-updata">
      <left-sidebar :tabs="tabs" @handleSelect="handleSelectPage" />

      <div class="container">
        <component :is="currentPage"></component>
      </div>
    </div>
</template>

<script>
import LeftSidebar from '@/views/pages/components/left-sidebar'
import BaseInfo from './basic-info'
import GuaranteeInfo from './guarantee-info'
import FactoringFacility from './factoring-facility'
import CreditRecord from './credit-record'
import Information from './information'

export default {
  name: 'FactoringUpdata',
  components: { LeftSidebar, BaseInfo, GuaranteeInfo, FactoringFacility, CreditRecord, Information },
  data() {
    return {
      currentPage: 'BaseInfo',
      tabs: [
        {
          label: '基本信息',
          code: 'BaseInfo'
        },
        {
          label: '担保信息',
          code: 'GuaranteeInfo'
        },
        {
          label: '保理授信',
          code: 'FactoringFacility'
        },
        {
          label: '授信记录',
          code: 'CreditRecord'
        },
        {
          label: '资料信息',
          code: 'Information'
        }
      ]
    }
  },
  methods: {
    handleSelectPage(v) {
      this.currentPage = v
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  min-height: calc(100vh - 50px);
  margin-left: 235px;
  position: relative;
  overflow: hidden;
  background-color: #eeeeee;
  padding: 15px;
}
</style>
