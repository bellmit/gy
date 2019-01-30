<template>
    <div class="createPayment new-createPayment">
        <div class="userCenter-main-tit">
            <div class="userCenter-main-tit-left">
                <span class="userCenter-main-tit-left-tit">付款单</span>
            </div>
        </div>
        <div class="createPayment-status createPayment-common clearfix">
            <div class="createPayment-status-left">
                <div>
                    <i class="iconfont icon-shoukuanyujiaoge new-left-i"></i>
                    <span class="createPayment-status-left-tit">付款单状态</span>
                </div>
                <div class="createPayment-status-left-billStatus">
                    <step step="1" isActive='1' showLine=''>
                        <div class="createPayment-status-left-billStatus-unconfirm">
                            <span>付款申请</span>
                        </div>
                    </step>
                    <step step="2" isActive="" isRight="true" showLine='true'>
                        <div class="createPayment-status-left-billStatus-confirmed">
                            <span>财务付款</span>
                        </div>
                    </step>
                    <step step="3" isActive="" isRight="true" showLine='true'>
                        <div class="createPayment-status-left-billStatus-confirmed">
                            <span>收款确认</span>
                        </div>
                    </step>
                    <step step="4" isActive="" isRight="true" showLine='true'>
                        <div class="createPayment-status-left-billStatus-confirmed">
                            <span>已完成</span>
                        </div>
                    </step>
                </div>
            </div>
            <div class="createPayment-status-right fr" v-if="showActButton === 1">
                <button @click="submitForm" class="createPayment-status-right-submit btn-active">提交</button>
                <button class="createPayment-status-right-cancel btn" @click="cancel">取消</button>
            </div>
        </div>
        <div class="createPayment-detail createPayment-common">
            <div class="createPayment-status-left">
                <i class="iconfont icon-dingdanxinxi new-left-i"></i>
                <span class="createPayment-detail-tit ">收款信息</span>
            </div>
            <div class="content-info">
                <el-row class="my-row" :gutter="60">
                    <el-col :span="12">
                        <el-row>
                            <el-col :span="7" class="font-weight" v-if="payMethod!=2">本次付款金额</el-col>
                            <el-col :span="7" class="font-weight" v-if="payMethod==2">本次支付保证金</el-col>
                            <el-col :span="17">
                                <input style="width:93%"
                                    v-model="amount"
                                    :disabled='readonlyFlg'
                                    type="number"
                                    @change="hanldeInput"
                                    @keyup="hanldeInput"
                                    placeholder="请输入金额"
                                    class="amount-input"/> 元
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12">
                        <el-row>
                            <el-col :span="7" class="font-weight">收款企业</el-col>
                            <el-col :span="17">{{sellerCompany}}</el-col>
                        </el-row>
                    </el-col>
                </el-row>
                <el-row class="my-row" :gutter="60">
                    <el-col :span="12">
                        <el-row>
                            <el-col :span="7" class="font-weight" v-if="((payMethod==1)||(payMethod==2))">剩余应付货款金额</el-col>
                            <el-col :span="17" v-if="((payMethod==1)||(payMethod==2))">
                                {{balance}}元
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12">
                        <el-row>
                            <el-col :span="7" class="font-weight">收款银行</el-col>
                            <el-col :span="17">
                                <el-select class="choose-bank" v-model="accountNumber" @change="chooseBank($event)">
                                    <el-option
                                        v-for="(account, itemIndex) in sellerAccounts"
                                        filterable
                                        allow-create
                                        :key="itemIndex"
                                        :label="account.bankName"
                                        :value="account.bankAccount">
                                    </el-option>
                                </el-select>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12">
                        <el-row>
                            <el-col :span="7" class="font-weight">收款账号</el-col>
                            <el-col :span="17">{{accountNumber}}</el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12">
                        <el-row>
                            <el-col :span="7">付款方式</el-col>
                            <el-col :span="17">{{paymentTerms}}</el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12">
                        <el-row>
                            <el-col :span="7" class="font-weight">备注</el-col>
                            <el-col :span="17">
                                {{remark}}
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
            </div>
        </div>
        <!--END 公司列表-->
        <transition name="fade">
            <div class="pop-comapny" v-show="showPop">
                <div class="pop-main">
                    <h3>提交信息</h3>
                    <i class="iconfont icon-close" @click="showPop = false"></i>
                    <div class="pop-inner">
                        <el-form ref="form" :model="form" label-width="95px" :rules="rules">
                            <el-form-item label="账号名称" prop="accountNameVal">
                                <el-input v-model="form.accountNameVal"></el-input>
                            </el-form-item>
                            <el-form-item label="银行名称" prop="bankName">
                                <el-input v-model="form.bankName"></el-input>
                            </el-form-item>
                            <el-form-item label="银行账号" prop="companyAccount">
                                <el-input v-model="form.companyAccount"></el-input>
                            </el-form-item>
                            <el-form-item label="开户行名称" prop="depositBank">
                                <el-input v-model="form.depositBank"></el-input>
                            </el-form-item>
                            <el-form-item style="text-align:right;">
                                <el-button @click.stop="verificationForm('form')" type="danger">保存</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
                <span class="mask" @click="showPop=false;accountNumber='请选择'"></span>
            </div>
        </transition>
        <!--END Pop Company-->
    </div>
