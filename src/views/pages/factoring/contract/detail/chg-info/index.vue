<template>
  <div class="container">
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
                <el-checkbox label="a">客户账户变更</el-checkbox>
                <el-checkbox label="b">公司账户变更</el-checkbox>
                <el-checkbox label="c">商务条款变更</el-checkbox>
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
import HeadTitle from '@/views/pages/components/head-title'
import FormLabel from '@/views/pages/components/form-label'
import Model from '@/api/factoring/contract'
import AddRouterQuery from '../mixin/add-route-query'

export default {
  name: 'BasicInfo',
  components: {
    HeadTitle,
    FormLabel
  },
  mixins: [AddRouterQuery],
  data() {
    return {
      form: {
        changeFlag: []
      }
    }
  },
  computed: {
    formatDate() {
      return (date) => {
        if (date) {
          return moment(date).format('YYYY-MM-DD')
        } else {
          return date
        }
      }
    },
    ...mapGetters([
      'dict'
    ])
  },
  created() {
    this.fetchBase()
  },
  methods: {
    // 查看合同方案信息
    fetchBase() {
      console.log(1)
      const bizCode = this.$route.query.bizCode
      if (!bizCode) return
      Model.changeView(bizCode).then(res => {
        this.form = res
        console.log('fetchBase', res, this.form)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap{
  margin-bottom: 20px;
}

.container{
  padding: 20px 25px;
  margin-top: 18px;
  background-color: #fff;
  border: 1px solid #d9d9d9;
  position: relative;
  .info{
    display: flex;
    flex-wrap: wrap;
    padding: 15px 0;
    .item{
      flex: 0 0 33%;
      line-height: 28px;
      padding: 4px 0;
      color: #333;
      word-wrap: break-word;
      word-break: break-all;
      .label{
        padding-right: 5px;
        color: #999;
      }
    }
  }
}
</style>
