<template>
    <div class="transport-wrap">
        <div class="main-title">
            <h2>物流询价单<span>询价单号：{{enquiryInfo.enquiryNoteCode}}</span></h2>
        </div>
        <div class="bid-box" v-if="showBid">
            <h3><i class="iconfont icon-info"></i>报价信息</h3>
            <div class="gy-form">
                <div class="gy-form-group">
                    <span class="l">运费</span>
                    <span v-if="isStartOrder">{{bidData.intCurrencyMark}}{{bidData.quotePrice}}</span>
                    <input type="text" class="gy-input" v-model="bidData.quotePrice" v-if="!isStartOrder">
                    <span class="unit" v-if="!isStartOrder">
                        <el-select v-model="bidData.intCurrencyId" placeholder="币种" class="money">
                            <el-option
                              v-for="item in moneyUnit"
                              :key="item.id"
                              :label="item.friendlyName"
                              :value="item.id">
                            </el-option>
                        </el-select>
                    </span>
                </div>
                <div class="gy-form-group">
                    <span class="l">备注</span>
                    <span v-if="isStartOrder">{{bidData.remark}}</span>
                    <input name="carriage" class="gy-input" v-model="bidData.remark" v-if="!isStartOrder">
                </div>
                <div class="gy-form-button" v-if="!isStartOrder && biddingNoteStatus < 1">
                    <button class="gy-button-extra" @click="bidSend" v-if="!isBidding">报价</button>
                    <button class="gy-button-normal" @click="bidModify" v-if="isBidding">修改报价</button>
                    <button class="gy-button-extra" @click="isStartOrder = true" v-if="isBidding">发起订单</button>
                </div>
            </div>
        </div>
        <h3><i class="iconfont icon-info"></i>基础信息</h3>
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
                {{enquiryInfo.loadAddress}}
            </div>
            <div class="gy-form-group">
                <span class="l">卸货地</span>
                {{enquiryInfo.unloadAddress}}
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
        <h3><i class="iconfont icon-info"></i>详细信息</h3>
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
        </div>
        <div class="gy-form-button" style="padding-bottom: 20px;" v-if="isStartOrder">
            <button class="gy-button-extra" @click="startOrder">提交</button>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            enquiryInfo: {
                enquiryNoteItemList: []
            },
            payWay: ['在线支付', '线下支付'],
            quoteType: ['承运商报价', '我有意向价', '向指定承运商询价'],
            signType: ['在线签约', '线下签约'],
            showBid: false,
            isBidding: false,
            isStartOrder: false,
            moneyUnit: [],
            biddingNoteStatus: null,
            bidData: {
                intCurrencyMark: null,
                intCurrencyId: null,
                lgsEnquiryNoteId: null,
                quotePrice: null,
                remark: null,
                id: null
            },
            startOrderData: {
                lgsBiddingNoteId: null,
                carrierId: null,
                consignorContactName: '',
                consignorId: null,
                consignorContactMobile: '',
                unloadAddress: '',
                unloadAreaId: '',
                loadAddress: '',
                loadAreaId: '',
                infTransportMeansId: '',
                freightPaymentType: '',
                infCarrierTypeId: '',
                quoteType: '',
                remark: '',
                consignmentNoteItemModelList: [
                    {
                        infUnitOfMeasureId: '',
                        intCurrencyId: '',
                        skuCode: '',
                        skuName: '',
                        skuPrice: '',
                        skuQuantity: '',
                        damageRate: '',
                        freightUnitPrice: null
                    }
                ]
            }
        };
    },
    created () {
        this.init();
    },
    methods: {
        init () {
            this.bidData.lgsEnquiryNoteId = this.$route.query.bidId;
            if (localStorage.getItem('userInfo')) {
                this.startOrderData.carrierId = JSON.parse(localStorage.getItem('userInfo')).companyId;
            }
            this.getEnquiryInfo();
            this.showBid = this.$route.query.from === 'bidding';
            this.getMoneyUnit();
            this.getBidPrice();
        },
        getMoneyUnit () {
            this.$http.get(this.$api.global.moneyUnit)
                .then(res => {
                    this.moneyUnit = res.data.data;
                });
        },
        getEnquiryInfo () {
            this.$http.get(this.$api.transport.priceList + '/' + this.$route.query.bidId)
                .then(res => {
                    this.enquiryInfo = res.data.data;
                });
        },
        getBidPrice () {
            this.$http.get(this.$api.transport.bidPrice + this.bidData.lgsEnquiryNoteId)
                .then(res => {
                    this.isBidding = res.data.data.id;
                    this.biddingNoteStatus = res.data.data.biddingNoteStatus;
                    this.bidData = {
                        intCurrencyMark: res.data.data.intCurrencyMark,
                        intCurrencyId: res.data.data.intCurrencyId,
                        quotePrice: res.data.data.quotePrice,
                        remark: res.data.data.remark,
                        id: res.data.data.id
                    };
                });
        },
        bidSend () {
            this.bidData.lgsEnquiryNoteId = this.$route.query.bidId;
            this.$http.post(this.$api.transport.bid, this.bidData)
                .then(res => {
                    if (res.data.code === 0) {
                        this.$alert('报价成功', '提示')
                            .then(() => {
                                this.isBidding = true;
                                this.bidData.id = res.data.data.id;
                            });
                        return;
                    }
                    this.$alert(res.data.message, '出错了');
                });
        },
        bidModify () {
            console.log(this.bidData);
            this.$http.put(this.$api.transport.bid, this.bidData)
                .then(res => {
                    if (res.data.code === 0) {
                        this.$alert('修改成功', '提示');
                        return;
                    }
                    this.$alert(res.data.message, '出错了');
                });
        },
        startOrder () {
            this.startOrderData = {
                carrierId: JSON.parse(localStorage.getItem('userInfo')).companyId,
                lgsBiddingNoteId: this.bidData.id,
                consignorContactName: this.enquiryInfo.contact,
                consignorId: this.enquiryInfo.consignorId,
                consignorContactMobile: this.enquiryInfo.contactMobile,
                unloadingWarehouseAddress: this.enquiryInfo.unloadAddress,
                unloadAreaId: this.enquiryInfo.unloadAreaId,
                loadingWarehouseAddress: this.enquiryInfo.loadAddress,
                loadAreaId: this.enquiryInfo.loadAreaId,
                infTransportMeansId: this.enquiryInfo.infTransportMeansId,
                freightPaymentType: this.enquiryInfo.freightPaymentType,
                infCarrierTypeId: this.enquiryInfo.infCarrierTypeId,
                quoteType: this.enquiryInfo.quoteType,
                remark: this.enquiryInfo.remark,
                estimatedLoadingDate: this.enquiryInfo.estimatedLoadingDate,
                estimatedUnloadingDate: this.enquiryInfo.estimatedUnloadingDate,
                consignorName: this.enquiryInfo.consignorName,
                consignmentNoteItemList: [
                    {
                        infUnitOfMeasureId: this.enquiryInfo.enquiryNoteItemList[0].infUnitOfMeasureId,
                        intCurrencyId: this.enquiryInfo.enquiryNoteItemList[0].intCurrencyId,
                        skuCode: this.enquiryInfo.enquiryNoteItemList[0].skuCode,
                        skuName: this.enquiryInfo.enquiryNoteItemList[0].skuName,
                        skuPrice: this.enquiryInfo.enquiryNoteItemList[0].skuPrice,
                        skuQuantity: this.enquiryInfo.enquiryNoteItemList[0].skuQuantity,
                        damageRate: this.enquiryInfo.enquiryNoteItemList[0].damageRate,
                        freightUnitPrice: this.bidData.quotePrice
                    }
                ]
            };
            let phpHeader = {
                withCredentials: false,
                baseURL: ''
            };
            this.$http.post(this.$api.transport.newOrder, this.startOrderData)
                .then(res => {
                    if (res.data.code === 0) {
                        this.startOrderData.consignmentNoteCode = res.data.data.id;
                        this.$alert('提交成功', '提示')
                            .then(() => {
                                this.$http.post('http://logistics.app.api.uat.chinayie.net/?modules=driver&model=Api&action=AddOrderGoods', this.startOrderData, phpHeader)
                                    .then(r => {
                                        console.log(r);
                                    });
                                this.$router.push({name: 'transparentOrder'});
                            });
                        return;
                    }
                    this.$alert(res.data.message, '出错了');
                });
        }
    }
};
</script>
<style lang="scss" scoped>
    h2{
        span{
            display: inline-block;
            margin-left: 50px;
            color: $color-minor;
            font-size: $small-font;
        }
    }
    h3{
        font-size: 16px;
    }
    .unit{
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
    button{
        margin-left: 10px;
    }
</style>
