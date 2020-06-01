<template>
 <div id="app">
        <div>
       <div class="maincont">
      <div class="m-head clearfix">
        <div class="m-head-tit fl">
          <h4>{{billTitle}}</h4>
        </div>
        <div class="m-head-btn fr">
          <el-button type="primary" size="small" @click="save()">保存</el-button>
          <el-button size="small">返回</el-button>
        </div>
      </div>
      <!-- 编辑 -->
      <div class="m-table-detail">
        <!-- 基本信息 -->
        <div class="mod-add-form mt15">
          <el-form :model="corporation" :rules="addRules" label-width="140px" size="small">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="客户类型：" prop="custType">
                  <el-select v-model="corporation.custType" placeholder="请选择" size="small" style="width:100%">
                  <el-option v-for="item in dict.corpTypes" :key="item.code" :label="item.mark" :value="item.code"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="客户状态：" prop="compStatus">
                  <el-select v-model="corporation.compStatus" placeholder="" size="small" style="width:100%" disabled>
                    <el-option v-for="item in dict.compStatus" :key="item.code" :label="item.mark" :value="item.code"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8"></el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="客户名称：" prop="compName">
                  <el-input v-model="corporation.compName" placeholder=""></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="企业简称：" prop="simpleName">
                  <el-input v-model="corporation.simpleName" placeholder=""></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="三证合一：" prop="threeCertify">
                  <el-switch v-model="corporation.isUscc" :active-value="1" :inactive-value="0"></el-switch>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="营业执照号码：" prop="busLicenseCode">
                  <el-input v-model="corporation.busLicenseCode" placeholder=""></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="组织机构代码：" prop="orgCode">
                  <el-input v-model="corporation.orgCode" placeholder=""></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="税务登记证号：" prop="taxRegCerCode">
                  <el-input v-model="corporation.taxRegCerCode" placeholder=""></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="开户许可证：" prop="openingPermit">
                  <el-input v-model="corporation.openingPermit" placeholder=""></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="机构信用代码证：" prop="usccCode">
                  <el-input v-model="corporation.usccCode" placeholder=""></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8"></el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item label="注册地址：" prop="regAddrCity">
                  <el-select v-model="prov" placeholder="请选择" @change="getRegAddrCitys()" style="width:25%">
                    <el-option v-for="item in reg.regAddrProvinces" :key="item.id" :label="item.name" :value="item.id"></el-option>
                  </el-select>
                  <el-select v-model="city" placeholder="请选择" @change="getCity()" style="width:25%">
                    <el-option v-for="item in reg.regAddrCitys" :key="item.id" :label="item.name" :value="item.id"></el-option>
                  </el-select>
                  <el-input v-model="corporation.regAddrDesc" placeholder="" style="width:48%"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="客户编号：" prop="compCode">
                  <el-input v-model="corporation.compCode" placeholder="编号自动生成" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="上级组织：" prop="parentCode">
                <el-select v-model="corporation.parentCode" placeholder="请选择" style="width:80%">
                    <el-option v-for="item in legalCorporationList" :key="item.compCode" :label="item.compName" :value="item.compCode"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8"></el-col>
            </el-row>
          </el-form>
        </div>
        <!-- 法人信息 -->
        <div class="mod-info-tit"><h4>法人信息</h4></div>
        <div class="mod-add-form mt15">
          <el-form :model="corporation" :rules="addRules" label-width="140px" size="small">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="法人姓名：" prop="legalName">
                  <el-input v-model="corporation.legalName" placeholder=""></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="性别：" prop="legalGender">
                  <el-radio-group v-model="corporation.legalGender">
                    <el-radio label="M">男</el-radio>
                    <el-radio label="F">女</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="证件类型：" prop="legalIdtype">
                  <el-select v-model="corporation.legalIdtype" placeholder="请选择" size="small" style="width:100%">
                    <el-option v-for="item in dict.idTypes" :key="item.code" :label="item.mark" :value="item.code"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="法人证件号：" prop="legalIdnum">
                  <el-input v-model="corporation.legalIdnum" placeholder=""></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="法人手机号：" prop="legalMobile">
                  <el-input v-model="corporation.legalMobile" placeholder=""></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="法人邮箱：" prop="legalEmail">
                  <el-input v-model="corporation.legalEmail" placeholder=""></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="固定电话：" prop="legalTel">
                  <el-input v-model="corporation.legalTel" placeholder=""></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8"></el-col>
              <el-col :span="8"></el-col>
            </el-row>
          </el-form>
        </div>
        <!-- 其他信息 -->
        <div class="mod-info-tit"><h4>其他信息</h4></div>
        <div class="mod-add-form mt15">
          <el-form :model="corporation" :rules="addRules" label-width="140px" size="small">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="注册资本：" prop="regCapital">
                  <el-input v-model="corporation.regCapital" placeholder=""></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="实收资本：" prop="paidupCapital">
                  <el-input v-model="corporation.paidupCapital" placeholder=""></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="成立时间：" prop="setupDate">
                  <el-date-picker type="date" placeholder="" v-model="corporation.setupDate" style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="营业期限：" prop="operPeriod">
                  <el-date-picker type="date" placeholder="" v-model="corporation.operPeriod" style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="企业类型：" prop="entpType">
                  <el-select v-model="corporation.entpType" placeholder="请选择" style="width:100%">
                    <el-option v-for="item in dict.entpTypes" :key="item.code" :label="item.mark" :value="item.code"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="企业性质：" prop="entpNature">
                  <el-select v-model="corporation.entpNature" placeholder="请选择" style="width:100%">
                    <el-option v-for="item in dict.entpNatures" :key="item.code" :label="item.mark" :value="item.code"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row> 
              <el-col>
                <el-form-item label="行业分类：" prop="industryClass">
                  <el-select v-model="big" placeholder="请选择" @change="getBusTypeMiddles" style="width:30%">
                    <el-option v-for="item in bus.busTypeBigs" :key="item.id" :label="item.name" :value="item.id"></el-option>
                  </el-select>
                  <el-select v-model="middle" placeholder="请选择" @change="getBusTypeSmalls" style="width:30%">
                    <el-option v-for="item in bus.busTypeMiddles" :key="item.id" :label="item.name" :value="item.id"></el-option>
                  </el-select>
                  <el-select v-model="small" placeholder="请选择" @change="getSmall" style="width:38%">
                    <el-option v-for="item in bus.busTypeSmalls" :key="item.id" :label="item.name" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="资产总额：" prop="assetTotal">
                  <el-input v-model="corporation.assetTotal" placeholder=""></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="当年营业收入：" prop="revenue">
                  <el-input v-model="corporation.revenue" placeholder=""></el-input>
                </el-form-item>
              </el-col>
            
              <el-col :span="8">
                <el-form-item label="办公电话：" prop="compTel">
                  <el-input v-model="corporation.compTel" placeholder=""></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="传真：" prop="compFax">
                  <el-input v-model="corporation.compFax" placeholder=""></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="员工总数：" prop="employeeNum">
                  <el-input type="number" v-model="corporation.employeeNum" placeholder=""></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="客户分类：" prop="custLevel">
                  <el-select v-model="corporation.custLevel" placeholder="请选择" style="width:100%">
                    <el-option v-for="item in dict.custLevels" :key="item.code" :label="item.mark" :value="item.code"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="注册类型：" prop="regType">
                  <el-select v-model="corporation.regType" placeholder="请选择" style="width:100%">
                    <el-option v-for="item in dict.isRegs" :key="item.code" :label="item.mark" :value="item.code"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="创建时间：" prop="createdDate">
                  <el-date-picker type="date" placeholder="" v-model="corporation.createdTime" style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="经营范围：" prop="busScope">
                  <el-input v-model="corporation.busScope" placeholder=""></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="创建人：" prop="createdName">
                  <el-input v-model="corporation.createdName" placeholder=""></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="业务联系人：" prop="contactName">
                  <el-input v-model="corporation.contactName" placeholder=""></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="联系电话：" prop="contactPhone">
                  <el-input v-model="corporation.contactPhone" placeholder=""></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <!-- 企业信用评级 -->
        <div class="mod-info-tit"><h4>企业信用评级</h4></div>
        <div class="mod-add-form mt15">
          <el-form :model="corporationLevel" :rules="addRules" label-width="140px" size="small">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="评级及建议：" prop="grade">
                  <el-input v-model="corporationLevel.ratScore" style="width: 100px" placeholder=""></el-input> /
                  <el-input v-model="corporationLevel.ratSuggest" style="width: 100px" placeholder=""></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="展望：" prop="expectation">
                  <el-select v-model="corporationLevel.ratOutLook" placeholder="请选择" size="small" style="width:100%">
                    <el-option v-for="item in dict.ratOutLooks" :key="item.code" :label="item.mark" :value="item.code"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="评级失效日：" prop="ratInvalid">
                  <el-date-picker type="date" placeholder="请选择" v-model="corporationLevel.ratInvalid" style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="评级人员：" prop="ratCode">
                  <el-input v-model="corporationLevel.ratCode" placeholder=""></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="评级结果：" prop="ratingResults">
                  <el-select v-model="corporationLevel.ratResult" placeholder="请选择" size="small" style="width:100%">
                    <el-option v-for="item in dict.ratResults" :key="item.code" :label="item.mark" :value="item.code"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8"></el-col>
            </el-row>
         </el-form>
        </div>
      </div>
        
    </div>
    </div>
   </div>
