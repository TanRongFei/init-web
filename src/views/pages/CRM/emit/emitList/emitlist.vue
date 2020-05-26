<template>
  <div>
    <!-- 右侧 start -->
    <div>
      <div class="m-head clearfix">
        <div class="m-head-tit fl">
          <h4>修改企业客户</h4>
        </div>
        <div class="m-head-btn fr">
          <el-button type="primary" size="small" @click="emit('CorporationList')">保存</el-button>
          <el-button size="small" @click="back('CorporationList')">返回</el-button>
        </div>
      </div>
      <!-- 编辑 -->
      <div class="m-table-detail">
        <!-- 企业信息 -->
        <div class="mod-add-form">
          <el-form ref="emitform" :model="addForm" :rules="addRules" label-width="120px" size="small">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="客户类型：" prop="custType">
                  <el-select v-model="addForm.custType" placeholder="请选择" size="small" style="width:100%">
                    <el-option v-for="item in custTypeOpt" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="客户状态：" prop="custState">
                  <el-select v-model="addForm.custState" placeholder="保存" size="small" style="width:100%" disabled>
                    <el-option v-for="item in custStateOpt" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8" />
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="客户名称：" prop="custName">
                  <el-input v-model="addForm.custName" placeholder="" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="企业简称：" prop="custAbbreviation">
                  <el-input v-model="addForm.custAbbreviation" placeholder="" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="三证合一：" prop="threeCertify">
                  <el-switch v-model="addForm.threeCertify" active-text="" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="营业执照号码：" prop="licenseNo">
                  <el-input v-model="addForm.licenseNo" placeholder="" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="组织机构代码：" prop="organizationCode">
                  <el-input v-model="addForm.organizationCode" placeholder="" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="税务登记证号：" prop="taxRegNo">
                  <el-input v-model="addForm.taxRegNo" placeholder="" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="开户许可证：" prop="accOpenPermit">
                  <el-input v-model="addForm.accOpenPermit" placeholder="" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="机构信用代码证：" prop="creditCode">
                  <el-input v-model="addForm.creditCode" placeholder="" />
                </el-form-item>
              </el-col>
              <el-col :span="8" />
            </el-row>
            <el-row>
              <el-col>
                <el-form-item label="注册地址：" prop="regAddress">
                  <el-select v-model="addForm.regAddress" placeholder="请选择" style="width:25%" @change="getCity(addForm.regAddress)">
                    <el-option v-for="item in regAddressOpt1" :key="item.id" :label="item.name" :value="item.id" />
                  </el-select>
                  <el-select v-model="addForm.regAddress2" placeholder="请选择" style="width:25%">
                    <el-option v-for="item in regAddressOpt2" :key="item.id" :label="item.name" :value="item.id" />
                  </el-select>
                  <el-input v-model="addForm.regAddress1" placeholder="" style="width:48%" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="客户编号：" prop="custNumb">
                  <el-input v-model="addForm.custNumb" placeholder="" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="上级组织：" prop="parentOrgNo">
                  <el-input v-model="addForm.parentOrgNo" placeholder="" />
                </el-form-item>
              </el-col>
              <el-col :span="8" />
            </el-row>
          </el-form>
        </div>
        <!-- 法人信息 -->
        <div class="mod-info-tit"><h4>法人信息</h4></div>
        <div class="mod-add-form mt15">
          <el-form :model="addForm" :rules="addRules" label-width="140px" size="small">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="法人姓名：" prop="legalName">
                  <el-input v-model="addForm.legalName" placeholder="" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="性别：" prop="gender">
                  <el-radio-group v-model="addForm.gender">
                    <el-radio label="1">男</el-radio>
                    <el-radio label="2">女</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="证件类型：" prop="certificateType">
                  <el-select v-model="addForm.certificateType" placeholder="请选择" size="small" style="width:100%">
                    <el-option v-for="item in certificateTypeOpt" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="法人证件号：" prop="legalCertificateNo">
                  <el-input v-model="addForm.legalCertificateNo" placeholder="" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="法人手机号：" prop="legalPhone">
                  <el-input v-model="addForm.legalPhone" placeholder="" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="法人邮箱：" prop="legalEmail">
                  <el-input v-model="addForm.legalEmail" placeholder="" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="固定电话：" prop="fixedTel">
                  <el-input v-model="addForm.fixedTel" placeholder="" />
                </el-form-item>
              </el-col>
              <el-col :span="8" />
              <el-col :span="8" />
            </el-row>
          </el-form>
        </div>
        <!-- 其他信息 -->
        <div class="mod-info-tit"><h4>其他信息</h4></div>
        <div class="mod-add-form mt15">
          <el-form :model="addForm" :rules="addRules" label-width="140px" size="small">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="注册资本：" prop="regCapital">
                  <el-input v-model="addForm.regCapital" placeholder="" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="实收资本：" prop="paidInCapital">
                  <el-input v-model="addForm.paidInCapital" placeholder="" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="成立时间：" prop="establishTime">
                  <el-date-picker v-model="addForm.establishTime" type="date" placeholder="2014-05-16" style="width: 100%;" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="营业期限：" prop="businessTerm">
                  <el-date-picker v-model="addForm.businessTerm" type="date" placeholder="2024-05-16" style="width: 100%;" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="企业类型：" prop="enterpriseType">
                  <el-select v-model="addForm.enterpriseType" placeholder="请选择" style="width:100%">
                    <el-option v-for="item in enterpriseTypeOpt" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="企业性质：" prop="enterpriseNature">
                  <el-select v-model="addForm.enterpriseNature" placeholder="请选择" style="width:100%">
                    <el-option v-for="item in enterpriseNatureOpt" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item label="行业分类：" prop="industryClass">
                  <el-select v-model="addForm.industryClass" placeholder="请选择" style="width:25%" @change="linkChild(addForm.industryClass)">
                    <el-option v-for="item in industryClassOpt1" :key="item.id" :label="item.name" :value="item.id" />
                  </el-select>
                  <el-select v-model="addForm.industryClass2" placeholder="请选择" style="width:25%">
                    <el-option v-for="item in industryClassOpt2" :key="item.id" :label="item.name" :value="item.id" />
                  </el-select>
                  <el-input v-model="addForm.industryClass3" style="width:48%" />
                  <!-- <el-select v-model="addForm.industryClass3" placeholder="请选择" style="width:38%">
                    <el-option v-for="item in industryClassOpt3" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select> -->
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="资产总额：" prop="totalAssets">
                  <el-input v-model="addForm.totalAssets" placeholder="" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="当年营业收入：" prop="income">
                  <el-input v-model="addForm.income" placeholder="" />
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="办公电话：" prop="telephone">
                  <el-input v-model="addForm.telephone" placeholder="" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="传真：" prop="fax">
                  <el-input v-model="addForm.fax" placeholder="" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="员工总数：" prop="totalEmployees">
                  <el-input v-model="addForm.totalEmployees" placeholder="200" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="客户分类：" prop="custClass">
                  <el-select v-model="addForm.custClass" placeholder="请选择" style="width:100%">
                    <el-option v-for="item in custClassOpt" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="注册类型：" prop="regType">
                  <el-select v-model="addForm.regType" placeholder="请选择" style="width:100%">
                    <el-option v-for="item in regTypeOpt" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="创建时间：" prop="createTime">
                  <el-date-picker v-model="addForm.createTime" type="date" placeholder="2014-05-16" style="width: 100%;" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="经营范围：" prop="businessScope">
                  <el-input v-model="addForm.businessScope" placeholder="" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="创建人：" prop="createBy">
                  <el-input v-model="addForm.createBy" placeholder="" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="业务联系人：" prop="businessContact">
                  <el-input v-model="addForm.businessContact" placeholder="" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="联系电话：" prop="businessPhone">
                  <el-input v-model="addForm.businessPhone" placeholder="" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <!-- 企业信用评级 -->
        <div class="mod-info-tit"><h4>企业信用评级</h4></div>
        <div class="mod-add-form mt15">
          <el-form :model="addForm" :rules="addRules" label-width="140px" size="small">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="评级及建议：" prop="ratScore">
                  <el-input v-model="addForm.ratScore" style="width: 100px" placeholder="95" /> /
                  <el-input v-model="addForm.ratSuggest" style="width: 100px" placeholder="AAA" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="展望：" prop="expectation">
                  <el-select v-model="addForm.expectation" placeholder="请选择" size="small" style="width:100%">
                    <el-option v-for="item in expectationOpt" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="评级失效日：" prop="expirationDate">
                  <el-date-picker v-model="addForm.expirationDate" type="date" placeholder="2014-05-16" style="width: 100%;" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="评级人员：" prop="ratingPerson">
                  <el-input v-model="addForm.ratingPerson" placeholder="" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="评级结果：" prop="ratingResults">
                  <el-select v-model="addForm.ratingResults" placeholder="请选择" size="small" style="width:100%">
                    <el-option v-for="item in ratingResultsOpt" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8" />
            </el-row>
          </el-form>
        </div>
      </div>
    </div>
    <!-- 右侧 end -->

  </div>
