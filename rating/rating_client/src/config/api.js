
// 用户系统
const user = {
    login: '/client/rating/v1/client/login',
    logout: '/client/rating/v1/client/logout'
};

const approval = {
    addForm: '/client/v1/ratingInfo/add', // 保存核准信息
    companyCategory: '/client/v1/companyCategory', // 获取大类小类
    parent: '/client/v1/companyCategory/parent', // 获取大类
    child: '/client/v1/companyCategory/child/', // 获取小类
    ratingTypeList: '/client/ratingType/list', // 获取评级列表
    submit: '/client/v1/ratingTask/save', // 获取评级列表
    newestRatingRecord: '/client/v1/ratingTask/newestRatingRecord/', // 总监查看弹出框
    ratingInfo: '/client/v1/ratingInfo/' // 总监查看核准信息
};

const customer = {
    counterpartyList: '/client/v1/counterpartyRelation/platform/list', // 申请查看交易对手评级列表
    preRecord: '/client/v1/lastRatingTaskRecord/', // 上级评价
    parent: '/client/v1/companyCategory/parent', // 获取大类
    Child: '/client/v1/companyCategory/child/', // 获取小类
    ratingType: '/client/v1/ratingType/list', // 获取评级类型及范围
    ratingManagement: '/client/v1/rating/myDeclareCompanyList', // 获取评级列表
    myRating: '/client/v1/rating/myRating/', // 我的评级
    appList: '/client/v1/counterpartyApprovals/search', // 申请查看评级审核
    counterParties: 'client/v1/counterparties/search', // 交易对手列表
    partiesDelete: '/client/v1/counterparties/delete', // 交易对手删除
    transcationPeriods: '/client/v1/transcationPeriods', // 交易周期列表查询
    transcationType: '/client/v1/transcationTypes', // 交易模式查询
    getNumber: '/client/v1/counterpartyApprovals/count', // 获取待审数量
    approval: '/client/v1/counterpartyApprovals/approval', // 审核
    counterparties: '/client/v1/counterparties', // 申请查看交易对手
    counterpartiesDetail: '/client/v1/counterparties/', // 查看交易对手
    access: '/client/v1/counterparties/access', // 交易对手准入
    companiesList: '/client/v1/counterparties/companies', // 交易对手贸易公司列表
    addParties: '/client/v1/counterparties', // 批量添加交易对手
    accessToGyRating: '/client/v1/counterpartyRelation/accessToGyRating', // 更改是否允放查看
    baseInfo: '/client/v1/companies/', // 基础信息
    askByRoleCount: '/client/v1/ratingTaskByRoleCount', // 获取评级审核数量
    save: '/client/v1/ratingTask/save', // 保存评级
    myRatingInfo: '/client/v1/rating/myRating/', // 保存评级
    reject: '/client/v1/ratingTask/reject/', // 驳回
    historyRating: '/client/v1/rating/historyRating'
};
// 申请评级模块
const ratingApplication = {
    areasList: '/client/v1/areas/list/', // 获取全国地理位置列表
    uploadFile: '/client/v1/declare/company/uploadFile', // 文件上传
    declareInfo: '/client/v1/rating/declareInfo', // 申报公司类型
    enterpriseTypeList: '/client/v1/rating/enterpriseTypeList', // 获取申报信息企业类型类目列表
    fileType: '/client/v1/declare/company/fileType', // 申报公司文件类型模块接口
    sendratingFormData: '/client/v1/declare/company', // 提交申报公司资料
    getClientRatingFormData: '/client/v1/declare/company/info/', // 获取申报公司资料--客户端
    getMgmtRatingFormDataMgmt: '/client/v1/approval/company/info/', // 获取申报公司资料--服务端
    searchCompany: '/client/v1/company/trade/all/', //  搜索功能查询公司资料--客户端
    updateRatingFormData: '/client/v1/declare/company', // 更新申报公司资料
    getRatingFormDataMgmt: '/client/v1/declare/company/info/', // 获取申报公司资料--服务端
    fileParam: '/client/v1/declare/fileParam/', // 获取图片上传后的参数
    getCompanyInfo: '/client/v1/company/getCompany'
};

export default {
    customer,
    user,
    approval,
    ratingApplication
};
