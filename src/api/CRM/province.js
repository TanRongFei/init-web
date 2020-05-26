import RestModel from '@/api/restmodel'

const AppModel = {}

const sysApp = new RestModel('/data/ajax/province/list', AppModel)

export default sysApp
