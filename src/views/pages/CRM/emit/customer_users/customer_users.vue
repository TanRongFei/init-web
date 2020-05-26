<template>
  <div>
    <!-- 右侧 start -->
    <div>
      <div class="m-head clearfix">
        <div class="m-head-tit fl">
          <h4>企业用户</h4>
        </div>
        <div class="m-head-btn fr">
          <el-button type="primary" @click.prevent="save()">保存</el-button>
          <el-button size="small" @click="back('CorporationList')">返回</el-button>
        </div>
      </div>
      <!-- 编辑 -->
      <div class="m-table-detail">
        <!-- 添加 -->
        <div class="mod-info-tit clearfix">
          <h4>企业用户信息</h4>
          <div class="add-edit-btn">
            <ul>
              <li><a href="#" class="m-btn" @click.prevent="qy()">启用</a></li>
              <li><a href="#" class="m-btn" @click.prevent="jy()">禁用</a></li>
              <li><a href="#"><span class="icon_add_blue" title="添加" /></a></li>
              <li><a href="#" @click.prevent="save()"><span class="icon_edit_blue" title="编辑" /></a></li>
              <li><a href="#" @click.prevent="del()"><span class="icon_del_blue" title="删除" /></a></li>
            </ul>
          </div>
        </div>
        <!--  -->
        <div class="table-list mt15">
          <el-form :rules="usersrules">
            <el-table
              :data="usersData"
              border
              stripe
              style="width: 100%"
              @current-change="handleCurrentChange"
            >
              <el-table-column
                fixed
                prop="numb"
                label="序号"
                min-width="80"
              >
                <template slot-scope="scope">
                  <p class="tcenter">{{ scope.$index+1 }}</p>
                </template>
              </el-table-column>
              <el-table-column
                prop="status"
                label="启用状态"
                min-width="100"
              >
                <template slot-scope="scope">
                  <el-form-item :prop="'usersData.' + scope.$index + '.status'" :rules="usersrules.state" size="small">
                    <el-select v-model="scope.row.status" placeholder="启用" size="small" style="width:100%">
                      <el-option v-for="item in stateOpt" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column
                prop="userName"
                label="用户名"
                min-width="150"
              >
                <template slot-scope="scope">
                  <el-form-item :prop="'usersData.' + scope.$index + '.userName'" :rules="usersrules.usersName" size="small">
                    <el-input v-model="scope.row.userName" placeholder="" />
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column
                prop="mobile"
                label="手机号"
                min-width="150"
              >
                <template slot-scope="scope">
                  <el-form-item :prop="'usersData.' + scope.$index + '.mobile'" :rules="usersrules.usersPhone" size="small">
                    <el-input v-model="scope.row.mobile" placeholder="" />
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column
                prop="idType"
                label="证件类型"
                min-width="150"
              >
                <template slot-scope="scope">
                  <el-form-item :prop="'usersData.' + scope.$index + '.idType'" :rules="usersrules.usersName" size="small">
                    <el-select v-model="scope.row.idType" placeholder="身份证" size="small" style="width:100%">
                      <el-option v-for="item in certificateTypeOpt" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column
                prop="idCard"
                label="证件号码"
                min-width="150"
              >
                <template slot-scope="scope">
                  <el-form-item :prop="'usersData.' + scope.$index + '.idCard'" :rules="usersrules.certificateNo" size="small">
                    <el-input v-model="scope.row.idCard" placeholder="" />
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column
                prop="email"
                label="邮箱"
                min-width="160"
              >
                <template slot-scope="scope">
                  <el-form-item :prop="'usersData.' + scope.$index + '.email'" :rules="usersrules.email" size="small">
                    <el-input v-model="scope.row.email" placeholder="" />
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column
                prop="isReg"
                label="是否注册"
                min-width="100"
              >
                <template slot-scope="scope">
                  <el-form-item :prop="'usersData.' + scope.$index + '.isReg'" :rules="usersrules.isReg" size="small">
                    <el-select v-model="scope.row.isReg" placeholder="是" size="small" style="width:100%">
                      <el-option v-for="item in isRegOpt" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column
                prop="rootManager"
                label="管理员"
                min-width="100"
              >
                <template slot-scope="scope">
                  <el-form-item :prop="'usersData.' + scope.$index + '.rootManager'" :rules="usersrules.isAdmin" size="small">
                    <el-select v-model="scope.row.rootManager" size="small" style="width:100%">
                      <el-option v-for="item in isAdminOpt" :key="item.id" :label="item.label" :value="item.id" />
                    </el-select>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column
                prop="employeeRole"
                label="用户角色"
                min-width="100"
              >
                <template slot-scope="scope">
                  <el-form-item :prop="'usersData.' + scope.$index + '.employeeRole'" :rules="usersrules.usersRole" size="small">
                    <el-select v-model="scope.row.employeeRole" placeholder="经办" size="small" style="width:100%">
                      <el-option v-for="item in usersRoleOpt" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </el-form-item>
                </template>
              </el-table-column>
            </el-table>
          </el-form>
        </div>
      </div>

    </div>
    <!-- 右侧 end -->
  </div>
