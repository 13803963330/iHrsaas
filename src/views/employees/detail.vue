<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs v-model="activeName" @tab-click="tabclick">
          <el-tab-pane label="登录账户设置" name="account">
            <!-- 放置表单 -->
            <el-form
              ref="userForm"
              :model="userInfo"
              :rules="rules"
              label-width="120px"
              style="margin-left: 120px; margin-top: 30px"
            >
              <el-form-item label="姓名:" prop="username">
                <el-input v-model="userInfo.username" style="width: 300px" />
              </el-form-item>
              <el-form-item label="新密码:" prop="password2">
                <el-input
                  v-model="userInfo.password2"
                  style="width: 300px"
                  type="password"
                />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="saveUser">更新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="个人详情" name="details">
            <component :is=""></component>
          </el-tab-pane>
          <el-tab-pane label="岗位信息" name="jobs">
            <jobinfo></jobinfo>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getUserInfpApi, saveUserDetailById } from '@/api'
import component from './components/user-info.vue'
import jobinfo from './components/job-info.vue'
import Cookies from 'js-cookie'
export default {
  data() {
    return {
      activeName: Cookies.get('setCookies') || 'account',
      userId: this.$route.params.id, // 这样可以后面直接通过 this.userId进行获取数据
      userInfo: {
        //   专门存放基本信息
        username: '',
        password: '',
      },
      rules: {
        username: [
          { required: true, message: '姓名不能为空', trigger: 'blur' },
        ],
        password2: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 9, message: '密码长度6-9位', trigger: 'blur' },
        ],
      },
    }
  },
  components: {
    component,
    jobinfo,
  },

  created() {
    this.getUserInfpApi()
  },

  methods: {
    async getUserInfpApi() {
      const res = await getUserInfpApi(this.userId)
      this.userInfo = res
    },
    async saveUser() {
      try {
        await this.$refs.userForm.validate()
        await saveUserDetailById(this.userInfo, this.userId)
        this.$message.success('保存成功')
      } catch (e) {
        console.log(e)
      }
    },
    tabclick() {
      Cookies.set('setCookies', this.activeName)
    },
  },
}
</script>

<style lang="less" scoped></style>
