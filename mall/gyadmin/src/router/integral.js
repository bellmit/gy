const Category = () => import('@/views/integral/Category');
const Goods = () => import('@/views/integral/Goods');
const AddGoods = () => import('@/views/integral/AddGoods');
const GoodsDetail = () => import('@/views/integral/GoodsDetail');
const Order = () => import('@/views/integral/Order');
const OrderDetail = () => import('@/views/integral/OrderDetail');
const Shipments = () => import('@/views/integral/Shipments');

const route = [
    {
        path: 'integral/category',
        name: 'integral-category',
        component: Category,
        meta: { title: '类目管理' }
    },
    {
        path: 'integral/goods',
        name: 'integral-goods',
        component: Goods,
        meta: { title: '兑换品管理' }
    },
    {
        path: 'integral/addGoods',
        name: 'integral-add-goods',
        component: AddGoods,
        meta: { title: '添加/编辑兑换品' }
    },
    {
        path: 'integral/goodsDetail',
        name: 'integral-goods-detail',
        component: GoodsDetail,
        meta: { title: '兑换品详情' }
    },
    {
        path: 'integral/order',
        name: 'integral-order',
        component: Order,
        meta: { title: '兑换单管理' }
    },
    {
        path: 'integral/orderDetail',
        name: 'integral-order-detail',
        component: OrderDetail,
        meta: { title: '兑换单详情' }
    },
    {
        path: 'integral/shipments',
        name: 'integral-shipments',
        component: Shipments,
        meta: { title: '发货管理' }
    }
];

export default route;
