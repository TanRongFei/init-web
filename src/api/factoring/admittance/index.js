import RestModel from '@/api/restmodel_hz'

class Model extends RestModel{
  // 保理准入插入接口
  // type: cust-企业客户  user-个人账户
  infoSave(param, type = 'cust') {
    return this.updateModel(param, `/api/permit/${type}/info/save`, '此操作将准入插入！ 是否继续？')
  }
z
  // 保理准入页面初始化接口
  // type: cust-企业客户  user-个人账户
  listDict(param, type = 'cust') {
    return this.fetchList(param, `/api/permit/${type}/list/dict`)
  }

  // 保理准入页面初始化接口
  // type: cust-企业客户  user-个人账户
  list(param, type = 'cust') {
    return this.fetchList(param, `/api/permit/${type}/list`)
  }

  // 保理准入列表初始化
  // type: cust-企业客户  user-个人账户
  open(param, type = 'cust') {
    return this.updateModel(param, `/api/permit/${type}/open`, '此操作将准入开通！ 是否继续？')
  }

  // 保理准入列表初始化
  // type: cust-企业客户  user-个人账户
  disable(param, type = 'cust') {
    return this.updateModel(param, `/api/permit/${type}/disable`, '此操作将准入关闭！ 是否继续？')
  }

  // 保理准入列表初始化
  // 标示客户
  // type: cust-企业客户  user-个人账户
  setCustRole(param, type = 'cust') {
    let url = ''
    if (type === 'cust') {
      url = `/api/permit/cust/setCustRole`
    } else {
      url = `/api/permit/user/setUserRole`
    }
    return this.updateModel(param, url, '此操作将标示客户！ 是否继续？')
  }

  // 保理准入企业角色回显
  // type: cust-企业客户  user-个人账户
  getRole(code, type = 'cust') {
    let url = ''
    if (type === 'cust') {
      url = `/api/permit/cust/getCustRole?CompCode=${code}`
    } else {
      url = `/api/permit/user/getUserRole?userCode=${code}`
    }
    return this.fetchList({}, url)
  }
}

const sysApp = new Model()

export default sysApp
