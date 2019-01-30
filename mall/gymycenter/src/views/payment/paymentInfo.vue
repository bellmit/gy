<template>
    <!-- 用于已完成或已作废的付款单 -->
    <div class="userCenter-main createPayment">
        <div class="userCenter-main-tit">
            <div class="userCenter-main-tit-left">
                <span class="userCenter-main-tit-left-tit">付款单详情</span>
                <span class="userCenter-main-tit-left-no">付款单号：{{payNo}}</span>
            </div>
        </div>
        <div class="createPayment-status createPayment-common clearfix">
            <div class="createPayment-status-left">
                <div>
                    <i class="el-icon-tickets"></i>
                    <span class="createPayment-status-left-tit">付款单状态</span>
                </div>
                <div class="createPayment-status-left-billStatus">
                    <!--<step step="1" :isActive='this.payStatus >= -1' :isDone="this.payStatus >= -1">-->
                    <!--<div class="createPayment-status-left-billStatus-unconfirm">-->
                    <!--<span>付款申请</span>-->
                    <!--</div>-->
                    <!--</step>-->
                    <!--<step step="2" :isActive="this.payStatus >= 10" isRight="true" showLine='true' :isDone="this.payStatus >= 10">-->
                    <!--<div class="createPayment-status-left-billStatus-confirmed">-->
                    <!--<span>财务付款</span>-->
                    <!--</div>-->
                    <!--</step>-->
                    <!--<step step="3" :isActive="this.payStatus >= 20" isRight="true" showLine='true' :isDone="this.payStatus >= 20">-->
                    <!--<div class="createPayment-status-left-billStatus-confirmed">-->
                    <!--<span>收款确认</span>-->
                    <!--</div>-->
                    <!--</step>-->
                    <!--<step step="4" :isActive="this.payStatus >= 50" isRight="true" showLine='true' :isDone="this.payStatus >= 50">-->
                    <!--<div class="createPayment-status-left-billStatus-confirmed">-->
                    <!--<span>已完成</span>-->
                    <!--</div>-->
                    <!--</step>-->
                    <step :step="(index+1)" :isActive="payStatus >= item.payStatus" :isRight="index > 0"
                          :showLine="index > 0" :isDone="payStatus >= item.payStatus" v-for="(item, index) in stepArr"
                          :key="index">
                        <div class="createPayment-status-left-billStatus-confirmed" v-if="index > 0">
                            <span>{{item.text}}</span>
                        </div>
                        <div class="createPayment-status-left-billStatus-unconfirm" v-else>
                            <span>{{item.text}}</span>
                            <br/>
                        </div>
                    </step>
                </div>
            </div>
            <div class="createPayment-status-right fr">
                <!--<button class="createPayment-status-right-submit btn-active">打印</button>-->
                <button @click="cancelConfirm()" class="createPayment-status-right-submit btn-active" v-if="cancelable">
                    取消确认
                </button>
                <!-- <br v-else/> -->
            </div>
        </div>
        <div class="createPayment-detail createPayment-common">
            <div class="createPayment-status-left">
                <i class="el-icon-tickets"></i>
                <span class="createPayment-detail-tit">付款信息</span>
                <button class="gy-button-views" style="position:absolute;right:30px;cursor: pointer" v-if="isApproving" @click="openApprListDlg">查看审批流程</button>
            </div>
            <div class="content-info">
                <el-row class="my-row">
                    <el-col :span="3" :class="payMethod!=2?'fontWidth':'font-weight'">{{amountTitle}}</el-col>
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
                    <el-col :span="19">
                        {{ remark }}
                        <!--<el-input class="text-area-border-none" :readonly="true"-->
                        <!--type="textarea"-->
                        <!--autosize-->
                        <!--placeholder="备注信息"-->
                        <!--v-model="remark">-->
                        <!--</el-input>-->
                    </el-col>
                </el-row>
            </div>
        </div>
        <!-- 审批历史 弹窗组件 -->
        <approveHistory ref="myApprHisDlg"></approveHistory>
    </div>
</template>

<script>
import step from '../../components/step';
import approveHistory from '../../components/approveHistory';
import {paymentMethod} from '@/utils';

