<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools>
        <span slot="left-tag">共166条记录</span>
        <template slot="right">
          <el-button size="small" type="warning"@click="TheImport" >导入</el-button>
          <el-button size="small" type="danger" @click="exportExcel">导出</el-button>
          <el-button size="small" type="primary" @click="addVisble">新增员工</el-button>
        </template>
      </page-tools>
      <!-- 放置表格和分页 -->
      <el-card>
        <el-table border :data="listmploy">
          <el-table-column label="序号" sortable="" type="index" />
          <el-table-column label="姓名" sortable="" prop="username" />
          <el-table-column label="员工" width="200">
            <template slot-scope="scope">
              <img
                v-imgError="require('@/assets/common/head.jpg')"
                :src="scope.row.staffPhoto"
                style="  
                  border-radius: 50%;
                  width: 100px;
                  height: 100px;
                  padding: 10px;
                "
              ></img>
            </template>
          </el-table-column>
          <el-table-column label="工号" sortable="" prop="workNumber" />
          <el-table-column
            label="聘用形式"
            sortable=""
            :formatter="formatteForm"
            prop="formOfEmployment"
          />
          <el-table-column label="部门" sortable="" prop="departmentName" />
          <el-table-column label="入职时间" sortable="">
            <template slot-scope="{row}">
               {{row.timeOfEntry | formatTime}}
            </template>
          </el-table-column>
          <el-table-column label="账户状态" sortable="" >
            <template slot-scope="{row}">
              <el-switch
              active-color="#7f5dee"
              inactive-color="#7799fb"
              :value="row.formOfEmployment===1">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template slot-scope="{ row }">
              <el-button type="text" size="small"
              @click="$router.push('/employees/detail/'+ row.id)"
              >查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small" @click="deleteEmployee(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row
          type="flex"
          justify="center"
          align="middle"
          style="height: 60px"
        >
          <el-pagination
            layout="prev, pager, next"
            :total="total"
            :page-size="pages.size"
            @current-change="currentChange"
          />
        </el-row>
      </el-card>
    </div>
    <!-- 添加 -->
    <addemployees
    @addYg="getemployees"
    :visible.sync="addemployeeVisible"
    >
     </addemployees>
  </div>
</template>

<script>
import { geemployeesListApi,delEmployee } from '@/api/index'
import addemployees from './components/add-employees.vue'
import employees from '@/constant/employees';
const {hireType} = employees
export default {
  name: 'mployees',
  data() {
    return {
      listmploy: [], // 接数据的
      total: 0, //总数
      pages: {
        page: 1,
        size: 5,
      },
      addemployeeVisible:false, //控制新增弹窗
    }
  },
components:{
addemployees
},
  created() {
    this.geemployeesListApi()
  },

  methods: {
    // 获取列表
    async geemployeesListApi() {
      const { rows, total } = await geemployeesListApi(this.pages)
      this.listmploy = rows
      this.total = total
    },
    // 页码转换
    currentChange(val) {
      this.pages.page = val
      this.geemployeesListApi()
    },
    // 处理数据
    formatteForm(row,column,cellcValue,index){
      const findItem=employees.hireType.find((item)=>item.id===cellcValue)
      return findItem ? findItem.value:'未知'
    },
    // 删除员工
     async deleteEmployee(id) {
      try {
        await this.$confirm('您确定删除该员工吗')
        await delEmployee(id)
        this.geemployeesListApi()
        this.$message.success('删除员工成功')
      } catch (error) {
        console.log(error)
      }
    },
    // 展示新增
    addVisble(){
      this.addemployeeVisible = true
    },
    // 新增后重新获取
    getemployees(){
      this.geemployeesListApi()
    },
    // 展示导入
    TheImport(){
     this.$router.push('/import')
    },
    // 导出到excel
   async exportExcel(){
     const headers = {
        '姓名': 'username',
        '手机号': 'mobile',
        '入职日期': 'timeOfEntry',
        '聘用形式': 'formOfEmployment',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName'
      }
     const { export_json_to_excel }= await import('@/vendor/Export2Excel')
     const {rows}= await geemployeesListApi({page:1,size:this.total}) //拿取表单数据
     const header =Object.keys(headers) //表头数据
    //  data数据
     const data =rows.map((item)=>{
          return header.map(he =>{
            if (he==='聘用形式') {
              const findItem = hireType.find((hire)=>{
                return hire.id === item[headers[he]]
              })
              return findItem ? findItem.value :'未知'
            } else{
              return item[headers[he]]
            }
          })
          })
        export_json_to_excel({
          header:header , //表头 必填
          data, //具体数据 必填
          filename: 'excel-list', //非必填
          autoWidth: true, //非必填
          bookType: 'xlsx', //非必填
          multiHeader :[['姓名', '主要信息', '', '', '', '', '部门']],
          merges :['A1:A2', 'B1:F1', 'G1:G2']
        })
    }
  },
}
</script>

<style scoped lang="less"></style>
