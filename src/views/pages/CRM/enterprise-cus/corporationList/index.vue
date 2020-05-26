<template>
  <div class="cont">
    <div class="m-head clearfix">
      <div class="m-head-tit fl">
        <h4>我的客户</h4>
        <span class="txt">共{{ total }}个</span>
      </div>
      <div class="t-edit-btn fr">
        <ul class="clearfix">
          <li>
            <a href="#" @click.prevent="handleDetail('Factoring')">
              <span class="icon_add_blue" title="添加" />
            </a>
          </li>
          <li>
            <a href="#" @click.prevent="detail('Detail')">
              <span class="icon_check_blue" title="查看" />
            </a>
          </li>
          <li>
            <a href="#" @click.prevent="emitList('Emit')">
              <span class="icon_edit_blue" title="编辑" />
            </a>
          </li>
          <li>
            <a href="#" @click.prevent="del">
              <span class="icon_del_blue" title="删除" />
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div class="m-select-con">
      <div class="m-select-head clearfix">
        <h1>条件筛选</h1>
        <div class="m-head-search">
          <el-input v-model="hsearch" type="text" placeholder="搜索客户、客户编号" />
          <el-button type="submit" @click="search()">搜索</el-button>
          <div class="btn-cx" @click="isAdvanSearch = !isAdvanSearch">
            高级搜索
            <i class="el-icon-arrow-down el-icon--right" />
          </div>
        </div>
      </div>
      <div v-show="isAdvanSearch" class="m-select-bd p15">
        <el-form
          :rules="advSearchRules"
          label-width="120px"
          size="small"
          :model="advSearchForm"
        >
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="创建时间：" prop="createDate">
                <el-date-picker
                  v-model="timetotime"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  size="small"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="企业名称：" prop="custName">
                <el-input
                  v-model="custName"
                  style="width: 250px;"
                  placeholder="请输入"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="客户类型：" prop="custType">
                <el-radio-group v-model="advSearchForm.custType" :max="1">
                  <el-radio label="1">法人</el-radio>
                  <el-radio label="2">非法人</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="客户状态：" prop="custState">
                <el-radio-group v-model="advSearchForm.compStatus" :max="1">
                  <el-radio label="10">保存</el-radio>
                  <el-radio label="15">实名中</el-radio>
                  <el-radio label="16">实名认证待审核</el-radio>
                  <el-radio label="20">实名认证通过</el-radio>
                  <el-radio label="25">实名失败</el-radio>
                  <el-radio label="30">待审批</el-radio>
                  <el-radio label="35">审批不通过</el-radio>
                  <el-radio label="40">审批通过</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="企业角色：" prop="custRole">
                <el-radio-group v-model="advSearchForm.compRole" :max="1">
                  <el-radio label="1">核心企业</el-radio>
                  <el-radio label="2">成员单位</el-radio>
                  <el-radio label="3">供应商</el-radio>
                  <el-radio label="4">增信机构</el-radio>
                  <el-radio label="5">资金方</el-radio>
                  <el-radio label="6">机构投资人</el-radio>
                  <el-radio label="7">第三方服务机构</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="资料收集：" prop="custFile">
                <el-radio-group v-model="advSearchForm.isCollect" :max="1">
                  <el-radio label="1">已收集</el-radio>
                  <el-radio label="2">未收集</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item>
                <el-button type="primary" size="small" @click="sousuo()">搜索</el-button>
                <el-button size="small" @click="reset">重置</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <!-- 列表 -->
    <div class="mt15">
      <div class="table-list-head clearfix">
        <div class="mn-select-box fl">
          <el-select v-model="sort" placeholder="请选择" size="small" style="width:180px">
            <el-option
              v-for="item in sortOpt"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="mn-select-box fr">
          <span>
            每页显示数量：
            <el-select
              v-model="advSearchForm.pageSize"
              placeholder="10"
              size="small"
              style="width:70px"
              @change="handleSizeChange"
            >
              <el-option
                v-for="item in pagesizeOpt"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              />
            </el-select>
          </span>
        </div>
      </div>
      <div class="table-list">
        <el-table
          :data="tableData"
          highlight-current-row
          border
          stripe
          style="width: 100%;"
          @current-change="handleSelectionChange"
        >
          <el-table-column width="40%">
            <template slot-scope="scope">
              <el-checkbox v-model="scope.row.checked" />
            </template>
            <!-- <input type="checkbox" :checked="checked" @click="see"> -->
          </el-table-column>
          <el-table-column prop="status" label="启用状态 " width="80%">
            <template slot-scope="stData">
              <el-tag v-if="stData.row.status=== 1">启用</el-tag>
              <el-tag v-else-if="stData.row.status=== 0">禁用</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="compStatus" label="客户状态" width="80%">
            <template slot-scope="stData">
              <el-tag v-if="stData.row.compStatus===10">保存</el-tag>
              <el-tag v-else-if="stData.row.compStatus===15">实名中</el-tag>
              <el-tag v-else-if="stData.row.compStatus===16">实名认证待审核</el-tag>
              <el-tag v-else-if="stData.row.compStatus===20">实名认证通过</el-tag>
              <el-tag v-else-if="stData.row.compStatus===25">实名失败</el-tag>
              <el-tag v-else-if="stData.row.compStatus===30">待审批</el-tag>
              <el-tag v-else-if="stData.row.compStatus===35">审批不通过</el-tag>
              <el-tag v-else-if="stData.row.compStatus===40">审批通过</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="isCollect" label="资料收集" width="80%">
            <template slot-scope="stData">
              <el-tag v-if="stData.row.isCollect===1">已收集</el-tag>
              <el-tag v-else-if="stData.row.isCollect===2">未收集</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="isRegs" label="注册方式" width="80%">
            <template slot-scope="stData">
              <el-tag v-if="stData.row.isRegs===1">平台注册</el-tag>
              <el-tag v-else-if="stData.row.isRegs===2">自主维护</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="compCode" label="客户编号" width="150%" />
          <el-table-column prop="compName" label="企业名称" width="160%" />
          <el-table-column prop="usccCode" label="组织机构代码" width="180%" />
          <el-table-column prop="compRole" label="角色" width=" 150%">
            <template slot-scope="stData">
              <el-tag v-if="stData.row.compRole===1">核心企业</el-tag>
              <el-tag v-else-if="stData.row.compRole===2">成员单位</el-tag>
              <el-tag v-else-if="stData.row.compRole===3">供应商</el-tag>
              <el-tag v-else-if="stData.row.compRole===4">增信机构</el-tag>
              <el-tag v-else-if="stData.row.compRole===5">资金方</el-tag>
              <el-tag v-else-if="stData.row.compRole===6">机构投资人</el-tag>
              <el-tag v-else-if="stData.row.compRole===7">第三方服务机构</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="custType" label="客户类型" width="100%">
            <template slot-scope="stData">
              <el-tag v-if="stData.row.custType===1">法人</el-tag>
              <el-tag v-else-if="stData.row.custType===2">非法人</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="createdTime" label="创建时间" width="160%" />
        </el-table>
      </div>
      <!-- 分页 -->
      <div class="pages mt15">
        <el-pagination
          :current-page="advSearchForm.pageNum"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="advSearchForm.pageSize"
          layout=" prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
    <!-- 右侧 end -->
    <div id="side-tool">
      <h2>客户管理</h2>
      <div class="side-tool-btn">
        <div class="mod-mbar btn-eqAdopt">
          <div @click="start">
            <div class="ibtn"><div class="icon" /></div>
            <div class="tip">
              <span class="txt">启用</span><span class="arrow" />
            </div>
          </div>
        </div>
        <div class="mod-mbar btn-eqNotthrough">
          <div @click="end">
            <div class="ibtn"><div class="icon" /></div>
            <div class="tip">
              <span class="txt">禁用</span><span class="arrow" />
            </div>
          </div>
        </div>
        <div class="mod-mbar btn-approval-by">
          <div @click="pass">
            <div class="ibtn"><div class="icon" /></div>
            <div class="tip">
              <span class="txt">审批通过</span><span class="arrow" />
            </div>
          </div>
        </div>
        <div class="mod-mbar btn-approval-nopass">
          <div @click="fail">
            <div class="ibtn"><div class="icon" /></div>
            <div class="tip">
              <span class="txt">审批不通过</span><span class="arrow" />
            </div>
          </div>
        </div>
        <div class="mod-mbar btn-publish">
          <div class="ibtn"><div class="icon" /></div>
          <div class="tip">
            <span class="txt">企业信息变更</span><span class="arrow" />
          </div>
        </div>
        <div class="mod-mbar btn-roleconfig">
          <div class="ibtn"><div class="icon" /></div>
          <div class="tip">
            <span class="txt">管理员变更</span><span class="arrow" />
          </div>
        </div>
        <div class="mod-mbar btn-eqRelieve">
          <div class="ibtn"><div class="icon" /></div>
          <div class="tip">
            <span class="txt">重置密码</span><span class="arrow" />
          </div>
        </div>
        <div class="mod-mbar btn-receivables">
          <div class="ibtn"><div class="icon" /></div>
          <div class="tip">
            <span class="txt">资料收到</span><span class="arrow" />
          </div>
        </div>
        <div class="mod-mbar btn-contrast">
          <div @click="adjustSuperior = true">
            <div class="ibtn"><div class="icon" /></div>
            <div class="tip">
              <span class="txt">链属关系</span><span class="arrow" />
            </div>
          </div>
        </div>
        <div class="mod-mbar btn-transferCustomer">
          <div class="ibtn"><div class="icon" /></div>
          <div class="tip">
            <span class="txt">企业角色变更</span><span class="arrow" />
          </div>
        </div>
        <div class="mod-mbar btn-transfer">
          <div @click="tiao">
            <div class="ibtn"><div class="icon" /></div>
            <div class="tip">
              <span class="txt">调整上级单位</span><span class="arrow" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 链属企业关系 -->
    <el-dialog title="链属企业关系" :visible.sync="chainRelate" width="700px">
      <div class="mod-detail">
        <el-form label-width="100px" size="small">
          <el-form-item label="企业名称：">
            某某技术有限公司
          </el-form-item>
        </el-form>
      </div>
      <div class="m-tabs-tit">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="我的买方" name="first" />
          <el-tab-pane label="我的卖方" name="second" />
        </el-tabs>
      </div>
      <!--  -->
      <div v-if="tabType == 0">
        <div class="table-list mt15">
          <el-table
            :data="chianData1"
            highlight-current-row
            border
            stripe
            style="width: 100%"
            @current-change="handleCurrentChange"
          >
            <el-table-column
              align="center"
              prop="numb"
              label="序号"
              min-width="10%"
            >
              <template slot="header">
                <p class="tcenter">序号</p>
              </template>
              <!-- <p class="tcenter"><el-checkbox /></p> -->
            </el-table-column>
            <el-table-column
              align="center"
              prop="state"
              label="企业角色"
              min-width="20%"
            >
              <!-- <template slot="header">
                <p class="tcenter">企业角色</p>
              </template> -->
            </el-table-column>
            <el-table-column
              align="center"
              prop="relation"
              label="关联关系"
              min-width="20%"
            >
              <!-- <template slot="header">
                <p class="tcenter">关联关系</p>
              </template> -->
            </el-table-column>
            <el-table-column
              prop="custName"
              label="企业名称"
              min-width="40%"
            >
              <!-- <template slot="header">
                <p class="tcenter">企业名称</p>
              </template> -->
            </el-table-column>
          </el-table>
        </div>
      </div>
      <!--  -->
      <div v-if="tabType == 1">
        <div class="table-list mt15">
          <el-table
            :data="chianData1"
            highlight-current-row
            border
            stripe
            style="width: 100%"
            @current-change="handleCurrentChange"
          >
            <el-table-column
              align="center"
              prop="numb"
              label="序号"
              min-width="10%"
            >
              <!-- <template slot="header">
                <p class="tcenter">序号</p>
              </template>
              <p class="tcenter"><el-checkbox /></p> -->
            </el-table-column>
            <el-table-column
              align="center"
              prop="state"
              label="企业角色"
              min-width="20%"
            >
              <!-- <template slot="header">
                <p class="tcenter">企业角色</p>
              </template> -->
            </el-table-column>
            <el-table-column
              align="center"
              prop="relation"
              label="关联关系"
              min-width="20%"
            >
              <!-- <template slot="header">
                <p class="tcenter">关联关系</p>
              </template> -->
            </el-table-column>
            <el-table-column
              prop="custName"
              label="企业名称"
              min-width="40%"
            >
              <!-- <template slot="header">
                <p class="tcenter">企业名称</p>
              </template> -->
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="chainRelate = false">确 认</el-button>
        <el-button @click="chainRelate = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 调整上级单位 -->
    <el-dialog title="调整上级单位" :visible.sync="adjustSuperior" width="600px">
      <el-form :model="adjustForm" label-width="120px" size="small">
        <el-form-item label="当前企业名称：">
          某某技术有限公司
        </el-form-item>
        <el-form-item label="上级单位名称：" prop="superiorUnit">
          <el-select v-model="adjustForm.superiorUnit" placeholder="请选择" size="small" style="width:100%">
            <el-option v-for="item in superiorUnitOpt" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="que">确 认</el-button>
        <el-button @click="adjustSuperior = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import '@/assets/css/style.css'
