<template>
    <div class="transport-wrap order">
        <h2>物流询价单</h2>
        <div class="t">
            <ul class="tabs">
                <li class="all" :class="{'selected': tabIdx === -1}" @click="tabChange(-1)"><a href="javascript:;">全部</a></li>
                <li v-for="(tab, index) in statusList" :key="tab.enquiryNoteStatus" :class="{'selected': tabIdx === index}" @click="tabChange(index, tab.enquiryNoteStatus)"><a href="javascript:;">{{statusValue[index]}}(<span>{{tab.count}}</span>)</a></li>
            </ul>
            <div class="search">
                <i class="iconfont icon-search" @click="handleSearch"></i>
                <input type="text" placeholder="请输入品名/询价单号" v-model="enquiryData.data.keywords" class="gy-input">
                <i class="iconfont" :class="{'icon-arrow-down': !showAdvance, 'icon-arrow-up': showAdvance}" @click="showAdvance = !showAdvance"></i>
            </div>
            <transport-search :show-advance="showAdvance" :keywords="enquiryData.data.keywords" :advance.sync="enquiryData.data" :searchInfo.sync="enquiryInfo" :search-type="searchType" :count-status.sync="statusList"></transport-search>
        </div>
        <table class="gy-table list bid-list">
            <thead>
                <tr>
                    <td class="td-180">询价单号</td>
                    <td class="td-180">托运方</td>
                    <td class="td-140">商品名称</td>
                    <td class="td-80">数量</td>
                    <td class="td-160">装货地</td>
                    <td class="td-160">卸货地</td>
                    <td class="td-100">询价日期</td>
                    <td>操作</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in enquiryInfo.list" :key="item.id" v-if="enquiryInfo.list.length > 0">
                    <td colspan="8" class="item">
                        <table class="gy-table">
                            <tr>
                                <td class="td-180">{{item.enquiryNoteCode}}</td>
                                <td class="td-180">{{item.consignorName}}</td>
                                <td class="td-140"><span v-for="pro in item.enquiryNoteItemList" :key="pro.id">{{pro.skuName}}</span></td>
                                <td class="td-80"><span v-for="pro in item.enquiryNoteItemList" :key="pro.id">{{pro.skuQuantity}}</span></td>
                                <td class="td-160">{{item.loadTotalAddress}}</td>
                                <td class="td-160">{{item.unloadTotalAddress}}</td>
                                <td class="td-100">{{item.createdDate | date}}</td>
                                <td><router-link :to="{ name: 'transportBidDetail', query: {'bidId': item.id} }" class="gy-button-view">查看</router-link><a href="javascript:;" class="gy-button-view" @click="showPrice(index, item.id)">竞价<i class="iconfont" :class="{'icon-arrow-up': priceIdx === index, 'icon-arrow-down': priceIdx !== index}"></i></a></td>
                            </tr>
                        </table>
                        <div class="sub-list" v-if="priceIdx === index">
                            <table class="gy-table">
                                <tr v-for="(price, index) in priceList" :key="index" v-if="priceList.length > 0">
                                    <td>{{price.biddingNoteCode}}</td>
                                    <td>{{price.carrierName}}<!--<a href="" class="link-im" target="_blank"><i class="iconfont icon-im"></i></a>--></td>
                                    <td>{{price.quotePrice}}元/吨</td>
                                    <td style="text-align: right;">
                                        <span v-if="price.biddingNoteStatus > 1">
                                            <button class="gy-button-view" @click="handleShowContract(price.filePath)">查看合同</button>
                                        </span>
                                    </td>
                                </tr>
                            </table>
                            <div v-if="priceList.length === 0" class="note">暂无竞价</div>
                        </div>
                    </td>
                </tr>
                <tr v-if="enquiryInfo.list.length === 0">
                    <td colspan="7" class="note">暂无数据</td>
                </tr>
            </tbody>
        </table>
        <div class="pagination-box" v-if="enquiryInfo.total > enquiryInfo.pageSize">
            <el-pagination
              background
              layout="prev, pager, next"
              :current-page.sync = "enquiryInfo.pageNum"
              :page-size="enquiryInfo.pageSize"
              :total="enquiryInfo.total"
              @current-change="handleCurrentChange">
            </el-pagination>
        </div>
        <transition name="fade">
            <contract :show-contract.sync="showContract" :show-btn="showHandlechapter" :file="contractUrl" @handlechapter="handleChapter" v-show="showContract"></contract>
        </transition>
    </div>
