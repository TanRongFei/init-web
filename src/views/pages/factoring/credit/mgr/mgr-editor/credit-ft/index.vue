<template>
  <component :active="activeName" @handleTab="handleTab" :is="currentRole"></component>
</template>

<script>
import CreditFtInfo from './components/credit-ft-info'
import Receivable from './components/receivable'
import AddRouteQuery from '../mixin/add-route-query'

export default {
  name: 'CreditMgrEditorCreditFt',
  components: { Receivable, CreditFtInfo },
  mixins: [AddRouteQuery],
  data() {
    return {
      currentRole: 'CreditFtInfo',
      activeName: '1'
    }
  },
  created() {},
  methods: {
    backToList() {},
    handleTab(n) {
      console.log(n)
      this.activeName = n
      if (this.activeName === '1') {
        this.currentRole = 'CreditFtInfo'
      } else {
        this.currentRole = 'Receivable'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/styles/detail.scss";

</style>
