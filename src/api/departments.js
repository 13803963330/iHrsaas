import request from "@/utils/request"

// 获取部门列表
export function getdepartApi() {
    return request({
      url: '/company/department',
    })
  }

//   删除
export function movedepartApi(id) {
    return request({
      url: '/company/department/'+id,
      method:'DELETE',
    })
  }

  // 获取员工列表
  export function getemployeesApi() {
    return request({
      url: '/sys/user/simple',
    })
  }
  // 添加员工
  export function addemployeesApi(data) {
    return request({
      url: '/company/department',
      method: 'POST',
      data
    })
  }