import RestModel from '@/api/restmodel_hz'

class Model extends RestModel{
  // 保理准入插入接口
  countView(param) {
    return this.fetchList(param, '/api/business/count/view')
  }
}

const sysApp = new Model()

export default sysApp
