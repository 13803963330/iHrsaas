import request from '@/utils/request'

/**
 * 获取角色列表
 * @returns Object
 */
export function getRoleList(params) {
  return request({
    url: '/sys/role',
    params,
  })
}
/**
 * 新增角色
 * @returns Object
 */
export function getRoleAddApi(data) {
  return request({
    url: '/sys/role',
    method: 'POST',
    data,
  })
}
