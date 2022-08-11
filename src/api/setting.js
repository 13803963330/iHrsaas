import request from '@/utils/request'

/**
 * 获取角色列表
 * @returns Object
 */
export function getSettingObj(id) {
  return request({
    url: `/company/${id}`,
  })
}