import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import crmRoutes from '@/router/modules/crm'
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
  ...crmRoutes,
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
            path: 'bps',
            component: () => import('@/views/pages/factoring/permit/business-profile-statistics'),
            leftSidebar: '/factoring/permit',
            name: 'bps',
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
            component: () => import('@/views/pages/factoring/index'),
            redirect: '/factoring/credit/corp-detail/basic-info',
            tabsSidebar: '/factoring/credit/corp-detail',
            name: 'CorpDetail',
            meta: {
              title: '公司详情'
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
              },
              {
                path: 'scheme-info',
                component: () => import('@/views/pages/factoring/credit/corp-detail/scheme-info'),
                tabsSidebar: '/factoring/credit/corp-detail',
                name: 'scheme-info',
                meta: {
                  title: '方案信息'
                }
              },
              {
                path: 'guarantee-info',
                component: () => import('@/views/pages/factoring/credit/corp-detail/guarantee-info'),
                tabsSidebar: '/factoring/credit/corp-detail',
                name: 'guarantee-info',
                meta: {
                  title: '担保信息'
                }
              },
              {
                path: 'files',
                component: () => import('@/views/pages/factoring/credit/corp-detail/files'),
                tabsSidebar: '/factoring/credit/corp-detail',
                name: 'files',
                meta: {
                  title: '档案管理'
                }
              }
            ]
          },
          {
            path: 'personal-detail',
            hidden: true,
            component: () => import('@/views/pages/factoring'),
            redirect: '/factoring/credit/personal-detail/basic-info',
            tabsSidebar: '/factoring/credit/personal-detail',
            name: 'PersonalDetail',
            meta: {
              title: '个人详情'
            },
            children: [
              {
                path: 'basic-info',
                component: () => import('@/views/pages/factoring/credit/personal-detail/basic-info'),
                tabsSidebar: '/factoring/credit/personal-detail',
                name: 'basic-info',
                meta: {
                  title: '基本信息'
                }
              },
              {
                path: 'spouse-info',
                component: () => import('@/views/pages/factoring/credit/personal-detail/spouse-info'),
                tabsSidebar: '/factoring/credit/personal-detail',
                name: 'spouse-info',
                meta: {
                  title: '配偶信息'
                }
              },
              {
                path: 'user-info',
                component: () => import('@/views/pages/factoring/credit/personal-detail/user-info'),
                tabsSidebar: '/factoring/credit/personal-detail',
                name: 'user-info',
                meta: {
                  title: '用户信息'
                }
              },
              {
                path: 'event-info',
                component: () => import('@/views/pages/factoring/credit/personal-detail/event-info'),
                tabsSidebar: '/factoring/credit/personal-detail',
                name: 'event-info',
                meta: {
                  title: '事件信息'
                }
              },
              {
                path: 'other-info',
                component: () => import('@/views/pages/factoring/credit/personal-detail/other-info'),
                tabsSidebar: '/factoring/credit/personal-detail',
                name: 'other-info',
                meta: {
                  title: '其他信息'
                }
              },
              {
                path: 'account-info',
                component: () => import('@/views/pages/factoring/credit/personal-detail/account-info'),
                tabsSidebar: '/factoring/credit/personal-detail',
                name: 'account-info',
                meta: {
                  title: '账户信息'
                }
              },
              {
                path: 'data-info',
                component: () => import('@/views/pages/factoring/credit/personal-detail/data-info'),
                tabsSidebar: '/factoring/credit/personal-detail',
                name: 'data-info',
                meta: {
                  title: '资料信息'
                }
              }
            ]
          },
          {
            path: 'credit-detail',
            hidden: true,
            component: () => import('@/views/pages/factoring/index'),
            redirect: '/factoring/credit/credit-detail/basic-info',
            leftSidebar: '/factoring/credit/credit-detail',
            name: 'CreditDetail',
            meta: {
              title: '授信编辑'
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
            tabsSidebar: '/factoring/contract/contract-detail',
            name: 'contractDetail',
            meta: {
              title: '合同查看'
            },
            children: [
              {
                path: 'chg-info',
                component: () => import('@/views/pages/factoring/contract/detail/chg-info'),
                tabsSidebar: '/factoring/contract/contract-detail',
                name: 'chg-info',
                meta: {
                  title: '变更信息',
                  roles: ['chgInfo']
                }
              },
              {
                path: 'basic-info',
                component: () => import('@/views/pages/factoring/contract/detail/basic-info'),
                tabsSidebar: '/factoring/contract/contract-detail',
                name: 'basic-info',
                meta: {
                  title: '基本信息'
                }
              },
              {
                path: 'scheme-info',
                component: () => import('@/views/pages/factoring/contract/detail/scheme-info'),
                tabsSidebar: '/factoring/contract/contract-detail',
                name: 'scheme-info',
                meta: {
                  title: '方案信息'
                }
              },
              {
                path: 'accounts-receivable',
                component: () => import('@/views/pages/factoring/contract/detail/accounts-receivable'),
                tabsSidebar: '/factoring/contract/contract-detail',
                name: 'accounts-receivable',
                meta: {
                  title: '应收账款'
                }
              },
              {
                path: 'commercial-terms',
                component: () => import('@/views/pages/factoring/contract/detail/commercial-terms'),
                tabsSidebar: '/factoring/contract/contract-detail',
                name: 'commercial-terms',
                meta: {
                  title: '商务条款'
                }
              },
              {
                path: 'credit-info',
                component: () => import('@/views/pages/factoring/contract/detail/credit-info'),
                tabsSidebar: '/factoring/contract/contract-detail',
                name: 'credit-info',
                meta: {
                  title: '用信信息'
                }
              },
              {
                path: 'information',
                component: () => import('@/views/pages/factoring/contract/detail/information'),
                tabsSidebar: '/factoring/contract/contract-detail',
                name: 'information',
                meta: {
                  title: '档案资料'
                }
              }
            ]
          },
          {
            path: 'contract-editor',
            component: () => import('@/views/pages/factoring/index'),
            hidden: true,
            redirect: '/factoring/contract/contract-editor/basic-info',
            leftSidebar: '/factoring/contract/contract-editor',
            name: 'contractEditor',
            meta: {
              title: '合同编辑'
            },
            children: [
              {
                path: 'chg-info',
                component: () => import('@/views/pages/factoring/contract/editor/chg-info'),
                leftSidebar: '/factoring/contract/contract-editor',
                name: 'chg-info',
                meta: {
                  title: '变更信息',
                  roles: ['chgInfo']
                }
              },
              {
                path: 'basic-info',
                component: () => import('@/views/pages/factoring/contract/editor/basic-info'),
                leftSidebar: '/factoring/contract/contract-editor',
                name: 'basic-info',
                meta: {
                  title: '基本信息'
                }
              },
              {
                path: 'scheme-info',
                component: () => import('@/views/pages/factoring/contract/editor/scheme-info'),
                leftSidebar: '/factoring/contract/contract-editor',
                name: 'scheme-info',
                meta: {
                  title: '方案信息'
                }
              },
              {
                path: 'accounts-receivable',
                component: () => import('@/views/pages/factoring/contract/editor/accounts-receivable'),
                leftSidebar: '/factoring/contract/contract-editor',
                name: 'accounts-receivable',
                meta: {
                  title: '应收账款'
                }
              },
              {
                path: 'commercial-terms',
                component: () => import('@/views/pages/factoring/contract/editor/commercial-terms'),
                leftSidebar: '/factoring/contract/contract-editor',
                name: 'commercial-terms',
                meta: {
                  title: '商务条款'
                }
              },
              {
                path: 'credit-info',
                component: () => import('@/views/pages/factoring/contract/editor/credit-info'),
                leftSidebar: '/factoring/contract/contract-editor',
                name: 'credit-info',
                meta: {
                  title: '用信信息'
                }
              },
              {
                path: 'information',
                component: () => import('@/views/pages/factoring/contract/editor/information'),
                leftSidebar: '/factoring/contract/contract-editor',
                name: 'information',
                meta: {
                  title: '档案资料'
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
              title: '前期款管理'
            }
          },
          {
            path: 'deduction',
            leftSidebar: '/factoring/pa',
            component: () => import('@/views/pages/factoring/pa/deduction'),
            name: 'deduction',
            meta: {
              title: '前期款抵扣'
            }
          },
          {
            path: 'complement',
            leftSidebar: '/factoring/pa',
            component: () => import('@/views/pages/factoring/pa/complement'),
            name: 'complement',
            meta: {
              title: '前期款补足'
            }
          },
          {
            path: 'return',
            leftSidebar: '/factoring/pa',
            component: () => import('@/views/pages/factoring/pa/return'),
            name: 'return',
            meta: {
              title: '前期款退回'
            }
          },
          {
            path: 'paMgrLayout',
            component: () => import('@/views/pages/factoring/index'),
            hidden: true,
            redirect: '/factoring/pa/mgr/paMgrEditorLayout/paMgrEditor',
            leftSidebar: '/factoring/pa/paMgrLayout',
            name: 'paMgrLayout',
            meta: {
              title: '前期款编辑'
            },
            children: [
              {
                path: 'paMgrEditor',
                component: () => import('@/views/pages/factoring/pa/mgr/editor'),
                leftSidebar: '/factoring/pa/paMgrLayout',
                name: 'paMgrEditor',
                meta: {
                  title: '基本信息'
                }
              }
            ]
          },
          {
            path: 'paDeductionLayout',
            component: () => import('@/views/pages/factoring/index'),
            hidden: true,
            redirect: '/factoring/pa/mgr/paMgrEditorLayout/paDeductionEditor',
            leftSidebar: '/factoring/pa/paDeductionLayout',
            name: 'paDeductionLayout',
            meta: {
              title: '前期款编辑'
            },
            children: [
              {
                path: 'paDeductionEditor',
                component: () => import('@/views/pages/factoring/pa/deduction/editor'),
                leftSidebar: '/factoring/pa/paMgrEditorLayout',
                name: 'paDeductionEditor',
                meta: {
                  title: '基本信息'
                }
              }
            ]
          },
          {
            path: 'paComplementLayout',
            component: () => import('@/views/pages/factoring/index'),
            hidden: true,
            redirect: '/factoring/pa/mgr/paComplementLayout/paComplementEditor',
            leftSidebar: '/factoring/pa/paComplementLayout',
            name: 'paComplementLayout',
            meta: {
              title: '前期款编辑'
            },
            children: [
              {
                path: 'paComplementEditor',
                component: () => import('@/views/pages/factoring/pa/complement/editor'),
                leftSidebar: '/factoring/pa/paMgrEditorLayout',
                name: 'paComplementEditor',
                meta: {
                  title: '基本信息'
                }
              }
            ]
          },
          {
            path: 'paReturnEditorLayout',
            component: () => import('@/views/pages/factoring/index'),
            hidden: true,
            redirect: '/factoring/pa/mgr/paReturnEditorLayout/paReturnEditor',
            leftSidebar: '/factoring/pa/paReturnEditorLayout',
            name: 'paReturnEditorLayout',
            meta: {
              title: '前期款编辑'
            },
            children: [
              {
                path: 'paReturnEditor',
                component: () => import('@/views/pages/factoring/pa/return/editor'),
                leftSidebar: '/factoring/pa/paReturnEditor',
                name: 'paReturnEditor',
                meta: {
                  title: '基本信息'
                }
              }
            ]
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
        redirect: '/factoring/accounts/income',
        leftSidebar: '/factoring/accounts',
        name: 'accounts',
        meta: {
          title: '账款'
        },
        children: [
          {
            path: 'income',
            fullPath: '/factoring/accounts/income',
            component: () => import('@/views/pages/factoring/accounts/income'),
            leftSidebar: '/factoring/accounts',
            name: 'income',
            meta: {
              title: '来款管理'
            }
          },
          {
            path: 'planPaid',
            fullPath: '/factoring/accounts/planPaid',
            component: () => import('@/views/pages/factoring/accounts/planPaid'),
            leftSidebar: '/factoring/accounts',
            name: 'planPaid',
            meta: {
              title: '来款核销'
            }
          },
          {
            path: 'final',
            component: () => import('@/views/pages/factoring/accounts/final'),
            leftSidebar: '/factoring/accounts',
            name: 'final',
            meta: {
              title: '尾款管理'
            }
          },
          {
            path: 'planPaidRed',
            fullPath: '/factoring/accounts/planPaidRed',
            component: () => import('@/views/pages/factoring/accounts/planPaidRed'),
            leftSidebar: '/factoring/accounts',
            name: 'planPaidRed',
            meta: {
              title: '来款核销冲红'
            }
          },
          {
            path: 'refund',
            component: () => import('@/views/pages/factoring/accounts/refund'),
            leftSidebar: '/factoring/accounts',
            name: 'refund',
            meta: {
              title: '退款管理'
            }
          },
          {
            path: 'incomeViewLayout',
            hidden: true,
            component: () => import('@/views/pages/factoring'),
            tabsSidebar: '/factoring/accounts/income',
            name: 'incomeViewLayout',
            meta: {
              title: '来款管理查看'
            },
            children: [
              {
                path: 'incomeView',
                hidden: true,
                component: () => import('@/views/pages/factoring/accounts/income/view'),
                tabsSidebar: '/factoring/accounts/income',
                name: 'incomeView',
                meta: {
                  title: '查看'
                }
              }
            ]
          },
          {
            path: 'planPaidViewLayout',
            hidden: true,
            component: () => import('@/views/pages/factoring'),
            tabsSidebar: '/factoring/accounts/planPaid',
            name: 'planPaidViewLayout',
            meta: {
              title: '来款核销查看'
            },
            children: [
              {
                path: 'planPaidView',
                hidden: true,
                component: () => import('@/views/pages/factoring/accounts/planPaid/view'),
                tabsSidebar: '/factoring/accounts/income',
                name: 'planPaidView',
                meta: {
                  title: '查看'
                }
              }
            ]
          },
          {
            path: 'finalViewLayout',
            hidden: true,
            component: () => import('@/views/pages/factoring'),
            tabsSidebar: '/factoring/accounts/final',
            name: 'finalViewLayout',
            meta: {
              title: '尾款管理查看'
            },
            children: [
              {
                path: 'finalView',
                hidden: true,
                component: () => import('@/views/pages/factoring/accounts/final/view'),
                tabsSidebar: '/factoring/accounts/final',
                name: 'finalView',
                meta: {
                  title: '查看'
                }
              }
            ]
          },
          {
            path: 'planPaidRedLayout',
            hidden: true,
            component: () => import('@/views/pages/factoring'),
            tabsSidebar: '/factoring/accounts/planPaidRed',
            name: 'planPaidRedLayout',
            meta: {
              title: '来款核销冲红查看'
            },
            children: [
              {
                path: 'planPaidRedView',
                hidden: true,
                component: () => import('@/views/pages/factoring/accounts/planPaidRed/view'),
                tabsSidebar: '/factoring/accounts/planPaidRed',
                name: 'planPaidRedView',
                meta: {
                  title: '查看'
                }
              }
            ]
          },
          {
            path: 'refundLayout',
            hidden: true,
            component: () => import('@/views/pages/factoring'),
            tabsSidebar: '/factoring/accounts/refund',
            name: 'refundLayout',
            meta: {
              title: '退款管理查看'
            },
            children: [
              {
                path: 'refundView',
                hidden: true,
                component: () => import('@/views/pages/factoring/accounts/refund/view'),
                tabsSidebar: '/factoring/accounts/refund',
                name: 'refundView',
                meta: {
                  title: '查看'
                }
              }
            ]
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
