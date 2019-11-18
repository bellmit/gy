<!--订单数-->
<template>
    <gy-item :title="gyItem.title" :titleType="gyItem.titleType" :active="gyItem.active"
             :isBig="gyItem.isBig" :dateType ="gyItem.dateType" :resetData="gyItem.resetData" :showLine="statistics1 && statistics1.cvrData.length > 0"  id="gyTransData">
        <div class="item-content-item1" v-show="statistics1 && statistics1.cvrData.length > 0" style="width: 100%" id="myChart22"></div>
        <p v-show="statistics1 && statistics1.cvrData.length === 0" class="zwsj item-content-item1"><span>暂无数据</span></p>
        <p class="y-name" v-show="statistics1 && statistics1.cvrData.length > 0">挂单转化率(%)
        <el-tooltip poper-class="test"  content="挂单生成的订单(签约状态或已完成状态)/前后台挂单数量" placement="top" effect="light">
                <i  class="el-icon-question"></i>
        </el-tooltip>
        </p>
        <p v-show="statistics1 && statistics1.cvrData.length > 0" class="indicator-2">前台成交订单数 <br>({{statistics1.totalData.frontOrderTotal}}) </p>
        <p v-show="statistics1 && statistics1.cvrData.length > 0" class="indicator-4">后台成交订单数<br>({{statistics1.totalData.backOrderTotal}})</p>
    </gy-item>
</template>

