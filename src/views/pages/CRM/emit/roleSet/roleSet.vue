<template>
  <div>
    <!-- 右侧 start -->
    <div>
      <div class="m-head clearfix">
        <div class="m-head-tit fl">
          <h4>角色设置</h4>
        </div>
        <div class="m-head-btn fr">
          <el-button type="primary" size="small" @click="bao()">保存</el-button>
          <el-button size="small" @click="back('CorporationList')">返回</el-button>
        </div>
      </div>
      <!-- 编辑 -->
      <div class="m-table-detail">
        <!-- 选择角色 -->
        <div class="mt">
          <span>快捷角色组合选择</span>
          <el-select v-model="roleSelect" placeholder="核心企业成员单位" size="small" style="width:200px">
            <el-option v-for="item in compRoles" :key="item.code" :label="item.mark" :value="item.code" />
          </el-select>
        </div>
        <!--  -->
        <div class="table-list">
          <el-table
            :data="tableData"
            highlight-current-row
            border
            stripe
            style="width: 100%"
            @current-change="handleCurrentChange"
          >
            <el-table-column
              prop="check"
              label=""
              min-width="5%"
            >
              <p class="tcenter"><el-checkbox /></p>
            </el-table-column>
            <el-table-column
              prop="custRole"
              label="企业角色"
              min-width="30%"
            >
              <template slot="header">
                <p class="tcenter">企业角色</p>
              </template>
              <template slot-scope="scope">
                <p class="tcenter">{{ scope.row.custRole }}</p>
              </template>
            </el-table-column>
            <el-table-column
              prop="explain"
              label="说明"
              min-width="40%"
            >
              <template slot="header">
                <p class="tcenter">说明</p>
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
import getRole from '@/api/CRM/lookrole'
import Role from '@/api/CRM/roleset'
export default {
  name: 'RoleSet',
  data() {
    return {
      roleSelect: '',
      compRoles: [
        { code: 'C101', mark: '核心企业' },
        { code: 'C102', mark: '供应商' },
        { code: 'C103', mark: '保理公司' },
        { code: 'C104', mark: '资金方' },
        { code: 'C201', mark: '买方' },
        { code: 'C202', mark: '卖方' },
        { code: 'C203', mark: '担保方' },
        { code: 'C204', mark: '抵押方' },
        { code: 'C205', mark: '质押方' },
        { code: 'C206', mark: '经销方' }
      ],
      tableData: [
        {
          custRole: '核心企业角色',
          explain: '授信'
        },
        {
          custRole: '成员单位角色',
          explain: '额度、开具'
        },
        {
          custRole: '供应商角色',
          explain: '签收、信单、转让、融资'
        },
        {
          custRole: '增信机构角色',
          explain: '担保'
        },
        {
          custRole: '资金方角色',
          explain: '融资、资产管理'
        },
        {
          custRole: '机构投资人角色',
          explain: '资产管理'
        },
        {
          custRole: '第三方服务公司角色',
          explain: '结算体系'
        }
      ]
    }
  },
  created() {
    this.role()
  },
  methods: {
    // 获取当前企业角色
    role() {
      getRole.delList(`compCode=${this.$route.query.code}`)
        .then(resp => {
          console.log(resp)
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 点击保存功能
    bao() {
      Role.corporationList([
        {
          compRole: '',
          compCode: this.$route.query.compCode
        },
        {
          compRole: '',
          compCode: this.$route.query.compCode
        }
      ]
      ).then(resp => {
        console.log(resp)
        if (resp.status === '200') {
          alert('保存成功')
          this.getRole()
        } else {
          alert('保存失败')
        }
      })
    },
    // 点击返回功能
    back(pathName) {
      this.$router.push({ name: pathName })
      this.$store.dispatch('app/setLeftSidebarRouters', {})
    },
    setCurrent: function(row) {
      this.$refs.singleTable.setCurrentRow(row)
    },
    handleCurrentChange: function(val) {
      this.currentRow = val
    }
  }
}
</script>

<style lang="scss">

</style>
