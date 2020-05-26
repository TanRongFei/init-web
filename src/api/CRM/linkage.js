import RestModel from '@/api/restmodel'

const AppModel = {}

const sysApp = new RestModel('/data/ajax/linkage/list', AppModel)

export default sysApp
