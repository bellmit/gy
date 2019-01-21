
// 用户系统
const user = {
    login: '/mgmt/rating/v1/client/login',
    logout: '/mgmt/rating/v1/client/logout'
};

const approval = {
    addForm: '/mgmt/v1/ratingInfo/add', // 保存核准信息
    companyCategory: '/v1/companyCategory', // 获取大类小类
    parent: '/mgmt/v1/companyCategory/parent', // 获取大类
    child: '/mgmt/v1/companyCategory/child/', // 获取小类
    ratingTypeList: '/mgmt/ratingType/list', // 获取评级列表
    submit: '/mgmt/v1/ratingTask/save', // 获取评级列表
    newestRatingRecord: '/mgmt/v1/ratingTask/newestRatingRecord/', // 总监查看弹出框
    ratingInfo: '/mgmt/v1/ratingInfo/', // 总监查看核准信息
    searchShareholderType: '/mgmt/v1/ratingInfo/shareholderType/list', // 查询股东类型
    payTypeList: '/mgmt/v1/ratingInfo/payType/list', // 查询缴纳类型
    currencyList: '/mgmt/v1/ratingInfo/currency/list' // 查询货币列表
};

const customer = {
    ratingList: '/mgmt/v1/ratingTask/list', // 分配风控经理列表
    ratingUpdate: '/mgmt/v1/ratingTask', // 更新风控经理
    RankManagers: '/mgmt/v1/riskControlManager/list', // 获取所有风控经理
    managerList: '/mgmt/v1/ratingTaskByRole/list', // 核准与评级
    ratingTaskByChief: '/mgmt/v1/ratingTaskByChief/list', // 总监审批列表
    counterpartyList: '/mgmt/v1/counterpartyRelation/platform/list', // 申请查看交易对手评级列表
    preRecord: '/mgmt/v1/lastRatingTaskRecord/', // 上级评价
    parent: '/mgmt/v1/companyCategory/parent', // 获取大类
    Child: '/mgmt/v1/companyCategory/child/', // 获取小类
    ratingType: '/mgmt/v1/ratingType/list', // 获取评级类型及范围
    ratingManagement: '/mgmt/v1/rating/myDeclareCompanyList', // 获取评级列表
    myRating: '/mgmt/v1/rating/myRating/', // 我的评级
    appList: '/mgmt/v1/counterpartyApprovals/search', // 申请查看评级审核
    counterParties: '/mgmt/client/v1/counterparties/search', // 交易对手列表
    partiesDelete: '/mgmt/v1/counterparties/delete', // 交易对手删除
    transcationPeriods: '/mgmt/v1/transcationPeriods', // 交易周期列表查询
    transcationType: '/mgmt/v1/transcationTypes', // 交易模式查询
    getNumber: '/mgmt/v1/counterpartyApprovals/count', // 获取待审数量
    approval: '/mgmt/v1/counterpartyApprovals/approval', // 审核
    counterparties: '/mgmt/v1/counterparties', // 申请查看交易对手
    counterpartiesDetail: '/mgmt/v1/counterparties/', // 查看交易对手
    access: '/mgmt/v1/counterparties/access', // 交易对手准入
    companiesList: '/mgmt/v1/counterparties/companies', // 交易对手贸易公司列表
    addParties: '/mgmt/v1/counterparties', // 批量添加交易对手
    askByRoleCount: '/mgmt/v1/ratingTaskByRoleCount', // 获取评级审核数量
    accessToGyRating: '/mgmt/v1/counterpartyRelation/accessToGyRating', // 更改是否允放查看
    save: '/mgmt/v1/ratingTask/save', // 保存评级
    reject: '/mgmt/v1/ratingTask/reject/', // 驳回
    baseInfo: '/mgmt/v1/companies/', // 基础信息
    role: '/mgmt/rating/v1/role/user/' // 根据userID获取权限
};
// 申请评级模块
const ratingApplication = {
    areasList: '/mgmt/v1/areas/list/', // 获取全国地理位置列表
    uploadFile: '/mgmt/v1/approval/company/uploadFile', // 文件上传
    declareInfo: '/mgmt/v1/rating/declareInfo', // 申报公司类型
    enterpriseTypeList: '/mgmt/v1/rating/enterpriseTypeList', // 获取申报信息企业类型类目列表
    fileType: '/mgmt/v1/declare/company/fileType', // 申报公司文件类型模块接口
    sendratingFormData: '/mgmt/v1/approval/company', // 提交申报公司资料
    searchCompany: '/mgmt/v1/company/trade/all/', //  搜索功能查询公司资料--客户端
    updateRatingFormData: '/mgmt/v1/approval/company', // 更新申报公司资料
    ratingHistoryList: '/mgmt/v1/declare/company/history/list', // 获取评级历史列表
    getRatingFormDataMgmt: '/mgmt/v1/approval/company/info/', // 获取申报公司资料--服务端
    getHistoryRatingFormData: '/mgmt/v1/declare/company/info/',
    fileParam: '/mgmt/v1/declare/fileParam/' // 获取图片上传后的参数

};

export default {
    customer,
    user,
    approval,
    ratingApplication
};
