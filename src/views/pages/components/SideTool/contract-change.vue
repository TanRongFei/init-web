<!--保理准入插入-->
<template>
  <div>
    <div class="item" >
      <div class="icon" @click="handleCheek"></div>
      <div class="title" @click="handleCheek">合同变更
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
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="企业:">
            <el-checkbox-group v-model="form.checkList">
              <el-checkbox label="a">保存</el-checkbox>
              <el-checkbox label="b">提交</el-checkbox>
              <el-checkbox label="c">审批通过</el-checkbox>
              <el-checkbox label="d">审批不通过</el-checkbox>
            </el-checkbox-group>
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
import Model from '@/api/factoring/admittance'

export default {
  name: 'GenerateLoan',
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
      form: {
        checkList: []
      },
      title: '',
      dialogVisible: false
    }
  },
  computed: {
    formatData() {
      return this.data.map(item => {
        if (this.generation === 'cust') {
          return {
            compCode: item.compCode,
            productCode: item.productCode
          }
        } else {
          return {
            userCode: item.userCode,
            productCode: item.productCode
          }
        }
      })
    }
  },
  methods: {
    handleCheek(v) {
      /**
       * 查看
       * **/
      if (this.data && this.data.length === 1) {
        const { bizCode } = this.data[0]

        const path = '/factoring/contract/contract-editor/chg-info'

        this.$store.dispatch('app/showChgInfo').then(() => {
          this.$router.push({ path, query: { bizCode } })
        })
        // this.handleDetail('contractEditor', { bizCode })
      } else if (this.data && this.data.length > 1) {
        this.$message({
          message: '只能选取一条数据进行编辑！',
          type: 'warning'
        })
      } else {
        this.$message({
          message: '请选取一条数据进行编辑！',
          type: 'warning'
        })
      }
    },
    handleDetail(pathName, query = {}) {
      console.log('query', query)
      if (!query) return
      this.$router.push({ name: pathName, query })
    },
    submit() {
      console.log('合同变更')
      console.log(this.data);
      if (!this.data || !this.data.length) return

      Model.open(this.formatData, this.generation).then(() => {
        this.handleClose()
      }).catch(() => {
        this.handleClose()
      })
    },
    handleShow() {
      this.dialogVisible = true
      this.title = '合同变更'
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
    background-position: -245px -72px;
  }
</style>
