<!--计息规则-->
<template>
  <div class="ruleId-dialog">
    <el-button @click="handleShow">计息方式</el-button>
    <el-dialog
      title="计息方式"
      :visible.sync="dialogVisible"
      width="860px"
      :before-close="handleClose">{{form}}
      <el-form ref="form" :model="form" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="18">
            <el-form-item label="还款方式">
              <el-select v-model="form.payType" placeholder="请选择" style="width: 100%;">
                <el-option :label="item.FLAG" :value="item.CODE" v-for="item in dict.payTypeList" :key="item.CODE" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <span>修改规则</span>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="结算频率">
              <el-select v-model="form.paymentFrequency" placeholder="请选择" style="width: 100%;">
                <el-option :label="item.FLAG" :value="item.CODE" v-for="item in dict.countType" :key="item.CODE" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="计息天数">
              <el-select v-model="form.countDay" placeholder="请选择" style="width: 100%;">
                <el-option :label="item.FLAG" :value="item.CODE" v-for="item in dict.countDay" :key="item.CODE" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="付款方式">
              <el-select v-model="form.checkType" placeholder="请选择" style="width: 100%;">
                <el-option :label="item.FLAG" :value="item.CODE" v-for="item in dict.checkType" :key="item.CODE" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="计息方式">
              <el-select v-model="form.countType" placeholder="请选择" style="width: 100%;">
                <el-option :label="item.FLAG" :value="item.CODE" v-for="item in dict.paymentFrequency" :key="item.CODE" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="结算日期">
              <el-input v-model="form.paymentDate" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="调整方式">
              <el-select v-model="form.adjustType" placeholder="请选择" style="width: 100%;">
                <el-option :label="item.FLAG" :value="item.CODE" v-for="item in dict.ajustType" :key="item.CODE" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'RuleIdDialog',
  data() {
    return {
      dialogVisible: false,
      form: {}
    }
  },
  computed: {
    ...mapGetters([
      'dict'
    ])
  },
  methods: {
    submit() {
      this.$emit('handleClick', this.form)
      this.handleClose()
    },
    handleClose() {
      this.dialogVisible = false
    },
    handleShow() {
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.ruleId-dialog{
  display: inline-flex;
}
</style>
