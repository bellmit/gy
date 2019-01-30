// 支付业务
const payment = {
    listCollOfSeller: '/trade/pay/v1/collection/listCollOfSeller', // 收款单
    listOfBuyer: '/trade/pay/v1/billPayment/listOfBuyer', // 付款单
    collectionList: '/trade/pay/v1/billCollection/list',
    paymentList: '/trade/pay/v1/billPayment/list', // 获取付款单列表
    exportData: '/trade/pay/v1/billPayment/exportExcel', // 导出数据为excel格式
    orderInfo4Pay: '/trade/pay/v1/billPayment/orderInfo', // 获取付款信息，用于创建付款单
    payInfo4Confirm: '/trade/pay/v1/billPayment/payInfo',
    createPayment: '/trade/pay/v1/billPayment/createBillPayment',
    paymentInfo: '/trade/pay/v1/billPayments/', // URL中的付款单ID在运行时设置
    collectionInfo: '/trade/pay/v1/billCollections/', // URL中的收款单ID在运行时设置
    paymentConfirmUpload: '/trade/pay/v1/attach/upload', // 创建付款单上传附件
    paymentImage: '/trade/pay/v1/pay/image', // 获取图片
    paymentMoney: '/trade/pay/v1/pay/money', // 支付
    companyAccount: '/trade/capital/v1/accountInfo',
    accTrans: '/trade/capital/v1/findTransRecords',
    payInfoBalance: '/trade/pay/v1/pay/balance',
    withdrawInfo: '/trade/capital/v1/withdrawInfo', // 初始化页面
    latticePoints: 'trade/capital/v1/latticePoints', // 获取联动信息
    recharge: 'trade/capital/v1/recharge', // 获取转入信息
    useAccounts: 'trade/capital/v1/frequentlyUseAccounts', // 获取转入信息
    withdraw: 'trade/capital/v1/withdraw', // 转出保存
    bindAuthenticateCard: 'trade/capital/v1/bindAuthenticateCard', // fhy新增银行提交按钮
    checkAuthenticateAmount: 'trade/capital/v1/checkAuthenticateAmount', // fhy回填鉴权金额
    exportTransRecords: 'trade/capital/v1/exportTransRecords', // 导出
    paymentStatusCount: 'trade/pay/v1/pay/listStatusCount',
    collectionStatusCount: 'trade/pay/v1/collection/listStatusCount',
    findTransRecordByReceiptNo: '/trade/capital/v1/findTransRecordByReceiptNo'
};

// 报表
const report = {
    paymentDetail: '/trade/report/v1/payment/listPaymentDetailReport',
    paymentSummary: '/trade/report/v1/payment/listPaymentReport',
    collectionDetail: '/trade/report/v1/collection/listCollectionDetailReport',
    collectionSummary: '/trade/report/v1/collection/listCollectionReport',
    pay_coll_sum: '/trade/report/v1/paycollSummary'
};

// 流程处理统一API
const processes = {
    flowAct: '/trade/flow/v1/process',
    approveHistory: '/trade/common/v1/approve/history/list', // 获取审批记录
    bizApproveStatus: '/trade/common/v1/approve/biz/status' // 获取审批状态
};

const list = {
    product: '/v2/api'
};
const login = {
    login: '/trade/user/v1/login',
    logout: '/trade/user/v1/logout'
};
const offers = {
    resources: 'trade/v1/offers',
    state: 'trade/v1/offers/status',
    list: 'trade/v1/offers/list',
    currencies: 'trade/base/v1/currencies',
    goods: 'trade/catalogue/v1/goods',
    measures: 'trade/base/v1/measures/search',
    address: 'trade/v1/areas/list/',
    photo: 'trade/catalogue/v1/products/getImage?goodsId=',
    update: 'trade/v1/offers/update',
    uploadImg: 'trade/v1/offers/uploadSkuPicture',
    warehouses: '/trade/v1/warehouses/all?keywords='
};
const invoice = {
    settleInvoice: '/trade/order/v1/invoice/invoiceUpload',
    sellerSavaInvoice: '/trade/order/v1/invoice/saveInvoice',
    sellerInvoiceImg: '/trade/order/v1/invoice/getInvoiceUrl'
};
const sale = {
    detail: 'trade/v1/orders',
    list: 'trade/v1/orders/list'
};

