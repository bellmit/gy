<!--
    订单物流明细
-->

<template>
    <table class="gy-table">
        <thead>
            <th>运输单号</th>
            <th>订单时间</th>
            <th>承运商</th>
            <th>品名</th>
            <th>数量</th>
            <th>装货地</th>
            <th>卸货地</th>
            <th>状态</th>
            <th>操作</th>
        </thead>
        <tbody v-for="(item,index) in logisticData" :key="index">
        <tr v-for="(tran,index) in item.consignmentNoteItemList" :key="index">
            <td>{{item.consignmentNoteCode }}</td>
            <td>{{item.createdDate | date}}</td>
            <td>{{item.carrierName}}</td>
            <td>{{tran.skuName}}</td>
            <td>{{tran.skuQuantity |numToCash(3)}}</td>
            <td>{{item.loadingWarehouseAddress }}</td>
            <td>{{item.unloadingWarehouseAddress }}</td>
            <td>{{item.consignmentNoteStatus }}</td>
            <td>
                <button @click="goManage(item)" class="gy-button-view">查看调度</button>
            </td>
        </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    name: 'orderLogitic',
    props: {
        orderId: [Number, String],
        userType: {
            type: String,
            default: 'sell'
        }
    },
    data () {
        return {
            logisticData: []
        };
    },
    created () {
        this.getData();
    },
    methods: {
        getData () {
            this.$http.post(this.$api.transport.orderList, {
                data: {
                    id: this.orderId,
                    valid: 1
                }
            }).then(res => {
                if (res.data.code === 0) {
                    this.logisticData = res.data.data.list || [];
                } else {
                    this.logisticData = [];
                }
            });
        },
        goManage (data) {
            this.$router.push({name: 'transportDispatchDetail', query: {dispatchCode: data.id}});
        }
    }
};
</script>

<style lang="scss" scoped>

</style>
