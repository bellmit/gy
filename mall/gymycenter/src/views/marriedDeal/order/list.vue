<template>
    <div class="transport-wrap order marriedDeal">
        <div class="new-title-public">
            {{isMain ? '撮合主界面' : '撮合订单'}}
        </div>
        <div class="t">
            <ul class="tabs">
                <li class="all" :class="{'selected': tabIdx === -1}" @click="tabChange(-1)"><a href="javascript:;">全部</a></li>
                <li v-for="(tab, index) in statusList" :key="index" :class="{'selected': tabIdx === index}" @click="tabChange(index)"><a
                  href="javascript:;">{{tab.label}}(<span>{{tab.count}}</span>)</a></li>
            </ul>
            <div class="search">
                <div class="search-box">
                    <input type="search" placeholder="请输入品名/单号" v-model="listData.data.keywords" @keyup.13="getList">
                    <i class="iconfont icon-search" @click="getList"></i>
                </div>
                <span class="search-btn" @click="toggleSelect = !toggleSelect">高级搜索<i class="iconfont" :class="toggleSelect ? 'icon-arrow-up' : 'icon-arrow-down'"></i></span>
            </div>
        </div>
        <div v-if="toggleSelect" class="isshow gy-form">
            <div class="gy-form-group">
                <span class="l">买方公司</span>
                <div class="company-list">
                    <input placeholder="请输入" type="text" class="gy-input" v-model="listData.data.buyerCompanyName" @keyup.enter="handleSearchComapany(0)" @click="listData.data.buyerCompanyId = '';listData.data.buyerCompanyName = ''">
                    <i class="iconfont icon-mySearch"  @click="handleSearchComapany(0)"></i>
                    <ul class="company-list"  v-show="showBuyerCompany">
                        <li v-for="(item, index) in buyerCompanyList" :key="index" @click="handleSelectComapany(item, 0)" v-if="buyerCompanyList.length > 0">
                            {{item.companyName}}
                        </li>
                        <li class="none-tips" v-if="buyerCompanyList.length === 0">没有搜到相关公司</li>
                    </ul>
                </div>
            </div>
            <div class="gy-form-group">
                <span class="l">卖方公司</span>
                <div class="company-list">
                    <input placeholder="请输入" type="text" class="gy-input" v-model="listData.data.sellerCompanyName" @keyup.enter="handleSearchComapany(1)" @click="listData.data.sellerCompanyId = '';listData.data.sellerCompanyName = ''">
                    <i class="iconfont icon-mySearch"  @click="handleSearchComapany(1)"></i>
                    <ul class="company-list"  v-show="showSellerCompany">
                        <li v-for="(item, index) in sellerCompanyList" :key="index" @click="handleSelectComapany(item, 1)" v-if="sellerCompanyList.length > 0">
                            {{item.companyName}}
                        </li>
                        <li class="none-tips" v-if="sellerCompanyList.length === 0">没有搜到相关公司</li>
                    </ul>
                </div>
            </div>
            <div class="gy-form-group">
                <span class="l">交割库</span>
                <div class="company-list">
                    <input placeholder="请输入" type="text" class="gy-input" v-model="listData.data.deliveryWarehouseName" @keyup.enter="handleSearchWarehouse" @click="listData.data.deliveryWarehouseId = '';listData.data.deliveryWarehouseName = ''">
                    <i class="iconfont icon-mySearch"  @click="handleSearchWarehouse"></i>
                    <ul class="company-list"  v-show="showWarehouse">
                        <li v-for="(item, index) in warehouseList" :key="index" @click="handleSelectWarehouse(item)" v-if="warehouseList.length > 0">
                            {{item.name}}
                        </li>
                        <li class="none-tips" v-if="warehouseList.length === 0">没有搜到相关交割库</li>
                    </ul>
                </div>
            </div>
            <div class="gy-form-group last-group">
                <span class="l">创建时间</span>
                <el-date-picker
                  type="daterange"
                  align="right"
                  unlink-panels
                  range-separator="至"
                  v-model="dateRange"
                  start-placeholder='开始时间'
                  end-placeholder='结束时间'>
                </el-date-picker>
                <i class="iconfont icon-search search_btn" @click="getList"></i>
            </div>
        </div>
        <div class="bid-body">
            <table class="gy-table list">
                <thead>
                <tr class="title">
                    <td v-for="(td, index) in theadList" :key="index" :style='"width:" + td.width + "px"'>{{td.value}}</td>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, index) in orderInfo.list" :key="index">
                    <td :colspan="theadList.length" class="item">
                        <div class="item-t">
                            <span class="fl"><strong>单号：</strong>{{item.dmkOrderSn}}</span>
                            <span class="fr"><strong>订单日期：</strong>{{item.createdDate | date}}</span>
                        </div>
                        <table class="gy-table">
                            <tr>
                                <td class="td-240">
                                    <div class="pro-info">
                                        <span class="img" :style="'background-image: url(' + item.skuImage + ')'"></span><span
                                        class="name">{{item.skuName}}<br>{{item.dmkOrderPriceStr + '元/吨'}}<br>{{item.dmkOrderQuantityStr}}吨</span>
                                    </div>
                                </td>
                                <td class="td-180">{{item.sellerCompanyName}}</td>
                                <td class="td-180">{{item.buyerCompanyName}}</td>
                                <td class="td-150 text-r">{{item.dmkOrderAmountStr}}</td>
                                <td class="td-108">{{statusValue[item.dmkOrderStatus]}}</td>
                                <td class="td-108 text-r">{{item.serviceAmountStr}}</td>
                                <td class="td-108 align-c">
                                    <router-link :to="{ name: 'marriedDealOrderDetail', query: {id: item.id} }" class="gy-button-view">查看</router-link>
                                    <div v-if="item.companyType === 1 && item.buyerStatus === 0 && item.dmkOrderStatus === 0"><a href="javascript:;" class="gy-button-view" @click="operateOrder(1, item.id)">确认订单</a><a href="javascript:;" class="gy-button-view" @click="operateOrder(2, item.id)">驳回订单</a></div>
                                    <div v-if="item.companyType === 2">
                                        <a href="javascript:;" class="gy-button-view" @click="operateOrder(1, item.id)" v-if="item.sellerStatus === 0">确认订单</a>
                                        <a href="javascript:;" class="gy-button-view" @click="operateOrder(2, item.id)" v-if="item.sellerStatus === 0">驳回订单</a>
                                        <router-link v-if="item.dmkOrderStatus === 1" :to="{ name: 'reAdd', query: {orderId: item.id, typeId: 4} }" class="gy-button-view">发起订单</router-link>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                </tbody>
            </table>
            <span class="total-number">共 {{orderInfo.total}} 条记录</span>
        </div>
        <div class="pagination-box">
            <el-pagination
                background
                layout="prev, pager, next"
                :current-page.sync="orderInfo.pageNum"
                :page-size="listData.pageSize"
                :total="orderInfo.total"
                @current-change="handleCurrentChange">
            </el-pagination>
        </div>
    </div>
