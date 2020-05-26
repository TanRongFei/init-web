import RestModel from '@/api/restmodel'

const AppModel = {}

const sysApp = new RestModel('/crm/company/managerChange/info/pass', AppModel)

export default sysApp
