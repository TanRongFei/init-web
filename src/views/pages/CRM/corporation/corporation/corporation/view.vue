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
                {{showDict(corporation.compStatus,'compStatus')}}
              </div>
            </div>
            <div class="numb">用户编号：{{ corporation.compCode }}</div>
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
                    {{showDict(corporation.custType,'corpTypes')}}
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="客户状态：">
                      {{showDict(corporation.compStatus,'compStatus')}}
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="10">
                    <el-form-item label="客户名称:">
                      {{ corporation.compName }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="企业简称:">
                      {{ corporation.simpleName }}
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="10">
                    <el-form-item label="是否三证合一：">
                      {{corporation.isUscc==1?'是':'否'}}
                    </el-form-item>
                  </el-col>
                  <el-col :span="11">
                    <el-form-item label="统一社会信用代码:" style="width: 400px">
                      {{ corporation.usccCode }}
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="10">
                    <el-form-item label="营业执照号码：">
                      {{ corporation.busLicenseCode }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="组织机构代码：">
                      {{ corporation.orgCode }}
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="税务登记证号：">
                      {{ corporation.taxRegCerCode }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="10" style="padding-left: 10px">
                    <el-form-item label="开户许可证：">
                      {{ corporation.openingPermit }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="20">
                    <el-form-item label="注册地址：">
                      <span>{{showEnum(corporation.regAddrProvince,'regAddrProvinces')}}</span>-
                      <span>{{showEnum(corporation.regAddrCity,'regAddrCitys')}}</span>-
                      <span>{{ corporation.regAddrDesc }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="客户编号：">
                      {{ corporation.compCode }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="上级组织：">
                      {{ corporation.parentCode }}
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
                      {{ corporation.legalName }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="性别：">
                    <span v-if="corporation.legalGender=='F'">女</span>
							<span v-if="corporation.legalGender=='M'">男</span>
							<span v-if="corporation.legalGender=='N'">未知</span>
                
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="10">
                    <el-form-item label="证件类型:">
                      {{showDict(corporation.legalIdtype,'idTypes')}}
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="法人证件号码：">
                      {{ corporation.legalIdnum }}
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="10">
                    <el-form-item label="法人手机号：">
                      {{ corporation.legalMobile }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="法人邮箱：">
                      {{ corporation.legalEmail }}
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="20">
                    <el-form-item label="固定电话：">
                      {{ corporation.legalTel }}
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
                      {{ corporation.regCapital }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="实收资本(万)：">
                      {{ corporation.paidupCapital }}
                    </el-form-item>
                  </el-col>

                </el-row>
                <el-row :gutter="20">
                  <el-col :span="10">
                    <el-form-item label="成立日期:">
                      {{ corporation.setupDate }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="营业期限：">
                      {{ corporation.operPeriod }}
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="10">
                    <el-form-item label="企业类型:">
                      {{showDict(corporation.entpType,'entpTypes')}}
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="企业性质：">
                      {{showDict(corporation.entpNature,'entpNatures')}}
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="20">
                    <el-form-item label="行业分类:">
                     <span>{{showEnum(corporation.busTypeBig,'busTypeBigs')}}</span>-
							<span>{{showEnum(corporation.busTypeMiddle,'busTypeMiddles')}}</span>-
							<span>{{showEnum(corporation.busTypeSmall,'busTypeSmalls')}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>

              </el-form>
            </div>
             <!-- 企业信用评级 -->
          <div class="mod-info-tit"><h4>企业信用评级</h4></div>
          <div class="mod-detail mt15">
            <el-form  label-width="120px" size="small">
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="评级及建议：">
                   {{corporationLevel.ratScore}} / {{corporationLevel.ratSuggest}}
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="展望：">
                   {{showDict(corporationLevel.ratOutLook,'ratOutLooks')}}
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="评级失效日：">
                    {{corporationLevel.ratInvalid}}
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="评级人员：" >
                    {{corporationLevel.ratCode}}
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="评级结果：">
                    {{showDict(corporationLevel.ratResult,'ratResults')}}
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
  </div>

</template>

<script>
import Corporation from '@/api/crm/corporation/corporation/corporation';
import Common from '@/api/crm/corporation/common/common';
export default {
  name: 'Detail',
  data() {
    return {
      corporation:{},
      corporationLevel:{},
      dict:{busTypeBigs:[],busTypeMiddles:[],busTypeSmalls:[],regAddrProvinces:[],regAddrCitys:[]},
      activeName:{},
      tabType:0,
      currentName:{}
    }
  },
  created() {
    
  },
  mounted() {
      Corporation.listDict().then((resp) =>{
        this.dict = resp.body
          
    })
    Common.getRegAddrProvinces().then((resp) =>{
        this.dict.regAddrProvinces = resp.body
          
    })
    Common.getBusTypeBigs().then((resp) =>{
        this.dict.busTypeBigs = resp.body
    })
    let compCode =this.$route.query.compCode; 
    if (compCode!=undefined && compCode!="") {
        this.infoView()
    }
  },
  methods: {
      showEnum (code,enumStr){
        let list
                if(this.dict!=null)
                   list = this.dict[enumStr];
                if(list!=null)
                    for(let i=0;i<list.length;i++){
                        if(list[i].id == code){
                            return list[i].name;
                        }
                    }
            },
   infoView(){
    
       let compCode =this.$route.query.compCode; 
      Corporation.compView(compCode).then((resp) =>{
        this.corporation = resp.body.custCompDTO;
        this.corporation.custType=String(resp.body.custCompDTO.custType)
        this.corporation.legalIdtype=String(resp.body.custCompDTO.legalIdtype)
        this.corporation.compStatus=String(resp.body.custCompDTO.compStatus)
        this.corporation.regType=String(resp.body.custCompDTO.regType)
        Common.getRegAddrCitys(this.corporation.regAddrProvince).then((resp) =>{
                this.dict.regAddrCitys = resp.body
            })
            Common.getBusTypeSmalls(this.corporation.busTypeBig).then((resp) =>{
                this.dict.busTypeMiddles = resp.body
            })
            Common.getBusTypeSmalls(this.corporation.busTypeMiddle).then((resp) =>{
                this.dict.busTypeSmalls = resp.body
            })
          if(resp.body.custCompLevDTO!=undefined){
              this.corporationLevel = resp.body.custCompLevDTO;
               this.corporationLevel.ratOutLook=String(resp.body.custCompLevDTO.ratOutLook)
            this.corporationLevel.ratResult=String(resp.body.custCompLevDTO.ratResult)
          }
        })

    },
    showDict :function(code,enumStr){
            let list
           if (this.dict != null){
              list = this.dict[enumStr];
           }
                 
            if (list != null)
                for (let i = 0; i < list.length; i++) {
                    if (list[i].code == code) {
                        return list[i].mark;
                    }
                }
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
