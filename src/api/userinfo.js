// 用户信息

import request from '@/utils/request.js'

export const getDataUserInfo = target => {
  return request({
    method: 'GET',
    url: '/v1_0/user/profile'
  })
}

export const upDataUserInfo = data => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/profile',
    data
  })
}

// 用户头像
export const upDataUserPhoto = data => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/photo',
    data
  })
}
