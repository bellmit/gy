// 评级
const customer = {
    myRating: '/trade/v1/rating/myRating/', // 我的评级
    historyRating: '/trade/v1/rating/historyRating', // 获取公司历史评级信息
    orderTransactionInfo: '/trade/v1/orderTransactionInfo?userCompanyId=',
    counterpartyList: '/trade/v1/counterpartyRelation/platform/list', // 申请查看交易对手评级列表
    preRecord: '/trade/v1/lastRatingTaskRecord/', // 上级评价
    parent: '/trade/v1/companyCategory/parent', // 获取大类
    Child: '/trade/v1/companyCategory/child/', // 获取小类
    ratingType: '/trade/v1/ratingType/list', // 获取评级类型及范围
    ratingManagement: '/trade/v1/rating/myDeclareCompanyList', // 获取评级列表
    appList: '/trade/v1/counterpartyApprovals/search', // 申请查看评级审核
    counterParties: 'trade/v1/counterparties/search', // 交易对手列表
    partiesDelete: '/trade/v1/counterparties/delete', // 交易对手删除
    transcationPeriods: '/trade/v1/transcationPeriods', // 交易周期列表查询
    transcationType: '/trade/v1/transcationTypes', // 交易模式查询
    getNumber: '/trade/v1/counterpartyApprovals/count', // 获取待审数量
    approval: '/trade/v1/counterpartyApprovals/approval', // 审核
    counterparties: '/trade/v1/counterparties', // 申请查看交易对手
    counterpartiesDetail: '/trade/v1/counterparties/', // 查看交易对手
    access: '/trade/v1/counterparties/access', // 交易对手准入
    companiesList: '/trade/v1/counterparties/companies', // 交易对手贸易公司列表
    addParties: '/trade/v1/counterparties', // 批量添加交易对手
    accessToGyRating: '/trade/v1/counterpartyRelation/accessToGyRating', // 更改是否允放查看
    baseInfo: '/trade/v1/companies/', // 基础信息
    askByRoleCount: '/trade/v1/ratingTaskByRoleCount', // 获取评级审核数量
    save: '/trade/v1/ratingTask/save', // 保存评级
    myRatingInfo: '/trade/v1/rating/myRating/', // 保存评级
    reject: '/trade/v1/ratingTask/reject/' // 驳回
};

// 申请评级模块
const ratingApplication = {
    areasList: '/trade/v1/areas/list/', // 获取全国地理位置列表
    uploadFile: '/trade/v1/declare/company/uploadFile', // 文件上传
    declareInfo: '/trade/v1/rating/declareInfo', // 申报公司类型
    enterpriseTypeList: '/trade/v1/rating/enterpriseTypeList', // 获取申报信息企业类型类目列表
    fileType: '/trade/v1/declare/company/fileType', // 申报公司文件类型模块接口
    sendratingFormData: '/trade/v1/declare/company', // 提交申报公司资料
    getClientRatingFormData: '/trade/v1/declare/company/info/', // 获取申报公司资料--客户端
    getMgmtRatingFormDataMgmt: '/trade/v1/approval/company/info/', // 获取申报公司资料--服务端
    searchCompany: '/trade/v1/company/trade/all/', //  搜索功能查询公司资料--客户端
    updateRatingFormData: '/trade/v1/declare/company', // 更新申报公司资料
    getRatingFormDataMgmt: '/trade/v1/declare/company/info/', // 获取申报公司资料--服务端
    fileParam: '/trade/v1/declare/fileParam/', // 获取图片上传后的参数
    getCompanyInfo: '/trade/v1/company/getCompany',
    rangResult: '/trade/v1/rangResult' // 检测当前公司是否在处理中
};

