import RestModel from '@/api/restmodel_hz'

class Model extends RestModel{
  /**
   * 查询授信模块数据字典
   * **/
  dict(param = {}) {
    return this.fetchList(param, `/api/credit/dict`)
  }

  /**
   * 查询授信列表
   * **/
  creditList(param = {}) {
    return this.fetchList(param, `/api/credit/creditList`)
  }

  /**
   * 查询授信列表
   * **/
  fetchCreditPlatform(bizCode = '') {
    return this.fetchList({}, `/api/credit/query/creditPlatform?bizCode=${bizCode}`)
  }

  /**
   * 保存平台授信
   * **/
  saveCreditPlatform(param = {}) {
    return this.updateModel(param, `/api/credit/save/creditPlatform`, '此操作将保存平台授信！ 是否继续？')
  }

  /**
   * 删除平台授信
   * **/
  deleteCreditPlatform(bizCode) {
    return this.updateModel({}, `/api/credit/delete/creditPlatform?bizCode=${bizCode}`, '此操作将删除平台授信！ 是否继续？')
  }

  /**
   * 查询授信担保
   * **/
  fetchCreditGua(bizCode = '') {
    return this.fetchList({}, `/api/credit/query/creditGua?bizCode=${bizCode}`)
  }

  /**
   * 保存授信担保
   * **/
  saveCreditGua(param = {}) {
    return this.updateModel(param, `/api/credit/save/creditGua`, '此操作将保存授信担保！ 是否继续？')
  }

  /**
   * 查询保理授信
   * **/
  fetchCreditFt(bizCode = '') {
    return this.fetchList({}, `/api/credit/query/creditFt?bizCode=${bizCode}`)
  }

  /**
   * 保存保理授信
   * **/
  saveCreditFt(param = {}) {
    return this.updateModel(param, `/api/credit/save/creditFt`, '此操作将保存保理授信！ 是否继续？')
  }

  /**
   * 查询保理授信应收账款
   * **/
  fetchReceivables(bizCode = '') {
    return this.fetchList({}, `/api/credit/query/receivables?bizCode=${bizCode}`)
  }

  /**
   * 保存保理授信应收账款
   * **/
  saveReceivables(param = {}) {
    return this.updateModel(param, `/api/credit/save/receivables`, '此操作将保存保理授信应收账款！ 是否继续？')
  }

  /**
   * 查询授信记录
   * **/
  fetchCreditHistory(bizCode = '') {
    return this.fetchList({}, `/api/credit/query/creditHistory?bizCode=${bizCode}`)
  }

  /**
   * 查询授信资料
   * **/
  fetchCredFile(bizCode = '') {
    return this.fetchList({}, `/api/credit/query/credFile?bizCode=${bizCode}`)
  }

  /**
   * 保存授信资料
   * **/
  saveCredFile(param = {}) {
    return this.updateModel(param, `/api/credit/save/credFile`, '此操作将保存授信资料！ 是否继续？')
  }

  /**
   * 授信审批通过
   * **/
  passCredit(bizCode = '') {
    return this.updateModel({}, `/api/credit/pass/credit?bizCode=${bizCode}`, '此操作将授信审批通过！ 是否继续？')
  }

  /**
   * 授信审批不通过
   * **/
  rejectCredit(bizCode = '') {
    return this.updateModel({}, `/api/credit/reject/credit?bizCode=${bizCode}`, '此操作将授信审批不通过！ 是否继续？')
  }

  /**
   * 查询额度分配列表
   * **/
  credDistributionList(param = {}) {
    return this.fetchList(param, `/api/credit/credDistributionList`)
  }

  /**
   * 查询额度分配
   * **/
  fetchCredDistribution({ bizCode = '', credBizCode = '' }) {
    let url = ''
    if (bizCode && credBizCode) url = `/api/credit/query/credDistribution?bizCode=${bizCode}&&credBizCode=${credBizCode}`
    if (bizCode && !credBizCode) url = `/api/credit/query/credDistribution?bizCode=${bizCode}`
    if (!bizCode && credBizCode) url = `/api/credit/query/credDistribution?credBizCode=${credBizCode}`
    if (!bizCode && !credBizCode) url = `/api/credit/query/credDistribution`
    return this.fetchList({}, url)
  }

