<!--市场中心-->
<template>
    <gy-item :title="gyItem.title" :titleType="gyItem.titleType" :active="gyItem.active"
             :isBig="gyItem.isBig" :resetData="gyItem.resetData">
        <div v-if="statistics7 && statistics7.length > 0" id="myCharts1" :style="{width: '100%', height: '100%'}"></div>
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
                title: '市场中心',
                active: '当日',
                titleType: 'date',
                isBig: 'charts-item7',
                resetData: 3
            },
            dateType: ['', '当日', '当周', '当月', '总体'],
            statistics7: null,
            userCompanyId: null,
            xAxisData: [],
            seriesData: []
        };
    },
    computed: mapGetters([
        'companyId'
    ]),
    watch: {
        companyId (newValue, oldValue) {
            this.statistic7(1, 1);
        }
    },
    mounted () {
        this.statistic7(1, 1);
    },
    methods: {
        // 订单数 // 交易额
        statistic7 (f, t) {
            this.userCompanyId = store.state.mutations.companyId;
            this.$http.get(this.$api.charts.statistics + '?statisticsId=20&countType=' + t)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.statistics7 = res.data.data;
                        if (this.statistics7.length !== 0) {
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
            this.seriesData = [];
            this.xAxisData = [];
            let p = {
                name: null,
                type: 'bar',
                barMaxWidth: 15,
                data: []
            };
            let p1 = {
                name: null,
                type: 'bar',
                barMaxWidth: 15,
                data: []
            };
            let p2 = {
                name: null,
                type: 'bar',
                barMaxWidth: 15,
                data: []
            };
            this.statistics7.forEach(e => {
                p1.data.push(e.communicatingCount);
                p1.name = '沟通中客户数';
            });
            this.seriesData.push(p1);
            this.statistics7.forEach(e => {
                p.data.push(e.registrationedCount);
                p.name = '注册完成客户数';
            });
            this.seriesData.push(p);
            this.statistics7.forEach(e => {
                p2.data.push(e.totalCount);
                p2.name = '总客户数';
                this.xAxisData.push(e.organizatonName);
            });
            this.seriesData.push(p2);
            let myChart = this.$echarts.init(document.getElementById('myCharts1'));
            let option = {
                color: ['#ED6B75', '#7Bc657', '#FFC277', '#e5323e'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    top: 15
                },
                calculable: true,
                xAxis: [
                    {
                        type: 'category',
                        // axisTick: {show: false},
                        data: this.xAxisData
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: this.seriesData
            };
            myChart.setOption(option);
        },
        resetList (e, t) {
            this.gyItem.active = this.dateType[t];
            this.statistic7(1, t);
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
