<!--交易品类-->
<template>
    <gy-item :title="gyItem7.title" :titleType="gyItem7.titleType" :active="gyItem7.active"
             :isBig="gyItem7.isBig">
        <div v-if="Statistic4 && Statistic4.length > 0" id="myChart4" :style="{width: '100%', height: '100%'}"></div>
        <p v-else class="zwsj"><span>暂无数据</span></p>
    </gy-item>
</template>

<script>
import gyItem from './chartsItem.vue';
import {mapGetters} from 'vuex';
import store from '@/store';
export default {
    name: 'trading-category',
    data () {
        return {
            gyItem7: {
                title: '交易品类',
                active: '',
                titleType: '',
                isBig: 'charts-item2'
            },
            Statistic4: null,
            userCompanyId: null
        };
    },
    computed: mapGetters([
        'companyId'
    ]),
    watch: {
        companyId (newValue, oldValue) {
            this.statistic4();
        }
    },
    mounted () {
        this.statistic4();
    },
    methods: {
        // 交易品类
        statistic4 () {
            this.userCompanyId = store.state.mutations.companyId;
            this.$http.get(this.$api.charts.statistics + '?statisticsId=15' + (this.userCompanyId ? '&userCompanyId=' + this.userCompanyId : ''))
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
        }
    },
    components: {gyItem}
};
</script>

<style scoped>

</style>