export default {
    name: 'payment-detail',
    components: {step, approveHistory},
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
            buyerId: '',
            buyerAccount: '',
            buyerDepositBank: '',
            paymentTerms: '',
            attachments: [],
            remark: '',
            // fileList: [],
            // uploadUrl: this.$api.payment.paymentConfirmUpload,
            active: '1',
            payStatus: 0,
            fileList: [],
            fileStatus: true,
            dialogImageUrl: '',
            dialogVisible: false,
            uploadUrl: this.$api.payment.paymentConfirmUpload,
            buyerCorpName: '',
            stepArr: [],
            tempStepArr1: [{payStatus: -1, text: '付款申请'}, {payStatus: 10, text: '财务付款'}, {
                payStatus: 20,
                text: '收款确认'
            }, {payStatus: 50, text: '已完成'}],
            tempStepArr2: [{payStatus: -1, text: '已失效'}],
            amountTitle: '',
            isApproving: false // 是否正在付款申请审批中
        };
    },
    watch: {
        'payMethod' (newValue, oldValue) {
            this.amountTitle = newValue === 2 ? '本次支付保证金' : '本次支付货款';
        }
    },
    computed: {
        balance: function () {
            return this.total - this.amount;
        }
    },
    methods: {
        cancelConfirm () {
            // 取消确认
            const me = this;
            me.$http.post(me.$api.processes.flowAct,
                {
                    paymentId: me.paymentId,
                    processId: me.processId,
                    remark: me.remark,
                    operaType: 3
                }
            ).then(function (response) {
                if (response.data.code === 0) {
                    // 去结果画面
                    me.$alert('取消确认成功', '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            me.$router.push({name: 'paymentConfirm', query: {paymentId: me.paymentId}});
                        }
                    });
                } else {
                    console.log(response.data.code + ' ' + response.data.message);
                }
            }).catch(function (error) {
                console.log(error);
            });
        },
        handleRemove (file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview (file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        openApprListDlg () {
            // 打开审批历史对话框
            let params = {targetId: this.$route.query.paymentId, targetType: 3};
            let user = JSON.parse(localStorage.getItem('userInfo'));
            if (user) {
                params.affiliatedCompanyId = user.companyId;
            }
            if (params.affiliatedCompanyId == null || params.affiliatedCompanyId === undefined || params.affiliatedCompanyId === 0) {
                this.$alert('未获取到当前用户所在公司信息，不能查询审批操作记录');
                return false;
            }

            this.$refs.myApprHisDlg.getAppHisList(params);
        }
    },
    created: function () {
        // 获取付款单信息
        const me = this;
        me.paymentId = me.$route.query.paymentId;
        me.$http.get(me.$api.payment.paymentInfo + me.paymentId)
            .then(function (response) {
                if (response.data.code === 0) {
                    me.processId = response.data.data.payJobId;
                    me.payNo = response.data.data.payNumber;
                    me.payStatus = response.data.data.payStatus;
                    me.stepArr = me.payStatus === 60 ? me.tempStepArr2 : me.tempStepArr1;
                    if (me.payStatus === 20 && response.data.data.collStatus === 10) {
                        me.cancelable = true;
                    }
                    me.payMethod = response.data.data.payMethod;
                    me.depositRatio = response.data.data.depositRatioStr;
                    me.amount = response.data.data.payTotalStr;
                    me.remark = response.data.data.remarks;
                    // payBillType：1 :付款；2:退款
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
                    me.paymentTerms = paymentMethod(response.data.data.transactionType, response.data.data.isBatchDelivery);
                    let fileNames = response.data.data.attachments;
                    fileNames.forEach((item, index) => {
                        let obj = {};
                        let timestmp = (new Date()).valueOf();
                        obj.url = process.env.API_ROOT_MAIN + me.$api.payment.paymentImage + '?filePath=' + item.fileUrl + '&t=' + timestmp;
                        me.fileList.push(obj);
                    });
                }
            });

        // 检查审批状态，如果是正在审批中则显示'查看审批流程'的链接
        let params = {targetId: me.paymentId, targetType: 3, subSysType: 1};
        let user = JSON.parse(localStorage.getItem('userInfo'));
        if (user) {
            params.affiliatedCompanyId = user.companyId;
        }
        if (params.affiliatedCompanyId == null || params.affiliatedCompanyId === undefined || params.affiliatedCompanyId === 0) {
            this.$alert('未获取到当前用户所在公司信息，不能查询审批操作状态');
            return false;
        }
        this.$http.post(this.$api.processes.bizApproveStatus, params).then((res) => {
            if (res.data.code === 0) {
                if (res.data.data.rsltStatus === 1) {
                    me.isApproving = true;
                }
            } else {
                this.$message({
                    type: 'error',
                    message: res.data.message
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

    .el-steps {
        /*border:red solid 1px;*/
        width: 50%;
    }
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
        right: -18px;
        span {
            float: right;
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
        .font-weight {
            color: #333333;
        }
        .fontWidth {
            color: #333333;
            width:104px;
        }
    }
</style>
