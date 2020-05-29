
export default {
  beforeRouteLeave(to, from, next) {
    if (!to.path.includes('/factoring/contract/contract-editor/')) {
      // this.$store.dispatch('app/hiddenChgInfo')
      next()
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
