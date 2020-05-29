<template>
  <div class="info">
    <div class="item" :style="{flex: itemWidth(key)}" v-for="(value, key) in data.data">
      <span class="label" :style="{flex: labelWidth}">{{formatName(key)}}</span>
      <span>{{value}}</span>
    </div>
    <div class="item">
      <slot name="after"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TableInfo',
  props: {
    data: {
      type: Object,
      default: () => {
        return {
          data: {},
          dict: {},
          labelWidth: 50,
          itemWidth: 50
        }
      }
    }
  },
  computed: {
    formatName() {
      return (key) => {
        if (this.data.dict && this.data.dict[key]) {
          return this.data.dict[key]
        } else {
          return key
        }
      }
    },
    itemWidth() {
      return (key) => {
        console.log(key)
        // 单独样式
        if (this.data[key] && this.data[key].type === 'itemWidth' && this.data[key].value) {
          return `0 0 ${this.data[key].value}%`
        }

        // 通用样式
        if (this.data.itemWidth) {
          return `0 0 ${this.data.itemWidth}%`
        } else {
          return '0 0 50%'
        }
      }
    },
    labelWidth() {
      if (this.data.labelWidth) {
        return `0 0 ${this.data.labelWidth}%`
      } else {
        return '0 0 50%'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .info{
    display: flex;
    flex-wrap: wrap;
    /*padding: 15px 0;*/
    margin-bottom: 15px;
    .item{
      flex: 0 0 50%;
      line-height: 28px;
      padding: 4px 0;
      color: #333;
      word-wrap: break-word;
      word-break: break-all;
      display: flex;
      .label{
        padding-right: 5px;
        color: #999;
      }
    }
  }
</style>
