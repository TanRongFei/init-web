
// const baseUrl = '/api'
// export const corporationList = query => {
//   return request({
//     url: `${baseUrl}/crm/comp/comp/api/list`,
//     method: 'post',
//     data: query
//   })
// }
import RestModel from '@/api/restmodel'

const AppModel = {}

const sysApp = new RestModel('/crm/company/comp/comp/list', AppModel)

export default sysApp
