import RestModel from '@/api/restmodel'

const AppModel = {}

const sysApp = new RestModel('/crm/ajax/custAccount/info/disable', AppModel)

export default sysApp
