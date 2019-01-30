const prefix = '/platform';
// 后台类目
const category = {
    list: prefix + '/catalogue/v1/categories/search',
    add: prefix + '/catalogue/v1/categories',
    detail: prefix + '/catalogue/v1/categories',
    catalogues: prefix + '/catalogue/v1/catalogues/search', // 前台列表高级搜索
    categories: prefix + '/catalogue/v1/categories/search' // 后台列表高级搜索
};
// 前台类目
const receptionCategory = {
    list: prefix + '/catalogue/v1/catalogues/search',
    add: prefix + '/catalogue/v1/catalogues',
    edit: prefix + '/catalogue/v1/catalogues',
    detail: prefix + '/catalogue/v1/catalogues/'
};

const attribute = {
    add: prefix + '/catalogue/v1/options',
    list: prefix + '/catalogue/v1/options/search',
    del: prefix + '/catalogue/v1/options/valid'
};

const parameter = {
    add: prefix + '/catalogue/v1/properties',
    list: prefix + '/catalogue/v1/properties/search',
    del: prefix + '/catalogue/v1/properties/valid'
};

const sku = {
    list: prefix + '/catalogue/v1/skuNoRules/search',
    add: prefix + '/catalogue/v1/skuNoRules'
};
const offers = {
    resources: prefix + '/v1/offers',
    state: prefix + '/v1/offers/status',
    list: prefix + '/v1/offers/list',
    currencies: prefix + '/base/v1/currencies',
    goods: prefix + '/catalogue/v1/goods',
    measures: prefix + '/base/v1/measures/search',
    address: prefix + '/v1/areas/list/',
    newAddress: prefix + '/base/v1/region/parent/',
    photo: prefix + '/catalogue/v1/products/getImage?goodsId=',
    update: prefix + '/v1/offers/update',
    uploadImg: prefix + '/v1/offers/uploadSkuPicture',
    offerExport: prefix + '/v1/offers/exportExcel',
    warehouses: prefix + '/v1/warehouses/all?keywords='
};
const orders = {
    detail: prefix + '/v1/orders',
    list: prefix + '/v1/orders/list',
    sellerSettle: prefix + '/order/v1/settlement/selectSettlementOrder',
    buyerSettle: prefix + '/order/v1/settlement/selectSettlementOrder',
    saveSettle: prefix + '/order/v1/settlement/updateSettlementOrder',
    creatOrderCompanies: prefix + '/v1/companies/allTradeCompany',
    creatOrderCompanies2: prefix + '/v1/company/select/company',
    creatcompanynew: prefix + '/v1/company/select/company',
    createOrderList: prefix + '/v1/orders',
    transaction: prefix + '/order/v1/deliveryOrders/order/',
    startSettlementOrderMsg: prefix + '/order/v1/settlement/startSettlementOrderMsg',
    delivery: prefix + '/order/v1/deliveryOrders',
    deliverUp: prefix + '/order/v1/deliveryOrders/fileLoad',
    sign: prefix + '/v1/orders/status',
    allowedFunctions: prefix + '/v1/allowedFunctions',
    contractCreate: prefix + '/v1/order',
    fish: prefix + '/order/v1/settlement/updateOrderToFinish',
    receipt: prefix + '/order/v1/deliveryOrders/receipt', // 签收订单发货
    employees: prefix + '/v1/employees/all/',
    orderList: prefix + '/logistics/v1/consignments/search',
    orderExport: prefix + '/v1/orders/v1/orders/listExport',
    history: prefix + '/v1/orders/',
    companyAdd: prefix + '/v1/companies/admin', // 新增公司
    matchOrder: prefix + '/v1/orders/matchOrderHistory/',
    invoice: prefix + '/order/v1/invoice/getInvoiceUrl/',
    contract: prefix + '/v1/order/',
    contractCode: prefix + '/v1/order/genContractCode?prdId=',
    contractTemplates: prefix + '/v1/order/contractTemplates?',
    genContractCode: prefix + '/v1/order/genContractCode?'
};
const payment = {
    payList: prefix + '/pay/v1/billPayment/listByOrderSn'
};
const product = {
    list: prefix + '/catalogue/v1/products/search',
    add: prefix + '/catalogue/v1/products',
    del: prefix + '/catalogue/v1/products/delete',
    productView: prefix + '/catalogue/v1/products',
    productParameter: prefix + '/catalogue/v1/properties',
    productParameterDefinition: prefix + '/catalogue/v1/products',
    productParameterDetail: prefix + '/catalogue/v1/products',
    productAttribute: prefix + '/catalogue/v1/products',
    productAttributeConfirm: prefix + '/catalogue/v1/products',
    productProductionGoods: prefix + '/catalogue/v1/goods/product'
};

