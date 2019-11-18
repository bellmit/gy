const category = {
    list: '/catalogue/v1/categories/search',
    commodity: '/trade/catalogue/v1/products/search', // 品名
    areaCategory: '/trade/warehouse/v1/harbours/areaCategory/', // 地区
    warehousecompany: '/trade/warehouse/v1/companies/search', // 仓储公司
    warehousesupply: '/trade/warehouse/v1/supplyOrder/page', // 仓储供应
    advertising: '/trade/warehouse/v1/companies/advertising', // 广告位
    recommendcompany: '/trade/warehouse/v1/companies/recommend', // 推荐公司
    search: '/trade/public/warehouse/v1/offers/search', // 查看仓储需求
    offers: '/trade/warehouse/v1/offers', // 添加仓储需求
    warehouseOutType: '/trade/warehouse/v1/type/4', // 仓储出库类型
    warehouseInType: '/trade/warehouse/v1/type/5' // 仓储入库类型
};

export default {
    category
};
