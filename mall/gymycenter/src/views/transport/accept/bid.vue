<template>
    <div class="transport-wrap order">
        <h2>物流询价单</h2>
        <div class="t">
            <ul class="tabs">
                <li class="all" :class="{'selected': tabIdx === -1}" @click="tabChange(-1)"><a
                    href="javascript:;">全部</a></li>
                <li v-for="(tab, index) in statusList" :key="index" :class="{'selected': tabIdx === index}"
                    @click="tabChange(index, tab.biddingNoteStatus)">
                    <a href="javascript:;">{{statusValue[index]}}(<span>{{tab.count}}</span>)</a>
                </li>
            </ul>
            <div class="search">
                <div class="se-left11">
                    <input type="text" placeholder="请输入品名、单号" v-model="enquiryData.data.keywords">
                    <i class="iconfont icon-search" @click="handleSearch"></i>
                </div>
                <div class="se-left2" @click="showAdvance = !showAdvance">
                    <span>高级搜索</span>
                    <i class="iconfont" :class="{'icon-arrow-down': !showAdvance, 'icon-arrow-up': showAdvance}"></i>
                </div>
            </div>
            <!--<div class="search">-->
                <!--<i class="iconfont icon-search" @click="handleSearch"></i>-->
                <!--<input type="text" placeholder="请输入品名、单号" class="gy-input" v-model="enquiryData.data.keywords"-->
                       <!--@keyup.13="handleSearch">-->
                <!--<i class="iconfont" :class="{'icon-arrow-down': !showAdvance, 'icon-arrow-up': showAdvance}"-->
                   <!--@click="showAdvance = !showAdvance"></i>-->
            <!--</div>-->
            <transport-search :show-advance="showAdvance" :keywords="enquiryData.data.keywords"
                              :advance.sync="enquiryData.data" :searchInfo.sync="enquiryInfo" :search-type="searchType"
                              :count-status.sync="statusList"></transport-search>
        </div>
        <div class="bid-body">
          <consign-table :orderList="enquiryInfo.list" :theadList="theadList" :No="No"></consign-table>
            <span class="total-number">共 {{enquiryInfo.total}} 条记录</span>
        </div>
        <div class="pagination-box" v-if="enquiryInfo.total > enquiryData.pageSize">
            <el-pagination
                background
                layout="prev, pager, next"
                :current-page.sync="enquiryInfo.pageNum"
                :page-size="enquiryInfo.pageSize"
                :total="enquiryInfo.total"
                @current-change="handleCurrentChange">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import consignTable from '../../../components/consignTable';
import transportSearch from '@/components/transportSearch';
import {mapGetters} from 'vuex';

export default {
    data () {
        return {
            statusValue: ['未报价', '已报价', '已发起订单', '承运方已签约', '托运方已签约', '已过期'],
            tabIdx: -1,
            statusList: [],
            enquiryInfo: {
                list: {
                    enquiryNoteItemList: []
                }
            },
            enquiryData: {
                pageNum: 1,
                pageSize: 10,
                data: {
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
                    value: '托运方',
                    width: '180'
                },
                {
                    id: 3,
                    value: '数量',
                    width: '108'
                },
                {
                    id: 4,
                    value: '装货日期',
                    width: '120'
                },
                {
                    id: 5,
                    value: '装卸货地',
                    width: '210'
                },
                {
                    id: 6,
                    value: '操作',
                    width: '108'
                }
            ],
            No: 2,
            searchType: 2,
            showAdvance: false
        };
    },
    components: {
        consignTable,
        transportSearch
    },
    created () {
        localStorage.getItem('userInfo') && (this.enquiryData.data.carrierId = JSON.parse(localStorage.getItem('userInfo')).companyId);
        this.init();
    },
    computed: mapGetters([
        'socket'
    ]),
    watch: {
        $route: 'init',
        socket: {
            handler (newValue, oldValue) {
                if (newValue) {
                    newValue.msg && this.init();
                }
            },
            deep: true
        }
    },
    methods: {
        init () {
            this.getEnquiryList(1);
            this.getBidStatus();
        },
        handleSearch () {
            this.getEnquiryList(1);
            this.getBidStatus();
        },
        getEnquiryList (n) {
            this.enquiryData.pageNum = n;
            this.$http.post(this.$api.transport.enquiryList, this.enquiryData)
                .then(res => {
                    this.enquiryInfo = res.data.data;
                });
        },
        getBidStatus () {
            this.$http.post(this.$api.transport.bidStatus, this.enquiryData.data)
                .then(res => {
                    this.statusList = res.data.data;
                });
        },
        tabChange (idx, status) {
            this.tabIdx = idx;
            this.enquiryData.data.biddingNoteStatus = status;
            this.getEnquiryList();
        },
        handleCurrentChange (r) {
            console.log(r);
            this.getEnquiryList(r);
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
