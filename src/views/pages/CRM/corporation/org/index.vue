<template>
  <div class="enterprise-customers page">
    <head-title :label="'组织架构'" :total="100" />

    <div>
      组织架构
    </div>

  </div>
</template>

<script>
import HeadTitle from '@/views/pages/components/head-title'

export default {
  name: 'CorpotationPageList',
  components: {
    HeadTitle
  },
  data() {
    return {
      multipleSelection: [],
      tableData: []
    }
  },
  created() {

  },
  methods: {
    handleSizeChange(val) {

    },
    handleCurrentChange(val) {

    }
  }
}
</script>