</template>

<script>
import Look from '@/api/CRM/lookcorporationList'
import Emit from '@/api/CRM/emit'
import Province from '@/api/CRM/province'
import Area from '@/api/CRM/area'
import Link from '@/api/CRM/linkage'
import LinkChild from '@/api/CRM/linkchild'
export default {
  name: 'EmitList',
  data() {
    return {
      // search
      hsearch: '',
      isAdvanSearch: false,
      bizCode: '',
      type: '行业分类', // 行业分类
      status: 10,
      Idtype: 1,
      uscc: 1,
      //
      ctype: 1,
      rtype: 0,
      addForm: {
        bizCode: '', //
        custType: '', // 法人
        custState: '', // 状态
        custName: '', // 客户名称
        custAbbreviation: '', // 企业简称
        threeCertify: true, // 三证合一
        licenseNo: '', // 营业执照
        organizationCode: '', // 组织机构
        taxRegNo: '', // 税务登记
        accOpenPermit: '', // 开户许可
        creditCode: '', // 机构信用代码
        regAddress: '', // 注册地址城
        regAddres: '', // 注册地址区
        regAddress1: '', // 详细地址
        custNumb: '', // 客户编号
        parentOrgNo: '', // 上级组织
        legalName: '', // 法人姓名
        gender: '1', //  性别
        certificateType: '', // 证件类型
        legalCertificateNo: '', // 证件号
        legalPhone: '', // 手机号
        legalEmail: '', // 邮箱
        fixedTel: '', // 固定电话

        regCapital: '', // 注册资本
        paidInCapital: '', // 实收资本
        establishTime: '', // 成立时间
        businessTerm: '', // 营业期限
        enterpriseType: '', // 企业类型
        enterpriseNature: '', // 企业性质
        industryClass: '', // 行业大类
        industryClass2: '', // 行业中类
        industryClass3: '', // 行业小类
        totalAssets: '', // 资产总额
        income: '', // 当年营业收入
        telephone: '', // 办公电话
        fax: '', // 传真
        totalEmployees: '', // 员工总数
        custClass: '', // 客户分类
        regType: '', // 注册类型
        createTime: '', // 创建时间
        businessScope: '', // 经营范围
        createBy: '', // 创建人
        businessContact: '', // 业务联系人
        businessPhone: '', // 联系电话

        ratScore: '', // 评级
        ratSuggest: '', // 建议
        expectation: '', // 展望
        expirationDate: '', // 评级失效日
        ratingPerson: '', // 评级人员
        ratingResults: '' // 评级结果
      },
      custTypeOpt: [
        { value: '1', label: '法人' },
        { value: '2', label: '非法人' }
      ],
      custStateOpt: [
        { value: '1', label: '保存' },
        { value: '2', label: '审批通过' }
      ],
      regAddressOpt1: [],
      id: '',
      regAddressOpt2: [],
      certificateTypeOpt: [
        { value: '1', label: '身份证' },
        { value: '2', label: '军官证' },
        { value: '3', label: '港澳台通行证' }
      ],
      enterpriseTypeOpt: [
        { value: '1', label: '企业' },
        { value: '2', label: '（政府）机关' },
        { value: '3', label: '事业单位' },
        { value: '4', label: '社会团体' }
      ],
      enterpriseNatureOpt: [
        { value: '1', label: '国有' },
        { value: '2', label: '合作' },
        { value: '3', label: '合资' },
        { value: '4', label: '独资集体' },
        { value: '5', label: '私营' }
      ],
      industryClassOpt1: [],
      industryClassOpt2: [],
      // industryClassOpt3: [
      //   { value: '1', label: '行业小类' },
      //   { value: '2', label: '行业小类' },
      //   { value: '3', label: '行业小类' }
      // ],
      custClassOpt: [
        { value: '1', label: '一般客户' },
        { value: '2', label: 'VIP' }
      ],
      regTypeOpt: [
        { value: '0', label: '自主注册' },
        { value: '1', label: '平台维护' }
      ],
      expectationOpt: [
        { value: '1', label: '积极' },
        { value: '2', label: '稳定' },
        { value: '3', label: '消极' }
      ],
      ratingResultsOpt: [
        { value: '1', label: '风险接受范围' },
        { value: '2', label: '超出风险接受范围' }
      ],
      addRules: {
        custType: [{ required: true, message: '请选择', trigger: 'change' }],
        custName: [{ required: true, message: '客户名称不能为空', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getLookList()

    this.getPro()
    this.getLink()
  },
  mounted() {
    if (this.ctype === 1) {
      this.addForm.custType = '法人'
    } else if (this.ctype === 2) {
      this.addForm.custType = '非法人'
    }
    if (this.status === 10) {
      this.addForm.custState = '保存'
    } else if (this.status === 15) {
      this.addForm.custState = '实名中'
    } else if (this.status === 16) {
      this.addForm.custState = '实名认证待审核'
    } else if (this.status === 20) {
      this.addForm.custState = '实名认证通过'
    } else if (this.status === 25) {
      this.addForm.custState = '实名失败'
    } else if (this.status === 30) {
      this.addForm.custState = '待审批'
    } else if (this.status === 35) {
      this.addForm.custState = '审批不通过'
    } else if (this.status === 40) {
      this.status = '审批通过'
    }
    if (this.Idtype === 1) {
      this.addForm.certificateType = '身份证'
    } else if (this.Idtype === 3) {
      this.addForm.certificateType = '港澳通行证'
    } else if (this.Idtype === 4) {
      this.addForm.certificateType = '台胞通行证'
    } else if (this.Idtype === 5) {
      this.addForm.certificateType = '护照'
    }
    if (this.uscc === 1) {
      this.addForm.threeCertify = true
    } else if (this.uscc === 2) {
      this.addForm.threeCertify = false
    }
    if (this.rtype === 0) {
      this.addForm.regType = '自主注册'
    } else if (this.rtype === 1) {
      this.addForm.regType = '平台维护'
    }
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
              this.regAddressOpt2 = resp.body
            })
        }
      }
    },
    // 行业大分类
    getLink() {
      console.log(this.type)
      Link.delList(`type=${this.type}`)
        .then(resp => {
          if (resp.status === '200') {
            this.industryClassOpt1 = resp.body
          }
        })
    },
    // 行业子分类
    linkChild(pid) {
      for (const item in this.industryClassOpt1) {
        if (this.industryClassOpt1[item].id === pid) {
          this.id = this.industryClassOpt1[item].id
          LinkChild.delList(`pid=${this.id}`)
            .then(resp => {
              this.industryClassOpt2 = resp.body
            })
        }
      }
    },
    // 点击返回功能
    back(pathName) {
      this.$router.push({ name: pathName })
      this.$store.dispatch('app/setLeftSidebarRouters', {})
    },
    // 获取当前客户信息
    getLookList() {
      console.log(this.$route.query.compCode)
      Look.lookList(`compCode=${this.$route.query.compCode}`)
        .then(resp => {
          console.log(resp)
          if (resp.body.custCompDTO) {
            this.addForm.bizCode = resp.body.custCompDTO.bizCode
            this.ctype = resp.body.custCompDTO.custType
            this.status = resp.body.custCompDTO.compStatus
            this.addForm.custName = resp.body.custCompDTO.compName
            this.addForm.custAbbreviation = resp.body.custCompDTO.simpleName
            this.uscc = resp.body.custCompDTO.isUscc
            this.addForm.licenseNo = resp.body.custCompDTO.busLicenseCode
            this.addForm.organizationCode = resp.body.custCompDTO.orgCode
            this.addForm.taxRegNo = resp.body.custCompDTO.taxRegCerCode
            this.addForm.accOpenPermit = resp.body.custCompDTO.openingPermit
            this.addForm.creditCode = resp.body.custCompDTO.usccCode
            this.addForm.regAddress = resp.body.custCompDTO.regAddrProvinces
            this.addForm.regAddres = resp.body.custCompDTO.regAddrCitys
            this.addForm.regAddress1 = resp.body.custCompDTO.regAddrDesc
            this.addForm.custNumb = resp.body.custCompDTO.compCode
            this.addForm.parentOrgNo = resp.body.custCompDTO.parentCode
            this.addForm.legalName = resp.body.custCompDTO.legalName
            this.addForm.gender = resp.body.custCompDTO.legalGender
            this.Idtype = resp.body.custCompDTO.legalIdtype
            this.addForm.legalCertificateNo = resp.body.custCompDTO.legalIdnum
            this.addForm.legalPhone = resp.body.custCompDTO.legalMobile
            this.addForm.legalEmail = resp.body.custCompDTO.legalEmail
            this.addForm.fixedTel = resp.body.custCompDTO.legalTel
            this.addForm.regCapital = resp.body.custCompDTO.regCapital
            this.addForm.paidInCapital = resp.body.custCompDTO.paidupCapital
            this.addForm.establishTime = resp.body.custCompDTO.setupDate
            this.addForm.businessTerm = resp.body.custCompDTO.operPeriod
            this.addForm.enterpriseType = resp.body.custCompDTO.entpType
            this.addForm.enterpriseNature = resp.body.custCompDTO.entpNature
            this.addForm.industryClass = resp.body.custCompDTO.busTypeBig
            this.addForm.industryClass2 = resp.body.custCompDTO.busTypeMiddle
            this.addForm.industryClass3 = resp.body.custCompDTO.busTypeSmall
            this.addForm.totalAssets = resp.body.custCompDTO.assetTotal
            this.addForm.income = resp.body.custCompDTO.revenue
            this.addForm.telephone = resp.body.custCompDTO.compTel
            this.addForm.fax = resp.body.custCompDTO.compFax
            this.addForm.totalEmployees = resp.body.custCompDTO.employeeNum
            this.addForm.custClass = resp.body.custCompDTO.custLevel
            this.rtype = resp.body.custCompDTO.regType
            this.addForm.createTime = resp.body.custCompDTO.createdDate
            this.addForm.businessScope = resp.body.custCompDTO.busScope
            this.addForm.createBy = resp.body.custCompDTO.creater
            this.addForm.businessContact = resp.body.custCompDTO.contactName
            this.addForm.businessPhone = resp.body.custCompDTO.contactPhone
            this.addForm.ratScore = resp.body.custCompDTO.ratScore
            this.addForm.ratSuggest = resp.body.custCompDTO.ratSuggest
            this.addForm.expectation = resp.body.custCompDTO.ratOutLook
            this.addForm.expirationDate = resp.body.custCompDTO.ratInvalid
            this.addForm.ratingPerson = resp.body.custCompDTO.ratName
            this.addForm.ratingResults = resp.body.custCompDTO.ratResult
          } else {
            this.addForm.bizCode = resp.body.custCompLevDTO.bizCode
            this.ctype = resp.body.custCompLevDTO.custType
            this.status = resp.body.custCompLevDTO.compStatus
            this.addForm.custName = resp.body.custCompLevDTO.compName
            this.addForm.custAbbreviation = resp.body.custCompLevDTO.simpleName
            this.uscc = resp.body.custCompLevDTO.isUscc
            this.addForm.licenseNo = resp.body.custCompLevDTO.busLicenseCode
            this.addForm.organizationCode = resp.body.custCompLevDTO.orgCode
            this.addForm.taxRegNo = resp.body.custCompLevDTO.taxRegCerCode
            this.addForm.accOpenPermit = resp.body.custCompLevDTO.openingPermit
            this.addForm.creditCode = resp.body.custCompLevDTO.usccCode
            this.addForm.regAddress = resp.body.custCompLevDTO.regAddrProvinces
            this.addForm.regAddres = resp.body.custCompLevDTO.regAddrCitys
            this.addForm.regAddress1 = resp.body.custCompLevDTO.regAddrDesc
            this.addForm.custNumb = resp.body.custCompLevDTO.compCode
            this.addForm.parentOrgNo = resp.body.custCompLevDTO.parentCode
            this.addForm.legalName = resp.body.custCompLevDTO.legalName
            this.addForm.gender = resp.body.custCompLevDTO.legalGender
            this.Idtype = resp.body.custCompLevDTO.legalIdtype
            this.addForm.legalCertificateNo = resp.body.custCompLevDTO.legalIdnum
            this.addForm.legalPhone = resp.body.custCompLevDTO.legalMobile
            this.addForm.legalEmail = resp.body.custCompLevDTO.legalEmail
            this.addForm.fixedTel = resp.body.custCompLevDTO.legalTel
            this.addForm.regCapital = resp.body.custCompLevDTO.regCapital
            this.addForm.paidInCapital = resp.body.custCompLevDTO.paidupCapital
            this.addForm.establishTime = resp.body.custCompLevDTO.setupDate
            this.addForm.businessTerm = resp.body.custCompLevDTO.operPeriod
            this.addForm.enterpriseType = resp.body.custCompLevDTO.entpType
            this.addForm.enterpriseNature = resp.body.custCompLevDTO.entpNature
            this.addForm.industryClass = resp.body.custCompLevDTO.busTypeBig
            this.addForm.industryClass2 = resp.body.custCompLevDTO.busTypeMiddle
            this.addForm.industryClass3 = resp.body.custCompLevDTO.busTypeSmall
            this.addForm.totalAssets = resp.body.custCompLevDTO.assetTotal
            this.addForm.income = resp.body.custCompLevDTO.revenue
            this.addForm.telephone = resp.body.custCompLevDTO.compTel
            this.addForm.fax = resp.body.custCompLevDTO.compFax
            this.addForm.totalEmployees = resp.body.custCompLevDTO.employeeNum
            this.addForm.custClass = resp.body.custCompLevDTO.custLevel
            this.rtype = resp.body.custCompLevDTO.regType
            this.addForm.createTime = resp.body.custCompLevDTO.createdDate
            this.addForm.businessScope = resp.body.custCompLevDTO.busScope
            this.addForm.createBy = resp.body.custCompLevDTO.creater
            this.addForm.businessContact = resp.body.custCompLevDTO.contactName
            this.addForm.businessPhone = resp.body.custCompLevDTO.contactPhone
            this.addForm.ratScore = resp.body.custCompLevDTO.ratScore
            this.addForm.ratSuggest = resp.body.custCompLevDTO.ratSuggest
            this.addForm.expectation = resp.body.custCompLevDTO.ratOutLook
            this.addForm.expirationDate = resp.body.custCompLevDTO.ratInvalid
            this.addForm.ratingPerson = resp.body.custCompLevDTO.ratName
            this.addForm.ratingResults = resp.body.custCompLevDTO.ratResult
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 点击保存
    emit(pathName) {
      this.$refs.emitform.validate(valid => {
        if (valid) {
          console.log(this.addForm.custName)
          console.log(this.addForm.bizCode)
          console.log(this.addForm.custNumb)
          Emit.emitList({
            custCompVO: {
              compName: this.addForm.custName,
              bizCode: this.addForm.bizCode,
              yn: 1
            },
            custCompLevVO: {
              bizCode: this.addForm.bizCode,
              compCode: this.addForm.custNumb,
              yn: 1
            }
          }).then(resp => {
            console.log(resp)
            if (resp.status === '200') {
              this.$router.push({ name: pathName })
              this.$store.dispatch('app/setLeftSidebarRouters', {})
              alert('修改成功')
            }
          })
        } else {
          alert('请输入内容')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding: 0;
}
</style>
