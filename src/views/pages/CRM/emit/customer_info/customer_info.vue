<template>
  <div>
    <!-- 右侧 start -->
    <div>
      <div class="m-head clearfix">
        <div class="m-head-tit fl">
          <h4>企业介绍</h4>
        </div>
        <div class="m-head-btn fr">
          <el-button type="primary" size="small">保存</el-button>
          <el-button size="small" @click="back('CorporationList')">返回</el-button>
        </div>
      </div>
      <!-- 编辑 -->
      <div class="m-table-detail">
        <!-- 企业介绍 -->
        <div class="mod-info-tit clearfix">
          <h4>企业介绍</h4>
          <div class="add-edit-btn">
            <ul>
              <li><a href="#"><span class="icon_add_blue" title="添加" /></a></li>
              <li><a href="#"><span class="icon_edit_blue" title="编辑" /></a></li>
              <li><a href="#"><span class="icon_del_blue" title="删除" /></a></li>
            </ul>
          </div>
        </div>
        <!-- 企业介绍内容-->
        <div class="mod-add-form mt15">
          <el-form v-for="item in addForm" :key="item.id" :rules="addRules" label-width="80px" size="small">
            <table class="mod-datatable" @current-change="handleCurrentChange">
              <tbody>
                <tr>
                  <td>
                    <!-- <input v-model="item.title" type="text" class="inp_t" style="width:99%" placeholder="请输入标题"> -->
                    <el-row>
                      <el-col>
                        <el-form-item>
                          <el-input v-model="item.title" />
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </td>
                </tr>
                <tr>
                  <td>
                    <el-row>
                      <el-col>
                        <el-form-item prop="infoExpain">
                          <el-input v-model="item.content" type="textarea" :rows="5" placeholder="" />
                        </el-form-item>
                      </el-col>
                    </el-row>

                  </td>
                </tr>
              </tbody>
            </table>
          </el-form>
        </div>
      </div>

    </div>
    <!-- 右侧 end -->
  </div>
</template>

<script>
import comdes from '@/api/CRM/comdes'
export default {
  name: 'CustomerInfo',
  data() {
    return {
      addForm: [],
      addRules: {
        infoTit: [{}],
        infoExpain: [{}]
      }
    }
  },
  created() {
    this.getComdes()
  },
  methods: {
    handleCurrentChange: function(row) {
      console.log(row)
    },
    // 点击返回功能
    back(pathName) {
      this.$router.push({ name: pathName })
      this.$store.dispatch('app/setLeftSidebarRouters', {})
    },
    // 获取企业介绍
    getComdes() {
      comdes.delList(`compCode=${this.$route.query.compCode}`)
        .then(resp => {
          console.log(resp)
          this.addForm = resp.body
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.mod-datatable tbody tr {
  border-top: 1px solid transparent;
}
.el-form {
  margin-top: 20px;
   border: 1px solid #ccc;
}
</style>
