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
                  <el-select v-model="billAddForm.billType" placeholder="增值税专用发票" size="small" style="width:100%">
                    <el-option v-for="item in billTypeOpt" :key="item.value" :label="item.label" :value="item.value" />
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
                <el-form-item label="注册地址：" prop="regAddress">
                  <el-select v-model="billAddForm.regAddress" placeholder="请选择" style="width:25%">
                    <el-option v-for="item in regAddressOpt1" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                  <el-select v-model="billAddForm.regAddress" placeholder="请选择" style="width:25%">
                    <el-option v-for="item in regAddressOpt2" :key="item.value" :label="item.label" :value="item.value" />
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
                <el-form-item label="注册地址：" prop="regAddress">
                  <el-select v-model="mailAddForm.regAddress" placeholder="请选择" style="width:25%">
                    <el-option v-for="item in regAddressOpt1" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                  <el-select v-model="mailAddForm.regAddress" placeholder="请选择" style="width:25%">
                    <el-option v-for="item in regAddressOpt2" :key="item.value" :label="item.label" :value="item.value" />
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
        fixedTel: '',
        zipCode: ''
      },
      billTypeOpt: [
        { value: '1', label: '增值税专用发票' },
        { value: '2', label: '普票' }
      ],
      regAddressOpt1: [
        { value: '1', label: '北京市' },
        { value: '2', label: '上海市' },
        { value: '3', label: '河南省' }
      ],
      regAddressOpt2: [
        { value: '1', label: '朝阳区' },
        { value: '2', label: '海淀区' }
      ],
      billAddRules: {
        billType: [{}],
        custName: [{}],
        taxRate: [{}],
        taxpayerNumb: [{}],
        depositBank: [{}],
        bankAccount: [{}],
        regAddress: [{}],
        regAddress1: [{}],
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
        regAddress: [{}],
        regAddress1: [{}],
        zipCode: [{}]
      }
    }
  },
  methods: {
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
