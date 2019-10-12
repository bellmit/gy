<!--
    付款明细
-->
<template>
    <table class="gy-table">
        <thead v-if="userType === 'sell'">
            <th>收款单号</th>
            <th>收款日期</th>
            <th>收款金额</th>
            <th>收款类型</th>
            <th>收款单状态</th>
            <th>操作</th>
        </thead>
        <thead v-else>
            <th>付款单号</th>
            <th>付款日期</th>
            <th>付款金额</th>
            <th>付款类型</th>
            <th>付款单状态</th>
            <th>操作</th>
        </thead>
        <tbody>
            <tr v-for="(item ,index ) in payList" :key="index">
                <td>{{item.payNumber}}</td>
                <td>{{item.payTime | date }}</td>
                <td style="text-align: right;">{{item.payTotal| numToCash}}元<span v-if="item.tradeMode === 3">（积分支付）</span></td>
                <td>
                    {{item.payMethod === 1 ? '货款':item.payMethod === 2 ? '保证金': '结算'}}
                </td>
                <td>{{payStatus[item.payStatus]}}</td>
                <td>
                    <template v-if="item.payBillType === 1 && userType !== 'sell'">
                        <router-link :to="{name: 'paymentInfo', query:{paymentId:item.id}}" class="yel gy-button-view">查看</router-link>
                    </template>
                    <template v-else-if="item.payBillType === 2 && userType !== 'sell'">
                        <router-link :to="{name: 'collectionInfo', query:{collectionId:item.colId}}" class="yel gy-button-view">查看
                        </router-link>
                    </template>
                    <template v-else-if="item.payBillType === 1 && userType === 'sell'">
                        <router-link :to="{name: 'collectionInfo', query:{collectionId:item.id}}" class="yel gy-button-view">查看
                        </router-link>
                    </template>
                    <template v-else-if="item.payBillType === 2 && userType === 'sell'">
                        <router-link :to="{name: 'paymentInfo', query:{paymentId:item.paymentId}}" class="yel gy-button-view">查看
                        </router-link>
                    </template>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    name: 'orderPayment',
    props: {
        orderMark: String,
        orderNo: String,
        userType: {
            type: String,
            default: 'sell'
        }
    },
    data () {
        return {
            payList: [],
            payStatus: {
                10: '已创建',
                20: '确认',
                30: '支付中',
                40: '已支付',
                50: '已完成',
                60: '已作废'
            },
            sellOrbuy: ''
        };
    },
    watch: {
        orderNo (newValue, oldValue) {
            newValue && this.getData();
        }
    },
    created () {
        this.orderNo && this.getData();// 收款单明细
    },
    methods: {
        getData () {
            // let url = this.
            // === 'sell' ? this.$api.payment.collectionList : this.$api.payment.paymentList;
            let url = this.userType === 'sell' ? this.$api.payment.listCollOfSeller : this.$api.payment.listOfBuyer;
            this.sellOrbuy = url;
            this.$http.post(url, {
                orderNumber: this.orderNo,
                orderType: 1
            }).then(res => {
                if (res.data.code === 0) {
                    this.payList = res.data.data;
                    console.log(this.payList);
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
    table tr:first-child{
        text-align: center;
    }
</style>
