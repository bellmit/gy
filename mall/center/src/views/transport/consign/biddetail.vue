<template>
    <div class="transport-wrap">
        <h3><i class="iconfont icon-info"></i>基础信息</h3>
        <form action="javascript:;">
            <div class="gy-form">
                <div class="gy-form-group">
                    <span class="l">产品</span>
                    <span v-for="pro in enquiryInfo.enquiryNoteItemList" :key="pro.id">{{pro.skuName}}</span>
                </div>
                <div class="gy-form-group weight">
                    <span class="l">重量</span>
                    <span v-for="pro in enquiryInfo.enquiryNoteItemList" :key="pro.id">{{pro.skuQuantity}}{{pro.infUnitOfMeasureName}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">装货地</span>
                    {{enquiryInfo.loadTotalAddress}}
                </div>
                <div class="gy-form-group">
                    <span class="l">卸货地</span>
                    {{enquiryInfo.unloadTotalAddress}}
                </div>
                <div class="gy-form-group">
                    <span class="l">发货公司</span>
                    {{enquiryInfo.loadWarehouseAddressModel.warehouseName}}
                </div>
                <div class="gy-form-group">
                    <span class="l">收货公司</span>
                    {{enquiryInfo.unloadWarehouseAddressModel.warehouseName}}
                </div>
                <div class="gy-form-group">
                    <span class="l">发货联系人</span>
                    {{enquiryInfo.loadContact}}
                </div>
                <div class="gy-form-group">
                    <span class="l">收货联系人</span>
                    {{enquiryInfo.unloadContact}}
                </div>
                <div class="gy-form-group">
                    <span class="l">发货联系方式</span>
                    {{enquiryInfo.loadContactMobile}}
                </div>
                <div class="gy-form-group">
                    <span class="l">收货联系方式</span>
                    {{enquiryInfo.unloadContactMobile}}
                </div>
                <div class="gy-form-group">
                    <span class="l">期望发货日期</span>
                    {{enquiryInfo.estimatedLoadingDate | date(1)}}
                </div>
                <div class="gy-form-group">
                    <span class="l">有效期</span>
                    {{enquiryInfo.effectiveDate | date(1)}}
                </div>
            </div>
            <h3><i class="iconfont icon-xiangxixinxi"></i>详细信息</h3>
            <div class="gy-form">
                <div class="gy-form-group">
                    <span class="l">托运方</span>
                    {{enquiryInfo.consignorName}}
                </div>
                <div class="gy-form-group">
                    <span class="l">车辆要求</span>
                    {{enquiryInfo.infCarrierTypeName}}
                </div>
                <div class="gy-form-group cl">
                    <span class="l">联系人</span>
                    {{enquiryInfo.contact}}
                </div>
                <div class="gy-form-group">
                    <span class="l">联系方式</span>
                    {{enquiryInfo.contactMobile}}
                </div>
                <div class="gy-form-group">
                    <span class="l">货值</span>
                    <span v-for="pro in enquiryInfo.enquiryNoteItemList" :key="pro.id">{{pro.intCurrencyMark}}{{pro.skuPrice}}元/{{pro.infUnitOfMeasureName}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">货损限制</span>
                    <span v-for="pro in enquiryInfo.enquiryNoteItemList"
                          :key="pro.id">{{pro.damageRate}}</span><span>‰</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">期望支付方式</span>
                    {{payWay[enquiryInfo.freightPaymentType]}}
                </div>
                <div class="gy-form-group">
                    <span class="l">期望签约方式</span>
                    {{signType[enquiryInfo.consignmentSignType]}}
                </div>
                <div class="gy-form-group single-row">
                    <span class="l">备注</span>
                    {{enquiryInfo.remark}}
                </div>
                <div class="price-list">
                    <table class="gy-table">
                        <thead>
                        <tr>
                            <td>询价单号</td>
                            <td>报价公司名称</td>
                            <td>价格</td>
                            <td>时间</td>
                            <td>操作</td>
                        </tr>
                        </thead>
                        <tr v-for="(price, index) in priceList" :key="index" v-if="priceList.length > 0">
                            <td>{{price.biddingNoteCode}}</td>
                            <td>{{price.carrierName}}</td>
                            <td>{{price.quotePrice}}元/吨</td>
                            <td>{{price.lastBiddingDate | date(1)}}</td>
                            <td>
                                <span v-if="price.biddingNoteStatus > 1">
                                    <button class="gy-button-view"
                                            @click="handleShowContract(price.filePath)">查看合同</button><button
                                    class="gy-button-view"
                                    @click="handleShowContract(price.filePath, price.lgsConsignmentNoteId)"
                                    v-if="price.biddingNoteStatus < 3">确认合同</button>
                                </span>
                                <span v-else>暂未签约</span>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="5" v-if="priceList.length === 0" class="no-data">暂无竞价</td>
                        </tr>
                    </table>
                </div>
            </div>
        </form>
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

export default {
    data () {
        return {
            enquiryInfo: {
                enquiryNoteItemList: [],
                loadWarehouseAddressModel: {},
                unloadWarehouseAddressModel: {}
            },
            payWay: ['在线支付', '线下支付'],
            quoteType: ['承运商报价', '我有意向价', '向指定承运商询价'],
            signType: ['在线签约', '线下签约'],
            priceList: [],
            contractUrl: null,
            showContract: false,
            showBtn: false,
            bidId: null,
            showHandlechapter: false,
            consignorId: null,
            isUseContractPSW: false,
            dialogVisible: false,
            contractPasswd: ''
        };
    },
    created () {
        this.bidId = this.$route.query.bidId;
        localStorage.getItem('userInfo') && (this.consignorId = JSON.parse(localStorage.getItem('userInfo')).companyId);
        this.getEnquiryInfo();
        this.getPriceList(this.bidId);
        this.getContractPwd();
    },
    components: {
        contract
    },
    methods: {
        getEnquiryInfo () {
            this.$http.get(this.$api.transport.priceList + '/' + this.$route.query.bidId)
                .then(res => {
                    this.enquiryInfo = res.data.data;
                });
        },
        getPriceList (id) {
            this.priceList = [];
            this.$http.get(this.$api.transport.priceList + '/' + id + '/biddingNotes')
                .then(res => {
                    this.priceList = res.data.data;
                });
        },
        handleChapter () {
            this.$http.post(this.$api.transport.signContract, {
                lgsConsignmentNoteId: this.id,
                consignorId: this.consignorId
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
        getContractPwd () {
            this.$http.get(this.$api.account.isHasContractPwd).then(res => {
                if (res.data.code === 0) {
                    this.isUseContractPSW = res.data.data.enableContractPwd === 1;
                }
            });
        }
    }
};
</script>
<style lang="scss" scoped>
    .unit-select, .unit {
        width: 80px;
        position: absolute;
        right: 20px;
        top: 10px;
    }

    .address {
        .province, .city {
            width: 45%;
        }
        .gy-input {
            clear: both;
            margin-top: 10px;
        }
    }

    label {
        margin-right: 10px;
        input {
            margin-right: 5px;
        }
    }

    .unit {
        width: auto;
        font-size: $small-font;
    }

    .link-im {
        color: $color-extra;
        margin-left: 10px;
    }

    .price-list {
        clear: both;
        padding: 30px;
        button {
            margin-right: 10px;
        }
        .no-data{
            text-align: center;
        }
    }
</style>
