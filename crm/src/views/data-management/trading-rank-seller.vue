<!--客户交易排行TOP5(卖家)-->
<template>
    <gy-item :title="gyItem.title" :titleType="gyItem.titleType" :active="gyItem.active"
             :isBig="gyItem.isBig" :resetData="gyItem.resetData">
        <div v-if="statistics22 && statistics22.length > 0" class="company-chart" id="myChart10" :style="{width: '100%', height: '100%'}"></div>
        <p v-else class="zwsj"><span>暂无数据</span></p>
    </gy-item>
</template>

<script>
import gyItem from './chartsItem.vue';
import {mapGetters} from 'vuex';
import store from '@/store';
export default {
    name: 'trading-rank-seller',
    data () {
        return {
            gyItem: {
                title: '客户交易排行TOP5(卖家)',
                active: '当日',
                titleType: 'date',
                isBig: 'charts-item2',
                resetData: 4
            },
            dateType: ['', '当日', '当周', '当月', '总体'],
            statistics22: null,
            userCompanyId: null
        };
    },
    computed: mapGetters([
        'companyId'
    ]),
    watch: {
        companyId (newValue, oldValue) {
            this.statistic2(2, 1);
        }
    },
    mounted () {
        this.statistic2(2, 1);
    },
    methods: {
        // 交易排行TOP5(卖家/买家)
        statistic2 (f, t) {
            this.userCompanyId = store.state.mutations.companyId;
            this.$http.get(this.$api.charts.statistics + '?statisticsId=10&transactionSide=' + f + '&countType=' + t + (this.userCompanyId ? '&userCompanyId=' + this.userCompanyId : ''))
                .then((res) => {
                    if (res.data.code === 0) {
                        this.statistics22 = res.data.data;
                        if (this.statistics22.length !== 0) {
                            Promise.resolve().then(() => {
                                this.drawLine4();
                            });
                        }
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        drawLine4 () {
            let yAxisData = [];
            let seriesData = [];
            this.statistics22.forEach((e) => {
                let name = e.companyName;
                if (name.length > 12) {
                    name = name.substr(0, 12) + '...';
                    yAxisData.push(name);
                } else {
                    yAxisData.push(e.companyName);
                }
                seriesData.push((e.settlementTotal / 10000).toFixed(2));
            });
            let myChart = this.$echarts.init(document.getElementById('myChart10'));
            let option = {
                tooltip: {
                    show: true,
                    formatter: '{c}'
                },
                grid: {
                    left: 170,
                    top: 40,
                    right: 80,
                    bottom: 40
                },
                xAxis: {
                    name: '单位: 万元',
                    type: 'value',
                    axisLabel: {
                        show: true
                    },
                    axisTick: {
                        show: true,
                        lineStyle: {
                            color: '#666'
                        }
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#666'
                        }
                    },
                    splitLine: {
                        show: false
                    },
                    data: [5, 10, 15, 20]
                },
                yAxis: {
                    name: '公司名称',
                    data: yAxisData,
                    offset: 150,
                    // inverse: true,
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#666'
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#666'
                        },
                        align: 'left'
                    },
                    z: 10,
                    splitLine: {
                        show: false
                    }
                },
                series: [
                    {
                        type: 'bar',
                        barWidth: 10,
                        itemStyle: {
                            normal: {
                                color: '#4a90e2'
                            },
                            emphasis: {
                                color: '#4a90e2'
                            }
                        },
                        data: seriesData
                    }
                ]
            };
            myChart.setOption(option);
        },
        resetList (e, t) {
            this.gyItem.active = this.dateType[t];
            this.statistic2(2, t);
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
