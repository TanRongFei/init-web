
import Layout from '@/layout'

export default [
  {
    path: '/crm',
    component: Layout,
    redirect: '/crm/corporation',
    alwaysShow: true, // will always show the root menu
    name: 'crm',
    meta: {
      title: 'CRM',
      icon: 'lock'
    },
    children: [
      {
        path: 'corporation',
        redirect: 'corporation/corporation',
        component: () => import('@/views/pages/crm/corporation'),
        name: 'corporation',
        meta: {
          title: '企业客户'
        },
        children: [
          {
            path: 'corporation',
            component: () => import('@/views/pages/crm/corporation/corporation'),
            name: 'corporation',
            meta: {
              title: '企业客户'
            }
          },
          {
            path: 'corporation/edit',
            hidden: true,
            redirect: 'corporation/edit/corporation',
            component: () => import('@/views/pages/crm/corporation/corporation/edit'),
            name: 'corporationEdit',
            meta: {
              title: '企业客户'
            },
            children: [
              {
                path: 'corporation',
                component: () => import('@/views/pages/crm/corporation/corporation/corporation/edit.vue'),
                name: 'corporationBaseEdit',
                meta: {
                  title: '基本信息'
                }
              },
              {
                path: 'account',
                component: () => import('@/views/pages/crm/corporation/corporation/account/edit.vue'),
                name: 'corporationAccountEdit',
                meta: {
                  title: '账户信息'
                }
              },
              {
                path: 'bill',
                component: () => import('@/views/pages/crm/corporation/corporation/bill/edit.vue'),
                name: 'corporationBillEdit',
                meta: {
                  title: '开票信息'
                }
              },
              {
                path: 'des',
                component: () => import('@/views/pages/crm/corporation/corporation/des/edit.vue'),
                name: 'corporationDesEdit',
                meta: {
                  title: '企业介绍'
                }
              },
              {
                path: 'employee',
                component: () => import('@/views/pages/crm/corporation/corporation/employee/edit.vue'),
                name: 'corporationEmployeeEdit',
                meta: {
                  title: '企业用户'
                }
              },
              {
                path: 'file',
                component: () => import('@/views/pages/crm/corporation/corporation/file/edit.vue'),
                name: 'corporationFileEdit',
                meta: {
                  title: '资料文件'
                }
              }

            ]
          },
          {
            path: 'corporation/view',
            hidden: true,
            redirect: 'corporation/view/corporation',
            component: () => import('@/views/pages/crm/corporation/corporation/view.vue'),
            name: 'corporationView',
            meta: {
              title: '企业客户'
            },
            children: [
              {
                path: 'corporation',
                component: () => import('@/views/pages/crm/corporation/corporation/corporation/view.vue'),
                name: 'corporationBaseView',
                meta: {
                  title: '基本信息'
                }
              },
              {
                path: 'account',
                component: () => import('@/views/pages/crm/corporation/corporation/account/view.vue'),
                name: 'corporationAccountView',
                meta: {
                  title: '账户信息'
                }
              },
              {
                path: 'bill',
                component: () => import('@/views/pages/crm/corporation/corporation/bill/view.vue'),
                name: 'corporationBillView',
                meta: {
                  title: '开票信息'
                }
              },
              {
                path: 'des',
                component: () => import('@/views/pages/crm/corporation/corporation/des/view.vue'),
                name: 'corporationDesView',
                meta: {
                  title: '企业介绍'
                }
              },
              {
                path: 'employee',
                component: () => import('@/views/pages/crm/corporation/corporation/employee/view.vue'),
                name: 'corporationEmployeeView',
                meta: {
                  title: '企业用户'
                }
              },
              {
                path: 'file',
                component: () => import('@/views/pages/crm/corporation/corporation/file/view.vue'),
                name: 'corporationFileView',
                meta: {
                  title: '资料文件'
                }
              },
              {
                path: 'role',
                component: () => import('@/views/pages/crm/corporation/corporation/role/view.vue'),
                name: 'corporationRoleView',
                meta: {
                  title: '企业角色'
                }
              }

            ]
          },

          {
            path: 'change',
            component: () => import('@/views/pages/crm/corporation/change'),
            name: 'change',
            meta: {
              title: '客户信息变更'
            }
          },
          {
            path: 'org',
            component: () => import('@/views/pages/crm/corporation/org'),
            name: 'org',
            meta: {
              title: '组织架构'
            }
          },
          {
            path: 'manager',
            component: () => import('@/views/pages/crm/corporation/manager'),
            name: 'manager',
            meta: {
              title: '管理员变更'
            }
          }
        ]

      },
      {
        path: 'personal',
        redirect: 'personal/personal',
        component: () => import('@/views/pages/crm/personal'),
        name: 'personal',
        meta: {
          title: '个人客户'
        },
        children: [
          {
            path: 'personal',
            component: () => import('@/views/pages/crm/personal/personal'),
            name: 'personal',
            meta: {
              title: '个人客户'
            }
          },
          {
            path: 'change',
            component: () => import('@/views/pages/crm/personal/change'),
            name: 'change',
            meta: {
              title: '个人客户变更'
            }
          }
        ]
      }
    ]
  }
]
