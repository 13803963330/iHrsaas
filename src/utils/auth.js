import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
// 存储token时间
export function setTokeTime() {
  return Cookies.set('tokenTime', Date.now())
}
// 拿取token时间
export function getTokeTime() {
  return Cookies.get('tokenTime')
}
