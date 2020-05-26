import RestModel from '@/api/restmodel'

const AppModel = {}

const sysApp = new RestModel('/crm/company/comp/comp/info/view', AppModel)

export default sysApp
