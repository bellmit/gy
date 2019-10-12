<template>
    <div style="padding-bottom: 30px">
        <div class="page-title">数据看板</div>
        <div class="company-wrapper" v-if="role1 === 2">
            <div class="company-item">
                <div class="title">当前公司名称:</div><p class="company-name">{{companyName}}</p>
            </div>
            <div class="company-item" v-clickOutside="companyHide">
                <div class="search-ipt">
                    <label><input class="gy-input" type="text" placeholder="请输入公司名称" v-model="search.companyName" @keyup.enter="getCompany"></label>
                    <i class="iconfont icon-search" @click="getCompany"></i>
                    <div class="managerList" v-if="companyShow">
                        <ul>
                            <li v-for="(item,index) in companyList" :key="index" @click="companySelect(item)" v-if="companyList && companyList.length > 0">
                                {{item.name}}
                            </li>
                            <li class="managerEmpty" @click="companyHide" v-if="companyList && companyList.length === 0">没有搜到相关公司</li>
                        </ul>
                    </div>
                </div>
                <div class="search-btn"></div>
            </div>
        </div>
        <salesman v-if="role === 3" :gyItem="gyItem"></salesman>
        <super-admin v-if="role === 2" :gyItem="gyItem"></super-admin>
        <trading-company v-if="role === 1" :gyItem="gyItem"></trading-company>
    </div>
</template>

<script>
import superAdmin from './super-admin.vue'; // 国烨
import tradingCompany from './trading-company.vue'; // 贸易公司
import salesman from './salesman.vue'; // 业务员
import store from '@/store';

const clickOutside = {
    bind (el, binding) {
        function documentHandler (e) {
            if (el.contains(e.target)) {
                return false;
            }
            if (binding.expression) {
                binding.value(e);
            }
        }
        el.vueClickOutside = documentHandler;
        document.addEventListener('click', documentHandler);
    },
    unbind (el) {
        document.removeEventListener('click', el.vueClickOutside);
        delete el.vueClickOutside;
    }
};

export default {
    data () {
        return {
            search: {
                companyName: null
            },
            companyShow: false,
            companyList: [
                // {
                //     name: 'a',
                //     companyId: 103
                // }
            ],
            role: 1,
            role1: 1,
            gyItem: {
                title: '客户数据',
                active: '当日',
                titleType: 'date2',
                isBig: 'charts-item2',
                resetData: 1
            },
            companyName: null,
            companyId: null,
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
            ]
        };
    },
    created () {
        let user = localStorage.getItem('userInfo');
        if (user) {
            let userInfo = JSON.parse(user);
            this.companyName = userInfo.companyName;
            this.companyId = userInfo.companyId;
            // 1 中烨(贸易公司) 2 国烨 3 业务员
            userInfo.roles.find((n) => n === 'platformStat') ? (this.role = 2) : (userInfo.isAdmin === 1 ? (this.role = 1) : (this.role = 3));
            // userInfo.roles.find((n) => n === 'platformStat') ? (this.role1 = 2) : (userInfo.isAdmin === 1 ? (this.role1 = 1) : (this.role1 = 3));
            if (this.role === 2) {
                this.gyItem.titleType = '';
            }
        }
    },
    methods: {
        resetList (e, t) {
        },
        getCompany () {
            this.$http.get(this.$api.charts.getCompany + this.search.companyName)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.companyList = res.data.data;
                        this.companyShow = true;
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        companyHide () {
            this.companyShow = false;
        },
        companySelect (item) {
            store.commit('updateCompanyId', item.companyId === this.companyId ? null : item.companyId);
            this.role = item.companyId === this.companyId ? 2 : 1;
            this.companyHide();
            this.search.companyName = item.name;
            this.companyName = item.name;
        }
    },
    provide () {
        return {
            resetList: this.resetList
        };
    },
    components: {
        superAdmin,
        tradingCompany,
        salesman
    },
    directives: {
        clickOutside
    }
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

    .company-wrapper {
        padding: 10px 5px 0 15px;
        height: 46px;
        display: flex;
        .company-item {
            flex: 1;
            display: flex;
            .title {
                flex: 0 0 98px;
            }
            .company-name {
                width: 450px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
            .search-ipt {
                flex: 1;
                padding:0 10px 0 80px;
                position: relative;
                .icon-search {
                    position: absolute;
                    right: 12px;
                    top: 0;
                }
                .managerList {
                    position: absolute;
                    right: 10px;
                    top: 30px;
                    z-index: 999;
                    width: calc(100% - 90px);
                    max-height: 260px;
                    background: #fff;
                    overflow-y: auto;
                    ul {
                        max-height: 260px;
                        overflow: auto;
                        padding: 10px 0;
                        border: 1px solid $color-border;
                        li {
                            padding: 0 10px;
                            cursor: pointer;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            &:hover {
                                background-color: #f5f7fa;
                                color: #4a90e2;
                            }
                        }
                    }
                }
            }
        }
    }

    /deep/ .charts-row {
        display: flex;
        min-height: 260px;
        padding: 10px 5px 0 15px;
        .charts-item {
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

    /deep/ .charts-row1 {
        .charts-item {
            .item-content {
                min-height: 400px;
            }
        }
    }

    /deep/ .zwsj {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        flex-direction: column;
        text-align: center;
    }
</style>
