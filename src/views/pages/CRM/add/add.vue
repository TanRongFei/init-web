<template>
  <div class="factoring-updata">
    <left-sidebar @handleSelect="handleSelectPage" />

    <div class="container">
      <component :is="currentPage" />
    </div>
  </div>
</template>

<script>
import LeftSidebar from './component/left'
import AddList from './addList/addlist'
import CustomerAccount from './customer_account/customer_account'
import CustomerBill from './customer_bill/customer_bill'
import CustomerFile from './customer_file/customer_file'
import CustomerInfo from './customer_info/customer_info'
import CustomerUsers from './customer_users/customer_users'
import RoleSet from './roleSet/roleSet'
import Information from './Information/Information'
export default {
  name: 'Factoring',
  components: { LeftSidebar, AddList, CustomerAccount, CustomerBill, CustomerFile, CustomerInfo, Information, CustomerUsers, RoleSet },
  data() {
    return {
      currentPage: 'AddList'
    }
  },
  methods: {
    handleSelectPage(v) {
      this.currentPage = v
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  min-height: calc(100vh - 50px);
  margin-left: 235px;
  position: relative;
  overflow: hidden;
  background-color: #eeeeee;
  padding: 15px;
}
</style>
