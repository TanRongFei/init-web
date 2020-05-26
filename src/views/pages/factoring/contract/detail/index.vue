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
import SchemeInfo from './scheme-info'
import AccountsReceivable from './accounts-receivable'
import CommercialTerms from './commercial-terms'
import CreditInfo from './credit-info'
import Information from './information'

export default {
  name: 'FactoringUpdata',
  components: { LeftSidebar, BaseInfo, SchemeInfo, AccountsReceivable, CommercialTerms, CreditInfo, Information },
  data() {
    return {
      currentPage: 'BaseInfo',
      tabs: [
        {
          label: '基本信息',
          code: 'BaseInfo'
        },
        {
          label: '方案信息',
          code: 'SchemeInfo'
        },
        {
          label: '应收账款',
          code: 'AccountsReceivable'
        },
        {
          label: '商务条款',
          code: 'CommercialTerms'
        },
        {
          label: '用信信息',
          code: 'CreditInfo'
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
      console.log('handleSelectPage', v)
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
