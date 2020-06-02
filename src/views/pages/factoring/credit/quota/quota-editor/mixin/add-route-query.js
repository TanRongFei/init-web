import { isPlainObject } from '@/utils'

export default {
  beforeRouteLeave(to, from, next) {
    if (isPlainObject(to.query) && !isPlainObject(from.query)) {
      if (!to.path.includes('/factoring/credit/quota-editor/')) {
        next()
      } else {
        let param = ''
        for (let key in from.query) {
          param += `${key}=${from.query[key]}`
        }
        next(`${to.path}?${param}`)
      }
    } else {
      next()
    }
  },
  methods: {
    backToList() {
      this.$router.push({ name: 'quota' })
    }
  }
}
