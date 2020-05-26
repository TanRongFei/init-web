<template>
  <div>
    <!-- 右侧 start -->
    <div>
      <div class="m-head clearfix">
        <div class="m-head-tit fl">
          <h4>资料信息</h4>
        </div>
        <div class="m-head-btn fr">
          <el-button type="primary" size="small">保存</el-button>
          <el-button size="small" @click="back('CorporationList')">返回</el-button>
        </div>
      </div>
      <!-- 编辑 -->
      <div class="m-table-detail">
        <!-- 资料信息 -->
        <div class="mod-info-tit clearfix">
          <h4>资料信息</h4>
          <div class="add-edit-btn">
            <ul>
              <li><a href="#"><span class="icon_add_blue" title="添加" /></a></li>
              <li><a href="#"><span class="icon_edit_blue" title="编辑" /></a></li>
              <li><a href="#" @click.prevent="del"><span class="icon_del_blue" title="删除" /></a></li>
            </ul>
          </div>
        </div>
        <!--  -->
        <div class="table-list mt15">
          <el-table
            :data="fileData"
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
              prop="classify"
              label="分类"
              min-width="15%"
            >
              <template slot="header">
                <p class="tcenter">分类</p>
              </template>
              <template slot-scope="scope">
                <p class="tcenter">{{ scope.row.classify }}</p>
              </template>
            </el-table-column>
            <el-table-column
              prop="fileType"
              label="资料类型"
              min-width="20%"
            >
              <template slot="header">
                <p class="tcenter">资料类型</p>
              </template>
              <template slot-scope="scope">
                <p v-if="scope.row.fileType===1" class="tcenter">统一社会信用代码证</p>
                <p v-else-if="scope.row.fileType===2" class="tcenter">组织机构代码证</p>
                <p v-else-if="scope.row.fileType===3" class="tcenter">营业执照号</p>
                <p v-else-if="scope.row.fileType===4" class="tcenter">税务登记证号</p>
                <p v-else-if="scope.row.fileType===5" class="tcenter">开户许可证</p>
                <p v-else-if="scope.row.fileType===6" class="tcenter">法人身份证</p>
                <p v-else-if="scope.row.fileType===7" class="tcenter">手持法人身份证</p>
                <p v-else-if="scope.row.fileType===8" class="tcenter">管理员身份证</p>
                <p v-else-if="scope.row.fileType===9" class="tcenter">手持管理员身份证</p>
                <p v-else-if="scope.row.fileType===10" class="tcenter">法人授权委托书</p>
                <p v-else-if="scope.row.fileType===11" class="tcenter">其他</p>
                <p v-else-if="scope.row.fileType===12" class="tcenter">电子签名认证证书授权委托书</p>
                <p v-else-if="scope.row.fileType===13" class="tcenter">用户注册与服务协议</p>
                <p v-else-if="scope.row.fileType===14" class="tcenter">授权人证书</p>
                <p v-else-if="scope.row.fileType===15" class="tcenter">管理员授权委托书</p>
              </template>
            </el-table-column>
            <el-table-column
              prop="files"
              label="文件列表"
              min-width="40%"
            >
              <template slot="header">
                <p class="tcenter">文件列表</p>
              </template>
              <template slot-scope="scope">
                {{ scope.row.files }}
                <el-link type="primary">下载</el-link>
                <el-link type="primary" @click="del">删除</el-link>
                <el-link type="primary">上传</el-link>
                <el-upload
                  class="m-upload"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :on-change="handleChange"
                  :file-list="fileList"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="version"
              label="版本"
              min-width="10%"
            >
              <template slot="header">
                <p class="tcenter">版本</p>
              </template>
              <template slot-scope="scope">
                <p class="tcenter">{{ scope.row.version }}</p>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>

    </div>
    <!-- 右侧 end -->
  </div>
</template>

<script>
import delfile from '@/api/CRM/delfile'
export default {
  name: 'CustomerFile',
  data() {
    return {
      bizCode: '',
      fileData: [],
      fileList: []
    }
  },
  methods: {
    // 点击返回功能
    back(pathName) {
      this.$router.push({ name: pathName })
      this.$store.dispatch('app/setLeftSidebarRouters', {})
    },
    // 删除功能
    del() {
      if (this.bizCode === '') {
        alert('请选择数据后再删除')
      } else {
        console.log(this.bizCode)
        delfile.corporationList([this.bizCode])
          .then(resp => {
            if (resp.status === '200') {
              this.getList()
              alert('删除成功')
            } else {
              alert('删除失败')
            }
          })
      }
    },
    setCurrent: function(row) {
      this.$refs.singleTable.setCurrentRow(row)
    },
    handleCurrentChange: function(row) {
      this.currentRow = row
      this.bizCode = row.bizCode
    },
    handleChange: function(file, fileList) {
      this.fileList = fileList.slice(-3)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
