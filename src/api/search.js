// 搜索

import request from '@/utils/request.js'

export const getSuggestions = q => {
  return request({
    method: 'GET',
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}

export const getSeatchResult = params => {
  return request({
    method: 'GET',
    url: '/v1_0/search',
    params
  })
}
