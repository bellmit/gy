<!--客户认证-->
<template>
    <gy-item :title="gyItem.title" :titleType="gyItem.titleType" :active="gyItem.active"
             :isBig="gyItem.isBig">
        <div v-if="Statistic5 && Statistic5.length > 0" id="myChart5" :style="{width: '100%', height: '100%'}"></div>
        <p v-else class="zwsj"><span>暂无数据</span></p>
    </gy-item>
</template>

<script>
import gyItem from './chartsItem.vue';
export default {
    name: 'follow-up-certification',
    data () {
        return {
            gyItem: {
                title: '客户认证',
                active: '当日',
                titleType: '',
                isBig: 'charts-item2'
            },
            Statistic5: null
        };
    },
    mounted () {
        this.statistic5();
    },
    methods: {
        // 客户认证
        statistic5 () {
            this.$http.get(this.$api.charts.statistics + '?statisticsId=7')
                .then((res) => {
                    if (res.data.code === 0) {
                        this.Statistic5 = res.data.data;
                        if (this.Statistic5.length !== 0) {
                            Promise.resolve().then(() => {
                                this.drawLine2();
                            });
                        }
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        drawLine2 () {
            let seriesData1 = [];
            let seriesData2 = [];
            let seriesData3 = [];
            let xaxis = [];
            this.Statistic5.forEach((e) => {
                if (e.auditName === '企业认证') {
                    xaxis.push(e.statisMonth.toString().substr(-2, 2));
                    seriesData1.push(e.total);
                } else if (e.auditName === 'CA认证') {
                    seriesData2.push(e.total);
                } else {
                    seriesData3.push(e.total);
                }
            });
            let myChart = this.$echarts.init(document.getElementById('myChart5'));
            myChart.setOption({
                tooltip: {
                    show: true,
                    formatter: '{a}</br>{b}月: {c}'
                },
                grid: {
                    top: 50,
                    right: 65,
                    bottom: 50,
                    left: 45
                },
                legend: {
                    padding: 15,
                    textStyle: {
                        color: '#666'
                    },
                    data: ['企业认证', 'CA认证', '银行认证']
                },
                xAxis: {
                    name: '单位: 月',
                    type: 'category',
                    data: xaxis,
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
                    type: 'value',
                    offset: 5,
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
                series: [
                    {
                        data: seriesData1,
                        type: 'bar',
                        name: '企业认证',
                        barGap: '0',
                        barWidth: 15,
                        itemStyle: {
                            color: '#4a90e2'
                        }
                    },
                    {
                        data: seriesData2,
                        type: 'bar',
                        name: 'CA认证',
                        barWidth: 15,
                        itemStyle: {
                            color: '#8ECE6F'
                        }
                    },
                    {
                        data: seriesData3,
                        type: 'bar',
                        name: '银行认证',
                        barWidth: 15,
                        itemStyle: {
                            color: '#F7AB85'
                        }
                    }
                ]
            });
        }
    },
    components: {gyItem}
};
</script>

<style scoped>

</style>
