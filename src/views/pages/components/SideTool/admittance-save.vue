<!--保理准入插入-->
<template>
  <div class="item" >
    <div class="icon" @click="handleShow">入</div>
    <div class="title" @click="handleShow">准入插入<span class="t"></span></div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      :modal-append-to-body="false"
      width="680px"
      :before-close="handleClose">
      <div>
        ss
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
    methods: {
      // 标示客户
      submit() {
        console.log('准入插入')

        const param = {
          compCode: 'BH-123456789',
          custRole: [1, 2, 3]
        }
        Model.infoSave(param, this.generation).then(() => {
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
      background: #9fa0a4;
      color: #ffffff;
      .title{
        display: flex;
      }
    }
  }
</style>
