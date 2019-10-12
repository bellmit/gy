// 引入子路由
// import Sub from '../frame/subroute.vue';

// 首页
import index from '../views/home.vue';
import pinganBank from '../views/pinganBank.vue';
import matchUp from '../views/matchUp.vue';
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
    }
];
