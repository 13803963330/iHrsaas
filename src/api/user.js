import request from '@/utils/request'

export function login(data) {
return request({
    url:'/sys/login',
    method: 'POST',
    data
})
}
// 拿取基本信息
export function getInfo() {
return request({
    url:'/sys/profile',
    method: 'POST',
})
}
// 获取用户信息
export function getUserInfpApi(id) {
    return request({
        url:'/sys/user/'+id,
    })
}