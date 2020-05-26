<template>
  <div>
    <!-- 右侧 start -->
    <div>
      <div class="m-head clearfix">
        <div class="m-head-tit fl">
          <h4>账户信息</h4>
        </div>
        <div class="m-head-btn fr">
          <el-button type="primary" size="small">保存</el-button>
          <el-button size="small" @click="back('CorporationList')">返回</el-button>
        </div>
      </div>
      <!-- 编辑 -->
      <div class="m-table-detail">
        <!-- 添加 -->
        <div class="mod-info-tit clearfix">
          <h4>账户信息</h4>
          <div class="add-edit-btn">
            <ul>
              <li><a><span class="icon_add_blue" title="添加" /></a></li>
              <li><a><span class="icon_edit_blue" title="编辑" /></a></li>
              <li><a><span class="icon_del_blue" title="删除" /></a></li>
            </ul>
          </div>
        </div>
        <!--  -->
        <div class="table-list mt15">
          <el-form :rules="accrules">
            <el-table
              :data="accData"
              border
              stripe
              style="width: 100%"
              @current-change="handleCurrentChange"
            >
              <el-table-column
                fixed
                prop="status"
                label="状态"
                width="100"
              >
                <template slot-scope="scope">
                  <el-form-item :prop="'accData.' + scope.$index + '.status'" :rules="accrules.state" size="small">
                    <el-select v-model="scope.row.status" size="small" style="width:100%">
                      <el-option v-for="item in enableStatus" :key="item.code" :label="item.label" :value="item.code" />
                    </el-select>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column
                prop="compRole"
                label="企业角色"
                width="140"
              >
                <template slot-scope="scope">
                  <el-form-item :prop="'accData.' + scope.$index + '.compRole'" :rules="accrules.custRole" size="small">
                    <el-select v-model="scope.row.compRole" placeholder="请选择" size="small" style="width:100%">
                      <el-option v-for="item in compRoles" :key="item.code" :label="item.mark" :value="item.code" />
                    </el-select>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column
                prop="issuerName"
                label="开户行类型"
                width="120"
              >
                <template slot-scope="scope">
                  <el-form-item :prop="'accData.' + scope.$index + '.issuerName'" :rules="accrules.bankType" size="small">
                    <el-select v-model="scope.row.issuerName" placeholder="请选择" size="small" style="width:100%">
                      <el-option v-for="item in subBranchOpt" :key="item.code" :label="item.flag" :value="item.code" />
                    </el-select>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column
                prop="bankPrivName"
                label="银行所在省"
                width="120"
              >
                <template slot-scope="scope">
                  <el-form-item :prop="'accData.' + scope.$index + '.bankPrivName'" :rules="accrules.bankProvince" size="small">
                    <el-select v-model="scope.row.bankPrivName" placeholder="请选择" size="small" style="width:100%">
                      <el-option v-for="item in bankProvinceOpt" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column
                prop="bankCityName"
                label="银行所在市"
                width="120"
              >
                <template slot-scope="scope">
                  <el-form-item :prop="'accData.' + scope.$index + '.bankCityName'" :rules="accrules.bankCity" size="small">
                    <el-select v-model="scope.row.bankCityName" placeholder="请选择" size="small" style="width:100%">
                      <el-option v-for="item in bankCityOpt" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column
                prop="bankName"
                label="支行"
                width="150"
              >
                <template slot-scope="scope">
                  <el-form-item :prop="'accData.' + scope.$index + '.bankName'" :rules="accrules.subBranch" size="small">
                    <el-select v-model="scope.row.bankName" placeholder="请选择" size="small" style="width:100%">
                      <el-option v-for="item in bankTypes" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column
                prop="bankNo"
                label="大小额联行号"
                width="120"
              >
                <template slot-scope="scope">
                  <el-form-item :prop="'accData.' + scope.$index + '.bankNo'" :rules="accrules.jointBankNo" size="small">
                    <el-input v-model="scope.row.bankNo" />
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column
                prop="cardProps"
                label="账户性质"
                width="120"
              >
                <template slot-scope="scope">
                  <el-form-item :prop="'accData.' + scope.$index + '.cardProps'" :rules="accrules.accNature" size="small">
                    <el-select v-model="scope.row.cardProps" placeholder="请选择" size="small" style="width:100%">
                      <el-option v-for="item in accNatureOpt" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column
                prop="acctName"
                label="账户名称"
                width="150"
              >
                <template slot-scope="scope">
                  <el-form-item :prop="'accData.' + scope.$index + '.acctName'" :rules="accrules.accName" size="small">
                    <el-input v-model="scope.row.accName" />
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column
                prop="acctNo"
                label="账号"
                min-width="130"
              >
                <template slot-scope="scope">
                  <el-form-item :prop="'accData.' + scope.$index + '.acctNo'" :rules="accrules.state" size="small">
                    <el-input v-model="scope.row.acctNo" />
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column
                prop="modifiedTime"
                label="开立时间"
                width="150"
              >
                <template slot-scope="scope">
                  <el-form-item :prop="'accData.' + scope.$index + '.modifiedTime'" :rules="accrules.openDate" size="small">
                    <el-date-picker v-model="scope.row.modifiedTime" type="date" style="width: 100%;" />
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column
                prop="defaultAcc"
                label="默认账户"
                width="100"
              >
                <template slot-scope="scope">
                  <el-form-item :prop="'accData.' + scope.$index + '.defaultAcc'" :rules="accrules.defaultAcc" size="small">
                    <el-select v-model="scope.row.defaultAcc" placeholder="请选择" size="small" style="width:100%">
                      <el-option v-for="item in defaultAccOpt" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column
                prop="currency"
                label="币种"
                width="120"
              >
                <template slot-scope="scope">
                  <el-form-item :prop="'accData.' + scope.$index + '.currency'" :rules="accrules.currency" size="small">
                    <el-select v-model="scope.row.currency" placeholder="请选择" size="small" style="width:100%">
                      <el-option v-for="item in currencyOpt" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </el-form-item>
                </template>
              </el-table-column>
            </el-table>
          </el-form>
        </div>
      </div>

    </div>
    <!-- 右侧 end -->
  </div>
