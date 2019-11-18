<!--客户类型-->
<template>
    <gy-item :title="gyItem.title" :titleType="gyItem.titleType" :active="gyItem.active"
             :isBig="gyItem.isBig">
        <div v-if="Statistic3 && Statistic3.length !== 0" id="myChart11" :style="{width: '100%', height: '100%'}"></div>
        <p v-else class="zwsj"><span>暂无数据</span></p>
    </gy-item>
</template>

<script>
import gyItem from './chartsItem.vue';
import {mapGetters} from 'vuex';
import store from '@/store';
export default {
    name: 'customer-type',
    data () {
        return {
            gyItem: {
                title: '客户类型',
                active: '',
                titleType: '',
                isBig: 'charts-item2'
            },
            Statistic3: null,
            userCompanyId: null
        };
    },
    computed: mapGetters([
        'companyId'
    ]),
    watch: {
        companyId (newValue, oldValue) {
            this.statistic3();
        }
    },
    mounted () {
        this.statistic3();
    },
    methods: {
        // 客户类型
        statistic3 () {
            this.userCompanyId = store.state.mutations.companyId;
            this.$http.get(this.$api.charts.statistics + '?statisticsId=14' + (this.userCompanyId ? '&userCompanyId=' + this.userCompanyId : ''))
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
        drawPie () {
            let legend = [];
            const len = this.Statistic3.length > 7 ? 7 : this.Statistic3.length;
            for (let i = 0; i < len; i++) {
                let item = {};
                item.name = this.Statistic3[i].companyTypeName;
                item.value = (this.Statistic3[i].ratio * 100).toFixed(2);
                legend.push(item);
            }
            let myChart = this.$echarts.init(document.getElementById('myChart11'));
            myChart.setOption({
                legend: {
                    orient: 'vertical',
                    left: 340,
                    top: 20,
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
        }
    },
    components: {gyItem}
};
</script>

<style scoped>

</style>
