<template>
  <div class="cont">
    <div class="m-head clearfix">
      <div class="m-head-tit fl">
        <h4>组织架构</h4>
        <span class="txt">共{{ total }}个</span>
      </div>
      <div class="t-edit-btn fr">
        <ul class="clearfix">
          <li>
            <a href="#" @click.prevent="addList">
              <span class="icon_add_blue" title="添加" />
            </a>
          </li>
          <li>
            <a href="#" @click.prevent="detail">
              <span class="icon_check_blue" title="查看" />
            </a>
          </li>
          <li>
            <a href="#" @click.prevent="emitList">
              <span class="icon_edit_blue" title="编辑" />
            </a>
          </li>
          <li>
            <a href="#">
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
        <el-form :rules="advSearchRules" label-width="120px" size="small" :model="advSearchForm">
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
                <el-radio-group :max="1">
                  <el-radio v-model="advSearchForm.custType" label="1">法人</el-radio>
                  <el-radio v-model="advSearchForm.custType" label="2">非法人</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="客户状态：" prop="custState">
                <el-radio-group :max="1">
                  <el-radio v-model="advSearchForm.compStatus" label="15">保存</el-radio>
                  <el-radio v-model="advSearchForm.compStatus" label="20">实名中</el-radio>
                  <el-radio
                    v-model="advSearchForm.compStatus"
                    label="25"
                  >实名认证待审核</el-radio>
                  <el-radio v-model="advSearchForm.compStatus" label="30">待开通E信</el-radio>
                  <el-radio v-model="advSearchForm.compStatus" label="35">实名失败</el-radio>
                  <el-radio v-model="advSearchForm.compStatus" label="40">待审批</el-radio>
                  <el-radio v-model="advSearchForm.compStatus" label="50">审批不通过</el-radio>
                  <el-radio v-model="advSearchForm.compStatus" label="60">审批通过</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="企业角色：" prop="custRole">
                <el-radio-group :max="1">
                  <el-radio v-model="advSearchForm.compRole" label="1">核心企业</el-radio>
                  <el-radio v-model="advSearchForm.compRole" label="2">成员单位</el-radio>
                  <el-radio v-model="advSearchForm.compRole" label="3">供应商</el-radio>
                  <el-radio v-model="advSearchForm.compRole" label="4">增信机构</el-radio>
                  <el-radio v-model="advSearchForm.compRole" label="5">资金方</el-radio>
                  <el-radio v-model="advSearchForm.compRole" label="6">机构投资人</el-radio>
                  <el-radio v-model="advSearchForm.compRole" label="7">第三方服务机构</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="资料收集：" prop="custFile">
                <el-radio-group :max="1">
                  <el-radio v-model="advSearchForm.isCollect" label="1">已收集</el-radio>
                  <el-radio v-model="advSearchForm.isCollect" label="2">未收集</el-radio>
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

          <span>每页显示数量：<el-select
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
          </el-select></span>

        </div>
      </div>
      <div class="table-list">
        <el-table :data="tableData" highlight-current-row border stripe style="width: 100%;">
          <el-table-column width="40%">
            <template slot-scope="scope">
              <el-checkbox v-model="scope.row.checked" />
            </template>
          </el-table-column>
          <el-table-column prop="bizCode" label="序号" width="50%" />
          <el-table-column prop="entpType" label="启用状态 " width="80%">
            <template slot-scope="stData">
              <el-tag v-if="stData.row.entpType==='E'">启用</el-tag>
              <el-tag v-else>禁用</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="compStatus" label="客户状态" width="80%">
            <template slot-scope="stData">
              <el-tag v-if="stData.row.compStatus===15">保存</el-tag>
              <el-tag v-else-if="stData.row.compStatus===20">提交</el-tag>
              <el-tag v-else-if="stData.row.compStatus===25">审批中</el-tag>
              <el-tag v-else-if="stData.row.compStatus===30">打回修改</el-tag>
              <el-tag v-else-if="stData.row.compStatus===35">审批不通过</el-tag>
              <el-tag v-else-if="stData.row.compStatus===40">潜在客户</el-tag>
              <el-tag v-else-if="stData.row.compStatus===50">意向客户</el-tag>
              <el-tag v-else>签约客户</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="isCollect" label="资料收集" width="80%">
            <template slot-scope="stData">
              <el-tag v-if="stData.row.isCollect===1">已收集</el-tag>
              <el-tag v-else-if="stData.row.isCollect===2">未收集</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="isUscc" label="是否注册" width="80%">
            <template slot-scope="stData">
              <el-tag v-if="stData.row.isUscc===1">已注册</el-tag>
              <el-tag v-else-if="stData.row.isUscc===2">未注册</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="compCode" label="客户编号" width="150%" />
          <el-table-column prop="compName" label="企业名称" width="150%" />
          <el-table-column prop="legalIdnum" label="统一社会信用代码" width="150%" />
          <el-table-column prop="custType" label="客户类型" width="100%">
            <template slot-scope="stData">
              <el-tag v-if="stData.row.custType===1">法人</el-tag>
              <el-tag v-else-if="stData.row.custType===2">非法人</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="compRole" label="角色" width=" 100%">
            <template slot-scope="stData">
              <el-tag v-if="stData.row.compRole===1">核心企业</el-tag>
              <el-tag v-else-if="stData.row.compRole===2">成员单位</el-tag>
              <el-tag v-else-if="stData.row.compRole===3">供应商</el-tag>
              <el-tag v-else-if="stData.row.compRole===4">增信机构</el-tag>
              <el-tag v-else-if="stData.row.compRole===5">资金方</el-tag>
              <el-tag v-else-if="stData.row.compRole===6">机构投资人</el-tag>
              <el-tag v-else>第三方服务机构</el-tag>
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
        <div class="mod-mbar btn-export btn-c1">
          <div class="ibtn">
            <div class="icon" />
          </div>
          <div class="tip">
            <span class="txt">导出客户</span>
            <span class="arrow" />
          </div>
        </div>
        <div class="mod-mbar btn-import">
          <div class="ibtn">
            <div class="icon" />
          </div>
          <div class="tip">
            <span class="txt">导入客户</span>
            <span class="arrow" />
          </div>
        </div>
        <div class="mod-mbar btn-change">
          <div class="ibtn">
            <div class="icon" />
          </div>
          <div class="tip">
            <span class="txt">变更负责人</span>
            <span class="arrow" />
          </div>
        </div>
        <div class="mod-mbar btn-grade">
          <div class="ibtn">
            <div class="icon" />
          </div>
          <div class="tip">
            <span class="txt">客户评级</span>
            <span class="arrow" />
          </div>
        </div>
        <div class="mod-mbar btn-identy">
          <div class="ibtn">
            <div class="icon" />
          </div>
          <div class="tip">
            <span class="txt">标识客户</span>
            <span class="arrow" />
          </div>
        </div>
        <div class="mod-mbar btn-calltemplate">
          <div class="ibtn">
            <div class="icon" />
          </div>
          <div class="tip">
            <span class="txt">项目评审</span>
            <span class="arrow" />
          </div>
        </div>
        <div class="mod-mbar btn-transfer">
          <div class="ibtn">
            <div class="icon" />
          </div>
          <div class="tip">
            <span class="txt">调</span>
            <span class="arrow" />
          </div>
        </div>
        <div class="mod-mbar btn-refund">
          <div class="ibtn">
            <div class="icon" />
          </div>
          <div class="tip">
            <span class="txt">退款</span>
            <span class="arrow" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import '@/assets/css/style.css'
