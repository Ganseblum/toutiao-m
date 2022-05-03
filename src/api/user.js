// 用户请求相关模块，路由请求

import request from '@/utils/request.js'
import store from '@/store/index'
// 登录验证
export const login = (data) => {
  return request({
    method: 'POST',
    url: 'v1_0/authorizations',
    data: data
  })
}

// 发送验证码
export const sendSms = mobile => {
  return request({
    method: 'GET',
    url: `/v1_0/sms/codes/${mobile}`
  })
}

// 获取用户信息
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user',
    headers: {
      Authorization: `Bearer ${store.state.user.token}`
    }
  })
}
