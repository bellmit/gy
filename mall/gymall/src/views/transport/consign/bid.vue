<template>
    <div class="transport-wrap order">
        <h2>承运商竞价</h2>
        <div class="t">
            <ul class="tabs">
                <li class="all" :class="{'selected': tabIdx === -1}" @click="tabChange(-1)"><a href="javascript:;">全部</a></li>
                <li v-for="(tab, index) in statusList" :key="tab.enquiryNoteStatus" :class="{'selected': tabIdx === index}" @click="tabChange(index, tab.enquiryNoteStatus)"><a href="javascript:;">{{statusValue[index]}}(<span>{{tab.count}}</span>)</a></li>
            </ul>
            <div class="search">
                <i class="iconfont icon-search"></i>
                <input type="text" placeholder="请输入品名/单号/装卸地" class="gy-input">
            </div>
        </div>
        <span class="button-box"><router-link :to="{ name: 'transportFind' }" class="gy-button-extra">找物流</router-link></span>
        <table class="gy-table list bid-list">
            <thead>
                <tr>
                    <td class="td-180">询价单号</td>
                    <td class="td-100">商品名称</td>
                    <td class="td-100">数量</td>
                    <td class="td-180">装货地</td>
                    <td class="td-180">卸货地</td>
                    <td class="td-100">询价日期</td>
                    <td class="td-126">操作</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in enquiryInfo.list" :key="item.id" v-if="enquiryInfo.list.length > 0">
                    <td colspan="7" class="item">
                        <table class="gy-table">
                            <tr>
                                <td class="td-180">{{item.enquiryNoteCode}}</td>
                                <td class="td-100"><span v-for="pro in item.enquiryNoteItemList" :key="pro.id">{{pro.skuName}}</span></td>
                                <td class="td-100"><span v-for="pro in item.enquiryNoteItemList" :key="pro.id">{{pro.skuQuantity}}</span></td>
                                <td class="td-180">{{item.loadAddress}}</td>
                                <td class="td-180">{{item.unloadAddress}}</td>
                                <td class="td-100">{{item.createdDate | date}}</td>
                                <td class="td-126"><router-link :to="{ name: 'consignBidDeatail', query: {'bidId': item.id} }" class="gy-button-view">查看</router-link><a href="javascript:;" class="gy-button-view" @click="showPrice(index, item.id)">竞价<i class="iconfont" :class="{'icon-arrow-up': priceIdx === index, 'icon-arrow-down': priceIdx !== index}"></i></a></td>
                            </tr>
                        </table>
                        <div class="sub-list" v-if="priceIdx === index">
                            <table class="gy-table">
                                <tr v-for="(price, index) in priceList" :key="index" v-if="priceList.length > 0">
                                    <td>{{price.biddingNoteCode}}</td>
                                    <td>{{price.carrierName}}<a href="" class="link-im"><i class="iconfont icon-im"></i></a></td>
                                    <td>{{price.quotePrice}}元/吨</td>
                                    <td style="text-align: right;">
                                        <span v-if="price.biddingNoteStatus > 0">
                                            <button class="gy-button-view" @click="handleShowContract(price.filePath, item.id)">查看合同</button><button class="gy-button-view" @click="confirmContract(price.lgsConsignmentNoteId)">确认合同</button>
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
            <contract :show-contract.sync="showContract" :show-btn="showBtn" :file="contractUrl" @handlechapter="handleChapter" v-show="showContract"></contract>
        </transition>
    </div>
</template>
<script>
import contract from '@/components/contract';
export default {
    data () {
        return {
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
                data: {
                    consignorId: null,
                    keywords: null,
                    enquiryNoteStatus: null
                }
            },
            contractUrl: null,
            showContract: false,
            lgsConsignmentNoteId: null,
            showBtn: false
        };
    },
    components: {
        contract
    },
    created () {
        localStorage.getItem('userInfo') && (this.enquiryData.data.consignorId = JSON.parse(localStorage.getItem('userInfo')).companyId);
        this.getEnquiryList(1);
        this.getEnquiryStatus();
    },
    methods: {
        getEnquiryList (n) {
            this.enquiryData.pageNum = n;
            this.$http.post(this.$api.transport.enquiryList, this.enquiryData)
                .then(res => {
                    this.enquiryInfo = res.data.data;
                });
        },
        showPrice (idx, id) {
            this.priceIdx = this.priceIdx === idx ? null : idx;
            this.getPriceList(id);
        },
        getEnquiryStatus () {
            this.$http.post(this.$api.transport.enquiryStatus, {consignorId: this.consignorId})
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
        },
        confirmContract (id) {
            this.showContract = true;
            this.$http.post(this.$api.transport.signContract, {
                lgsConsignmentNoteId: id,
                consignorId: this.enquiryData.data.consignorId
            })
                .then(res => {
                    this.contractUrl = res.data.data;
                    this.showContract = true;
                });
        },
        handleShowContract (file) {
            this.showContract = true;
            this.contractUrl = file;
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
    .td-180{
        width: 180px;
    }
    .td-100{
        width: 100px;
    }
    .td-126{
        width: 126px;
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
