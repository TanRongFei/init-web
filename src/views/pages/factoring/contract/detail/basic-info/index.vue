<template>
  <div class="container">
    <form-label :label="'基本信息'" />
    <div class="info">
      <div class="item">
        <span class="label">项目名称</span>
        <span>{{form.contName}}</span>
      </div>
      <div class="item">
        <span class="label">合同编号</span>
        <span>{{form.contCode}}</span>
      </div>
      <div class="item">
        <span class="label">合同类型</span>
        <span>{{form.contractType + '-contractTypeList'|filterDict}}</span>
      </div>
      <div class="item">
        <span class="label">预计签约时间</span>
        <span>{{formatDate(form.signatureTime)}}</span>
      </div>
      <div class="item">
        <span class="label">预计回购时间</span>
        <span>{{formatDate(form.repoTime)}}</span>
      </div>
      <div class="item">
        <span class="label">签约地址</span>
        <span>{{form.contractArea1}} {{form.contractArea2}}</span>
      </div>
      <div class="item">
        <span class="label">签署地</span>
        <span>{{form.signature}}</span>
      </div>
      <div class="item">
        <span class="label">客户经理</span>
        <span>{{form.compName}}</span>
      </div>
      <div class="item">
        <span class="label">所属部门</span>
        <span>{{form.pmDept}}</span>
      </div>
      <div class="item" >
        <span class="label">业务板块</span>
        <span>{{form.prjtPlate1}} {{form.prjtPlate2}}</span>
      </div>
      <div class="item">
        <span class="label">项目助理</span>
        <span>{{form.prjtAm}}</span>
      </div>

      <div class="item">
        <span class="label">基础合同编号及名称</span>
        <span>{{form.basicContractCode}}</span>
      </div>
      <div class="item">
        <span class="label">基础合同签署时间</span>
        <span>{{form.basicContractSigndate}}</span>
      </div>
      <div class="item">
        <span class="label">授信编号</span>
        <span>{{form.platcredBizcode}}</span>
      </div>
      <div class="item">
        <span class="label">项目类型</span>
        <span>{{form.businessType + '-prjtTypelist' | filterDict}}</span>
      </div>
      <div class="item">
        <span class="label">签署方式</span>
        <span>{{form.signWay + '-contractSignTypeList' | filterDict}}</span>
      </div>
      <div class="item">
        <span class="label">区域</span>
        <span>{{form.custArea1}} {{form.custArea2}}</span>
      </div>
    </div>

    <form-label :label="'授信产品'" />
    <div class="wrap">
      <quota-form />
    </div>

    <form-label :label="'交易对象信息'">
      <template slot="after">
        <el-button type="" icon="el-icon-plus" size="mini"></el-button>
        <el-button type="" icon="el-icon-delete" size="mini"></el-button>
      </template>
    </form-label>
    <div class="wrap">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="selection" width="50" />
        <el-table-column prop="name" label="卖/买方名称" align="center"></el-table-column>
        <el-table-column prop="address" label="其他信息" align="center"></el-table-column>
      </el-table>
    </div>

    <div class="wrap">
      <el-form :model="form" label-width="80px">
        <el-form-item label="产品信息">
          <el-input v-model="form.name" type="textarea" />
        </el-form-item>
        <el-form-item label="借款用途">
          <el-input v-model="form.name" type="textarea" />
        </el-form-item>
        <el-form-item label="交易条件">
          <el-input v-model="form.name" type="textarea" />
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
import HeadTitle from '@/views/pages/components/head-title'
import FormLabel from '@/views/pages/components/form-label'
import QuotaForm from './components/quota-form'
import BaseinfoForm from './components/baseinfo-form.vue'
import Model from '@/api/factoring/contract'
import AddRouterQuery from '../mixin/add-route-query'

export default {
  name: 'BasicInfo',
  components: {
    HeadTitle,
    FormLabel,
    QuotaForm,
    BaseinfoForm
  },
  mixins: [AddRouterQuery],
  data() {
    return {
      showDefaultButton: false,
      form: {},
      info: '',
      tableData: [],
      permitDTOList: [], // 客户列表
      activeName: 'first'
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
    // this.fetchCustlist()
  },
  methods: {
    // 客户列表
    fetchCustlist() {
      Model.custlist({}).then(res => {
        console.log(res)
        this.permitDTOList = res.permitDTOList
      })
    },
    // 查看合同方案信息
    fetchBase() {
      console.log(1)
      const bizCode = this.$route.query.bizCode
      if (!bizCode) return
      Model.viewInfo(bizCode).then(res => {
        this.form = res
        console.log('fetchBase', res, this.form)
      })
    },
    back() {
      this.$router.back()
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
