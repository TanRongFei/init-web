<template>
  <div class="cont">
    <div class="m-head clearfix">
      <div class="m-head-tit fl">
        <h4>企业信息</h4>
      </div>
      <div class="t-edit-btn fr">
        <ul class="clearfix">
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
        <el-form :rules="advSearchRules" size="small" :model="advSearchForm">
          <el-row :gutter="24">
            <el-col :span="8">
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
            <el-col :span="8">
              <el-form-item label="企业名称(变更前)：" prop="custName">
                <el-input
                  v-model="custName"
                  style="width: 250px;"
                  placeholder="请输入"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="企业名称(变更后)：" prop="custName">
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
              <el-form-item label="状态：" prop="custState">
                <el-radio-group :max="1">
                  <el-radio v-model="advSearchForm.compStatus" label="15">待开通信单</el-radio>
                  <el-radio v-model="advSearchForm.compStatus" label="20">待审批</el-radio>
                  <el-radio
                    v-model="advSearchForm.compStatus"
                    label="25"
                  >审批不通过</el-radio>
                  <el-radio v-model="advSearchForm.compStatus" label="30">审批通过</el-radio>
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
          <el-table-column prop="bizCode" label="状态" width="140%" />
          <el-table-column prop="entpType" label="变更编号 " width="140%" />
          <el-table-column prop="compStatus" label="变更类型" width="140%" />
          <el-table-column prop="isCollect" label="申请时间：" width="140%" />
          <el-table-column prop="isUscc" label="企业名称(变更前)" width="140%" />
          <el-table-column prop="compCode" label="企业名称(变更后)" width="140%" />
          <el-table-column prop="compCode" label="企业编号" width="140%" />
          <el-table-column prop="compName" label="经办人" width="140%" />
          <el-table-column prop="legalIdnum" label="经办人手机号" width="140%" />
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
      <h2>功能按钮</h2>
      <div class="side-tool-btn">
        <div class="mod-mbar btn-export btn-c1">
          <div class="ibtn">
            <div class="icon" />
          </div>
          <div class="tip">
            <span class="txt">提交</span>
            <!-- <span class="arrow"></span> -->
          </div>
        </div>
        <div class="mod-mbar btn-import">
          <div class="ibtn">
            <div class="icon" />
          </div>
          <div class="tip">
            <span class="txt">审批通过</span>
            <span class="arrow" />
          </div>
        </div>
        <div class="mod-mbar btn-grade">
          <div class="ibtn">
            <div class="icon" />
          </div>
          <div class="tip">
            <span class="txt">审批不通过</span>
            <span class="arrow" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomerInfochange',
  data() {
    return {
      // search
      currentPage4: '',
      total: 0,
      hsearch: '',
      timetotime: [], // 时间
      custName: '', // 企业名
      beforUser: '', // 管理员变更前
      afterUser: '', // 管理员变更后
      isAdvanSearch: false,
      // 高级搜索表单
      advSearchForm: {
        begin_pubdate: '', // 开始时间
        end_pubdate: '', // 结束时间
        compStatus: '', // 状态
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
    // this.getCorporationList();
  },
  methods: {
    setCurrent: function(row) {
      this.$refs.singleTable.setCurrentRow(row)
    },
    // 当前页码变化的回调处理
    handleCurrentChange: function(val) {
      this.advSearchForm.pageNum = val
      // this.getCorporationList();
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
        // this.getCorporationList();
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
      // this.getCorporationList();
    },
    // 重置功能
    reset() {
      this.advSearchForm = {
        begin_pubdate: '', // 开始时间
        end_pubdate: '', // 结束时间
        compStatus: '', // 状态
        pageNum: 1,
        pageSize: 5,
        searchValue: '',
        orderBy: 'createdTime'
      }
    },
    // 查看列表
    detail() {
      // this.$router.push('/detail');
    },
    // 编辑列表
    emitList() {
      // this.$router.push('/emitList');
    }

    // 获取企业客户列表
    // getCorporationList() {
    //     corporationList({
    //         pageNum: this.advSearchForm.pageNum,
    //         pageSize: this.advSearchForm.pageSize,
    //         searchValue: this.advSearchForm.searchValue,
    //         orderBy: this.advSearchForm.orderBy
    //     })
    //         .then(resp => {
    //             if (resp.status === '200') {
    //                 console.log(resp.status);
    //                 this.total = resp.body.total;
    //                 this.pagesize = resp.body.pageSize;
    //                 this.tableData = resp.body.list;
    //                 console.log(resp);
    //             }
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         });
    // }
  }
}
</script>

<style lang="scss">
.m-select-con .m-select-head .btn-cx{
  right: -80px;
}
.el-form-item__content {
  margin-left: 120px;
}
.el-date-editor {
  width: 270px !important;
}
.el-tag {
  color: #000;
  background-color: transparent;
  border: none;
}
</style>