</template>
<script>
import step from '@/components/step';
import {paymentMethod} from '@/utils';
export default {
    name: 'createPayment',
    components: {step},
    data () {
        return {
            payNo: '',
            readonlyFlg: true,
            total: 0, // 总货款
            amount: 0, // 本次支付的金额
            depositRatio: 0, // 保证金比率
            depositAmount: 0, // 保证金金额
            paidTotal: 10,
            paidTotalVal: 0,
            totalVal: 0,
            depositAmountVal: 0,
            accountNumber: '',
            accountObj: {},
            sellerCompanyId: '',
            sellerCompany: '',
            sellerAccounts: [{bankName: '', bankAccount: ''}],
            paymentTerms: '',
            isBatchDelivery: 0, // 0为不许分批       1为允许分批
            remark: '',
            orderNumber: '',
            orderType: 0,
            payBillType: 0, // 付款单类型
            payMethod: 0, // 付款类型
            showActButton: 1,
            showPop: false,
            // accountNameVal: '',
            orderId: '',
            userId: '',
            dispatchUrl: '',
            forwardRouter: '',
            startSettlementOrderMsg: {},
            form: {
                accountNameVal: '',
                bankName: '',
                companyAccount: '',
                depositBank: ''
            },
            rules: {
                accountNameVal: [
                    {required: true, message: '账号名称不能为空', trigger: 'blur'}
                ],
                bankName: [
                    {required: true, message: '银行名称不能为空', trigger: 'blur'}
                ],
                companyAccount: [
                    {required: true, message: '银行账号不能为空', trigger: 'blur'}
                ],
                depositBank: [
                    {required: true, message: '开户行名称不能为空', trigger: 'blur'}
                ]
            }
        };
    },
    watch: {
        'isBatchDelivery' (newValue, oldValue) {
            if (newValue === 1 && this.payMethod === 1) { // 允许分批(值1)同时是货款(值1)时可以修改“付款金额”
                this.readonlyFlg = false;
            }
        }
    },
    created: function () {
        this.getOrderInfo();
        this.getAccounts();
        this.orderId = this.$route.query.orderId;
        this.userId = this.$route.query.userId;
        this.dispatchUrl = this.$route.query.callback;
        this.forwardRouter = this.$route.params.callback;
    },
    computed: {
        balance: function () {
            let a = (this.totalVal - this.amount - this.paidTotalVal).toFixed(2);
            return (a > -0.001 && a < 0.001) ? 0 : a;
        }
        // defaultAccountName: function () {
        //     return this.sellerAccounts[0].bankName;
        // },
        // defaultAccountNumber: function () {
        //     return this.sellerAccounts[0].bankAccount;
        // }
    },
    methods: {
        verificationForm: function (form) {
            this.$refs[form].validate((valid) => {
                if (valid) {
                    this.addBank();
                } else {
                    return false;
                }
            });
        },
        addBank () {
            const me = this;
            this.$http.post('/trade/account/v1/companies/addBankInfo', {
                companyId: me.sellerCompanyId,
                accountName: me.form.accountNameVal,
                bankName: me.form.bankName,
                companyAccount: me.form.companyAccount,
                depositBank: me.form.depositBank
            }).then(function (data) {
                if (data.data.code === 0) {
                    me.showPop = false;
                    window.location.reload();
                } else {
                    this.$message('错了哦，状态码【' + data.code + '】 请重新访问该页面');
                }
            }).catch(function (e) {
                setTimeout(() => {
                }, 900);
            });
        },
        hanldeInput () {
            const reg = /^(0[0-9]|-)/;
            const amountString = this.amount.toString();
            if (parseFloat(this.amount) < 0 || reg.test(amountString)) {
                this.amount = '0';
            } else if (parseFloat(this.amount) > this.total) {
                this.amount = this.total;
            }
        },
        // open () {
        //     this.$alert('输入的金额不能小于零或大于' + this.total, '金额输入错误', {
        //         confirmButtonText: '确定'
        //     });
        // },
        chooseBank (bankAccount) {
            if (bankAccount.length < 1) {
                this.showPop = true;
                this.accountNumber = '请选择';
                return;
            }
            this.accountObj = this.sellerAccounts.filter(account => account.bankAccount === bankAccount)[0];
        },
        cancel () {
            this.$router.back(-1);
            // history.go(-1);
            // console.log(this.$router.back(-1));
            // console.log(history.go(-1));
        },
        submitForm () {
            // 提交请求，保存付款单
            const me = this;
            if ((me.payMethod === 1)) {
                if (me.balance < 0) {
                    me.$alert('支付金额已超过货款总额，请检查！', '操作提示');
                    return;
                }
            }
            if (me.accountNumber === '请选择') {
                me.$alert('请选择付款银行');
                return;
            }
            me.$http.post(me.$api.payment.createPayment,
                {
                    payTotal: me.amount,
                    orderType: me.orderType,
                    orderNumber: me.orderNumber,
                    payBillType: me.payBillType,
                    payMethod: me.payMethod,
                    accountInfo: me.accountObj,
                    remarks: me.remark,
                    balance: me.balance,
                    paymentTerms: me.paymentTerms
                }
            ).then(function (response) {
                if (response.data.code === 0) {
                    // fixme -- 应该回到原来的业务画面（订单业务）
                    me.$router.push({name: 'paymentList'});
                    // me.$router.push({name: 'toPay', params: { payMethod: me.payMethod }});
                    // if (me.forwardRouter)
                    // {
                    //     me.$router.push(me.forwardRouter);
                    // }
                    // if (me.dispatchUrl){
                    //     if (me.dispatchUrl === "transparentOrderDetail")
                    //     {
                    //         me.$router.push({ name: me.dispatchUrl, query: {view: true, orderId: me.orderId} });
                    //     }
                    //
                    // }else{
                    //     me.$router.push({name:'paymentList'});
                    // }
                    me.showActButton = 0;
                } else {
                    me.$alert(response.data.message);
                }
            }).catch(function (error) {
                console.log(error);
            });
        },
        getOrderInfo () {
            // 从订单页面的路由获取订单编号等信息
            const me = this;
            me.orderNumber = me.$route.query.orderNo;
            me.orderType = parseInt(me.$route.query.orderType); // 1
            me.payBillType = parseInt(me.$route.query.billType); // 1 付款 2 退款
            me.payMethod = parseInt(me.$route.query.payMethod); // 3
        },
        getAccounts () {
            // 根据订单编号获取收款账户信息
            const me = this;
            me.$http.post(me.$api.payment.orderInfo4Pay,
                {
                    orderNumber: me.orderNumber,
                    orderType: me.orderType,
                    payBillType: me.payBillType,
                    payMethod: me.payMethod
                }
            ).then(function (response) {
                if (response.data.code === 0) {
                    // 这里以后要判断订单类型
                    let resData = response.data.data;
                    me.sellerCompany = resData.targetCorpName;
                    me.sellerCompanyId = resData.targetCorpId;
                    me.sellerAccounts = resData.bankInfoList.reverse();
                    me.accountObj = me.sellerAccounts[0];
                    // me.accountNumber = me.sellerAccounts[0].accountNumber;
                    me.total = resData.total;
                    me.depositRatio = resData.depositRatio;
                    me.depositAmount = resData.depositAmount;
                    me.totalVal = resData.totalVal;
                    me.paidTotal = resData.paidTotal;
                    me.isBatchDelivery = resData.isBatchDelivery;
                    // 在分批付款(isBatchDelivery为1的)，且为货款支付(payMethod为1)的情况下，减去已支付金额
                    if (me.isBatchDelivery === 1 && me.payMethod === 1) {
                        me.amount = (resData.total - me.paidTotal).toFixed(2);
                    } else {
                        me.amount = Number(resData.amount).toFixed(2);
                    }
                    if (me.amount < 0) {
                        me.amount = me.amount * -1;
                    }
                    me.paidTotalVal = resData.paidTotalVal;
                    me.depositAmountVal = resData.depositAmountVal;

                    if (me.orderType === 2) {
                        // 如果是物流订单，那么付款方式固定(一次付清)
                        resData.transactionType = 3;
                    }
                    me.paymentTerms = paymentMethod(resData.transactionType, resData.isBatchDelivery);
                } else {
                    me.$alert(response.data.code + ' ' + response.data.message);
                }
            }).catch(function (error) {
                console.log(error);
            });
        }
    }
};
</script>
<style lang="scss">
    .choose-bank {
        .el-input__inner {
            color: #333;
        }
    }
