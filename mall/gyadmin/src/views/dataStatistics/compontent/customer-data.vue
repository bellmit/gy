<!--客户数据-->
<template>
  <gy-item :title="gyItem.title" :titleType="gyItem.titleType" :active="gyItem.active"
           :isBig="gyItem.isBig" :resetData="gyItem.resetData" :routerData="gyItem.routerData || {}">
    <div class="data-wrapper">
      <div class="data-item">
        <div class="data-item-text">{{statistics.dayNewAdded | numToCash('' ,false)}} 家</div>
        <div class="data-item-name">当日新增客户数</div>
      </div>
      <div class="data-item">
        <div class="data-item-text">{{statistics.monthNewAdded | numToCash('' ,false)}} 家</div>
        <div class="data-item-name">本月新增客户数</div>
      </div>
      <div class="data-item">
        <div class="data-item-text">{{statistics.total | numToCash('' ,false)}} 家</div>
        <div class="data-item-name">总客户数</div>
      </div>
    </div>
  </gy-item>
</template>

<script>
import gyItem from './chartsItem.vue';
export default {
    name: 'customer-data',
    data () {
        return {
            gyItem: {
                title: '客户数据',
                active: '本月',
                titleType: '',
                isBig: 'charts-item2',
                resetData: 1
            },
            statistics: {
                dayNewAdded: 0,
                monthNewAdded: 0,
                total: 0
            }
        };
    },
    created () {
    },
    mounted () {
        this.statistic();
    },
    methods: {
        // 客户数据
        statistic (e) {
            this.$http.get(this.$api.charts.statistics + '?statisticsId=1')
                .then((res) => {
                    if (res.data.code === 0) {
                        this.statistics = res.data.data;
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
