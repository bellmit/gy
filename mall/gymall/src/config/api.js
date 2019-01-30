// 支付业务
const payment = {
    paymentList: '/trade/pay/v1/billPayment/list', // 获取付款单列表
    exportData: '/trade/pay/v1/billPayment/exportExcel', // 导出数据为excel格式
    orderInfo4Pay: '/trade/pay/v1/billPayment/orderInfo', // 获取付款信息，用于创建付款单
    payInfo4Confirm: '/trade/pay/v1/billPayment/payInfo',
    createPayment: '/trade/pay/v1/billPayment/createBillPayment',
    paymentInfo: '/trade/pay/v1/billPayments/', // URL中的付款单ID在运行时设置
    collectionList: '/trade/pay/v1/billCollection/list',
    collectionInfo: '/trade/pay/v1/billCollections/', // URL中的收款单ID在运行时设置
    paymentConfirmUpload: '/trade/pay/v1/attach/upload', // 创建付款单上传附件
    paymentImage: '/trade/pay/v1/pay/image', // 获取图片
    paymentMoney: '/trade/pay/v1/pay/money', // 支付
    companyAccount: '/trade/capital/v1/accountInfo',
    accTrans: '/trade/capital/v1/findTransRecords',
    payInfoBalance: '/trade/pay/v1/pay/balance'
};

// 报表
const report = {
    paymentDetail: '/api/v1/trade/report/payment/listPaymentDetailReport',
    paymentSummary: '/api/v1/trade/report/payment/listPaymentReport',
    collectionDetail: '/api/v1/trade/report/collection/listCollectionDetailReport',
    collectionSummary: '/api/v1/trade/report/collection/listCollectionReport',
    pay_coll_sum: '/trade/report/v1/paycollSummary'
};

// 流程处理统一API
const processes = {
    flowAct: '/trade/flow/v1/process'
};

