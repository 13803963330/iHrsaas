<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card">
        <!-- 头部 -->
        <tree-tools
          @add="showAdddepy"
          :isRoot="false"
          :tree-node="{
            name: '江苏传智播客教育科技股份有限公司',
            manager: '负责人',
          }"
        />
        <!-- 树形 -->
        <el-tree :data="departs" :props="defaultProps" default-expand-all="">
          <template v-slot="{ data }">
            <tree-tools
              @add="showAdddepy"
              @compile="showcompile"
              :tree-node="data"
            />
          </template>
        </el-tree>
      </el-card>
    </div>

    <!-- 弹层 -->
    <add-dept
      ref="Refdept"
      :Visible.sync="dialogVisible"
      @updateto="getdepartApi"
      :currentadd="currentadd"
    ></add-dept>
  </div>
</template>

<script>
import { ListToTree } from '@/utils/index'
import TreeTools from './components/tree-tools.vue'
import AddDept from './components/add-dept.vue'
import { getdepartApi } from '@/api/departments'
export default {
  data() {
    return {
      defaultProps: {
        label: 'name',
      },
      departs: [
        { name: '总裁办', children: [{ name: '董事会' }] },
        { name: '行政部' },
        { name: '人事部' },
      ],
      dialogVisible: false,
      currentadd: {},
    }
  },
  components: {
    TreeTools,
    AddDept,
  },

  created() {
    this.getdepartApi()
  },

  methods: {
    async getdepartApi() {
      const res = await getdepartApi()
      console.log(res)
      this.departs = ListToTree(res.depts, '')
    },
    showAdddepy(val) {
      this.dialogVisible = true
      this.currentadd = val
      console.log(val)
    },
    // 编辑
    showcompile(val) {
      this.dialogVisible = true
      this.$refs.Refdept.getDeptByid(val.id)
    },
  },
}
</script>

<style>
.el-dropdown-link {
  cursor: pointer;
}
.el-row--flex {
  width: 100%;
}
.el-card__body {
  padding: 30px 140px;
  font-size: 14px;
}
html {
  background-color: #f8fafd;
}
</style>
