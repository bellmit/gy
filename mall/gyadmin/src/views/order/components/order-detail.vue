<!--
    订单明细
-->

<template>
    <div>
        <table class="gy-table">
          <thead>
            <tr class="title">
                <td>商品名称</td>
                <td>参数</td>
                <td>交货期</td>
                <td>交割地</td>
                <td>单价</td>
                <td>数量</td>
                <td>总额</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in orderItemData" :key="index">
                <td>{{item.skuName}}<br>{{orderData.skuOrigin}}</td>
                <td>{{orderData.qualityStandard}}<br>
                    <template v-if="orderData.packagingStandard==0">
                    散水
                    </template>
                    <template v-else-if="orderData.packagingStandard==1">
                    桶装货
                    </template>
                    <template v-else-if="orderData.packagingStandard==2">
                    袋装货
                    </template>
                </td>
              <td v-if="item.deliveryDateFlag === 3">{{item.deliveryDateText}}</td>
              <td v-else-if="item.deliveryDateFlag === 2" >{{item.deliveryBeginDate|date}}以前</td>
              <td v-else>{{item.deliveryBeginDate|date}}到{{item.deliveryEndDate|date}}</td>
                <td>{{item.deliveryWarehouseName}}</td>
                <td class="align-r">{{item.skuPrice|numToCash}}元/{{item.infUnitOfMeasureDisplayName}}</td>
                <td class="align-r">{{item.skuQuantity|numToCash(3)}}{{item.infUnitOfMeasureDisplayName}}</td>
                <td class="align-r">{{item.skuTotalAmount|numToCash}}元</td>
            </tr>
          </tbody>
        </table>
        <div class="total-detail">
            <dl>
                <dt>货款总额:</dt>
                <dd>{{orderData.totalAmount-orderData.depositAmount|| 0 | numToCash}}元</dd>
            </dl>
            <dl style="border-bottom: 1px solid #e6eaea">
                <dt>保证金总额:</dt>
                <dd>{{orderData.depositAmount |numToCash}}元</dd>
            </dl>
            <dl>
                <dt>总额:</dt>
                <dd>{{orderData.totalAmount |numToCash}}元</dd>
            </dl>
        </div>
    </div>
</template>

<script>
export default {
    name: 'orderDetail',
    props: {
        orderData: Object,
        orderItemData: Array
    }
};
</script>

<style lang="scss" scoped>
    .order .tabs table tr:first-child td{
        background-color:#D4D4D4;
        text-align: left;
    }
    .total-detail{
      dl{
        dd{
          min-width:120px;
          text-align: right;
        }
      }
    }
</style>
