<template>
    <!-- 收款单确认画面 -->
    <div class="userCenter-main createPayment">
        <div class="userCenter-main-tit">
            <div class="userCenter-main-tit-left">
                <span class="userCenter-main-tit-left-tit">收款单详情</span>
                <span class="userCenter-main-tit-left-no">收款单号：{{payNo}}</span>
            </div>
            <!--<div class="userCenter-main-tit-right">-->
            <!--<el-breadcrumb separator-class="el-icon-arrow-right">-->
            <!--<el-breadcrumb-item>付款申请</el-breadcrumb-item>-->
            <!--<el-breadcrumb-item>财务付款</el-breadcrumb-item>-->
            <!--<el-breadcrumb-item class="createPayment-main-tit-right">收款确认</el-breadcrumb-item>-->
            <!--</el-breadcrumb>-->
            <!--</div>-->
        </div>
        <div class="createPayment-status createPayment-common clearfix">
            <div class="createPayment-status-left">
                <div>
                    <i class="el-icon-tickets"></i>
                    <span class="createPayment-status-left-tit">收款单状态</span>
                </div>
                <!--<div class="createPayment-status-left-billStatus">-->
                    <!--<step step="1" :isActive='this.collectionStatus >= 10' showLine=''-->
                          <!--:isDone="this.collectionStatus >= 10">-->
                        <!--<div class="createPayment-status-left-billStatus-unconfirm">-->
                            <!--<span>等待确认</span>-->
                        <!--</div>-->
                    <!--</step>-->
                    <!--<step step="2" :isActive="this.collectionStatus >= 20" isRight="true" showLine='true'-->
                          <!--:isDone="this.collectionStatus >= 20">-->
                        <!--<div class="createPayment-status-left-billStatus-confirmed">-->
                            <!--<span>已确认</span>-->
                        <!--</div>-->
                    <!--</step>-->
                <!--</div>-->

                <div class="createPayment-status-left-billStatus">
                    <step :step="(index+1)" :isActive="collectionStatus >= item.collectionStatus" :isRight="index > 0"
                          :showLine="index > 0" :isDone="collectionStatus >= item.collectionStatus" v-for="(item, index) in stepArr"
                          :key="index">
                        <div class="createPayment-status-left-billStatus-confirmed" v-if="index > 0">
                            <span>{{item.text}}</span>
                        </div>
                        <div class="createPayment-status-left-billStatus-unconfirm" v-else>
                            <span>{{item.text}}</span>
                        </div>
                    </step>
                </div>
            </div>
            <div class="createPayment-status-right fr">
                <div  v-if="textfailure" class="fl"><span class="wxts">温馨提示：</span>双方达成退款协议，资金已退回。</div>
                <div  v-if="decideWarm" class="fl"><span class="wxts">温馨提示：</span>对方已付款到担保账户，等待对方确认收货。</div>
                <!--<button class="createPayment-status-right-submit btn-active">打印</button>-->
                <br>
            </div>
        </div>
        <div class="createPayment-detail createPayment-common">
            <div class="createPayment-status-left">
                <i class="el-icon-tickets"></i>
                <span class="createPayment-detail-tit">收款信息</span>
            </div>
            <div class="content-info" v-if="tradeMode !== 3">
                <el-row class="my-row">
                    <el-col :span="3" class="font-weight fontWidth" v-if="payMethod!=2">本次付款金额</el-col>
                    <el-col :span="3" class="font-weight" v-if="payMethod==2">本次支付保证金</el-col>
                    <el-col :span="9"><span>{{amount}}</span> 元</el-col>
                    <el-col :span="3" :class="payMethod!=2?'fontWidth':'font-weight'">付款方式</el-col>
                    <el-col :span="9">{{paymentTerms}}</el-col>
                </el-row>
                <el-row class="my-row">
                    <el-col :span="3" :class="payMethod!=2?'fontWidth':'font-weight'">付款企业</el-col>
                    <el-col :span="9">{{buyerCorpName}}&nbsp;</el-col>
                    <el-col :span="3" :class="payMethod!=2?'fontWidth':'font-weight'">收款企业</el-col>
                    <el-col :span="9">{{sellerCorpName}}
                        <!--<a href="###" class="createPayment-seller-contact"><i class="iconfont icon-chat"></i>和我联系</a>--></el-col>
                </el-row>
                <el-row class="my-row">
                    <el-col :span="3" :class="payMethod!=2?'fontWidth':'font-weight'">付款银行</el-col>
                    <el-col :span="9">
                        {{buyerDepositBank}}&nbsp;
                    </el-col>
                    <el-col :span="3" :class="payMethod!=2?'fontWidth':'font-weight'">收款银行</el-col>
                    <el-col :span="9">{{sellerDepositBank}}</el-col>
                </el-row>
                <el-row class="my-row">
                    <el-col :span="3" :class="payMethod!=2?'fontWidth':'font-weight'">付款账号</el-col>
                    <el-col :span="9">{{buyerAccount}}&nbsp;</el-col>
                    <el-col :span="3" :class="payMethod!=2?'fontWidth':'font-weight'">收款账号</el-col>
                    <el-col :span="9">{{sellerAccount}}</el-col>
                </el-row>
                <el-row class="my-row">
                    <el-col :span="3" :class="payMethod!=2?'fontWidth':'font-weight'">付款凭证</el-col>
                    <el-col :span="21">
                        <!--<div class="createPayment-attachment-items">-->
                        <!--<a class="createPayment-attachment-item" v-for="attachment in attachments" :key="attachment.tit" href="attachment.url">-->
                        <!--<img class="createPayment-attachment-item-img" :src="attachment.imgUrl" />-->
                        <!--<div class="createPayment-attachment-item-right">-->
                        <!--<p class="createPayment-attachment-item-right-name">{{attachment.tit}}</p>-->
                        <!--<span class="createPayment-attachment-item-right-look">点击查看</span>-->
                        <!--</div>-->
                        <!--</a>-->
                        <!--</div>-->
                        <el-upload
                            :action="uploadUrl"
                            :auto-upload="true"
                            :data="{paymentId:paymentId}"
                            list-type="picture-card"
                            :disabled="true"
                            :file-list="fileList"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove"
                        >
                            <i class="el-icon-plus"></i>
                        </el-upload>
                    </el-col>
                </el-row>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
                <el-row class="my-row">
                    <el-col :span="3" :class="payMethod!=2?'fontWidth':'font-weight'">备注</el-col>
                    <el-col :span="19">{{remark}}
                        <!-- <textarea
                            class="gy-textarea"
                            placeholder="备注信息"
                            v-model="remark">
                        </textarea> -->
                        <!-- <el-input class="text-area-border-none"
                                  type="text"
                                  autosize
                                  placeholder="备注信息"
                                  v-model="remark">
                        </el-input> -->
                    </el-col>
                </el-row>
            </div>
            <div class="content-info" v-else>
                <el-row class="my-row">
                    <el-col :span="3" class="font-weight fontWidth" v-if="payMethod!=2">本次付款金额</el-col>
                    <el-col :span="3" class="font-weight" v-if="payMethod==2">本次支付保证金</el-col>
                    <el-col :span="9"><span>{{amount}}</span> 元（积分支付）</el-col>
                    <el-col :span="3" :class="payMethod!=2?'fontWidth':'font-weight'">付款企业</el-col>
                    <el-col :span="9">{{buyerCorpName}}&nbsp;</el-col>
                </el-row>
                <el-row class="my-row">
                    <el-col :span="3" :class="payMethod!=2?'fontWidth':'font-weight'">收款企业</el-col>
                    <el-col :span="9">{{sellerCorpName}}</el-col>
                    <el-col :span="3" :class="payMethod!=2?'fontWidth':'font-weight'">收款银行</el-col>
                    <el-col :span="9">{{sellerDepositBank}}</el-col>
                </el-row>
                <el-row class="my-row">
                    <el-col :span="3" :class="payMethod!=2?'fontWidth':'font-weight'">收款账号</el-col>
                    <el-col :span="9">{{sellerAccount}}</el-col>
                    <el-row class="my-row">
                        <el-col :span="3" :class="payMethod!=2?'fontWidth':'font-weight'">备注</el-col>
                        <el-col :span="9">{{remark}}</el-col>
                    </el-row>
                </el-row>
            </div>
        </div>
    </div>
