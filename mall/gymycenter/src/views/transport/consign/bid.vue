<template>
    <div class="transport-wrap order">
        <h2>承运商竞价</h2>
        <div class="t" style="overflow: inherit">
            <ul class="tabs">
                <li class="all" :class="{'selected': tabIdx === -1}" @click="tabChange(-1)"><a
                    href="javascript:;">全部</a></li>
                <li v-for="(tab, index) in statusList" :key="tab.enquiryNoteStatus"
                    :class="{'selected': tabIdx === index}" @click="tabChange(index, tab.enquiryNoteStatus)"><a
                    href="javascript:;">{{statusValue[index]}}(<span>{{tab.count}}</span>)</a></li>
            </ul>
            <div class="search">
                <div class="se-left1">
                    <input type="text" placeholder="请输入品名/单号/装卸地" v-model="enquiryData.data.keywords">
                    <i class="iconfont icon-search" @click="handleSearch"></i>
                </div>
                <div class="se-left2" @click="showAdvance = !showAdvance">
                     <span>高级搜索</span>
                    <i class="iconfont" :class="{'icon-arrow-down': !showAdvance, 'icon-arrow-up': showAdvance}"></i>
                </div>
            </div>
            <transport-search :show-advance="showAdvance" :keywords="enquiryData.data.keywords"
                              :advance.sync="enquiryData.data" :searchInfo.sync="enquiryInfo" :search-type="searchType"
                              :count-status.sync="statusList"></transport-search>
        </div>
        <div>
            <span class="button-box"><router-link :to="{ name: 'transportFind' }" class="gy-button-extra">找物流</router-link></span>
        </div>
        <div class="bid-body">
          <table class="gy-table list bid-list">
            <thead>
            <tr class="title">
                <td class="td-200">询价单号</td>
                <td class="td-100">商品名称</td>
                <td class="td-100">数量（吨）</td>
                <td class="td-170">装货地</td>
                <td class="td-170">卸货地</td>
                <td class="td-100">询价日期</td>
                <td class="td-126">操作</td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, index) in enquiryInfo.list" :key="item.id" v-if="enquiryInfo.list.length > 0">
                <td colspan="7" class="item">
                    <table class="gy-table">
                        <tr>
                            <td class="td-200">{{item.enquiryNoteCode}}</td>
                            <td class="td-100"><span v-for="pro in item.enquiryNoteItemList" :key="pro.id">{{pro.skuName}}</span>
                            </td>
                            <td class="td-100"><span v-for="pro in item.enquiryNoteItemList" :key="pro.id">{{pro.skuQuantity}}</span>
                            </td>
                            <td class="td-170">{{item.loadTotalAddress}}</td>
                            <td class="td-170">{{item.unloadTotalAddress}}</td>
                            <td class="td-100">{{item.createdDate | date}}</td>
                            <td class="td-126">
                                <router-link :to="{ name: 'consignBidDeatail', query: {'bidId': item.id} }" class="gy-button-view">查看</router-link>
                                <a href="javascript:;" class="gy-button-view" @click="showPrice(index, item.id)">竞价<i class="iconfont" :class="{'icon-arrow-up': priceIdx === index, 'icon-arrow-down': priceIdx !== index}"></i></a>
                                <div>
                                    <a href="javascript:;" class="gy-button-view" @click="repeal(item.id)" v-if="item.biddingNoteCount < 1 && item.enquiryNoteStatus === 0">撤销</a>
                                    <router-link :to="{ name: 'transportFind', query: {'bidId': item.id} }" class="gy-button-view">再次发起</router-link>
                                </div>
                            </td>
                        </tr>
                    </table>
                    <div class="sub-list" v-if="priceIdx === index">
                        <table class="gy-table">
                            <tr v-for="(price, index) in priceList" :key="index" v-if="priceList.length > 0">
                                <td>{{price.biddingNoteCode}}</td>
                                <td>{{price.carrierName}} <a @click="goIm(price.carrierContactMobile)" href="javascript:;" class="contact"><i class="iconfont icon-im"></i>和我联系</a></td>
                                <td>{{price.quotePrice}}元/吨</td>
                                <td>{{price.lastBiddingDate | date(1)}}</td>
                                <td style="text-align: right;">
                                        <span v-if="price.biddingNoteStatus > 1 && price.filePath">
                                            <button class="gy-button-view" @click="handleShowContract(price.filePath)">查看合同</button><button
                                            class="gy-button-view"
                                            @click="handleShowContract(price.filePath, price.lgsConsignmentNoteId)"
                                            v-if="price.biddingNoteStatus < 3">确认合同</button>
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
            <span class="total-number">共 {{enquiryInfo.total}} 条记录</span>
        </div>
        <div class="pagination-box" v-if="enquiryInfo.total > enquiryInfo.pageSize">
            <el-pagination
                background
                layout="prev, pager, next"
                :current-page.sync="enquiryInfo.pageNum"
                :page-size="enquiryInfo.pageSize"
                :total="enquiryInfo.total"
                @current-change="handleCurrentChange">
            </el-pagination>
        </div>
        <transition name="fade">
            <contract :show-contract.sync="showContract" :show-btn="showHandlechapter" :file="contractUrl"
                      @handlechapter="contractPwd" v-show="showContract"></contract>
        </transition>
        <!--验证签约密码-->
        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%">
            <el-form ref="form" label-width="70px">
                <el-form-item label="签约密码" prop="account">
                    <el-input v-model="contractPasswd" type="password"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                        <div class="gy-form-button">
                            <button type="button" class="gy-button-extra" @click="testContractPwd">确定</button>
                            <button type="button" class="gy-button-normal" @click="dialogVisible = false">取消</button>
                        </div>
                </span>
        </el-dialog>
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
            showHandlechapter: false,
            currentPhone: null,
            isUseContractPSW: false,
            dialogVisible: false,
            contractPasswd: ''
        };
    },
    components: {
        contract,
        transportSearch
    },
    created () {
        this.init();
    },
    methods: {
        init () {
            if (localStorage.getItem('userInfo')) {
                this.enquiryData.data.consignorId = JSON.parse(localStorage.getItem('userInfo')).companyId;
                this.currentPhone = JSON.parse(localStorage.getItem('userInfo')).phone;
            }
            this.getEnquiryList(1);
            this.getEnquiryStatus();
            this.getContractPwd();
        },
        handleSearch () {
            this.getEnquiryList(1);
        },
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
            this.$http.post(this.$api.transport.enquiryStatus, this.enquiryData.data)
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
                    this.showHandlechapter = false;
                    // this.$router.go(0);
                });
        },
        testContractPwd () {
            let query = {
                contractPwd: this.contractPasswd
            };
            this.$http.post(this.$api.order.contractPwd, query).then(res => {
                if (res.data.code === 0) {
                    this.dialogVisible = false;
                    this.contractPasswd = '';
                    this.handleChapter();
                } else {
                    this.$message({
                        type: 'info',
                        message: res.data.message
                    });
                }
            });
        },
        contractPwd () {
            if (this.isUseContractPSW) {
                this.dialogVisible = true;
            } else {
                this.handleChapter();
            }
        },
        handleShowContract (file, id) {
            this.showContract = true;
            this.contractUrl = file;
            if (id) {
                this.id = id;
                this.showHandlechapter = true;
            }
        },
        getContractPwd () {
            this.$http.get(this.$api.account.isHasContractPwd).then(res => {
                if (res.data.code === 0) {
                    this.isUseContractPSW = res.data.data.enableContractPwd === 1;
                }
            });
        },
        goIm (phone) {
            window.open('/im/#type=2&username=' + window.btoa(this.currentPhone) + '&touser=' + window.btoa(phone), '_blank');
        },
        repeal (id) {
            this.$alert('无人报价的需求可以撤销，撤销后请重新发起。', '提示')
                .then(() => {
                    this.$http.put(this.$api.transport.priceList, {
                        id: id,
                        enquiryNoteStatus: 3
                    }).then(res => {
                        if (res.data.code === 0) {
                            this.init();
                            return;
                        }
                        this.$message.error(res.data.message);
                    });
                }).catch(() => {
                    console.log('cancel');
                });
        }
    }
};
</script>
<style lang="scss" scoped>
    .button-box {
        display: block;
        text-align: right;
        padding: 0 16px 10px 0;
    }
    .bid-list {
        tbody {
            td {
                background-color: #fbfbfc;
                border-bottom: 5px solid #fff;
            }
            tr:last-child {
                td {
                    border: none;
                }
            }
        }
    }
    .td-200 {
        width: 200px;
    }
    .td-170 {
        width: 170px;
    }

    .td-100 {
        width: 100px;
    }

    .td-126 {
        width: 126px;
    }

    .gy-button-view {
        margin-right: 6px;
    }

    .gy-button-view i {
        font-size: 12px;
        line-height: 8px;
        transform: scale(0.8);
        display: inline-block;
    }

    .sub-list {
        background-color: #fff;
        table {
            width: 90%;
            margin: 0 auto;
            td {
                background-color: #fff;
                border: none;
            }
        }
    }

    .link-im {
        color: $color-extra;
        margin-left: 10px;
    }

    .note {
        text-align: center;
        line-height: 40px;
        font-size: 14px;
    }
    .transport-wrap{
        .t:after{display:block;clear:both;content:"";visibility:hidden;height:0}
    }
</style>
