import RestModel from '@/api/restmodel'

const AppModel = {}

const sysApp = new RestModel('/crm/company/comp/info/pass', AppModel)

export default sysApp
