<template>
    <div class="transport-wrap">
        <div class="main-title">
            <h2>物流询价单<span>询价单号：{{enquiryInfo.enquiryNoteCode}}</span></h2>
        </div>
        <div class="bid-box" v-if="showBid">
            <h3><i class="iconfont icon-info"></i>报价信息</h3>
            <div class="gy-form">
                <div class="gy-form-group">
                    <span class="l">运费（人民币）</span>
                    <span v-if="isOrderStarted">{{bidData.intCurrencyMark}}{{bidData.quotePrice}}</span>
                    <div class="r" v-else>
                        <input type="text" class="gy-input" v-model="bidData.quotePrice"
                               :disabled="biddingNoteStatus >= 1">
                        <span class="unit">元/吨</span>
                    </div>
                </div>
                <div class="gy-form-group">
                    <span class="l">备注</span>
                    <span v-if="isOrderStarted">{{bidData.remark}}</span>
                    <input name="carriage" class="gy-input" v-model="bidData.remark" :disabled="biddingNoteStatus >= 1"
                           v-else>
                </div>
                <div class="gy-form-button" v-if="!isOrderStarting && biddingNoteStatus < 1">
                    <button class="gy-button-extra" @click="bidSend" v-if="!isBidding">报价</button>
                    <span v-else>
                        <button class="gy-button-normal" @click="bidModify">修改报价</button><button class="gy-button-extra" @click="orderStart">发起订单</button><a class="help-box"><i class="iconfont icon-help"></i><span>提醒：请和托运方确认后再发起订单。</span></a>
                    </span>
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
                <span v-for="pro in enquiryInfo.enquiryNoteItemList" :key="pro.id"
                      v-if="isOrderStarted || !isOrderStarting">{{pro.skuQuantity}}{{pro.infUnitOfMeasureName}}</span>
                <span v-for="pro in enquiryInfo.enquiryNoteItemList" :key="pro.id" v-else>
                    <input type="text" class="gy-input" v-model="skuQuantity">
                    <strong class="unit">{{pro.infUnitOfMeasureName}}</strong>
                </span>
            </div>
            <div class="gy-form-group">
                <span class="l">装货地</span>
                <span>{{enquiryInfo.loadTotalAddress}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">卸货地</span>
                <span>{{enquiryInfo.unloadTotalAddress}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">期望发货日期</span>
                <span v-if="isOrderStarted || !isOrderStarting">{{enquiryInfo.estimatedLoadingDate | date(1)}}</span>
                <span v-else>
                    <el-date-picker
                        v-model="startOrderData.estimatedLoadingDate"
                        type="datetime"
                        placeholder="选择日期">
                    </el-date-picker>
                </span>
            </div>
            <div class="gy-form-group">
                <span class="l">有效期</span>
                <span v-if="isOrderStarted || !isOrderStarting">{{enquiryInfo.effectiveDate | date(1)}}</span>
                <span v-else>
                    <el-date-picker
                        v-model="startOrderData.estimatedUnloadingDate"
                        type="datetime"
                        placeholder="选择日期">
                    </el-date-picker>
                </span>
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
                <span v-if="isOrderStarted || !isOrderStarting">{{enquiryInfo.infCarrierTypeName}}</span>
                <span v-else>
                    <el-select v-model="startOrderData.infCarrierTypeId" placeholder="请选择车辆类型">
                        <el-option
                            v-for="item in carType"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </span>
            </div>
            <div class="gy-form-group cl">
                <span class="l">联系人</span>
                <span v-if="isOrderStarted || !isOrderStarting">{{enquiryInfo.contact}}</span>
                <span v-else>
                    <input type="text" class="gy-input" v-model="startOrderData.consignorContactName">
                </span>
            </div>
            <div class="gy-form-group">
                <span class="l">联系方式</span>
                <span v-if="isOrderStarted || !isOrderStarting">{{enquiryInfo.contactMobile}}</span>
                <span v-else>
                    <input type="text" class="gy-input" v-model="startOrderData.consignorContactMobile">
                </span>
            </div>
            <div class="gy-form-group">
                <span class="l">货值（人民币）</span>
                <span v-for="pro in enquiryInfo.enquiryNoteItemList" :key="pro.id"
                      v-if="isOrderStarted || !isOrderStarting">{{pro.skuPrice}}元/{{pro.infUnitOfMeasureName}}</span>
                <span v-for="(pro, index) in enquiryInfo.enquiryNoteItemList" :key="index" v-else>
                    <input type="text" class="gy-input" v-model="skuPrice">
                    <strong class="unit">{{pro.intCurrencyName}}/{{pro.infUnitOfMeasureName}}</strong>
                </span>
            </div>
            <div class="gy-form-group">
                <span class="l">货损限制（‰）</span>
                <span v-for="pro in enquiryInfo.enquiryNoteItemList" :key="pro.id"
                      v-if="isOrderStarted || !isOrderStarting">{{pro.damageRate}}</span>
                <span v-else>
                    <input type="text" class="gy-input" v-model="damageRate">
                </span>
            </div>
            <div class="gy-form-group">
                <span class="l">期望支付方式</span>
                <span v-if="isOrderStarted || !isOrderStarting">{{payWay[enquiryInfo.freightPaymentType]}}</span>
                <span v-else>
                    <label><input type="radio" v-model="startOrderData.freightPaymentType" name="payway" value="0">在线支付</label>
                    <label><input type="radio" v-model="startOrderData.freightPaymentType" name="payway" value="1">线下支付</label>
                </span>
            </div>
            <div class="gy-form-group">
                <span class="l">期望签约方式</span>
                <span v-if="isOrderStarted || !isOrderStarting">{{signType[enquiryInfo.consignmentSignType]}}</span>
                <span v-else>
                    <label><input type="radio" v-model="startOrderData.consignmentSignType" name="signway" value="0">在线签约</label>
                    <label><input type="radio" v-model="startOrderData.consignmentSignType" name="signway" value="1">线下签约</label>
                </span>
            </div>
            <div class="gy-form-group single-row">
                <span class="l">备注</span>
                <span v-if="isOrderStarted || !isOrderStarting">{{enquiryInfo.remark}}</span>
                <span v-else>
                    <textarea class="gy-textarea" v-model="startOrderData.remark"></textarea>
                </span>
            </div>
        </div>
        <div class="gy-form-button" style="padding-bottom: 20px;" v-if="isOrderStarting">
            <button class="gy-button-extra" @click="orderSendConfirm">提交</button>
        </div>
        <div class="pop-order-confirm" v-show="showConfirm">
            <div class="main">
                <div class="pop-header">
                    <h6>提示</h6>
                    <i class="iconfont icon-close" @click="cancelConfirm"></i>
                </div>
                <div class="info">
                    <div class="gy-form">
                        <div class="gy-form-group">
                            <span class="l">品名</span>
                            <span v-for="pro in enquiryInfo.enquiryNoteItemList" :key="pro.id">{{pro.skuName}}</span>
                        </div>
                        <div class="gy-form-group">
                            <span class="l">运费</span>
                            <span class="highlight">{{bidData.quotePrice}} 元/吨 <i class="iconfont icon-confirm"></i></span>
                        </div>
                        <div class="gy-form-group">
                            <span class="l">重量</span>
                            <span class="highlight">{{skuQuantity}} 吨 <i class="iconfont icon-confirm"></i></span>
                        </div>
                        <div class="gy-form-group">
                            <span class="l">货损限制</span>
                            <span>{{damageRate}} ‰</span>
                        </div>
                        <div class="gy-form-group clearfix">
                            <span class="l">发货地</span>
                            <span>{{enquiryInfo.loadTotalAddress}}</span>
                        </div>
                        <div class="gy-form-group">
                            <span class="l">卸货地</span>
                            <span>{{enquiryInfo.unloadTotalAddress}}</span>
                        </div>
                    </div>
                    <span class="note highlight">注：订单发起后将无法修改，请再次确认！</span>
                    <div class="pop-button">
                        <button class="gy-button-extra" @click="orderSend">确认</button><button class="gy-button-normal" @click="cancelConfirm">取消</button>
                    </div>
                </div>
            </div>
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
            isOrderStarted: false,
            isOrderStarting: false,
            moneyUnit: [],
            biddingNoteStatus: null,
            bidData: {
                intCurrencyMark: '人民币',
                intCurrencyId: 1,
                lgsEnquiryNoteId: null,
                quotePrice: null,
                remark: null,
                id: null
            },
            startOrderData: {
                quotePrice: null,
                biddingNoteId: null,
                biddingRemark: null,
                lgsBiddingNoteId: null,
                carrierId: null,
                consignorContactName: '',
                consignorId: null,
                consignorContactMobile: '',
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
                ],
                loadWarehouseAddressId: null,
                unloadWarehouseAddressId: null,
                loadWarehouseAddressModel: {},
                unloadWarehouseAddressModel: {}
            },
            loadProvinceList: [],
            loadCityList: [],
            loadDistrictList: [],
            loadTownList: [],
            unloadProvinceList: [],
            unloadCityList: [],
            unloadDistrictList: [],
            unloadTownList: [],
            carType: [],
            damageRate: null,
            skuQuantity: null,
            showConfirm: false,
            showAddressLib: false,
            addressType: 0 // 0 装货地址， 1 卸货地址
        };
    },
    created () {
        this.init();
    },
    watch: {
        $route: 'init'
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
            this.getCarList();
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
                    this.damageRate = this.enquiryInfo.enquiryNoteItemList[0].damageRate;
                    this.skuPrice = this.enquiryInfo.enquiryNoteItemList[0].skuPrice;
                    this.skuQuantity = this.enquiryInfo.enquiryNoteItemList[0].skuQuantity;
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
        getCarList () {
            this.$http.post(this.$api.transport.carType)
                .then(res => {
                    this.carType = res.data.data.list;
                });
        },
        bidSend () {
            if (this.bidData.quotePrice === null || this.bidData.quotePrice === '') {
                this.$message.error('请填写运费');
                return;
            }
            this.bidData.lgsEnquiryNoteId = this.$route.query.bidId;
            this.$http.post(this.$api.transport.bid, this.bidData)
                .then(res => {
                    if (res.data.code === 0) {
                        this.$alert('报价成功', '提示', {type: 'success'})
                            .then(() => {
                                this.isBidding = true;
                                this.bidData.id = res.data.data.id;
                            });
                        return;
                    }
                    this.$alert(res.data.message, '出错了', {type: 'error'});
                });
        },
        bidModify () {
            if (this.bidData.quotePrice === null || this.bidData.quotePrice === '') {
                this.$message.error('请填写运费');
                return;
            }
            this.$http.put(this.$api.transport.bid, this.bidData)
                .then(res => {
                    if (res.data.code === 0) {
                        this.$alert('修改成功', '提示', {type: 'success'});
                        return;
                    }
                    this.$alert(res.data.message, '出错了', {type: 'error'});
                });
        },
        handleShowAddressLib (n) {
            this.addressType = n;
            this.showAddressLib = true;
        },
        orderStart () {
            this.isOrderStarting = true;
            this.startOrderData = {
                carrierId: JSON.parse(localStorage.getItem('userInfo')).companyId,
                lgsBiddingNoteId: this.bidData.id,
                consignorContactName: this.enquiryInfo.contact,
                consignorId: this.enquiryInfo.consignorId,
                consignorContactMobile: this.enquiryInfo.contactMobile,
                infTransportMeansId: this.enquiryInfo.infTransportMeansId,
                freightPaymentType: this.enquiryInfo.freightPaymentType,
                infCarrierTypeId: this.enquiryInfo.infCarrierTypeId,
                quoteType: this.enquiryInfo.quoteType,
                remark: this.enquiryInfo.remark,
                estimatedLoadingDate: this.enquiryInfo.estimatedLoadingDate,
                estimatedUnloadingDate: this.enquiryInfo.effectiveDate,
                consignorName: this.enquiryInfo.consignorName,
                consignmentSignType: this.enquiryInfo.consignmentSignType,
                consignmentNoteItemList: [
                    {
                        infUnitOfMeasureId: this.enquiryInfo.enquiryNoteItemList[0].infUnitOfMeasureId,
                        intCurrencyId: this.enquiryInfo.enquiryNoteItemList[0].intCurrencyId,
                        skuCode: this.enquiryInfo.enquiryNoteItemList[0].skuCode,
                        skuName: this.enquiryInfo.enquiryNoteItemList[0].skuName,
                        skuPrice: this.skuPrice,
                        skuQuantity: this.skuQuantity,
                        damageRate: this.damageRate,
                        freightUnitPrice: this.bidData.quotePrice
                    }
                ],
                loadWarehouseAddressId: this.enquiryInfo.loadWarehouseAddressId,
                unloadWarehouseAddressId: this.enquiryInfo.unloadWarehouseAddressId,
                loadWarehouseAddressModel: this.enquiryInfo.loadWarehouseAddressModel,
                unloadWarehouseAddressModel: this.enquiryInfo.unloadWarehouseAddressModel
            };
        },
        cancelConfirm () {
            this.showConfirm = false;
        },
        orderSendConfirm () {
            if (!this.$tools.verifyMobile(this.startOrderData.consignorContactMobile)) {
                this.$message.error('请填写正确联系人手机号码');
                return;
            }
            if (!/^[0-9]+(.[0-9]{1,3})?$/.test(this.skuQuantity)) {
                this.$message.error('重量最多保留3位小数');
                return;
            }
            if (!/^[0-9]+(.[0-9]{1,2})?$/.test(this.damageRate) || this.damageRate > 10) {
                this.$message.error('货损限制最多保留2位小数且不能大于10');
                return;
            }
            if (!this.skuPrice || !/^[0-9]+(.[0-9]{1,2})?$/.test(this.skuPrice)) {
                this.$message.error('货值不能为空且最多保留2位小数');
                return;
            }
            this.showConfirm = true;
        },
        orderSend () {
            this.showConfirm = false;
            this.startOrderData.consignmentNoteItemList[0].skuPrice = this.skuPrice;
            this.startOrderData.consignmentNoteItemList[0].skuQuantity = this.skuQuantity;
            this.startOrderData.consignmentNoteItemList[0].damageRate = this.damageRate;
            this.startOrderData.consignmentNoteItemList[0].freightUnitPrice = this.bidData.quotePrice;
            this.startOrderData.quotePrice = this.bidData.quotePrice;
            this.startOrderData.biddingRemark = this.bidData.remark;
            this.startOrderData.biddingNoteId = this.bidData.id;
            this.$http.post(this.$api.transport.newOrder, this.startOrderData)
                .then(res => {
                    if (res.data.code === 0) {
                        // this.startOrderData.consignmentNoteCode = res.data.data.id;
                        this.$alert('提交成功', '提示', {type: 'success'})
                            .then(() => {
                                this.$router.push({name: 'transparentOrder'});
                            });
                        return;
                    }
                    this.$alert(res.data.message, '出错了', {type: 'error'});
                });
        }
    }
};
</script>
<style lang="scss" scoped>
    h2 {
        span {
            display: inline-block;
            margin-left: 50px;
            color: $color-minor;
            font-size: $small-font;
        }
    }

    h3 {
        font-size: 16px;
    }

    .unit {
        width: 80px;
        position: absolute;
        right: 40px;
        top: 10px;
        text-align: right;
        font-weight: normal;
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

    button {
        margin-left: 10px;
    }
    .help-box {
        display: inline-block;
        vertical-align: top;
        margin-left: 5px;
        position: relative;
        cursor: pointer;
        .icon-help{
            color: $color-minor;
        }
        span{
            /*display: none;*/
            position: absolute;
            width: 150px;
            border: 1px solid $color-border;
            border-radius: $border-radius-small;
            background-color: #fff;
            text-align: left;
            font-size: 12px;
            padding: 5px;
            left: -12px;
            top: -58px;
            z-index: 100;
            color: $color-minor;
            display: none;
            transition: all 0.5s;
            &:after{
                position: absolute;
                content: '';
                border-left: 1px solid $color-border;
                border-bottom: 1px solid $color-border;
                background-color: #fff;
                transform: rotate(-45deg);
                width: 6px;
                height: 6px;
                left: 15px;
                bottom: -4px;
            }
        }
        &:hover{
            span{
                display: inline-block;
            }
        }
    }
    .gy-form-group {
        padding-left: 118px;
        .l {
            width: 118px;
        }
    }
    .pop-order-confirm {
        background-color: rgba(0, 0, 0, 0.3);
        z-index: 100;
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        .main{
            position: absolute;
            left: 50%;
            width: 750px;
            margin-left: -375px;
            background-color: #fff;
            top: 50%;
            transform: translateY(-50%);
            border-radius: $border-radius-large;
            .pop-header{
                position: relative;
                padding-left: 20px;
                border-bottom: 1px solid $color-border;
                h6{
                    margin: 0;
                    line-height: 40px;
                    font-size: 16px;
                    font-weight: normal;
                }
                i{
                    position: absolute;
                    right: 20px;
                    top: 50%;
                    transform: translateY(-50%);
                    cursor: pointer;
                    font-size: 18px;
                    color: $color-minor;
                }
            }
            .info{
                padding: 20px;
                .note{
                    display: block;
                    line-height: 1;
                }
                .gy-form{
                    padding-left: 0;
                    padding-top: 0;
                    .gy-form-group{
                        padding-left: 80px;
                        height: 50px;
                        .l{
                            padding-left: 0;
                        }
                    }
                }
                .pop-button{
                    text-align: right;
                }
            }
        }
    }
    .address-lib{
        color: $color-extra;
        font-size: 12px;
        display: block;
        i{
            font-size: 12px;
        }
    }
</style>
