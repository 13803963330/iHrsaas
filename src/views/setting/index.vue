<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-tabs v-model="activeName">
        <el-tab-pane label="用户管理" name="first">
          <el-button type="primary" @click="dialogVisible = true"
            >新增角色</el-button
          >
          <!-- 表格 -->
          <el-table :data="tableData" style="width: 100%">
            <el-table-column type="index" label="序号"> </el-table-column>
            <el-table-column prop="date" label="日期" width="180">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="address" label="地址"> </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="success">分配权限</el-button>
                <el-button type="primary">编辑</el-button>
                <el-button type="danger">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            background
            layout="sizes, prev, pager, next"
            :page-sizes="[3, 5, 10]"
            :total="total"
            :page-size="pageSize"
            @size-change="sizeChange"
            @current-change="currentChange"
          >
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="公司信息" name="third">
          <el-alert
            title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
            name="info"
            show-icon
            :closable="false"
          >
          </el-alert>
          <el-form ref="form" label-width="80px" style="margin-top: 50px">
            <el-form-item label="公司名称">
              <el-input v-model="SettingObj.name" disabled></el-input>
            </el-form-item>
            <el-form-item label="公司地址">
              <el-input v-model="SettingObj.companyAddress" disabled></el-input>
            </el-form-item>
            <el-form-item label="公司邮箱">
              <el-input v-model="SettingObj.mailbox" disabled></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="SettingObj.remarks" disabled></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 新增弹窗 -->
    <el-dialog
      title="新增角色"
      :visible.sync="dialogVisible"
      @close="closeAddRoleform"
      width="50%"
      :before-close="handleClose"
    >
      <el-form
        ref="addform"
        :model="addRoleform"
        :rules="addRoleformRules"
        label-width="80px"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="addRoleform.name"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="addRoleform.description"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="onAddRole">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getRoleList, getRoleAddApi, getSettingObj } from '@/api/index'
export default {
  data() {
    return {
      dialogVisible: false,
      tableData: [],
      activeName: 'first',
      pageSize: 3,
      total: 0,
      page: 1,
      // 新增数据
      addRoleform: {
        name: '',
        description: '',
      },
      addRoleformRules: {
        name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
      },
      SettingObj:{}
    }
  },

  created() {
    this.getRoleList()
    this.getSettingObj()
  },

  methods: {
    // 获取列表
    async getRoleList() {
      const { rows, total } = await getRoleList({
        page: this.page,
        pagesize: this.pageSize,
      })
      console.log(rows)
      this.tableData = rows
      this.total = total
    },
    // 更改每页数量
    async sizeChange(val) {
      this.pageSize = val
      this.getRoleList()
    },
    // 更改页数
    async currentChange(val) {
      this.page = val
      this.getRoleList()
    },
    // 确定
    async onAddRole() {
      this.$refs.addform.validate()
      await getRoleAddApi(this.addRoleform)
      this.$message.success('添加成功')
      this.dialogVisible = false
      this.getRoleList()
    },
    // 取消
    handleClose() {
      this.dialogVisible = false
    },
    // 监听对话框关闭
    closeAddRoleform() {
      this.$refs.addform.resetFields()
      this.addRoleform.description = ''
    },
    // 获取公司信息
    async getSettingObj() {
      const res = await getSettingObj(this.$store.state.user.userInfo.companyId)
      console.log(res)
      this.SettingObj=res
    },
  },
}
</script>

<style scoped>
.el-input__inner {
  width: 50%;
}
</style>
