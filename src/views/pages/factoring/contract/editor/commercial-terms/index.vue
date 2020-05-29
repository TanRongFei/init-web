<template>
  <div class="basic-info">
    <head-title :label="'商务条款'" :showDefaultButton="false">
      <template slot="after">
        <el-button @click="handleSave" type="primary" size="mini">保 存</el-button>
        <el-button @click="backToList" type="" size="mini">返 回</el-button>
      </template>
    </head-title>

    <el-card shadow="nerve">
      <form-label :label="'合同当事人'">
        <template slot="after">
          <el-button @click="handleAddContParties" type="" icon="el-icon-plus" size="mini"></el-button>
          <el-button type="" icon="el-icon-delete" size="mini"></el-button>
        </template>
      </form-label>
      <el-table :data="contPartiesDTOList" style="width: 100%">
        <el-table-column prop="partiesType" label="当事方类型" align="center">
          <template slot-scope="scope">
            <el-select v-model="scope.row.partiesType" placeholder="请选择" style="width:100%;">
              <el-option :label="item.FLAG" :value="item.CODE" v-for="item in dict.projectSchemeGuaWayEnums" :key="item.CODE" />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="partiesAttr" label="当事方" align="center">
          <template slot-scope="scope">
            <el-select v-model="scope.row.partiesAttr" placeholder="请选择" style="width:100%;">
              <el-option :label="item.FLAG" :value="item.CODE" v-for="item in dict.projectSchemeGuaWayEnums" :key="item.CODE" />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="partiesCustname" label="名称" align="center">
          <template slot-scope="scope">
            <el-select v-model="scope.row.partiesCustname" placeholder="请选择" style="width:100%;">
              <el-option :label="item.FLAG" :value="item.CODE" v-for="item in dict.projectSchemeGuaWayEnums" :key="item.CODE" />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="partiesBank" label="银行" align="center">
          <template slot-scope="scope">
            <el-select v-model="scope.row.partiesBank" placeholder="请选择" style="width:100%;">
              <el-option :label="item.FLAG" :value="item.CODE" v-for="item in dict.projectSchemeGuaWayEnums" :key="item.CODE" />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="partiesAccount" label="账号" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.partiesAccount" placeholder="选择输入" />
          </template>
        </el-table-column>
        <el-table-column prop="partiesUnionNum" label="银行号" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.partiesUnionNum" placeholder="选择输入" />
          </template>
        </el-table-column>
        <el-table-column prop="partiesMemo" label="备注" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.partiesMemo" placeholder="选择输入" />
          </template>
        </el-table-column>
      </el-table>

      <form-label :label="'合同明细'">
        <template slot="after">
          <el-button @click="handleAddContContractdetail" type="" icon="el-icon-plus" size="mini"></el-button>
          <el-button type="" icon="el-icon-delete" size="mini"></el-button>
        </template>
      </form-label>
      <el-table :data="contContractdetailDTOList" style="width: 100%">
        <el-table-column prop="contractdetailType" label="合同类型" align="center">
          <template slot-scope="scope">
            <el-select v-model="scope.row.contractdetailType" placeholder="请选择" style="width:100%;">
              <el-option :label="item.FLAG" :value="item.CODE" v-for="item in dict.contractTypeList" :key="item.CODE" />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="contractdetailCode" label="合同编号" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.contractdetailCode" placeholder="选择输入" />
          </template>
        </el-table-column>
        <el-table-column prop="contractdetailName" label="合同名称" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.contractdetailName" placeholder="选择输入" />
          </template>
        </el-table-column>
        <el-table-column prop="contractdetailCount" label="份数" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.contractdetailCount" placeholder="选择输入" />
          </template>
        </el-table-column>
        <el-table-column prop="fileId" label="文件" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.fileId" placeholder="选择输入" />
          </template>
        </el-table-column>
      </el-table>

      <form-label :label="'签约先决条件'" >
        <template slot="after">
          <el-button @click="handleAddContSignrerequisite" type="" icon="el-icon-plus" size="mini"></el-button>
          <el-button type="" icon="el-icon-delete" size="mini"></el-button>
        </template>
      </form-label>
      <div class="wrap">
        <el-form :model="form" label-width="168px">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="合同签订需提前完成天数">
                <el-input v-model="form.signDay" type="number" /> 天
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="合同希望签订日期">
                <el-date-picker
                  v-model="form.signHopeDate"
                  style="width: 100%;"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="所有签约条件完成日期">
                <el-date-picker
                  v-model="form.signFinishDate"
                  style="width: 100%;"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>

      <el-table :data="contSignrerequisiteDTOList" style="width: 100%">
        <el-table-column prop="signContent" label="条款内容" align="center">
          <template slot-scope="scope">
            <el-select v-model="scope.row.signContent" placeholder="请选择" style="width:100%;">
              <el-option :label="item.FLAG" :value="item.CODE" v-for="item in dict.contractTypeList" :key="item.CODE" />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="signMemo" label="说明" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.signMemo" placeholder="选择输入" />
          </template>
        </el-table-column>
        <el-table-column prop="signEstimated" label="预计完成时间" align="center">
          <template slot-scope="scope">
            <el-date-picker
              v-model="scope.row.signEstimated"
              style="width: 100%;"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </template>
        </el-table-column>
        <el-table-column prop="signExecutor" label="协调/执行人" align="center">
          <template slot-scope="scope">
            <el-select v-model="scope.row.signExecutor" placeholder="请选择" style="width:100%;">
              <el-option :label="item.FLAG" :value="item.CODE" v-for="item in dict.contractTypeList" :key="item.CODE" />
            </el-select>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import HeadTitle from '@/views/pages/components/head-title'
