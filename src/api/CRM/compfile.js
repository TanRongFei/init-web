import RestModel from '@/api/restmodel'

const AppModel = {}

const sysApp = new RestModel('/crm/company/comp/compFile/list', AppModel)

export default sysApp
