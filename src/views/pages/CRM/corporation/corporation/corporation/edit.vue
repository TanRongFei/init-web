<template>
  <div class="enterprise-customers page">

    <div>
      基本信息  compCode={{ $route.query.compCode }}
    </div>

  </div>
</template>

<script>
import HeadTitle from '@/views/pages/components/head-title'

export default {
  name: 'CorpotationPageList',
  components: {
  },
  data() {
    return {
      multipleSelection: [],
      tableData: []
    }
  },
  created() {
    console.log(this.$route.query.compCode)
    this.$router.push({ path: 'bill', query: this.$route.query })
  },
  methods: {
    handleSizeChange(val) {

    },
    handleCurrentChange(val) {

    }
  }
}
</script>
