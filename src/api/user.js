import request from '@/utils/request'

export function login(params) {
  // const formData = new FormData()
  // Object.keys(params).forEach((key) => {
  //   formData.append(key, params[key])
  // })

  return request({
    url: '/admin/login/user/login',
    method: 'post',
    data: params
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-element-admin/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}
