// 文章频道接口

import request from '@/utils/request.js'

// 获取全部的频道
export const getAllChannel = () => {
  return request({
    method: 'GET',
    url: '/v1_0/channels'
  })
}

// 获取用户的频道
export const getUserChannel = channel => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/channels',
    data: {
      channels: [channel]
    }
  })
}

//
// 删除用户指定的频道
export const delUserChannel = channelId => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/channels/${channelId}`
  })
}
