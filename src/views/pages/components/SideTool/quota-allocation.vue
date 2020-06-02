<template>
  <div>
    <div class="item" >
      <div class="icon" @click="submit"></div>
      <div class="title" @click="submit">额度分配
        <span class="t"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuotaAllocation',
  props: {
    data: {
      type: Object|Array
    }
  },
  data() {
    return {}
  },
  methods: {
    submit() {
      if (this.data && this.data.length === 1) {
        const { bizCode } = this.data[0]

        this.$router.push({ name: 'quota-editor', query: { credBizCode: bizCode } })
        // Model.audit(bizCode).then(() => {
        //   this.$emit('handleChangeAudit')
        // })
      } else if (this.data && this.data.length > 1) {
        this.$message({
          message: '只能选取一条数据！',
          type: 'warning'
        })
      } else {
        this.$message({
          message: '请选取一条数据！',
          type: 'warning'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/styles/side-tool.scss";

  .item{
    background-position: 0 -105px;
  }
</style>
