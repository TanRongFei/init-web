import RestModel from '@/api/restmodel'

const AppModel = {}

const sysApp = new RestModel('/crm/company/comp/custAccount/info/enable', AppModel)

export default sysApp
