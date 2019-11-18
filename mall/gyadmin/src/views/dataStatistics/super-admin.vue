<!---->
<template>
    <div class="super-admin">
        <div class="charts-row">
            <customer-data></customer-data>
            <transaction-overview></transaction-overview>
        </div>
        <div class="charts-row">
            <order-number></order-number>
            <a-turnover></a-turnover>
        </div>
        <div class="charts-row">
            <translational-data></translational-data>
        </div>
        <div class="charts-row">
            <trading-category-order></trading-category-order>
            <trading-category-money></trading-category-money>
        </div>
        <div class="charts-row">
            <customer-type-order></customer-type-order>
            <customer-type-money></customer-type-money>
        </div>
        <div class="charts-row charts-row1">
            <customer-location></customer-location>
        </div>
    </div>
</template>

<script>
import customerData from './compontent/customer-data.vue'; // 客户数据
import transactionOverview from './compontent/transaction-overview.vue'; // 交易总览
import orderNumber from './compontent/order-number.vue'; // 订单数
import aTurnover from './compontent/a-turnover.vue'; // 交易额
import tradingCategoryOrder from './compontent/trading-category-order.vue'; // 交易品类(订单数)
import tradingCategoryMoney from './compontent/trading-category-money.vue'; // 交易品类(交易额)
import customerTypeOrder from './compontent/customer-type-order.vue'; // 客户类型(订单数)
import customerTypeMoney from './compontent/customer-type-money.vue'; // 客户类型(交易额)
import customerLocation from './compontent/customer-location.vue'; // 客户所在地概览
import translationalData from './compontent/translational-data.vue'; // 客户所在地概览

export default {
    name: 'super-admin',
    props: {
        gyItem: Object
    },
    methods: {
    },
    components: {
        customerData,
        transactionOverview,
        orderNumber,
        aTurnover,
        tradingCategoryMoney,
        tradingCategoryOrder,
        customerTypeOrder,
        customerTypeMoney,
        customerLocation,
        translationalData
    }
};
</script>

<style lang="scss" scoped>
  @font-face {
    font-family: 'impact';
    src: url('https://pic.chinayie.com/cdn/Impact.ttf') format('truetype');
  }
  /deep/ .data-wrapper {
    display: flex;
    height: 100%;
    .data-item {
      flex: 0 0 120px;
      height: 120px;
      margin: 40px auto;
      padding: 30px 0 40px 0;
      border-radius: 50%;
      border: 2px solid $color-border;
      text-align: center;
      .data-item-text {
        font-family: 'impact';
        font-size: 18px;
        color: #e0370f;
      }
    }
    .data-item1 {
      /*flex: 0 0 180px;*/
      width: 130px;
      height: 130px;
      position: absolute;
      top: 35px;
      margin: 0;
      padding: 35px 0 40px 0;
    }
    .data-item1-left {
      left: calc((100% - 260px)/3);
    }
    .data-item1-right {
      right: calc((100% - 260px)/3);
    }
  }
</style>
