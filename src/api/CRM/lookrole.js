import RestModel from '@/api/restmodel'

const AppModel = {}

const sysApp = new RestModel('/crm/ajax/compRole', AppModel)

export default sysApp
