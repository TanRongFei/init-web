import request from '@/utils/request'

/** 企业基本信息 */

/**
 * 分页查询企业信息列表页
 * @param {Page} query
 */
const pageQueryList = (query) => {
  return request({
    url: '/crm/ajax/comp/list',
    method: 'post',
    data: query
  })
}

/**
 * 删除企业
 * @param {*} query
 */
const del = (query) => {
  return request({
    url: '/crm/ajax/comp/info/del',
    method: 'post',
    data: query
  })
}

export default {
  pageQueryList,
  del
}
