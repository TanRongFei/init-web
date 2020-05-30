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
        <el-form :rules="rules" ref="form" :model="form" label-width="80px">
          <el-form-item label="企业:" prop="custRole">
            <el-checkbox-group v-model="form.custRole">
              <el-checkbox :label="item.CODE" v-for="item in formatCustDifList" :key="item.CODE">{{item.FLAG}}</el-checkbox>
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
import { mapGetters } from 'vuex'
import Model from '@/api/factoring/admittance'
import Rules from '@/views/mixins/rules'

export default {
  name: 'IdentifyCustomers',
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
      form: {
        custRole: []
      },
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
    getRole() {
      if (this.data && this.data.length === 1) {
        let code = ''
        if (this.generation === 'cust') {
          code = this.data[0].compCode
        } else {
          code = this.data[0].userCode
        }
        Model.getRole(code, this.generation).then(res => {
          this.form.custRole = res
        })
      }
    },
    // 标示客户
    submit() {
      console.log('标示客户')
      if (!this.data || !this.data.length) return

      this.$refs.form.validate((valid) => {
        if (valid) {
          let param = {}

          if (this.generation === 'cust') {
            param ={
              compCode: this.formatCompCode[0],
              ...this.form
            }
          } else {
            param ={
              userCode: this.formatCompCode[0],
              userRole: this.form.custRole
            }
          }

          Model.setCustRole(param, this.generation).then(() => {
            this.handleClose()
          }).catch(() => {
            this.handleClose()
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    handleShow() {
      if (this.data && this.data.length === 1) {
        if (this.$refs.form) {
          this.$refs.form.resetFields()
        }
        this.dialogVisible = true
        this.title = '标示客户'
        this.getRole()
      } else {
        this.$message({
          message: '标示客户只能单选！',
          type: 'warning'
        })
      }
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
