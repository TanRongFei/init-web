
import Layout from '@/layout'

export default [
  {
    path: '/ec',
    component: Layout,
    redirect: '/ec/permit',
    alwaysShow: true, // will always show the root menu
    name: 'ec',
    meta: {
      title: 'E信',
      icon: 'lock'
    },
    children: [
      {
        path: 'permit',
        redirect: 'permit/comp',
        component: () => import('@/views/pages/ec/permit'),
        name: 'permit',
        meta: {
          title: '准入'
        },
        children: [
          {
            path: 'comp',
            component: () => import('@/views/pages/ec/permit/comp'),
            name: 'comp',
            meta: {
              title: '企业客户'
            }
          },
          {
            path: 'personal',
            component: () => import('@/views/pages/ec/permit/personal'),
            name: 'comp',
            meta: {
              title: '企业用户'
            }
          }

        ]
      },
      {
        path: 'credit',
        redirect: 'credit/credit',
        component: () => import('@/views/pages/ec/credit'),
        name: 'credit',
        meta: {
          title: '授信'
        },
        children: [
          {
            path: 'credit',
            redirect: 'credit/list',
            component: () => import('@/views/pages/ec/credit/credit'),
            name: 'credit',
            meta: {
              title: '授信管理'
            },
            children: [
              {
                path: 'list',
                component: () => import('@/views/pages/ec/credit/credit/list'),
                name: 'list',
                meta: {
                  title: '授信管理列表'
                }
              },
              {
                path: 'edit/:creditCode/info',
                component: () => import('@/views/pages/ec/credit/credit/edit'),
                name: 'edit',
                meta: {
                  title: '基本信息'
                }
              },
              {
                path: 'view/:creditCode/info',
                component: () => import('@/views/pages/ec/credit/credit/view'),
                name: 'edit',
                meta: {
                  title: '基本信息'
                }
              }
            ]
          },
          {
            path: 'creditChange',
            redirect: 'creditChange/list',
            component: () => import('@/views/pages/ec/credit/creditChange'),
            name: 'creditChange',
            meta: {
              title: '授信变更'
            },
            children: [
              {
                path: 'list',
                component: () => import('@/views/pages/ec/credit/credit/list'),
                name: 'list',
                meta: {
                  title: '授信管理列表'
                }
              },
              {
                path: 'edit/:creditCode/:changeCode/info',
                component: () => import('@/views/pages/ec/credit/creditChange/edit'),
                name: 'edit',
                meta: {
                  title: '基本信息'
                }
              },
              {
                path: 'view/:changeCode/info',
                component: () => import('@/views/pages/ec/credit/creditChange/view'),
                name: 'edit',
                meta: {
                  title: '基本信息'
                }
              }
            ]
          },
          {
            path: 'share',
            redirect: 'share/list',
            component: () => import('@/views/pages/ec/credit/share'),
            name: 'share',
            meta: {
              title: '授信分配'
            },
            children: [
              {
                path: 'list',
                component: () => import('@/views/pages/ec/credit/share/list'),
                name: 'list',
                meta: {
                  title: '授信分配列表'
                }
              },
              {
                path: 'edit/:creditCode/:shareCode/info',
                component: () => import('@/views/pages/ec/credit/share/edit'),
                name: 'edit',
                meta: {
                  title: '基本信息'
                }
              },
              {
                path: 'view/:shareCode/info',
                component: () => import('@/views/pages/ec/credit/share/view'),
                name: 'edit',
                meta: {
                  title: '基本信息'
                }
              }
            ]
          },
          {
            path: 'shareChange',
            redirect: 'shareChange/list',
            component: () => import('@/views/pages/ec/credit/shareChange'),
            name: 'shareCHange',
            meta: {
              title: '授信分配调整'
            },
            children: [
              {
                path: 'list',
                component: () => import('@/views/pages/ec/credit/shareChange/list'),
                name: 'list',
                meta: {
                  title: '授信分配列表'
                }
              },
              {
                path: 'edit/:shareCode/:changeCode/info',
                component: () => import('@/views/pages/ec/credit/shareChange/edit'),
                name: 'edit',
                meta: {
                  title: '基本信息'
                }
              },
              {
                path: 'view/:changeCode/info',
                component: () => import('@/views/pages/ec/credit/shareChange/view'),
                name: 'edit',
                meta: {
                  title: '基本信息'
                }
              }
            ]
          }
        ]
      },
      {
        path: 'ec',
        redirect: 'ec/ec',
        component: () => import('@/views/pages/ec/ec'),
        name: 'ec',
        meta: {
          title: 'E信'
        },
        children: [
          {
            path: 'ec',
            redirect: 'ec/list',
            component: () => import('@/views/pages/ec/ec/ec'),
            name: 'ec',
            meta: {
              title: 'E信管理'
            },
            children: [
              {
                path: 'list',
                component: () => import('@/views/pages/ec/ec/ec/list'),
                name: 'list',
                meta: {
                  title: 'E信列表'
                }
              },
              {
                path: 'view/:ecCode/info',
                component: () => import('@/views/pages/ec/ec/ec/view'),
                name: 'view',
                meta: {
                  title: '基本信息'
                }
              }
            ]
          },
          {
            path: 'all',
            redirect: 'all/list',
            component: () => import('@/views/pages/ec/ec/all'),
            name: 'all',
            meta: {
              title: '全部E信'
            },
            children: [
              {
                path: 'list',
                component: () => import('@/views/pages/ec/ec/all/list'),
                name: 'list',
                meta: {
                  title: 'E信列表'
                }
              }
            ]
          },
          {
            path: 'check',
            redirect: 'check/list',
            component: () => import('@/views/pages/ec/ec/check'),
            name: 'check',
            meta: {
              title: '开具初审'
            },
            children: [
              {
                path: 'list',
                component: () => import('@/views/pages/ec/ec/check/list'),
                name: 'list',
                meta: {
                  title: '开具初审'
                }
              }
            ]
          },
          {
            path: 'rechecked',
            redirect: 'rechecked/list',
            component: () => import('@/views/pages/ec/ec/rechecked'),
            name: 'rechecked',
            meta: {
              title: '已复审'
            },
            children: [
              {
                path: 'list',
                component: () => import('@/views/pages/ec/ec/rechecked/list'),
                name: 'list',
                meta: {
                  title: '已复审'
                }
              }
            ]
          }
        ]
      },
      {
        path: 'fact',
        redirect: 'fact/apply',
        component: () => import('@/views/pages/ec/fact'),
        name: 'fact',
        meta: {
          title: '保理'
        },
        children: [
          {
            path: 'apply',
            redirect: 'apply/list',
            component: () => import('@/views/pages/ec/fact/apply'),
            name: 'apply',
            meta: {
              title: '融资申请'
            },
            children: [
              {
                path: 'list',
                component: () => import('@/views/pages/ec/fact/apply/list'),
                name: 'list',
                meta: {
                  title: '融资申请'
                }
              },
              {
                path: 'view/:bizCode',
                component: () => import('@/views/pages/ec/fact/apply'),
                name: 'view',
                meta: {
                  title: '基本信息'
                },
                children: [
                  {
                    path: 'info',
                    component: () => import('@/views/pages/ec/fact/apply/info'),
                    name: 'info',
                    meta: {
                      title: '融资申请信息'
                    }
                  },
                  {
                    path: 'scheme',
                    component: () => import('@/views/pages/ec/fact/apply/scheme'),
                    name: 'scheme',
                    meta: {
                      title: '融资方案信息'
                    }
                  },
                  {
                    path: 'agree',
                    component: () => import('@/views/pages/ec/fact/apply/agree'),
                    name: 'agree',
                    meta: {
                      title: '协议信息'
                    }
                  },
                  {
                    path: 'open',
                    component: () => import('@/views/pages/ec/fact/apply/open'),
                    name: 'open',
                    meta: {
                      title: '开立信息'
                    }
                  },
                  {
                    path: 'trade',
                    component: () => import('@/views/pages/ec/fact/apply/trade'),
                    name: 'trade',
                    meta: {
                      title: '贸易背景信息'
                    }
                  }
                ]
              }
            ]
          },
          {
            path: 'check',
            redirect: 'check/list',
            component: () => import('@/views/pages/ec/fact/check'),
            name: 'check',
            meta: {
              title: '融资初审'
            },
            children: [
              {
                path: 'list',
                component: () => import('@/views/pages/ec/fact/check/list'),
                name: 'list',
                meta: {
                  title: '融资初审列表'
                }
              }
            ]
          },
          {
            path: 'recheck',
            component: () => import('@/views/pages/ec/fact/recheck'),
            name: 'recheck',
            meta: {
              title: '融资复审'
            },
            children: [
              {
                path: 'list',
                component: () => import('@/views/pages/ec/fact/recheck/list'),
                name: 'list',
                meta: {
                  title: '融资复审'
                }
              }
            ]
          },
          {
            path: 'sign',
            component: () => import('@/views/pages/ec/fact/sign'),
            name: 'sign',
            meta: {
              title: '融资签章'
            },
            children: [
              {
                path: 'list',
                component: () => import('@/views/pages/ec/fact/sign/list'),
                name: 'list',
                meta: {
                  title: '融资签章'
                }
              }
            ]
          },
          {
            path: 'loan',
            component: () => import('@/views/pages/ec/fact/loan'),
            name: 'loan',
            meta: {
              title: '待放款'
            },
            children: [
              {
                path: 'list',
                component: () => import('@/views/pages/ec/fact/loan/list'),
                name: 'list',
                meta: {
                  title: '待放款'
                }
              }
            ]
          },
          {
            path: 'loaning',
            component: () => import('@/views/pages/ec/fact/loaning'),
            name: 'loaning',
            meta: {
              title: '放款中'
            },
            children: [
              {
                path: 'list',
                component: () => import('@/views/pages/ec/fact/loaning/list'),
                name: 'list',
                meta: {
                  title: '放款中'
                }
              }
            ]
          },
          {
            path: 'loaned',
            component: () => import('@/views/pages/ec/fact/loaned'),
            name: 'loaned',
            meta: {
              title: '放款完成'
            },
            children: [
              {
                path: 'list',
                component: () => import('@/views/pages/ec/fact/loaned/list'),
                name: 'list',
                meta: {
                  title: '放款完成'
                }
              }
            ]
          },
          {
            path: 'record',
            component: () => import('@/views/pages/ec/fact/record'),
            name: 'record',
            meta: {
              title: '融资查询'
            },
            children: [
              {
                path: 'list',
                component: () => import('@/views/pages/ec/fact/record/list'),
                name: 'list',
                meta: {
                  title: '融资查询列表'
                }
              }
            ]
          }
        ]
      },
      {
        path: 'clear',
        redirect: 'clear/clear',
        component: () => import('@/views/pages/ec/clear'),
        name: 'clear',
        meta: {
          title: '清算'
        },
        children: [
          {
            path: 'clear',
            redirect: 'clear/list',
            component: () => import('@/views/pages/ec/clear/clear'),
            name: 'clear',
            meta: {
              title: '待清算'
            },
            children: [
              {
                path: 'list',
                component: () => import('@/views/pages/ec/clear/clear/list'),
                name: 'list',
                meta: {
                  title: '融资查询列表'
                }
              },
              {
                path: 'view/:bizCode',
                component: () => import('@/views/pages/ec/clear/clear'),
                name: 'view',
                meta: {
                  title: '查看信息'
                },
                children: [
                  {
                    path: 'info',
                    component: () => import('@/views/pages/ec/clear/clear/info'),
                    name: 'info',
                    meta: {
                      title: '清算信息'
                    }
                  },
                  {
                    path: 'detail',
                    component: () => import('@/views/pages/ec/clear/clear/detail'),
                    name: 'detail',
                    meta: {
                      title: '清算明细'
                    }
                  },
                  {
                    path: 'record',
                    component: () => import('@/views/pages/ec/clear/clear/record'),
                    name: 'record',
                    meta: {
                      title: '交易记录'
                    }
                  }
                ]
              }
            ]
          },
          {
            path: 'clearing',
            component: () => import('@/views/pages/ec/clear/clearing'),
            name: 'clearing',
            meta: {
              title: '清算中'
            },
            children: [
              {
                path: 'list',
                component: () => import('@/views/pages/ec/clear/clearing/list'),
                name: 'list',
                meta: {
                  title: '查询列表'
                }
              }
            ]
          },
          {
            path: 'cleared',
            component: () => import('@/views/pages/ec/clear/cleared'),
            name: 'cleared',
            meta: {
              title: '已清算'
            },
            children: [
              {
                path: 'list',
                component: () => import('@/views/pages/ec/clear/cleared/list'),
                name: 'list',
                meta: {
                  title: '查询列表'
                }
              }
            ]
          },
          {
            path: 'ovd',
            component: () => import('@/views/pages/ec/clear/ovd'),
            name: 'ovd',
            meta: {
              title: '罚息待收取'
            },
            children: [
              {
                path: 'list',
                component: () => import('@/views/pages/ec/clear/ovd/list'),
                name: 'list',
                meta: {
                  title: '查询列表'
                }
              }
            ]
          },
          {
            path: 'ovding',
            component: () => import('@/views/pages/ec/clear/ovding'),
            name: 'ovding',
            meta: {
              title: '罚息收取中'
            },
            children: [
              {
                path: 'list',
                component: () => import('@/views/pages/ec/clear/ovding/list'),
                name: 'list',
                meta: {
                  title: '查询列表'
                }
              }
            ]
          },
          {
            path: 'ovded',
            component: () => import('@/views/pages/ec/clear/ovded'),
            name: 'ovded',
            meta: {
              title: '罚息已收取'
            },
            children: [
              {
                path: 'list',
                component: () => import('@/views/pages/ec/clear/ovded/list'),
                name: 'list',
                meta: {
                  title: '查询列表'
                }
              }
            ]
          }
        ]
      },
      {
        path: 'fund',
        redirect: 'fund/record',
        component: () => import('@/views/pages/ec/fund'),
        name: 'fund',
        meta: {
          title: '资金台账'
        },
        children: [
          {
            path: 'record',
            redirect: 'record/list',
            component: () => import('@/views/pages/ec/fund/redord'),
            name: 'record',
            meta: {
              title: '资金台账'
            },
            children: [
              {
                path: 'list',
                component: () => import('@/views/pages/ec/fund/redord/list'),
                name: 'list',
                meta: {
                  title: '查询列表'
                }
              }
            ]
          },
          {
            path: 'cmds',
            component: () => import('@/views/pages/ec/fund/cmds'),
            name: 'cmds',
            meta: {
              title: '资金指令'
            },
            children: [
              {
                path: 'list',
                component: () => import('@/views/pages/ec/fund/cmds/list'),
                name: 'list',
                meta: {
                  title: '查询列表'
                }
              }
            ]
          }
        ]
      },
      {
        path: 'account',
        redirect: 'account/plat',
        component: () => import('@/views/pages/ec/account'),
        name: 'account',
        meta: {
          title: '账户'
        },
        children: [
          {
            path: 'plat',
            redirect: 'plat/list',
            component: () => import('@/views/pages/ec/account/plat'),
            name: 'plat',
            meta: {
              title: '平台账户'
            },
            children: [
              {
                path: 'list',
                component: () => import('@/views/pages/ec/account/plat/list'),
                name: 'list',
                meta: {
                  title: '管理列表'
                }
              },
              {
                path: 'edit/:acctCode/info',
                component: () => import('@/views/pages/ec/account/plat/edit'),
                name: 'edit',
                meta: {
                  title: '基本信息'
                }
              },
              {
                path: 'view/:acctCode/info',
                component: () => import('@/views/pages/ec/account/plat/view'),
                name: 'edit',
                meta: {
                  title: '基本信息'
                }
              }
            ]
          }
        ]
      },
      {
        path: 'param',
        redirect: 'param/fee',
        component: () => import('@/views/pages/ec/param'),
        name: 'param',
        meta: {
          title: '参数'
        },
        children: [
          {
            path: 'fee',
            component: () => import('@/views/pages/ec/param/fee'),
            name: 'fee',
            meta: {
              title: '费用配置'
            }
          }
        ]
      }
    ]
  }
]
