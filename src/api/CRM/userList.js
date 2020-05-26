import RestModel from '@/api/restmodel'

const AppModel = {}

const sysApp = new RestModel('/crm/personal/personal/list', AppModel)

export default sysApp
