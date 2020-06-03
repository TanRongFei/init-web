import RestModel from '@/api/restmodel_hz'

class Model extends RestModel{
  /**
   * 前期款列表
   * **/
  list(param = {}) {
    return this.fetchList(param, `/ft/api/pa/list`)
  }

  /**
   * 保存前期款信息
   * **/
  saveBaseInfo(param = {}) {
    return this.updateModel(param, `/ft/api/pa/saveBaseInfo`, '此操作将保存前期款信息！ 是否继续？')
  }

  /**
   * 获取前期款信息
   * **/
  viewBaseInfo(bizCode = '') {
    return this.fetchList({}, `/ft/api/pa/viewBaseInfo?preamtBizCode=${bizCode}`)
  }

  /**
   * 删除前期款信息
   * **/
  deleteInfo(preamtBizCode = '') {
    return this.updateModel({}, `/ft/api/pa/deleteInfo?preamtBizCode=${preamtBizCode}`, '此操作将删除前期款信息！ 是否继续？')
  }

  /**
   * 审批通过
   * **/
  audit(param = {}) {
    return this.updateModel(param, `/ft/api/pa/audit`, '此操作将通过审批！ 是否继续？')
  }

  /**
   * 审批不通过
   * **/
  unAudit(param = {}) {
    return this.updateModel(param, `/ft/api/pa/unAudit`, '此操作将不通过审批！ 是否继续？')
  }

  /**
   * 初始化前期款信息
   * **/
  initBase(param = {}) {
    return this.fetchList(param, `/ft/api/pa/initBase`)
  }
}

const sysApp = new Model()

export default sysApp
