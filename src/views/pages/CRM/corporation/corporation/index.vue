<template>
  <div class="enterprise-customers page">
    <head-title :label="'企业客户'" :total="100" />

    <table-search ref="searchValueq">
      <template slot="after">
         <div>高级搜索</div>
      </template>
    </table-search>
    <button  @click="compdel">删除</button>

    <side-tool key="enterprise-customers" ref="sideTool" :label="'客户管理'" :data="multipleSelection">
      <template slot="after" />
    </side-tool>

  <div class="table-list">
          <el-table
          :data="pageInfo.list"
          highlight-current-row
          @current-change="rowSelect"
          border stripe
          style="width: 100%">
            <el-table-column
              prop="check"
              label=""
              min-width="5%">
              <el-checkbox></el-checkbox>
            </el-table-column>
            <el-table-column
              prop="status"
              label="启用状态"
              min-width="8%">
           <template slot-scope="scope">
              <p class="tcenter">
                  <span>{{showDict(scope.row.status,'enableStatus')}}</span>
              </p>
            </template>
            </el-table-column>
            <el-table-column
              prop="compStatus"
              label="客户状态"
              min-width="8%">
              <template slot-scope="scope">
              <p class="tcenter">
                  <span>{{showDict(scope.row.compStatus,'compStatus')}}</span>
              </p>
            </template>
            </el-table-column>
            <el-table-column
              prop="isCollect"
              label="资料收集"
              min-width="8%">
              <template slot-scope="scope">
              <p class="tcenter">
                  <span>{{showDict(scope.row.isCollect,'collect')}}</span>
              </p>
              </template>
            </el-table-column>
            <el-table-column
              prop="isReg"
              label="注册方式"
              min-width="8%">
              <template slot-scope="scope">
              <p class="tcenter">
                  <span>{{showDict(scope.row.regType,'isRegs')}}</span>
              </p>
              </template>
            </el-table-column>
            <el-table-column
              prop="compCode"
              label="客户编号"
              min-width="10%">
            </el-table-column>
            <el-table-column
              prop="compName"
              label="企业名称"
              min-width="13%">
            </el-table-column>
            <el-table-column
              prop="usccCode"
              label="统一社会信用代码"
              min-width="12%">
            </el-table-column>
            <el-table-column
              prop="compRole"
              label="角色"
              min-width="8%">
            </el-table-column>
            <el-table-column
              prop="custType"
              label="客户类型"
              min-width="8%">
               <template slot-scope="scope">
              <p class="tcenter">
                  <span>{{showDict(scope.row.custType,'corpTypes')}}</span>
              </p>
              </template>
            </el-table-column>
            <el-table-column
              prop="createdTime"
              label="创建时间"
              min-width="12%">
            </el-table-column>
          </el-table>
        </div>
    <div class="pagination-wrap">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageInfo.pageNum"
        :page-sizes="[3, 20, 30, 40]"
        layout="prev, pager, next, sizes, jumper"
        :page-size="pageInfo.pageSize"
        :total="pageInfo.total" />
    </div>

  </div>
</template>

<script>
import HeadTitle from '@/views/pages/components/head-title'
import TableSearch from '@/views/pages/components/table-search'
import SideTool from '@/views/pages/components/SideTool'
import Corporation from '@/api/crm/corporation/corporation/corporation';
export default {
  name: 'pageQueryList',
  components: {
    HeadTitle,
    TableSearch,
    SideTool
  },
  data() {
    return {
      multipleSelection: [],
      tableData: [],
      dict:{},
      currentRow:{},
      pageInfo:{
            searchValue: null,
            pageNum: 1,
            pageSize: 20,
            orderBy: '1',
            total:0,
            desc:true

      }
    }
  },
  created() {

  },

  mounted(){
    Corporation.listDict().then((resp) =>{
            this.dict = resp.body
          
        })

        this.dosearch()
    
    
    },
  methods: {
     rowSelect: function (val) {
       console.log("测试"+val)
            this.currentRow = val;
            
        },
      showDict :function(code,enumStr){
            let list
           if (this.dict != null){
              list = this.dict[enumStr];
           }
                 
            if (list != null)
                for (let i = 0; i < list.length; i++) {
                    if (list[i].code == code) {
                        return list[i].mark;
                    }
                }
        },
        compdel () {
           Corporation.compDel(this.currentRow.bizCode).then((resp) =>{
            this.$message("删除成功！")
            this.dosearch()
          
        })
        },
    handleSizeChange(val) {
            this.pageInfo.pageSize = val;
            this.dosearch();
    },
    handleCurrentChange(val) {
            this.pageInfo.pageNum = val;
            this.dosearch();
    },
    dosearch :function(){
      console.log("总"+this.pageInfo)
      Corporation.pageQueryList(this.pageInfo).then((resp) =>{
        resp.body.orderBy=this.pageInfo.orderBy
           resp.body.desc=this.pageInfo.desc
            this.pageInfo = resp.body
          
        })
    
    }
  }
}
</script>
