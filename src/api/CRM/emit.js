import RestModel from '@/api/restmodel'

const AppModel = {}

const sysApp = new RestModel('/crm/company/comp/comp/info/update', AppModel)

export default sysApp
