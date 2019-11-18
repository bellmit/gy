<!--贸易公司 role = 1 -->
<template>
<div>
    <div class="charts-row">
        <customer-data :gyItem="gyItem"></customer-data>
        <customer-source></customer-source>
    </div>
    <div class="charts-row">
        <order-number></order-number>
        <a-turnover></a-turnover>
    </div>
    <div class="charts-row">
        <trading-rank-buyer></trading-rank-buyer>
        <trading-rank-seller></trading-rank-seller>
    </div>
    <div class="charts-row">
        <customer-type></customer-type>
        <trading-category></trading-category>
    </div>
</div>
</template>

<script>
import customerData from './customer-data.vue'; // 客户数据
import customerSource from './customer-source.vue'; // 客户来源
import orderNumber from './order-number.vue'; // 订单数
import aTurnover from './a-turnover.vue'; // 交易额
import tradingRankBuyer from './trading-rank-buyer.vue'; // 客户交易排行TOP5(买家)
import tradingRankSeller from './trading-rank-seller.vue'; // 客户交易排行TOP5(卖家)
import customerType from './customer-type.vue'; // 客户类型
import tradingCategory from './trading-category.vue'; // 交易品类
export default {
    name: 'trading-company',
    props: {
        gyItem: Object
    },
    components: {
        customerData,
        customerSource,
        orderNumber,
        aTurnover,
        tradingRankBuyer,
        tradingRankSeller,
        customerType,
        tradingCategory
    }
};
</script>

<style scoped>

</style>