</template>

<script>
import Accout from '@/api/CRM/customer_account'
export default {
  name: 'CustomerAccount',
  data() {
    return {
      accData: [],
      enableStatus: [
        { code: 1, label: '启用' },
        { code: 0, label: '禁用' }
      ],
      compRoles: [
        {
          code: 'C101',
          mark: '核心企业'
        },
        {
          code: 'C102',
          mark: '供应商'
        },
        {
          code: 'C103',
          mark: '保理公司'
        },
        {
          code: 'C104',
          mark: '资金方'
        },
        {
          code: 'C201',
          mark: '买方'
        },
        {
          code: 'C202',
          mark: '卖方'
        },
        {
          code: 'C203',
          mark: '担保方'
        },
        {
          code: 'C204',
          mark: '抵押方'
        },
        {
          code: 'C205',
          mark: '质押方'
        },
        {
          code: 'C206',
          mark: '经销商'
        }
      ],
      bankTypes: [
        {
          code: '102',
          flag: '中国工商银行',
          icon: 'icon-icbc'
        },
        {
          code: '103',
          flag: '中国农业银行',
          icon: 'icon-abc'
        },
        {
          code: '104',
          flag: '中国银行',
          icon: 'icon-boc'
        },
        {
          code: '105',
          flag: '中国建设银行',
          icon: 'icon-ccb'
        },
        {
          code: '201',
          flag: '国家开发银行',
          icon: 'icon-bank'
        },
        {
          code: '202',
          flag: '中国进出口银行',
          icon: 'icon-bank'
        },
        {
          code: '203',
          flag: '中国农业发展银行',
          icon: 'icon-bank'
        },
        {
          code: '301',
          flag: '交通银行',
          icon: 'icon-bcm'
        },
        {
          code: '302',
          flag: '中信银行',
          icon: 'icon-cmcb'
        },
        {
          code: '303',
          flag: '光大银行',
          icon: 'icon-bank'
        },
        {
          code: '304',
          flag: '华夏银行',
          icon: 'icon-bank'
        },
        {
          code: '305',
          flag: '民生银行',
          icon: 'icon-cmbc'
        },
        {
          code: '306',
          flag: '广发银行',
          icon: 'icon-bank'
        },
        {
          code: '307',
          flag: '平安银行',
          icon: 'icon-bank'
        },
        {
          code: '308',
          flag: '招商银行',
          icon: 'icon-cmb'
        },
        {
          code: '309',
          flag: '兴业银行',
          icon: 'icon-bank'
        },
        {
          code: '310',
          flag: '浦发银行',
          icon: 'icon-bank'
        },
        {
          code: '313',
          flag: '城市商业银行',
          icon: 'icon-bank'
        },
        {
          code: '314',
          flag: '农村商业银行',
          icon: 'icon-bank'
        },
        {
          code: '315',
          flag: '恒丰银行',
          icon: 'icon-bank'
        },
        {
          code: '316',
          flag: '浙商银行',
          icon: 'icon-bank'
        },
        {
          code: '317',
          flag: '天津农商银行',
          icon: 'icon-bank'
        },
        {
          code: '318',
          flag: '渤海银行',
          icon: 'icon-bank'
        },
        {
          code: '319',
          flag: '徽商银行',
          icon: 'icon-bank'
        },
        {
          code: '320',
          flag: '其他银行',
          icon: 'icon-bank'
        },
        {
          code: '321',
          flag: '三峡银行',
          icon: 'icon-bank'
        },
        {
          code: '322',
          flag: '上海农商银行',
          icon: 'icon-bank'
        },
        {
          code: '323',
          flag: '微众银行',
          icon: 'icon-bank'
        },
        {
          code: '325',
          flag: '上海银行',
          icon: 'icon-bank'
        },
        {
          code: '401',
          flag: '城市信用社',
          icon: 'icon-bank'
        },
        {
          code: '402',
          flag: '农村信用社',
          icon: 'icon-bank'
        },
        {
          code: '403',
          flag: '邮政储蓄银行',
          icon: 'icon-psbc'
        },
        {
          code: '501',
          flag: '汇丰银行',
          icon: 'icon-bank'
        },
        {
          code: '502',
          flag: '东亚银行',
          icon: 'icon-bank'
        },
        {
          code: '503',
          flag: '南洋银行',
          icon: 'icon-bank'
        },
        {
          code: '504',
          flag: '恒生银行',
          icon: 'icon-bank'
        },
        {
          code: '593',
          flag: '友利银行',
          icon: 'icon-bank'
        },
        {
          code: '595',
          flag: '新韩银行',
          icon: 'icon-bank'
        },
        {
          code: '596',
          flag: '企业银行',
          icon: 'icon-bank'
        },
        {
          code: '597',
          flag: '韩亚银行',
          icon: 'icon-bank'
        },
        {
          code: '781',
          flag: '厦门国际银行',
          icon: 'icon-bank'
        },
        {
          code: '782',
          flag: '巴黎银行',
          icon: 'icon-bank'
        },
        {
          code: '785',
          flag: '华商银行',
          icon: 'icon-bank'
        },
        {
          code: '787',
          flag: '富邦华一银行',
          icon: 'icon-bank'
        },
        {
          code: '907',
          flag: '财务公司',
          icon: 'icon-bank'
        }
      ],
      bankProvinceOpt: [],
      bankCityOpt: [],
      subBranchOpt: [],
      accNatureOpt: [
        { value: 10, label: '一般户' },
        { value: 20, label: '结算账户' },
        { value: 30, label: '付款账户' },
        { value: 40, label: '放款账户' },
        { value: 50, label: '鉴权账户' },
        { value: 60, label: '普通专户（兴业银行）' }
      ],
      defaultAccOpt: [
        { value: 1, label: '是' },
        { value: 0, label: '否' }
      ],
      currencyOpt: [
        { value: 1, label: '人民币' },
        { value: 0, label: '美元' }
      ],
      accrules: {
        state: [{}],
        custRole: [{}],
        bankType: [{}],
        bankProvince: [{}],
        bankCity: [{}],
        subBranch: [{}],
        jointBankNo: [{}],
        accNature: [{}],
        accName: [{}],
        accNumb: [{}],
        openDate: [{}],
        defaultAcc: [{}],
        currency: [{}]
      }
    }
  },
  created() {
    this.lookAcc()
  },
  methods: {
    // 查看账户信息
    lookAcc() {
      Accout.delList(`compCode=${this.$route.query.compCode}`)
        .then(resp => {
          if (resp.status === '200') {
            this.accData = resp.body
            console.log(this.accData)
          } else {
            console.log('获取失败')
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 点击返回功能
    back(pathName) {
      this.$router.push({ name: pathName })
      this.$store.dispatch('app/setLeftSidebarRouters', {})
    },
    handleCurrentChange: function(val) {
      this.currentRow = val
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
