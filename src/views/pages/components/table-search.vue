<template>
  <div class="table-search">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="条件筛选" name="1">
        <template slot="title">
          <div class="wrap">
            <div class="item">
              条件筛选
            </div>
            <div class="item" @click.stop="() => {}">
              <el-input placeholder="请输入内容" v-model.stop="input" size="mini">
                <template slot="append">
                  <el-button type="primary" @click.stop="handleSearch">搜 索</el-button>
                </template>
              </el-input>

            </div>
          </div>
          <span>高级搜索</span>
        </template>
        <slot name="after"></slot>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  name: 'TableSearch',
  data() {
    return {
      activeNames: [],
      input: '123'
    }
  },
  methods: {
    handleSearch() {
      console.log('搜 索')
    },
    handleChange(val) {
      console.log(val)
    }
  }
}
</script>

<style lang="scss" scoped>
.table-search{
  background: #ffffff;
  margin-bottom: 16px;
  border: 1px solid #D8D8D8;
  .wrap{
    width: calc(100% - 80px);
    padding-right: 25px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>

<style lang="scss">
  .table-search{
    .wrap{
      padding: 0 16px;
    }
    .el-collapse-item__header{
      background: #F5F7F7;
    }
    .el-form-item{
      border-bottom: 1px dotted #D8D8D8;
      margin-bottom: 0;
      padding: 10px 0;
      &:last-child{
        border: none;
      }
    }
  }
</style>
