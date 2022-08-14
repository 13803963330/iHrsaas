export const imgError = {
  // 当被绑定的元素插入到DOM中
  inserted: function (el, { value }) {
    // 监听img/src显示失败情况
    if (!el.src) {
      el.src = value
    } else {
      // 聚焦
      el.onerror = function () {
        el.src = value
      }
    }
  },
  // 指令绑定的元素更新时生效
  updated(el,{ value}) {
    if (!el.src) {
      el.src=value
    }
  },
}
export const aa = {}
export const bb = {}
