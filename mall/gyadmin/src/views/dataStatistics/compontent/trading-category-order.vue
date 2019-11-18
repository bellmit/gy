<!--交易品类(订单数)-->
<template>
  <gy-item :title="gyItem.title" :titleType="gyItem.titleType" :active="gyItem.active"
           :isBig="gyItem.isBig" :resetData="gyItem.resetData" id="gyTradingOrder">
    <div class="item-content-item" v-show="Statistic && Statistic.length > 0" id="myChart3" style="width: 480px;height: 208px;"></div>
    <p v-show="Statistic && Statistic.length === 0" class="zwsj item-content-item"><span>暂无数据</span></p>
  </gy-item>
</template>

<script>
import gyItem from './chartsItem.vue';
export default {
    name: 'trading-category-order',
    data () {
        return {
            gyItem: {
                title: '交易品类(订单数)',
                active: '当日',
                titleType: 'date',
                isBig: 'charts-item2',
                resetData: 4
            },
            Statistic: []
        };
    },
    mounted () {
        this.statistic2(1);
    },
    methods: {
        // 交易品类(订单数)
        statistic2 (t) {
            this.$http.get(this.$api.charts.statistics + '?statisticsId=17&countType=' + t)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.Statistic = res.data.data;
                        if (this.Statistic.length !== 0) {
                            this.drawPie1();
                        }
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        drawPie1 () {
            let lenged = [];
            for (let idx of this.Statistic.keys()) {
                let item = {};
                item.name = this.Statistic[idx].productName.replace(/\s+/g, '');
                item.value = (this.Statistic[idx].ratio * 100).toFixed(2);
                item.total = this.Statistic[idx].total;
                item.itemStyle = {color: this.$constant.chartsColor[idx]};
                lenged.push(item);
            }
            // document.getElementById('myChart3').style.width = document.getElementById('gyTradingOrder').offsetWidth - 2 + 'px';
            let myChart = this.$echarts.init(document.getElementById('myChart3'));
            myChart.setOption({
                tooltip: {
                    formatter: (item) => {
                        return item.marker + item.data.name + ' ' + this.$tools.numToCash(item.data.total, false) + ' 单';
                    }
                },
                legend: {
                    orient: 'vertical',
                    right: '10%',
                    top: 30,
                    textStyle: {
                        color: '#666'
                    },
                    data: lenged,
                    formatter: (name) => {
                        let title;
                        lenged.forEach((e) => {
                            if (e.name === name) {
                                title = e.name + ' ' + e.value + '%';
                            }
                        });
                        return title;
                    }
                },
                series: [
                    {
                        name: '',
                        type: 'pie',
                        radius: '70%',
                        center: ['30%', '50%'],
                        // silent: true,
                        minAngle: 5,
                        data: lenged,
                        label: {
                            normal: {
                                show: false
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        }
                    }
                ]
            });
        },
        resetList (e, t) {
            this.gyItem.active = this.$constant.dateType[t];
            this.statistic2(t);
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
