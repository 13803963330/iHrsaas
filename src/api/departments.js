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

  // 根据id获取部门详情
  export function getempApi(id) {
    return request({
      url: '/company/department/'+id,
    })
  }

    // 根据id修改部门详情
    export function setempApi(data) {
      return request({
        url: '/company/department/'+data.id,
        method:'PUT',
        data
      })
    }