// 子路由
import Sub from '../frame/subroute.vue';
// 首页
import home from '../views/home.vue';
// 帮助中心
import help from '../views/help.vue';
// 商品搜索页
import searchPage from '../views/searchPage.vue';
// 商品详情页
import productDetail from '../views/productDetail.vue';

// 卖家发起订单
import creatdOrder from '../views/createOrder.vue';

// 店铺
import shop from '../views/shop/index.vue';
// 店铺首页
import shopHome from '../views/shop/shop_home.vue';
import shopTest from '../views/shop/test.vue';
import shopMore from '../views/shop/more.vue';
// 公司介绍
import shopProfile from '../views/shop/profile.vue';

// 买家订单详情
import buyerOrderDetail from '../views/buyerOrderDetail.vue';
// 结算与复核 买家,卖家
import buyerSettle from '../views/orderSettle/settleConfirm.vue';
import sellerSettle from '../views/orderSettle/settleInfo.vue';
// 签约，收款与交割 买家，卖家
import salesDetail from '../views/order/sales-detail.vue';
import purchaseDetail from '../views/order/purchase-detail.vue';

// 付款单
import createPayment from '../views/payment/createPayment';
import paymentList from '../views/payment/paymentList.vue';
import paymentConfirm from '../views/payment/paymentConfirm.vue';
import paymentInfo from '../views/payment/paymentInfo';
import confirmOfflinePay from '../views/payment/confirmOfflinePay';
import confirmOnlinePay from '../views/payment/confirmOnlinePay.vue';
import toPay from '../views/payment/toPay.vue';
import transferAccounts from '../views/payment/transferaccounts';
import collectionList from '../views/payment/collectionList.vue';

// 配置路由
export default [
    {
        path: '/',
        name: 'mall-home',
        component: home,
        meta: {
            title: '商城首页'
        }
    },
    {
        path: '/help',
        name: 'help',
        component: help,
        meta: {
            title: '帮助中心'
        }
    },
    {
        path: '/orderSettle',
        component: Sub,
        children: [
            {
                path: 'buyerSettle',
                name: 'buyer-settle',
                component: buyerSettle,
                meta: {
                    title: '采购订单'
                }
            },
            {
                path: 'sellerSettle',
                name: 'seller-settle',
                component: sellerSettle,
                meta: {
                    title: '销售订单'
                }
            }
        ]
    },
    {
        path: '/order',
        component: Sub,
        children: [
            {
                path: 'salesDetail',
                name: 'sales-detail',
                component: salesDetail,
                meta: {
                    title: '销售订单'
                }
            },
            {
                path: 'purchaseDetail',
                name: 'purchase-detail',
                component: purchaseDetail,
                meta: {
                    title: '采购订单'
                }
            }
        ]
    },
    {
        path: '/pay',
        component: Sub,
        children: [
            // 结算中心--订单支付-付款单=========================
            {
                path: 'payment/transferaccounts',
                name: 'transferAccounts',
                component: transferAccounts,
                meta: {
                    title: '付款单列表123',
                    itemId: '4-1-0'
                }
            },
            {
                path: 'payment/list',
                name: 'paymentList',
                component: paymentList,
                meta: {
                    title: '付款单列表',
                    itemId: '4-1-0'
                }
            },
            {
                path: 'payment/create',
                name: 'createPayment',
                component: createPayment,
                meta: {
                    itemId: '0-0'
                }
            },
            {
                path: 'payment/info',
                name: 'paymentInfo',
                component: paymentInfo,
                meta: {
                    title: '付款单详情',
                    itemId: '4-1-0'
                }
            },
            {
                path: 'payment/confirm',
                name: 'paymentConfirm',
                component: paymentConfirm,
                meta: {
                    title: '付款单确认页',
                    itemId: '4-1-0'
                }
            },
            {
                path: 'payment/confirm1',
                name: 'confirmOfflinePay',
                component: confirmOfflinePay,
                meta: {
                    title: '已确认的线下付款单',
                    itemId: '3-1-0'
                }
            },
            {
                path: 'payment/confirm2',
                name: 'confirmOnlinePay',
                component: confirmOnlinePay,
                meta: {
                    title: '线上支付确认页',
                    itemId: '2-1-0'
                }
            },
            {
                path: 'payment/pay',
                name: 'toPay',
                component: toPay,
                meta: {
                    title: '等待财务付款',
                    itemId: '2-1-0'
                }
            },
            // 订单支付-收款单=========================
            {
                path: 'collection/list',
                name: 'collectionList',
                component: collectionList,
                meta: {
                    title: '收款单列表',
                    itemId: '4-2-0'
                }
            }

        ]
    },
    {
        path: '/product',
        name: 'product-detail',
        component: productDetail,
        meta: {
            title: '商品详情'
        }
    },
    {
        path: '/search',
        name: 'search-page',
        component: searchPage,
        meta: {
            title: '商品首页列表'
        }
    },
    {
        path: '/creatdOrder',
        name: 'create-order',
        component: creatdOrder,
        meta: {
            title: '发起订单'
        }
    },
    {
        path: '/shop',
        name: 'shop',
        component: shop,
        children: [
            {
                path: 'index',
                name: 'shopHome',
                component: shopHome,
                meta: {
                    title: '店铺首页',
                    isHeader: true
                }
            },
            {
                path: 'more',
                name: 'shopMore',
                component: shopMore,
                meta: {
                    title: '店铺',
                    isHeader: true
                }
            },
            {
                path: 'profile',
                name: 'shop-profile',
                component: shopProfile,
                meta: {
                    title: '公司介绍',
                    isHeader: true
                }
            },
            {
                path: 'test',
                name: 'shopTest',
                component: shopTest,
                meta: {
                    title: 'test',
                    isHeader: true
                }
            }
        ]
    },
    {
        path: '/buyerOrderDetail',
        name: 'buyer-orderd-etail',
        component: buyerOrderDetail,
        meta: {
            title: '买家订单详情'
        }
    }
];
