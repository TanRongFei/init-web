import RestModel from '@/api/restmodel_hz'

class Model extends RestModel{
  /**
   * 查询合同列表
   * **/
  list(param) {
    return this.fetchList(param, `/api/contract/list`)
  }

  /**
   * 删除合同基本信息
   * **/
  deleteInfo(param) {
    return this.updateModel(param, `/crm/personalChange/info/del`, '此操作将删除合同基本信息！ 是否继续？')
  }

  /**
   * 查看合同基本信息
   * **/
  viewInfo(param) {
    return this.updateModel(param, `/api/contract/info/view`)
  }

  /**
   * 授信生成合同的初始化
   * **/
  contractInit(param) {
    return this.updateModel(param, `/api/contract/init`)
  }

  /**
   * 授信生成合同的应收账款初始化
   * **/
  contractDue(param) {
    return this.updateModel(param, `/api/contract/due`)
  }

  /**
   * 初始化还款方式
   * **/
  planType(param) {
    return this.updateModel(param, `/api/contract/scheme/planType`)
  }

  /**
   * 根据客户类型查询客户列表
   * **/
  custlist(param) {
    return this.fetchList(param, `/api/contract/info/custlist`)
  }

  /**
   * 保存合同基本信息
   * **/
  save(param) {
    return this.fetchList(param, `/api/contract/info/save`)
  }

}

const sysApp = new Model()

export default sysApp