</template>

<script>
import cusrUser from '@/api/CRM/cus_user'
import qy from '@/api/CRM/qycomp'
import jy from '@/api/CRM/jycomp'
import del from '@/api/CRM/delcomp'
import save from '@/api/CRM/savecomp'
export default {
  name: 'CustomerUsers',
  data() {
    return {
      bizCode: '',
      email: '',
      employeeCode: '',
      gender: '',
      idType: '',
      idCard: '',
      mobile: '',
      password: '',
      rootManager: '',
      userCode: '',
      userName: '',
      usersData: [],
      stateOpt: [
        { value: 1, label: '启用' },
        { value: 0, label: '禁用' }
      ],
      certificateTypeOpt: [
        { value: 1, label: '身份证' },
        { value: 3, label: '港澳台通行证' },
        { value: 4, label: '台胞通行证' },
        { value: 5, label: '护照' }
      ],
      isRegOpt: [
        { value: 1, label: '是' },
        { value: 0, label: '否' }
      ],
      isAdminOpt: [
        { id: 1, label: '是' },
        { id: 0, label: '否' }
      ],
      usersRoleOpt: [
        { value: 20, label: '经办人' },
        { value: 30, label: '复核人' },
        { value: 40, label: '查询' },
        { value: 50, label: '放款初审' },
        { value: 60, label: '放款复审' }
      ],
      usersrules: {
        state: [{}],
        usersName: [{}],
        usersPhone: [{}],
        certificateType: [{}],
        certificateNo: [{}],
        email: [{}],
        isRegOpt: [{}],
        isAdmin: [{}],
        usersRole: [{}]
      }
    }
  },
  created() {
    this.getCusUser()
  },
  methods: {
    // 获取当前企业用户列表
    getCusUser() {
      cusrUser.delList(`compCode=${this.$route.query.compCode}`)
        .then(resp => {
          console.log(resp)
          this.usersData = resp.body
          for (const item of this.usersData) {
            console.log(item)
          }
        })
    },
    // 禁用
    jy() {
      if (this.bizCode === '') {
        alert('请选中需禁用的列表')
      } else {
        jy.delList(`bizCode=${this.bizCode}`)
          .then(resp => {
            console.log(resp)
            if (resp.status === '200') {
              alert('禁用成功')
              this.getCusUser()
            }
          })
      }
    },
    // 启用
    qy() {
      console.log(this.bizCode)
      if (this.bizCode === '') {
        alert('请选中需启用的列表')
      } else {
        qy.delList(`bizCode=${this.bizCode}`)
          .then(resp => {
            console.log(resp)
            if (resp.status === '200') {
              alert('启用成功')
              this.getCusUser()
            }
          })
      }
    },
    // 删除
    del() {
      if (this.bizCode === '') {
        alert('请选中需删除的列表')
      } else {
        console.log(this.bizCode)
        del.corporationList([this.bizCode])
          .then(resp => {
            console.log(resp)
            if (resp.status === '200') {
              alert('删除成功')
              this.getCusUser()
            }
          })
      }
    },
    // 保存
    save() {
      if (this.bizCode === '') {
        alert('请选择需修改的列表')
      } else {
        save.corporationList({
          eleList: {
            compCode: this.$route.query.compCode,
            email: this.email,
            employeeCode: this.employeeCode,
            gender: this.gender,
            idType: this.idType,
            idCard: this.idCard,
            mobile: this.mobile,
            password: this.password,
            rootManager: this.rootManager,
            userCode: this.userCode,
            userName: this.userName
          }
        })
          .then(resp => {
            console.log(resp)
            if (resp.status === '200') {
              alert('保存成功')
              this.getCusUser
            }
          })
      }
    },
    // 点击返回功能
    back(pathName) {
      this.$router.push({ name: pathName })
      this.$store.dispatch('app/setLeftSidebarRouters', {})
    },
    handleCurrentChange(row) {
      this.bizCode = row.bizCode
      this.email = row.email
      this.employeeCode = row.employeeCode
      this.gender = row.gender
      this.idType = row.idType
      this.idCard = row.idCard
      this.mobile = row.mobile
      this.password = row.password
      this.rootManager = row.rootManager
      this.userCode = row.userCode
      this.userName = row.userName
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

