<!--交易总览-->
<template>
  <gy-item :title="gyItem.title" :titleType="gyItem.titleType" :active="gyItem.active"
           :isBig="gyItem.isBig" :resetData="gyItem.resetData" :routerData="gyItem.routerData || {}">
    <div class="data-wrapper" style="display: block;position: relative;">
      <div class="data-item data-item1 data-item1-left">
        <div class="data-item-text">{{statistics.totalSettlement | numToCash}} 万元</div>
        <div class="data-item-name">交易额</div>
      </div>
      <div class="data-item data-item1 data-item1-right">
        <div class="data-item-text">{{statistics.orderCount | numToCash('' ,false)}} 单</div>
        <div class="data-item-name">订单数</div>
      </div>
    </div>
  </gy-item>
</template>

<script>
import gyItem from './chartsItem.vue';
export default {
    name: 'transaction-overview',
    data () {
        return {
            gyItem: {
                title: '交易总览',
                active: '当日',
                titleType: 'date',
                isBig: 'charts-item2',
                resetData: 1
            },
            statistics: {
                orderCount: 0,
                totalSettlement: 0
            }
        };
    },
    created () {
    },
    mounted () {
        this.statistic(1);
    },
    methods: {
        // 交易总览
        statistic (t) {
            this.$http.get(this.$api.charts.statistics + '?statisticsId=16&countType=' + t)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.statistics = res.data.data;
                        this.statistics.totalSettlement = ((this.statistics.totalSettlement) / 10000).toFixed(2);
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        resetList (e, t) {
            this.gyItem.active = this.$constant.dateType[t];
            this.statistic(t);
        }
    },
    provide () {
        return {
            resetList: this.resetList
        };
    },
    components: {gyItem}
};
</script>

<style scoped>

</style>
