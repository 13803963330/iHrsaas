<template>
  <div>
    <UploadExcel :deforeUpload="excelSuccess" :onSuccess="onSuccess" />
  </div>
</template>

<script>
import { importEmployee } from '@/api/index'
import employees from '@/constant/employees'
import formatTime from '@/filters/index'
const { importMapKeyPath } = employees
export default {
  data() {
    return {}
  },

  created() {},

  methods: {
    // 上传前触发
    excelSuccess({ name }) {
      if (!name.endsWith('.xlsx')) {
        return this.$message('请选择xlsx文件')
      }
      return true
    },
    // 解析成功后触发
    async onSuccess({ results, header }) {
      const neWArr = results.map((item) => {
        const obj = {}
        for (let key in importMapKeyPath) {
          if (key === '入职时间' || key === '转正时间') {
            // excel时间戳
            const timestamp = item[key]
            // 转格式，并对比效验差时间
            const date = new Date((timestamp - 1) * 24 * 3600000)
            date.setFullYear(data.setFullYear() - 70)
            obj[importMapKeyPath[key]] = formatTime(date)
          } else {
            obj[importMapKeyPath[key]] = item[key]
          }
        }
        return obj
      })
      await importEmployee(neWArr)
      this.$message.success('导入成功')
      this.$router.go(-1)
      console.log(neWArr)
    },
  },
}
</script>

<style lang="less" scoped></style>