</template>
<script>
import contract from '@/components/contract';
import transportSearch from '@/components/transportSearch';
export default {
    data () {
        return {
            id: null,
            statusValue: ['询价中', '签约中', '已完成', '已失效'],
            statusList: [],
            priceIdx: null,
            enquiryInfo: {
                list: {
                    enquiryNoteItemList: []
                }
            },
            tabIdx: -1,
            priceList: [],
            enquiryData: {
                pageNum: 1,
                pageSize: 10,
                keywords: null,
                data: {}
            },
            contractUrl: null,
            showContract: false,
            lgsConsignmentNoteId: null,
            showBtn: false,
            showAdvance: false,
            searchType: 1,
            showHandlechapter: false
        };
    },
    components: {
        contract,
        transportSearch
    },
    created () {
        this.getEnquiryList(1);
        this.getEnquiryStatus();
    },
    methods: {
        handleSearch () {
            this.getEnquiryList(1);
        },
        getEnquiryList (n) {
            this.enquiryData.pageNum = n;
            this.$http.post(this.$api.transport.bidList, this.enquiryData)
                .then(res => {
                    this.enquiryInfo = res.data.data;
                });
        },
        showPrice (idx, id) {
            this.priceIdx = this.priceIdx === idx ? null : idx;
            this.getPriceList(id);
        },
        getEnquiryStatus () {
            this.$http.post(this.$api.transport.bidStatus, this.enquiryData.data)
                .then(res => {
                    this.statusList = res.data.data;
                });
        },
        getPriceList (id) {
            this.priceList = [];
            this.$http.get(this.$api.transport.priceList + '/' + id + '/biddingNotes')
                .then(res => {
                    this.priceList = res.data.data;
                });
        },
        tabChange (idx, status) {
            this.priceIdx = null;
            this.tabIdx = idx;
            this.enquiryData.data.enquiryNoteStatus = status;
            this.getEnquiryList();
        },
        handleCurrentChange (r) {
            this.getEnquiryList(r);
        },
        handleChapter () {
            this.$http.post(this.$api.transport.signContract, {
                lgsConsignmentNoteId: this.id,
                consignorId: this.enquiryData.data.consignorId
            })
                .then(res => {
                    this.contractUrl = res.data.data;
                    this.showContract = true;
                });
        },
        handleShowContract (file, id) {
            this.showContract = true;
            this.contractUrl = file;
            if (id) {
                this.id = id;
                this.showHandlechapter = true;
            }
        }
    }
};
</script>
<style lang="scss" scoped>
    .button-box{
        display: block;
        text-align: right;
        padding: 0 20px 10px;
    }
    .bid-list{
        .td-180{
            width: 180px;
        }
        .td-160{
            width: 160px;
        }
        .td-140{
            width: 140px;
        }
        .td-100{
            width: 100px;
        }
        .td-80{
            width: 80px;
        }
        thead{
            td{
                padding-right: 0;
            }
        }
        tbody{
            td{
                background-color: #fbfbfc;
                border-bottom: 5px solid #fff;
                padding-right: 0;
            }
            tr:last-child{
                td{
                    border: none;
                }
            }
        }
    }
    .gy-button-view{
        margin-right: 6px;
    }
    .gy-button-view i{
        font-size: 12px;
        line-height: 8px;
        transform: scale(0.8);
        display: inline-block;
    }
    .sub-list{
        background-color: #fff;
        table{
            width: 90%;
            margin: 0 auto;
            td{
                background-color: #fff;
                border: none;
            }
        }
    }
    .link-im{
        color: $color-extra;
        margin-left: 10px;
    }
    .note{
        text-align: center;
        line-height: 40px;
        font-size: 14px;
    }
</style>
