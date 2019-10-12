<template>
    <div class="transport-wrap">
        <div class="gy-h4"><i class="iconfont icon-info"></i>基础信息</div>
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
                    <span class="l">期望发货日期</span>
                    {{enquiryInfo.estimatedLoadingDate | date}}
                </div>
                <div class="gy-form-group">
                    <span class="l">有效期</span>
                    {{enquiryInfo.effectiveDate | date}}
                </div>
            </div>
            <div class="gy-h4"><i class="iconfont icon-info"></i>详细信息</div>
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
                    <span v-for="pro in enquiryInfo.enquiryNoteItemList" :key="pro.id">{{pro.damageRate}}</span><span>‰</span>
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
                            <td>操作</td>
                        </tr>
                        </thead>
                        <tr v-for="(price, index) in priceList" :key="index" v-if="priceList.length > 0">
                            <td>{{price.biddingNoteCode}}</td>
                            <td>{{price.carrierName}}</td>
                            <td class="align-r">{{price.quotePrice}}元/吨</td>
                            <td class="align-c">
                                <span v-if="price.biddingNoteStatus > 1">
                                    <span class="gy-button-view" @click="handleShowContract(price.filePath)">查看合同</span>
                                </span>
                                <span v-else>暂未签约</span>
                            </td>
                        </tr>
                        <tr class="align-c">
                            <td colspan="4" v-if="priceList.length === 0">暂无竞价</td>
                        </tr>
                    </table>
                </div>
            </div>
        </form>
        <transition name="fade">
            <contract :show-contract.sync="showContract" :show-btn="showHandlechapter" :file="contractUrl" @handlechapter="handleChapter" v-show="showContract"></contract>
        </transition>
    </div>
</template>
<script>
import contract from '@/components/contract';
export default {
    data () {
        return {
            enquiryInfo: {
                enquiryNoteItemList: []
            },
            payWay: ['在线支付', '线下支付'],
            quoteType: ['承运商报价', '我有意向价', '向指定承运商询价'],
            signType: ['在线签约', '线下签约'],
            priceList: [],
            contractUrl: null,
            showContract: false,
            showBtn: false,
            bidId: null,
            showHandlechapter: false
        };
    },
    created () {
        this.bidId = this.$route.query.bidId;
        this.getEnquiryInfo();
        this.getPriceList(this.bidId);
    },
    components: {
        contract
    },
    methods: {
        getEnquiryInfo () {
            let that = this;
            that.$http.get(that.$api.transport.priceList + '/' + that.$route.query.bidId)
                .then(res => {
                    that.enquiryInfo = res.data.data;
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
    .unit-select, .unit{
        width: 80px;
        position: absolute;
        right: 20px;
        top: 10px;
    }
    .address{
        .province, .city{
            width: 45%;
        }
        .gy-input{
            clear: both;
            margin-top: 10px;
        }
    }
    label{
        margin-right: 10px;
        input{
            margin-right: 5px;
        }
    }
    .unit{
        width: auto;
        font-size: $small-font;
    }
    .link-im{
        color: $color-extra;
        margin-left: 10px;
    }
    .price-list{
        clear: both;
        padding-top:20px;
        button{
            margin-right: 10px;
        }
    }
    .icon-info{
        margin-right:7px;
    }
    .gy-form{
        padding:0 0 0 14px;
    }
</style>
