<template>
  <el-row type="flex">
    <el-col>{{ treeNode.name }}</el-col>
    <el-col :span="6">
      <el-row type="flex">
        <el-col>{{ treeNode.manager }}</el-col>
        <el-col>
          <el-dropdown>
            <span class="el-dropdown-link">
              操作<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>添加部门</el-dropdown-item>
              <template v-if="isRoot">
                <el-dropdown-item>编辑部门</el-dropdown-item>
                <el-dropdown-item>删除部门</el-dropdown-item>
              </template>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'TouBu',
  data() {
    return {}
  },
  props: {
    treeNode: {
      type: Object,
      required: true,
    },
    isRoot: {
      type: Boolean,
      default: true,
    },
  },

  created() {},

  methods: {},
}
</script>

<style lang="less" scoped></style>
