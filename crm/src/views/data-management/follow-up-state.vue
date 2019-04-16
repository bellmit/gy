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
            let seriesData1 = [];
            let seriesData2 = [];
            let seriesData3 = [];
            let seriesData4 = [];
            let seriesData5 = [];
            // let seriesData6 = [];
            // let seriesData7 = [];
            let xAxisData1 = [];
            this.followStatistics.forEach((e) => {
                switch (e.statusName) {
                case '初步接触':
                    // xAxisData1.push((type === 1 ? (e.statisDate.toString().substr(-2, 2) * 1) : e.statisDate));
                    xAxisData1.push(e.statisDate.toString().substr(-2, 2));
                    seriesData1.push(e.followCount);
                    break;
                case '确认需求':
                    seriesData2.push(e.followCount);
                    break;
                case '方案/报价':
                    seriesData3.push(e.followCount);
                    break;
                case '谈判审核':
                    seriesData4.push(e.followCount);
                    break;
                case '暂时搁置':
                    seriesData5.push(e.followCount);
                    break;
                    // case '赢单':
                    //     seriesData6.push(e.followCount);
                    //     break;
                    // case '输单':
                    //     seriesData7.push(e.followCount);
                    //     break;
                default:
                    break;
                }
            });
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
                    data: ['初步接触', '确认需求', '方案/报价', '谈判审核', '暂时搁置']
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
                series: [
                    {
                        name: '初步接触',
                        data: seriesData1,
                        type: 'line'
                    },
                    {
                        name: '确认需求',
                        data: seriesData2,
                        type: 'line'
                    },
                    {
                        name: '方案/报价',
                        data: seriesData3,
                        type: 'line'
                    },
                    {
                        name: '谈判审核',
                        data: seriesData4,
                        type: 'line'
                    },
                    {
                        name: '暂时搁置',
                        data: seriesData5,
                        type: 'line'
                    }
                    // ,
                    // {
                    //     name: '赢单',
                    //     data: seriesData6,
                    //     type: 'line'
                    // },
                    // {
                    //     name: '输单',
                    //     data: seriesData7,
                    //     type: 'line'
                    // }
                ]
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