import FormLabel from '@/views/pages/components/form-label'
import Model from "@/api/factoring/contract";
import AddRouterQuery from '../mixin/add-route-query'

export default {
  name: 'CommercialTerms',
  components: {
    HeadTitle,
    FormLabel
  },
  mixins: [AddRouterQuery],
  data() {
    return {
      tableData: [],
      form: {},
      contParties: { // 合同当事人
        contBizCode: this.$route.query.bizCode ? this.$route.query.bizCode : '',
        partiesType: '',
        contCode: '',
        partiesCustname: '',
        partiesBank: '',
        partiesAccount: '',
        partiesUnionNum: '',
        partiesMemo: ''
      },
      contPartiesDTOList: [],
      contContractdetail: { // 合同明细
        contBizCode: this.$route.query.bizCode ? this.$route.query.bizCode : '',
        contractdetailType: '',
        contractdetailCode: '',
        contractdetailName: '',
        contractdetailCount: '',
        fileId: ''
      },
      contContractdetailDTOList: [],
      contSignrerequisite: { // 签约先决条件
        contBizCode: this.$route.query.bizCode ? this.$route.query.bizCode : '',
        signContent: '',
        signMemo: '',
        signEstimated: '',
        signExecutor: ''
      },
      contSignrerequisiteDTOList: []
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
      Model.businessInfoView(bizCode).then(res => {
        console.log(res)
        if (!res) return
        this.form = res.contRentrerequisiteDTO ? res.contRentrerequisiteDTO : {}
        this.contPartiesDTOList = res.contPartiesDTOList ? res.contPartiesDTOList : []
        this.contContractdetailDTOList = res.contContractdetailDTOList ? res.contContractdetailDTOList : []
        this.contSignrerequisiteDTOList = res.contSignrerequisiteDTOList ? res.contSignrerequisiteDTOList : []
      })
    },
    // 添加合同当事人
    handleAddContParties() {
      const temp = JSON.parse(JSON.stringify(this.contParties))
      this.contPartiesDTOList.push(temp)
    },
    // 添加合同明细
    handleAddContContractdetail() {
      const temp = JSON.parse(JSON.stringify(this.contContractdetail))
      this.contContractdetailDTOList.push(temp)
    },
    // 签约先决条件
    handleAddContSignrerequisite() {
      const temp = JSON.parse(JSON.stringify(this.contSignrerequisite))
      this.contSignrerequisiteDTOList.push(temp)
    },
    handleSave() {
      const param = {
        contRentrerequisiteDTO: {
          contBizCode: this.$route.query.bizCode ? this.$route.query.bizCode : '',
          ...this.form
        },
        contPartiesDTOList: this.contPartiesDTOList,
        contContractdetailDTOList: this.contContractdetailDTOList,
        contSignrerequisiteDTOList: this.contSignrerequisiteDTOList
      }
      Model.businessInfoSave(param)
    },
  }
}
</script>

<style scoped>

</style>
