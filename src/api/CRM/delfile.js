import RestModel from '@/api/restmodel'

const AppModel = {}

const sysApp = new RestModel('/crm/company/comp/compFile/info/del', AppModel)

export default sysApp
