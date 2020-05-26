<template>
  <div class="left-sidebar">
    <div class="scope" :class="{'anition': isCollapse}" @click="isCollapse = !isCollapse">
      <div v-show="!isCollapse" class="left-item">
        <img src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80">
        <span>{{ name }}</span>
      </div>
      <div class="right-item">
        <i v-show="!isCollapse" class="el-icon-s-fold" />
        <i v-show="isCollapse" class="el-icon-s-unfold" />
      </div>
    </div>
    <div v-show="!isCollapse" class="scope list" :class="{'anition': isCollapse}">
      <div
        v-for="item in tabs"
        :key="item.code"
        class="item"
        :class="{active: active === item.code}"
        @click="handleSelect(item)"
      >
        <div>
          <span>{{ item.label }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'LeftSidebar',
  components: {},
  props: {
    tabs: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      isCollapse: false,
      selected: {},
      active: 'BaseInfo'
    }
  },
  computed: {
    formatRoutes() {
      if (this.leftSidebarRouters && this.leftSidebarRouters.children) {
        return this.leftSidebarRouters.children.filter(item => !item.hidden)
      }
    },
    ...mapGetters([
      'leftSidebarRouters',
      'name'
    ])
  },
  methods: {
    handleSelect(item) {
      this.selected = item
      this.active = item.code
      this.$emit('handleSelect', this.active)
    }
  }
}
</script>

<style lang="scss" scoped>
  .left-sidebar{
    position: absolute;
    left: 0;
    top: 0;
    width: 220px;
    padding: 15px;
    z-index: 99;
    user-select:none;
    .scope{
      transition: width .4s;
      width: 220px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #ffffff;
      padding: 8px;
      margin-bottom: 16px;
      font-size: 14px;
      cursor: pointer;
      border: 1px solid #d8d8d8;
      .left-item{
        display: flex;
        align-items: center;
        img{
          width: 32px;
          height: 32px;
          margin-right: 4px;
        }
      }
      .right-item{
        height: 32px;
        line-height: 32px;
        font-size: 20px;
        color: #606266;
      }
      &.list{
        display: flex;
        flex-direction: column;
        padding: 0;
        .item{
          width: 100%;
          height: 42px;
          line-height: 42px;
          border-bottom: 1px solid #EBEEF5;
          text-align: left;
          font-size: 14px;
          color: #606266;
          font-weight: normal;
          span{
            margin-left: 20px;
          }
          a{
            display: block;
          }
          &:hover{
            color: #427fed;
          }
          &.active{
            background-color: #eeeeee;
            font-weight: bold;
            border-left: 2px solid #427fed;
          }
        }
      }
    }
  }
</style>
