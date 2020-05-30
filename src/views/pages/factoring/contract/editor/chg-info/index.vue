<template>
  <div>
    <head-title :label="'合同变更信息'" :showDefaultButton="showDefaultButton">
      <template slot="after">
        <el-button :disabled="disabled" type="primary" size="mini" @click="handleSave">保 存</el-button>
        <el-button @click="backToList" type="" size="mini">返 回</el-button>
      </template>
    </head-title>

    <el-card shadow="never">
      <form-label :label="'申请信息'" />
      <div class="wrap">
        <el-form :model="form" label-width="155px">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="申请时间">
                <el-date-picker
                  v-model="form.applyDate"
                  style="width: 100%;"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="申请人">
                <el-select v-model="form.applyUserName" placeholder="请选择" style="width:100%;">
                  <el-option :label="item.FLAG" :value="item.CODE" v-for="item in dict.dueTypeEnums" :key="item.CODE" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="变更标识	">
                <el-checkbox-group v-model="form.changeFlag">
                  <el-checkbox label="1">客户账户变更</el-checkbox>
                  <el-checkbox label="2">公司账户变更</el-checkbox>
                  <el-checkbox label="3">商务条款变更</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="变更说明">
                <el-input type="textarea" v-model="form.changeRemark" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Model from '@/api/factoring/contract'
import HeadTitle from '@/views/pages/components/head-title'
import FormLabel from '@/views/pages/components/form-label'

export default {
name: 'ChgInfo',
  components: {
    HeadTitle,
    FormLabel
  },
  data() {
    return {
      disabled: false,
      showDefaultButton: false,
      form: {
        changeFlag: []
      },
      bizCode: ''
    }
  },
  computed: {
  ...mapGetters([
    'dict'
  ])
  },
  created() {
    this.fetchBase()
  },
  beforeRouteLeave(to, from, next) {
    if (!to.path.includes('/factoring/contract/contract-editor/')) {
      next()
    } else if (to.path.includes('/factoring/contract/contract-editor/') && this.bizCode && (to.query.bizCode !== this.bizCode)) {
      next(`${to.path}?bizCode=${this.bizCode}`)
    } else if(to.path.includes('/factoring/contract/contract-editor/') && to.query.bizCode === this.bizCode) {
      next()
    } else if(to.path.includes('/factoring/contract/contract-editor/') && !to.query.bizCode) {
      next(`${to.path}?bizCode=${from.query.bizCode}`)
    } else {
      next()
    }
  },
  methods: {
    fetchBase() {
      const bizCode = this.$route.query.bizCode
      if (!bizCode) return
      Model.changeView(bizCode).then(res => {
        console.log('fetchBase', res)
        if (!res) return
        this.baseInfo = JSON.parse(JSON.stringify(res))
      })
    },
    handleSave() {
      this.disabled = true
      const param = {
        srcBizCode: this.$route.query.bizCode ? this.$route.query.bizCode : '',
        ...this.form,
        changeFlag: this.form.changeFlag.join(',')
      }
      Model.changeSave(param).then(res => {
        this.disabled = false

        console.log(res)
        if (!res) return
        this.bizCode = res.destBizCode
      }).catch(() => {
        this.disabled = false
      })
    },
    backToList() {
      this.$router.push({ name: 'contract' })
    }
  }
}
</script>

<style scoped>

</style>
