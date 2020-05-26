<template>
  <div class="basic-info">
    <head-title :label="'中登网登记'" :showDefaultButton="false">
      <template slot="after">
        <el-button type="primary" size="mini">保 存</el-button>
        <el-button type="" size="mini">返 回</el-button>
      </template>
    </head-title>

    <el-card shadow="nerve">
      <div class="wrap">
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="item">
              <span class="label">登记人</span>
              <el-input />
            </div>
          </el-col>
          <el-col :span="12">
            <div class="item">
              <span class="label">登记日期</span>
              <el-date-picker
                v-model="form.date"
                style="width: 100%;"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <div class="item">
              <span class="label">登记信息</span>
              <el-input />
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <div class="item">
              <span class="label">登记结果</span>
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
import HeadTitle from '@/views/pages/components/head-title'
import FormLabel from '@/views/pages/components/form-label'

export default {
  name: 'Information',
  components: {
    HeadTitle,
    FormLabel
  },
  data() {
    return {
      form: {},
      imageUrl: '',
      tableData: []
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isPNG = file.type === 'image/png'

      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG && !isPNG) {
        this.$message.error('图片只能是 JPG PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }
  }
}
</script>

<style lang="scss" scoped>
  .wrap{
    .item{
      display: flex;
      align-items: center;
      min-height: 36px;
      >*{
        flex: 1;
      }
      .label{
        flex: 0 0 100px;
      }
    }

    .el-row{
      margin-bottom: 10px;
    }
  }

</style>

<style lang="scss">
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 125px;
    height: 125px;
    line-height: 125px;
    text-align: center;
  }
  .avatar {
    width: 125px;
    height: 125px;
    display: block;
  }
</style>
