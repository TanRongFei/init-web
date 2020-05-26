import request from '@/utils/request'
const baseUrl = '/api'
export const delList = query => {
  return request({
    url: `${baseUrl}/crm/comp/comp/api/info/del?${query}`,
    method: 'post',
    data: {}
  })
}
