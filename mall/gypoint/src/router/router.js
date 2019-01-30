// 引入子路由
// import Sub from '../frame/subroute.vue';

// 首页
import index from '../views/home.vue';
import detail from '../views/goods/detail.vue';
import detailView from '../views/goods/view.vue';
import goodsMore from '../views/goods/more.vue';
// 兑换商品
import exchanges from '../views/exchange.vue';
import exchangeFish from '../views/exchangeFish.vue';

// 订单详情
import orderDetail from '../views/orderDetail';

// 搜索404
import search from '../views/searchPage';
// 搜索404
import search404 from '../views/search404';

export default [
    {
        path: '/',
        name: 'index',
        component: index,
        meta: {
            title: '商城首页'
        }
    },
    {
        path: '/goods',
        name: 'goods',
        component: detailView,
        children: [
            {
                path: '/goods/detail',
                name: 'detail',
                component: detail,
                meta: {
                    title: '兑换品详情'
                }
            },
            {
                path: '/goods/more',
                name: 'more',
                component: goodsMore,
                meta: {
                    title: '兑换品列表'
                }
            }
        ]
    },
    // 兑换商品
    {
        path: '/exchange',
        name: 'exchange',
        component: exchanges,
        meta: {
            title: '兑换商品'
        }
    },
    // 兑换商品完成
    {
        path: '/exchangeFish',
        name: 'exchangeFish',
        component: exchangeFish,
        meta: {
            title: '兑换商品完成'
        }
    },
    // 订单详情
    {
        path: '/orderDetail',
        name: 'orderDetail',
        component: orderDetail,
        meta: {
            title: '兑换单详情'
        }
    },
    // 搜索
    {
        path: '/search',
        name: 'search',
        component: search,
        meta: {
            title: '兑换品搜索'
        }
    },
    // 搜索404
    {
        path: '/search404',
        name: 'search404',
        component: search404,
        meta: {
            title: '兑换品搜索'
        }
    }
];
