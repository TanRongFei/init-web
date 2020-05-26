import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  // {
  //   path: '/redirect',
  //   component: Layout,
  //   hidden: true,
  //   children: [
  //     {
  //       path: '/redirect/:path(.*)',
  //       component: () => import('@/views/redirect/index')
  //     }
  //   ]
  // },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        // component: () => import('@/views/dashboard/index'),
        component: () => import('@/views/pages/work/index'),
        name: 'Dashboard',
        meta: { title: '工作', icon: 'dashboard', affix: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  // {
  //   path: '/work',
  //   component: Layout,
  //   redirect: '/work/index',
  //   alwaysShow: true, // will always show the root menu
  //   name: 'work',
  //   meta: {
  //     title: '工作',
  //     icon: 'lock'
  //   },
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/pages/work/index'),
  //       name: 'work',
  //       meta: {
  //         title: 'Page work'
  //       }
  //     }
  //   ]
  // },

  {
    path: '/factoring',
    component: Layout,
    redirect: '/factoring/survey',
    alwaysShow: true, // will always show the root menu
    name: 'factoring',
    meta: {
      title: '保理',
      icon: 'lock'
    },
    children: [
      {
        path: 'survey',
        component: () => import('@/views/pages/factoring/survey'),
        name: 'survey',
        meta: {
          title: '概况'
        }
      },
      {
        path: 'permit',
        component: () => import('@/views/pages/factoring/permit'),
        redirect: '/factoring/permit/corp',
        leftSidebar: '/factoring/permit',
        name: 'permit',
        meta: {
          title: '准入'
        },
        children: [
          {
            path: 'corp',
            component: () => import('@/views/pages/factoring/permit/corp'),
            leftSidebar: '/factoring/permit',
            name: 'corp',
            meta: {
              title: '企业客户'
            }
          },
          {
            path: 'person',
            component: () => import('@/views/pages/factoring/permit/person'),
            leftSidebar: '/factoring/permit',
            name: 'person',
            meta: {
              title: '个人客户'
            }
          },
          {
            path: 'business-profile-statistics',
            component: () => import('@/views/pages/factoring/permit/business-profile-statistics'),
            leftSidebar: '/factoring/permit',
            name: 'business-profile-statistics',
            meta: {
              title: '业务概况统计'
            }
          }
        ]
      },
      {
        path: 'credit',
        component: () => import('@/views/pages/factoring/index'),
        redirect: '/factoring/credit/mgr',
        leftSidebar: '/factoring/credit',
        name: 'credit',
        meta: {
          title: '授信'
        },
        children: [
          {
            path: 'mgr',
            component: () => import('@/views/pages/factoring/credit/mgr'),
            leftSidebar: '/factoring/credit',
            name: 'mgr',
            meta: {
              title: '授信管理'
            }
          },
          {
            path: 'quota',
            component: () => import('@/views/pages/factoring/credit/quota'),
            leftSidebar: '/factoring/credit',
            name: 'quota',
            meta: {
              title: '额度管理'
            }
          },
          {
            path: 'chg',
            component: () => import('@/views/pages/factoring/credit/chg'),
            leftSidebar: '/factoring/credit',
            name: 'chg',
            meta: {
              title: '授信变更'
            }
          },
          {
            path: 'corp-detail',
            hidden: true,
            component: () => import('@/views/pages/factoring/credit/corp-detail'),
            redirect: '/factoring/credit/corp-detail/basic-info',
            tabsSidebar: '/factoring/credit/corp-detail',
            name: 'CorpDetail',
            meta: {
              title: '详情'
            },
            children: [
              {
                path: 'basic-info',
                component: () => import('@/views/pages/factoring/credit/corp-detail/basic-info'),
                tabsSidebar: '/factoring/credit/corp-detail',
                name: 'basic-info',
                meta: {
                  title: '基本信息'
                }
              }
            ]
          },
          {
            path: 'personal-detail',
            hidden: true,
            component: () => import('@/views/pages/factoring/credit/personal-detail'),
            name: 'PersonalDetail',
            meta: {
              title: '详情'
            }
          },
          {
            path: 'credit-detail',
            hidden: true,
            component: () => import('@/views/pages/factoring/index'),
            redirect: '/factoring/credit/credit-detail/basic-info',
            leftSidebar: '/factoring/credit/credit-detail',
            name: 'CreditDetail',
            meta: {
              title: '详情'
            },
            children: [
              {
                path: 'basic-info',
                component: () => import('@/views/pages/factoring/credit/detail/basic-info'),
                leftSidebar: '/factoring/credit/credit-detail',
                name: 'basic-info',
                meta: {
                  title: '基本信息'
                }
              },
              {
                path: 'scheme-info',
                component: () => import('@/views/pages/factoring/credit/detail/guarantee-info'),
                leftSidebar: '/factoring/credit/credit-detail',
                name: 'scheme-info',
                meta: {
                  title: '担保信息'
                }
              },
              {
                path: 'accounts-receivable',
                component: () => import('@/views/pages/factoring/credit/detail/factoring-facility'),
                leftSidebar: '/factoring/credit/credit-detail',
                fullPath: '/factoring/credit/credit-detail/accounts-receivable',
                name: 'accounts-receivable',
                meta: {
                  title: '保理信息'
                }
              },
              {
                path: 'commercial-terms',
                component: () => import('@/views/pages/factoring/credit/detail/credit-record'),
                leftSidebar: '/factoring/credit/credit-detail',
                name: 'commercial-terms',
                meta: {
                  title: '授信记录'
                }
              },
              {
                path: 'information',
                component: () => import('@/views/pages/factoring/credit/detail/information'),
                leftSidebar: '/factoring/credit/credit-detail',
                name: 'information',
                meta: {
                  title: '资料信息'
                }
              }
            ]
          }
        ]
      },
      {
        path: 'contract',
        component: () => import('@/views/pages/factoring/index'),
        redirect: '/factoring/contract/mgr',
        leftSidebar: '/factoring/contract',
        name: 'contract',
        meta: {
          title: '合同'
        },
        children: [
          {
            path: 'mgr',
            component: () => import('@/views/pages/factoring/contract/mgr'),
            leftSidebar: '/factoring/contract',
            name: 'mgr',
            meta: {
              title: '合同制作'
            }
          },
          {
            path: 'chg',
            component: () => import('@/views/pages/factoring/contract/chg'),
            leftSidebar: '/factoring/contract',
            name: 'chg',
            meta: {
              title: '合同变更'
            }
          },
          {
            path: 'handover',
            component: () => import('@/views/pages/factoring/contract/handover'),
            leftSidebar: '/factoring/contract',
            name: 'handover',
            meta: {
              title: '合同资料交接'
            }
          },
          {
            path: 'contract-detail',
            component: () => import('@/views/pages/factoring/index'),
            hidden: true,
            redirect: '/factoring/contract/contract-detail/basic-info',
            leftSidebar: '/factoring/contract/contract-detail',
            name: 'contractDetail',
            meta: {
              title: '合同详情'
            },
            children: [
              {
                path: 'basic-info',
                component: () => import('@/views/pages/factoring/contract/detail/basic-info'),
                leftSidebar: '/factoring/contract/contract-detail',
                name: 'basic-info',
                meta: {
                  title: '基本信息'
                }
              },
              {
                path: 'scheme-info',
                component: () => import('@/views/pages/factoring/contract/detail/scheme-info'),
                leftSidebar: '/factoring/contract/contract-detail',
                name: 'scheme-info',
                meta: {
                  title: '方案信息'
                }
              },
              {
                path: 'accounts-receivable',
                component: () => import('@/views/pages/factoring/contract/detail/accounts-receivable'),
                leftSidebar: '/factoring/contract/contract-detail',
                name: 'accounts-receivable',
                meta: {
                  title: '应收账款'
                }
              },
              {
                path: 'commercial-terms',
                component: () => import('@/views/pages/factoring/contract/detail/commercial-terms'),
                leftSidebar: '/factoring/contract/contract-detail',
                name: 'commercial-terms',
                meta: {
                  title: '商务条款'
                }
              },
              {
                path: 'zhongdeng',
                component: () => import('@/views/pages/factoring/contract/detail/credit-info'),
                leftSidebar: '/factoring/contract/contract-detail',
                name: 'zhongdeng',
                meta: {
                  title: '用信信息'
                }
              },
              {
                path: 'information',
                component: () => import('@/views/pages/factoring/contract/detail/information'),
                leftSidebar: '/factoring/contract/contract-detail',
                name: 'information',
                meta: {
                  title: '资料信息'
                }
              }
            ]
          }
        ]
      },
      {
        path: 'pa',
        component: () => import('@/views/pages/factoring/index'),
        redirect: '/factoring/pa/mgr',
        fullPath: '/factoring/pa/mgr',
        leftSidebar: '/factoring/pa',
        name: 'pa',
        meta: {
          title: '前期款'
        },
        children: [
          {
            path: 'mgr',
            fullPath: '/factoring/pa/mgr',
            leftSidebar: '/factoring/pa',
            component: () => import('@/views/pages/factoring/pa/mgr'),
            name: 'mgr',
            meta: {
              title: '前期款'
            }
          }
        ]
      },
      {
        path: 'loan',
        component: () => import('@/views/pages/factoring/index'),
        redirect: '/factoring/loan/apply',
        leftSidebar: '/factoring/loan',
        name: 'loan',
        meta: {
          title: '放款'
        },
        children: [
          {
            path: 'apply',
            component: () => import('@/views/pages/factoring/loan/apply'),
            leftSidebar: '/factoring/loan',
            name: 'apply',
            meta: {
              title: '放款申请'
            }
          },
          {
            path: 'plan',
            component: () => import('@/views/pages/factoring/loan/plan'),
            leftSidebar: '/factoring/loan',
            name: 'plan',
            meta: {
              title: '还款计划'
            }
          },
          {
            path: 'chg',
            component: () => import('@/views/pages/factoring/loan/chg'),
            leftSidebar: '/factoring/loan',
            name: 'chg',
            meta: {
              title: '还款计划变更'
            }
          },
          {
            path: 'loan-detail',
            component: () => import('@/views/pages/factoring/index'),
            hidden: true,
            redirect: '/factoring/loan/loan-detail/receivable',
            leftSidebar: '/factoring/loan/loan-detail',
            name: 'loanDetail',
            meta: {
              title: '放款详情'
            },
            children: [
              {
                path: 'receivable',
                component: () => import('@/views/pages/factoring/loan/detail/receivable'),
                leftSidebar: '/factoring/loan/loan-detail',
                name: 'receivable',
                meta: {
                  title: '应收账款'
                }
              },
              {
                path: 'scheme-info',
                component: () => import('@/views/pages/factoring/loan/detail/scheme-info'),
                leftSidebar: '/factoring/loan/loan-detail',
                name: 'scheme-info',
                meta: {
                  title: '方案信息'
                }
              },
              {
                path: 'commercial-terms',
                component: () => import('@/views/pages/factoring/loan/detail/commercial-terms'),
                leftSidebar: '/factoring/loan/loan-detail',
                name: 'commercial-terms',
                meta: {
                  title: '前期款'
                }
              },
              {
                path: 'zhongdeng',
                component: () => import('@/views/pages/factoring/loan/detail/zhongdeng'),
                leftSidebar: '/factoring/loan/loan-detail',
                name: 'zhongdeng',
                meta: {
                  title: '中登网'
                }
              },
              {
                path: 'pay',
                fullPath: '/factoring/loan/loan-detail/pay',
                component: () => import('@/views/pages/factoring/loan/detail/pay'),
                leftSidebar: '/factoring/loan/loan-detail',
                name: 'pay',
                meta: {
                  title: '付款信息'
                }
              },
              {
                path: 'information',
                component: () => import('@/views/pages/factoring/loan/detail/information'),
                leftSidebar: '/factoring/loan/loan-detail',
                name: 'information',
                meta: {
                  title: '资料信息'
                }
              }
            ]
          }
        ]
      },
      {
        path: 'accounts',
        component: () => import('@/views/pages/factoring/index'),
        redirect: '/factoring/accounts/incomie',
        leftSidebar: '/factoring/accounts',
        name: 'accounts',
        meta: {
          title: '账款'
        },
        children: [
          {
            path: 'incomie',
            fullPath: '/factoring/accounts/incomie',
            component: () => import('@/views/pages/factoring/accounts/incomie'),
            leftSidebar: '/factoring/accounts',
            name: 'incomie',
            meta: {
              title: '来款管理'
            }
          },
          {
            path: 'paid',
            fullPath: '/factoring/accounts/paid',
            component: () => import('@/views/pages/factoring/accounts/paid'),
            leftSidebar: '/factoring/accounts',
            name: 'paid',
            meta: {
              title: '来款核销'
            }
          },
          {
            path: 'other-expenses-incoming',
            fullPath: '/factoring/accounts/other-expenses-incoming',
            component: () => import('@/views/pages/factoring/accounts/other-expenses-incoming'),
            leftSidebar: '/factoring/accounts',
            name: 'other-expenses-incoming',
            meta: {
              title: '其他费用核销'
            }
          }
        ]
      },
      {
        path: 'bank',
        component: () => import('@/views/pages/factoring/index'),
        redirect: '/factoring/bank/mgr',
        leftSidebar: '/factoring/bank',
        name: 'bank',
        meta: {
          title: '账户'
        },
        children: [
          {
            path: 'mgr',
            component: () => import('@/views/pages/factoring/bank/mgr'),
            leftSidebar: '/factoring/bank',
            name: 'mgr',
            meta: {
              title: '公司账户'
            }
          }
        ]
      },
      {
        path: 'files',
        component: () => import('@/views/pages/factoring/index'),
        redirect: '/factoring/files/mgr',
        leftSidebar: '/factoring/files',
        name: 'files',
        meta: {
          title: '档案'
        },
        children: [
          {
            path: 'mgr',
            component: () => import('@/views/pages/factoring/files/mgr'),
            leftSidebar: '/factoring/files',
            name: 'mgr',
            meta: {
              title: '档案管理'
            }
          }
        ]
      }
    ]
  },

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
        component: () => import('@/views/pages/CRM/enterprise-cus'),
        name: 'survey',
        redirect: 'corporation/corporation',
        meta: {
          title: '企业客户'
        },
        children: [
          // { path: '/crm/enterprise-cus', redirect: '/crm/enterprise-cus/list' },
          //  点击左侧企业客户跳转到企业客户列表页
          { path: 'corporation',
            component: () => import('@/views/pages/CRM/enterprise-cus/corporationList'),
            name: 'CorporationList',
            meta: {
              title: '企业客户'
            }
          },
          // 企业信息变更页面
          { path: 'change',
            name: 'customer_infochange',
            component: () => import('@/views/pages/CRM/enterprise-cus/customer_infochange/customer_infochange'),
            meta: {
              title: '企业信息'
            }
          },
          // 组织架构页面
          { path: 'customerorganize',
            name: 'Organization',
            component: () => import('@/views/pages/CRM/enterprise-cus/Organization/Organization'),
            meta: {
              title: '组织架构'
            }
          },
          // 管理员变更页面
          { path: 'managerchange',
            name: 'Administrator',
            component: () => import('@/views/pages/CRM/enterprise-cus/Administrator/Administrator'),
            meta: {
              title: '管理员变更'
            }
          },
          // 企业角色变更页面
          { path: 'rolechange',
            name: 'Enterpriserole',
            component: () => import('@/views/pages/CRM/enterprise-cus/Enterprise role/Enterpriserole'),
            meta: {
              title: '企业角色变更'
            }
          },
          // 增加企业
          { path: 'corporation/info',
            name: 'Factoring',
            hidden: true,
            alwaysShow: true,
            component: () => import('@/views/pages/CRM/add/add'),
            meta: {
              title: '详情'
            }
          },
          // 查看企业
          { path: 'corporation/info/view',
            name: 'Detail',
            hidden: true,
            alwaysShow: true,
            component: () => import('@/views/pages/CRM/detail'),
            meta: {
              title: '详情'
            }
          },
          // 修改页面
          {
            path: 'corporation/info/edit',
            name: 'Emit',
            hidden: true,
            alwaysShow: true,
            component: () => import('@/views/pages/CRM/emit/emit'),
            meta: {
              title: '详情'
            }
          }
        ]
      },
      // 个人客户页面
      {
        path: 'personal',
        redirect: '/crm/personal/personal',
        alwaysShow: true, // will always show the root menu
        component: () => import('@/views/pages/CRM/index'),
        name: 'individual-cus',
        meta: {
          title: '个人客户'
        },
        children: [
          {
            path: 'personal',
            component: () => import('@/views/pages/CRM/individual-cus/index2'),
            name: 'index2',
            meta: {
              title: '客户信息'
            }
          },
          {
            path: 'change',
            component: () => import('@/views/pages/CRM/individual-cus/index3'),
            name: 'index3',
            meta: {
              title: '客户变更'
            }
          }
        ]
      }
    ]
  },

  {
    path: '/apps',
    component: Layout,
    redirect: '/apps/ca/config',
    alwaysShow: true, // will always show the root menu
    name: 'apps',
    meta: {
      title: '应用',
      icon: 'lock'
    },
    children: [
      {
        path: 'ca',
        component: () => import('@/views/pages/apps/index'),
        redirect: '/apps/ca/config',
        name: 'ca',
        meta: {
          title: '电子签章'
        },
        children: [
          {
            path: 'config',
            component: () => import('@/views/pages/apps/ca/config'),
            name: 'config',
            meta: {
              title: '配置'
            }
          },
          {
            path: 'list',
            component: () => import('@/views/pages/apps/ca/list'),
            name: 'list',
            meta: {
              title: '列表'
            }
          }
        ]
      },
      {
        path: 'invoice',
        component: () => import('@/views/pages/apps/index'),
        redirect: '/apps/invoice/config',
        name: 'invoice',
        meta: {
          title: '发票验证'
        },
        children: [
          {
            path: 'config',
            component: () => import('@/views/pages/apps/invoice/config'),
            name: 'config',
            meta: {
              title: '配置'
            }
          },
          {
            path: 'list',
            component: () => import('@/views/pages/apps/invoice/list'),
            name: 'list',
            meta: {
              title: '列表'
            }
          }
        ]
      },
      {
        path: 'sms',
        component: () => import('@/views/pages/apps/index'),
        redirect: '/apps/sms/config',
        name: 'sms',
        meta: {
          title: '短信'
        },
        children: [
          {
            path: 'config',
            component: () => import('@/views/pages/apps/sms/config'),
            name: 'config',
            meta: {
              title: '配置'
            }
          },
          {
            path: 'list',
            component: () => import('@/views/pages/apps/sms/list'),
            name: 'list',
            meta: {
              title: '列表'
            }
          }
        ]
      },
      {
        path: 'mail',
        component: () => import('@/views/pages/apps/index'),
        redirect: '/apps/mail/config',
        name: 'mail',
        meta: {
          title: '邮件'
        },
        children: [
          {
            path: 'config',
            component: () => import('@/views/pages/apps/ca/config'),
            name: 'config',
            meta: {
              title: '配置'
            }
          },
          {
            path: 'list',
            component: () => import('@/views/pages/apps/ca/list'),
            name: 'list',
            meta: {
              title: '列表'
            }
          }
        ]
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
  router.addRoutes(router.options.routes)
}

export default router
