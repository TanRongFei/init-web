<template>
  <div>
    <el-button @click="dialogVisible = true">文件上传</el-button>

    <el-dialog
      title="文件上传"
      :visible.sync="dialogVisible"
      width="860px"
      :before-close="handleClose">
      <div>
        <el-upload
          class="upload-demo"
          :action="action"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="3"
          :on-exceed="handleExceed"
          :file-list="fileList">
          <div style="display: flex;width: 830px;">
            <el-button size="mini" type="primary">选择文件</el-button>
          </div>
          <!--    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
        </el-upload>
      </div>
<!--      <span slot="footer" class="dialog-footer">-->
<!--        <el-button @click="handleClose">取 消</el-button>-->
<!--        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>-->
<!--      </span>-->
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'FileUpload',
  data() {
    return {
      dialogVisible: false,
      action: process.env.VUE_APP_UPLOAD,
      fileList: [
        {
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        },
        {
          name: 'food2.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }
      ]
    }
  },
  created() {
    console.log(process.env)
  },
  methods: {
    handleClose() {
      this.dialogVisible = false
    },
    handleAvatarSuccess(response, file, fileList) {
      if (response.result !== 'ok') {
        this.$message.error(`上传失败!`)
        return false
      }
      const ActiveXObject = 'ActiveXObject'
      if (!!window.ActiveXObject || ActiveXObject in window) { // 判断是否为ie
        try {
          this.imageUrl = response.link
          this.imageName = response.OriginalFilename
        } catch (e) {
          this.imageUrl = JSON.parse(response.replace(/\\/g, '')).link
          this.imageName = JSON.parse(response.replace(/\\/g, '')).OriginalFilename
        }
      } else {
        this.imageUrl = response.link
        this.imageName = response.OriginalFilename
      }

      if (this.imageUrl) {
        this.form.headPortrait = this.imageUrl
        this.$set(this.form, 'headPortrait', this.imageUrl)
        this.$set(this.form, 'key', 'here')
        delete this.form.key
      }
    },
    beforeAvatarUpload(file, type) {
      const isJPG = file.type === 'image/jpeg'
      const isGIF = file.type === 'image/gif'
      const isPNG = file.type === 'image/png'
      const isBMP = file.type === 'image/bmp'
      // const isDocx = file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      const isDoc = file.type === 'application/msword' // .doc
      const isZip = file.type === 'application/x-zip-compressed' // .zip
      const isRar = file.type === 'application/octet-stream' || file.name.substr(file.name.lastIndexOf('.')).toLowerCase() === '.rar' // .rar rar类型file.type本地测试为空，所以截取后缀判断
      const isPdf = file.type === 'application/pdf' // .pdf
      const isLt20M = file.size / 1024 / 1024 < 20

      if (!isLt20M) {
        this.$message.error('上传图片大小不能超过 20MB!')
      }

      if (!this.uploadType || this.uploadType === 'image') { // 图片类型
        if (!isJPG && !isGIF && !isPNG && !isBMP) {
          this.$message.error('上传图片必须是JPG/GIF/PNG/BMP 格式!')
        }

        return (isJPG || isBMP || isGIF || isPNG) && isLt20M
      } else { // 文件类型
        if (!isJPG && !isGIF && !isPNG && !isBMP && !isDoc && !isZip && !isRar && !isPdf) {
          this.$message.error('上传图片必须是JPG/GIF/PNG/BMP/DOCX/DOC/PDF/ZIP/RAR 格式!')
        }

        return (isJPG || isBMP || isGIF || isPNG || isDoc || isZip || isRar || isPdf) && isLt20M
      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleUploadError(err) {
      console.log(err)
      this.$message.error(`${JSON.parse(err.message).message}`)
    }
  }
}
</script>

<style lang="scss">
.el-upload-list__item{
  display: flex;
  .el-upload-list__item-name{
    display: inline-flex;
  }
}
</style>
