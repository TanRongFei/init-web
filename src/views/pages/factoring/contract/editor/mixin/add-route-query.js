
export default {
  create() {
    // if (!this.$route.query.bizCode || this.$route.query.bizCode === 'undefined') this.backToList()
  },
  beforeRouteLeave(to, from, next) {
    if (!to.path.includes('/factoring/contract/contract-editor/')) {
      next()
    } else if (!from.query.bizCode || from.query.bizCode === 'undefined') {
      next('/factoring/contract/mgr')
    } else if (to.path.includes('/factoring/contract/contract-editor/') && to.query.bizCode) {
      next()
    } else if(to.path.includes('/factoring/contract/contract-editor/') && !to.query.bizCode) {
      next(`${to.path}?bizCode=${from.query.bizCode}`)
    }
  },
  methods: {
    backToList() {
      this.$router.push({ name: 'contract' })
    }
  }
}
