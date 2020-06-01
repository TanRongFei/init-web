<template>
  <el-form :rules="rules" :model="form" label-width="155px" :label-position="'left'" ref="form">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="项目名称">
          <el-input v-model="form.contName" />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="合同编号" >
          <el-input v-model="form.contCode" disabled />
        </el-form-item>
      </el-col>

      <el-col :span="6">
        <el-form-item label="合同类型" >
          <el-select v-model="form.contractType" placeholder="请选择" style="width:100%;">
            <el-option :label="item.FLAG" :value="item.CODE" v-for="item in dict.prjtTypelist" :key="item.CODE" />
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="预计签约时间" prop="signatureTime">
          <el-date-picker
            v-model="form.signatureTime"
            style="width: 100%;"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="预计回购时间" prop="region">
          <el-date-picker
            v-model="form.repoTime"
            style="width: 100%;"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-row :gutter="10">
          <el-col :span="14">
            <el-form-item label="签约地址" >
              <el-select @change="selectedArea" v-model="form.contractArea1" placeholder="请选择" style="width:100%;">
                <el-option :label="item.name" :value="item.id" v-for="item in province" :key="item.CODE" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-select v-model="form.contractArea2" placeholder="请选择" :key="areaId" style="width:100%;">
              <el-option :label="item.name" :value="item.id" v-for="item in address" :key="item.CODE" />
            </el-select>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="12">
        <el-form-item label="签署地" >
          <el-input v-model="form.signature"></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="客户经理" prop="contPmId">
          <el-select v-model="form.contPmId" placeholder="请选择" style="width:100%;">
<!--            <el-option :label="item.compName" :value="item.compCode" v-for="item in permitDTOList" :key="item.compCode" />-->
            <el-option :label="item.FLAG" :value="item.CODE" v-for="item in dict.userInfoEnum" :key="item.CODE" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="所属部门">
          <el-input v-model="form.pmDept" disabled />
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
          <el-form-item label="业务板块" >
            <el-select @change="selectedLinkage" v-model="form.prjtPlate1" placeholder="请选择" style="width:100%;">
              <el-option :label="item.name" :value="item.id" v-for="item in linkage" :key="item.id" />
            </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="项目助理">
          <el-select v-model="form.prjtAm" placeholder="请选择" style="width:100%;">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="基础合同编号及名称" >
          <el-row :gutter="10">
            <el-col :span="12">
              <el-input v-model="form.basicContractCode" />
            </el-col>
            <el-col :span="12">
              <el-input v-model="form.basicContractName" />
            </el-col>
          </el-row>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="基础合同签署时间" >
          <el-date-picker
            v-model="form.basicContractSigndate"
            type="date"
            style="width: 100%;"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="授信编号" prop="platcredBizcode">
          <el-input v-model="form.platcredBizcode" disabled />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="项目类型" prop="businessType">
          <el-select v-model="form.businessType" placeholder="请选择" style="width:100%;">
            <el-option :label="item.FLAG" :value="item.CODE" v-for="item in dict.prjtTypelist" :key="item.CODE" />
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="签署方式" prop="signWay">
          <el-select v-model="form.signWay" placeholder="请选择" style="width:100%;">
            <el-option :label="item.FLAG" :value="item.CODE" v-for="item in dict.contractSignTypeList" :key="item.CODE" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-row :gutter="10">
          <el-col :span="14">
            <el-form-item label="区域">
              <el-select @change="selectedProvince" v-model="form.custArea1" placeholder="请选择" style="width:100%;">
                <el-option :label="item.name" :value="item.id" v-for="item in province" :key="item.CODE" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-select v-model="form.custArea2" placeholder="请选择" style="width:100%;" :key="provinceId">
              <el-option :label="item.name" :value="item.id" v-for="item in area" :key="item.CODE" />
            </el-select>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import rules from '@/views/mixins/rules'
import { mapGetters } from 'vuex'
import CrmModel from '@/api/factoring/crm'

export default {
  name: 'BaseinfoForm',
  mixins: [rules],
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    permitDTOList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      form: {
        platcredBizcode: 'w123'
      },
      pid: '',
      provinceId: 0,
      areaId: 0,
      linkage: [],
      linkageId: 0,
      linkagePid: '',
      linkageChild: [],
      area: [], // 区域
      address: [] // 签约地址
    }
  },
  computed: {
    ...mapGetters([
      'dict',
      'province'
    ])
  },
  watch: {
    data(n, o) {
      this.form = JSON.parse(JSON.stringify(n))
      this.form.businessType = `${this.form.businessType}`
    }
  },
  created() {
    this.$nextTick(function() {
      this.form = JSON.parse(JSON.stringify(this.data))
      console.log('baseInfo', this.form)
    })

    this.fetchLinkageList()
  },
  methods: {
    // 区域选择
    selectedProvince(v) {
      this.provinceId = v

      this.province.forEach(item => {
        if (item.id === v) {
          this.pid = item.pId
        }
      })

      if (this.pid) {
        this.$store.dispatch('dict/fetchArea', this.pid).then(res => {
          this.area = res
        })
      }
    },

    // 签约地址
    selectedArea(v) {
      this.areaId = v

      this.province.forEach(item => {
        if (item.id === v) {
          this.pid = item.pId
        }
      })

      if (this.pid) {
        this.$store.dispatch('dict/fetchArea', this.pid).then(res => {
          this.address = res
        })
      }
    },
    // 行业分类
    fetchLinkageList() {
      CrmModel.linkageList('行业分类').then(res => {
        console.log(res)
        this.linkage = res
      })
    },
    selectedLinkage(v) {
      this.linkageId = v

      let pid = ''
      this.linkage.forEach(item => {
        if (item.id === v) {
          pid = item.pid
        }
      })

      if (pid === 0 || pid) {
        CrmModel.linkageChild(pid).then(res => {
          console.log(res)
          this.linkageChild = res
        })
      }
    }
  }
}
</script>

<style lang="scss">
.el-radio-group{
  display: flex;
  width: 100%;
}
</style>
