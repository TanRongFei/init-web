<!--标示客户-->
<template>
  <div>
    <div class="item" >
      <div class="icon" @click="handleShow"></div>
      <div class="title" @click="handleShow">标示客户
        <span class="t"></span>
      </div>
    </div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      :modal-append-to-body="false"
      width="680px"
      :before-close="handleClose">
      <div>
        <el-form :rules="rules" ref="form" :model="form" label-width="160px">
          <el-form-item label="授信平台bizcode:" prop="platCredBizCode">
            <el-input v-model="form.platCredBizCode" />
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="handleClose" size="mini">取 消</el-button>
          <el-button type="primary" @click="submit" size="mini">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Model from '@/api/factoring/contract'
import Rules from '@/views/mixins/rules'

export default {
  name: 'AddContract',
  mixins: [ Rules ],
  props: {
    data: {
      type: Object|Array
    },
    generation: {
      type: String
    }
  },
  data() {
    return {
      form: {},
      title: '',
      dialogVisible: false
    }
  },
  computed: {
    formatCustDifList() {
      if (this.dict && this.dict.custDifList) {
        return this.dict.custDifList
      } else {
        return []
      }
    },
    formatCompCode() {
      return this.data.map(item => {
        if (this.generation === 'cust') {
          return item.compCode
        } else {
          return item.userCode
        }
      })
    },
    ...mapGetters([
      'dict'
    ])
  },
  created() {
  },
  methods: {
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          Model.contractInit(this.form).then(() => {
            this.handleClose()
          }).catch(() => {
            this.handleClose()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleShow() {
      if (this.$refs.form) {
        this.$refs.form.resetFields()
      }
      this.dialogVisible = true
      this.title = '生成合同'
    },
    handleClose() {
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/styles/side-tool.scss";

  .item{
    background-position: 0 -140px;
  }
</style>
