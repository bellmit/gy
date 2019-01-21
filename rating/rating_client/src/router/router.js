// 引入子路由
// import Sub from '../frame/subroute.vue';

// 首页
import index from '../views/layout.vue';
// 登录界面
import login from '../views/userSystem/login.vue';
// import index from '../views/home.vue';

import counterpartyList from '../views/RiskManagement/counterPartyList.vue';

import RatingManagement from '../views/RiskManagement/RatingManagement.vue';
// 核准信息
import approvalForm from '../views/approval/form.vue';
import approvalInfo from '../views/approval/detail.vue';
import approvalView from '../views/approval/view.vue';

// 申请评级
import ratingForm from '../views/ratingApplication/ratingForm';
import ratingView from '../views/ratingApplication/ratingView';

export default [
    {
        path: '*',
        redirect: login
    },
    {
        path: '/login',
        name: 'login',
        component: login,
        meta: {
            title: '登录'
        }
    },
    {
        path: '/index',
        name: 'index',
        component: index,
        meta: {
            title: '管理'
        },
        children: [{
            path: '/counterparty/list',
            name: 'counterpartyList',
            component: counterpartyList,
            meta: {
                title: '交易对手管理'
            }
        },
        {
            path: '/RatingManagement/list',
            name: 'RatingManagement',
            component: RatingManagement,
            meta: {
                title: '评级管理',
                itemId: 1
            }
        },
        {
            path: '/approval/form',
            name: 'approvalForm',
            component: approvalForm,
            meta: {
                title: '核准信息'
            }
        },
        {
            path: '/approval/detail',
            name: 'approvalInfo',
            component: approvalInfo,
            meta: {
                title: '基本信息'
            }
        },
        {
            path: '/ratingApplication/ratingForm',
            name: 'ratingForm',
            component: ratingForm,
            meta: {
                title: '申请评级'
            }
        },
        {
            path: '/approval/view',
            name: 'approvalView',
            component: approvalView,
            meta: {
                title: '基本信息'
            }
        },
        {
            path: '/ratingApplication/ratingView',
            name: 'ratingView',
            component: ratingView,
            meta: {
                title: '评级管理'
            }
        }]
    }
];
