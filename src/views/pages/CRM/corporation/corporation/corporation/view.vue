<template>
  <div>
    <div class="container">
      <div class="customer-detail-cont">
        <div class="customer-detail-tab">
          <div class="title clearfix"><h1>客户信息查看</h1>
            <div class="btns">
              <el-button type="primary" size="small" @click="back('CorporationList')">返回</el-button>
            </div>
          </div>
          <div class="tags clearfix">
            <div class="fl">
              <div class="status">状态：
                {{ compStatus }}
              </div>
            </div>
            <div class="numb">用户编号：{{ compCode }}</div>
          </div>
          <!-- tabs -->
          <div class="tab-menu">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
              <el-tab-pane label="基本信息" name="first" />
              <el-tab-pane label="角色设置" name="second" />
              <el-tab-pane label="账户信息" name="third" />
              <el-tab-pane label="企业用户" name="forth" />
              <el-tab-pane label="开票信息" name="fifth" />
              <el-tab-pane label="企业介绍" name="sixth" />
              <el-tab-pane label="资料信息" name="secondth" />
            </el-tabs>
          </div>
        </div>
        <!--  -->
        <div class="customer-detail-bd">
          <div v-if="tabType == 0">
            <div class="info-tit"><h4>基本信息</h4></div>
            <div class="mod-detail mt15">
              <el-form size="small">
                <el-row :gutter="20">
                  <el-col :span="10">
                    <el-form-item label="客户分类：">
                      {{ custType }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="客户状态：">
                      {{ compStatus }}
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="10">
                    <el-form-item label="客户名称:">
                      {{ compName }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="企业简称:">
                      {{ simpleName }}
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="10">
                    <el-form-item label="是否三证合一：">
                      {{ isUscc }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="11">
                    <el-form-item label="统一社会信用代码:" style="width: 400px">
                      {{ usccCode }}
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="10">
                    <el-form-item label="营业执照号码：">
                      {{ busLicenseCode }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="组织机构代码：">
                      {{ orgCode }}
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="税务登记证号：">
                      {{ taxRegCerCode }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="10" style="padding-left: 10px">
                    <el-form-item label="开户许可证：">
                      {{ openingPermit }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="20">
                    <el-form-item label="注册地址：">
                      <span>{{ regAddrProvinceName }}</span>
                      <span>{{ regAddrCityName }}</span>
                      <span>{{ regAddrDesc }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="客户编号：">
                      {{ compCode }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="上级组织：">
                      {{ parentCode }}
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </div>
          <div v-if="tabType == 0">
            <div class="info-tit"><h4>法人信息</h4></div>
            <div class="mod-detail mt15">
              <el-form size="small">
                <el-row :gutter="20">
                  <el-col :span="10">
                    <el-form-item label="法人姓名：">
                      {{ legalName }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="性别：">
                      {{ legalGender }}
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="10">
                    <el-form-item label="证件类型:">
                      {{ legalIdtype }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="法人证件号码：">
                      {{ legalIdnum }}
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="10">
                    <el-form-item label="法人手机号：">
                      {{ legalMobile }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="法人邮箱：">
                      {{ legalEmail }}
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="20">
                    <el-form-item label="固定电话：">
                      {{ legalTel }}
                    </el-form-item>
                  </el-col>
                </el-row>

              </el-form>
            </div>
          </div>
          <div v-if="tabType == 0">
            <div class="info-tit"><h4>其他信息</h4></div>
            <div class="mod-detail mt15">
              <el-form size="small">
                <el-row :gutter="20">
                  <el-col :span="10">
                    <el-form-item label="注册资本(万)：">
                      {{ regCapital }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="实收资本(万)：">
                      {{ paidupCapital }}
                    </el-form-item>
                  </el-col>

                </el-row>
                <el-row :gutter="20">
                  <el-col :span="10">
                    <el-form-item label="成立日期:">
                      {{ setupDate }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="营业期限：">
                      {{ readonly }}
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="10">
                    <el-form-item label="企业类型:">
                      {{ entpType }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="企业性质：">
                      {{ entpNature }}
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="20">
                    <el-form-item label="行业分类:">
                      {{ busTypeBig }}
                    </el-form-item>
                  </el-col>
                </el-row>

              </el-form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
// import { lookList } from '@/api/corporationList/lookcorporationList'
import Look from '@/api/crm/lookcorporationList'
export default {
  name: 'Detail',
  data() {
    return {
      ctype: 1,
      status: 10,
      compStatus: '', // 状态
      compCode: '', // 客户编号
      legalName: '', // 法人姓名
      compName: '', // 客户名称
      parentCode: '', // 上级组织
      simpleName: '', // 企业简称
      isUscc: '', // 是否三证合一
      uscc: 1,
      busLicenseCode: '', // 营业执照号码
      orgCode: '', // 组织机构代码
      taxRegCerCode: '', // 税务登记证号
      openingPermit: '', // 开户许可证
      custType: '', // 客户分类
      usccCode: '', // 统一社会信用代码
      regAddrDesc: '', // 注册地址
      regAddrCityName: '', // 注册地址
      regAddrProvinceName: '', // 注册地址
      legalGender: '', // 性别
      legalIdtype: '', // 证件类型
      Idtype: 1,
      legalIdnum: '', // 法人证件号码
      legalMobile: '', // 法人手机号
      setupDate: '', // 成立日期
      legalEmail: '', // 法人邮箱
      legalTel: '', // 固定电话
      regCapital: '', // 注册资本
      paidupCapital: '', // 实收资本
      readonly: '', // 营业期限
      entpType: '', // 企业类型
      entpNature: '', // 企业性质
      busTypeBig: '', // 行业分类
      activeName: 'first',
      tabType: 0,
      tableData: [{
        numb: 'KH2002010001',
        custName: '北京某某有限公司',
        custType: '供应商',
        createDate: '2020-04-21 14:20'
      }, {
        numb: 'KH2002010001',
        custName: '北京某某有限公司',
        custType: '供应商',
        createDate: '2020-04-21 14:20'
      }, {
        numb: 'KH2002010001',
        custName: '北京某某有限公司',
        custType: '供应商',
        createDate: '2020-04-21 14:20'
      }, {
        numb: 'KH2002010001',
        custName: '北京某某有限公司',
        custType: '供应商',
        createDate: '2020-04-21 14:20'
      }, {
        numb: 'KH2002010001',
        custName: '北京某某有限公司',
        custType: '供应商',
        createDate: '2020-04-21 14:20'
      }]
    }
  },
  created() {
    this.getLookList()
  },
  mounted() {
    if (this.ctype === 1) {
      this.custType = '法人'
    } else if (this.ctype === 2) {
      this.custType = '非法人'
    }
    if (this.status === 10) {
      this.compStatus = '保存'
    } else if (this.status === 15) {
      this.compStatus = '实名中'
    } else if (this.status === 16) {
      this.compStatus = '实名认证待审核'
    } else if (this.status === 20) {
      this.compStatus = '实名认证通过'
    } else if (this.status === 25) {
      this.compStatus = '实名失败'
    } else if (this.status === 30) {
      this.compStatus = '待审批'
    } else if (this.status === 35) {
      this.compStatus = '审批不通过'
    } else if (this.status === 40) {
      this.compStatus = '审批通过'
    }
    if (this.Idtype === 1) {
      this.legalIdtype = '身份证'
    } else if (this.Idtype === 3) {
      this.legalIdtype = '港澳通行证'
    } else if (this.Idtype === 4) {
      this.legalIdtype = '台胞通行证'
    } else if (this.Idtype === 5) {
      this.legalIdtype = '护照'
    }
    if (this.uscc === 1) {
      this.isUscc = '是'
    } else if (this.uscc === 2) {
      this.isUscc = '否'
    }
  },
  methods: {
    // 获取客户列表信息
    getLookList() {
      console.log(this.$route.query.compCode)
      Look.lookList(`compCode=${this.$route.query.compCode}`)
        .then(resp => {
          console.log(resp)
          //
          if (resp.body.custCompDTO) {
            this.status = resp.body.custCompDTO.compStatus
            this.compCode = resp.body.custCompDTO.compCode
            this.compName = resp.body.custCompDTO.compName
            this.parentCode = resp.body.custCompDTO.parentCode
            this.simpleName = resp.body.custCompDTO.simpleName
            this.uscc = resp.body.custCompDTO.isUscc
            this.legalName = resp.body.custCompDTO.legalName
            this.busLicenseCode = resp.body.custCompDTO.busLicenseCode
            this.orgCode = resp.body.custCompDTO.orgCode
            this.taxRegCerCode = resp.body.custCompDTO.taxRegCerCode
            this.openingPermit = resp.body.custCompDTO.openingPermit
            this.ctype = resp.body.custCompDTO.custType
            this.usccCode = resp.body.custCompDTO.usccCode
            this.regAddrDesc = resp.body.custCompDTO.regAddrDesc
            this.regAddrCityName = resp.body.custCompDTO.regAddrCityName
            this.regAddrProvinceName = resp.body.custCompDTO.regAddrProvinceName
            this.legalGender = resp.body.custCompDTO.legalGender
            this.Idtype = resp.body.custCompDTO.legalIdtype
            this.legalIdnum = resp.body.custCompDTO.legalIdnum
            this.legalMobile = resp.body.custCompDTO.legalMobile
            this.legalTel = resp.body.custCompDTO.legalTel
            this.setupDate = resp.body.custCompDTO.setupDate
            this.legalEmail = resp.body.custCompDTO.legalEmail
            this.regCapital = resp.body.custCompDTO.regCapital
            this.paidupCapital = resp.body.custCompDTO.paidupCapital
            this.entpType = resp.body.custCompDTO.entpType
            this.entpNature = resp.body.custCompDTO.entpNature
            this.busTypeBig = resp.body.custCompDTO.busTypeBig
            this.readonly = resp.body.custCompDTO.operPeriod
          } else {
            this.status = resp.body.custCompLevDTO.compStatus
            this.compCode = resp.body.custCompLevDTO.compCode
            this.compName = resp.body.custCompLevDTO.compName
            this.parentCode = resp.body.custCompLevDTO.parentCode
            this.simpleName = resp.body.custCompLevDTO.simpleName
            this.uscc = resp.body.custCompLevDTO.isUscc
            this.legalName = resp.body.custCompLevDTO.legalName
            this.busLicenseCode = resp.body.custCompLevDTO.busLicenseCode
            this.orgCode = resp.body.custCompLevDTO.orgCode
            this.taxRegCerCode = resp.body.custCompLevDTO.taxRegCerCode
            this.openingPermit = resp.body.custCompLevDTO.openingPermit
            this.ctype = resp.body.custCompLevDTO.custType
            this.usccCode = resp.body.custCompLevDTO.usccCode
            this.regAddrDesc = resp.body.custCompLevDTO.regAddrDesc
            this.regAddrCityName = resp.body.custCompLevDTO.regAddrCityName
            this.regAddrProvinceName = resp.body.custCompLevDTO.regAddrProvinceName
            this.legalGender = resp.body.custCompLevDTO.legalGender
            this.Idtype = resp.body.custCompLevDTO.legalIdtype
            this.legalIdnum = resp.body.custCompLevDTO.legalIdnum
            this.legalMobile = resp.body.custCompLevDTO.legalMobile
            this.legalTel = resp.body.custCompLevDTO.legalTel
            this.setupDate = resp.body.custCompLevDTO.setupDate
            this.legalEmail = resp.body.custCompLevDTO.legalEmail
            this.regCapital = resp.body.custCompLevDTO.regCapital
            this.paidupCapital = resp.body.custCompLevDTO.paidupCapital
            this.entpType = resp.body.custCompLevDTO.entpType
            this.entpNature = resp.body.custCompLevDTO.entpNature
            this.busTypeBig = resp.body.custCompLevDTO.busTypeBig
            this.readonly = resp.body.custCompLevDTO.operPeriod
          }

          // /
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleClick: function(tab, event) {
      this.tabType = tab.index
    },
    setCurrent: function(row) {
      this.$refs.singleTable.setCurrentRow(row)
    },
    handleCurrentChange: function(val) {
      this.currentRow = val
    },
    // 点击返回功能
    back(pathName) {
      this.$router.push({ name: pathName })
      this.$store.dispatch('app/setLeftSidebarRouters', {})
    }
  }
}
</script>

<style lang="scss">
.customer-detail-tab .tags .numb {
  margin-top: 20px;
  margin-right: -55px;
}
.customer-detail-tab .tags .status {
  margin-left: -155px;
  margin-top: 20px;
}
</style>
