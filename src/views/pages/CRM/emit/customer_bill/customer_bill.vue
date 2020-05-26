<template>
  <div>
    <!-- 右侧 start -->
    <div>
      <div class="m-head clearfix">
        <div class="m-head-tit fl">
          <h4>开票信息</h4>
        </div>
        <div class="m-head-btn fr">
          <el-button type="primary" size="small">保存</el-button>
          <el-button size="small" @click="back('CorporationList')">返回</el-button>
        </div>
      </div>
      <!-- 编辑 -->
      <div class="m-table-detail">
        <!-- 开票信息 -->
        <div class="mod-add-form mt15">
          <el-form :model="billAddForm" :rules="billAddRules" label-width="140px" size="small">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="开票类型：" prop="billType">
                  <el-select v-model="billAddForm.billType" size="small" style="width:100%">
                    <el-option v-for="item in billTypes" :key="item.code" :label="item.label" :value="item.code" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="企业全称：" prop="custName">
                  <el-input v-model="billAddForm.custName" placeholder="" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="税率%：" prop="taxRate">
                  <el-input v-model="billAddForm.taxRate" placeholder="" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="纳税人识别号：" prop="taxpayerNumb">
                  <el-input v-model="billAddForm.taxpayerNumb" placeholder="" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="开户银行：" prop="depositBank">
                  <el-input v-model="billAddForm.depositBank" placeholder="" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="开户行账号：" prop="bankAccount">
                  <el-input v-model="billAddForm.bankAccount" placeholder="" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <!-- <el-form-item label="注册地址：" prop="regAddress">
                  <el-select v-model="billAddForm.regAddress" placeholder="请选择" style="width:25%">
                    <el-option v-for="item in regAddressOpt1" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                  <el-select v-model="billAddForm.regAddress" placeholder="请选择" style="width:25%">
                    <el-option v-for="item in regAddressOpt2" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                  <el-input v-model="billAddForm.regAddress1" placeholder="" style="width:48%" />
                </el-form-item> -->
                <el-form-item label="注册地址：" prop="regAddress">
                  <el-select v-model="billAddForm.regAddress" placeholder="请选择" style="width:25%" @change="getCity(billAddForm.regAddress)">
                    <el-option v-for="item in regAddressOpt1" :key="item.id" :label="item.name" :value="item.id" />
                  </el-select>
                  <el-select v-model="billAddForm.regAddress2" placeholder="请选择" style="width:25%">
                    <el-option v-for="item in regAddressOpt2" :key="item.id" :label="item.name" :value="item.id" />
                  </el-select>
                  <el-input v-model="billAddForm.regAddress1" placeholder="" style="width:48%" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="固定电话：" prop="fixedTel">
                  <el-input v-model="billAddForm.fixedTel" placeholder="" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="邮编：" prop="zipCode">
                  <el-input v-model="billAddForm.zipCode" placeholder="" />
                </el-form-item>
              </el-col>
              <el-col :span="8" />
            </el-row>
          </el-form>
        </div>
        <!-- 邮寄信息 -->
        <div class="mod-info-tit"><h4>邮寄信息</h4></div>
        <div class="mod-add-form mt15">
          <el-form :model="mailAddForm" :rules="mailAddRules" label-width="140px" size="small">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="收件人姓名：" prop="addresseeName">
                  <el-input v-model="mailAddForm.addresseeName" placeholder="" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="联系电话：" prop="phone">
                  <el-input v-model="mailAddForm.phone" placeholder="" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="邮编：" prop="zipCode">
                  <el-input v-model="mailAddForm.zipCode" placeholder="" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <!-- <el-form-item label="邮寄地址：" prop="regAddress">
                  <el-select v-model="mailAddForm.regAddress" placeholder="请选择" style="width:25%">
                    <el-option v-for="item in regAddressOpt1" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                  <el-select v-model="mailAddForm.regAddress" placeholder="请选择" style="width:25%">
                    <el-option v-for="item in regAddressOpt2" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                  <el-input v-model="mailAddForm.regAddress1" placeholder="" style="width:48%" />
                </el-form-item> -->
                <el-form-item label="邮寄地址：" prop="regAddress">
                  <el-select v-model="mailAddForm.regAddress" placeholder="请选择" style="width:25%" @change="getCity(mailAddForm.regAddress)">
                    <el-option v-for="item in regAddressOpt1" :key="item.id" :label="item.name" :value="item.id" />
                  </el-select>
                  <el-select v-model="mailAddForm.regAddress2" placeholder="请选择" style="width:25%">
                    <el-option v-for="item in regAddressOpt2" :key="item.id" :label="item.name" :value="item.id" />
                  </el-select>
                  <el-input v-model="mailAddForm.regAddress1" placeholder="" style="width:48%" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>

    </div>
    <!-- 右侧 end -->
  </div>
