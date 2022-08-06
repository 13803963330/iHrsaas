<template>
  <el-dialog title="添加部门" :visible.sync="Visible" width="66%">
    <el-form
      ref="form"
      :model="formData"
      :rules="formrules"
      label-width="100px"
    >
      <el-form-item label="部门名称" prop="name">
        <el-input
          placeholder="请选择部门名称"
          v-model="formData.name"
        ></el-input>
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input
          placeholder="请选择部门编码"
          v-model="formData.code"
        ></el-input>
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select
          placeholder="请选择负责人"
          v-model="formData.manager"
          style="width: 100%"
        >
          <el-option
            v-for="item in employeesList"
            :label="item.username"
            :value="item.username"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input
          type="textarea"
          placeholder="1~~200字符"
          v-model="formData.introduce"
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onClose">取 消</el-button>
      <el-button type="primary" @click="oncLose">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {
  getdepartApi,
  getemployeesApi,
  addemployeesApi,
} from '@/api/departments'

export default {
  data() {
    // 判定是否重复
    const checkDeptName = (rule, value, callback) => {
      if (!this.currentadd.children) {
        return callback()
      }
      this.currentadd.children.some((item) => item.name === value)
        ? callback(new Error('职门重复'))
        : callback()
    }

    const checkDeptCode = async (rule, value, cod) => {
      const { depts } = await getdepartApi()
      depts.some((item) => item.code === value)
        ? cod(new Error('部门编码重复'))
        : cod()
    }
    return {
      formData: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '', // 部门介绍
        pid: '',
      },
      formrules: {
        name: [
          { required: true, message: '部门名称不能为空', trigger: 'blur' },
          {
            validator: checkDeptName,
            trigger: 'blur',
          },
        ],
        code: [
          { required: true, message: '部门编码不能为空', trigger: 'blur' },
          {
            min: 1,
            max: 50,
            message: '部门编码要求1-50个字符',
            trigger: 'blur',
          },
          {
            validator: checkDeptCode,
            trigger: 'blur',
          },
        ],
        manager: [
          { required: true, message: '部门负责人不能为空', trigger: 'change' },
        ],
        introduce: [
          { required: true, message: '部门介绍不能为空', trigger: 'blur' },
          {
            trigger: 'blur',
            min: 1,
            max: 300,
            message: '部门介绍要求1-50个字符',
          },
        ],
      },
      employeesList: [],
    }
  },
  props: {
    Visible: {
      type: Boolean,
      required: true,
    },
    currentadd: {
      type: Object,
      required: true,
    },
  },

  created() {
    this.getemployeesApi()
  },

  methods: {
    async getemployeesApi() {
      const res = await getemployeesApi()
      this.employeesList = res
    },
    onClose() {
      this.$emit('update:visible', false)
    },
    async oncLose() {
      // 效验表单
      await this.$refs.form.validate()
      this.formData.pid = this.currentadd.id
      console.log(this.formData)
      await addemployeesApi(this.formData)
      this.$emit('update:visible', false)
      this.$emit('updateto')
    },
  },
}
</script>

<style lang="less" scoped></style>
