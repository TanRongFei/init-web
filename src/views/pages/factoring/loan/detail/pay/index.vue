<template>
  <div class="basic-info">
    <head-title :label="'付款信息'" :showDefaultButton="false">
      <template slot="after">
        <el-button type="primary" size="mini">保 存</el-button>
        <el-button type="" size="mini">返 回</el-button>
      </template>
    </head-title>

    <el-card shadow="nerve">
      <el-row :gutter="20">
        <el-col>
          <span class="label">放款申请金额</span>
          <span>8000000</span>
        </el-col>
      </el-row>

      <form-label :label="'收款单位'">
        <template slot="after">
          <el-button type="" icon="el-icon-plus" size="mini"></el-button>
          <el-button type="" icon="el-icon-delete" size="mini"></el-button>
        </template>
      </form-label>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号" width="50" align="center" />
        <el-table-column prop="address" label="收款单位" align="center"></el-table-column>
        <el-table-column prop="address" label="开户银行" align="center"></el-table-column>
        <el-table-column prop="address" label="账号" align="center"></el-table-column>
        <el-table-column prop="address" label="付款金额" align="center"></el-table-column>
      </el-table>

      <div class="wrap">
        <el-row>
          <el-col :span="24">
            <div class="item">
              <span class="label">支付方式</span>
              <el-checkbox-group v-model="checkList">
                <el-checkbox label="1">现金</el-checkbox>
                <el-checkbox label="2">网银</el-checkbox>
                <el-checkbox label="3">其他</el-checkbox>
              </el-checkbox-group>
            </div>
          </el-col>

          <el-col :span="24">
            <div class="item">
              <span class="label">备注</span>
              <el-input />
            </div>
          </el-col>
        </el-row>
      </div>

      <form-label :label="'实付信息'" />
      <div class="wrap">
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="item">
              <span class="label">付款单位</span>
              <el-select v-model="form.region" placeholder="请选择" style="width:100%;">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </div>
          </el-col>

          <el-col :span="8">
            <div class="item">
              <span class="label">付款银行</span>
              <el-select v-model="form.region" placeholder="请选择" style="width:100%;">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </div>
          </el-col>

          <el-col :span="8">
            <div class="item">
              <span class="label">付款账号</span>
              <el-input />
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="8">
            <div class="item">
              <span class="label">付款日期</span>
              <el-date-picker
                v-model="form.date"
                style="width: 100%;"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </div>
          </el-col>

          <el-col :span="8">
            <div class="item">
              <span class="label">付款金额</span>
              <el-input />
            </div>
          </el-col>

          <el-col :span="8">
            <div class="item">
              <span class="label">实付金额</span>
              <el-input />
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="24">
            <div class="item">
              <span class="label">付款单位</span>
              <el-checkbox-group v-model="checkList">
                <el-checkbox label="1">现金</el-checkbox>
                <el-checkbox label="2">网银</el-checkbox>
                <el-checkbox label="3">其他</el-checkbox>
              </el-checkbox-group>
            </div>
          </el-col>

        </el-row>

        <el-row :gutter="20">
          <el-col :span="24">
            <div class="item">
              <span class="label">备注</span>
              <el-input />
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
import HeadTitle from '@/views/pages/components/head-title'
import FormLabel from '@/views/pages/components/form-label'

export default {
  name: 'Information',
  components: {
    HeadTitle,
    FormLabel
  },
  data() {
    return {
      form: {},
      tableData: [],
      checkList: []
    }
  }
}
</script>

<style lang="scss" scoped>
  .wrap{
    .item{
      display: flex;
      height: 36px;
      line-height: 36px;
      margin-bottom: 10px;
      .label{
        width: 100px;
      }
    }
  }

</style>