</template>
<script>
import step from '../../components/step';
import {paymentMethod} from '@/utils';

export default {
    name: 'confirm-offline-pay',
    components: {step},
    data () {
        return {
            paymentId: 0,
            payMethod: 0,
            processId: 0,
            installment: false,
            isDeposit: true,
            cancelable: false,
            depositRatio: 0, // 保证金比率
            depositAmount: 0, // 保证金金额
            payNo: '',
            amount: '',
            sellerId: '',
            sellerCorpName: '',
            sellerAccount: '',
            sellerDepositBank: '',
            buyerAccount: '',
            buyerDepositBank: '',
            paymentTerms: '',
            fileNames: [],
            attachments: [{
                url: 'www.baidu.com',
                imgUrl: 'http://img.zcool.cn/community/0117e2571b8b246ac72538120dd8a4.jpg@1280w_1l_2o_100sh.jpg',
                tit: '付款发票1'
            }, {
                url: 'www.baidu.com',
                imgUrl: 'http://img.zcool.cn/community/0117e2571b8b246ac72538120dd8a4.jpg@1280w_1l_2o_100sh.jpg',
                tit: '付款发票2'
            }],
            remark: '',
            collectionStatus: 10,
            buyerCorpName: '',
            dialogImageUrl: '',
            dialogVisible: false,
            fileList: [],
            uploadUrl: this.$api.payment.paymentConfirmUpload,
            isSeniorSearch: true, // 高级搜索
            stepArr: [],
            tempStepArr1: [{collectionStatus: 10, text: '等待确认'}, {collectionStatus: 20, text: '已确认'}],
            tempStepArr2: [{collectionStatus: 60, text: '状态失效'}],
            tradeMode: '',
            decideWarm: false,
            textfailure: false
        };
    },
    computed: {
        balance: function () {
            return this.total - this.amount;
        }
    },
    methods: {
        handleRemove (file, fileList) {
            // console.log(file, fileList);
        },
        handlePictureCardPreview (file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        }
    },
    created: function () {
        // 获取付款单信息
        const me = this;
        me.collectionId = me.$route.query.collectionId;
        me.$http.get(me.$api.payment.collectionInfo + me.collectionId)
            .then(function (response) {
                if (response.data.code === 0) {
                    me.processId = response.data.data.payJobId;
                    me.payNo = response.data.data.payNumber;
                    me.payStatus = response.data.data.payStatus;
                    me.payMethod = response.data.data.payMethod;
                    me.depositRatio = response.data.data.depositRatio;
                    me.amount = response.data.data.payTotal;
                    me.tradeMode = response.data.data.tradeMode;
                    me.remark = response.data.data.remarks;
                    // 担保支付的温馨提示
                    if (response.data.data.guaranteed === 1 && me.payMethod === 1 && me.payStatus === 20 && response.data.data.guaranteeStatus === 1) {
                        me.decideWarm = true;
                    }
                    if (response.data.data.guaranteed === 1 && me.payMethod === 1 && me.payStatus === 60 && response.data.data.guaranteeStatus === 3) {
                        me.textfailure = true; // textfailure
                    }
                    if (response.data.data.payBillType === 1) {
                        me.sellerId = response.data.data.sellerId;
                        me.sellerCorpName = response.data.data.sellerCorpName;
                        me.sellerDepositBank = response.data.data.sellerDepositBank;
                        me.sellerAccount = response.data.data.sellerAccount;
                        me.buyerId = response.data.data.buyerId;
                        me.buyerAccount = response.data.data.buyerAccount;
                        me.buyerDepositBank = response.data.data.buyerDepositBank;
                        me.buyerCorpName = response.data.data.buyerCorpName;
                    } else if (response.data.data.payBillType === 2) {
                        me.sellerId = response.data.data.buyerId;
                        me.sellerCorpName = response.data.data.buyerCorpName;
                        me.sellerAccount = response.data.data.buyerAccount;
                        me.sellerDepositBank = response.data.data.buyerDepositBank;
                        me.buyerId = response.data.data.sellerId;
                        me.buyerAccount = response.data.data.sellerAccount;
                        me.buyerDepositBank = response.data.data.sellerDepositBank;
                        me.buyerCorpName = response.data.data.sellerCorpName;
                    }
                    me.collectionStatus = response.data.data.collectionStatus;
                    me.stepArr = me.collectionStatus === 60 ? me.tempStepArr2 : me.tempStepArr1;
                    me.paymentId = response.data.data.paymentId;
                    me.paymentTerms = paymentMethod(response.data.data.transactionType, response.data.data.isBatchDelivery);
                    let fileNames = response.data.data.attachments;
                    fileNames.forEach((item, index) => {
                        let obj = {};
                        let timestmp = (new Date()).valueOf();
                        if (item.fileUrl.indexOf('http') !== -1) {
                            obj.url = item.fileUrl;
                        } else {
                            obj.url = process.env.API_ROOT_MAIN + me.$api.payment.paymentImage + '?filePath=' + item.fileUrl + '&t=' + timestmp;
                        }
                        me.fileList.push(obj);
                    });
                }
            });
    }
};
</script>

