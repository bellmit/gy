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
    viewContract: '/consignmentContracts',
    bannerImg: '/trade/logistics/v1/advertising', // 获取物流banner
    notLoginSearch: '/trade/logistics/v1/enquiryNotes/notLoginSearch', // 获取实时物流需求
    messageSearch: '/trade/logistics/v1/dispatchNotes/notLoginSearch', // 获取实时运单信息
    warehouse: '/trade/logistics/v1/companies/recommend' // 推荐物流公司
};

const account = {
    company_rel_xref: '/trade/account/v1/companies/xrefList',
    userInfo: '/trade/v1/users',
    area: '/trade/v1/areas/list',
    newArea: '/trade/base/v1/region/parent',
    companyList: '/trade/v1/users/companies/all',
    upload: '/trade/v1/companies/uploadFile',
    auth: '/trade/v1/companies/auth',
    companyInfo: '/trade/v1/companies',
    companyDelete: '/trade/v1/users/delete/company',
    companyCa: '/trade/v1/companies/ca/auth',
    companyBank: '/trade/v1/companies/bank/auth',
    addressLib: '/trade/logistics/v1/warehouse/address?keywords='
};

const global = {
    product: '/trade/catalogue/v1/goods?keywords=',
    moneyUnit: '/trade/base/v1/currencies',
    weightUnit: '/trade/base/v1/measures/search',
    companyType: '/trade/v1/companyTypes/all'
};

export default {
    account,
    transport,
    global
};
