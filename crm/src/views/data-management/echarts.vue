<template>
    <div style="padding-bottom: 30px">
        <div class="page-title">数据看板</div>
        <div class="charts-row">
            <gy-item :title="gyItem1.title" :titleType="gyItem1.titleType" :active="gyItem1.active"
                     :isBig="gyItem1.isBig" :resetData="gyItem1.resetData">
                <div id="myChart9" :style="{width: '100%', height: '100%'}"></div>
            </gy-item>
            <template v-if="role === 3">
                <gy-item :title="gyItem2.title" :titleType="gyItem2.titleType" :active="gyItem2.active"
                         :isBig="gyItem2.isBig" :resetData="gyItem2.resetData">
                    <div id="myChart0" :style="{width: '100%', height: '100%'}"></div>
                </gy-item>
            </template>
            <template v-if="role === 2">
                <gy-item :title="gyItem9.title" :titleType="gyItem9.titleType" :active="gyItem9.active"
                         :isBig="gyItem9.isBig">
                    <div v-if="Statistic5 && Statistic5.length > 0" id="myChart5" :style="{width: '100%', height: '100%'}"></div>
                    <p v-else class="zwsj"><span>暂无数据</span></p>
                </gy-item>
            </template>
            <template v-if="role === 1">
                <gy-item :title="gyItem13.title" :titleType="gyItem13.titleType" :active="gyItem13.active"
                         :isBig="gyItem13.isBig">
                    <div v-if="Statistic6 && Statistic6.length > 0" id="myChart8" :style="{width: '100%', height: '100%'}"></div>
                    <p v-else class="zwsj"><span>暂无数据</span></p>
                </gy-item>
            </template>
        </div>
        <div class="charts-row">
            <gy-item :title="gyItem4.title" :titleType="gyItem4.titleType" :active="gyItem4.active"
                     :isBig="gyItem4.isBig" :resetData="gyItem4.resetData">
                <div v-if="statistics1 && statistics1.length > 0" id="myChart1" :style="{width: '100%', height: '100%'}"></div>
                <p v-else class="zwsj"><span>暂无数据</span></p>
            </gy-item>
            <gy-item :title="gyItem5.title" :titleType="gyItem5.titleType" :active="gyItem5.active"
                     :isBig="gyItem5.isBig" :resetData="gyItem4.resetData">
                <div v-if="statistics1 && statistics1.length > 0" id="myChart2" :style="{width: '100%', height: '100%'}"></div>
                <p v-else class="zwsj"><span>暂无数据</span></p>
            </gy-item>
        </div>
        <div class="charts-row" v-if="role === 2 || role === 1">
            <gy-item :title="gyItem10.title" :titleType="gyItem10.titleType" :active="gyItem10.active"
                     :isBig="gyItem10.isBig" :resetData="gyItem10.resetData">
                <div v-if="statistics21 && statistics21.length > 0" class="company-chart" id="myChart6" :style="{width: '100%', height: '100%'}"></div>
                <p v-else class="zwsj"><span>暂无数据</span></p>
            </gy-item>
            <gy-item :title="gyItem16.title" :titleType="gyItem16.titleType" :active="gyItem16.active"
                     :isBig="gyItem16.isBig" :resetData="gyItem16.resetData">
                <div v-if="statistics22 && statistics22.length > 0" class="company-chart" id="myChart10" :style="{width: '100%', height: '100%'}"></div>
                <p v-else class="zwsj"><span>暂无数据</span></p>
            </gy-item>
        </div>
        <div class="charts-row charts-row1" v-if="role === 2">
            <gy-item :title="gyItem11.title" :titleType="gyItem11.titleType" :active="gyItem11.active"
                     :isBig="gyItem11.isBig">
                <div class="china-map">
                    <div class="map-content" id="myChart7" :style="{width: '600px', height: '400px'}"></div>
                    <div class="customer-statistics">
                        <div>
                            <div class="customer-title">全国客户排行(单位: 个)</div>
                            <div class="customer" v-for="(item, index) in customers" :key="index">
                                <div class="customer-text">{{item.provinceName}}</div>
                                <div class="customer-value">{{item.total}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </gy-item>
        </div>
        <div class="charts-row">
            <gy-item :title="gyItem17.title" :titleType="gyItem17.titleType" :active="gyItem17.active"
                     :isBig="gyItem17.isBig">
                <div v-if="Statistic3 && Statistic3.length !== 0" id="myChart11" :style="{width: '100%', height: '100%'}"></div>
                <p v-else class="zwsj"><span>暂无数据</span></p>
            </gy-item>
            <gy-item :title="gyItem7.title" :titleType="gyItem7.titleType" :active="gyItem7.active"
                     :isBig="gyItem7.isBig">
                <div v-if="Statistic4 && Statistic4.length > 0" id="myChart4" :style="{width: '100%', height: '100%'}"></div>
                <p v-else class="zwsj"><span>暂无数据</span></p>
            </gy-item>
        </div>
    </div>
</template>

<script>
import gyItem from './chartsItem.vue';
import 'echarts/map/js/china.js';

export default {
    data () {
        return {
            role: 1,
            gyItem1: {
                title: '客户数据',
                active: '本月',
                titleType: '',
                isBig: 'charts-item2',
                resetData: 1
            },
            gyItem2: {
                title: '跟进状态',
                active: '本月',
                titleType: 'date1',
                isBig: 'charts-item2',
                resetData: 2
            },
            gyItem4: {
                title: '订单数',
                active: '总体',
                titleType: null,
                isBig: 'charts-item2',
                resetData: 3
            },
            gyItem5: {
                title: '交易额',
                active: '中国',
                titleType: 'null',
                isBig: 'charts-item2',
                resetData: 4
            },
            gyItem7: {
                title: '交易品类',
                active: '',
                titleType: '',
                isBig: 'charts-item2'
            },
            gyItem9: {
                title: '客户认证',
                active: '当日',
                titleType: '',
                isBig: 'charts-item2'
            },
            gyItem10: {
                title: '客户交易排行TOP5(买家)',
                active: '当日',
                titleType: 'date',
                isBig: 'charts-item2',
                resetData: 3
            },
            gyItem11: {
                title: '客户所在地概览',
                active: '当日',
                titleType: '',
                isBig: 'charts-item1'
            },
            gyItem13: {
                title: '客户来源',
                active: '当日',
                titleType: '',
                isBig: 'charts-item2'
            },
            gyItem16: {
                title: '客户交易排行TOP5(卖家)',
                active: '当日',
                titleType: 'date',
                isBig: 'charts-item2',
                resetData: 4
            },
            gyItem17: {
                title: '客户类型',
                active: '',
                titleType: '',
                isBig: 'charts-item2'
            },
            customers: [
                // {
                //     provinceName: '',
                //     total: ''
                // }
            ],
            dateType: ['', '当日', '当周', '当月', '总体'],
            pieData1: [
                {value: 17, name: '甲醇', itemStyle: {color: '#8ECE6F'}},
                {value: 12, name: '乙二醇', itemStyle: {color: '#F7AB85'}},
                {value: 8, name: '丙醇', itemStyle: {color: '#F7C885'}},
                {value: 11, name: '石脑油', itemStyle: {color: '#F7C615'}},
                {value: 3, name: '聚乙烯', itemStyle: {color: '#8Efa6F'}}
            ],
            pieData: [
                {value: 30, name: '物流商', itemStyle: {color: '#8ECE6F'}},
                {value: 35, name: '供应商', itemStyle: {color: '#F7AB85'}},
                {value: 35, name: '贸易商', itemStyle: {color: '#F7C885'}},
                {value: 35, name: '承运商', itemStyle: {color: '#F7C615'}},
                {value: 35, name: '工厂', itemStyle: {color: '#8Efa6F'}}
            ],
            statistics: null,
            followStatistics: null,
            statistics1: null,
            statistics21: null,
            statistics22: null,
            Statistic3: null,
            Statistic4: null,
            Statistic5: null,
            Statistic6: null
        };
    },
    created () {
        let user = localStorage.getItem('userInfo');
        if (user) {
            let userInfo = JSON.parse(user);
            // 1 中烨 2 国烨 3 业务员
            userInfo.userType === 1 ? (this.role = 2) : (userInfo.isAdmin === 1 ? (this.role = 1) : (this.role = 3));
        }
    },
    mounted () {
        this.init();
    },
    methods: {
        init () {
            this.statistic(3);
            this.statistic1();
            this.statistic3();
            this.statistic4();
            if (this.role === 1 || this.role === 2) {
                this.statistic2(1, 1);
                this.statistic2(2, 1);
            }
            if (this.role === 1) {
                this.statistic6();
            }
            if (this.role === 2) {
                this.customerArea();
                this.statistic5();
            }
            if (this.role === 3) {
                this.followStatistic(1);
            }
        },
        // 客户数据
        statistic (e) {
            this.$http.get(this.$api.charts.statistics + '?statisticsId=1&countType=' + e)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.statistics = res.data.data;
                        this.drawBrokenLine2(e);
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        },
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
        // 订单数 // 交易额
        statistic1 () {
            this.$http.get(this.$api.charts.statistics + '?statisticsId=8')
                .then((res) => {
                    if (res.data.code === 0) {
                        this.statistics1 = res.data.data;
                        if (this.statistics1.length !== 0) {
                            Promise.resolve().then(() => {
                                this.drawLine();
                                this.drawLine1();
                            });
                        }
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        // 交易排行TOP5(卖家/买家)
        statistic2 (f, t) {
            this.$http.get(this.$api.charts.statistics + '?statisticsId=10&transactionSide=' + f + '&countType=' + t)
                .then((res) => {
                    if (res.data.code === 0) {
                        if (f === 1) {
                            this.statistics21 = res.data.data;
                            if (this.statistics21.length !== 0) {
                                Promise.resolve().then(() => {
                                    this.drawLine3();
                                });
                            }
                        } else {
                            this.statistics22 = res.data.data;
                            if (this.statistics22.length !== 0) {
                                Promise.resolve().then(() => {
                                    this.drawLine4();
                                });
                            }
                        }
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        // 所在地概览
        customerArea () {
            this.$http.get(this.$api.charts.statistics + '?statisticsId=13')
                .then((res) => {
                    if (res.data.code === 0) {
                        this.customers = res.data.data;
                        this.drawChina();
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        // 交易品类
        statistic3 () {
            this.$http.get(this.$api.charts.statistics + '?statisticsId=14')
                .then((res) => {
                    if (res.data.code === 0) {
                        this.Statistic3 = res.data.data;
                        if (this.Statistic3.length !== 0) {
                            Promise.resolve().then(() => {
                                this.drawPie();
                            });
                        }
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        // 客户类型
        statistic4 () {
            this.$http.get(this.$api.charts.statistics + '?statisticsId=15')
                .then((res) => {
                    if (res.data.code === 0) {
                        this.Statistic4 = res.data.data;
                        if (this.Statistic4.length !== 0) {
                            Promise.resolve().then(() => {
                                this.drawPie1();
                            });
                        }
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        },
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
        // 客户来源
        statistic6 () {
            this.$http.get(this.$api.charts.statistics + '?statisticsId=5')
                .then((res) => {
                    if (res.data.code === 0) {
                        this.Statistic6 = res.data.data;
                        if (this.Statistic6.length !== 0) {
                            Promise.resolve().then(() => {
                                this.drawPie2();
                            });
                        }
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        drawPie () {
            let legend = [];
            this.Statistic3.forEach((e) => {
                let item = {};
                item.name = e.companyTypeName;
                item.value = (e.ratio * 100).toFixed(2);
                legend.push(item);
            });
            let myChart = this.$echarts.init(document.getElementById('myChart11'));
            myChart.setOption({
                legend: {
                    orient: 'vertical',
                    left: 340,
                    top: 30,
                    selectedMode: false,
                    textStyle: {
                        color: '#666'
                    },
                    data: legend,
                    formatter: (name) => {
                        let title;
                        legend.forEach((e) => {
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
                        center: ['35%', '50%'],
                        silent: true,
                        data: legend,
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
        drawPie1 () {
            let lenged = [];
            this.Statistic4.forEach((e) => {
                let item = {};
                item.name = e.productName.replace(/\s+/g, '');
                item.value = (e.ratio * 100).toFixed(2);
                lenged.push(item);
            });
            let myChart = this.$echarts.init(document.getElementById('myChart4'));
            myChart.setOption({
                legend: {
                    orient: 'vertical',
                    left: 340,
                    top: 30,
                    selectedMode: false,
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
                        center: ['35%', '50%'],
                        silent: true,
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
        drawPie2 () {
            let legned = [];
            this.Statistic6.forEach((e) => {
                let item = {};
                item.name = e.sourceName;
                item.value = (e.ratio * 100).toFixed(2);
                legned.push(item);
            });
            let myChart = this.$echarts.init(document.getElementById('myChart8'));
            myChart.setOption({
                legend: {
                    orient: 'vertical',
                    left: 340,
                    top: 30,
                    selectedMode: false,
                    textStyle: {
                        color: '#666'
                    },
                    data: legned,
                    formatter: (name) => {
                        let title;
                        legned.forEach((e) => {
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
                        center: ['35%', '50%'],
                        silent: true,
                        data: legned,
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
        },
        drawLine1 () {
            let xAxisData = [];
            let seriesData = [];
            this.statistics1.forEach((e) => {
                xAxisData.push(e.statisMonth.toString().substr(-2, 2));
                seriesData.push(((e.settlementTotal) / 10000).toFixed(2));
            });
            let myChart = this.$echarts.init(document.getElementById('myChart2'));
            myChart.setOption({
                tooltip: {
                    show: true,
                    formatter: '{c}'
                },
                grid: {
                    top: 50,
                    right: 65,
                    bottom: 50,
                    left: 70
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
                    name: '万元',
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
                    left: 50
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
        },
        drawLine3 () {
            let yAxisData = [];
            let seriesData = [];
            this.statistics21.forEach((e) => {
                let name = e.companyName;
                if (name.length > 12) {
                    name = name.substr(0, 12) + '...';
                    yAxisData.push(name);
                } else {
                    yAxisData.push(e.companyName);
                }
                seriesData.push((e.settlementTotal / 10000).toFixed(2));
            });
            let myChart = this.$echarts.init(document.getElementById('myChart6'));

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
                    }
                },
                yAxis: {
                    name: '公司名称',
                    // nameLocation
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
        drawChina () {
            let myChart = this.$echarts.init(document.getElementById('myChart7'));
            let mapName = 'china';
            let data = [
                {name: '北京'},
                {name: '天津',
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'right',
                            show: true,
                            textStyle: {
                                color: '#4a90e2',
                                fontSize: 10
                            }
                        },
                        emphasis: {
                            show: true
                        }
                    }},
                {name: '河北',
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'bottom',
                            show: true,
                            textStyle: {
                                color: '#4a90e2',
                                fontSize: 10
                            }
                        },
                        emphasis: {
                            show: true
                        }
                    }},
                {name: '山西'},
                {name: '内蒙古'},
                {name: '辽宁'},
                {name: '吉林'},
                {name: '黑龙江'},
                {name: '上海'},
                {name: '江苏'},
                {name: '浙江',
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'bottom',
                            show: true,
                            textStyle: {
                                color: '#4a90e2',
                                fontSize: 10
                            }
                        },
                        emphasis: {
                            show: true
                        }
                    }},
                {name: '安徽',
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'bottom',
                            show: true,
                            textStyle: {
                                color: '#4a90e2',
                                fontSize: 10
                            }
                        },
                        emphasis: {
                            show: true
                        }
                    }},
                {name: '福建'},
                {name: '江西',
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'bottom',
                            show: true,
                            textStyle: {
                                color: '#4a90e2',
                                fontSize: 10
                            }
                        },
                        emphasis: {
                            show: true
                        }
                    }},
                {name: '山东'},
                {name: '河南',
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'left',
                            show: true,
                            textStyle: {
                                color: '#4a90e2',
                                fontSize: 10
                            }
                        },
                        emphasis: {
                            show: true
                        }
                    }},
                {name: '湖北'},
                {name: '湖南'},
                {name: '重庆'},
                {name: '四川'},
                {name: '贵州'},
                {name: '云南'},
                {name: '西藏'},
                {name: '陕西'},
                {name: '甘肃'},
                {name: '青海',
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'left',
                            show: true,
                            textStyle: {
                                color: '#4a90e2',
                                fontSize: 10
                            }
                        },
                        emphasis: {
                            show: true
                        }
                    }},
                {name: '宁夏'},
                {name: '新疆'},
                {name: '广东'},
                {name: '广西'},
                {name: '海南'},
                {name: '台湾'}
            ];

            let geoCoordMap = {};

            /* 获取地图数据 */
            myChart.showLoading();
            let mapFeatures = this.$echarts.getMap(mapName).geoJson.features;
            myChart.hideLoading();
            mapFeatures.forEach((v) => {
                // 地区名称
                let name = v.properties.name;
                // 地区经纬度
                geoCoordMap[name] = v.properties.cp;
            });

            let convertData = (data) => {
                let res = [];
                for (let i = 0; i < data.length; i++) {
                    let geoCoord = geoCoordMap[data[i].name];
                    if (geoCoord && data[i].label) {
                        res.push({
                            name: data[i].name,
                            value: geoCoord.concat(data[i].value),
                            label: data[i].label
                        });
                    } else {
                        if (geoCoord) {
                            res.push({
                                name: data[i].name,
                                value: geoCoord.concat(data[i].value)
                            });
                        }
                    }
                }
                return res;
            };
            let option = {
                visualMap: {
                    show: false,
                    seriesIndex: [1],
                    inRange: {
                        color: ['#fff', '#fff'] // 蓝绿
                    }
                },
                geo: {
                    show: true,
                    map: mapName,
                    aspectScale: '0.8',
                    label: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: false
                        }
                    },
                    center: [104.114129, 35.550339],
                    zoom: 1.1,
                    roam: false,
                    itemStyle: {
                        normal: {
                            borderWidth: 0.3,
                            borderColor: '#32C7C7',
                            areaColor: '#fff'
                        },
                        emphasis: {
                            areaColor: '#fff'
                        }
                    }
                },
                series: [
                    {
                        name: '散点',
                        type: 'scatter',
                        zoom: 1.5,
                        coordinateSystem: 'geo',
                        data: convertData(data),
                        symbolSize: () => {
                            return 5;
                        },
                        label: {
                            normal: {
                                formatter: '{b}',
                                position: 'top',
                                show: true,
                                textStyle: {
                                    color: '#4a90e2',
                                    fontSize: 10
                                }
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#FB9241'
                            }
                        }
                    }
                ]
            };
            myChart.setOption(option);
        },
        drawBrokenLine (type) {
            let seriesData1 = [];
            let seriesData2 = [];
            let seriesData3 = [];
            let seriesData4 = [];
            let seriesData5 = [];
            let seriesData6 = [];
            let seriesData7 = [];
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
                case '赢单':
                    seriesData6.push(e.followCount);
                    break;
                case '输单':
                    seriesData7.push(e.followCount);
                    break;
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
                    padding: [20, 30, 10, 160],
                    data: ['初步接触', '确认需求', '方案/报价', '谈判审核', '暂时搁置', '赢单', '输单']
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
                    },
                    {
                        name: '赢单',
                        data: seriesData6,
                        type: 'line'
                    },
                    {
                        name: '输单',
                        data: seriesData7,
                        type: 'line'
                    }
                ]
            });
        },
        drawBrokenLine2 (type) {
            let data = type === 3 ? {
                seriesData: [
                    {value: this.statistics.newAdded, name: '本月新增客户数'},
                    {value: this.statistics.total, name: '总客户数'}
                ]
            } : {
                seriesData: [
                    {value: this.statistics.total, name: '总客户数'}
                ]
            };
            let myChart = this.$echarts.init(document.getElementById('myChart9'));
            myChart.setOption({
                title: {
                    text: this.statistics.total,
                    left: 33 - ([...this.statistics.total.toString()].length - 1) + '%',
                    top: 'middle'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{b} : {c}人 ({d}%)'
                },
                legend: {
                    orient: 'vertical',
                    selectedMode: false,
                    left: 340,
                    top: 30,
                    data: data.seriesData,
                    formatter: (name) => {
                        let title;
                        data.seriesData.forEach((e) => {
                            if (e.name === name) {
                                title = e.name + ' ' + e.value + '人';
                            }
                        });
                        return title;
                    }
                },
                series: [
                    {
                        name: '',
                        type: 'pie',
                        label: {
                            formatter: '{b}: {c}'
                        },
                        silent: true,
                        legendHoverLink: false,
                        hoverAnimation: false,
                        radius: ['50%', '70%'],
                        center: ['35%', '50%'],
                        data: data.seriesData,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            }, true);
        },
        resetList (e, t) {
            switch (e) {
            case 1 :
                this.gyItem1.active = t === 3 ? '本月' : '总体';
                this.statistic(t);
                break;
            case 2 :
                this.gyItem2.active = t === 1 ? '本月' : '本年';
                this.followStatistic(t);
                break;
            case 3 :
                this.gyItem10.active = this.dateType[t];
                this.statistic2(1, t);
                break;
            case 4 :
                this.gyItem16.active = this.dateType[t];
                this.statistic2(2, t);
                break;
            default :
                break;
            }
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

<style lang="scss" scoped>
    .page-title {
        margin-bottom: 5px;
        padding: 5px 20px;
        border-bottom: 1px solid $color-border;
        font-size: 16px;
        color: $color-title;
        font-weight: bold;
    }

    .charts-row {
        display: flex;
        min-height: 260px;
        padding: 10px 5px 0 15px;
        /deep/ .charts-item {
            flex: 1;
            margin-right: 10px;
            box-sizing: border-box;
            border: 1px solid $color-border;
            display: flex;
            flex-direction: column;
            .item-header {
                flex: 0 0 40px;
                border-bottom: 1px solid $color-border;
                display: flex;
                .item-header-item {
                    flex: 1;
                    line-height: 40px;
                    .title {
                        padding-left: 15px;
                        font-size: 16px;
                        font-weight: bold;
                        color: $color-title;
                    }
                    ul {
                        display: flex;
                        justify-content: flex-end;
                        li {
                            flex: 0 0 30px;
                            line-height: 39px;
                            text-align: center;
                            margin: 0 8px;
                            cursor: default;
                        }
                        .active {
                            color: $color-a-active;
                            border-bottom: 2px solid $color-a-active;
                        }
                    }
                }
            }
            .item-content {
                flex: 1;
                min-height: 208px;
                .number {
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                    font-size: 24px;
                    font-weight: 600;
                    text-align: center;
                    color: $color-a-active;
                    .space {
                        flex: 1;
                    }
                    .text-num {
                        flex: 0 0 35px;
                    }
                }
            }
        }
        .charts-item1 {
            @extend .charts-item;
            flex: 2;
        }
        .charts-item2 {
            @extend .charts-item;
            flex: 1;
        }
    }

    .china-map {
        display: flex;
        .map-content {
            flex: 0 0 700px;
        }
        .customer-statistics {
            flex: 1;
            padding: 35px 0 0 30px;
            .customer-title {
                padding-bottom: 24px;
                line-height: 1;
                font-size: 16px;
                font-weight: 600;
                color: $color-title;
            }
            .customer {
                display: flex;
                line-height: 1;
                padding: 8px 0;
                .customer-text {
                    flex: 1;
                    color: $color-title;
                }
                .customer-value {
                    flex: 1;
                }
            }
        }
    }

    .charts-row1 {
        /deep/ .charts-item {
            .item-content {
                min-height: 315px;
            }
        }
    }

    .zwsj {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        flex-direction: column;
        text-align: center;
    }
</style>