  /**
   * 保存额度分配
   * **/
  saveCredDistribution(param = {}) {
    return this.updateModel(param, `/api/credit/save/credDistribution`, '此操作将保存额度分配！ 是否继续？')
  }

  /**
   * 查询额度分配资料
   * **/
  fetchCredDistributionFile(param = {}) {
    return this.fetchList(param, `/api/credit/query/credDistributionFile`)
  }

  /**
   * 保存额度分配资料
   * **/
  saveCredDistributionFile(param = {}) {
    return this.updateModel(param, `/api/credit/save/credDistributionFile`, '此操作将保存额度分配资料！ 是否继续？')
  }

  /**
   * 删除额度分配
   * **/
  deleteCredDistribution(bizCode = '') {
    return this.updateModel({}, `/api/credit/delete/credDistribution?bizCode=${bizCode}`, '此操作将删除额度分配！ 是否继续？')
  }

  /**
   * 额度分配审批通过
   * **/
  passCredDistribution(bizCode = '') {
    return this.updateModel({}, `/api/credit/pass/credDistribution?bizCode=${bizCode}`, '此操作将额度分配审批通过！ 是否继续？')
  }

  /**
   * 额度分配审批不通过
   * **/
  rejectCredDistribution(bizCode = '') {
    return this.updateModel({}, `/api/credit/reject/credDistribution?bizCode=${bizCode}`, '此操作将不通过额度分配审批！ 是否继续？')
  }

  /**
   * 查询授信变更列表
   * **/
  credChangeList(param = {}) {
    return this.fetchList(param, `/api/credit/credChangeList`)
  }

  /**
   * 查询额度分配
   * **/
  fetchCredChange({ bizCode = '', credBizCode = '' }) {
    const base = '/api/credit/query/credChange'
    let url = ''
    if (bizCode && credBizCode) url = `${base}?bizCode=${bizCode}&&credBizCode=${credBizCode}`
    if (bizCode && !credBizCode) url = `${base}?bizCode=${bizCode}`
    if (!bizCode && credBizCode) url = `${base}?credBizCode=${credBizCode}`
    if (!bizCode && !credBizCode) url = `${base}`
    return this.fetchList({}, url)
  }

  /**
   * 保存授信变更
   * **/
  saveCredChange(param = {}) {
    return this.updateModel(param, `/api/credit/save/credChange`, '此操作将保存授信变更！ 是否继续？')
  }

  /**
   * 删除授信变更
   * **/
  deleteCredChange(bizCode = '') {
    return this.updateModel({}, `/api/credit/delete/credChange?bizCode=${bizCode}`, '此操作将删除授信变更！ 是否继续？')
  }

  /**
   * 额度分配审批通过
   * **/
  passCredChange(bizCode = '') {
    return this.updateModel({}, `/api/credit/pass/credChange?bizCode=${bizCode}`, '此操作将通过授信变更审批！ 是否继续？')
  }

  /**
   * 授信变更审批不通过
   * **/
  rejectCredChange(bizCode = '') {
    return this.updateModel({}, `/api/credit/reject/credChange?bizCode=${bizCode}`, '此操作将不通过授信变更审批！ 是否继续？')
  }

  /**
   * 根据客户类型查询企业客户列表
   * **/
  fetchCompList(compdif = '') {
    return this.fetchList({}, `/api/credit/query/compList?bizCode=${compdif}`)
  }

  /**
   * 根据客户类型查询个人客户列表
   * **/
  fetchUserList(userdif = '') {
    return this.fetchList({}, `/api/credit/query/userList?bizCode=${userdif}`)
  }
}

const sysApp = new Model()

export default sysApp
