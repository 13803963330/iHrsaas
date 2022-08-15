import request from "@/utils/request"

// 获取部门列表
export function geemployeesListApi(params) {
    return request({
      url: '/sys/user',
      params
    })
  }
  /**
 * 删除员工接口
 * ****/

export function delEmployee(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete'
  })
}
/** **
 *  新增员工的接口
 * **/
 export function addEmployee(data) {
  return request({
    method: 'post',
    url: '/sys/user',
    data
  })
}
/** *
 *  封装一个导入员工的接口
 *
 * ***/
 export function importEmployee(data) {
  return request({
    url: '/sys/user/batch',
    method: 'post',
    data
  })
}
/** *
 *  读取用户详情的基础信息
 * **/
 export function getPersonalDetail(id) {
  return request({
    url: `/employees/${id}/personalInfo`
  })
}
/** *
 *  更新用户详情的基础信息
 * **/
 export function updatePersonal(data,Id) {
  return request({
    url: `/employees/${Id}/personalInfo`,
    method: 'put',
    data
  })
}
