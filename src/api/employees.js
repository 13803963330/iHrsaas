import request from "@/utils/request"

// 获取部门列表
export function geemployeesListApi(params) {
    return request({
      url: '/sys/user',
      params
    })
  }