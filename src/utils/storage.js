
// 这是处理token工具
// 添加
export const setItem = (key, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}

// 获取
export const getItem = (key) => {
  const data = window.localStorage.getItem(key)
  // 判断是否是json字符串，直接解析，如果解析发生错误则返回正常的字符串
  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}

// 删除
export const removeItem = key => {
  window.localStorage.removeItem(key)
}
