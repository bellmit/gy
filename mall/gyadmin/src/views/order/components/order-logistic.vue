<!--
    订单物流明细
-->

<template>
    <table class="gy-table">
      <thead>
        <tr class="title">
            <td>运输单号</td>
            <td>创建时间</td>
            <td>承运商</td>
            <td>品名</td>
            <td>数量</td>
            <td>装货地</td>
            <td>卸货地</td>
            <td>状态</td>
            <!--<td>操作</td>-->
        </tr>
      </thead>
      <tbody  v-for="(item,index) in logisticData" :key="index">
          <tr v-for="(tran,index) in item.consignmentNoteItemList" :key="index">
              <td>{{item.consignmentNoteCode }}</td>
              <td>{{item.createdDate | date}}</td>
              <td>{{item.carrierName}}</td>
              <td>{{tran.skuName}}</td>
              <td>{{tran.skuQuantity |numToCash(3)}}</td>
              <td>{{item.loadingWarehouseAddress }}</td>
              <td>{{item.unloadingWarehouseAddress }}</td>
              <td>{{status[item.consignmentNoteStatus ]}}</td>
              <!--id-->
              <!--<td>-->
                  <!--<a @click="goManage(item)" class="gy-button-view">查看</a>-->
              <!--</td>-->
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
            logisticData: [],
            status: ['待承运方签约', '待托运方签约', '签约失败', '合同执行', '合同待结算', '合同待确认', '结算被驳回', '待支付', '已完成']
        };
    },
    created () {
        this.getData();
    },
    methods: { // 需后台王鹏飞改
        getData () {
            this.$http.post(this.$api.orders.orderList, {
                data: {
                    odrOrderId: this.orderId,
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