// import { corporationList } from '@/api/corporationList/corporationList'
export default {
  name: 'CorporationList',
  data() {
    return {
      // search
      currentPage4: '',
      total: 0,
      hsearch: '',
      timetotime: [], // 时间
      custName: '', // 企业名
      isAdvanSearch: false,
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
        state: [{ required: false, message: '请选择', trigger: 'change' }],
        custName: [{ required: false, message: '客户名称不能为空', trigger: 'blur' }],
        custType: [{ required: false, message: '请选择', trigger: 'change' }]
      },
      sort: '',
      sortOpt: [
        { value: '1', label: '按名称排序' },
        { value: '2', label: '按创建时间排序' }
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
    // this.getCorporationList()
  },
  methods: {
    setCurrent: function(row) {
      this.$refs.singleTable.setCurrentRow(row)
    },
    // 当前页码变化的回调处理
    handleCurrentChange: function(val) {
      this.advSearchForm.pageNum = val
      // this.getCorporationList()
    },
    // 每页数据记录条数变化的回调处理
    handleSizeChange(val) {
      //   this.data.pageNum = val
      this.advSearchForm.pageSize = val
      //   console.log(this.advSearchForm.pageNum)
      // this.getCorporationList()
    },
    // 条件筛选搜索功能
    search() {
      if (this.hsearch === '') {
        alert('请输入搜索信息')
      } else {
        this.advSearchForm.searchValue = this.hsearch
        // this.getCorporationList()
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
      // this.getCorporationList()
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
        pageNum: 1,
        pageSize: 5,
        searchValue: '',
        orderBy: 'createdTime'
      }
    },
    // 添加列表
    addList() {
      // this.$router.push('/addList')
    },
    // 查看列表
    detail() {
      // this.$router.push('/detail')
    },
    // 编辑列表
    emitList() {
      // this.$router.push('/emitList')
    }

    // 获取企业客户列表
    // getCorporationList() {
    //   corporationList({
    //     pageNum: this.advSearchForm.pageNum,
    //     pageSize: this.advSearchForm.pageSize,
    //     searchValue: this.advSearchForm.searchValue,
    //     orderBy: this.advSearchForm.orderBy
    //   })
    //     .then(resp => {
    //       if (resp.status === '200') {
    //         console.log(resp.status)
    //         this.total = resp.body.total
    //         this.pagesize = resp.body.pageSize
    //         this.tableData = resp.body.list
    //         console.log(resp)
    //       }
    //     })
    //     .catch(err => {
    //       console.log(err)
    //     })
    // }
  }
}
</script>

<style lang="scss">
.el-tag {
  color: #000;
  background-color: transparent;
  border: none;
}
</style>
