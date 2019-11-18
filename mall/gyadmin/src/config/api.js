const prefix = '/platform';

// 统计报表
const charts = {
    statistics: prefix + '/report/v1/statistics'
};

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
    demand: prefix + '/v1/demands', // 求购添加
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
    warehouses: prefix + '/v1/warehouses/all?keywords=',
    batchUp: prefix + '/v1/supply/status/batch/up',
    batchDown: prefix + '/v1/supply/status/batch/down',
    up: prefix + '/v1/supply/status/up',
    down: prefix + '/v1/supply/status/down',
    buyBatchDown: prefix + '/v1/buy/status/batch/down',
    buyBatchUp: prefix + '/v1/buy/status/batch/up',
    buyUp: prefix + '/v1/buy/status/up',
    buyDown: prefix + '/v1/buy/status/down',
    refresh: prefix + '/v1/offers/refresh/',
    top: prefix + '/v1/offers/top/',
    seller: prefix + '/v1/offers/seller/import',
    buyer: prefix + '/v1/offers/buyer/import',
    templateDownload: prefix + '/v1/offers/templateDownload/',
    result: prefix + '/v1/offers/import/result/'

};
const orders = {
    DocUrl: prefix + '/v1/order/', // 发票列表
    detail: prefix + '/v1/orders',
    list: prefix + '/v1/orders/list',
    sellerSettle: prefix + '/order/v1/settlement/selectSettlementOrder',
    buyerSettle: prefix + '/order/v1/settlement/selectSettlementOrder',
    saveSettle: prefix + '/order/v1/settlement/updateSettlementOrder',
    // creatOrderCompanies: prefix + '/v1/companies/allTradeCompany',
    creatOrderCompanies2: prefix + '/v1/company/select/company',
    // creatcompanynew: prefix + '/v1/company/select/company',
    creatcompanynew: prefix + '/v2/companies/allTradeCompany', // new查询买卖方公司
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
    // companyAdd: prefix + '/v1/companies/admin', // 新增公司
    companyAdd: prefix + '/v2/company/Additional', // new新增公司
    matchOrder: prefix + '/v1/orders/matchOrderHistory/',
    invoice: prefix + '/order/v1/invoice/getInvoiceUrl/',
    getInvoiceDetail: prefix + '/v1/order/invoiceInfo/', // 发票详情
    contract: prefix + '/v1/order/',
    contractCode: prefix + '/v1/order/genContractCode?prdId=',
    contractTemplates: prefix + '/v1/order/contractTemplates?',
    genContractCode: prefix + '/v1/order/genContractCode?',
    companyType: prefix + '/v1/companyType/list/', // new公司类型
    audit: '/platform/v1/orders/bill/status', // 订单审核
    refusedInvoice: '/platform/baiwang/v1/refusedInvoice',
    discernInvoice: '/platform/order/v1/invoices/',
    check: '/platform/order/v1/invoices/',
    compare: '/platform/order/v1/invoices/'
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
    list: prefix + '/v1/areas/list/',
    odrPointNote: '/platform/point/v1/odrPointNote'
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
    start: prefix + '/v1/users/start',
    stopUser: prefix + '/v1/admin/users/stop',
    startUser: prefix + '/v1/admin/users/start'
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
    audit: prefix + '/v1/logistics/companies/audit',
    reject: prefix + '/v1/companies/audit/reject',
    bank: prefix + '/v1/companies/bank/audit',
    stop: prefix + '/v1/companies/stop',
    start: prefix + '/v1/companies/start',
    ca: prefix + '/v1/companies/ca/audit',
    appendImages: prefix + '/v1/companies/images?filePath=',
    companyStop: prefix + '/v1/logistics/companies/stop',
    companyStart: prefix + '/v1/logistics/companies/start',
    storageStop: prefix + '/v1/storage/companies/stop',
    storageStart: prefix + '/v1/storage/companies/start'
};
// 仓储公司
const warehouse = {
    list: prefix + '/warehouse/v1/companies/list',
    listv2: prefix + '/warehouse/v2/companies/info/search',
    createList: prefix + '/warehouse/v1/companies/search',
    create: prefix + '/warehouse/v1/companies',
    address: prefix + '/v1/areas/list/', // 获取省市区
    currencies: prefix + '/base/v1/currencies',
    goods: prefix + '/catalogue/v1/goods',
    type: prefix + '/warehouse/v1/type',
    info: prefix + '/warehouse/v1/companies/',
    infov2: prefix + '/warehouse/v2/companies/info/',
    manage: prefix + '/warehouse/v2/companies/info/',
    pass: prefix + '/warehouse/v1/companies/',
    change: prefix + '/warehouse/v1/companies/change',
    file: prefix + '/v1/companies/uploadFile',
    intentionSheetPage: prefix + '/warehouse/v1/offers/search',
    audit: prefix + '/warehouse/v1/offers/audit',
    valid: prefix + '/warehouse/v1/offers/valid/',
    count: prefix + '/warehouse/v1/offers/count',
    isDisplay: prefix + '/warehouse/v1/offers/display',
    isDisplaySupplyOrder: prefix + '/warehouse/v1/supplyOrder',
    noDisplay: prefix + '/warehouse/v1/offers/hidden',
    noDisplaySupplyOrder: prefix + '/warehouse/v1/supplyOrder/hidden',
    supplyCount: prefix + '/warehouse/v1/supplyOrder/count',
    supplyOrder: prefix + '/warehouse/v1/supplyOrder/page',
    addSheet: prefix + '/warehouse/v1/supplyOrder',
    companies: prefix + '/warehouse/v1/companies?keywords=',
    products: prefix + '/catalogue/v1/products/search?keywords=',
    warehouseType: prefix + '/warehouse/v1/type/',
    productsSearch: prefix + '/catalogue/v1/products/search', // 调用产品接口
    saveCompanies: prefix + '/warehouse/v2/storage/companies/info',
    refuse: prefix + '/warehouse/v1/offers/audit/refuse',
    validate: prefix + '/warehouse/v1/supplyOrder/validate',
    supplyDelete: prefix + '/warehouse/v1/supplyOrder/delete',
    reviseList: prefix + '/warehouse/v1/supplyOrder' // 仓储修改供应单
};
const upload = {
    img: prefix + '/v1/uploadImage',
    paymentImage: prefix + '/v1/image' // 获取图片
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
    newsDetail: prefix + '/recommend/v1/news',
    delNews: prefix + '/recommend/v1/news/delete'
};

