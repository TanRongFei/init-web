import request from '@/utils/request'
import moment from 'moment'

export function FormatDateTime(sour) {
  var rtn = {}
  for (var key in sour) {
    var dtval = sour[key] + ''
    var reg = /^(\d+)-(\d{1,2})-(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/
    var r = dtval.match(reg)
    if (r != null) {
      var tmp = new Date(dtval)
      if (!isNaN(tmp.getDay())) {
        // 'yyyy-mm-ddThh:mm:ss000Z
        // rtn[key] = (new Date(dtval)).toISOString()
        // rtn[key] = dtval.split(' ').join('T') + '.000Z'
        rtn[key] = moment(dtval).utc().format('YYYY-MM-DD HH:mm:ss').split(' ').join('T') + '.000Z'
        console.info('convert datetime', dtval, rtn[key])
        continue
      }
    }
    rtn[key] = sour[key]
  }
  // 兼容ie时间格式
  for (const key in rtn) {
    if (key === 'createDate' || key === 'updateDate' || key === 'birthday' || key === 'hiredate' || key === 'leavedate') {
      if (rtn[key] && rtn[key].indexOf('000Z') <= -1) {
        rtn[key] = moment(rtn[key]).utc().format('YYYY-MM-DD HH:mm:ss').split(' ').join('T') + '.000Z'
      }
    }
  }
  console.log('rtn', rtn)
  return rtn
}

export default class RestModel {
  constructor(url, newModel) {
    this.Modelname = url
    this.model = newModel
  }

  newModel() {
    return Object.assign({}, this.model)
  }
  fetchList(query) {
    return request({
      url: this.Modelname,
      method: 'post',
      data: query
    }).then(response => response.body)
      .catch(res => res)
  }
  createModel(data) {
    // 设置插入标志
    return request({
      url: this.Modelname,
      method: 'post',
      data
    }).then(response => response.body)
  }
  updateModel(data) {
    return request({
      url: this.Modelname,
      method: 'post',
      data
    }).then(response => response.body)
  }
  // 获取crm客户列表
  corporationList = query => {
    return request({
      url: this.Modelname,
      method: 'post',
      data: query
    })
  }
  // crm客户删除
  delList = query => {
    return request({
      url: `${this.Modelname}?${query}`,
      method: 'post',
      data: {}
    })
  }
  // crm客户查看
  lookList = query => {
    return request({
      url: `${this.Modelname}?${query}`,
      method: 'post',
      data: {}
    })
  }
  // crm客户修改
  emitList = query => {
    return request({
      url: `${this.Modelname}?${query}`,
      method: 'post',
      data: {}
    })
  }
  // crm客户增加
  addList = query => {
    return request({
      url: this.Modelname,
      method: 'post',
      data: query
    })
  }
}

