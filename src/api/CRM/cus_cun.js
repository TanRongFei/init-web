import RestModel from '@/api/restmodel'

const AppModel = {}

const sysApp = new RestModel('/crm/company/comp/custAccount/info/save', AppModel)

export default sysApp
