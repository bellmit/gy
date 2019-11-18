<!--订单数-->
<template>
    <gy-item :title="gyItem.title" :titleType="gyItem.titleType" :active="gyItem.active"
             :isBig="gyItem.isBig" :resetData="gyItem.resetData" :dateType = "gyItem.dateType" id="gyOrderNumber">
        <div class="item-content-item1" v-show="statistics1 && statistics1.length > 0" style="width: 100%" id="myChart1"></div>
        <p v-show="statistics1 && statistics1.length === 0" class="zwsj item-content-item1"><span>暂无数据</span></p>
    </gy-item>
</template>

<script>
import gyItem from './chartsItem.vue';
export default {
    name: 'order-number',
    data () {
        return {
            gyItem: {
                title: '订单数',
                active: '总体',
                titleType: null,
                isBig: 'charts-item2 charts-item3',
                resetData: 3,
                dateType: 2
            },
            statistics1: [],
            myChart: null
        };
    },
    mounted () {
        this.statistic();
        document.getElementById('myChart1').style.width = document.getElementById('gyOrderNumber').offsetWidth - 2 + 'px';
        this.myChart = this.$echarts.init(document.getElementById('myChart1'));
        window.addEventListener('resize', () => {
            this.myChart.resize({width: document.getElementById('gyOrderNumber').offsetWidth - 2 + 'px', height: '408px'});
        });
    },
    methods: {
        // 订单数
        statistic () {
            this.$http.get(this.$api.charts.statistics + '?statisticsId=8')
                .then((res) => {
                    if (res.data.code === 0) {
                        this.statistics1 = res.data.data;
                        if (this.statistics1.length !== 0) {
                            this.drawLine();
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
            let orderCountRatio = [];
            let orderCountRatioStr = [];
            this.statistics1.forEach((e) => {
                xAxisData.push(e.statisMonth.toString().substr(-2, 2) * 1 + '月');
                seriesData.push(e.orderCount);
                if (e.orderCountRatio === null) {
                    orderCountRatioStr.push('无效数据');
                    orderCountRatio.push(0);
                } else {
                    orderCountRatioStr.push(false);
                    orderCountRatio.push(e.orderCountRatio * 100);
                }
            });
            this.myChart.setOption({
                tooltip: {
                    trigger: 'axis',
                    formatter: (item) => {
                        let msg = '';
                        for (let val of item.values()) {
                            if (val.seriesIndex === 0) {
                                const data0 = orderCountRatioStr[val.dataIndex]
                                    ? orderCountRatioStr[val.dataIndex] : (val.data.toFixed(2) + ' %');
                                msg += val.marker + val.seriesName + ' ' + data0 + '<br />';
                            }
                            if (val.seriesIndex === 1) {
                                msg += val.marker + val.seriesName + ' ' + val.data + ' 单';
                            }
                        }
                        return msg;
                    },
                    axisPointer: {
                        type: 'shadow',
                        label: {
                            show: true
                        }
                    }
                },
                legend: {
                    data: ['环比增长率', '订单数'],
                    top: 15,
                    textStyle: {
                        color: '#666'
                    }
                },
                grid: {
                    top: 50,
                    right: 80,
                    bottom: 40,
                    left: 45
                },
                xAxis: {
                    name: '',
                    type: 'category',
                    data: xAxisData,
                    axisLine: {
                        show: false,
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
                    },
                    axisPointer: {
                        type: 'shadow',
                        shadowStyle: {
                            color: 'rgba(21,113,217,0.08)'
                        },
                        label: {
                            show: false,
                            backgroundColor: 'rgba(21,113,217,0.2)',
                            color: '#FD4B0E'
                        }
                    }
                },
                yAxis: [{
                    name: '数量',
                    nameTextStyle: {
                        color: '#333'
                    },
                    type: 'value',
                    minInterval: 1,
                    splitLine: {
                        show: false
                    },
                    splitArea: {
                        show: true,
                        areaStyle: {
                            color: ['rgba(255,255,255,1)', 'rgba(240,240,240,0.3)']
                        }
                    },
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: '#666'
                        }
                    },
                    axisTick: {
                        show: false,
                        inside: true
                    },
                    axisLabel: {
                        color: '#666'
                    }
                },
                {
                    type: 'value',
                    name: '环比增长率',
                    splitArea: {
                        show: true,
                        areaStyle: {
                            color: ['rgba(255,255,255,1)', 'rgba(240,240,240,0.3)']
                        }
                    },
                    nameTextStyle: {
                        color: '#666'
                    },
                    position: 'right',
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        show: true,
                        formatter: '{value} %', // 右侧Y轴文字显示
                        textStyle: {
                            color: '#666'
                        }
                    }
                }],
                series: [{
                    name: '环比增长率',
                    type: 'line',
                    yAxisIndex: 1, // 使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
                    smooth: true, // 平滑曲线显示
                    showAllSymbol: true, // 显示所有图形。
                    symbol: 'circle', // 标记的图形为实心圆
                    symbolSize: 6, // 标记的大小
                    itemStyle: {
                    // 折线拐点标志的样式
                        color: '#FD4B0E'
                    },
                    lineStyle: {
                        color: '#FD4B0E'
                    },
                    areaStyle: {
                        color: 'rgba(253,75,14, 0.15)'
                    },
                    data: orderCountRatio
                },
                {
                    name: '订单数',
                    data: seriesData,
                    type: 'bar',
                    barWidth: 20,
                    itemStyle: {
                        color: '#84BDF9'
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
