// 引入子路由
// import Sub from '@/frame/subroute.vue';

import login from '@/views/login.vue';

import container from '@/views/container.vue';
import clientViews from '@/views/client/view.vue';
import clientList from '@/views/client/list.vue';
import latencyList from '@/views/client/latency-list.vue';
import clientAdd from '@/views/client/add.vue';
import clientDetail from '@/views/client/detail.vue';

import customertrack from '@/views/client/customertrack.vue';

// 客户分析
import echartsIdx from '@/views/data-management/index';
import echarts from '@/views/data-management/echarts';

// 工作台
import workbenchPersonal from '@/views/workbench/workbench-personal';

// 消息盒子
import msgIndex from '@/views/message/index';
import msgBox from '@/views/message/msg';

// 权限管理
import roles from '@/views/role/roles';
import roleList from '@/views/role/role-list.vue';
import architecture from '@/views/role/organizational-structure.vue';
import accountList from '@/views/role/account-list';

// 配置路由
export default [
    {
        path: '*',
        redirect: login
    },
    {
        path: '/my',
        name: 'container',
        component: container,
        meta: {
            title: ''
        },
        children: [
            {
                path: '/echartsIdx',
                name: 'echartsIdx',
                component: echartsIdx,
                meta: {
                    title: '客户分析',
                    unLogin: true
                },
                children: [
                    {
                        path: '/echarts',
                        name: 'echarts',
                        component: echarts,
                        meta: {
                            title: '数据看板',
                            unLogin: true
                        }
                    }
                ]
            },
            {
                path: '/workbenchPersonal',
                name: 'workbenchPersonal',
                component: workbenchPersonal,
                meta: {
                    title: '工作台',
                    unLogin: true
                }
            },
            {
                path: '/client',
                component: clientViews,
                meta: {
                    title: '客户管理'
                },
                children: [
                    {
                        path: '/list',
                        name: 'list',
                        component: clientList,
                        meta: {
                            title: '客户列表'
                        }
                    },
                    {
                        path: '/latencyList',
                        name: 'latencyList',
                        component: latencyList,
                        meta: {
                            title: '客户分配'
                        }
                    },
                    {
                        path: '/add',
                        name: 'add',
                        component: clientAdd,
                        meta: {
                            title: '新增客户'
                        }
                    },
                    {
                        path: '/detail',
                        name: 'detail',
                        component: clientDetail,
                        meta: {
                            title: '客户详情'
                        }
                    },
                    {
                        path: '/customertrack',
                        name: 'customertrack',
                        component: customertrack,
                        meta: {
                            title: '客户跟进'
                        }
                    }
                ]
            },
            {
                path: '/role',
                component: roles,
                meta: {
                    title: '权限管理'
                },
                children: [
                    {
                        path: '/accountList',
                        name: 'accountList',
                        component: accountList,
                        meta: {
                            title: '员工账户管理'
                        }
                    },
                    {
                        path: '/roleList',
                        name: 'roleList',
                        component: roleList,
                        meta: {
                            title: '角色管理'
                        }
                    }

                ]
            },
            {
                path: '/msgindex',
                component: msgIndex,
                meta: {
                    title: '消息管理'
                },
                children: [
                    {
                        path: '/msgbox',
                        name: 'msgbox',
                        component: msgBox,
                        meta: {
                            title: '消息盒子'
                        }
                    }
                ]
            },
            {
                path: '/architecture',
                name: 'architecture',
                component: architecture,
                meta: {
                    title: '组织架构'
                }
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: login,
        meta: {
            title: '登录',
            unLogin: true
        }
    }
];
