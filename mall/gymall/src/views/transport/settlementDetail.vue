<template>
    <div class="transport-wrap order">
        <h2>运输结算单</h2>
        <h3><i class="iconfont icon-info"></i>基础信息</h3>
        <div class="gy-form">
            <div class="gy-form-group">
                <span class="l">品名</span>
                <span v-for="item in chargeInfo.consignmentNoteItemList" :key="item.id">{{item.skuName}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">数量</span>
                <span v-for="item in chargeInfo.consignmentNoteItemList" :key="item.id">{{item.skuQuantity + item.infUnitOfMeasureName}}</span>
            </div>
            <div class="gy-form-group cl">
                <span class="l">运费</span>
                <span v-for="item in chargeInfo.consignmentNoteItemList" :key="item.id">{{item.freightUnitPrice || '' + '元'}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">损耗限制</span>
                <span v-for="item in chargeInfo.consignmentNoteItemList" :key="item.id">{{item.damageRate}}‰</span>
            </div>
            <div class="gy-form-group">
                <span class="l">货值</span>
                <span v-for="item in chargeInfo.consignmentNoteItemList" :key="item.id">{{item.skuPrice + '元/' + item.infUnitOfMeasureName}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">期望支付方式</span>
                <label><input type="radio" :disabled="companyTypeId !== 2" v-model="chargeData.freightPaymentType" name="payway" value="0">在线支付</label>
                <label><input type="radio" :disabled="companyTypeId !== 2" v-model="chargeData.freightPaymentType" name="payway" value="1">线下支付</label>
            </div>
            <div class="gy-form-group">
                <span class="l">装货量</span>
                <input type="text" v-model="quantityLoading" :disabled="companyTypeId !== 2 || isView">
                <span class="unit" v-for="item in chargeInfo.consignmentNoteItemList" :key="item.id">{{item.infUnitOfMeasureName}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">卸货量</span>
                <input type="text" v-model="quantityUnloading" :disabled="companyTypeId !== 2 || isView">
                <span class="unit" v-for="item in chargeInfo.consignmentNoteItemList" :key="item.id">{{item.infUnitOfMeasureName}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">非合理损耗</span>
                {{wastage}}
                <span class="unit" v-for="item in chargeInfo.consignmentNoteItemList" :key="item.id">{{item.infUnitOfMeasureName}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">运费金额</span>
                <input type="text" v-model="chargeData.freightFee" @keyup="countTotalCharge" :disabled="companyTypeId !== 2 || isView">
                <span class="unit">元</span>
            </div>
            <div class="gy-form-group single-row">
                <span class="l">备注</span>
                <textarea class="gy-textarea" v-model="chargeData.settleRemark" :disabled="companyTypeId !== 2 || isView"></textarea>
            </div>
        </div>
        <h3><i class="iconfont icon-info"></i>其他费用</h3>
        <div class="gy-form other-charge" v-for="(item, index) in chargeData.consignmentChargesList" :key="index">
            <div class="gy-form-group">
                <span class="l">运费项目</span>
                <input type="text" class="gy-input" v-model="item.costItem"  :disabled="companyTypeId !== 2 || isView">
            </div>
            <div class="gy-form-group">
                <span class="l">费用金额</span>
                <input type="text" class="gy-input" v-model="item.costCharge" @keyup="countTotalCharge" :disabled="companyTypeId !== 2 || isView">
                <span class="unit">元</span>
            </div>
            <i class="iconfont icon-minus" @click="remove(index)"></i>
        </div>
        <span class="add-box" v-show="companyTypeId === 2">
            <i class="iconfont icon-add" @click="add"></i>
        </span>
        <p class="total">总运费：<strong>{{totalCharge}}元</strong></p>
        <div class="gy-form-button" style="padding-bottom: 20px;" v-if="!isView">
            <button class="gy-button-extra" @click="chargeSend" v-if="companyTypeId === 2">提交</button>
            <button class="gy-button-extra" @click="chargeConfirm" v-if="companyTypeId !== 2">确认</button>
            <!--<button class="gy-button-extra" @click="chargeModify" v-if="chargeData.freightFee">修改</button>-->
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            companyTypeId: null,
            chargeId: null,
            chargeData: {
                freightFee: null,
                freightPaymentType: 0,
                id: null,
                settleRemark: null,
                consignmentNoteItemList: [
                    {
                        quantityUnloading: null,
                        quantityLoading: null,
                        id: null
                    }
                ],
                consignmentChargesList: []
            },
            totalCharge: 0,
            quantityLoading: 0,
            quantityUnloading: 0,
            chargeInfo: {},
            isView: false
        };
    },
    created () {
        localStorage.getItem('userInfo') && (this.companyTypeId = JSON.parse(localStorage.getItem('userInfo')).companyTypeId);
        this.chargeId = this.$route.query.orderId;
        this.chargeData.id = this.chargeId;
        this.isView = this.$route.query.view;
        this.getChargeInfo();
    },
    computed: {
        wastage () {
            let load = this.quantityLoading;
            let unload = this.quantityUnloading;
            let scale = this.chargeData.consignmentNoteItemList[0].damageRate / 1000;
            let result = load - unload - load * scale;
            result = (result % 1 === 0) ? result : result.toFixed(3);
            return result;
        }
    },
    methods: {
        getChargeInfo () {
            let that = this;
            that.$http.get(that.$api.transport.newCharge + '/' + that.chargeId)
                .then(res => {
                    that.chargeInfo = res.data.data;
                    that.chargeData.freightFee = that.chargeInfo.freightFee;
                    that.chargeData.settleRemark = that.chargeInfo.settleRemark;
                    that.chargeData.freightPaymentType = that.chargeInfo.freightPaymentType;
                    that.chargeInfo.consignmentChargesList.forEach(item => {
                        that.chargeData.consignmentChargesList.push(item);
                    });
                    that.chargeData.consignmentNoteItemList = that.chargeInfo.consignmentNoteItemList;
                    that.quantityLoading = that.chargeData.consignmentNoteItemList[0].quantityLoading;
                    that.quantityUnloading = that.chargeData.consignmentNoteItemList[0].quantityUnloading;
                    that.countTotalCharge();
                });
        },
        add () {
            !this.isView && this.chargeData.consignmentChargesList.push(
                {
                    costCharge: null,
                    costItem: null,
                    currencyId: 1
                }
            );
        },
        remove: function (idx) {
            if (!this.isView) {
                this.chargeData.consignmentChargesList.splice(idx, 1);
                this.countTotalCharge();
            }
        },
        countTotalCharge () {
            let that = this;
            let otherCharge = 0;
            if (that.chargeData.consignmentChargesList.length === 0) {
                that.totalCharge = that.chargeData.freightFee;
                return;
            }
            that.chargeData.consignmentChargesList.forEach(item => {
                otherCharge = Number(otherCharge) + Number(item.costCharge);
            });
            that.totalCharge = Number(that.chargeData.freightFee) + otherCharge;
        },
        chargeSend () {
            let that = this;
            that.chargeData.consignmentNoteItemList[0].quantityLoading = that.quantityLoading;
            that.chargeData.consignmentNoteItemList[0].quantityUnloading = that.quantityUnloading;
            that.$http.post(that.$api.transport.newCharge, that.chargeData)
                .then(res => {
                    this.$http.put(this.$api.transport.newOrder, {
                        consignmentNoteStatus: 5,
                        id: this.chargeId
                    }).then((r) => {
                        if (r.data.code === 0) {
                            that.$router.push({name: 'transparentSettlement'});
                            return;
                        }
                        this.$alert(r.data.message, '出错了');
                    });
                });
        },
        chargeModify () {
            let that = this;
            that.chargeData.consignmentNoteItemList[0].quantityLoading = that.quantityLoading;
            that.chargeData.consignmentNoteItemList[0].quantityUnloading = that.quantityUnloading;
            that.$http.put(that.$api.transport.newCharge, that.chargeData)
                .then(res => {
                    if (res.data.code === 0) {
                        that.$alert('修改成功', '提示')
                            .then(() => {
                                that.$router.push({name: 'acceptSettlement'});
                            });
                        return;
                    }
                    that.$alert(res.data.message, '出错了');
                });
        },
        chargeConfirm () {
            this.$http.put(this.$api.transport.newOrder, {
                consignmentNoteStatus: 7,
                id: this.chargeId
            }).then((res) => {
                if (res.data.code === 0) {
                    this.$alert('确认成功', '提示')
                        .then(() => {
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
    .unit{
        position: absolute;
        right: 40px;
        top: 10px;
    }
    .add-box{
        text-align: right;
        display: block;
        position: relative;
        i{
            position: absolute;
            cursor: pointer;
            right: 10px;
            top: -25px;
            font-size: 20px;
            color: $color-minor;
        }
    }
    .other-charge{
        padding-top: 10px;
        padding-bottom: 0;
        position: relative;
        .gy-form-group{
            padding-bottom: 0;
        }
        i{
            position: absolute;
            cursor: pointer;
            right: 10px;
            top: 50%;
            font-size: 20px;
            margin-top: -18px;
            color: $color-minor;
        }
    }
    .total{
        text-align: right;
        color: $color-title;
        line-height: 50px;
        padding-right: 40px;
        strong{
            font-size: 16px;
            font-weight: normal;
        }
    }
</style>
