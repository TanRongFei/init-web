import RestModel from '@/api/restmodel'

const AppModel = {}

const sysApp = new RestModel('/crm/ajax/compRole/info/save', AppModel)

export default sysApp
