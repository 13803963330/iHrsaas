import request from "@/utils/request"

// 获取部门列表
export function getdepartApi() {
    return request({
      url: '/company/department',
    })
  }