<!--客户数据-->
<template>
    <gy-item :title="gyItem.title" :titleType="gyItem.titleType" :active="gyItem.active"
             :isBig="gyItem.isBig" :resetData="gyItem.resetData" :routerData="gyItem.routerData || {}">
        <div id="myChart9" :style="{width: '100%', height: '100%'}"></div>
    </gy-item>
</template>

<script>
import gyItem from './chartsItem.vue';
import {mapGetters} from 'vuex';
import store from '@/store';
export default {
    name: 'customer-data',
    computed: mapGetters([
        'companyId'
    ]),
    watch: {
        companyId (newValue, oldValue) {
            this.statistic(this.role);
        }
    },
    props: {
        gyItem: Object
    },
    data () {
        return {
            role: 1,
            statistics: null,
            dateType: ['', '当日', '当周', '当月', '总体', '当年'],
            dateType1: ['', '日', '周', '月', '', '年'],
            userCompanyId: null
        };
    },
    created () {
        let user = localStorage.getItem('userInfo');
        if (user) {
            let userInfo = JSON.parse(user);
            // 1 中烨(贸易公司) 2 国烨 3 业务员
            userInfo.roles.find((n) => n === 'platformStat') ? (this.role = 2) : (userInfo.isAdmin === 1 ? (this.role = 1) : (this.role = 3));
        }
    },
    mounted () {
        this.statistic(this.role);
    },
    methods: {
        // 客户数据
        statistic (e, t = 1) {
            this.userCompanyId = store.state.mutations.companyId;
            console.log(this.userCompanyId);
            this.$http.get(this.$api.charts.statistics + '?statisticsId=1&countType=' + t + (this.userCompanyId ? '&userCompanyId=' + this.userCompanyId : '111'))
                .then((res) => {
                    if (res.data.code === 0) {
                        this.statistics = res.data.data;
                        Object.keys(res.data.data).map((key) => {
                            res.data.data[key] = res.data.data[key] ? res.data.data[key] : 0;
                        });
                        this.drawBrokenLine2(e, t);
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        drawBrokenLine2 (e, t) {
            let data;
            let isOutside = false;
            switch (e) {
            case 1:
                data = t === 4 ? {
                    seriesData: [
                        {value: this.statistics.total, name: '总客户数', rich: 'a'}
                    ]
                } : {
                    seriesData: [
                        {value: this.statistics.newAdded, name: this.dateType[t] + '新增客户数'},
                        {value: this.statistics.total, name: '总客户数', rich: 'a'}
                    ]
                };
                break;
            case 2:
                data = {
                    seriesData: [
                        {value: this.statistics.newAdded, name: '本月新增客户数'},
                        {value: this.statistics.total, name: '总客户数', rich: 'a'}
                    ]
                };
                break;
            case 3:
                data = t === 4 ? {
                    seriesData: [
                        {value: this.statistics.total, name: '总客户数', rich: 'a'},
                        {value: this.statistics.myTotal, name: '我的客户数', rich: 'd'}
                    ]
                } : {
                    seriesData: [
                        {value: this.statistics.newAdded, name: this.dateType[t] + '新增客户数', rich: 'b'},
                        {value: this.statistics.myNewAdded, name: `我的${this.dateType1[t]}新增客户数`, rich: 'c'},
                        {value: this.statistics.total, name: '总客户数', rich: 'a'},
                        {value: this.statistics.myTotal, name: '我的客户数', rich: 'd'}
                    ]
                };
                isOutside = (this.statistics.total / (this.statistics.newAdded + this.statistics.total + this.statistics.myNewAdded + this.statistics.myTotal) > 0.8);
                break;
            default:
                break;
            }
            let myChart = this.$echarts.init(document.getElementById('myChart9'));
            myChart.setOption({
                title: {
                    // text: this.statistics.total,
                    text: '',
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
                    left: 370,
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
                            rich: {
                                a: {
                                    // padding: [10, 0, 0, 0]
                                    align: 'center'
                                }
                            },
                            formatter: (e) => {
                                if (e.name === '总客户数') {
                                    return '{a|' + '总客户数\n' + e.value + '人' + '}';
                                }
                                let name = e.name + e.value + '人';
                                let strs = name.split('');
                                let str = '';
                                for (let i = 0; i < strs.length; i++) {
                                    str += strs[i];
                                    if ((i + 1) % 5 === 0 && i !== 0) str += '\n';
                                }
                                return '{a|' + str + '}';
                            }
                        },
                        labelLine: {
                            length: 15,
                            length2: (this.statistics.newAdded === 0 && this.statistics.myNewAdded === 0 && this.statistics.myTotal) ? 40 : 10
                        },
                        silent: true,
                        legendHoverLink: false,
                        hoverAnimation: false,
                        radius: ['41%', '56%'],
                        center: isOutside ? ['32.5%', '53%'] : ['32.5%', '50%'],
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
        resetList (t) {
            // this.gyItem.active = t === 3 ? '本月' : '总体';
            this.gyItem.active = this.dateType[t];
            this.statistic(this.role, t);
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
