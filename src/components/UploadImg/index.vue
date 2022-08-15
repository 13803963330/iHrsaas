<template>
  <div>
    <el-upload
      :file-list="filelist"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      action="https://jsonplaceholder.typicode.com/posts/"
      :http-request="uoloadimg"
      :on-change="onChange"
      :on-remove="onRemove"
      :on-preview="onPreview"
      :before-upload="onBeforeUpload"
      list-type="picture-card"
      :limit="1"
      :class="filelist.length === 1 ? 'father' : ''"
      class="custom-upload"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="fileonPreview">
      <img :src="fileimg" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
var cos = new COS({
  SecretId: 'AKIDxlNmyua2FDwSjmeHGVVHxNYVghSyFhus',
  SecretKey: 'nPp8D5mKgomaBawHPI1avzuhJhqombCZ',
})
console.log(cos)
export default {
  name: 'UploadImg',
  data() {
    return {
      filelist: [],
      fileimg: '',
      fileonPreview: false,
      loading: false,
    }
  },

  created() {},

  methods: {
    // 发送图片上传
    uoloadimg({ file }) {
      this.loading = true
      cos.putObject(
        {
          Bucket: 'hmhr-31-1313341522' /* 必须 */,
          Region: 'ap-shanghai' /* 存储桶所在地域，必须字段 */,
          Key: file.name /* 必须 */,
          StorageClass: 'STANDARD',
          Body: file, // 上传文件对象
          onProgress: function (progressData) {
            console.log(JSON.stringify(progressData))
          },
        },
        (err, data) => {
          this.loading = false
          if (err || data.statusCode != 200) {
            return this.$$message.error('')
          }
          this.$emit('onSuccess', {
            url: 'https://' + data.Location,
          })
        },
      )
    },
    // 存储图片列表
    onChange(file, filelist) {
      this.filelist = filelist
    },
    //删除
    onRemove(file, filelist) {
      this.filelist = filelist
    },
    // 预览
    onPreview(file) {
      console.log(file)
      this.fileonPreview = true
      this.fileimg = file.url
    },
    // 上传前判断
    onBeforeUpload(file) {
      console.log(file)
      const types = ['image/jpeg', 'image/png', 'image/gif']
      if (!types.includes(file.type)) {
        this.$message.error('请选择' + types.join(', ') + '格式图片')
        return false
      }
      const maxSize = 1024 * 1024 * 2
      if (file.size > maxSize) {
        this.$message.error('选择图片不超过2mb')
        return false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.father .el-upload--picture-card {
  display: none;
}
.custom-upload {
  width: 148px;
  height: 148px;
  overflow: hidden;
}
</style>
