<template>
  <!-- 右侧 start -->
  <div class="maincont">
    <div class="m-head clearfix">
      <div class="m-head-tit fl">
        <h4>财务信息</h4>
      </div>
      <div class="m-head-btn fr">
        <el-button type="primary" size="small">保存</el-button>
        <el-button size="small" @click="back('CorporationList')">返回</el-button>
      </div>
    </div>
    <!-- 编辑 -->
    <div class="m-table-detail">
      <!-- 财务信息 -->
      <div class="mod-info-tit clearfix">
        <h4>财务信息</h4>
        <div class="add-edit-btn">
          <ul>
            <li><a class="m-btn">下载模板</a></li>
            <li><a class="m-btn">导入报表</a></li>
            <li><a class="m-btn">数据分析</a></li>
            <li><a @click="addfinancial = true"><span class="icon_add_blue" title="添加" /></a></li>
            <li><a href="#"><span class="icon_edit_blue" title="编辑" /></a></li>
            <li><a href="#"><span class="icon_del_blue" title="删除" /></a></li>
          </ul>
        </div>
      </div>
      <!--  -->
      <div class="table-list mt15">
        <el-table
          :data="financialData"
          highlight-current-row
          border
          stripe
          style="width: 100%"
          @current-change="handleCurrentChange"
        >
          <el-table-column
            prop="checkbox"
            label=""
            min-width="5%"
          >
            <template slot="header">
              <p class="tcenter"><el-checkbox /></p>
            </template>
            <template>
              <p class="tcenter"><el-checkbox /></p>
            </template>
          </el-table-column>
          <el-table-column
            prop="state"
            label="状态"
            min-width="8%"
          >
            <template slot="header">
              <p class="tcenter">状态</p>
            </template>
            <template slot-scope="scope">
              <p class="tcenter">{{ scope.row.state }}</p>
            </template>
          </el-table-column>
          <el-table-column
            prop="reportName"
            label="报表名称"
            min-width="13%"
          />
          <el-table-column
            prop="reportType"
            label="报表类型"
            min-width="10%"
          />
          <el-table-column
            prop="reportDate"
            label="报表报告日"
            min-width="10%"
          />
          <el-table-column
            prop="tabulationUnit"
            label="制表单位"
            min-width="10%"
          />
          <el-table-column
            prop="isAudit"
            label="是否审计"
            min-width="10%"
          />
          <el-table-column
            prop="create"
            label="创建人"
            min-width="10%"
          />
          <el-table-column
            prop="createDate"
            label="创建时间"
            min-width="12%"
          />
        </el-table>
      </div>
      <!-- 历史记录 -->
      <div class="mod-info-tit clearfix">
        <h4>历史记录</h4>
        <div class="add-edit-btn">
          <ul>
            <li><a href="#"><span class="icon_export_blue" title="导出" /></a></li>
            <li><a href="#"><span class="icon_check_blue" title="查看" /></a></li>
            <li><a href="#"><span class="icon_del_blue" title="删除" /></a></li>
          </ul>
        </div>
      </div>
      <!--  -->
      <div class="table-list mt15">
        <el-table
          :data="recordData"
          highlight-current-row
          border
          stripe
          style="width: 100%"
          @current-change="handleCurrentChange"
        >
          <el-table-column
            prop="numb"
            label="序号"
            min-width="5%"
          >
            <template slot="header">
              <p class="tcenter">序号</p>
            </template>
            <template slot-scope="scope">
              <p class="tcenter">{{ scope.$index+1 }}</p>
            </template>
          </el-table-column>
          <el-table-column
            prop="recordName"
            label="历史记录名称"
            min-width="15%"
          />
          <el-table-column
            prop="analysisType"
            label="报表分析类型"
            min-width="12%"
          />
          <el-table-column
            prop="create"
            label="创建人"
            min-width="12%"
          />
          <el-table-column
            prop="createDate"
            label="创建时间"
            min-width="12%"
          />
        </el-table>
      </div>
    </div>
    <!-- 添加财务信息 -->
    <el-dialog title="财务信息" :visible.sync="addfinancial" width="700px">
      <div class="mod-info-tit"><h4>财务数据基础信息</h4></div>
      <div class="mod-add-form mt15">
        <el-form :model="addfinacialForm" :rules="addfinacialRules" label-width="100px" size="small">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="报表模板：" prop="reportTemplate">
                <el-select v-model="addfinacialForm.reportTemplate" placeholder="请选择" size="small" style="width:100%">
                  <el-option v-for="item in reportTemplateOpt" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="报表名称：" prop="reportName">
                <el-input v-model="addfinacialForm.reportName" placeholder="" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="制表单位：" prop="tabulationUnit">
                <el-input v-model="addfinacialForm.tabulationUnit" placeholder="" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="报表日期：" prop="reportDate">
                <el-date-picker v-model="addfinacialForm.reportDate" type="date" placeholder="2019-05-16" style="width: 100%;" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="是否审计：" prop="isAudit">
                <el-radio-group v-model="addfinacialForm.isAudit">
                  <el-radio label="1">是</el-radio>
                  <el-radio label="2">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="币种：" prop="currency">
                <el-select v-model="addfinacialForm.currency" placeholder="请选择" size="small" style="width:100%">
                  <el-option v-for="item in currencyOpt" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="单位：" prop="unit">
                <el-select v-model="addfinacialForm.unit" placeholder="请选择" size="small" style="width:100%">
                  <el-option v-for="item in unitOpt" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12" />
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="文件上传：">
                <el-upload
                  class="m-upload"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :file-list="fileList"
                >
                  <el-button size="small" type="primary">上传</el-button>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col :span="12" />
          </el-row>
        </el-form>
      </div>
      <div class="mod-info-tit"><h4>财务数据录入</h4></div>
      <div class="table-list mt15">
        <el-table
          :data="entryData"
          highlight-current-row
          border
          stripe
          style="width: 100%"
          @current-change="handleCurrentChange"
        >
          <el-table-column
            prop="indexItem"
            label="指标项"
            min-width="50%"
          />
          <el-table-column
            prop="entryValue"
            label="录入值"
            min-width="50%"
          />
        </el-table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary">确 定</el-button>
        <el-button @click="adjustSuperior = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
  <!-- 右侧 end -->