// 订单业务 结算
const order = {
    sellerSettle: '/trade/order/v1/settlement/selectSettlementOrder',
    buyerSettle: '/trade/order/v1/settlement/selectSettlementOrder',
    saveSettle: '/trade/order/v1/settlement/updateSettlementOrder',
    creatOrderCompanies: '/trade/v1/company/select/company',
    logisticsCompanies: '/trade/v1/companies/allCompanyByCompanyType',
    createOrderList: '/trade/v1/orders',
    transaction: '/trade/order/v1/deliveryOrders/order/',
    startSettlementOrderMsg: 'trade/order/v1/settlement/startSettlementOrderMsg',
    delivery: '/trade/order/v1/deliveryOrders',
    // confirmSettlementOrderMsg: '/order/v1/settlement/confirmSettlementOrderMsg'
    deliverUp: '/trade/order/v1/deliveryOrders/fileLoad',
    sign: '/trade/v1/orders/status',
    allowedFunctions: '/v1/allowedFunctions',
    contractCreate: 'trade/v1/order',
    fish: 'trade/order/v1/settlement/updateOrderToFinish',
    receipt: '/trade/order/v1/deliveryOrders/receipt', // 签收订单发货
    sendDone: '/trade/order/v1/orders/',
    contractTemplates: '/trade/v1/order/contractTemplates?',
    contractCode: '/trade/v1/order/genContractCode?prdId=',
    contractPwd: '/trade/v1/companies/valid/contract/password' // 验证合同密码接口
};

const register = {
    register: '/trade/register/user/v1/register', // 注册
    graphic: '/trade/register/user/v1/verification/graphic',
    phoneNumber: '/trade/user/v1/password/phone/verification/code',
    checkAccount: '/trade/register/user/v1/registered/account',
    checkEmail: '/trade/register/user/v1/registered/email',
    checkPhone: '/trade/register/user/v1/registered/phone',
    creatOrder: '/v1/orders', // 创建订单
    salesOrdersList: '/v1/orders/list',
    password: '/trade/user/v1/password/set/by/phone',
    testPhone: '/trade/user/v1/password/verification/right/phone',
    testGraphic: '/trade/user/v1/password/verification/right/graphic'
};

