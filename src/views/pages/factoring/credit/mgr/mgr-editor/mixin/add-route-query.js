
export default {
  beforeRouteLeave(to, from, next) {
    if (!to.path.includes('/factoring/credit/mgr-editor/')) {
      next()
    } else if (!from.query.bizCode || from.query.bizCode === 'undefined') {
      next('/factoring/credit/mgr')
    } else if (to.path.includes('/factoring/credit/mgr-editor/') && to.query.bizCode) {
      next()
    } else if(to.path.includes('/factoring/credit/mgr-editor/') && !to.query.bizCode) {
      next(`${to.path}?bizCode=${from.query.bizCode}`)
    }
  },
  methods: {
    backToList() {
      this.$router.push({ name: 'mgr' })
    }
  }
}