const area = {
    areaInfo: '/v1/areas/areaInfo/',
    list: prefix + '/v1/areas/list/'
};

const user = {
    login: prefix + '/user/v1/login',
    userName: prefix + '/catalogue/v1/goods?keywords',
    logout: prefix + '/user/v1/logout'
};

// 角色
const role = {
    list: prefix + '/v1/roles/list',
    info: prefix + '/v2/roles/',
    manage: prefix + '/v2/roles',
    delete: prefix + '/v1/roles/valid'
};

// 菜单
const menu = {
    list: prefix + '/v1/menus/list', // 获取菜单列表
    list1: prefix + '/v1/menus/all', // 递归版本获取所有菜单列表（包括前后台）
    delete: prefix + '/v1/menus/valid', // 删除菜单信息
    manageList: prefix + '/v1/menus/select',
    manageList2: prefix + '/v1/menu/category/list',
    roles: prefix + '/v2/menus/roles/list/', // 添加、修改菜单的时候，选择上级菜单接口
    info: prefix + '/v1/menus/', // 查询菜单信息
    manage: prefix + '/v1/menus' // 修改菜单信息
};

// 密码
const password = {
    modify: prefix + '/user/v1/password/modify', // 修改密码（自己修改自己的密码）
    reset: prefix + '/user/v1/password/reset' // 重置密码（管理员重置别人的密码）
};

// 会员->个人用户
const memberPersonal = {
    list: prefix + '/v1/users/list',
    info: prefix + '/v1/users/',
    manage: prefix + '/v1/users',
    stop: prefix + '/v1/users/stop',
    start: prefix + '/v1/users/start'
};

const memberBackStageUser = {
    list: prefix + '/v1/users/adminList',
    info: prefix + '/v1/users/admin/',
    manage: prefix + '/v1/users/admin',
    author: prefix + '/v1/users/author',
    create: prefix + '/v1/users/account/create',
    roleList: prefix + '/v1/user/admin/role/list'
};

// 会员->企业用户
const memberCompany = {
    list: prefix + '/v1/companies/select',
    info: prefix + '/v1/companies/',
    delete: prefix + '/v1/companies/valid/',
    manage: prefix + '/v1/companies/',
    companyType: prefix + '/v1/companyTypes/all',
    licences: prefix + '/v1/companies/audit',
    bank: prefix + '/v1/companies/bank/audit',
    stop: prefix + '/v1/companies/stop', // 批量停用公司
    start: prefix + '/v1/companies/start', // 批量启用公司
    ca: prefix + '/v1/companies/ca/audit',
    appendImages: prefix + '/v1/companies/images?filePath='
};
// 仓储公司
const warehouse = {
    list: prefix + '/warehouse/v1/companies/list',
    createList: prefix + '/warehouse/v1/companies/search',
    create: prefix + '/warehouse/v1/companies',
    address: prefix + '/v1/areas/list/', // 获取省市区
    currencies: prefix + '/base/v1/currencies',
    goods: prefix + '/catalogue/v1/goods',
    type: prefix + '/warehouse/v1/type',
    info: prefix + '/warehouse/v1/companies/',
    pass: prefix + '/warehouse/v1/companies/',
    change: prefix + '/warehouse/v1/companies/change',
    file: prefix + '/v1/companies/uploadFile'
};
const upload = {
    img: prefix + '/v1/uploadImage'
};

// 赵东健组
const order = {
    list: '/trade/v1/orders/list',
    detail: '/trade/v1/orders/',
    companies: 'v1/companies/list',
    export: '/trade/pay/v1/billPayment/exportExcel'
};

const statisticalReport = {
    salesStatisticsList: '/report/v1/statistics/monthSaleReport', // 销售统计表
    newCustomerList: '/report/v1/statistics/openAccountAndRegisterReport', // 新客户报表
    tradeCustomerList: '/report/v1/statistics/tradeCustomerReport', // 交易客户报表
    commoditySaleList: '/report/v1/statistics/tradeGoodsReport', // 商品销售表
    userAnalyseList: '/report/v1/statistics/userAnalyseReport', // 用户分析报表
    export: '/trade/pay/v1/billPayment/exportExcel'
};

