export default {
  data() {
    return {
      Query: {
        pageNum: 1,
        pageSize: 10,
        orderBy: 'createdTime'
      },
      total: 0
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.Query.pageSize = val
      this.fetchList()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.Query.pageNum = val
      this.fetchList()
    }
  }
}
