<!--贸易公司 业务员 role = 3 -->
<template>
    <div>
        <div class="charts-row">
            <customer-data :gyItem="gyItem"></customer-data>
            <follow-up-state></follow-up-state>
        </div>
        <div class="charts-row">
            <order-number></order-number>
            <a-turnover></a-turnover>
        </div>
        <div class="charts-row">
            <customer-type></customer-type>
            <trading-category></trading-category>
        </div>
    </div>
</template>

<script>
import customerData from './customer-data.vue'; // 客户数据
import followUpState from './follow-up-state.vue'; // 跟进状态
import orderNumber from './order-number.vue'; // 订单数
import aTurnover from './a-turnover.vue'; // 交易额
import customerType from './customer-type.vue'; // 客户类型
import tradingCategory from './trading-category.vue'; // 交易品类
export default {
    name: 'salesman',
    props: {
        gyItem: Object
    },
    components: {
        customerData,
        orderNumber,
        aTurnover,
        customerType,
        tradingCategory,
        followUpState
    }
};
</script>

<style scoped>

</style>
