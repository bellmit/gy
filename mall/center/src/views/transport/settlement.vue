<template>
    <div class="transport-wrap order">
        <div class="new-title-public">
            运输结算单
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
                <div class="se_left1">
                    <input type="text" placeholder="请输入品名/单号/装卸地" v-model="chargeData.data.keywords">
                    <i class="iconfont icon-search" @click="handleSearch"></i>
                </div>
                <div class="se_left2" @click="showAdvance = !showAdvance">
                    <span>高级搜索</span>
                    <i class="iconfont" :class="{'icon-arrow-down': !showAdvance, 'icon-arrow-up': showAdvance}"></i>
                </div>
            </div>
            <!--<div class="search">-->
                <!--<i class="iconfont icon-search" @click="handleSearch"></i>-->
                <!--<input type="text" placeholder="请输入品名、单号" class="gy-input" v-model="chargeData.data.keywords"-->
                       <!--@keyup.13="handleSearch">-->
                <!--<i class="iconfont" :class="{'icon-arrow-down': !showAdvance, 'icon-arrow-up': showAdvance}"-->
                   <!--@click="showAdvance = !showAdvance"></i>-->
            <!--</div>-->
            <transport-search :show-advance="showAdvance" :keywords="chargeData.data.keywords"
                              :advance.sync="chargeData.data" :search-info.sync="chargeInfo" :search-type="searchType"
                              :count-status.sync="statusList"></transport-search>
        </div>
        <div class="bid-body">
        <consign-table :orderList="chargeInfo.list" :theadList="theadList" :No="No"></consign-table>
            <span class="total-number">共 {{chargeInfo.total}} 条记录</span>
        </div>
        <div class="pagination-box" v-if="chargeInfo.total > chargeInfo.pageSize">
            <el-pagination
                background
                layout="prev, pager, next"
                :current-page.sync="chargeInfo.pageNum"
                :page-size="chargeInfo.pageSize"
                :total="chargeInfo.total"
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
            statusValue: ['进行中', '已完成', '已失效'],
            tabIdx: -1,
            statusList: [],
            chargeInfo: {},
            chargeData: {
                pageNum: 1,
                pageSize: 10,
                data: {
                    keywords: null,
                    settleStatus: null,
                    carrierId: null,
                    consignorId: null
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
                    value: '承运方名称',
                    width: '210'
                },
                {
                    id: 3,
                    value: '支付方式',
                    width: '100'
                },
                {
                    id: 4,
                    value: '结算金额(元)',
                    width: '100'
                },
                {
                    id: 5,
                    value: '装卸货数量',
                    width: '108'
                },
                {
                    id: 6,
                    value: '状态',
                    width: '108'
                },
                {
                    id: 7,
                    value: '操作',
                    width: '100'
                }
            ],
            No: 3,
            showAdvance: false,
            searchType: 3
        };
    },
    created () {
        if (localStorage.getItem('userInfo')) {
            let userInfo = JSON.parse(localStorage.getItem('userInfo'));
            let companyId = userInfo.companyId;
            if (userInfo.companyTypeId === 2) {
                this.chargeData.data.carrierId = companyId;
                this.theadList[1].value = '托运方';
            } else {
                this.chargeData.data.consignorId = companyId;
                this.theadList[1].value = '承运商';
            }
        }
        this.getChargeList(1);
        this.getChargeStatus();
    },
    components: {
        consignTable,
        transportSearch
    },
    methods: {
        handleSearch () {
            this.getChargeList(1);
            this.getChargeStatus();
        },
        getChargeList (n) {
            this.chargeData.pageNum = n;
            this.$http.post(this.$api.transport.chargeList, this.chargeData)
                .then(res => {
                    this.chargeInfo = res.data.data;
                });
        },
        getChargeStatus () {
            this.$http.post(this.$api.transport.chargeStatus, this.chargeData.data)
                .then(res => {
                    this.statusList = res.data.data;
                });
        },
        tabChange (idx, status) {
            this.tabIdx = idx;
            this.chargeData.data.settleStatus = status;
            this.getChargeList();
        },
        handleCurrentChange (r) {
            this.getChargeList(r);
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
