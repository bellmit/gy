<template>
    <div class="settleMoney">
        <!-- 发起收款 -->
        <el-dialog width="800px" class="order-dialog"
                   :close-on-click-modal = "false"
                   :close-on-press-escape = "false"
                   @close = "closeBack"
                   :title = 'settleText'
                   :visible.sync="settleDilog.collectionDialog">
            <div class="gy-form">
                <div class="gy-form-group">
                    <span class="l">公司名称</span>
                    <span v-if="settleData.bizType === 1 && contEssData.downstreamInfo">{{contEssData.downstreamInfo.buyerCompanyName}}</span>
                    <span v-if="settleData.bizType === 2 && contEssData.upstreamInfo">{{contEssData.upstreamInfo.sellerCompanyName}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">产品名称</span>
                    <span>{{contEssData.prodName}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">付款方式</span>
                    <span v-if="settleData.bizType === 1 && contEssData.downstreamInfo">{{contEssData.downstreamInfo.paymentType | paymentType(contEssData.downstreamInfo.payChannel)}}</span>
                    <span v-if="settleData.bizType === 2 && contEssData.upstreamInfo">{{contEssData.upstreamInfo.paymentType | paymentType(contEssData.upstreamInfo.payChannel)}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">收款类型</span>
                    <span>结算款</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">已{{refundText}}总额(元)</span>
                    <span>{{settleData.hadPayAmount | numToCash}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">合同金额(元)</span>
                    <span v-if="orderItem.skuPriceType === 21 || orderItem.skuPriceType === 22">公式计价</span>
                    <span v-else>{{orderItem.skuTotalAmount | numToCash}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">结算总金额(元)</span>
                    <span>{{settleData.settleTotalAmount | numToCash}}</span>
                </div>
                <!-- <div class="gy-form-group">
                    <span class="l">其他费用合计(元)</span>
                    <span>{{settleData.chargeTotalAmount | numToCash}}</span>
                </div> -->
                <div class="gy-form-group">
                    <span class="l">本次收款金额(元)</span>
                    <span>{{settleBalance | numToCash}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">付款凭证</span>
                    <gy-file-upload ref="sFileUpload" @callbackFileUpload="onCallbackSaleFileUpload"></gy-file-upload>
                </div>
                <div class="gy-form-group">
                    <span class="l">备注</span>
                    <input type="text" class="gy-input">
                </div>
            </div>
            <!-- 进度条 -->
            <div v-if="!isSubmit">
                <operation-process :elStepList="stepArr"></operation-process>
            </div>
            <div style="margin-bottom:30px;margin-right:30px;text-align: right;">
                <button style="margin-right: 6px;" v-if="collectionMoney" class="gy-button-normal" @click="goback('collectionDialog')">关闭</button>
                <button style="margin-right: 6px;" v-if="!collectionMoney" class="gy-button-normal" @click="settleDilog.collectionDialog = false">取消</button>
                <button class="gy-button-extra" v-if="!collectionMoney" @click="createBillCollection()">提交</button>
            </div>
        </el-dialog>
        <!-- 发起付款 -->
        <el-dialog width="1000px" class="order-dialog"
                   :close-on-click-modal = "false"
                   :close-on-press-escape = "false"
                   @close = "closeBack"
                   :title = "settleText"
                   :visible.sync="settleDilog.paymentDialog">
            <div class="gy-form">
                <div class="gy-form-group">
                    <span class="l">产品名称</span>
                    <span>{{contEssData.prodName}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l"><strong>*</strong>申请日期</span>
                    <div class="searchDate">
                        <div class="d input-date">
                            <el-date-picker
                                    v-model="creatPaymentForm.paytime"
                                    type="date"
                                    value-format="timestamp"
                                    placeholder="申请日期"
                            >
                            </el-date-picker>
                        </div>
                    </div>
                </div>
                <div class="gy-form-group">
                    <span class="l">付款单位</span>
                    <span>{{contEssData.targetCorpName}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l"><strong>*</strong>计划付款日期</span>
                    <div class="searchDate">
                        <div class="d input-date">
                            <el-date-picker
                                    v-model="creatPaymentForm.planPayTime"
                                    type="date"
                                    value-format="timestamp"
                                    placeholder="申请日期"
                            >
                            </el-date-picker>
                        </div>
                    </div>
                </div>
                <div class="gy-form-group">
                    <span class="l">收款单位</span>
                    <span v-if="creatPaymentForm.payBillType === 1">{{contEssData.sellerCompanyName}}</span>
                    <span v-if="creatPaymentForm.payBillType === 2">{{contEssData.buyerCompanyName}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l"><strong>*</strong>收款开户行</span>
                    <el-select class="input-date" v-model="creatPaymentForm.sellerDepositBank" placeholder="请选择收款银行账户" @change="changeBlank">
                        <el-option
                            v-for="item in newBank"
                            :key="item.bankAccId"
                            :label="item.depositBankName"
                            :value="item.bankAccId">
                        </el-option>
                    </el-select>
                </div>
                <div class="gy-form-group">
                    <span class="l">合同金额(元)</span>
                    <span v-if="orderItem.skuPriceType === 21 || orderItem.skuPriceType === 22">公式计价</span>
                    <span v-else>{{orderItem.skuTotalAmount | numToCash}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l"><strong>*</strong>收款银行账号</span>
                    <input type="text" v-model="creatPaymentForm.sellerAccount" readonly>
                </div>
                <div class="gy-form-group">
                    <span class="l">用途</span>
                    <span>结算款</span>
                </div>
                <div class="gy-form-group">
                    <span class="l"><strong>*</strong>付款方式</span>
                    <input type="radio" v-model="creatPaymentForm.tradeMode" value="22">银行电汇
                    <input type="radio" v-model="creatPaymentForm.tradeMode" value="26">承兑汇票
                </div>
                <div class="gy-form-group">
                    <span class="l">已{{refundText}}总金额(元)</span>
                    <span>{{settleData.hadPayAmount | numToCash}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">结算总金额(元)</span>
                    <span>{{settleData.settleTotalAmount | numToCash}}</span>
                </div>
                <!-- <div class="gy-form-group">
                    <span class="l">其他费用合计(元)</span>
                    <span>{{settleData.chargeTotalAmount | numToCash}}</span>
                </div> -->
                <div class="gy-form-group">
                    <span class="l">申请金额(元)</span>
                    <span style="color: #E3070F;">{{settleBalance | numToCash}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">备注</span>
                    <input type="text" class="gy-input" v-model="creatPaymentForm.remarks">
                </div>
            </div>
            <!-- 进度条 -->
            <div v-if="!isSubmit2">
                <operation-process :elStepList="stepArr2"></operation-process>
            </div>
            <div class="foot" style="margin:0 30px 30px 0;">
                <button style="margin-right: 6px;" v-if="paymentRecelice" class="gy-button-normal" @click="goback('paymentDialog')">关闭</button>
                <button class="gy-button-normal" v-if="!paymentRecelice" @click="settleDilog.paymentDialog = false">取消</button>
                <button class="gy-button-extra" v-if="!paymentRecelice" @click="createPayment()">提交</button>
            </div>
        </el-dialog>
        <bank-acc ref="bankAcc" @onSaveAccInfo="popupPaySubmission"></bank-acc>
        <!-- end -->
    </div>
</template>

<script>
import operationProcess from '@/components/stepElement';
import bankAcc from './../../components/bankAcc';
import gyFileUpload from './../../components/gyFileUpload';

export default {
    name: 'settleMoney',
    props: {
        contEssData: Object,
        orderItem: Object,
        settleData: Object,
        settleDilog: Object
    },
    components: {gyFileUpload, bankAcc, operationProcess},
    data () {
        return {
            isSubmit2: true,
            stepArr2: [],
            paymentRecelice: false,
            collectionMoney: false,
            isSubmit: true,
            stepArr: [],
            settleText: null,
            refundText: null, // 退款进来是收款
            companyId: null,
            // settleDilog: {
            //     collectionDialog: false,
            //     paymentDialog: false
            // },
            settleBalance: null,
            newReceiptsList: { // 创建收款单
                erpBuyerPaymentFileModelList: null
            },
            creatPaymentForm: {
                payTotal: null, // 本次支付货款金额
                contEssId: null,
                tradeMode: null, // 付款方式
                paytime: new Date(),
                planPayTime: new Date(),
                buyerDepositBank: null, // (付款银行)买方付款银行开户行名称
                sellerAccount: null, // (收款银行账户)卖方付款账号
                payMethod: 3, // 用途
                payBillType: 0, // 表示付款还是退款
                sellerDepositBank: null, // (收款开户行)卖方付款银行开户行名称
                remarks: null, // 备注
                payDesc: 1,
                orderType: 3
                // applyQuantities: null,
                // tempPrice: null
            }, // 新建付款单
            newBank: [], // 新增银行账号
            settlelistDetail: {} // 结算明细
        };
    },
    mounted () {

    },
    methods: {
        // 创建收款对话框
        initCollectionDialgData (shouFuText) {
            this.creatPaymentForm.contEssId = this.contEssData.id;
            this.creatPaymentForm.buyerDepositBank = this.contEssData.targetCorpName; // (付款银行)买方付款银行开户行名称
            this.settleText = shouFuText;
            this.settleData.bizType === 1 ? this.refundText = '收款' : this.refundText = '付款';
            if (this.settleData.settleBalance < 0) {
                this.settleBalance = this.settleData.settleBalance * -1;
                this.newReceiptsList.payBillType = 2; // 退款(对方退)
            } else {
                this.settleBalance = this.settleData.settleBalance;
                this.newReceiptsList.payBillType = 1; // 收款
            }
        },
        // 创建付款对话框
        initSettleMoney (shouFuText) {
            this.creatPaymentForm.contEssId = this.contEssData.id;
            this.creatPaymentForm.buyerDepositBank = this.contEssData.targetCorpName; // (付款银行)买方付款银行开户行名称
            this.settleText = shouFuText;
            shouFuText === '发起退款' ? this.refundText = '收款' : this.refundText = '付款';
            if (this.settleData.bizType === 1) { // bizType 1销售 2采购
                this.companyId = this.contEssData.downstreamInfo.buyerCompanyId;
                this.creatPaymentForm.purchaseOrderId = this.contEssData.saleOrderId;
            }
            if (this.settleData.bizType === 2) {
                this.companyId = this.contEssData.upstreamInfo.sellerCompanyId;
                this.creatPaymentForm.purchaseOrderId = this.contEssData.purchaseOrderId;
            }
            this.newPaymentBankAssembly(this.companyId);
            // this.settleDilog.paymentDialog = true;
            if (this.settleData.settleBalance < 0) {
                this.settleBalance = this.settleData.settleBalance * -1;
                this.creatPaymentForm.payBillType = 2; // 退款
            } else {
                this.settleBalance = this.settleData.settleBalance;
                this.creatPaymentForm.payBillType = 1; // 付款
            }
        },
        // 收款时,下游付款凭证-回调
        onCallbackSaleFileUpload (fileList) {
            this.newReceiptsList.erpBuyerPaymentFileModelList = [];
            fileList.forEach((e) => {
                this.newReceiptsList.erpBuyerPaymentFileModelList.push({fileUrl: e.fileUrl});
            });
        },
        // 弹出框选择单条-提交
        popupPaySubmission (accInfo) {
            if (accInfo == null || accInfo === undefined) {
                this.creatPaymentForm.sellerAccount = null;
                this.creatPaymentForm.sellerDepositBankId = null;
                this.creatPaymentForm.sellerDepositBank = null;
                return;
            }
            this.creatPaymentForm.sellerDepositBank = accInfo.depositBank;
            this.creatPaymentForm.sellerDepositBankId = accInfo.id;
            this.creatPaymentForm.sellerAccount = accInfo.companyAccount;

            this.newPaymentBankAssembly(this.companyId);
        },
        // 添加开户行
        changeBlank (selAccInfo) {
            if (selAccInfo === 0) {
                this.$refs.bankAcc.addBank = true;
                if (this.settleData.bizType === 1) {
                    this.$refs.bankAcc.creatBank.companyId = this.contEssData.downstreamInfo.buyerCompanyId;
                    this.$refs.bankAcc.creatBank.accountName = this.contEssData.downstreamInfo.buyerCompanyName;
                }
                if (this.settleData.bizType === 2) {
                    this.$refs.bankAcc.creatBank.companyId = this.contEssData.upstreamInfo.sellerCompanyId;
                    this.$refs.bankAcc.creatBank.accountName = this.contEssData.upstreamInfo.sellerCompanyName;
                }
            }
            for (let i = 0; i < this.newBank.length; i++) {
                if (selAccInfo === this.newBank[i].bankAccId) {
                    this.creatPaymentForm.sellerAccount = this.newBank[i].bankAccount;
                    this.creatPaymentForm.sellerDepositBankId = this.newBank[i].bankAccId;
                    this.creatPaymentForm.sellerDepositBank = this.newBank[i].depositBankName;
                }
            }
        },
        // 查询付款银行
        newPaymentBankAssembly (sellerCompanyId) {
            this.$http.post(this.$api.payment.newBank, {'companyId': sellerCompanyId}).then((res) => {
                if (res.data.code === 0) {
                    this.newBank = res.data.data;
                }
            });
        },
        goback (type) {
            this.settleDilog[type] = false;
            this.$router.go(-1);
        },
        // x关闭 换返回
        closeBack () {
            if (this.collectionMoney || this.paymentRecelice) {
                this.$router.go(-1);
            } else {
                this.settleDilog.collectionDialog = false;
                this.settleDilog.paymentDialog = false;
                if (this.$refs.sFileUpload) {
                    this.$refs.sFileUpload.init();
                }
                this.creatPaymentForm.sellerDepositBank = null; // 收款开户行
                this.creatPaymentForm.sellerAccount = null; // 收款银行账号
                this.creatPaymentForm.tradeMode = null; // 付款方式
                this.creatPaymentForm.remarks = null; // 备注
            }
        },
        // // 创建付款单
        createPayment () {
            if (!this.check()) return false;
            let that = this;
            that.creatPaymentForm.payTotal = that.settleBalance;

            console.log(this.creatPaymentForm);
            that.$http.post(that.$api.order.newPayment, that.creatPaymentForm).then((res) => {
                if (res.data.code === 0) {
                    that.$message({
                        message: res.data.message,
                        type: 'success'
                    });
                    // 付款
                    let query = {
                        targetId: res.data.data.targetId,
                        targetType: 3
                    };
                    this.isSubmit2 = false;
                    this.paymentRecelice = true;
                    that.$http.post(that.$api.contract.approve1History, query).then((res) => {
                        if (res.data.code === 0) {
                            that.stepArr2 = res.data.data;
                            that.stepArr2.forEach((e, idx) => {
                                e['step'] = idx;
                            });
                        }
                    });

                    // 回写付款单ID
                    query = {
                        paymentId: res.data.data.targetId,
                        id: that.$route.query.targetBizId,
                        todoItemId: that.$route.query.id
                    };
                    that.$http.post(this.$api.settlement.updateSettleInfo, query).then((res) => {
                        if (res.data.code !== 0) {
                            that.$message({
                                message: res.data.message,
                                type: 'error'
                            });
                        }
                    });
                } else {
                    that.$message({
                        message: res.data.message,
                        type: 'error'
                    });
                }
            });
        },
        // 创建收款单
        createBillCollection () {
            let that = this;
            if (that.settleData.settleBalance === 0) {
                that.$message({
                    message: '已无待收金额，无需提交',
                    type: 'error'
                });
                return;
            }
            that.newReceiptsList.contractId = that.contEssData.id;
            that.newReceiptsList.collectionType = 3;
            that.newReceiptsList.collectionAmount = that.settleBalance;
            if (that.settleData.bizType === 1) {
                that.newReceiptsList.orderId = that.contEssData.saleOrderId;
            } else if (that.settleData.bizType === 2) {
                that.newReceiptsList.orderId = that.contEssData.purchaseOrderId;
            }

            that.$http.post(that.$api.order.createReceipts, that.newReceiptsList).then((res) => {
                if (res.data.code === 0) {
                    that.$message({
                        message: res.data.message,
                        type: 'success'
                    });
                    // 禁用文件上传
                    if (that.$refs.sFileUpload) {
                        that.$refs.sFileUpload.endUpload();
                    }
                    // 显示收款执行的流程
                    let query = {
                        targetId: res.data.data,
                        targetType: 5
                    };
                    this.isSubmit = false;
                    this.collectionMoney = true;
                    that.$http.post(this.$api.contract.approve1History, query).then((res) => {
                        if (res.data.code === 0) {
                            that.stepArr = res.data.data;
                            that.stepArr.forEach((e, idx) => {
                                e['step'] = idx;
                            });
                        }
                    });

                    // 回写收款单ID
                    query = {
                        collectionId: res.data.data,
                        id: that.$route.query.targetBizId,
                        todoItemId: that.$route.query.id
                    };
                    that.$http.post(this.$api.settlement.updateSettleInfo, query).then((res) => {
                        if (res.data.code !== 0) {
                            that.$message({
                                message: res.data.message,
                                type: 'error'
                            });
                        }
                    });
                } else {
                    that.$message({
                        message: res.data.message,
                        type: 'error'
                    });
                }
            });
        },
        // 验证
        check () {
            if (!this.creatPaymentForm.sellerDepositBank) {
                this.$message({
                    message: '请输入收款开户行',
                    type: 'error'
                });
                return false;
            }
            if (this.creatPaymentForm.tradeMode === null) {
                this.$message({
                    message: '请选择付款方式',
                    type: 'error'
                });
                return false;
            }
            return true;
        }
    }

};
</script>

<style lang="scss" scoped>
    .settleMoney {
        .footclose{
            padding: 32px 16px 32px 16px;
            overflow: hidden;
            p{
                float: left;
                span{
                    color: #E3070F;
                }
            }
            button{
                float: right;
            }
        }
        .foot{
            margin: 32px 16px 32px 0;
        }
        .gy-form{
            .gy-form-group{
                .l{
                    width: auto;
                }
                padding: 8px 30px 8px 160px;
            }
        }
        .gy-table-box{
            overflow: hidden;
            .title{
                padding: 24px 0 5px 16px;
                font-size: 14px;
                color: #333333;
                font-weight: bold;
            }
            .clearfix{
                position: relative;
                .gy-form-group{
                    width: 32%;
                }
            }
            .total-detail{
                float:right;
                width:238px;
                margin:33px 16px 0 0;
                dl{
                    font-size: 14px;
                    color: #333333;
                    overflow: hidden;
                    height:26px;
                }
                dl:last-child{
                    font-weight:bold;
                    font-size: 16px;
                    dd{
                        color: #E3070F;
                    }
                }
                hr{
                    height:1px;
                    border:none;
                    border: 1px solid #E7ECF1;
                }
                dt,dd{
                    float:left;
                    text-align: right;
                }
                dt{
                    width:92px;
                }
                dd{
                    width:88px;
                    // text-align: left;
                    margin-left:50px;
                }
            }
            .add_contact {
                position: absolute;
                right: 45px;
                top: 12px;
                display: inline-block;
                font-size: 23px;
                color: #ccc;
                cursor: pointer;
            }
            .delete_bank {
                position: absolute;
                right: 16px;
                top: 12px;
                display: inline-block;
                font-size: 23px;
                color: #ccc;
                cursor: pointer;
            }
        }
    }
</style>
<style lang="scss">
    .settleMoney {
        .el-dialog__title{
            font-size: 16px;
            color: #333;
            font-weight: bold;
            height: 35px;
            line-height: 35px;
            margin-top: -36px;
        }
        .el-dialog__headerbtn {
            top: 10px;
        }
        .el-dialog__body {
            overflow: hidden;
            margin: 0;
            padding: 0;
        }
        .el-icon-close{
            position: absolute;
            right: -5px;
        }
    }
</style>
