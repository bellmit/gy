<!--
    付款明细
-->

<template>
    <table class="gy-table">
      <thead>
        <tr class="title">
            <td>资金单号</td>
            <td>付款类型</td>
            <td>付款单状态</td>
            <td>付款日期</td>
            <td>付款金额</td>
            <td>收款日期</td>
            <!--<td>操作</td>-->
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item ,index ) in payList" :key="index">
            <td>{{item.payNumber}}</td>
            <td>
                {{type[item.payMethod]}}
            </td>
            <td>{{payStatus[item.payStatus]}}</td>
            <td>{{item.payTime | date }}</td>
            <td>{{item.payTotal | numToCash }}元</td>
            <td>{{item.confirmDate | date }}</td>
            <!--<td>-->
                <!--<router-link :to="{name: 'collectionInfo', query:{collectionId:item.id}}" class="gy-button-view">查看</router-link>-->
            <!--</td>-->
        </tr>
      </tbody>
    </table>
</template>

<script>
export default {
    name: 'orderPayment',
    props: {
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
            type: [ '', '货款', '保证金', '保证金', '结算', '运费' ]
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
            this.$http.post(this.$api.payment.payList, {
                orderNumber: this.orderNo
            }).then(res => {
                if (res.data.code === 0) {
                    this.payList = res.data.data;
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
</style>
