// 引入子路由
// import Sub from '../frame/subroute.vue';

// 首页
import index from '../views/layout.vue';
// 登录界面
import login from '../views/userSystem/login.vue';
// import index from '../views/home.vue';
import customerList from '../views/RiskManagement/distributionList.vue';
import checkList from '../views/RiskManagement/FirstCheckList.vue';
import customerAppList from '../views/RiskManagement/CustomerApplicationList.vue';
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
            path: '/customer/list',
            name: 'customerList',
            component: customerList,
            meta: {
                title: '客户分配'
            }
        },
        {
            path: '/check/list',
            name: 'checkList',
            component: checkList,
            meta: {
                title: '核准与评级'
            }
        },
        {
            path: '/customerApp/list',
            name: 'customerAppList',
            component: customerAppList,
            meta: {
                title: '申请查看评级审核'
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
                title: '信息核准'
            }
        },
        {
            path: '/approval/view',
            name: 'approvalView',
            component: approvalView,
            meta: {
                title: '信息核准'
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
            path: '/ratingApplication/ratingView',
            name: 'ratingView',
            component: ratingView,
            meta: {
                title: '评级管理'
            }
        }]
    }
];
