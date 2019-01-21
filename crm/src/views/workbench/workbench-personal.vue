<template>
<div style="padding-bottom: 30px">
    <!--<div class="page-title">-->
        <!--<span>工作台</span>-->
    <!--</div>-->
    <div class="workbench-row">
        <div class="workbench-item digital-statistics">
            <gy-item :title="gyItem1.title" :titleType="gyItem1.titleType" :active="gyItem1.active"
                     :isBig="gyItem1.isBig" :resetData="gyItem1.resetData" :routerData="gyItem1.routerData">
                <div id="myChart9" :style="{width: '100%', height: '100%'}"></div>
            </gy-item>
        </div>
        <div class="workbench-item digital-statistics">
            <div class="item-title">
                <span class="title">快捷方式</span>
            </div>
            <div class="item-content">
                <div class="shortcut">
                    <div>
                        <span class="gy-button-normal" @click="$router.push( 'add')">
                            <i class="iconfont icon-new-customers"></i>
                            新增客户
                        </span>
                        <!--<span class="gy-button-normal">-->
                            <!--<i class="iconfont icon-new-clues"></i>-->
                            <!--新增线索-->
                        <!--</span>-->
                        <!--<span class="gy-button-normal">-->
                            <!--<i class="iconfont icon-new-contacts"></i>-->
                            <!--新增联系人-->
                        <!--</span>-->
                        <!--<span class="gy-button-normal">-->
                            <!--<i class="iconfont icon-new-follow-up"></i>-->
                            <!--新增跟进-->
                        <!--</span>-->
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="workbench-row">
        <div class="workbench-item digital-statistics">
            <div class="item-title">
                <span class="title">客户列表</span>
                <span class="isMore" @click="$router.push({name: 'list'})">更多</span>
            </div>
            <div class="item-content">
                <div class="customer-wrapper" v-if="customerList.length === 0">
                    <div style="text-align: center;line-height: 115px;">暂无数据</div>
                </div>
                <div class="customer-wrapper">
                    <div class="customer-item customer-item1" @click="goDetail(index)" v-for="(item, index) in customerList" :key="index">
                        <div class="customer-item-text">{{item.customerName}}</div>
                        <div class="customer-item-date">{{item.createdDate | date}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="workbench-item digital-statistics">
            <div class="item-title">
                <span class="title">跟进提醒</span>
                <span class="isMore" @click="$router.push({name: 'customertrack'})">更多</span>
            </div>
            <div class="item-content">
                <div class="customer-wrapper">
                    <div class="customer-wrapper" v-if="followUpReminder.length === 0">
                        <div style="text-align: center;line-height: 115px;">暂无数据</div>
                    </div>
                    <div class="customer-item" v-for="(item, index) in followUpReminder" :key="index">
                        <div class="customer-item-text1">{{item.customerName}}</div>
                        <div class="customer-item-type">{{item.trackStatusDictName}}</div>
                        <div class="customer-item-date">{{item.trackDate | date}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import gyItem from './../data-management/chartsItem.vue';
export default {
    data () {
        return {
            role: 1,
            gyItem1: {
                title: '客户数据',
                active: '本月',
                // titleType: 'date2',
                titleType: 'router',
                isBig: '',
                resetData: 1,
                routerData: {
                    link: 'echarts',
                    text: '更多'
                }
            },
            customerList: [
                // {
                //     customerName: '',
                //     createdDate: ''
                // }
            ],
            followUpReminder: [
                // {
                //     customerName: '',
                //     trackStatusDictName: '',
                //     trackDate: ''
                // }
            ],
            search: {
                data: {
                    customerId: null,
                    customerName: null,
                    followUserId: null,
                    companyType: null,
                    dataCategory: '2',
                    products: null,
                    customerScale: null,
                    customerStatus: null
                },
                keywords: '',
                pageNum: 1,
                pageSize: 5
            },
            statistics: []
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
            this.getStatistics(3);
            this.getCustomerList();
            this.getCollectionList();
        },
        goDetail (idx) {
            this.$router.push({
                name: 'detail',
                query: {
                    viewType: 1,
                    id: this.customerList[idx].id
                }
            });
        },
        getStatistics (e) {
            this.$http.get(this.$api.charts.statistics + '?statisticsId=1&countType=' + e)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.statistics = res.data.data;
                        this.drawBrokenLine(e);
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        drawBrokenLine (type) {
            let data = type === 3 ? {
                seriesData: [
                    {value: this.statistics.newAdded, name: '本月新增客户数'},
                    // {value: this.statistics.total, name: '客户数'}
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
        getCustomerList () {
            this.$http.post(this.$api.workbench.recommendlist, this.search)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.customerList = res.data.data.list;
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        getCollectionList () {
            let params = {
                data: {
                    customerId: '', // 公司名称
                    customerManagerId: '', // 客户经理id
                    customerName: '', // 客户名称
                    startDate: '', // 开始时间
                    endDate: '', // 结束时间
                    trackStatusDictId: '' // 跟进状态id
                },
                pageNum: 1,
                pageSize: 5,
                keywords: ''
            };
            this.$http.post(this.$api.customer.customersearch, params)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.followUpReminder = res.data.data.list;
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        resetList (e, t) {
            switch (e) {
            case 1 :
                this.gyItem1.active = t === 3 ? '本月' : '总体';
                this.getStatistics(t);
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
    height: 35px;
    line-height: 35px;
    padding-left: 15px;
    margin-bottom: 5px;
    border-bottom: 1px solid $color-border;
    span{
        font-size: 16px;
        font-weight: bold;
        color: #333;
    }
    div {
        float: right;
    }
}
.workbench-row {
    display: flex;
    padding: 10px 15px 0 15px;
    .workbench-item {
        flex: 1;
        max-width: calc(50% - 10px);
        display: flex;
        flex-direction: column;
        margin-right: 10px;
        border: 1px solid $color-border;
        .item-title {
            flex: 0 0 40px;
            line-height: 40px;
            padding-left: 15px;
            border-bottom: 1px solid $color-border;
            position: relative;
            display: flex;
            .title {
                flex: 1;
                font-size: 16px;
                color: $color-title;
                font-weight: bold;
            }
            .item-header-item {
                flex: 1;
                line-height: 34px;
                .title {
                    padding-left: 20px;
                    font-size: 18px;
                    font-weight: 600;
                }
                ul {
                    display: flex;
                    justify-content: flex-end;
                    li {
                        flex: 0 0 30px;
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
            .isMore {
                position: absolute;
                right: 15px;
                top: 0;
                line-height: 39px;
                font-size: 14px;
                font-weight: 100;
                cursor: pointer;
                &:hover {
                    color: $color-a-active;
                }
            }
            .item-num {
                color: $color-main;
                padding-right: 20px;
                span {
                    color: $color-highlight;
                }
            }
        }
        .item-content {
            flex: 1;
            min-height: 164px;
            .number {
                display: flex;
                flex-direction: column;
                min-height: 150px;
                font-size: 24px;
                font-weight: 600;
                text-align: center;
                color: $color-a-active;
                .space {
                    flex: 1;
                }
                .text-num{
                    flex: 0 0 35px;
                }
            }
            .customer-wrapper {
                padding: 8px 0;
                min-height: 115px;
                .customer-item {
                    display: flex;
                    line-height: 1;
                    padding: 8px 15px;
                    .customer-item-text {
                        flex: 1;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                    .customer-item-text1 {
                        flex: 2;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                    .customer-item-type {
                        flex: 1;
                        text-align: center;
                    }
                    .customer-item-date {
                        flex: 1;
                        text-align: right;
                    }
                }
                .customer-item1 {
                    cursor: pointer;
                    &:hover {
                        background: $color-body-bg;
                        .customer-item-text {
                            color: $color-a-active;
                        }
                    }
                }
            }
            .shortcut {
                height: 145px;
                padding: 10px;
                text-align: left;
                /*display: flex;*/
                /*flex-direction: column;*/
                /*justify-content: center;*/
                /*div {*/
                    /*flex: 0 0 32px;*/
                /*}*/
                .gy-button-normal {
                    margin-right: 10px;
                }
                .gy-button-normal {
                    padding: 4px 16px;
                    .icon-new-customers {
                        font-size: 24px;
                    }
                }
            }
            .myChart5 {
                margin: 0 auto;
                width: 480px;
                .company-level {
                    display: flex;
                    width: 100%;
                    .company-name {
                        flex: 1;
                        text-align: center;
                    }
                }
            }
            .total-statistics {
                display: flex;
                justify-content: center;
                .statistics-item {
                    flex: 0 0 120px;
                    display: flex;
                    .text {
                        flex: 1;
                    }
                    .value {
                        flex: 1;
                    }
                }
            }
            .company-trading-volume {
                display: flex;
                padding: 5px 10px;
                .company-name {
                    flex: 0 0 115px;
                    display: flex;
                    flex-direction: column;
                    .name-item {
                        flex: 1;
                        padding-top: 12px;
                        line-height: 1.2;
                    }
                }
                .company-chart {
                    flex: 0 0 350px;
                }

                .statistical-unit {
                    flex: 0 0 80px;
                    text-align: center;
                }
            }
        }
    }
    /deep/ .charts-item {
        flex: 1;
        min-height: 260px;
        box-sizing: border-box;
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
}
</style>