const account = {
    company_rel_xref: '/trade/account/v1/companies/xrefList',
    userInfo: '/trade/v1/users',
    area: '/trade/v1/areas/list',
    newArea: '/trade/base/v1/region/parent',
    companyList: '/trade/v1/users/companies/all',
    companyListAutoPass: '/trade/v1/user/companies/all/authPass', // 获取审核已通过企业
    // setMain: 'trade/v1/companies/switch/',
    setMain: '/trade/v1/companies/upleft/switch/', // 设置主企业
    getMainImg: '/trade/v1/companies/images', // 获取企业三证图片
    upload: '/trade/v1/companies/uploadFile',
    auth: '/trade/v1/companies/auth',
    companyInfo: '/trade/v1/companies',
    companyDelete: '/trade/v1/users/delete/company',
    companyCa: '/trade/v1/companies/ca/auth',
    companyBank: '/trade/v1/companies/bank/auth',
    template: 'trade/v1/companies/templates/',
    employee: '/trade/v1/employees/list', // 获取公司员工列表
    employeeRemove: '/trade/v1/employees/valid/', // 移除公司员工
    employeeAdd: '/trade/v1/employees/', // 添加公司员工
    employeeSearch: 'trade/v1/users/userList/', // 模糊查询用户
    companyRoleAll: 'trade/v1/roles/companies/all', // 获取公司所有角色
    companyRoleAll2: '/trade/v1/companyRole/role/all', // 获取公司所有角色
    companyRoleSet: '/trade/v1/roles/employees/auths', // 获取公司所有角色
    companyRoleSet2: '/trade/v1/companyRole/role/auths', // 获取公司所有角色
    resetLoginPwd: '/trade/user/v1/password/modify', // 重置登录密码
    resetTradePwd: '/trade/v1/companies/update/trade/password', // 重置交易密码
    isHasTradePwd: '/trade/v1/companies/exist/trade/password', // 获取是否有交易密码
    resetContractPwd: '/trade/v1/companies/update/contract/password', // 重置合同密码
    isHasContractPwd: '/trade/v1/companies/exist/contract/password', // 获取是否有合同密码
    downLoad: '/trade/v1/companies/templates/', // 授权书下载
    addressLib: '/trade/logistics/v1/warehouse/address?keywords=',
    upload2: '/trade/app/v1/files', // 添加提货信息上传
    roleList: '/trade/v1/companyRole/role/list', // 角色列表
    validDel: '/trade/v1/companyRole/role/valid', // 角色列表
    rolemenuList: '/trade/v1/menus/common/list', // 角色列表 tree数据查询
    newAddrole: '/trade/v1/companyRole/role', // 角色列表新增
    rolesDetail: '/trade/v2/roles', // 角色列表新增
    supplySearch: '/trade/supplyChain/v1/supplyChainApplicationRequestor/search', // 供应链申请单列表检索,
    supplyCount: '/trade/supplyChain/v1/supplyChainApplicationRequestor/count', // 供应链申请单列表检索,
    supplyChain: '/trade/supplyChain/v1/supplyChainApplicationRequestor', // 供应链申请单列表检索,
    supplyChainedit: '/trade/supplyChain/v1/supplyChainApplicationRequestor', // 供应链申请单列表检索,
    types: '/trade/supplyChain/v1/serviceType/types' // 供应链申请单列表检索,
};

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
    dispatchNotesth: '/trade/app/logistics/v1/dispatchNotes/app', // 提货量接口
    dispatchNotesth2: '/trade/logistics/v1/dispatchNotesTrack', // 提货量接口
    chargeStatus: '/trade/logistics/v1/consignmentCharges/count',
    chargeList: '/trade/logistics/v1/consignmentCharges/search',
    newCharge: '/trade/logistics/v1/consignmentCharges',
    transportStatus: '/trade/logistics/v1/consignments/status',
    carList: '/trade/logistics/v1/vehicle/search',
    dispatchAmount: '/trade/logistics/v1/dispatchNotes/count/consignmentNote',
    driver: '/trade/logistics/v1/transportUsers?keywords=',
    transportUserAll: '/trade/logistics/v1/transportUsers/searchAll',
    dispatch: '/trade/logistics/v1/dispatchNotes',
    transportUserStatus: '/trade/logistics/v1/transportUsers/validCount',
    transportUserList: '/trade/logistics/v1/transportUsers/search',
    transportUser: '/trade/logistics/v1/transportUsers',
    transportUserDisable: '/trade/logistics/v1/transportUsers/disable',
    transportUserEnable: '/trade/logistics/v1/transportUsers/enable',
    transportSingleUserSearch: '/trade/logistics/v1/transportUsers/user/',
    vehicleList: '/trade/logistics/v1/vehicle/search',
    vehicleSave: '/trade/logistics/v1/vehicle',
    vehicleDetail: '/trade/logistics/v1/vehicle',
    carriersList: '/trade/base/v1/carriers/search',
    carriersStatus: '/trade/logistics/v1/vehicle/validCount',
    dispatchDetail: '/trade/logistics/v1/dispatchNotesTrack',
    viewContract: '/trade/logistics/v1/consignmentContracts',
    signContract: '/trade/logistics/v1/consignmentContracts/sign',
    dispatchDetailList: '/trade/logistics/v1/dispatchNotes/consignmentNote',
    payDetailList: '/trade/pay/v1/billPayment/list',
    collectionDetailList: '/trade/pay/v1/billCollection/list',
    settleDetailList: '/trade/logistics/v1/consignmentCharges/search',
    diapatchTraceInfo: '/trade/logistics/v1/dispatchNotes',
    diapatchImages: '/trade/logistics/v1/dispatchNotes/file',
    deliverNotice: '/trade/logistics/v1/consignments/deliveryNotices',
    deliverDetail: '/trade/logistics/v1/consignments/deliveryNotices/search',
    stopDo: '/trade/logistics/v1/consignments/add/reasons',
    stopReason: '/trade/logistics/v1/consignments/reasons',
    logistics: '/trade/logistics/v1/consignments/carrier/permission',
    consignmentNote: '/trade/logistics/v1/dispatchNotes/shippingDetailsExport/consignmentNote', // 运输明细导出
    transportTotal: '/trade/logistics/v1/dispatchNotes/transportTotal/consignmentNote/', // 运输明细合计
    pageInfo: '/trade/logistics/v1/dispatchNotes/pageInfo' // 分页
};

const global = {
    product: '/trade/catalogue/v1/goods?keywords=',
    moneyUnit: '/trade/base/v1/currencies',
    weightUnit: '/trade/base/v1/measures/search',
    companyType: '/trade/v1/companyTypes/all'
};