</template>

<script>
import getBill from '@/api/CRM/bill'
import Province from '@/api/CRM/province'
import Area from '@/api/CRM/area'
export default {
  name: 'CustomerBill',
  data() {
    return {
      billAddForm: {
        billType: '',
        custName: '',
        taxRate: '',
        taxpayerNumb: '',
        depositBank: '',
        bankAccount: '',
        regAddress: '',
        regAddress1: '',
        regAddress2: '',
        fixedTel: '',
        zipCode: ''
      },
      billTypes: [
        { code: '1', label: '增值税专用发票' },
        { code: '2', label: '增值税普票' }
      ],
      regAddressOpt1: [],
      regAddressOpt2: [],
      billAddRules: {
        billType: [{}],
        custName: [{}],
        taxRate: [{}],
        taxpayerNumb: [{}],
        depositBank: [{}],
        bankAccount: [{}],
        regAddress: [{ required: true, message: '请输入注册地址' }],
        regAddress1: [{ required: true, message: '请输入注册地址' }],
        fixedTel: [{}],
        zipCode: [{}]
      },
      mailAddForm: {
        addresseeName: '',
        phone: '',
        regAddress: '',
        regAddress1: '',
        zipCode: ''
      },
      mailAddRules: {
        addresseeName: [{}],
        phone: [{}],
        regAddress: [{ required: true, message: '请输入注册地址' }],
        regAddress1: [{ required: true, message: '请输入注册地址' }],
        zipCode: [{}]
      }
    }
  },
  created() {
    this.getBills()
    this.getPro()
    this.getCity()
  },
  methods: {
    // 获取注册省
    getPro() {
      Province.delList()
        .then(resp => {
          if (resp.status === '200') {
            console.log(resp.body[0].id)
            this.regAddressOpt1 = resp.body
          }
        })
    },
    // 获取注册市
    getCity(pid) {
      for (const item in this.regAddressOpt1) {
        if (this.regAddressOpt1[item].id === pid) {
          this.id = this.regAddressOpt1[item].id
          Area.delList(`pid=${this.id}`)
            .then(resp => {
              console.log(resp.body)
              this.regAddressOpt2 = resp.body
            })
        }
      }
    },
    // 获取当前开票信息
    getBills() {
      getBill.delList(`compCode=${this.$route.query.compCode}`)
        .then(resp => {
          console.log(resp)
          this.billAddForm.billType = resp.body[0].billType
          this.billAddForm.custName = resp.body[0].compName
          this.billAddForm.taxRate = resp.body[0].taxCode
          this.billAddForm.taxpayerNumb = resp.body[0].taxCode
          this.billAddForm.depositBank = resp.body[0].bankName
          this.billAddForm.bankAccount = resp.body[0].bankCard
          this.billAddForm.regAddress = resp.body[0].compAddr
          this.billAddForm.fixedTel = resp.body[0].compTel
          this.billAddForm.zipCode = resp.body[0].receivePostcode
          this.mailAddForm.addresseeName = resp.body[0].receiveName
          this.mailAddForm.phone = resp.body[0].receiveMobile
          this.mailAddForm.zipCode = resp.body[0].receivePostcode
          this.mailAddForm.regAddress = resp.body[0].addrPrivName
          this.mailAddForm.regAddress = resp.body[0].addrCityName
          this.mailAddForm.regAddress1 = resp.body[0].addrDistrictName
        })
    },
    // 点击返回功能
    back(pathName) {
      this.$router.push({ name: pathName })
      this.$store.dispatch('app/setLeftSidebarRouters', {})
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
