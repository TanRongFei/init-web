<template>
  <div>
    <head-title :label="'资料信息'" :showDefaultButton="showDefaultButton">
      <template slot="after">
        <el-button :disabled="disabled" type="primary" size="mini" @click="handleSubmit">保 存</el-button>
        <el-button @click="backToList" type="" size="mini">返 回</el-button>
      </template>
    </head-title>
    <div class="container">
      <form-label :label="'额度信息'">
        <template slot="after">
          <el-button @click="handleAdd" type="" icon="el-icon-plus" size="mini" />
          <el-button type="" icon="el-icon-delete" size="mini" />
        </template>
      </form-label>

      <el-table :data="credFileList" style="width: 100%">
        <el-table-column prop="dataList" label="资料清单" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.dataList" />
          </template>
        </el-table-column>
        <el-table-column prop="isMust" label="必要件" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.isMust" />
          </template>
        </el-table-column>
        <el-table-column prop="isCopy" label="复印件" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.isCopy" />
          </template>
        </el-table-column>
        <el-table-column prop="isOriginal" label="原件" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.isOriginal" />
          </template>
        </el-table-column>
        <el-table-column prop="" label="附件" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.dataList" />
          </template>
        </el-table-column>
        <el-table-column prop="createdName" label="上传人" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.createdName" />
          </template>
        </el-table-column>
        <el-table-column prop="recordDate" label="上传时间" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.recordDate" />
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" align="center" />
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

export default {
  name: 'CreditMgrEditorCreditFile',
  components: { FormLabel, HeadTitle },
  mixins: [rules, AddRouteQuery],
  data() {
    return {
      disabled: false,
      showDefaultButton: false,
      multipleSelection: [],
      form: {},
      value: false,
      activeName: '1',
      credFileList: []
    }
  },
  computed: {
    ...mapGetters([
      'dict'
    ])
  },
  created() {
    this.fetchDetail()
  },
  methods: {
    fetchDetail() {
      const bizCode = this.$route.query.bizCode
      if (!bizCode) return
      Model.fetchCredFile(bizCode).then(res => {
        console.log(res)
        if (!res) return
        this.form = JSON.parse(JSON.stringify(res))
        this.credPlatAllocationList = JSON.parse(JSON.stringify(res.credPlatAllocationList))
      })
    },
    handleSubmit() {
      this.disabled = true

      const param = {
        bizCode: this.$route.query.bizCode,
        credFileList: this.credFileList
      }

      Model.saveCredFile(param).then(res => {
        this.fetchDetail()
        this.disabled = false
      }).catch(() => {
        this.disabled = false
      })
    },
    handleAdd() {
      // 额度分配
      const temp = {
        dataList: '',
        isMust: '',
        isCopy: '',
        isOriginal: '',
        createdName: '',
        recordDate: ''
      }
      this.credFileList.push(temp)
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