// 支付业务
const payment = {
    listCollOfSeller: '/trade/pay/v1/collection/listCollOfSeller', // 收款单
    listOfBuyer: '/trade/pay/v1/billPayment/listOfBuyer', // 付款单
    collectionList: '/trade/pay/v1/billCollection/list',
    paymentList: '/trade/pay/v1/billPayment/list', // 获取付款单列表
    voucherList: '/trade/orders/v1/orderBills/payment/list', // 付款凭证列表
    propertyList: '/trade/orders/v1/orderBills/deliveryBills/list', // 获取货权凭证列表
    deliveryBillsupload: '/trade/orders/v1/orderBills/deliveryBills/upload', // 上传货权凭证
    outlineContactupload: '/trade/orders/v1/orderBills/outlineContact/upload', // 上传线下合同
    paymentupload: '/trade/orders/v1/orderBills/payment/upload', // 上传付款凭证
    invoiceupload: '/trade/orders/v1/orderBills/invoice/upload', // 上传线下发票
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
    unbindCardInfo: 'trade/capital/v1/unbindCardInfo', // 解绑
    exportTransRecords: 'trade/capital/v1/exportTransRecords', // 导出
    paymentStatusCount: 'trade/pay/v1/pay/listStatusCount',
    collectionStatusCount: 'trade/pay/v1/collection/listStatusCount',
    innerTransfer: '/trade/capital/v1/innerTransfer',
    innerTransferInfo: '/trade/capital/v1/innerTransferInfo',
    retrieveVerifyCode: '/trade/capital/v1/retrieveVerifyCode',
    findTransRecordByReceiptNo: '/trade/capital/v1/findTransRecordByReceiptNo',
    topaylist: '/trade/pay/v1/billPayment/undoneList',
    repay: '/trade/pay/v1/billPayment/createSlaveBillPayment',
    upload: '/trade/pay/v1/billPayment/application', // 下载付款单下载
    grdonfirmOnlinePay: '/trade/pay/v1/billPayment/reconfirmOnlinePay' // 担保支付的确认(财务分批时才用)
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
    warehouses: '/trade/v1/warehouses/all?keywords=',
    refresh: '/trade/v1/offers/refresh/',
    distinguish: '/trade/v1/offers/parse'
};
const invoice = {
    settleInvoice: '/trade/order/v1/invoice/invoiceUpload',
    sellerSavaInvoice: '/trade/order/v1/invoice/saveInvoice',
    sellerInvoiceImg: '/trade/order/v1/invoice/getInvoiceUrl',
    DocUrl: '/trade/v1/order/',
    uploadUrl: '/trade/v1/uploadImage', // 保存单张图片
    getInvoiceDetail: '/trade/v1/order/invoiceInfo/', // 发票详情
    orderInvoices: '/trade/v1/order/invoices', // 上传发票
    info: '/trade/v1/companies/tax/insert', // 新增公司发票信息
    modify: '/trade/v1/companies/tax/modify', // 修改公司发票信息
    getInfo: '/trade/v1/companies/tax/', // 获取发票信息详情
    getAddInfo: '/trade/v1/order/', // 新增开票获取初始化信息
    addInvoice: '/trade/v1/order/invoiceApplications', // 新增开票
    getInvoiceList: '/trade/v1/order/invoiceApplication/page', // 开票中心列表(分页)
    getInvoiceListStatus: '/trade/v1/order/invoiceApplication/pageCount', // 开票中心列表(状态)
    downLoad: '/trade//v1/order/invoiceApplications/excel', // 开票中心列表导出
    getInfoInvoice: '/trade/v1/order/invoiceApplications/', // 开票详情获取初始化信息(发票)
    invoiceListDetail: '/trade/v1/order/invoiceApplications/', // 开票详情
    invoiceInfo: '/trade/v1/order/invoiceApplications/', // 发票开具信息
    applicationList: 'trade/v1/order/invoiceApplications/' // 发票审批记录
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
    deliveries: '/trade/order/v1/deliveryOrders/status',
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
    contractPwd: '/trade/v1/companies/valid/contract/password', // 验证合同密码接口
    cancelValid: 'trade/v1/orders/valid', // 订单取消接口
    orderContact: '/trade/v1/orders/trade/contact', // 获取联系人接口
    cityAdress: '/trade/v1/companies/', // 获取公司地址
    confirm: '/trade/order/v1/deliveryOrders/confirm/',
    resources: '/trade/v1/demands'
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

const salesOrde = {
    upload: '/trade/v1/order/contracts/upload'
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
    supplydetail: '/trade/supplyChain/v1/supplyChainApplicationRequestor/', // 供应链订单详情,
    types: '/trade/supplyChain/v1/serviceType/types', // 供应链申请单列表检索,
    service: '/trade/supplyChain/v1/serviceType/', // 供应链申请单列表检索,
    newUpload: '/trade/v2/file',
    supplyStatus: '/trade/supplyChain/v1/application/status', // 申请单状态
    serviceType: '/trade/supplyChain/v1/serviceType/search', // 供应链服务类型检索
    goal: '/trade/v2/score/company/goal/' // 评级信息
};

const transport = {
    addUploadDocumentsFile: '/trade/logistics/v1/dispatchNotes/addUploadDocumentsFile', // 上传提货卸货单图片接口
    deleteDocumentsFile: '/trade/logistics/v1/dispatchNotes/deleteDocumentsFile', // 上传提货卸货单图片接口
    vehicleType: '/trade/logistics/v1/dictionary/vehicleType', // 车型
    vehicleState: '/trade/logistics/v1/vehicle/valid', // 查看车辆信息
    addvehicle: '/trade/logistics/v1/vehicle', // 添加车辆信息
    uploadImage: '/trade/logistics/v1/vehicle/upload', // 上传单个图片
    additionalFunction: '/trade/logistics/v1/dictionary/additionalFunction', // 附加功能
    tankMaterial: '/trade/logistics/v1/dictionary/tankMaterial', // 罐体材质
    orderList: '/trade/logistics/v1/consignments/search',
    orderStatus: '/trade/logistics/v1/consignments/count',
    enquiryStatus: '/trade/logistics/v1/enquiryNotes/count',
    enquiryList: '/trade/logistics/v1/enquiryNotes/search',
    priceList: '/trade/logistics/v1/enquiryNotes',
    carType: '/trade/logistics/v1/dictionary/vehicleType',
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
    pageInfo: '/trade/logistics/v1/dispatchNotes/pageInfo', // 分页
    documentsManagementList: '/trade/logistics/v1/dispatchNotes/documentsManagementList', // 运输订单单据管理分页
    consignmentsExport: 'trade/logistics/v1/consignments/export', //  运输订单导出
    consignmentChargesExport: 'trade/logistics/v1/consignmentCharges/export', //  运输结算单导出
    harboursList: '/trade/warehouse/v1/harbours/search', // 港口查询
    enquiryIntentSearch: '/trade/logistics/v1/enquiryIntent/search', // 船运需求单列表
    enquiryIntentAdd: '/trade/logistics/v1/enquiryIntent', // 船运需求单添加
    enquiryIntentStatus: '/trade/logistics/v1/enquiryIntent/count', // 船运需求单状态
    setRange: '/trade/logistics/v1/companies', // 获取物流公司运输范围
    updateDNAQU: '/trade/logistics/v1/dispatchNotes/updateDispatchNoteActualQuantityUnloading', // 更新运输订单实际运货量
    modifyDispatchNoteDetail: '/trade/logistics/v1/dispatchNotes/modifyDispatchNoteDetail/', // 调度单编辑详情
    list: '/trade/logistics/v1/vehicle/list'
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
    increasedPurchaseNote: '/trade/report/v1/increasedPurchaseNote/list', // 成交采购单查询
    increasedPurchaseNoteExport: '/trade/report/v1/increasedPurchaseNote/export', // 新增采购单导出

    purchasePayment: '/trade/report/v1/purchasePayment/list', // 采购单付款查询
    purchasePaymentExport: '/trade/report/v1/purchasePayment/export', // 采购单付款导出

    purchaseGoodsReceive: '/trade/report/v1/purchaseGoodsReceive/list', // 采购单收货查询
    purchaseGoodsReceiveExport: '/trade/report/v1/purchaseGoodsReceive/export', // 采购单收货导出

    increasedSellerNote: '/trade/report/v1/increasedSellerNote/list', // 成交销售单查询
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
    deleteDepartment: '/trade/v2/company/organization/valid',
    deletePerson: '/trade/v4/employee/valid',
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

const marriedDeal = {
    create: '/trade/logistics/v1/dmkOrder',
    status: '/trade/logistics/v1/dmkOrder/count',
    list: '/trade/logistics/v1/dmkOrder/page',
    operate: '/trade/logistics/v1/dmkOrder/status',
    im: '/trade/im/chatRecords',
    parse: '/trade/logistics/v1/dmkOrder/parse',
    set: '/trade/dmk/v1/companies',
    setList: '/trade/dmk/v1/companies/',
    recommendAwardInfoList: 'trade/point/v1/ictInvitationInfo/recommendAwardInfoList', // 引荐奖励列表接口
    searchAward: 'trade/point/point/v1/cashflow/search', // 引荐奖励明细接口
    recommendAwardInfo: 'trade/point/point/v1/ictInvitationInfo/recommendAwardInfo', // 引荐奖励列表奖励金额
    invitationInfo: 'trade/point/point/v1/cashflow/invitationInfo' // 引荐奖励明细奖励金额
};

const warehouse = {
    offers: '/trade/warehouse/v1/offers', // 添加仓储需求
    search: '/trade/warehouse/v1/offers/search', // 查看仓储需求
    commodity: '/trade/catalogue/v1/products/search', // 品名
    requisitioncount: '/trade/warehouse/v1/offers/count' // 统计意向单
};

const forensicServices = {
    getInfo: '/trade/law/v1/lawWorksData/init',
    sub: '/trade/law/v1/lawWorksData/save'
};
const helps = {
    helpList: '/trade/public/help/v1/helpTopics/list',
    helpItem: '/trade/public/help/v1/helpTopics/'
};
const wind = {
    searchList: '/trade/v1/counterparties/search', // 列表
    addCompany: '/trade/v1/counterparties/companies', // 新增公司
    addParties: '/trade/v1/counterparties', // 批量添加交易对手
    counterpartiesDetail: '/trade/v1/counterparties/', // 查看交易对手
    partiesDelete: '/trade/v1/counterparties/delete', // 列表删除
    transcationTypeApi: '/trade/v1/transcationTypes', // 交易模式查询
    transcationPeriodsApi: '/trade/v1/transcationPeriods', // 交易周期列表查询
    access: '/trade/v1/counterparties/access', // 交易对手准入
    getDetail: '/trade/v1/ratingInfo/', // 评级详情
    myRating: '/trade/v1/rating/myRating/', // 我的评级
    alculate: '/trade/v1/counterparties/purpose/score/alculate' // 授信积分参考准入限额
};

// 供应链金融
const supply = {
    enforcement: '/trade/supplyChain/v1/supplyChainApplicationRequestor', // 单证执行接口
    managementResault: '/trade/supplyChain/v1/disposal/result', // 处置结果
    management: '/trade/supplyChain/v1/disposal/apply', // 申请处置
    createBreach: '/trade/supplyChain/v1/disposal/violate', // 创建违约
    serviceProviderHistory: '/trade/common/v1/approve/history/list', // 服务商审批历史
    serviceProviderInitiate: '/trade/supplyChain/v1/applicationProvider/initiate', // 服务商立项
    serviceProviderReject: '/trade/supplyChain/v1/applicationProvider/refused', // 服务商拒绝
    serviceProviderAccept: '/trade/supplyChain/v1/applicationProvider/accept', // 服务商受理
    getDetail: '/trade/supplyChain/v1/supplyChainApplicationRequestor/', // 获取供应链申请单详情信息(客户)
    getMyInfo: '/trade/supplyChain/v1/supplyChainApplicationRequestor/detail/' // 获取供应链申请单详情信息(我的)
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
    organizational,
    warehouse,
    forensicServices,
    salesOrde,
    marriedDeal,
    helps,
    customer,
    ratingApplication,
    wind,
    supply
};
