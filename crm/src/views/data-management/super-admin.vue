<!--国烨管理员 role = 2 -->
<template>
    <div class="super-admin">
        <div class="charts-row">
            <customer-data :gyItem="gyItem"></customer-data>
            <follow-up-certification></follow-up-certification>
        </div>
        <div class="charts-row">
            <order-number></order-number>
            <a-turnover></a-turnover>
        </div>
        <div class="charts-row">
            <trading-rank-buyer></trading-rank-buyer>
            <trading-rank-seller></trading-rank-seller>
        </div>
        <div class="charts-row charts-row1">
            <customer-location></customer-location>
        </div>
        <div class="charts-row">
            <customer-type></customer-type>
            <trading-category></trading-category>
        </div>
    </div>
</template>

<script>
import customerData from './customer-data.vue'; // 客户数据
import followUpCertification from './follow-up-certification.vue'; // 客户认证
import orderNumber from './order-number.vue'; // 订单数
import aTurnover from './a-turnover.vue'; // 交易额
import tradingRankBuyer from './trading-rank-buyer.vue'; // 客户交易排行TOP5(买家)
import tradingRankSeller from './trading-rank-seller.vue'; // 客户交易排行TOP5(卖家)
import customerLocation from './customer-location.vue'; // 客户所在地概览
import customerType from './customer-type.vue'; // 客户类型
import tradingCategory from './trading-category.vue'; // 交易品类

export default {
    name: 'super-admin',
    props: {
        gyItem: Object
    },
    methods: {
    },
    components: {
        customerData,
        orderNumber,
        aTurnover,
        tradingRankBuyer,
        tradingRankSeller,
        customerLocation,
        customerType,
        tradingCategory,
        followUpCertification
    }
};
</script>

<style lang="scss" scoped>
</style>