// 卖家中心-店铺管理
const shop = {
    uploadFile: '/trade/v1/companies/uploadFile',
    save: '/trade/v1/company/profile/submit',
    ImgRegulatelist: '/trade/v1/company/profile/img/list',
    saveImgForm: '/trade/v1/company/profile/img',
    imgUploadFile: '/trade/v1/company/profile/img/upload',
    treeList: '/trade/catalogue/v1/display',
    imgEdit: '/trade/v1/company/profile/img/update',
    delete: '/trade/v1/company/profile/img/delete',
    profile: '/trade/v1/company/profile',
    catalogues: '/trade/catalogue/v1/catalogues/'
};

// 聊天
const chat = {
    chitchat: '/trade/v1/users'
};

// 消息
const news = {
    list: '/trade/messageInfo/v1/message/search',
    read: '/trade/messageInfo/v1/message/',
    allRead: '/trade/messageInfo/v1/message/isReceived'
};

// 报表中心
const deal = {
    summarizing: '/trade/report/v1/translationReport', // 交易汇总展示
    increasedPurchaseNote: '/trade/report/v1/increasedPurchaseNote/list', // 新增采购单查询
    increasedPurchaseNoteExport: '/trade/report/v1/increasedPurchaseNote/export', // 新增采购单导出

    purchasePayment: '/trade/report/v1/purchasePayment/list', // 采购单付款查询
    purchasePaymentExport: '/trade/report/v1/purchasePayment/export', // 采购单付款导出

    purchaseGoodsReceive: '/trade/report/v1/purchaseGoodsReceive/list', // 采购单收货查询
    purchaseGoodsReceiveExport: '/trade/report/v1/purchaseGoodsReceive/export', // 采购单收货导出

    increasedSellerNote: '/trade/report/v1/increasedSellerNote/list', // 新增销售单查询
    increasedSellerNoteExport: '/trade/report/v1/increasedSellerNote/export', // 新增销售单导出

    sellerCollection: '/trade/report/v1/sellerCollection/list', // 销售单收款查询
    sellerCollectionExport: '/trade/report/v1/sellerCollection/export', // 销售单收款导出

    sellerGoodsSend: '/trade/report/v1/sellerGoodsSend/list', // 销售单发货查询
    sellerGoodsSendExport: '/trade/report/v1/sellerGoodsSend/export' // 销售单发货导出
};

// 积分中心
const point = {
    orderList: '/trade/point/v1/odrPointNote/search', // 兑换订单列表
    deleteOrder: '/trade/point/v1/odrPointNote/delete', // 删除订单
    orderDetail: '/trade/point/v1/odrPointNote/search/', // 删除订单
    logistics: 'trade/v1/expressCompanies/info', // 获取物流信息
    odrProvince: 'trade/v1/areas/list',
    addressList: '/trade/point/v1/ictAddress/searchAll',
    addAddress: '/trade/point/v1/ictAddress',
    addressInfo: '/trade/point/v1/ictAddress/search/',
    deleteAddress: '/trade/point/v1/ictAddress/delete',
    getPoint: '/trade/point/v1/pointLog', // 获取我的企业等级和积分
    getPointList: '/trade/point/v1/pointLog/search', // 获取积分明细,
    openShop: '/trade/point/v1/pointLog/shopStatus'
};

const organizational = {
    organizationalList: '/trade/v1/company/organization/listTree',
    departmentList: '/trade/v2/employee/list',
    companyPersonAll: '/trade/v1/employees/organization/all/',
    addDepartment: '/trade/v1/company/organization',
    deleteDepartment: '/trade/v1/company/organization/valid',
    deletePerson: '/trade/v3/employee/valid',
    doAddPerson: '/trade/v2/employees/batch',
    getManagerList: '/trade/v1/company/position/list',
    addManager: '/trade/v1/company/position',
    deleteManager: '/trade/v1/company/position/valid',
    getManagerDetail: '/trade/v1/company/position/detail/',
    addStaff: '/trade/v1/organization/employee',
    editStaff: '/trade/v3/employee',
    testStaffNum: '/trade/v1/organization/employee/isExits',
    employeeList: '/trade/v3/employee/list',
    getStatus: '/trade/v3/employee/status',
    testPhone: '/trade/v3/employee/isExits',
    directSuperior: '/trade/v3/employee/manager'
};

export default {
    list,
    offers,
    register,
    payment,
    report,
    account,
    sale,
    order,
    processes,
    login,
    transport,
    global,
    shop,
    invoice,
    deal,
    chat,
    point,
    news,
    organizational
};
