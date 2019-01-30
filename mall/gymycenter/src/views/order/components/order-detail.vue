<template>
    <div>
        <table>
            <tr>
                <td>商品名称</td>
                <td>单价</td>
                <td>数量</td>
                <td>交货期</td>
                <td>交割地</td>
                <td>总额</td>
            </tr>
            <tr v-for="(item, index) in orderItemData" :key="index">
                <td>{{item.skuName}}</td>
                <td>{{item.skuPrice|numToCash}}元/{{item.infUnitOfMeasureDisplayName}}</td>
                <td>{{item.skuQuantity|numToCash(3)}}{{item.infUnitOfMeasureDisplayName}}</td>
                <td v-if="item.deliveryDateFlag === 3">{{item.deliveryDateText}}</td>
                <td v-else-if="item.deliveryDateFlag === 2" >{{item.deliveryBeginDate|date}}以前</td>
                <td v-else>{{item.deliveryBeginDate|date}}到{{item.deliveryEndDate|date}}</td>
                <td>{{item.deliveryWarehouseName}}</td>
                <td>{{item.skuTotalAmount |numToCash}}元</td>
            </tr>
        </table>
        <div class="total-detail">
            <dl>
                <dt>货款总额:</dt>
                <dd>{{orderData.skuTotalAmount}}元</dd>
            </dl>
            <dl>
                <dt>保证金总额:</dt>
                <dd>{{orderData.depositAmount |numToCash}}元</dd>
            </dl>
            <hr/>
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
    table tr.update-title {
        background: red;
    }
    table tr{
        text-align: center;
    }
</style>
