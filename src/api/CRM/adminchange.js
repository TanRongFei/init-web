import RestModel from '@/api/restmodel'

const AppModel = {}

const sysApp = new RestModel('/crm/company/managerChange/list', AppModel)

export default sysApp
