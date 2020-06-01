import request from '@/utils/request'
/** 企业基本信息 */

/**
 * 分页查询企业信息列表页
 * @param {Page} query
 */
const pageQueryList = (query) => {
  return request({
    url:'/crm/company/comp/comp/list',
    method: 'post',
    data: query
  })
}
/**
 * 分页查询-数据字典
 * 
 */
const listDict = () => {
  return request({
    url:'/crm/company/comp/comp/list/dict',
    method: 'post',
    data: {}
  })
}
/**
 * 编辑-数据字典
 * 
 */
const infoDict = () => {
  return request({
    url:'/crm/company/comp/comp/edit/infoDict',
    method: 'post',
    data: {}
  })
}
/**
 * 新增-企业
 * 
 */
const compAdd = (query) => {
  return request({
    url:'/crm/company/comp/comp/info/add',
    method: 'post',
    data: query
  })
}
/**
 * 编辑-企业
 * 
 */
const compUpdate = (query) => {
  return request({
    url:'/crm/company/comp/comp/info/update',
    method: 'post',
    data: query
  })
}
/**
 * 查看-企业
 * 
 */
const compView = (query) => {
  return request({
    url:`/crm/company/comp/comp/info/view?compCode=${query}`,
    method: 'post',
    data: {}
  })
}
/**
 * 上级单位list
 * 
 */
const supCompFind = () => {
  return request({
    url:`/crm/company/comp/supComp/find?compName=${query}`,
    method: 'post',
    data: {}
  })
}
/**
 * 删除企业
 * @param {*} query
 */
const compDel = (query) => {
  return request({
    url:`/crm/company/comp/comp/info/del?bizCode=${query}`,
    method: 'post',
    data: {}
  })
}

export default {
  pageQueryList,
  compDel,
  listDict,
  infoDict,
  compAdd,
  compView,
  compUpdate
}
