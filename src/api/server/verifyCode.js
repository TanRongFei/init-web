import RestModel from '@/api/restmodel'

const AppModel = {}

const sysApp = new RestModel('/admin/login/user/verify/code', AppModel)

export default sysApp