<script>
import gyItem from './chartsItem.vue';
export default {
    name: 'translational-data',
    data () {
        return {
            gyItem: {
                title: '挂单转化数据',
                active: '当周',
                titleType: 'date',
                isBig: 'charts-item2 charts-item3 charts-item4',
                resetData: 3,
                dateType: 2

            },
            statistics1: {
                cvrData: [],
                totalData: ''
            },
            myChart: null,
            dateType: 4
        };
    },
    mounted () {
        this.statistic();
        document.getElementById('myChart22').style.width = document.getElementById('gyTransData').offsetWidth - 2 + 'px';
        this.myChart = this.$echarts.init(document.getElementById('myChart22'));
        window.addEventListener('resize', () => {
            this.myChart.resize({width: document.getElementById('gyTransData').offsetWidth - 2 + 'px', height: '408px'});
        });
    },
    provide () {
        return {
            resetList: this.resetList
        };
    },
    methods: {
        resetList (e, t) {
            this.gyItem.active = this.$constant.dateType[t];
            this.statistic(t);
        },
        // 订单数
        statistic (t = 2) {
            this.dateType = t;
            this.$http.get(this.$api.charts.statistics + '?statisticsId=22&countType=' + t)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.statistics1 = res.data.data;
                        if (this.statistics1) {
                            this.drawLine();
                        }
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        fDate (date) {
            if (this.dateType === 2 || this.dateType === 3) {
                return date.toString().slice(4).slice(0, 2) + '/' + date.toString().slice(4).slice(2);
            } else if (this.dateType === 4) {
                return Number(date.toString().slice(4)) + '月';
            }
        },
        fDateToolTips (date) {
            date = date.toString();
            if (this.dateType === 2 || this.dateType === 3) {
                return date.slice(0, 4) + '-' + date.slice(4, 6) + '-' + date.slice(6, 8);
            } else if (this.dateType === 4) {
                return date.slice(0, 4) + '-' + date.slice(4, 6);
            }
        },
        drawLine () {
            // 数据
            let weekCategory = [];
            let radarData = [];
            let maxData = '';
            let maxData1 = '';
            let maxY = '';
            let orderCvr = [];
            let signedCvr = [];

            // 周数据
            let cvrData = this.statistics1.cvrData;
            let totalData = this.statistics1.totalData;
            cvrData.forEach((item, index, arr) => {
                // 日期
                weekCategory.push(this.fDate(item.statisDate));
                cvrData[index].statisDate = this.fDateToolTips(item.statisDate);
                // 折线图数据
                let itemOrderCvr = cvrData[index].orderCvr = (item.orderCvr * 100).toFixed(2);
                let itemSignedCvr = cvrData[index].signedCvr = (item.signedCvr * 100).toFixed(2);
                if (itemOrderCvr > 100) {
                    cvrData[index].orderCvr = itemOrderCvr + '(异常数据)';
                    orderCvr.push(100);
                } else {
                    orderCvr.push(itemOrderCvr);
                }
                if (itemSignedCvr > 100) {
                    cvrData[index].signedCvr = itemSignedCvr + '(异常数据)';
                    signedCvr.push(100);
                } else {
                    signedCvr.push(itemSignedCvr);
                }
            });
            maxY = Math.max(...orderCvr, ...signedCvr);
            var radarDayData = [totalData.frontOfferTotal, totalData.frontOrderTotal, totalData.backOfferTotal, totalData.backOrderTotal];
            radarData.push(radarDayData);
            maxData = Math.max(totalData.frontOfferTotal, totalData.backOfferTotal) * 1.2 || 100;
            maxData1 = Math.max(totalData.frontOrderTotal, totalData.backOrderTotal) * 1.2 || 100;
            // 颜色设置
            var color = {
                linearYtoG: {
                    type: 'linear',
                    x: 100,
                    y: 0,
                    x2: 1,
                    y2: 1,
                    colorStops: [{
                        offset: 0,
                        color: '#60AEFF'
                    }, {
                        offset: 1,
                        color: '#60AEFF'
                    }]
                },
                linearGtoB: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 1,
                    y2: 0,
                    colorStops: [{
                        offset: 0,
                        color: '#43dfa2'
                    }, {
                        offset: 1,
                        color: '#28f8de'
                    }]
                },
                linearBtoG: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 1,
                    y2: 0,
                    colorStops: [{
                        offset: 0,
                        color: '#1c98e8'
                    }, {
                        offset: 1,
                        color: '#28f8de'
                    }]
                },
                areaBtoG: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0,
                        color: 'rgba(35,184,210,.2)'
                    }, {
                        offset: 1,
                        color: 'rgba(35,184,210,0)'
                    }]
                }
            };

            var option = {
                legend: [{
                    top: '5%',
                    left: 350,
                    orient: 'vertical',
                    itemGap: 15,
                    itemWidth: 12,
                    itemHeight: 12,
                    data: ['平均指标', '现状指标'],
                    textStyle: {
                        color: '#666',
                        fontSize: 14
                    }
                }, {
                    top: '5%',
                    right: 15,
                    orient: 'vertical',
                    itemGap: 15,
                    itemWidth: 25,
                    itemHeight: 12,
                    data: ['挂单签约比例'],
                    textStyle: {
                        color: '#666',
                        fontSize: 14
                    }
                }
                ],
                tooltip: {
                    trigger: 'axis',
                    formatter: (items) => {
                        let item = '';
                        if (Array.isArray(items)) {
                            item = items[0];
                        } else {
                            item = items;
                        }
                        let msg = '';
                        if (item.seriesType === 'line') {
                            msg = '日期: ' + cvrData[item.dataIndex].statisDate + '<br />';
                            msg += item.seriesIndex === 2 ? '签约订单转化率(%): ' + cvrData[item.dataIndex].signedCvr + '<br />' : '';
                            if (items.length === 2) {
                                msg += items[1].seriesIndex === 2 ? '签约订单转化率(%): ' + cvrData[items[1].dataIndex].signedCvr + '<br />' : '';
                                msg += items[1].seriesIndex === 2 ? '签约订单数: ' + cvrData[items[1].dataIndex].signedTotal + '<br />' : '挂单产品数: ' + cvrData[item.dataIndex].offerTotal + '<br />';
                            }
                            msg += item.seriesIndex === 2 ? '签约订单数: ' + cvrData[item.dataIndex].signedTotal + '<br />' : '挂单产品数: ' + cvrData[item.dataIndex].offerTotal + '<br />';
                            msg += '总挂单数: ' + cvrData[items[1].dataIndex].orderTotal + '<br />';
                        } else if (item.seriesType === 'radar') {
                            msg = '现状指示<br />';
                            msg += '前台挂单数: ' + totalData.frontOfferTotal + '<br />';
                            msg += '前台成交订单数: ' + totalData.frontOrderTotal + '<br />';
                            msg += '后台挂单数: ' + totalData.backOfferTotal + '<br />';
                            msg += '后台成交订单数: ' + totalData.backOrderTotal + '<br />';
                        }
                        return msg;
                    }
                },
                radar: {
                    center: [228, '50%'],
                    radius: '50%',
                    name: {
                        color: '#333'
                    },
                    // scale: true,
                    // splitNumber: 8,
                    axisLine: {
                        lineStyle: {
                            color: color.linearYtoG,
                            opacity: 0.5
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: color.linearYtoG,
                            opacity: 0.5
                        }
                    },
                    splitArea: {
                        areaStyle: {
                            color: '#fff',
                            opacity: 0.1,
                            shadowBlur: 25,
                            shadowColor: '#fff',
                            shadowOffsetX: 0,
                            shadowOffsetY: 5
                        }
                    },
                    indicator: [{
                        name: '前台挂单数\n\n(' + totalData.frontOfferTotal + ')',
                        max: maxData
                        // min: 1
                    }, {
                        // name: '前台成交订单数\n(' + totalData.frontOrderTotal + ')',
                        max: maxData1
                        // min: 1
                    }, {
                        name: '后台挂单数\n\n(' + totalData.backOfferTotal + ')',
                        max: maxData
                        // min: 1
                    }, {
                        // name: '后台成交订单数\n(' + totalData.backOrderTotal + ')',
                        max: maxData1
                        // min: 1
                    }]
                },
                grid: {
                    left: 528,
                    right: 80,
                    bottom: 60,
                    top: '28%'
                },
                xAxis: {
                    type: 'category',
                    position: 'bottom',
                    axisLine: true,
                    axisLabel: {
                        color: '#333',
                        fontSize: 12
                    },
                    data: weekCategory,
                    axisPointer: {
                        type: 'line',
                        lineStyle: {
                            width: 20,
                            color: 'rgba(21,113,217,0.08)'
                        },
                        label: {
                            show: false,
                            backgroundColor: 'rgba(21,113,217,0.2)',
                            color: '#FD4B0E'
                        }
                    }
                },
                yAxis: {
                    name: '',
                    nameLocation: 'end',
                    nameGap: 24,
                    nameTextStyle: {
                        color: '#333',
                        fontSize: 14
                    },
                    max: maxY,
                    // splitNumber: 4,
                    // maxInterval: 25,
                    axisLine: {
                        lineStyle: {
                            opacity: 0
                        }
                    },
                    splitArea: {
                        show: true,
                        areaStyle: {
                            color: ['rgba(255,255,255,1)', 'rgba(240,240,240,0.3)']
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            // color: '#',
                            opacity: 0.1
                        }
                    }
                },
                series: [{
                    name: '',
                    type: 'radar',
                    symbolSize: 0,
                    tooltip: {
                        trigger: 'item'
                    },
                    itemStyle: {
                        normal: {
                            color: '#43dfa2'
                        }
                    },
                    data: [{
                        value: radarData[0],
                        name: '',
                        areaStyle: {
                            normal: {
                                color: color.linearGtoB,
                                shadowBlur: 15,
                                shadowColor: 'rgba(0,0,0,.2)',
                                shadowOffsetX: 0,
                                shadowOffsetY: 5,
                                opacity: 0.8
                            }
                        }
                    }]
                }, {
                    name: '成交订单',
                    type: 'line',
                    smooth: true,
                    symbol: 'circle',
                    showAllSymbol: true, // 显示所有图形。
                    symbolSize: 8,
                    itemStyle: {
                        normal: {
                            color: '#f93f00',
                            opacity: 0
                        }
                    },
                    lineStyle: {
                        normal: {
                            color: '#f93f00',
                            width: 3,
                            opacity: 0
                        }
                    },
                    data: orderCvr
                }, {
                    name: '挂单签约比例',
                    type: 'line',
                    smooth: true,
                    symbol: 'circle',
                    symbolSize: 8,
                    itemStyle: {
                        normal: {
                            color: '#60aeff'
                        }
                    },
                    lineStyle: {
                        normal: {
                            color: '#60aeff',
                            width: 3
                        }
                    },
                    data: signedCvr
                }]
            };
            this.myChart.setOption(option);
        }
    },
    components: {gyItem}
};
</script>

<style scoped>
.charts-item4 {
   position: relative;
}
.y-name {
   position: absolute;
   top: 14%;
   left: 528px;
}
.indicator-2,.indicator-4 {
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  color: #333;
  font-size: 12px;
  text-align: center;
}
.indicator-4 {
  left: 340px;
}
</style>
<style >
 .el-tooltip__popper.is-light {
      max-width: 420px;
      line-height: 1.8;
      border: 1px solid #e6eaea;
      word-break: break-all;
  }

</style>
