<!--客户所在地概览-->
<template>
    <gy-item :title="gyItem.title" :titleType="gyItem.titleType" :active="gyItem.active"
             :isBig="gyItem.isBig">
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
</template>

<script>
import gyItem from './chartsItem.vue';
import 'echarts/map/js/china.js';
export default {
    name: 'customer-location',
    data () {
        return {
            gyItem: {
                title: '客户所在地概览',
                active: '当日',
                titleType: '',
                isBig: 'charts-item1'
            },
            customers: [
                // {
                //     provinceName: '',
                //     total: ''
                // }
            ]
        };
    },
    mounted () {
        this.customerArea();
    },
    methods: {
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
        }
    },
    components: {gyItem}
};
</script>

<style lang="scss" scoped>
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
                    flex: 0 0 100px;
                    color: $color-title;
                }
                .customer-value {
                    flex: 1;
                }
            }
        }
    }
</style>
