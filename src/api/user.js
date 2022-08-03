import request from '@/utils/request'

export function login(data) {
return request({
    url:'/sys/login',
    method: 'POST',
    data
})
}

export function getInfo() {
return request({
    url:'/sys/profile',
    method: 'POST',
})
}

export function getUserInfpApi(id) {
    return request({
        url:'/sys/user/'+id,
    })
}