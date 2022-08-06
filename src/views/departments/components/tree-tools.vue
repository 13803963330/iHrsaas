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
              <el-dropdown-item @click.native="$emit('add', treeNode)"
                >添加部门</el-dropdown-item
              >
              <template v-if="isRoot">
                <el-dropdown-item @click.native="$emit('compile', treeNode)"
                  >编辑部门</el-dropdown-item
                >
                <el-dropdown-item @click.native="onRemove"
                  >删除部门</el-dropdown-item
                >
              </template>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { movedepartApi } from '@/api/departments'
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

  methods: {
    async onRemove() {
      try {
        this.$confirm('此操作将永久删除该部门, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          const res = movedepartApi(this.treeNode.id)
          console.log(res)
          console.log('ww')
          this.$message({
            type: 'success',
            message: '删除成功!',
          })
          this.$emit('remove')
        })
      } catch (e) {}
    },
  },
}
</script>

<style scoped></style>