</template>
<script>

export default {
    data () {
        return {
            tabIdx: -1,
            companyTypeId: null,
            buyerCompanyName: null,
            buyerCompanyList: [],
            sellerCompanyName: null,
            sellerCompanyList: [],
            showBuyerCompany: false,
            showSellerCompany: false,
            warehouseName: null,
            showWarehouse: false,
            warehouseList: [],
            statusList: {},
            statusValue: ['待确认', '已确认', '已驳回', '已确认'],
            orderInfo: {},
            listData: {
                pageNum: 1,
                pageSize: 10,
                data: {
                    dmkOrderStatus: null,
                    keywords: null,
                    buyerCompanyId: null,
                    sellerCompanyId: null,
                    buyerCompanyName: null,
                    sellerCompanyName: null,
                    deliveryWarehouseId: null,
                    deliveryWarehouseName: null,
                    startTime: null,
                    endTime: null
                }
            },
            theadList: [
                {
                    id: 1,
                    value: '商品',
                    width: '240'
                },
                {
                    id: 2,
                    value: '卖方公司',
                    width: '180'
                },
                {
                    id: 3,
                    value: '买方公司',
                    width: '180'
                },
                {
                    id: 4,
                    value: '交易金额(元)',
                    width: '150'
                },
                {
                    id: 5,
                    value: '状态',
                    width: '108'
                },
                {
                    id: 6,
                    value: '服务费(元)',
                    width: '108'
                },
                {
                    id: 7,
                    value: '操作',
                    width: '108'
                }
            ],
            toggleSelect: false,
            dateRange: null
        };
    },
    props: {
        isMain: false
    },
    created () {
        this.init();
    },
    methods: {
        init () {
            this.companyTypeId = JSON.parse(localStorage.getItem('userInfo')).companyTypeId;
            this.getStatusCount();
            this.getList();
        },
        getStatusCount () {
            this.$http.post(this.$api.marriedDeal.status, {companyType: this.companyTypeId})
                .then(res => {
                    this.statusList = res.data.data;
                }).catch(() => {
                    console.log('出错了');
                });
        },
        getList () {
            if (this.dateRange) {
                this.listData.data.startTime = this.dateRange[0];
                this.listData.data.endTime = this.dateRange[1];
            } else {
                this.listData.data.startTime = null;
                this.listData.data.endTime = null;
            }
            this.$http.post(this.$api.marriedDeal.list, this.listData)
                .then(res => {
                    this.orderInfo = res.data.data;
                }).catch(() => {
                    console.log('出错了');
                });
        },
        handleSearchComapany (type) {
            this.$http.post(this.$api.order.creatOrderCompanies, {
                companyTypeId: 1,
                name: type === 0 ? this.listData.data.buyerCompanyName : this.listData.data.sellerCompanyName
            })
                .then(res => {
                    if (type === 0) {
                        this.showBuyerCompany = true;
                        this.buyerCompanyList = res.data.data;
                    } else {
                        this.showSellerCompany = true;
                        this.sellerCompanyList = res.data.data;
                    }
                }).catch(() => {
                    console.log('出错了');
                });
        },
        handleSelectComapany (item, type) {
            if (type === 0) {
                this.showBuyerCompany = false;
                this.listData.data.buyerCompanyName = item.companyName;
                this.listData.data.buyerCompanyId = item.companyId;
            } else {
                this.showSellerCompany = false;
                this.listData.data.sellerCompanyName = item.companyName;
                this.listData.data.sellerCompanyId = item.companyId;
            }
        },
        handleSearchWarehouse () {
            this.$http.get(this.$api.offers.warehouses + this.listData.data.deliveryWarehouseName)
                .then(res => {
                    this.showWarehouse = true;
                    this.warehouseList = res.data.data;
                }).catch(() => {
                    console.log('出错了');
                });
        },
        handleSelectWarehouse (item) {
            this.showWarehouse = false;
            this.listData.data.deliveryWarehouseName = item.name;
            this.listData.data.deliveryWarehouseId = item.id;
        },
        tabChange (idx) {
            this.tabIdx = idx;
            this.listData.data.dmkOrderStatus = (idx === -1) ? null : idx;
            this.getList();
        },
        handleCurrentChange (p) {
            this.listData.pageNum = p;
            this.getList();
        },
        operateOrder (t, id) {
            let message;
            message = t === 1 ? '确定确认该撮合订单吗？' : '确定驳回该撮合订单吗？';
            this.$confirm(message, '提示', {type: 'warning'})
                .then(() => {
                    this.$http.post(this.$api.marriedDeal.operate, {
                        statusType: t,
                        id: id
                    })
                        .then(res => {
                            if (res.data.code === 0) {
                                this.getList();
                                this.getStatusCount();
                                return;
                            }
                            this.$alert(res.data.message, '出错了', {type: 'error'});
                        });
                });
        }
    }
};
</script>
<style lang="scss" scoped>
    .transport-wrap{
        .company-list{
            position: relative;
            ul{
                background-color: #fff;
                width: 100%;
                max-height: 200px;
                overflow: auto;
                position: absolute;
                left: 0;
                top: 31px;
                z-index: 9;
                border: 1px solid $color-border;
                border-top: none;
                li{
                    padding: 5px 10px;
                    cursor: pointer;
                    &:hover{
                        background-color: #f5f7fa;
                        color: $color-extra;
                    }
                    &.none-tips{
                        font-size: $small-font;
                        text-align: center;
                    }
                }
            }
            .icon-mySearch{
                position: absolute;
                right: 7px;
                top: 0px;
            }
        }
    }
    .td-240 {
        width: 240px;
    }

    .td-180 {
        width: 180px;
    }

    .td-150 {
        width: 150px;
    }

    .td-108 {
        width: 108px;
    }

    .td-100 {
        width: 100px;
    }

    .td-222 {
        width: 222px;
    }

    .td-210 {
        width: 210px;
    }

    .td-120 {
        width: 120px;
    }
    .gy-button-view {
        margin-right: 5px;
    }
    .transport-wrap.order .t .search {
        padding: 20px 16px;
    }
    .isshow {
        padding-bottom: 20px;
    }
    .last-group {
        position: relative;
    }
    .search_btn{
        position: absolute;
        top: 10px;
        right: 10px;
    }
    .search-box {
        display: inline-block;
        width: 216px;
        border-bottom: 1px solid $color-light;
        input {
            width: 190px;
            height: 30px;
            color: #666;
            border: none;
            font-size: 14px;
        }
        button {
            display: inline-block;
            width: 60px;
            color: $color-main;
            border: none;
            background-color: #fff;
            text-align: right;
        }
        span {
            color: $color-light;
            padding-left: 20px
        }
    }
    .total-text {
        font-size: 14px;
    }
    .text-r {
        text-align: right;
    }
</style>
<style lang="scss">
    .marriedDeal {
        .el-input__inner {
            height: 30px !important;
        }
        .el-range-separator {
            line-height: 24px !important;
        }
    }
</style>
