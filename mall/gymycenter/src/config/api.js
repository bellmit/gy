const category = {
    categories: '/trade/point/v1/categories', // 首页类目
    search: '/trade/point/v1/redemptions/search', // search
    redemptions: '/trade/point/v1/redemptions/', // 商品详情
    advertisings: '/trade/advertising/v1/advertisings', // 首页广告位
    check: '/trade/point/v1/odrPointNote/check' // 兑换
};
const exchange = {
    odrPointNoteDetail: '/trade/point/v1/redemptions',
    odrProvince: 'trade/v1/areas/list',
    odrAddress: '/trade/point/v1/ictAddress',
    searchAdd: '/trade/point/v1/ictAddress/searchAll',
    ictAddress: '/trade/point/v1/ictAddress',
    confirmExchange: '/trade/point/v1/odrPointNote',
    ictSearch: '/trade/point/v1/ictAddress/search'
};

export default {
    category,
    exchange
};