</style>
<style lang="scss" scoped>
    .createPayment-status-left{
        position: relative;
        .el-icon-tickets{
            position: absolute;
            top: 6px;
            left: -19px;
        }
    }
    .createPayment-common {
        padding: 20px 16px 30px 14px;
    }
    .createPayment-status {
        border-top: 1px solid #eee;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    }
    .createPayment-status-left-billStatus {
        width: 100%;
        display: flex;
        margin: 20px 30px;
    }
    .createPayment-status-left-billStatus-active {
        margin-left: -10px;
    }
    .createPayment-status-left-billStatus-unactive {
        position: relative;
        span {
            position: absolute;
            right: -34px;
            white-space: nowrap;
        }
    }
    .createPayment-status-left-billStatus-unconfirm {
        margin-left: -14px;
    }
    .createPayment-status-left-billStatus-confirmed {
        position: relative;
        span {
            position: absolute;
            right: -12px;
        }
    }
    .createPayment-status-right{
        margin-top: 20px;
    }
    .createPayment-status-right button:hover{
        cursor: pointer;
    }
    .createPayment-status-right-submit {
        margin-right: 8px;
        display: inline-block;
    }
    .createPayment-detail-amount {
        display: flex;
    }
    .createPayment-detail-amount-right {
        margin-left: 30px;
    }
    .createPayment-detail-amount-box {
        margin-top: 20px;
    }
    .createPayment-detail-amount-input {
        border: none;
        font-size: 20px;
        width: 50%;
    }
    .createPayment-seller {
        padding: 20px 20px 60px;
        width: 94%;
    }
    .createPayment-seller-account {
        margin: 20px 0;
    }
    .mg-top10 {
        margin-top: 10px;
    }
    .createPayment-items-bank {
        padding: 6px 40px;
        border-right: 1px solid #eee;
    }
    .createPayment-seller-account-left-fr {
        font-size: 12px;
        color: #666;
        margin-left: 50px;
        border-left: 1px solid #eee;
        padding-left: 14px;
    }
    .createPayment-trade-mode-content {
        margin: 10px 0;
    }
    .createPayment-trade-mode-desc {
        padding: 6px 10px;
        margin-left: 46px;
    }
    .createPayment-remark {
        margin: 30px 0 10px;
    }
    .createPayment-seller-contact {
        color: #E0370F;
        margin-left: 20px;
        opacity: 0.8;
        display: inline-flex;
        align-items: center;
        .icon-chat {
            margin: 0 6px 0 10px;
            font-size: 14px;
            color: #ef0505;
        }
    }
    .userCenter-main-tit-left-tit {
        color: #333;
        font-size: 16px;
    }
    .userCenter-main-tit-left-no {
        color: #666;
        font-size: 12px;
        margin-left: 20px;
        font-weight: normal;
    }
    .createPayment-detail-tit,
    .createPayment-seller-tit,
    .createPayment-status-left-tit {
        color: $color-title;
        font-size: 14px;
        font-weight: bold;
    }
    .padding-left20 {
        padding-left: 20px;
    }
    .createPayment-items-subtit {
        color: #333;
        font-weight: bold;
        font-size: 12px;
    }
    .createPayment-detail-content {
        margin: 10px 0;
    }
    .createPayment-detail-content-amount {
        font-family: HelveticaNeue;
        font-size: 14px;
        color: #E0370F;
        margin-left: 14px;
        font-weight: 700;
    }
    .createPayment-detail-content-desc {
        font-size: 12px;
        color: #2A2A2A;
        line-height: 16px;
        opacity: 0.8;
    }
    .createPayment-main-tit-right {
        .el-breadcrumb__inner,
        .el-icon-arrow-right {
            color: #E0370F;
        }
    }
    .createPayment {
        .el-breadcrumb {
            font-size: 12px;
        }
        .el-textarea {
            margin-left: 20px;
        }
    }
    .el-select-dropdown {
        left: 1361px;
    }
    .createPayment-items-bank-box {
        .el-input__inner {
            height: 30px;
            line-height: 30px;
            margin-left: 10px;
        }
        .el-select__caret {
            line-height: 30px;
        }
    }
    .pop-comapny {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 999;
        .pop-inner {
            width: 85%;
            margin: 0 auto;
        }
        .pop-main {
            position: absolute;
            width: 400px;
            height: 350px;
            left: 50%;
            top: 50%;
            border-radius: $border-radius-base;
            overflow: hidden;
            transform: translate(-50%, -50%);
            background-color: #fff;
            z-index: 2;
            .img-holder {
                border-radius: $border-radius-base;
                overflow: hidden;
                vertical-align: middle;
                display: inline-block;
                height: 100px;
                width: auto;
                border: 1px solid $color-border;
                margin-right: 10px;
            }
            .img-upload {
                vertical-align: middle;
                display: inline-block;
            }
            h3 {
                line-height: 40px;
                margin: 0;
                font-size: 16px;
                color: #333;
                padding-left: 15px;
                font-weight: normal;
                border-bottom: 1px solid #e6eaea;
            }
            .icon-close{
                position: absolute;
                right: 15px;
                top: 5px;
                cursor: pointer;
            }
            .tab {
                text-align: center;
                padding: 30px 0 10px;
                li {
                    border-radius: $border-radius-large;
                    display: inline-block;
                    height: 94px;
                    width: 152px;
                    background-color: #f6f6f6;
                    border: 2px solid #e2e2e2;
                    margin: 0 50px;
                    vertical-align: middle;
                    position: relative;
                    cursor: pointer;
                    dl {
                        color: $color-title;
                        position: absolute;
                        left: 0;
                        width: 100%;
                        top: 50%;
                        transform: translate(0, -50%);
                        dt {
                            font-size: 16px;
                            line-height: 1.5;
                            margin-bottom: 10px;
                        }
                        dd {
                            font-size: 12px;
                            line-height: 1;
                        }
                    }
                    &.selected {
                        background-color: #f9f3eb;
                        border-color: #e1dbd7;
                    }
                }
            }
            .ca-wrap {
                padding: 10px 20px;
                .gy-form {
                    padding: 0;
                }
                .t {
                    margin-bottom: 10px;
                    dd {
                        color: $color-minor;
                    }
                }
                .card-group {
                    div {
                        display: inline-block;
                        vertical-align: middle;
                    }
                    .card-tips {
                        display: inline-block;
                        vertical-align: middle;
                        margin-left: 10px;
                    }
                }
                .img-bank {
                    width: 120px;
                    height: auto;
                }
            }
            .tips {
                color: $color-highlight;
                padding: 10px 0 0 20px;
                font-size: 12px;
                height: 38px;
                i {
                    margin-right: 5px;
                    vertical-align: middle;
                }
                span {
                    display: inline-block;
                    vertical-align: middle;
                }
            }
            .gy-form {
                padding-top: 0;
            }
            .gy-form-group {
                width: 100%;
                padding-left: 100px;
                .l {
                    width: 100px;
                }
                .select-province {
                    width: 150px;
                    margin-right: 10px;
                }
                .address {
                    width: 265px;
                }
                &.form-group-address {
                    padding-right: 0;
                }
            }
        }
        .mask {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            cursor: pointer;
            background-color: rgba(0, 0, 0, 0.6);
            z-index: 1;
        }
    }
    .my-row {
        .el-col {
            line-height: 40px;
            color: #666666;
        }
        .font-weight {
            color: #333;
        }
    }
    .amount-input {
        border-radius: 0;
        border: none;
        border-bottom: 1px solid #e6eaea;
        background-color: transparent;
        font-size: 16px;
        color: #606266;
    }
    .new-left-i{
        font-size: 12px;
        color: #333;
        margin-right: 2px;
        vertical-align: bottom;
    }
    .content-info{
        padding-left: 18px;
        padding-right: 14px;
    }
</style>
