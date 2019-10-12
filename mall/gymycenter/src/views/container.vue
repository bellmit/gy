<template>
    <div>
        <div class="userCenter">
            <div class="userCenter-side">
                <NavMenu :breadcrumbIndex="breadcrumbIndex" :navData="navData"/>
            </div>
            <div class="userCenter-content" :style="{minHeight: mainHeight + 'px'}">
                <Breadcrumb/>
                <div class="userCenter-main">
                    <router-view :key="contentKey.getTime()"></router-view>
                    <ul class="tools-bar">
                        <li @click="goIm"><a href="javascript:;" class="iconfont icon-imnew"></a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NavMenu from '@/components/navMenu';
import Breadcrumb from '@/components/breadcrumb';
import Bus from '@/config/bus.js';
import {mapGetters} from 'vuex';

export default {
    name: 'userCenterContainer',
    data () {
        return {
            desc: 'userCenterContainer component',
            breadcrumbIndex: '',
            mainHeight: document.documentElement.clientHeight - 106,
            navData: [
                {
                    icon: 'iconfont icon-maijia1',
                    name: '买家中心',
                    // show: true,
                    resourceAccessList: [
                        {
                            name: '采购订单',
                            url: 'purchaseList',
                            frontUrl: 'purchaseList',
                            resourceAccessList: []
                        }
                        // {
                        //     label: '采购需求'
                        // },
                        // {
                        //     label: '我的优惠'
                        // }
                    ]
                },
                {
                    icon: 'iconfont icon-maijia',
                    name: '卖家中心',
                    // show: true,
                    resourceAccessList: [
                        {
                            name: '销售订单',
                            url: 'salesList',
                            frontUrl: 'salesList',
                            resourceAccessList: []
                        },
                        {
                            name: '商城资源',
                            url: 'resourceList',
                            frontUrl: 'resourceList',
                            resourceAccessList: []
                        },
                        {
                            name: '店铺管理',
                            resourceAccessList: [
                                {
                                    name: '图片管理',
                                    url: 'img',
                                    frontUrl: 'img',
                                    resourceAccessList: []
                                },
                                {
                                    name: '企业介绍维护',
                                    url: 'company',
                                    frontUrl: 'company',
                                    resourceAccessList: []
                                }
                            ]
                        }
                        // {
                        //     label: '店铺装修'
                        // },
                        // {
                        //     label: '商家认证'
                        // }
                    ]
                },
                {// 托运方
                    icon: 'iconfont icon-logistics',
                    name: '智运',
                    // show: true,
                    resourceAccessList: [
                        {
                            name: '承运商竞价',
                            url: 'consignBid',
                            frontUrl: 'consignBid',
                            resourceAccessList: []
                        },
                        {
                            name: '运输订单',
                            url: 'transparentOrder',
                            frontUrl: 'transparentOrder',
                            resourceAccessList: []
                        },
                        {
                            name: '运输结算单',
                            url: 'transparentSettlement',
                            frontUrl: 'transparentSettlement',
                            resourceAccessList: []
                        }
                    ]
                },
                {// 承运商
                    icon: 'iconfont icon-logistics',
                    name: '智运',
                    // show: true,
                    resourceAccessList: [
                        {
                            name: '基础数据',
                            resourceAccessList: [
                                {
                                    name: '车辆管理',
                                    url: 'vehicleList',
                                    frontUrl: 'vehicleList',
                                    resourceAccessList: []
                                },
                                {
                                    name: '司机/押运员管理',
                                    url: 'transportUser',
                                    frontUrl: 'transportUser',
                                    resourceAccessList: []
                                }
                            ]
                        },
                        {
                            name: '物流询价单',
                            url: 'acceptBid',
                            frontUrl: 'acceptBid',
                            resourceAccessList: []
                        },
                        {
                            name: '运输订单',
                            url: 'transparentOrder',
                            frontUrl: 'transparentOrder',
                            resourceAccessList: []
                        },
                        {
                            name: '运输结算单',
                            url: 'transparentSettlement',
                            frontUrl: 'transparentSettlement',
                            resourceAccessList: []
                        }
                    ]
                },
                {
                    icon: 'iconfont icon-settle',
                    name: '结算中心',
                    // show: true,
                    resourceAccessList: [
                        {
                            name: '付款单',
                            url: 'paymentList',
                            frontUrl: 'paymentList',
                            resourceAccessList: []
                        },
                        {
                            name: '收款单',
                            url: 'collectionList',
                            frontUrl: 'collectionList',
                            resourceAccessList: []
                        }
                    ]
                },
                {
                    icon: 'iconfont icon-statement',
                    name: '报表中心',
                    // show: true,
                    resourceAccessList: [
                        {
                            name: '交易报表',
                            url: 'statement-deal',
                            frontUrl: 'statement-deal',
                            resourceAccessList: []
                        }
                    ]
                },
                {
                    icon: 'iconfont icon-shezhi',
                    name: '账户管理',
                    // show: true,
                    resourceAccessList: [
                        {
                            name: '资金账户',
                            url: 'accountMoney',
                            frontUrl: 'accountMoney',
                            resourceAccessList: []
                        },
                        {
                            name: '会员账户',
                            url: 'accountCompany',
                            frontUrl: 'accountCompany',
                            resourceAccessList: []
                        },
                        {
                            name: '员工账户管理',
                            url: 'accountSub',
                            frontUrl: 'accountSub',
                            resourceAccessList: []
                        },
                        {
                            name: '安全管理',
                            url: 'accountSecurityManage',
                            frontUrl: 'accountSecurityManage',
                            resourceAccessList: []
                        },
                        {
                            name: '地址管理',
                            url: 'address',
                            frontUrl: 'address',
                            resourceAccessList: []
                        }
                    ]
                },
                {
                    icon: 'iconfont icon-huiyuanzhongxin',
                    name: '积分中心',
                    resourceAccessList: [
                        {
                            name: '我的兑换单',
                            url: 'pointlist',
                            frontUrl: 'pointlist',
                            resourceAccessList: []
                        },
                        {
                            name: '我的等级和积分',
                            url: 'myIntegral',
                            frontUrl: 'myIntegral',
                            resourceAccessList: []
                        },
                        {
                            name: '积分明细',
                            url: 'integralDetail',
                            frontUrl: 'integralDetail',
                            resourceAccessList: []
                        },
                        {
                            name: '积分说明',
                            url: 'IntegralExplanation',
                            frontUrl: 'IntegralExplanation',
                            resourceAccessList: []
                        }
                    ]
                }
            ],
            isConsign: false,
            currentPhone: null
        };
    },
    computed: mapGetters([
        'contentKey'
    ]),
    created () {
        if (localStorage.getItem('userInfo')) {
            this.isConsign = JSON.parse(localStorage.getItem('userInfo')).companyTypeId === 1;
            this.currentPhone = JSON.parse(localStorage.getItem('userInfo')).phone;
            this.navData = JSON.parse(localStorage.userInfo).menuList[0].resourceAccessList;
        }
    },
    mounted () {
        Bus.$on('resetmenuList', (menuList) => {
            this.navData = menuList[0].resourceAccessList;
        });
        window.onresize = () => {
            this.mainHeight = document.documentElement.clientHeight - 106;
        };
        localStorage.removeItem('jump', true);
    },
    methods: {
        getBreadcrumbItem (index) {
            const indexes = index.split(/-/);
            if (indexes.length < 2) {
                return;
            }
            const navDataItem = this.navData[indexes[0]];
            const page = '我的';
            if (!navDataItem) {
                return;
            }
            const first = navDataItem.label;
            const second = navDataItem.items[indexes[1]] && navDataItem.items[indexes[1]].label;
            let third = '';
            let fourth = '';
            if (indexes.length === 3) {
                third = navDataItem.items[indexes[1]].items && navDataItem.items[indexes[1]].items[indexes[2]].label;
            }
            if (indexes.length === 4) {
                fourth = navDataItem.items[indexes[1]].items && navDataItem.items[indexes[1]].items[indexes[2]].items && navDataItem.items[indexes[1]].items[indexes[2]].items[indexes[3]].label;
            }
            return {page, first, second, third, fourth};
        },
        goIm () {
            window.open('/im/#type=2&username=' + window.btoa(this.currentPhone) + '&touser=' + window.btoa(1), '_blank');
        }
    },
    components: {NavMenu, Breadcrumb}
};
</script>

