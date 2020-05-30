<template>
  <div class="container">
    <form-label :label="'合同当事人'" />
    <el-table :data="contPartiesDTOList" style="width: 100%">
      <el-table-column prop="partiesType" label="当事方类型" align="center" />
      <el-table-column prop="partiesAttr" label="当事方" align="center" />
      <el-table-column prop="partiesCustname" label="名称" align="center" />
      <el-table-column prop="partiesBank" label="银行" align="center" />
      <el-table-column prop="partiesAccount" label="账号" align="center" />
      <el-table-column prop="partiesUnionNum" label="银行号" align="center" />
      <el-table-column prop="partiesMemo" label="备注" align="center" />
    </el-table>

    <form-label :label="'合同明细'" />
    <el-table :data="contContractdetailDTOList" style="width: 100%">
      <el-table-column prop="contractdetailType" label="合同类型" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.contractdetailType + '-contractTypeList'|filterDict}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="contractdetailCode" label="合同编号" align="center" />
      <el-table-column prop="contractdetailName" label="合同名称" align="center" />
      <el-table-column prop="contractdetailCount" label="份数" align="center" />
      <el-table-column prop="fileId" label="文件" align="center" />
    </el-table>

    <form-label :label="'签约先决条件'" />
    <div class="info">
      <div class="item">
        <span class="label">合同签订需提前完成天数</span>
        <span>{{ formatDate(form.signDay) }}</span>
      </div>
      <div class="item">
        <span class="label">合同希望签订日期</span>
        <span>{{ formatDate(form.signHopeDate) }}</span>
      </div>
      <div class="item">
        <span class="label">所有签约条件完成日期</span>
        <span>{{ formatDate(form.signFinishDate) }}</span>
      </div>
    </div>

    <form-label :label="'付款先决条件'" />
    <el-table :data="contSignrerequisiteDTOList" style="width: 100%">
      <el-table-column prop="signContent" label="条款内容" align="center" />
      <el-table-column prop="signMemo" label="说明" align="center" />
      <el-table-column prop="signEstimated" label="预计完成时间" align="center">
        <template slot-scope="scope">
          <span>{{formatDate(scope.row.signEstimated)}}</span>
        </template>
      </el-table-column>;
      <el-table-column prop="signExecutor" label="协调/执行人" align="center" />
    </el-table>
  </div>
</template>

<script>
import FormLabel from '@/views/pages/components/form-label'
import Model from '@/api/factoring/contract'
import AddRouterQuery from '../mixin/add-route-query'
import moment from 'moment'

export default {
  name: 'CommercialTerms',
  components: {
    FormLabel
  },
  mixins: [AddRouterQuery],
  data() {
    return {
      tableData: [],
      form: {},
      contPartiesDTOList: [],
      contContractdetailDTOList: [],
      contSignrerequisiteDTOList: []
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
    }
  },
  created() {
    this.fetchDetail()
  },
  methods: {
    fetchDetail() {
      const bizCode = this.$route.query.bizCode
      if (!bizCode) return
      Model.businessInfoView(bizCode).then(res => {
        if (!res) return
        this.form = res.contRentrerequisiteDTO ? res.contRentrerequisiteDTO : {}
        this.contPartiesDTOList = res.contPartiesDTOList ? res.contPartiesDTOList : []
        this.contContractdetailDTOList = res.contContractdetailDTOList ? res.contContractdetailDTOList : []
        this.contSignrerequisiteDTOList = res.contSignrerequisiteDTOList ? res.contSignrerequisiteDTOList : []
      })
    }
  }
}
</script>

<style lang="scss" scoped>
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
