// 引入子路由
// import Sub from '../frame/subroute.vue';

// 首页
import index from '../views/home.vue';

export default [
    {
        path: '/',
        name: 'index',
        component: index,
        meta: {
            title: '物流'
        }
    }
];
