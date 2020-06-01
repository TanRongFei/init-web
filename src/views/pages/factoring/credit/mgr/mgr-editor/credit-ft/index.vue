<template>
  <div>
<!--    <div class="header">-->
<!--      <el-tabs v-model="activeName">-->
<!--        <el-tab-pane label="授信信息" name="1"></el-tab-pane>-->
<!--        <el-tab-pane label="应收账款" name="2"></el-tab-pane>-->
<!--      </el-tabs>-->

<!--      <div class="btn-wrap">-->
<!--        <el-button :disabled="disabled" type="primary" size="mini" @click="handleSubmit">保 存</el-button>-->
<!--        <el-button @click="backToList" type="" size="mini">返 回</el-button>-->
<!--      </div>-->
<!--    </div>-->

    <!--授信信息 CreditFtInfo-->
    <!--应收账款 Receivable-->
    <component :active="activeName" @handleTab="handleTab" :is="currentRole"></component>
  </div>
</template>

<script>
import CreditFtInfo from './components/credit-ft-info'
import Receivable from './components/receivable'

export default {
  name: 'CreditMgrEditorCreditFt',
  components: { Receivable, CreditFtInfo },
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
