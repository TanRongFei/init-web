import RestModel from '@/api/restmodel_hz'

const AppModel = {
  pageNum: 1,
  pageSize: 10,
  searchValue: '',
  orderBy: 'createdTime',
  desc: false,
  status: null,
  applyDate: ''
}

const sysApp = new RestModel('/credit/creditList', AppModel)

export default sysApp
