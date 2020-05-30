<template>
  <div class="item" >
    <div class="icon" @click="submit"></div>
    <div class="title" @click="submit">审批通过
      <span class="t"></span>
    </div>
  </div>
</template>

<script>
import Model from '@/api/factoring/contract'

export default {
  name: 'Approved',
  props: {
    data: {
      type: Object|Array
    },
    generation: {
      type: String
    }
  },
  data() {
    return {}
  },
  methods: {
    submit() {
      if (this.data && this.data.length === 1) {
        const { bizCode } = this.data[0]
        Model.audit(bizCode).then(() => {
          this.$emit('handleChangeAudit')
        })
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
    background-position: -210px 0px;
  }
</style>