<style lang="scss">
    .text-area-border-none {
        .el-textarea__inner {
            border-left: 0;
            border-right: 0;
            border-top: 0;
        }
    }
</style>

<style lang="scss" scoped>
    .content-info {
        margin-top: 15px;
    }

    .createPayment-common {
        padding:20px 16px 30px 30px;
    }
    .createPayment-status-left{
        position: relative;
        .el-icon-tickets{
            position: absolute;
            top: 6px;
            left: -19px;
        }
    }
    .createPayment-status {
        border-top: 1px solid #eee;
    }

    .createPayment-status-left-billStatus {
        width: 30%;
        display: flex;
        margin: 20px 0 0 20px;

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
        width:100%;
        .wxts {
            color: #EEA443;
            font-size: 14px;
            font-weight: bold;
        }
    }

    .createPayment-status-right-submit {
        margin-right: 10px;
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

    .mg-top40 {
        margin-top: 40px;
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

    .createPayment-detail {
        border-top: 7px solid #f5f5f5;
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

    .createPayment-attachment-items {
        display: flex;
    }

    .createPayment-attachment-item {
        display: flex;
        align-items: center;
        margin: 20px 0 0 20px;
    }

    .createPayment-attachment-item-img {
        width: 50px;
        height: 50px;
        margin-right: 8px;
    }

    .createPayment-attachment-item-right-name {
        color: #666;
    }

    .createPayment-attachment-item-right-look {
        color: #4A90E2;
    }

    .createPayment-remark-content {
        margin-left: 20px;
    }

    .createPayment-remark-content-tips {
        margin: 20px 0 0 -20px;
        border: none;
    }
    .font-weight {
        color: #333333;
    }
    .fontWidth {
        color: #333333;
        width:104px;
    }
</style>
<style lang="scss">
    .createPayment-main-tit-right {
        .el-breadcrumb__inner,
        .el-icon-arrow-right {
            color: #E0370F !important;
        }
    }

    .createPayment {
        .el-breadcrumb {
            font-size: 12px;
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

    .step-active .step-text {
        width: 80px;
        text-align: right;
    }

    .my-row {
        .el-col {
            line-height: 40px;
            /*border:red solid 1px;*/
            color: #666666;
        }
    }
</style>
