<!--跟进状态-->
<template>
    <gy-item :title="gyItem.title" :titleType="gyItem.titleType" :active="gyItem.active"
             :isBig="gyItem.isBig" :resetData="gyItem.resetData">
        <div id="myChart0" :style="{width: '100%', height: '100%'}"></div>
    </gy-item>
</template>

<script>
import gyItem from './chartsItem.vue';
export default {
    name: 'follow-up-state',
    data () {
        return {
            gyItem: {
                title: '跟进状态',
                active: '本月',
                titleType: 'date1',
                isBig: 'charts-item2',
                resetData: 2
            }
        };
    },
    mounted () {
        this.followStatistic(1);
    },
    methods: {
        // 跟进数
        followStatistic (e) {
            this.$http.get(this.$api.charts.statistics + '?statisticsId=6&isMonth=' + e)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.followStatistics = res.data.data;
                        this.drawBrokenLine(e);
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        drawBrokenLine (type) {
            let series = [];
            let xAxisData1 = [];
            for (let i of this.followStatistics.title.keys()) {
                let seriesData = [];
                let title = this.followStatistics.title[i];
                this.followStatistics.data.map((e) => {
                    if (i === 0 && e.statusName === title) {
                        xAxisData1.push(e.statisDate.toString().substr(-2, 2));
                    }
                    if (e.statusName === title) {
                        seriesData.push(e.followCount);
                    }
                });
                series.push({
                    name: this.followStatistics.title[i],
                    data: seriesData,
                    type: 'line'
                });
            }
            let myChart = this.$echarts.init(document.getElementById('myChart0'));
            myChart.setOption({
                tooltip: {
                    show: true,
                    formatter: type === 1 ? '{a}<br>{b}日: {c}' : '{a}<br>{b}月: {c}'
                },
                grid: {
                    left: 60,
                    top: 40,
                    right: 65,
                    bottom: 40
                },
                legend: {
                    x: 'left',
                    textStyle: {
                        color: '#666'
                    },
                    padding: [10, 30, 10, 80],
                    data: this.followStatistics.title
                },
                xAxis: {
                    name: type === 1 ? '单位: 日' : '单位: 月',
                    type: 'category',
                    data: xAxisData1,
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
                    }
                },
                yAxis: {
                    type: 'value',
                    minInterval: 1,
                    splitLine: {
                        show: false
                    },
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
                        }
                    }
                },
                series: series
            });
        },
        resetList (e, t) {
            this.gyItem.active = t === 1 ? '本月' : '本年';
            this.followStatistic(t);
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
