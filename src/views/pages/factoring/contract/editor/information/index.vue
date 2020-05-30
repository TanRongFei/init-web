<template>
  <div class="basic-info">
    <head-title :label="''" :showDefaultButton="false">
      <template slot="after">
        <el-button :disabled="disabled" @click="handleSave" type="primary" size="mini">保 存</el-button>
        <el-button @click="backToList" type="" size="mini">返 回</el-button>
      </template>
    </head-title>

    <el-card shadow="nerve">
      <form-label :label="'资料信息'">
        <template slot="after">
          <el-button @click="handleAdd" type="" icon="el-icon-plus" size="mini"></el-button>
          <el-button type="" icon="el-icon-delete" size="mini"></el-button>
        </template>
      </form-label>

      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="datumName" label="资料清单" width="180" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.datumName" />
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
        <el-table-column prop="address" label="附件" align="center">
          <template slot-scope="scope">
<!--            <el-button type="primary" size="mini">附件上传</el-button>-->
            <file-upload />
            <div v-for="item in scope.row.contFiledetailDTO">
              <span>{{item.name}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="recordUserName" label="上传人" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.recordUserName" />
          </template>
        </el-table-column>
        <el-table-column prop="recordDate" label="上传时间" align="center">
          <template slot-scope="scope">
            <el-date-picker
              v-model="scope.row.recordDate"
              style="width: 100%;"
              type="date"
              placeholder="选择日期" />
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.remark" />
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import HeadTitle from '@/views/pages/components/head-title'
import FormLabel from '@/views/pages/components/form-label'
import Model from "@/api/factoring/contract";
import AddRouterQuery from '../mixin/add-route-query'
import FileUpload from '@/views/pages/components/file-upload'

export default {
  name: 'Information',
  components: {
    HeadTitle,
    FormLabel,
    FileUpload
  },
  mixins: [AddRouterQuery],
  data() {
    return {
      disabled: false,
      contFiledetail: {
        contBizCode: this.$route.query.bizCode ? this.$route.query.bizCode : '',
        datumName: '',
        isMust: '',
        isCopy: '',
        isOriginal: '',
        recordUserName: '',
        recordDate: '',
        remark: '',
        contFiledetailDTO: []
      },
      tableData: [
        {}
      ]
    }
  },
  created() {
    this.fetchDetail()
  },
  methods: {
    fetchDetail() {
      const bizCode = this.$route.query.bizCode
      if (!bizCode) return
      Model.fileView(bizCode).then(res => {
        console.log(res)
        if (!res) return
        this.tableData = res.contFileDTO ? res.contFileDTO : []
      })
    },
    handleSave() {
      this.disabled = true

      const param = {
        contFileDTO: this.tableData
      }
      Model.fileSave(param).then((res => {
        this.fetchDetail()
        this.disabled = false
      })).catch(() => {
        this.disabled = false
      })
    },
    handleAdd() {
      const temp = JSON.parse(JSON.stringify(this.contFiledetail))
      this.tableData.push(temp)
    }
  }
}
</script>

<style scoped>

</style>
