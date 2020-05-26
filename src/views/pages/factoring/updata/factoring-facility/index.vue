<template>
  <div class="basic-info">
    <div class="tab-menu">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="授信信息" name="first"></el-tab-pane>
        <el-tab-pane label="应收账款" name="second"></el-tab-pane>
      </el-tabs>

      <div class="btn-wrap">
        <el-button type="primary" size="mini">保 存</el-button>
        <el-button type="" size="mini">返 回</el-button>
      </div>
    </div>

    <!--授信信息-->
    <el-card v-show="activeName === 'first'" shadow="never">
      <form-label :label="'基本信息'" />
      <div class="wrap">
        <base-form />
      </div>

      <form-label :label="'授信产品'" />
      <div class="wrap">
        <products-form />
      </div>

      <form-label :label="'交易对象'" />
      <div class="wrap">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column type="index" label="序号" width="50" align="center" />
          <el-table-column prop="date" label="状态" align="center" />
          <el-table-column prop="date" label="买/卖方名称" align="center" />
          <el-table-column prop="name" label="额度" align="center" />
          <el-table-column prop="name" label="剩余额度" align="center" />
          <el-table-column prop="name" label="说明" align="center" />
        </el-table>
      </div>

      <form-label :label="'用信前提'" />
      <div class="wrap">
        <premise-form />
      </div>

      <form-label :label="'放款前提'" />
      <div class="wrap">
        <premise-form />
      </div>
    </el-card>

    <!--应收账款-->
    <el-card v-show="activeName === 'second'" shadow="never">
      <el-form label-width="100px">
        <el-form-item label="应收账款类型">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.code"
              :label="item.label"
              :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <form-label :label="'基础交易合同'">
        <template slot="after">
          <el-button type="" icon="el-icon-plus" size="mini"></el-button>
          <el-button type="" icon="el-icon-delete" size="mini"></el-button>
        </template>
      </form-label>

      <div class="wrap">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column type="index" label="序号" width="50" align="center" />
          <el-table-column prop="date" label="合同名称" align="center" />
          <el-table-column prop="date" label="合同编号" align="center" />
          <el-table-column prop="name" label="合同金额" align="center" />
          <el-table-column prop="name" label="应收账款转让金额" align="center" />
          <el-table-column prop="name" label="签署日期" align="center" />
          <el-table-column prop="name" label="备注" align="center" />
          <el-table-column prop="name" label="附件" align="center" />
        </el-table>
      </div>

      <form-label :label="'应收账款'">
        <template slot="after">
          <el-button type="" size="mini">发票验证</el-button>
          <el-button type="" size="mini">下载模板</el-button>
          <el-button type="" size="mini">批量上传</el-button>
          <el-button type="" size="mini">批量删除</el-button>
          <el-button type="" icon="el-icon-plus" size="mini"></el-button>
          <el-button type="" icon="el-icon-delete" size="mini"></el-button>
        </template>
      </form-label>

      <div class="wrap">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column type="index" label="序号" width="50" align="center" />
          <el-table-column prop="date" label="票据类型" align="center" />
          <el-table-column prop="date" label="发票代码" align="center" />
          <el-table-column prop="name" label="发票代号" align="center" />
          <el-table-column prop="name" label="发票验证码后六位" align="center" />
          <el-table-column prop="name" label="购买方" align="center" />
          <el-table-column prop="name" label="发票金额" align="center" />
          <el-table-column prop="name" label="开票日期" align="center" />
          <el-table-column prop="name" label="结算方式" align="center" />
          <el-table-column prop="name" label="附件" align="center" />
          <el-table-column prop="name" label="验票真伪" align="center" />
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
import HeadTitle from '../../../components/head-title'
import FormLabel from '../../../components/form-label'
import BaseForm from './components/base-form'
import ProductsForm from './components/products-form'
import PremiseForm from './components/premise-form'

export default {
  name: 'FactoringFacility',
  components: {
    HeadTitle,
    FormLabel,
    BaseForm,
    ProductsForm,
    PremiseForm
  },
  data() {
    return {
      tableData: [],
      options: [
        {
          label: '发票',
          code: '1'
        }
      ],
      value: '',
      activeName: 'first'
    }
  },
  methods: {
    handleClick(e, event) {}
  }
}
</script>

<style lang="scss" scoped>
.wrap{
  margin-bottom: 20px;
}
.tab-menu{
  display: flex;
  align-items: center;
  justify-content: space-between;
  .btn-wrap{
    padding: 0 15px;
  }
}
</style>
