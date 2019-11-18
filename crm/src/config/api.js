// 支付业务
const login = {
    login: '/crm/v1/login',
    logout: '/crm/v1/logout'
};

// 客户管理
const client = {
    list: '/crm/v1/customers/list', // 获取客户列表
    template: '/crm/v1/customers/template/download', // 客户导入模板下载
    addCustomers: '/crm/v1/customers', // 新增客户并返回客户ID post
    updateCustomers: '/crm/v1/customers', // 更新客户信息 put
    searchCustomers: '/crm/v1/customers/', // 获取客户信息 get
    trackStatus: '/crm/v1/dictionaries/track_status', // 客户状态
    companyType: '/crm/v1/dictionaries/company_type', // 企业类型
    companyAttr: '/crm/v1/dictionaries/company_attr', // 企业属性
    customerScale: '/crm/v1/dictionaries/customer_scale', // 企业规模
    personScale: '/crm/v1/dictionaries/person_scale', // 人员规模
    customerSource: '/crm/v1/dictionaries/referrer_type', // 来源
    searchArea: '/crm/v1/areas/list/', // 根据区域id查询省市区信息
    uploadFile: '/import', // 三证上传
    operation: '/crm/v1/user/operation', // 客户经理
    operations: '/crm/v1/user/operations/all', // 客户列表-客户经理
    delete: '/crm/v1/customers', // 删除
    changeManager: '/crm/v1/customerFollowup/changeManager', // 更换客户经理
    import: '/crm/v1/customers/import', // 客户导入
    fieldList: '/crm/v1/users/defined/field/list', // 自定义列表
    configur: '/crm/v1/users/defined/field/configure', // 保存自定义列表
    field: '/crm/v1/users/defined/field', // 获取表头
    custom: '/crm/v1/customers/list', // 动态表格
    addContact: '/crm/v1/customerContact', // 新增联系人
    getContact: 'crm/v1/customerContact/getByCustomerId/', // 获取联系人
    deleteContact: '/crm/v1/customerContact/', // 删除联系人
    editorContact: '/crm/v1/customerContact', // 编辑联系人
    matchmaking: '/crm/companies/matchmaking', // 根据公司名称获取撮合公司列表
    customerName: '/crm/v1/customers/exist/' // 查看公司是否存在
};

// 客户追踪Customer Track Controller
const customer = {
    addcustomer: '/crm/v1/customer/track', // 添加客户跟进
    customersearch: '/crm/v1/customer/track/search', // 搜素跟进信息
    customerdelete: '/crm/v1/customer/track/delete', // 删除跟进信息
    ccustomerIddelete: '/crm/v1/customer/track/delete/customerId', // 删除公司跟进
    amendcustomer: '/crm/v1/customer/track/', // 编辑客户跟进
    customerList: '/crm/v1/customers/info', // 获取客户信息
    customerSearchList: '/crm/v1/customers/info', // 搜索公司
    dictionaryController: '/crm/v1/dictionaries/', // 获取跟进状态
    customerFrom: '/crm/v1/customers/extra/fields/customer_from', // 获取客户来源
    floorOrganizations: '/crm/v1/organization/customer/floorOrganizations', // 获取跟进组
    floorOrganization: '/crm/v1/organization/floorOrganizations', // 报表获取跟进组
    customermanager: 'crm/v1/user/operation', // 获取客户经理
    export: '/crm/v1/customers/export', // 导出
    provinceCode: '/crm/v1/areas/regions/'
};

// 消息盒子
const msg = {
    getList: '/crm/v1/messages/list',
    getListWorkbench: '/crm/v1/messages/list_for_workbench',
    readMsg: '/crm/v1/messages/update_read'
};

// 工作台
const workbench = {
    getStatistics: '/crm/v1/customer/workbench/statistics',
    recommendlist: '/crm/v1/customers/recommend_list'
};

// 统计报表
const charts = {
    statistics: '/crm/v1/statistics',
    getCompany: '/crm/companies?companyName='
};

// 权限管理
const role = {
    // 角色列表
    roleList: '/crm/v1/companyRole/role/list', // 角色查询列表
    treeList: '/crm/v1/menus/common/list', // 新增授权树查询列表
    roleAdd: '/crm/v1/companyRole/role', // 新增公司角色
    roleQuery: '/crm/v2/roles', // 查看角色详情
    roleDelete: '/crm/v1/companyRole/role/valid', // 批量删除公司角色
    roleEdit: '/crm/v1/companyRole/role', //  修改公司角色
    // 组织架构
    organAdd: '/crm/v1/company/organization', // 插入组织架构
    organList: '/crm/v1/company/organization/listTree', // 组织架构树
    departmentList: '/crm/v2/employee/list', // 获取部门下员工
    addDepartment: '/crm/v1/company/organization', // 修改组织架构信息
    deleteDepartment: '/crm/v1/company/organization/valid', // 删除组织架构信息
    companyPersonAll: '/crm/v1/employees/organization/all', // 查询公司所有员工
    doAddPerson: '/crm/v2/employees/batch', // 添加人员
    deletePerson: '/crm/v2/employees/batch/valid', // 批量移除员工
    // 员工帐号管理
    accoutList: '/crm/v1/employees/list', // 员工列表
    getRoleList: '/crm/v1/companyRole/role/all', // 授权角色列表
    authsBtn: '/crm/v1/companyRole/role/auths', // 公司角色授权给员工 确认按钮
    // 自定义字段管理
    obtainfields: '/crm/v1/customers/extra/fields', // 获取客户扩展字段
    fieldsPage: '/crm/v1/customers/extra/fields/page' // 获取扩展字段分页列表
};

// 组织架构
const organizational = {
    organizationalList: '/crm/v1/company/organization/listTree',
    departmentList: '/crm/v2/employee/list',
    companyPersonAll: '/crm/v1/employees/organization/all/',
    addDepartment: '/crm/v1/company/organization',
    deleteDepartment: '/crm/v2/company/organization/valid',
    deletePerson: '/crm/v4/employee/valid',
    doAddPerson: '/crm/v2/employees/batch',
    getManagerList: '/crm/v1/company/position/list',
    addManager: '/crm/v1/company/position',
    deleteManager: '/crm/v1/company/position/valid',
    getManagerDetail: '/crm/v1/company/position/detail/',
    addStaff: '/crm/v1/organization/employee',
    editStaff: '/crm/v3/employee',
    testStaffNum: '/crm/v1/organization/employee/isExits',
    employeeList: '/crm/v3/employee/list',
    getStatus: '/crm/v3/employee/status',
    testPhone: '/crm/v3/employee/isExits',
    directSuperior: '/crm/v3/employee/manager'
};

export default {
    login,
    customer,
    client,
    role,
    msg,
    workbench,
    charts,
    organizational
};
