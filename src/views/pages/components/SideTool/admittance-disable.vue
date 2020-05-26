<!--保理准入插入-->
<template>
  <div>
    <div class="item" >
      <div class="icon" @click="submit">关</div>
      <div class="title" @click="submit">关闭
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
    name: 'AdmittanceSave',
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
      submit() {
        console.log('准入关闭')
        if (!this.data || !this.data.length) return

        Model.disable(this.formatData, this.generation).then(() => {
          this.handleClose()
        }).catch(() => {
          this.handleClose()
        })
      },
      handleShow() {
        this.dialogVisible = true
        this.title = '标示客户'
      },
      handleClose() {
        this.dialogVisible = false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .item{
    text-align: center;
    font-size: 13px;
    position: relative;
    background: url("../../../../assets/rg-tool.png") no-repeat;
    background-position: -630px -70px;
    .icon{
      height: 35px;
      line-height: 35px;
    }
    .title{
      display: none;
      min-width: 80px;
      position: absolute;
      padding: 0 10px;
      right: 35px;
      top: 0;
      background: #9fa0a4;
      height: 35px;
      line-height: 35px;
      z-index: 999;
    }
    &:hover{
      color: #ffffff;
      .title{
        display: flex;
      }
    }
  }
</style>
