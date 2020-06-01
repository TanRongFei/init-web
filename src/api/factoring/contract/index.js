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
  deleteInfo(bizCode) {
    return this.updateModel({}, `/api/contract/info/delete?bizCode=${bizCode}`, '此操作将删除合同基本信息！ 是否继续？')
  }

  /**
   * 删除合同变更信息
   * **/
  changeDelete(bizCode) {
    return this.updateModel({}, `/api/contract/change/delete?bizCode=${bizCode}`, '此操作将删除合同变更信息！ 是否继续？')
  }

  /**
   * 初始化枚举数据字典
   * **/
  dict(param) {
    return this.fetchList(param, `/api/contract/dict`)
  }

  /**
   * 查看合同基本信息
   * **/
  viewInfo(bizCode) {
    return this.fetchList({}, `/api/contract/info/view?bizCode=${bizCode}`)
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
    return this.fetchList(param, `/api/contract/scheme/planType`)
  }

  /**
   * 根据客户类型查询客户列表
   * **/
  custlist(param) {
    return this.fetchList(param, `/api/contract/info/custlist`)
  }

  /**
   * 保存合同方案信息
   * **/
  schemeSave(param) {
    return this.updateModel(param, `/api/contract/scheme/save`)
  }

  /**
   * 合同方案测算
   * **/
  planAdd(param) {
    return this.updateModel(param, `/api/contract/scheme/planAdd`)
  }

  /**
   * 查看合同方案信息
   * **/
  schemeView(bizCode) {
    return this.fetchList({}, `/api/contract/scheme/view?bizCode=${bizCode}`)
  }

  /**
   * 保存合同应收账款信息
   * **/
  dueSave(param) {
    return this.updateModel(param, `/api/contract/due/save`)
  }

  /**
   * 查看合同应收账款信息
   * **/
  dueView(bizCode) {
    return this.fetchList({}, `/api/contract/due/view?bizCode=${bizCode}`)
  }

  /**
   * 保存合同商务条款信息
   * **/
  businessInfoSave(param) {
    return this.updateModel(param, `/api/contract/businessInfo/save`)
  }

  /**
   * 查看合同商务条款信息
   * **/
  businessInfoView(bizCode) {
    return this.fetchList({}, `/api/contract/businessInfo/view?bizCode=${bizCode}`)
  }

  /**
   * 保存和修改合同附件信息
   * **/
  fileSave(param) {
    return this.updateModel(param, `/api/contract/file/save`)
  }

  /**
   * 查看合同附件信息
   * **/
  fileView(bizCode) {
    return this.fetchList({}, `/api/contract/file/view?bizCode=${bizCode}`)
  }

  /**
   * 保存或修改合同变更信息
   * **/
  changeSave(param) {
    return this.updateModel(param, `/api/contract/change/save`)
  }

  /**
   * 查看合同变更信息
   * **/
  changeView(bizCode) {
    return this.fetchList({}, `/api/contract/change/view?bizCode=${bizCode}`)
  }

  /**
   * 变更审批通过
   * **/
  audit(bizCode) {
    return this.updateModel({}, `/api/contract/change/audit?bizCode=${bizCode}`, '确定变更审批通过吗?')
  }

  /**
   * 变更审批不通过
   * **/
  changeUnAudit(bizCode) {
    return this.updateModel({}, `/api/contract/change/unAudit?bizCode=${bizCode}`, '确定变更审批不通过吗?')
  }

  /**
   * 合同审批通过
   * **/
  infoAudit(bizCode) {
    return this.updateModel({}, `/api/contract/info/audit?bizCode=${bizCode}`, '确定合同审批通过吗?')
  }

  /**
   * 合同审批不通过
   * **/
  unAudit(bizCode) {
    return this.updateModel({}, `/api/contract/info/unAudit?bizCode=${bizCode}`, '确定合同审批不通过!')
  }

  /**
   * 合同变更列表
   * **/
  changeList(param) {
    return this.fetchList(param, `/api/contract/change/list`)
  }


  /**
   * 保存合同基本信息
   * **/
  save(param) {
    return this.updateModel(param, `/api/contract/info/save`)
  }

  /**
   * 授信生成合同的初始化
   * **/
  contractInit(param) {
    return this.updateModel(param, `/api/contract/init`)
  }

}

const sysApp = new Model()

export default sysApp
