<template>
  <div>
    <head-title :label="'合同'" :showDefaultButton="showDefaultButton">
      <template slot="after">
        <el-button :disabled="disabled" type="primary" size="mini" @click="handleSubmit">保 存</el-button>
        <el-button @click="backToList" type="" size="mini">返 回</el-button>
      </template>
    </head-title>
    <div class="container">
      <el-form :rules="rules" :model="form" label-width="120px" ref="form">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="授信编号">
              <el-input v-model="form.name" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="客户编号">
              <el-input v-model="form.custCode" disabled />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="客户名称">
              <el-select v-model="form.custName" placeholder="请选择" style="width:100%;">
                <el-option :label="item.flag" :value="item.code" v-for="item in creditDict.custName" :key="item.code" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-select v-model="form.region" placeholder="请选择活动区域" style="width:100%;">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-col>
          <el-col :span="12">
            <el-form-item label="归属集团">
              <el-input v-model="form.parentGroup"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="客户经理">
              <el-input v-model="form.createdName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="客户经理等级">
              <el-input v-model="form.managerLevel"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <el-tabs v-model="activeName">
        <el-tab-pane label="客户档案" name="1"></el-tab-pane>
      </el-tabs>

      <el-table :data="form.credPlatAllocationList" style="width: 100%">
        <el-table-column prop="index" label="序号" width="50" align="center" />
        <el-table-column prop="period" label="资料类型" align="center" />
        <el-table-column prop="paydate" label="文件列表" align="center" />
        <el-table-column prop="address" label="版本" align="center" />
      </el-table>

      <form-label :label="'额度信息'" />
      <el-form :rules="rules" :model="form" label-width="120px" ref="form">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="申请日期">
              <el-date-picker
                style="width: 100%;"
                v-model="form.applyDate"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="授信额度">
              <el-input v-model="form.creditAmount"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="循环授信">
              <el-switch
                style="display: block;height:36px;line-height: 36px;"
                v-model="value">
              </el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="授信开始日">
              <el-date-picker
                style="width: 100%;"
                disabled
                v-model="form.creditStartDate"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12"><el-form-item label="授信期限">
            <el-select v-model="form.creditDuration" placeholder="请选择" style="width:100%;">
              <el-option :label="item.flag" :value="item.code" v-for="item in creditDict.duration" :key="item.code" />
            </el-select>
          </el-form-item></el-col>
          <el-col :span="12"><el-form-item label="授信截至日">
            <el-date-picker
              style="width: 100%;"
              disabled
              v-model="form.creditEndDate"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item></el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="已占用授信额度">
              <el-input v-model="form.occupiedAmount" type="number" disabled />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <form-label :label="'额度分配'">
        <template slot="after">
          <el-button @click="handleAdd" type="" icon="el-icon-plus" size="mini" />
          <el-button type="" icon="el-icon-delete" size="mini" />
        </template>
      </form-label>
      <el-table :data="credPlatAllocationList" @selection-change="handleSelectionChange" style="width: 100%">
        <el-table-column type="selection" width="50" />
        <el-table-column type="index" label="序号" width="50" align="center" />
        <el-table-column prop="productName" label="产品" width="180" align="center" />
        <el-table-column prop="allocateAmount" label="分配额度" align="center">
          <template slot-scope="scope">
            <el-input type="number" v-model="scope.row.allocateAmount" />
          </template>
        </el-table-column>
        <el-table-column prop="creditDuration" label="授信期限" align="center">
          <template slot-scope="scope">
            <el-input type="number" v-model="scope.row.creditDuration" disabled />
          </template>
        </el-table-column>
      </el-table>

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import rules from '@/views/mixins/rules'
import AddRouteQuery from '../mixin/add-route-query'
import FormLabel from '@/views/pages/components/form-label'
import HeadTitle from '@/views/pages/components/head-title'
import Model from '@/api/factoring/credit'
import { isPlainObject } from '@/utils'

export default {
  name: 'CreditMgrEditorBasic',
  components: { FormLabel, HeadTitle },
  mixins: [rules, AddRouteQuery],
  data() {
    return {
      disabled: false,
      showDefaultButton: false,
      multipleSelection: [],
      form: {
        occupiedAmount: 0
      },
      a: 0,
      value: false,
      activeName: '1',
      credPlatAllocationList: [] // 额度分配
    }
  },
  computed: {
    ...mapGetters([
      'creditDict'
    ])
  },
  watch: {
    credPlatAllocationList: {
      deep: true,
      handler: function(n) {
        let num = 0
        n.forEach(item => {
          num = num + (item.allocateAmount - 0)
        })
        this.form.occupiedAmount = num
      }
    },
    'form.creditDuration'(n) {
      if (this.credPlatAllocationList && this.credPlatAllocationList.length) {
        this.credPlatAllocationList.map(item => {
          item.creditDuration = n
          return item
        })
      }
    }
  },
  created() {
    this.fetchDetail()
  },
  methods: {
    fetchDetail() {
      const bizCode = this.$route.query.bizCode
      if (!bizCode) return
      Model.fetchCreditPlatform(bizCode).then(res => {
        console.log(res)
        if (!res) return
        this.form = JSON.parse(JSON.stringify(res))
        this.credPlatAllocationList = JSON.parse(JSON.stringify(res.credPlatAllocationList))
      })
    },
    handleSubmit() {
      this.disabled = true
      this.$refs.form.validate((valid) => {
        if (valid) {
          Model.saveCreditPlatform(this.form).then(res => {
            if (isPlainObject(this.$route.query)) {
              this.$router.push({ name: 'deduction-editor', query: { bizCode: res.bizCode }})
            } else {
              this.fetchDetail()
            }
            this.disabled = false
          }).catch(() => {
            this.disabled = false
          })
        } else {
          console.log('error submit!!')
          return false;
        }
      })
    },
    handleAdd() {
      // 额度分配
      const temp = {
          productCode: '',
          productName: '',
          allocateAmount: '',
          creditDuration: this.form.creditAmount
        }
      this.credPlatAllocationList.push(temp)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/styles/editor.scss";

</style>