// import { corporationList } from '@/api/corporationList/corporationList'
import Module from '@/api/CRM/corporationList'
import Del from '@/api/CRM/delList'
import Adjust from '@/api/CRM/adjust'
import Lookadjus from '@/api/CRM/lookadjus'
import Qadjust from '@/api/CRM/qadjust'
import Start from '@/api/CRM/start'
import Forbidden from '@/api/CRM/forbidden'
import Pass from '@/api/CRM/pass'
import Fail from '@/api/CRM/fail'
export default {
  name: 'CorporationList',
  data() {
    return {
      // search
      tabType: 0,
      chainRelate: false,
      adjustSuperior: false,
      activeName: 'first',
      total: 0,
      hsearch: '',
      timetotime: [], // 时间
      custName: '', // 企业名
      isAdvanSearch: false,
      compCode: '', // 编号
      bizCode: '', // 序号
      enableStatus: '', // 启用状态
      chianData1: [{
        numb: '1',
        state: '已确认',
        relation: '无关联关系',
        custName: '某某技术有限公司'
      }, {
        numb: '2',
        state: '待买方确认',
        relation: '联营企业',
        custName: '某某技术有限公司'
      }],
      chianData2: [{
        numb: '1',
        state: '已确认',
        relation: '无关联关系',
        custName: '某某技术有限公司'
      }, {
        numb: '2',
        state: '待买方确认',
        relation: '联营企业',
        custName: '某某技术有限公司'
      }],
      adjustForm: {
        superiorUnit: ''
      },
      superiorUnitOpt: [
        { value: '1', label: '北京某某集团公司' },
        { value: '2', label: '北京XX集团公司' },
        { value: '3', label: '某某有限公司' }
      ],
      // 高级搜索表单
      advSearchForm: {
        custType: '', // 客户类型
        begin_pubdate: '', // 开始时间
        end_pubdate: '', // 结束时间
        compStatus: '', // 客户状态
        compRole: '', // 角色
        isCollect: '', // 资料收集
        pageNum: 1,
        pageSize: 5,
        searchValue: '',
        orderBy: 'createdTime'
      },
      custTypeOpt: [
        { value: '1', label: '全部' },
        { value: '2', label: '供应商' },
        { value: '3', label: '资金方' }
      ],
      advSearchRules: {
        createDate: [{ required: false, type: 'date', message: '请选择', trigger: 'change' }],
        custName: [{ required: false, message: '', trigger: 'blur' }],
        custState: [{ required: false, message: '', trigger: 'change' }],
        custType: [{ required: false, message: '', trigger: 'change' }],
        custRole: [{ required: false, message: '', trigger: 'change' }],
        custFile: [{ required: false, message: '', trigger: 'change' }]
      },
      sort: '',
      sortOpt: [
        { value: '1', label: '按经办时间升序' },
        { value: '2', label: '按经办时间降序' }
      ],
      pagesize: '',
      pagesizeOpt: [
        {
          value: 1,
          label: 5
        },
        {
          value: 2,
          label: 10
        },
        {
          value: 3,
          label: 15
        }
      ],
      // 企业客户列表
      tableData: []
    }
  },

  watch: {
    // 对timetotime成员进行监听
    timetotime(newval) {
      // 把newval的值拆分分别给到 begin_pubdate和end_pubdate 里边
      if (newval) {
        this.advSearchForm.begin_pubdate = newval[0]
        this.advSearchForm.end_pubdate = newval[1]
        this.getCorporationList()
      } else {
        this.advSearchForm.begin_pubdate = ''
        this.advSearchForm.end_pubdate = ''
      }
    }

  },

  created() {
    // this.reload()
    this.tableData.forEach(item => {
      item.checked = false
    })
    this.getCorporationList()

    this.adjus()
    // location.reload()
  },
  methods: {
    setCurrent: function(row) {
      this.$refs.singleTable.setCurrentRow(row)
    },
    handleClick: function(tab, event) {
      this.tabType = tab.index
    },
    // 当前页码变化的回调处理
    handleCurrentChange: function(val) {
      this.currentRow = val
      this.advSearchForm.pageNum = val
      this.getCorporationList()
    },
    // 每页数据记录条数变化的回调处理
    handleSizeChange(val) {
      //   this.data.pageNum = val
      this.advSearchForm.pageSize = val
      //   console.log(this.advSearchForm.pageNum)
      this.getCorporationList()
    },
    // 条件筛选搜索功能
    search() {
      if (this.hsearch === '') {
        alert('请输入搜索信息')
      } else {
        this.advSearchForm.searchValue = this.hsearch
        this.getCorporationList()
        this.hsearch = ''
        // console.log(this.advSearchForm.searchValue)
        // console.log(this.advSearchForm.searchValue)
      }
    },
    // 高级搜索功能
    sousuo() {
      // this.advSearchForm.orderBy = this.timetotime;
      this.advSearchForm.searchValue = this.custName
      console.log(this.advSearchForm.searchValue)
      this.getCorporationList()
    },
    // 重置功能
    reset() {
      this.advSearchForm = {
        custType: '', // 客户类型
        begin_pubdate: '', // 开始时间
        end_pubdate: '', // 结束时间
        compStatus: '', // 客户状态
        compRole: '', // 角色
        isCollect: '', // 资料收集
        pageNum: '',
        pageSize: 5,
        searchValue: '',
        orderBy: 'createdTime'
      }
    },
    // 添加列表
    // addList() {
    //   this.$router.push(`/crm/add/list`)
    // },
    handleDetail(pathName) {
      this.$router.push({ name: pathName })
      this.$store.dispatch('app/setLeftSidebarRouters', {})
    },

    // 当选中框变化时
    handleSelectionChange(row) {
      this.tableData.forEach(item => {
        console.log(row.bizCode)
        if (item.id !== row.id) {
          item.checked = false
        } else {
          item.checked = true
          this.bizCode = row.bizCode
          this.custName = row.compName
          this.compCode = row.compCode
          this.advSearchForm.compStatus = row.compStatus
          this.enableStatus = row.enableStatus
        }
      })
    },
    // 查看列表
    detail(pathName, item) {
      if (this.bizCode === '') {
        alert('请选中查看列表')
      } else {
        this.$router.push({ name: pathName, query: { compCode: this.compCode }})
        this.$store.dispatch('app/setLeftSidebarRouters', {})
      }
    },
    // 编辑列表
    emitList(pathName, item) {
      if (this.bizCode === '') {
        alert('请选中修改列表')
      } else {
        this.$router.push({ name: pathName, query: { compCode: this.compCode }})
        this.$store.dispatch('app/setLeftSidebarRouters', {})
      }
    },
    // 删除列表
    del() {
      if (this.compCode === '') {
        alert('请选中删除列表')
      } else if (this.advSearchForm.compStatus === 10) {
        Del.delList(`compCode=${this.compCode}`).then(resp => {
          console.log(resp)
          if (resp.status === '200') {
            this.$message.success('删除成功')
            this.getCorporationList()
          }
        })
      } else {
        alert('请选中状态为保存的客户')
      }
    },

    // 获取企业客户列表
    getCorporationList() {
      Module.corporationList({
        pageNum: this.advSearchForm.pageNum,
        pageSize: this.advSearchForm.pageSize,
        searchValue: this.advSearchForm.searchValue,
        orderBy: this.advSearchForm.orderBy
      })
        .then(resp => {
          if (resp.status === '200') {
            console.log(resp.status)
            this.total = resp.body.total
            this.pagesize = resp.body.pageSize
            this.tableData = resp.body.list
            console.log(resp)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 启用
    start() {
      if (this.bizCode === '') {
        alert('请选中所需启用的客户')
        console.log(this.enableStatus)
      } else if (this.advSearchForm.compStatus === 40) {
        Start.delList(`bizCode=${this.bizCode}`)
          .then(resp => {
            console.log(resp)
            this.getCorporationList()
          })
      } else {
        alert('请选中状态为审批通过的客户')
      }
    },
    // 禁用
    end() {
      if (this.bizCode === '') {
        alert('请选中所需禁用的客户')
      } else if (this.advSearchForm.compStatus === 10 || this.advSearchForm.compStatus === 30 || this.advSearchForm.compStatus === 40) {
        Forbidden.delList(`bizCode=${this.bizCode}`)
          .then(resp => {
            console.log(resp)
            this.getCorporationList()
          })
      } else {
        alert('请选中合适状态的客户')
      }
    },
    // 审批通过
    pass() {
      if (this.compCode === '') {
        alert('请选中客户')
      } else if (this.advSearchForm.compStatus === 30) {
        Pass.corporationList([this.compCode])
          .then(resp => {
            if (resp.status === '200') {
              this.getCorporationList()
            }
          })
      } else {
        alert('请选中待审批的客户')
      }
    },
    // 审批不通过
    fail() {
      if (this.comCode === '') {
        alert('请选中客户')
      } else if (this.advSearchForm.compStatus === 30) {
        Fail.corporationList({
          compCode: this.compCode,
          reviewResult: '1',
          reviewMemo: '不统一'
        })
          .then(resp => {
            this.getCorporationList()
          })
      }
    },
    // 上级关系列表
    adjus() {
      Adjust.fetchList().then(resp => {
        console.log(resp)
      })
    },
    // 调整上级关系
    tiao() {
      if (this.custName === '') {
        alert('请选中企业')
      } else {
        this.adjustSuperior = true
        console.log(this.custName)
        Lookadjus.delList(`compName=${this.custName}&nameLike=''`)
          .then(resp => {
            if (resp.status === '200') {
              console.log(resp)
            }
          })
      }
    },
    //  调整上级关系确认
    que() {
      Qadjust.corporationList({
        compCode: this.compCode,
        parentCode: ''
      }).then(resp => {
        if (resp.status === '200') {
          this.adjustSuperior = false
          this.getCorporationList()
        }
      })
    }

  }
}
</script>

<style lang="scss">
.m-select-con .m-select-head .btn-cx{
  right: -80px;
}
.el-tag {
  color: #000;
  background-color: transparent;
  border: none;
}
</style>
