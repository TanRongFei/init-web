// import * as rules from '@/utils/rules'
// import { isvalidUsername } from '@/utils/validate'

export function checkPhone(rule, value, callback) {
  const reg = /^1(3|4|5|7|8)\d{9}$/
  if (!value) {
    return callback(new Error('请填写手机号码'))
  } else if (!reg.test(value)) {
    return callback(new Error('手机号码不正确'))
  } else {
    callback()
  }
}

export default {
  data() {
    // const valPhone = (rule, value, callback) => rules.checkPhone(rule, this.dialogData.tel, callback)
    const valPhone = (rule, value, callback) => {
      const reg = /^1(3|4|5|7|8)\d{9}$/
      if (!value) {
        return callback(new Error('请填写手机号码'))
      } else if (!reg.test(value)) {
        return callback(new Error('手机号码不正确'))
      } else {
        callback()
      }
    }

    const valTel = (rule, value, callback) => {
      const reg = /^[0-9]{1}[-_0-9]{4,25}$/
      if (!value) {
        return callback()
      } else if (!reg.test(value)) {
        return callback(new Error('格式不正确'))
      } else {
        callback()
      }
    }

    const valEmail = (rule, value, callback) => {
      const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/
      if (!value) {
        return callback()
      } else if (!reg.test(value)) {
        return callback(new Error('邮箱格式不正确'))
      } else {
        callback()
      }
    }

    const checkWx = (rule, value, callback) => {
      const reg = /^[a-zA-Z0-9]{1}[-_a-zA-Z0-9]{4,19}$/
      if (!value) {
        return callback()
      } else if (!reg.test(value)) {
        return callback(new Error('微信格式不正确'))
      } else {
        callback()
      }
    }

    return {
      rules: {
        telephone: [
          { required: true, message: '必填', trigger: 'change' },
          { validator: valPhone, trigger: 'change' }
        ],
        tel2: [
          { validator: valTel, trigger: 'change' }
        ],
        faceImage: [
          { required: true, message: '必传', trigger: 'change' }
        ],
        email: [
          // { required: true, message: '必填', trigger: 'change' },
          { validator: valEmail, trigger: 'change' }
        ],
        wxId: [
          // { required: true, message: '必填', trigger: 'change' },
          { validator: checkWx, trigger: 'change' }
        ],
        userName: [
          { required: true, message: '必填', trigger: 'change' },
          { max: 50, message: '长度超出了50个字符', trigger: 'change' }
        ],
        startDate: [
          // { required: true, message: '必填', trigger: 'change' },
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        deviceType: [
          { required: true, message: '必填', trigger: 'change' }
        ]
      }
    }
  }
}
