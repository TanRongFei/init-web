import request from '@/utils/request'
const baseUrl = '/api'
export const lookList = query => {
  return request({
    url: `${baseUrl}/crm/comp/comp/api/info/view?${query}`,
    method: 'post',
    data: {}
  })
}
