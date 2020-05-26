import RestModel from '@/api/restmodel'

const AppModel = {}

const sysApp = new RestModel('/crm/company/comp/superComp/adjust', AppModel)

export default sysApp
