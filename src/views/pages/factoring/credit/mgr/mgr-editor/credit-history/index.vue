<template>
  <div>
    <head-title :label="''" :showDefaultButton="showDefaultButton">
      <template slot="after">
        <el-button @click="backToList" type="" size="mini">返 回</el-button>
      </template>
    </head-title>
    <div class="container">
      <el-table :data="form.list" style="width: 100%">
        <el-table-column type="index" label="序号" width="50" align="center" />
        <el-table-column prop="applyDate" label="申请日期" align="center" />
        <el-table-column prop="credCode" label="授信编号" align="center">
          <template slot-scope="scope">
            <el-button @click="handleDetail(scope.row)" type="text">{{scope.row.credCode}}</el-button>
          </template>
        </el-table-column>
        <el-table-column label="授信期限" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.creditStartDate | formatDate}}</span>
             至
            <span>{{scope.row.creditEndDate | formatDate}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="occupiedAmount" label="已占用授信额度" align="center" />
        <el-table-column prop="ftCreditAmount" label="保理分配额度" align="center" />
      </el-table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AddRouteQuery from '../mixin/add-route-query'
import FormLabel from '@/views/pages/components/form-label'
import HeadTitle from '@/views/pages/components/head-title'
import Model from '@/api/factoring/credit'

export default {
  name: 'CreditMgrEditorCreditHistory',
  components: { FormLabel, HeadTitle },
  mixins: [AddRouteQuery],
  data() {
    return {
      showDefaultButton: false,
      multipleSelection: [],
      form: {}
    }
  },
  computed: {
    ...mapGetters([
      'dict'
    ])
  },
  created() {
    this.fetchDetail()
  },
  methods: {
    fetchDetail() {
      const bizCode = this.$route.query.bizCode
      if (!bizCode) return
      Model.fetchCreditHistory(bizCode).then(res => {
        console.log(res)
        if (!res) return
        this.form = JSON.parse(JSON.stringify(res))
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleDetail(item) {
      if (!item) return

      const  query = {
        bizCode: item.bizCode
      }

      this.$router.push({ name: 'mgr-detail',  query})
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/styles/editor.scss";

</style>

