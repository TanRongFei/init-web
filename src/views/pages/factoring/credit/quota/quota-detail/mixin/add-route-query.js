
export default {
  beforeRouteLeave(to, from, next) {
    if (!to.path.includes('/factoring/credit/quota-detail/')) {
      next()
    } else if (!from.query.bizCode || from.query.bizCode === 'undefined') {
      next('/factoring/credit/quota')
    } else if (to.path.includes('/factoring/credit/quota-detail/') && to.query.bizCode) {
      next()
    } else if(to.path.includes('/factoring/credit/quota-detail/') && !to.query.bizCode) {
      next(`${to.path}?bizCode=${from.query.bizCode}`)
    }
  },
  methods: {
    backToList() {
      this.$router.push({ name: 'quota' })
    }
  }
}
