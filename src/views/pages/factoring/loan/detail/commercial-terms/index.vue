<template>
  <div class="basic-info">
    <head-title :label="'前期款'" :showDefaultButton="false">
      <template slot="after">
        <el-button type="primary" size="mini">保 存</el-button>
        <el-button type="" size="mini">返 回</el-button>
      </template>
    </head-title>

    <el-card shadow="nerve">
      <div class="form-wrap">
        <div class="item">
          <span class="label">申请金额</span>
          <span></span>
        </div>
        <div class="item">
          <span class="label">保证金</span>
          <span></span>
        </div>
        <div class="item">
          <span class="label">手续费率</span>
          <span></span>
        </div>
        <div class="item">
          <span class="label">关联合同号</span>
          <span></span>
        </div>
      </div>

      <form-label :label="'服务费'" />
      <div class="wrap">
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="item">
              <span class="label">币种</span>
              <el-input />
            </div>
          </el-col>
          <el-col :span="8">
            <div class="item">
              <span class="label">服务金额</span>
              <span>200</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="item">
              <span class="label">服务费收取实点</span>
              <el-select v-model="form.region" placeholder="请选择" style="width:100%;">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="item">
              <span class="label">收款单位</span>
              <el-select v-model="form.region" placeholder="请选择" style="width:100%;">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="item">
              <span class="label">收款银行</span>
              <el-select v-model="form.region" placeholder="请选择" style="width:100%;">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="item">
              <span class="label">收款账号</span>
              <el-input />
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="item">
              <span class="label">收款单位</span>
              <el-select v-model="form.region" placeholder="请选择" style="width:100%;">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="item">
              <span class="label">收款银行</span>
              <el-select v-model="form.region" placeholder="请选择" style="width:100%;">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="item">
              <span class="label">收款账号</span>
              <el-input />
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="item">
              <span class="label">收款金额</span>
              <el-input />
            </div>
          </el-col>
          <el-col :span="8">
            <div class="item">
              <span class="label">计划收款日期</span>
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
              <span class="label">实收日期</span>
              <el-date-picker
                v-model="form.date"
                style="width: 100%;"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </div>
          </el-col>
        </el-row>
      </div>

      <form-label :label="'保证金'" />
      <div class="wrap">
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="item">
              <span class="label">币种</span>
              <el-input />
            </div>
          </el-col>
          <el-col :span="8">
            <div class="item">
              <span class="label">服务金额</span>
              <span>200</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="item">
              <span class="label">服务费收取实点</span>
              <el-select v-model="form.region" placeholder="请选择" style="width:100%;">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="item">
              <span class="label">收款单位</span>
              <el-select v-model="form.region" placeholder="请选择" style="width:100%;">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="item">
              <span class="label">收款银行</span>
              <el-select v-model="form.region" placeholder="请选择" style="width:100%;">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="item">
              <span class="label">收款账号</span>
              <el-input />
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="item">
              <span class="label">收款单位</span>
              <el-select v-model="form.region" placeholder="请选择" style="width:100%;">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="item">
              <span class="label">收款银行</span>
              <el-select v-model="form.region" placeholder="请选择" style="width:100%;">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="item">
              <span class="label">收款账号</span>
              <el-input />
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="item">
              <span class="label">收款金额</span>
              <el-input />
            </div>
          </el-col>
          <el-col :span="8">
            <div class="item">
              <span class="label">计划收款日期</span>
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
              <span class="label">实收日期</span>
              <el-date-picker
                v-model="form.date"
                style="width: 100%;"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
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
    name: 'CommercialTerms',
    components: {
      HeadTitle,
      FormLabel
    },
    data() {
      return {
        tableData: [],
        form: {}
      }
    }
  }
</script>

<style lang="scss" scoped>
  .form-wrap{
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 20px;
    .item{
      flex: 0 0 50%;
      height: 32px;
      line-height: 32px;
    }
  }

  .wrap{
    .item{
      display: flex;
      align-items: center;
      min-height: 36px;
      >*{
        flex: 1;
      }
      .label{
        flex: 0 0 100px;
      }
    }

    .el-row{
      margin-bottom: 10px;
    }
  }
</style>
