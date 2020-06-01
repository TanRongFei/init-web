import request from '@/utils/request'
/** 地址 */

/**
 * 查询省
 * 
 */
const getRegAddrProvinces = () => {
  return request({
    url:'/data/province/list',
    method: 'post',
    data: {}
  })
}
/**
 * 查询市、区
 * 
 */
const getRegAddrCitys = (query) => {
  return request({
    url:`/data/area/list?pid=${query}`,
    method: 'post',
    data: {}
  })
}
/**行业分类-大
 * 
 */
const getBusTypeBigs = () => {
  return request({
    url:'/data/linkage/list',
    method: 'post',
    data: {}
  })
}
/**
 * 行业分类-中、小
 * 
 */
const getBusTypeSmalls = (query) => {
  return request({
    url:`/data/linkage/getChild?pid=${query}`,
    method: 'post',
    data: {}
  })
}

export default {
  getRegAddrProvinces,
  getRegAddrCitys,
  getBusTypeBigs,
  getBusTypeSmalls
}