// 推广管理
const market = {
    recommendList: prefix + '/market/v1/recommend/list',
    recommendSave: prefix + '/market/v1/recommend/save',
    recommendDelete: prefix + '/market/v1/recommend/delete',
    ADList: prefix + '/market/v1/advertisingManagement/list',
    ADSave: prefix + '/market/v1/advertisingManagement/save',
    ADEdit: prefix + '/market/v1/advertisingManagement/update',
    ADDelete: prefix + '/market/v1/advertisingManagement/delete',
    ADImguploade: prefix + '/market/v1/advertisingManagement/imageUploade',
    addNews: prefix + '/recommend/v1/news',
    newsList: prefix + '/recommend/v1/news/search',
    priceList: prefix + '/market/v1/priceindex/list',
    priceDel: prefix + '/market/v1/priceindex/delete',
    priceUP: prefix + '/market/v1/priceindex/update',
    priceSave: prefix + '/market/v1/priceindex/save',
    newsDetail: prefix + '/recommend/v1/news'
};

// 撮合
const matchmak = {
    matchOrderList: prefix + '/v1/orders/matchOrderList',
    addMatchOrder: prefix + '/v1/orders/addMatchOrder',
    listMatchmak: prefix + '/v1/orders/matchOrderList',
    detialMatchmak: prefix + '/v1/orders/matchOrder/',
    cancelMatchmak: prefix + '/v1/orders/invalidMatchOrder',
    journalMatchmank: prefix + '/v1/orders/matchOrderLog',
    exportMatchmank: prefix + '/v1/orders/matchListExport'
};

const transport = {
    bidList: prefix + '/logistics/v1/enquiryNotes/search',
    bidStatus: prefix + '/logistics/v1/enquiryNotes/count',
    orderList: prefix + '/logistics/v1/consignments/search',
    orderStatus: prefix + '/logistics/v1/consignments/count',
    enquiryStatus: prefix + '/logistics/v1/enquiryNotes/count',
    enquiryList: prefix + '/logistics/v1/enquiryNotes/search',
    orderDetail: prefix + '/logistics/v1/consignments/',
    priceList: prefix + '/logistics/v1/enquiryNotes',
    tradeCompany: prefix + '/v1/companies/allTradeCompany',
    carryierCompany: prefix + '/v1/companies/allCompanyByCompanyType',
    vehicleList: prefix + '/logistics/v1/vehicle/search',
    vehicleSave: prefix + '/logistics/v1/vehicle',
    vehicleDetail: prefix + '/logistics/v1/vehicle',
    carriersList: prefix + '/base/v1/carriers/search',
    carriersStatus: prefix + '/logistics/v1/vehicle/validCount',
    transportUserStatus: prefix + '/logistics/v1/transportUsers/validCount',
    transportUserList: prefix + '/logistics/v1/transportUsers/search',
    transportUser: prefix + '/logistics/v1/transportUsers',
    transportUserDisable: prefix + '/logistics/v1/transportUsers/disable',
    transportUserEnable: prefix + '/logistics/v1/transportUsers/enable',
    transportSingleUserSearch: prefix + '/logistics/v1/transportUsers/user/',
    payDetailList: prefix + '/pay/v1/billPayment/listByOrderSn',
    dispatchDetailList: prefix + '/logistics/v1/dispatchNotes/consignmentNote',
    settleDetailList: prefix + '/logistics/v1/consignmentCharges/search',
    dispatchDetail: prefix + '/logistics/v1/dispatchNotes',
    diapatchTraceInfo: prefix + '/logistics/v1/dispatchNotesTrack',
    diapatchImages: prefix + '/logistics/v1/dispatchNotes/file'
};

const point = {
    blackName: '/platform/point/v1/pointMember',
    addBlackName: '/platform/point/v1/pointMember/blackListShop'
};

// 供应链服务管理
const supplyAdmin = {
    statusNum: '/platform/supplyChain/v1/supplyChainApplicationRequestor/count', // 获取状态数
    supplyList: '/platform/supplyChain/v1/supplyChainApplicationRequestor/search', // 查询列表内容
    supplyDetail: '/platform/supplyChain/v1/supplyChainApplicationRequestor/', // 详情页内容获取
    supplyTypes: 'platform/supplyChain/v1/serviceType/types', // 列表服务类型
    CompanyTypes: 'platform/v1/company/select/company', // 企业列表查询
    supplyRating: '/platform/v1/crm/rating/', // 企业评级
    supplyEdit: '/platform/supplyChain/v1/supplyChainApplicationRequestor' // 详情受理编辑
};

export default {
    user,
    category,
    attribute,
    sku,
    product,
    role,
    menu,
    memberCompany,
    memberPersonal,
    parameter,
    upload,
    area,
    order,
    statisticalReport,
    offers,
    orders,
    market,
    receptionCategory,
    payment,
    matchmak,
    transport,
    memberBackStageUser,
    password,
    point,
    warehouse,
    supplyAdmin
};
