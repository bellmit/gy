const payment = {
    getlist: '/erp/payment/v1/paymentAndCollection/list',
    getDetail: '/erp/payment/v1/paymentInfo', // 收付款详情（付款详情）
    getDetailCollection: '/erp/order/v1/collection/searchByOrderId/', // 收付款详情（收款详情）
    getDetailCollectionById: '/erp/order/v1/collection/searchByCollectionId/', // 收款详情
    getDetailOrder: '/erp/contract/v1/essences/', // 收付款详情（订单详情）
    buy: '/erp/payment/v1/approvePayment', // 付款审核
    voucher: '/erp/payment/v1/updatePayment', // 保存付款凭证
    sale: '/erp/order/v1/collection/confirmCollection', // 收款财务确认
    newBank: '/erp/bank/info/list', // 获取银行
    daliyCollections: '/erp/order/v1/collection/daliyCollections', // 当日收款记录
    addBankInfo: '/erp/account/v1/companies/addBankInfo',
    allPageStatusCount: '/erp/payment/v1/paymentAndCollection/list/allPageStatusCount',
    paymentApplicationAmount: '/erp/order/v1/collection/paymentInfo/query', // 付款申请金额
    paymentInfoList: '/erp/payment/v1/paymentInfoList/', // 付款单分批详情(付款详情)
    exportPaymentApplication: '/erp/payment/v1/report/payment/application' // 下载付款申请单
};

const contract = {
    addContract: '/erp/contract/v1/essence/save', // 合同要素新增(修改)提交
    getCompany: '/erp/common/v1/contract/getGoodsAndTrader4BizTypeAll', // 获取公司(买卖方)、商品
    getRelatedCompany: '/erp/common/v1/contract/getRelatedTraderList', // 获取我方公司
    getDeliveryBank: '/erp/common/v1/contract/getWarehouseList4Product', // 根据商品获取交割库
    getCompanyGrade: '/erp/common/v1/contract/getTradeCounterpartyGrade', // 查询业务组
    getGrade: '/erp/common/v1/contract/user/list', // 查询人员
    getRoleList: '/erp/user/v1/roles/list', // 查询角色
    getUserOrganization: '/erp/common/v1/contract/organization/by/userid', // 查询交易对手评级
    getlist: '/erp/contract/v1/essence/list', // 合同要素列表
    getdetail: '/erp/contract/v1/essences', // 合同要素基本信息
    approve: '/erp/contract/v1/essence/approve', // 合同要素审批
    approve1: '/erp/contract/v1/contract/approve', // 合同审批
    approve1History: '/erp/common/v1/approve/history/list', // 合同审批记录
    addContract1: '/erp/contract/v1/contract/create', // 新增合同
    attach: '/erp/common/v1/upload/contract/certified/attach', // 新增正式合同
    getBizTradeTypeList: '/erp/common/v1/contract/biztrade/type/list', // 查询本平台支持的业务类型
    getBizTradeProdList: '/erp/common/v1/contract/biztrade/prod/list', // 查询指定业务类型的交易商品种类
    essenceUpdate: '/erp/contract/v1/essence/update', // 执行分配
    essenceTest: '/erp/contract/v1/essence/checkPlanNumber' // 执行分配计划号校验
};

const login = {
    login: '/erp/user/v1/login',
    logout: '/erp/user/v1/logout'
};

