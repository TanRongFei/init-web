import RestModel from '@/api/restmodel'

const AppModel = {}

const sysApp = new RestModel('/data/ajax/area/list', AppModel)

export default sysApp