</template>

<script>
import HeadTitle from '@/views/pages/components/head-title';
import Corporation from '@/api/crm/corporation/corporation/corporation';
import Common from '@/api/crm/corporation/common/common';
export default {
  name: 'CorpotationPageList',
  components: {
  },
  data() {
    return {
      multipleSelection: [],
      tableData: [],
      corporation:{},
      corporationLevel:{},
      addRules:{},
      reg:{regAddrProvinces:[],regAddrCitys:[]},
      bus:{busTypeBigs:[],busTypeMiddles:[],busTypeSmalls:[]},
      dict:{},
      billTitle:{},
      prov:null,
      city:null,
      big:null,
      middle:null,
      small:null,
      legalCorporationList:[],
      addRules:{
            custType:[
                { required: true, message: '请选择客户类型!', trigger:'change'},
            ],
            compName:[
                { required: true, message: '请输入客户名称!', trigger:'blur'},
            ]
           
        },
    }
  },
  created() {

    console.log(this.$route.query.compCode)
    // this.$router.push({ path: 'bill', query: this.$route.query })
  },
   mounted() {
  
    Corporation.listDict().then((resp) =>{
        this.dict = resp.body
          
    })
    Common.getRegAddrProvinces().then((resp) =>{
        this.reg.regAddrProvinces = resp.body
          
    })
    Common.getBusTypeBigs().then((resp) =>{
        this.bus.busTypeBigs = resp.body
    })
          
    this.initComp()
    this.findSupComps()
    },
     beforeMount: function () {
        this.getRegAddrCitys();
        this.getBusTypeMiddles();
        this.getBusTypeSmalls();
      
    },
    watch: {
        prov: function () {
            this.getRegAddrCitys();
        },
        big: function () {
            this.getBusTypeMiddles();
        },
        middle: function (){
            this.getBusTypeSmalls();
        },
        
    },
  methods: {
    findSupComps () {
    Corporation.compView(this.corporation.compName).then((resp) =>{
      this.legalCorporationList=resp.body
    })
    },
    initComp() {
      const compCode = this.$route.query.compCode
        if (compCode != null) {
            this.infoView()
            this.billTitle = "修改企业用户"

        }else{
            this.billTitle = "新增企业用户"
            Vue.set(self.corporation,'isUscc',1)
        }
    },

    getRegAddrCitys (){
      this.corporation.regAddrProvince=this.prov
      if (this.corporation.regAddrProvince!=undefined && this.corporation.regAddrProvince!=null) {
          Common.getRegAddrCitys(this.corporation.regAddrProvince).then((resp) =>{
                this.reg.regAddrCitys = resp.body
            })
      }    
        },
        getCity(){
          this.corporation.regAddrCity=this.city
        },
    getBusTypeMiddles(){
      this.corporation.busTypeBig=this.big
      if (this.corporation.busTypeBig!=undefined && this.corporation.busTypeBig!=null) {
        Common.getBusTypeSmalls(this.corporation.busTypeBig).then((resp) =>{
                this.bus.busTypeMiddles = resp.body
            })
      }
            
        },
  
    getBusTypeSmalls(){
      this.corporation.busTypeMiddle=this.middle
       if (this.corporation.busTypeMiddle!=undefined && this.corporation.busTypeMiddle!=null) {
        Common.getBusTypeSmalls(this.corporation.busTypeMiddle).then((resp) =>{
                this.bus.busTypeSmalls = resp.body
            })
       }
            
        },
        getSmall () {
            this.corporation.busTypeSmall=this.small
        },
    infoView(){
    
       let compCode =this.$route.query.compCode; 
      Corporation.compView(compCode).then((resp) =>{
        this.corporation = resp.body.custCompDTO;
        this.corporation.custType=String(resp.body.custCompDTO.custType)
        this.corporation.legalIdtype=String(resp.body.custCompDTO.legalIdtype)
        this.corporation.compStatus=String(resp.body.custCompDTO.compStatus)
        this.corporation.regType=String(resp.body.custCompDTO.regType)
        this.prov=resp.body.custCompDTO.regAddrProvince
        this.city=resp.body.custCompDTO.regAddrCity
        this.big=resp.body.custCompDTO.busTypeBig
        this.middle=resp.body.custCompDTO.busTypeMiddle
        this.small=resp.body.custCompDTO.busTypeSmall
          if(resp.body.custCompLevDTO!=undefined){
         
            this.corporationLevel = resp.body.custCompLevDTO;
            this.corporationLevel.ratOutLook=String(resp.body.custCompLevDTO.ratOutLook)
            this.corporationLevel.ratResult=String(resp.body.custCompLevDTO.ratResult)
          }
        })

    },
    save(){
       let compCode =this.$route.query.compCode; 
      const compLevVO={custCompVO:this.corporation,custCompLevVO:this.corporationLevel}
       if (compCode != null && compCode != '') {
            Corporation.compUpdate(compLevVO).then((resp) =>{
                this.$message("修改成功！")
            })
        }else{
         Corporation.compAdd(compLevVO).then((resp) =>{
                this.$message("添加成功！")
            })
        }
      
    },
    handleSizeChange(val) {

    },
    handleCurrentChange(val) {

    }
  }
}
</script>