// 合同管理
const order = {
    orderList: '/erp/contract/v1/order/list', // 合同管理列表
    orderNoList: '/erp/common/v1/contract/order/downs/list', // 合同编号列表
    files: '/erp/common/v1/contract/order/down/files', // 合同编号列表打包
    orderDetail: '/erp/contract/v1/essences', // 合同管理详情
    getCollectionDeatil: 'erp/order/v1/collection/searchByOrderId', // 收款详情
    newPayment: '/erp/payment/v1/savePayment', // 新增付款
    createReceipts: '/erp/order/v1/collection/createCollection', // 创建收款单
    allPageStatusCount: '/erp/contract/v1/order/list/allPageStatusCount' // 合同统计明细
};
// 发票
const invoice = {
    getlist: '/erp/v1/invoice/list', // 列表
    getDetail: '/erp/v1/invoice/receipt', // 详情-收票信息
    getDetails: '/erp/v1/invoice/sales', // 详情-开票信息
    applyInvoice: '/erp/v1/invoice/create', // 申请开票
    createCollect: '/erp/v1/invoice/receipt/create', // 新建收票
    createCollectView: '/erp/order/v1/collection/createCollectionView', // 新建收付款页面
    approveSure: '/erp/v1/invoice/approve', // 开票查看，审核
    financialSure: '/erp/v1/invoice/receipt/confirm', // 收票查看-财务确认
    accountAccount: '/erp/v1/invoice/customer/info/', // 开户账号
    commodityCode: '/erp/catelogue/v1/products/getProductTaxCode', // 税务编码
    pageBringInData: '/erp/v1/invoice/info/4/creation/', // 初始化数据
    uploadInvoice: '/erp/v1/invoice/upload/confirm', // 上传发票凭证
    courierNumber: '/erp/v1/invoice/express/enter', // 快递单号
    allPageStatusCount: '/erp/v1/invoice/list/allPageStatusCount', // 统计状态
    getInvoiceDeliveryCollection: '/erp/v1/invoice/delivery/collection/list',
    getInvoiceHistory: '/erp/common/v1/approve/history/list', // 操作历史记录
    exportInvoiceApplication: '/erp/invoice/v1/report/invoice/application' // 下载开票申请单
};
// 上传
const upload = {
    imgUpload: '/erp/order/v1/delivery/deliveryUpload'
};
// 交割
const delivery = {
    getlist: '/erp/order/v1/delivery/deliveryList',
    getBuyDetail: 'erp/order/v1/delivery/searchBuyDelivery',
    getSellDetail: 'erp/order/v1/delivery/searchSellDelivery',
    createDeliveryView: 'erp/order/v1/delivery/createDeliveryView', // 交割页面
    createBuyDelivery: 'erp/order/v1/delivery/createBuyDelivery', // 交割页面确认
    createSellDelivery: 'erp/order/v1/delivery/createSellDelivery', // 交割页面确认
    detailsOfSalesDeliveryDetails: '/erp/order/v1/delivery/searchSellDeliveryItem/', // 销售交割明细详情
    detailsOfPurchaseDeliveryDetails: '/erp/order/v1/delivery/searchBuyDeliveryItem/', // 采购交割明细详情
    salesConfirmation: '/erp/order/v1/delivery/confirmSellDelivery', // 销售交割确认
    crossContract: '/erp/order/v1/delivery/searchPurchaseOrder', // 交叉采购合同
    allPageStatusCount: '/erp/order/v1/delivery/deliveryList/allPageStatusCount', // 统计状态
    deliveryContract: '/erp/order/v1/delivery/searchBuyDeliveryFile', // 交割调出合同
    uploadDeliveryFile: 'erp/order/v1/delivery/uploadDeliveryFile', // 销售交割审批上传凭证
    rejectDeliveryFile: 'erp/order/v1/delivery/uploadDeliveryFile' // 销售交割审批上传凭证
};

// workbench
const workbench = {
    getWbTodoList: 'erp/workbench/v1/todoList',
    getWbMsgList: 'erp/workbench/v1/msgList',
    countWbMsgList: 'erp/workbench/v1/warnCount'
};

// 流程定义
const apprProc = {
    getApprProcList: 'erp/flow/v1/approve/list',
    getApproveInfo: 'erp/flow/v1/approve/getInfo/',
    saveApproveInfo: 'erp/flow/v1/approve/saveInfo',
    hasBizPermission: '/erp/flow/v1/biz/opration/hasAuth', // 业务执行权限限制
    hasApproveAuth: '/erp/flow/v1/approve/hasAuth', // 审批按钮权限
    doApprove: '/erp/flow/v1/biz/opration/approve/do',
    getApprReqInfo: '/erp/flow/v1/biz/opration/getApprReqInfo'
};

// 合同执行分配
const contractEssence = {
    essenceList: '/erp/essence/v1/contract/list',
    updateEssence: '/erp/essence/v1/contract/update',
    bizProductXrefList: '/erp/setting/v1/userbizprod/list',
    exeProductXrefList: '/erp/setting/v1/userexeprod/list',
    addbizXrefUsers: '/erp/setting/v1/userbizprod/add',
    addexeXrefUsers: '/erp/setting/v1/userexeprod/add',
    delbizXrefUsers: '/erp/setting/v1/userbizprod/delete',
    delexeXrefUsers: '/erp/setting/v1/userexeprod/delete',
    syncCached: '/erp/setting/v1/userexeprod/syncCached'
};

// 报表
const statement = {
    dailyUp: '/erp/report/v1/hft/daily/purchaseContract', // 日报上游
    deliveries: '/erp/report/v1/hft/daily/purchaseContract/deliveries', // 累计交割数量
    payments: '/erp/report/v1/hft/daily/purchaseContract/payments', // 付款列表信息
    upExcel: '/erp/report/v1/hft/daily/purchaseContract/toExcel', // 日报上游导出
    dailyDown: '/erp/report/v1/hft/daily/saleContract', // 日报下游
    control: '/erp/report/v1/managerControl/totalControl', // 管控总表
    standingBook: '/report/v1/hft/standingBookReport', // 台账报表
    orderPayTotalDetails: '/report/v1/hft/orderPayTotalDetails', // 订单明细
    standingBookReportExport: '/report/v1/hft/standingBookReport/export', // 报表导出
    deliveryNames: '/erp/report/v1/hft/daily/purchaseContract/deliveryNames', // 交割库and实际交割库
    organization: '/erp/common/v1/contract/organization/list' // 业务组
};

const organization = {
    list: '/erp/common/v1/contract/organization/list/tree'
};

export default {
    payment,
    contract,
    login,
    invoice,
    delivery,
    order,
    upload,
    workbench,
    apprProc,
    contractEssence,
    statement,
    organization
};
