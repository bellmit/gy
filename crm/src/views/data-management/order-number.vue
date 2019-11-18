<!--订单数-->
<template>
    <gy-item :title="gyItem.title" :titleType="gyItem.titleType" :active="gyItem.active"
             :isBig="gyItem.isBig" :resetData="gyItem.resetData">
        <div v-if="statistics1 && statistics1.length > 0" id="myChart1" :style="{width: '100%', height: '100%'}"></div>
        <p v-else class="zwsj"><span>暂无数据</span></p>
    </gy-item>
</template>

<script>
import gyItem from './chartsItem.vue';
import {mapGetters} from 'vuex';
import store from '@/store';
export default {
    name: 'order-number',
    data () {
        return {
            gyItem: {
                title: '订单数',
                active: '总体',
                titleType: null,
                isBig: 'charts-item2',
                resetData: 3
            },
            statistics1: null,
            userCompanyId: null
        };
    },
    computed: mapGetters([
        'companyId'
    ]),
    watch: {
        companyId (newValue, oldValue) {
            this.statistic1();
        }
    },
    mounted () {
        this.statistic1();
    },
    methods: {
        // 订单数 // 交易额
        statistic1 () {
            this.userCompanyId = store.state.mutations.companyId;
            this.$http.get(this.$api.charts.statistics + '?statisticsId=8' + (this.userCompanyId ? '&userCompanyId=' + this.userCompanyId : ''))
                .then((res) => {
                    if (res.data.code === 0) {
                        this.statistics1 = res.data.data;
                        if (this.statistics1.length !== 0) {
                            Promise.resolve().then(() => {
                                this.drawLine();
                            });
                        }
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        drawLine () {
            let xAxisData = [];
            let seriesData = [];
            this.statistics1.forEach((e) => {
                xAxisData.push(e.statisMonth.toString().substr(-2, 2));
                seriesData.push(e.orderCount);
            });
            let myChart = this.$echarts.init(document.getElementById('myChart1'));
            myChart.setOption({
                tooltip: {
                    show: true,
                    formatter: '{c}'
                },
                grid: {
                    top: 50,
                    right: 65,
                    bottom: 50,
                    left: 45
                },
                xAxis: {
                    name: '单位: 月',
                    type: 'category',
                    data: xAxisData,
                    axisLine: {
                        lineStyle: {
                            color: '#666'
                        }
                    },
                    axisLabel: {
                        color: '#666'
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    }
                },
                yAxis: {
                    name: '数量',
                    nameTextStyle: {
                        color: '#333'
                    },
                    type: 'value',
                    minInterval: 1,
                    splitLine: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#666'
                        }
                    },
                    axisTick: {
                        inside: true
                    },
                    axisLabel: {
                        color: '#666'
                    }
                },
                series: [{
                    data: seriesData,
                    type: 'bar',
                    barWidth: 20,
                    itemStyle: {
                        color: '#4a90e2'
                    }
                }]
            });
        }
    },
    components: {gyItem}
};
</script>

<style scoped>

</style>
