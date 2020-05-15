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
  constructor(name, newModel) {
    this.Modelname = name
    this.model = newModel
  }
  newModel() {
    return Object.assign({}, this.model)
  }
  fetchList(query) {
    var payload = {}
    payload[this.Modelname] = query
    return request({
      url: '/rest/r/' + this.Modelname,
      method: 'post',
      data: payload
    }).then(response => response.data[this.Modelname])
      .catch(res => res)
  }
  createModel(data) {
    // 设置插入标志
    data['id'] = 0
    var payload = {}
    payload[this.Modelname] = [FormatDateTime(data)]
    return request({
      url: '/rest/w/' + this.Modelname,
      method: 'post',
      data: payload
    }).then(response => response.data[this.Modelname])
  }
  updateModel(data) {
    // 设置更新标志
    var payload = {}
    payload[this.Modelname] = [FormatDateTime(data)]
    return request({
      url: '/sso/rest/w/' + this.Modelname,
      method: 'post',
      data: payload
    }).then(response => response.data[this.Modelname])
  }
}