<style lang="scss">
    .userCenter {
        display: flex;
        margin: 10px auto;
        width: 1200px;
        overflow: hidden;
        .userCenter-side {
            background-color: #fff;
            border-right: 1px solid $color-border;
            width: 240px;
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
            .navMenu {
                border: none;
            }
            .el-col-12 {
                width: 100%;
            }
        }
        .userCenter-content {
            background-color: #fff;
            border-left: 7px solid $color-body-bg;
            width: 960px;
            .breadcrumb-box {
                width: 100%;
            }
        }
        .userCenter-main {
            border-top: 7px solid $color-body-bg;
            position: relative;
            .tools-bar {
                position: fixed;
                left: 50%;
                margin-left: 610px;
                top: 178px;
                //transform: translateY(-50%);
                li {
                    background-color: #fff;
                    border-radius: $border-radius-small;
                    border: 1px solid $color-border;
                    line-height: 30px;
                    width: 30px;
                    color: #999;
                    text-align: center;
                    a {
                        display: inline-block;
                        width: 100%;
                        color: $color-extra;
                    }
                }
            }
        }
        .user-box {
            background-color: #fff;
            margin-bottom: 7px;
            h3 {
                line-height: 40px;
                margin: 0;
                font-size: 14px;
                color: #666;
                padding-left: 11px;
                font-weight: normal;
                border-bottom: 1px solid $color-border;
            }
            &:last-child {
                margin-bottom: 0;
            }
        }
        .userCenter-main-tit {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 4px 16px;
        }
        .userCenter-main-tit-left {
            font-size: 16px;
            font-weight: bold;
        }
        .userCenter-main-tit-right-btn {
            margin-right: 10px;
        }
        .btnActive {
            //@include active-button();
            border: 1px solid red;
        }
        .userCenter-main-content {
            border-top: 2px solid #eee;
            padding: 20px;
        }
        .content-query-item-tit {
            font-size: 14px;
            color: #333;
            font-weight: bold;
        }
        .content-query-item-iput {
            width: 45%;
            margin-top: 12px;
            display: inline-block;
        }
        .date-picker-shortcut {
            margin-right: 10px;
        }
        .date-picker-shortcut-aWeek {
            margin-left: 50px;
        }
        .userCenter-main-content-query-tit {
            font-size: 14px;
        }

        .userCenter-query-result {
            margin-top: 20px;
            border: 1px solid #e7ecf1;
        }
        .userCenter-query-result-th {
            background-color: #eef3f8;
            height: 40px;
            line-height: 40px;
            padding-left: 20px;
        }
        .userCenter-query-result-tb-item {
            height: 40px;
            line-height: 40px;
            padding-left: 20px;
        }
        .evenItem {
            background-color: #f7f7f9;
        }
        .content-query-item-type .is-checked .el-checkbox__inner {
            background-color: #409eff !important;
            border-color: #409eff !important;
        }
        .content-query-item-type .is-checked .el-checkbox__label {
            color: #666;
        }
        .content-query-item-type .el-checkbox__inner:hover {
            border-color: #dcdfe6;
        }
        .date-picker .el-input__prefix,
        .date-picker .el-input__suffix {
            top: 0;
        }
    }

    .payment-list .date-picker .el-date-editor {
        width: 164px !important;
    }

    .in-and-out .date-picker .el-date-editor {
        width: 206px !important;
    }

    .container-fluid {
        .el-tabs__item {
            line-height: 35px;
            height: auto;
        }
        .el-submenu__title .icon-logistics {
            font-size: 13px;
        }
        .el-submenu__title {
            line-height: 35px;
            height: auto;
            padding: 0 0 0 20px;
        }
        .el-menu-item-group__title {
            padding: 0;
        }
        .el-menu-item.is-active {
            background-color: #ebf5ff !important;
        }
    }
</style>