// 撮合
const matchmak = {
    matchOrderList: prefix + '/v1/orders/matchOrderList',
    addMatchOrder: prefix + '/v1/orders/addMatchOrder',
    listMatchmak: prefix + '/v1/orders/matchOrderList',
    detialMatchmak: prefix + '/v1/orders/matchOrder/',
    cancelMatchmak: prefix + '/v1/orders/invalidMatchOrder',
    journalMatchmank: prefix + '/v1/orders/matchOrderLog',
    exportMatchmank: prefix + '/v1/orders/matchListExport',
    contacts: prefix + '/v1/orders/contact',
    matchContact: prefix + '/v1/orders/matchContact'
};

const transport = {
    vehicleType: prefix + '/logistics/v1/dictionary/vehicleType', // 车型
    vehicleState: prefix + '/logistics/v1/vehicle/valid', // 查看车辆信息
    uploadImage: prefix + '/v1/companies/uploadFile', // 上传单个图片
    additionalFunction: prefix + '/logistics/v1/dictionary/additionalFunction', // 附加功能
    tankMaterial: prefix + '/logistics/v1/dictionary/tankMaterial', // 罐体材质
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
    addvehicle: prefix + '/logistics/v1/vehicle', // 添加车辆信息
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
    diapatchImages: prefix + '/logistics/v1/dispatchNotes/file',
    consignmentNote: '/platform/logistics/v1/dispatchNotes/shippingDetailsExport/consignmentNote', // 运输明细导出
    transportTotal: '/platform/logistics/v1/dispatchNotes/transportTotal/consignmentNote/', // 运输明细合计
    pageInfo: '/platform/logistics/v1/dispatchNotes/pageInfo', // 分页
    consignmentsExport: 'platform/logistics/v1/consignments/export', // 运输订单导出
    enquiryIntentSearch: prefix + '/logistics/v1/enquiryIntent/search', // 船运需求单列表
    enquiryIntentCount: prefix + '/logistics/v1/enquiryIntent/count', // 船运需求单列表数量
    enquiryStatusData: prefix + '/logistics/v1/enquiryIntent/enquiryStatus', // 审核
    audit: '/platform/logistics/v1/dispatchNotes/billStatus', // 调度单审核
    prohibit: prefix + '/logistics/v1/vehicle/valid/disable'
};

const point = {
    blackName: '/platform/point/v1/pointMember',
    addBlackName: '/platform/point/v1/pointMember/blackListShop',
    removeName: '/platform/point/v1/pointMember/blackListShop/remove',
    members: '/platform/point/v1/members',
    search: '/platform/point/v1/pointLog/search',
    pointConsumption: '/platform/point/mypoint/pointConsumption',
    fuzzySearch: '/platform/v3/company/list/fuzzySearch'
};

