<!--客户来源-->
<template>
    <gy-item :title="gyItem.title" :titleType="gyItem.titleType" :active="gyItem.active"
             :isBig="gyItem.isBig">
        <div v-if="Statistic6 && Statistic6.length > 0" id="myChart8" :style="{width: '100%', height: '100%'}"></div>
        <p v-else class="zwsj"><span>暂无数据</span></p>
    </gy-item>
</template>

<script>
import gyItem from './chartsItem.vue';
import {mapGetters} from 'vuex';
import store from '@/store';
export default {
    name: 'customer-source',
    data () {
        return {
            gyItem: {
                title: '客户来源',
                active: '当日',
                titleType: '',
                isBig: 'charts-item2'
            },
            Statistic6: null,
            userCompanyId: null
        };
    },
    computed: mapGetters([
        'companyId'
    ]),
    watch: {
        companyId (newValue, oldValue) {
            this.statistic6();
        }
    },
    mounted () {
        this.statistic6();
    },
    methods: {
        // 客户来源
        statistic6 () {
            this.userCompanyId = store.state.mutations.companyId;
            this.$http.get(this.$api.charts.statistics + '?statisticsId=5' + (this.userCompanyId ? '&userCompanyId=' + this.userCompanyId : ''))
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
        }
    },
    components: {gyItem}
};
</script>

<style scoped>

</style>