const list = {
    product: '/v2/api'
};
const login = {
    login: '/login'
};
const product = {
    prodeuctDetail: '/trade/v1/offers/'
};
// 买家订单详情
const sale = {
    detail: 'trade/v1/orders/',
    list: 'trade/v1/orders/list'
};
// 高级搜索
const hightSearch = {
    search: 'trade/v1/offers/criteria/'
};
// 创建订单
const order = {
    createOrder: '/trade/v1/orders',
    creatOrderCompanies: 'trade/v1/companies/allTradeCompany',
    createOrderList: 'trade/v1/orders',
    sellerSettle: 'trade/order/v1/settlement/selectSettlementOrder',
    buyerSettle: 'trade/order/v1/settlement/selectSettlementOrder',
    saveSettle: 'trade/order/v1/settlement/updateSettlementOrder',
    transaction: 'trade/order/v1/deliveryOrders/order/',
    startSettlementOrderMsg: 'trade/order/v1/settlement/startSettlementOrderMsg',
    delivery: '/trade/order/v1/deliveryOrders',
    // confirmSettlementOrderMsg: '/order/v1/settlement/confirmSettlementOrderMsg'
    deliverUp: '/trade/order/v1/deliveryOrders/fileLoad',
    sign: '/trade/v1/orders/status',
    allowedFunctions: '/v1/allowedFunctions',
    contractCreate: 'trade/v1/order',
    fish: 'trade/order/v1/settlement/updateOrderToFinish'
};
// 智运
const transport = {
    orderList: '/trade/logistics/v1/consignments/search',
    orderStatus: '/trade/logistics/v1/consignments/count',
    enquiryStatus: '/trade/logistics/v1/enquiryNotes/count',
    enquiryList: '/trade/logistics/v1/enquiryNotes/search',
    priceList: '/trade/logistics/v1/enquiryNotes',
    carType: '/trade/base/v1/carriers/search',
    bid: '/trade/logistics/v1/biddingNotes',
    bidStatus: '/trade/logistics/v1/enquiryNotes/count',
    bidPrice: '/trade/logistics/v1/biddingNotes/singleSearch?enquiryNoteId=',
    newOrder: '/trade/logistics/v1/consignments',
    chargeStatus: '/trade/logistics/v1/consignmentCharges/count',
    chargeList: '/trade/logistics/v1/consignmentCharges/search',
    newCharge: '/trade/logistics/v1/consignmentCharges',
    transportStatus: '/trade/logistics/v1/consignments/status',
    carList: '/trade/logistics/v1/vehicle/search',
    dispatchAmount: '/trade/logistics/v1/dispatchNotes/count/consignmentNote',
    driver: '/trade/logistics/v1/transportUsers?keywords=',
    dispatch: '/trade/logistics/v1/dispatchNotes',
    transportUserStatus: '/trade/logistics/v1/transportUsers/count',
    transportUserList: '/trade/logistics/v1/transportUsers/search',
    transportUser: '/trade/logistics/v1/transportUsers',
    transportSingleUserSearch: '/trade/logistics/v1/transportUsers/user/',
    vehicleList: '/trade/logistics/v1/vehicle/search',
    vehicleSave: '/trade/logistics/v1/vehicle',
    vehicleDetail: '/trade/logistics/v1/vehicle',
    carriersList: '/trade/base/v1/carriers/search',
    dispatchDetail: '/trade/logistics/v1/dispatchNotesTrack',
    viewContract: '/trade/logistics/v1/consignmentContracts',
    signContract: '/trade/logistics/v1/consignmentContracts/sign',
    dispatchDetailList: '/trade/logistics/v1/dispatchNotes/consignmentNote',
    payDetailList: '/trade/pay/v1/billPayment/list',
    settleDetailList: '/trade/logistics/v1/consignmentCharges/search',
    diapatchTraceInfo: '/trade/logistics/v1/dispatchNotes'
};
const offers = {
    resources: '/trade/v1/offers',
    state: '/trade/v1/offers/status',
    list: '/trade/v1/offers/list',
    currencies: '/trade/v1/currencies',
    goods: '/trade/catalogue/v1/goods',
    measures: '/trade/base/v1/measures/search',
    address: '/trade/v1/areas/list/',
    photo: '/trade/catalogue/v1/products/getImage?goodsId=',
    update: '/trade/v1/offers/update',
    uploadImg: 'trade/v1/offers/uploadSkuPicture'
};

const seller = {
    settle: '/trade/order/v1/settlement/selectSettlementOrder'
};
const register = {
    register: '/v1/register', // 注册
    graphic: '/v1/verification/graphic',
    phoneNumber: '/v1/verification/phone',
    creatOrder: '/v1/orders', // 创建订单
    salesOrdersList: '/v1/orders/list'
};
const mallHome = {
    category: '/trade/public/v1/mall/category',
    prodRecommend: '/trade/public/v1/mall/prodRecommend',
    shopRecommend: '/trade/public/v1/mall/shopRecommend',
    prodFeatured: '/trade/public/v1/mall/prodFeatured',
    hotShop: '/trade/public/v1/mall/hotShop',
    offerInfo: '/trade/public/v1/mall/offerInfo',
    offerSearch: '/trade/public/v1/mall/offerSearch',
    mychart: '/trade/public/v1/mall/priceindex/chart',
    adInfo: '/trade/public/v1/home/adInfo',
    myindexday: '/trade/public/v1/mall/priceindex/indexday' // 热门指数列表
};

const account = {
    company_rel_xref: '/trade/account/v1/companies/xrefList'

};
// 店铺相关
const shop = {
    profile: '/trade/v1/company/profile',
    hotList: '/trade/v1/offers/companys', // 获取4种状态商品
    companys: '/trade/public/v1/offers/companys', // 只获取2种状态
    homeImg: '/trade/v1/company/profile/home',
    productList: '/trade/public/v1/offers/catalogue',
    shopRecommend: '/trade/public/v1/home/shopRecommend',
    search: '/trade/public/v1/home/shopRecommendByKeyword'
};

export default {
    list,
    offers,
    register,
    payment,
    report,
    account,
    sale,
    seller,
    processes,
    login,
    mallHome,
    product,
    order,
    hightSearch,
    shop,
    transport
};
