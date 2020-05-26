import RestModel from '@/api/restmodel'

const AppModel = {}

const sysApp = new RestModel('/data/ajax/linkage/getChild', AppModel)

export default sysApp
