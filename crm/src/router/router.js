// 引入子路由
import Sub from '@/frame/subroute.vue';

import login from '@/views/login.vue';

import container from '@/views/container.vue';
import clientViews from '@/views/client/view.vue';
import clientList from '@/views/client/list.vue';
import latencyList from '@/views/client/latency-list.vue';
import lurkingList from '@/views/client/lurking-list.vue';
import clientAdd from '@/views/client/add.vue';
import clientDetail from '@/views/client/detail.vue';
import addLurking from '@/views/client/addLurking.vue';

import customertrack from '@/views/client/customertrack.vue';

// 客户分析
import echarts from '@/views/data-management/echarts';

// 工作台
import workbenchPersonal from '@/views/workbench/workbench-personal';

// 消息盒子
import msgBox from '@/views/message/msg';

// 权限管理
import roles from '@/views/role/roles';
import roleList from '@/views/role/role-list.vue';
import accountList from '@/views/role/account-list';
import fieldsManage from '@/views/role/fieldsmanage'; // 字段管理

// 组织架构
import organizationalStructure from '@/views/organizationalStructure/organizational-structure';
import postManagement from '@/views/organizationalStructure/postManagement';

// 配置路由
export default [
    {
        path: '*',
        redirect: login
    },
    {
        path: '/',
        name: 'login',
        component: login,
        meta: {
            title: '登录',
            unLogin: true
        }
    },
    {
        path: './',
        component: container,
        children: [
            {
                path: '/echartsIdx',
                name: 'echartsIdx',
                component: Sub,
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
                        path: '/lurkingList',
                        name: 'lurkingList',
                        component: lurkingList,
                        meta: {
                            title: '潜在客户'
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
                        path: '/addLurking',
                        name: 'addLurking',
                        component: addLurking,
                        meta: {
                            title: '新增潜在客户'
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
                    },
                    {
                        path: '/fieldsManage',
                        name: 'fieldsManage',
                        component: fieldsManage,
                        meta: {
                            title: '字段管理'
                        }
                    }

                ]
            },
            {
                path: '/msgindex',
                component: Sub,
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
                path: '',
                name: '',
                component: Sub,
                meta: {
                    title: '组织架构'
                },
                children: [
                    {
                        name: 'organizationalStructure',
                        path: '/organizationalStructure',
                        component: organizationalStructure,
                        meta: {
                            title: '组织架构管理'
                        }
                    },
                    {
                        name: 'postManagement',
                        path: '/postManagement',
                        component: postManagement,
                        meta: {
                            title: '岗位管理'
                        }
                    }
                ]
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