</template>

<script>
export default {
  name: 'Information',
  data() {
    return {
      financialData: [{
        state: '启用',
        reportName: 'XX资产负债表模板',
        reportType: '资产负债表',
        reportDate: '2019-09-13',
        tabulationUnit: '北京某某有限公司',
        isAudit: '是',
        create: '张三',
        createDate: '2019-09-13'
      }],
      addfinancial: false,
      addfinacialForm: {
        reportTemplate: '',
        reportName: '',
        tabulationUnit: '',
        reportDate: '',
        isAudit: '1',
        currency: '',
        unit: ''
      },
      reportTemplateOpt: [
        { value: '1', label: '模板一' },
        { value: '2', label: '模板二' }
      ],
      currencyOpt: [
        { value: '1', label: '人民币' },
        { value: '2', label: '美元' }
      ],
      unitOpt: [
        { value: '1', label: '元' },
        { value: '2', label: '万元' }
      ],
      fileList: [],
      addfinacialRules: {
        reportTemplate: [{ required: true, message: '请选择', trigger: 'change' }],
        reportName: [{ required: true, message: '请输入', trigger: 'blur' }],
        tabulationUnit: [{ required: false, message: '请输入', trigger: 'blur' }],
        reportDate: [{ required: true, message: '请选择', trigger: 'change' }],
        isAudit: [{ required: true, message: '请选择', trigger: 'change' }],
        currency: [{ required: true, message: '请选择', trigger: 'change' }],
        unit: [{ required: true, message: '请选择', trigger: 'change' }]
      },
      entryData: [{
        indexItem: '收入支出总表',
        entryValue: ''
      }, {
        indexItem: '财政基本补助收入',
        entryValue: ''
      }, {
        indexItem: '其他收入',
        entryValue: ''
      }],
      recordData: [{
        recordName: 'XXX数据',
        analysisType: '一般行业财务指标分析',
        create: '张三',
        createDate: '2019-03-10'
      }]
    }
  },
  methods: {
    // 点击返回功能
    back(pathName) {
      this.$router.push({ name: pathName })
      this.$store.dispatch('app/setLeftSidebarRouters', {})
    },
    setCurrent: function(row) {
      this.$refs.singleTable.setCurrentRow(row)
    },
    handleCurrentChange: function(val) {
      this.currentRow = val
    },
    handleChange: function(file, fileList) {
      this.fileList = fileList.slice(-3)
    }
  }

}
</script>

<style lang="scss" scoped>
.maincont {
    padding-left: 0;
}
</style>
