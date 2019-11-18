// 引入子路由
// import Sub from '../frame/subroute.vue';

// 首页
import index from '../views/home.vue';
import pinganBank from '../views/pinganBank.vue';
import matchUp from '../views/matchUp.vue';
import activities1 from '../views/activities1.vue';
import activities2 from '../views/activities2.vue';
export default [
    {
        path: '/',
        name: 'index',
        component: index,
        meta: {
            title: '供应链服务'
        }
    },
    {
        path: '/pinganBank',
        name: 'pinganBank',
        component: pinganBank,
        meta: {
            title: '平安银行'
        }
    },
    {
        path: '/matchUp',
        name: 'matchUp',
        component: matchUp,
        meta: {
            title: '撮合公司'
        }
    },
    {
        path: '/activities1',
        name: 'activities1',
        component: activities1,
        meta: {
            title: '国烨网活动-寻找最强撮合公司'
        }
    },
    {
        path: '/activities2',
        name: 'activities2',
        component: activities2,
        meta: {
            title: '国烨网活动-国庆专享活动'
        }
    }
];
