<template>
    <div>
        <table class="gy-table">
            <thead>
                <th>商品名称</th>
                <th>单价</th>
                <th>数量</th>
                <th>交货期</th>
                <th>交割地</th>
                <th>总额</th>
            </thead>
            <tbody>
                <tr v-for="(item, index) in orderItemData" :key="index">
                    <td>{{item.skuName}}</td>
                    <td class="align-r">{{item.skuPrice|numToCash}}元/{{item.infUnitOfMeasureDisplayName}}</td>
                    <td class="align-r">{{item.skuQuantity|numToCash(3)}}{{item.infUnitOfMeasureDisplayName}}</td>
                    <td v-if="item.deliveryDateFlag === 3">{{item.deliveryDateText}}</td>
                    <td v-else-if="item.deliveryDateFlag === 2" >{{item.deliveryBeginDate|date}}以前</td>
                    <td v-else>{{item.deliveryBeginDate|date}}至{{item.deliveryEndDate|date}}</td>
                    <td>{{item.deliveryWarehouseName}}</td>
                    <td class="align-r">{{item.skuTotalAmount |numToCash}}元</td>
                </tr>
            </tbody>
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
    .align-r{
        text-align: right;
        padding-right: 5px;
    }
</style>
