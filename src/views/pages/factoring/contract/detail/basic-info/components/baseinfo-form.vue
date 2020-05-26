<template>
  <el-form :rules="rules" :model="form" label-width="155px" :label-position="'left'" ref="form">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="项目名称">
          <el-input v-model="form.contName" disabled />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="合同编号" >
          <el-input v-model="form.contCode" />
        </el-form-item>
      </el-col>

      <el-col :span="6">
        <el-form-item label="合同类型" >
          <el-select v-model="form.contractType" placeholder="请选择" style="width:100%;">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="预计签约时间" prop="signatureTime">
          <el-date-picker
            v-model="form.signatureTime"
            style="width: 100%;"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="预计回购时间" prop="region">
          <el-date-picker
            v-model="form.repoTime"
            style="width: 100%;"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="签约地址" >
          <el-input v-model="form.contractArea1"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="签署地" >
          <el-input v-model="form.signature"></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="客户经理" prop="contPmId">
          <el-select v-model="form.contPmId" placeholder="请选择" style="width:100%;">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="所属部门">
          <el-select v-model="form.pmDept" placeholder="请选择" style="width:100%;">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
          <el-form-item label="业务板块" >
          <el-row :gutter="20">
            <el-col :span="12">
              <el-select v-model="form.region" placeholder="请选择" style="width:100%;">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-col>
            <el-col :span="12">
              <el-select v-model="form.region" placeholder="请选择" style="width:100%;">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="项目助理">
          <el-select v-model="form.prjtAm" placeholder="请选择" style="width:100%;">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="基础合同编号及名称" >
          <el-row :gutter="20">
            <el-col :span="12">
              <el-input v-model="form.basicContractCode" />
            </el-col>
            <el-col :span="12">
              <el-input v-model="form.basicContractName" />
            </el-col>
          </el-row>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="基础合同签署时间" >
          <el-date-picker
            v-model="form.basicContractSigndate"
            type="date"
            style="width: 100%;"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="授信编号" prop="platcredBizcode">
          <el-input v-model="form.platcredBizcode" disabled />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="项目类型" prop="businessType">
          <el-select v-model="form.businessType" placeholder="请选择" style="width:100%;">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="签署方式" prop="signWay">
          <el-select v-model="form.signWay" placeholder="请选择" style="width:100%;">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="区域" >
          <el-select v-model="form.custArea1" placeholder="请选择" style="width:100%;">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import rules from '@/views/mixins/rules'

export default {
  name: 'BaseinfoForm',
  mixins: [rules],
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      form: {}
    }
  },
  created() {
    this.form = JSON.parse(JSON.stringify(this.data))
    console.log(this.form)
  }
}
</script>

<style scoped>

</style>