// 供应链服务管理
const supplyAdmin = {
    statusNum: '/platform/supplyChain/v1/supplyChainApplicationRequestor/count', // 获取状态数
    supplyList: '/platform/supplyChain/v1/supplyChainApplicationRequestor/search', // 查询列表内容
    supplyDetail: '/platform/supplyChain/v1/supplyChainApplicationRequestor/', // 详情页内容获取
    supplyTypes: 'platform/supplyChain/v1/serviceType/types', // 列表服务类型
    CompanyTypes: 'platform/v1/company/select/company', // 企业列表查询
    supplyRating: '/platform/v1/crm/rating/', // 企业评级
    supplyEdit: '/platform/supplyChain/v1/supplyChainApplicationRequestor', // 详情受理编辑
    refuse: '/platform/supplyChain/v1/supplyChainApplicationRequestor/refuse',
    status: '/platform/supplyChain/v1/application/status', // 申请单状态
    provider: '/platform/supplyChain/v1/provider', // 服务商
    ratingInfo: '/platform/v1/ratingInfo/' // 评级详情
};

const harbour = {
    harbourList: '/platform/warehouse/v1/harbours/list', // 港口列表
    search: '/platform/warehouse/v1/harbours/search', // 港口查询
    save: '/platform/warehouse/v1/harbours' // 添加港口
};

const findBankStatement = {
    list: '/platform/capital/v1/findBankStatement',
    export: '/platform/capital/v1/exportBankStatement',
    downList: '/platform/capital/v1/exportCapitalAccounts', // 导出列表
    getSubList: '/platform/capital/v1/findCapitalAccounts', // 获取资金子账户
    getMoney: '/platform/capital/v1/retrieveBalance' // 获取账户金额
};

// 奖励相关的
const reward = {
    list: '/platform/point/v1/ictInvitationInfo/list', // 交易邀请者信息列表
    statisticsInviterType: '/platform/point/v1/ictInvitationInfo/statisticsInviterType', // 交易邀请类型统计
    search: '/platform/point/v1/cashflow/search', // 交易邀请类型统计
    invitationInfo: '/platform/point/v1/cashflow/invitationInfo' // 交易邀请类型统计
};
// 撮合交易
const dealMake = {
    list: '/platform/dmk/v1/dmkOrder/page', // 列表
    status: '/platform/dmk/v1/dmkOrder/count', // 状态
    warehouse: '/platform/v1/warehouses/all?keywords=', // 交割库
    detail: '/platform/dmk/v1/dmkOrder/', // 详情
    export: 'platform/dmk/v1/dmkOrder/exportExcel' // 导出
};
// 日志
const userLog = {
    searchCount: '/platform/log/type/count',
    searchTree: '/platform/log/dict',
    searchLog: '/platform/log',
    exportLog: '/platform/log/export'
};

// 帮助中心
const htlpCenter = {
    list: prefix + '/help/v1/helpTopics/list',
    save: prefix + '/help/v1/helpTopics/add',
    update: prefix + '/help/v1/helpTopics/update',
    delete: prefix + '/help/v1/helpTopics/delete',
    getDetails: prefix + '/help/v1/helpTopics'
};

// 供应链服务
const supply = {
    serviceProviderList: '/platform/supplyChain/v1/provider?keywords=', // 获取服务商列表
    getDetail: '/platform/supplyChain/v1/supplyChainApplicationRequestor/', // 获取供应链申请单详情信息
    reject: '/platform/supplyChain/v1/applicationPlatform', // 平台审核拒绝
    serviceProviderHistory: '/platform/supplyChain/v1/approve/history/list', // 服务商审批历史
    distribute: '/platform/supplyChain/v1/applicationPlatform', // 派单
    distributeList: '/platform/supplyChain/v1/ApplicationLog/sendOrdersLogByApplicationId/' // 平台审核派单记录
};
// 公司发票信息
const invoice = {
    invoiceList: prefix + '/v1/companies/tax/search', // 公司发票列表
    insert: prefix + '/v1/companies/tax/insert', // 新增公司发票信息
    modify: prefix + '/v1/companies/tax/modify', // 修改公司发票信息
    getInfo: prefix + '/v1/companies/tax/' // 获取发票信息详情
};
export default {
    user,
    charts,
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
    supplyAdmin,
    harbour,
    findBankStatement,
    reward,
    dealMake,
    userLog,
    htlpCenter,
    supply,
    invoice
};
