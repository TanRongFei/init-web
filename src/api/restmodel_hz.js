import request from '@/utils/request'
import moment from 'moment'
import { MessageBox  } from 'element-ui'

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

  fetchList(query, url) {
    return request({
      url,
      method: 'post',
      data: query
    }).then(response => {
      return response.body
    })
  }
  createModel(data, url) {
    // 设置插入标志
    return request({
      url,
      method: 'post',
      data
    }).then(response => response.body)
  }
  updateModel(data, url, message) {
    if (!message) {
      return request({
        url,
        method: 'post',
        data
      }).then(response => response.body)
    }
    return MessageBox.confirm(`${message ? message : '是否继续?'}`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      return request({
        url,
        method: 'post',
        data
      }).then(response => response.body)
    }).catch(() => {
      this.$message({
        type: 'info',
        message: '已取消删除'
      });
    })
  }
}

