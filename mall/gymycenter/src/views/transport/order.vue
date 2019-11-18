<template>
    <div class="transport-wrap order">
        <!--<h2>运输订单</h2>-->
        <div class="new-title-public">
            运输订单
        </div>
        <div class="t">
            <ul class="tabs">
                <li class="all" :class="{'selected': tabIdx === -1}" @click="tabChange(-1)"><a
                    href="javascript:;">全部</a></li>
                <li v-for="(tab, index) in statusList" :key="index" :class="{'selected': tabIdx === index}"
                    @click="tabChange(index, index)"><a href="javascript:;">{{statusValue[index]}}(<span>{{tab}}</span>)</a>
                </li>
            </ul>
            <div class="search">
                <div class="se-left1">
                    <input type="text" placeholder="请输入品名/单号/装卸地" v-model="orderData.data.keywords">
                    <i class="iconfont icon-search" @click="handleSearch"></i>
                </div>
                <div class="se-left2" @click="showAdvance = !showAdvance">
                    <span>高级搜索</span>
                    <i class="iconfont" :class="{'icon-arrow-down': !showAdvance, 'icon-arrow-up': showAdvance}"></i>
                </div>
            </div>
            <!--<div class="search">-->
                <!--<i class="iconfont icon-search" @click="handleSearch"></i>-->
                <!--<input type="text" placeholder="请输入品名、单号" v-model="orderData.data.keywords" class="gy-input"-->
                       <!--@keyup.13="handleSearch">-->
                <!--<i class="iconfont" :class="{'icon-arrow-down': !showAdvance, 'icon-arrow-up': showAdvance}"-->
                   <!--@click="showAdvance = !showAdvance"></i>-->
            <!--</div>-->
            <transport-search :show-advance="showAdvance" :keywords="orderData.data.keywords"
                              :advance.sync="orderData.data" :search-info.sync="orderInfo" :search-type="searchType"
                              :count-status.sync="statusList"></transport-search>
        </div>
        <div class="bid-body">
            <consign-table :orderList="orderInfo.list" :theadList="theadList" :No="No"></consign-table>
            <span class="total-number">共 {{orderInfo.total}} 条记录</span>
        </div>
        <div class="pagination-box" v-if="orderInfo.total > orderInfo.pageSize">
            <el-pagination
                background
                layout="prev, pager, next"
                :current-page.sync="orderInfo.pageNum"
                :page-size="orderInfo.pageSize"
                :total="orderInfo.total"
                @current-change="handleCurrentChange">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import consignTable from '@/components/consignTable';
import transportSearch from '@/components/transportSearch';

export default {
    data () {
        return {
            statusValue: ['签约中', '实施中', '结算中', '付款中', '已完成', '已失效'],
            tabIdx: -1,
            statusList: [],
            orderInfo: {
                list: {
                    enquiryNoteItemList: []
                }
            },
            orderData: {
                pageNum: 1,
                pageSize: 10,
                data: {
                    carrierId: null,
                    consignmentNoteStatus: null,
                    consignorId: null,
                    keywords: null
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
                    value: '托运方名称',
                    width: '150'
                },
                {
                    id: 3,
                    value: '装货地',
                    width: '180'
                },
                {
                    id: 4,
                    value: '卸货地',
                    width: '180'
                },
                {
                    id: 5,
                    value: '状态',
                    width: '108'
                },
                {
                    id: 6,
                    value: '操作',
                    width: '108'
                }
            ],
            No: 0,
            showAdvance: false,
            searchType: 0
        };
    },
    components: {
        consignTable,
        transportSearch
    },
    created () {
        if (localStorage.getItem('userInfo')) {
            let userInfo = JSON.parse(localStorage.getItem('userInfo'));
            let companyId = userInfo.companyId;
            if (userInfo.companyTypeId === 2) {
                this.orderData.data.carrierId = companyId;
                this.theadList[1].value = '托运方';
            } else {
                this.orderData.data.consignorId = companyId;
                this.theadList[1].value = '承运商';
            }
        }
        this.getOrderList(1);
        this.getOrderStatus();
    },
    methods: {
        handleSearch () {
            this.getOrderList(1);
            this.getOrderStatus();
        },
        getOrderList (n) {
            this.orderData.pageNum = n;
            this.$http.post(this.$api.transport.orderList, this.orderData)
                .then(res => {
                    this.orderInfo = res.data.data;
                });
        },
        getOrderStatus () {
            this.$http.post(this.$api.transport.orderStatus, this.orderData.data)
                .then(res => {
                    this.statusList = res.data.data;
                });
        },
        tabChange (idx, status) {
            this.tabIdx = idx;
            this.orderData.data.consignmentNoteStatus = status;
            this.getOrderList(1);
        },
        handleCurrentChange (r) {
            this.getOrderList(r);
        }
    }
};
</script>
<style lang="scss" scoped>
    .transport-wrap{
        .t{
            overflow: initial;
        }
        .t:after{display:block;clear:both;content:"";visibility:hidden;height:0}
    }
</style>
