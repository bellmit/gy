<!--客户组-->
<template>
    <gy-item :title="gyItem.title" :titleType="gyItem.titleType" :active="gyItem.active"
             :isBig="gyItem.isBig" :resetData="gyItem.resetData" class="gy-items">
        <div class="follw">
            <el-select class="follw-select" v-model="usrOrganizationId" @change="changeUser()">
                <el-option
                v-for="(item, index) in followUpGroupList"
                :key="index"
                :label="item.name"
                :value="item.id">
                </el-option>
            </el-select>
        </div>
        <div v-if="statistics7 && statistics7.length > 0" id="myCharts2" :style="{width: '100%', height: '100%'}"></div>
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
                title: '客户组',
                active: '当日',
                titleType: 'dateCustomer',
                isBig: 'charts-item7',
                resetData: 3
            },
            dateType: ['', '当日', '当周', '当月', '总体'],
            statistics7: null,
            userCompanyId: null,
            xAxisData: [],
            seriesData: [],
            followUpGroupList: [],
            usrOrganizationId: null,
            changTime: 1
        };
    },
    computed: mapGetters([
        'companyId'
    ]),
    watch: {
        companyId (newValue, oldValue) {
            this.statisticed7(1, 1);
        }
    },
    mounted () {
        this.followUpGroup('first');
    },
    methods: {
        statisticed7 (f, t, s) {
            this.userCompanyId = store.state.mutations.companyId;
            this.$http.get(this.$api.charts.statistics + '?statisticsId=21&countType=' + t + '&organizationId=' + s)
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
        changeUser () {
            this.statisticed7(1, this.changTime, this.usrOrganizationId);
        },
        // 跟进组
        followUpGroup (value) {
            this.$http.get(this.$api.customer.floorOrganization)
                .then(res => {
                    if (res.data.code === 0) {
                        this.followUpGroupList = res.data.data;
                        if (value === 'first') {
                            this.usrOrganizationId = this.followUpGroupList[0].id;
                            Promise.resolve().then(() => {
                                this.statisticed7(1, 1, this.followUpGroupList[0].id);
                            });
                        }
                    }
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
                this.xAxisData.push(e.username);
            });
            this.seriesData.push(p2);
            let myChart = this.$echarts.init(document.getElementById('myCharts2'));
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
            this.changTime = t;
            this.statisticed7(1, t, this.usrOrganizationId);
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

<style scoped lang="scss">
    .follw{
        position: relative;
        .follw-select{
            position: absolute;
            top: -36px;
            left: 120px;
            width: 200px;
        }
    }
</style>
